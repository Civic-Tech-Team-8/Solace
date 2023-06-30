/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable func-style */
import React, { useEffect, useState, useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context.js";
import { apiFetchHandler } from "../utils";
import CommentModal from "./CommentModal.jsx";
// ------------------List of Events ----------------
function EventList() {
  const [events, setEvents] = useState([]);
  const {
    updateEventData,
    updateAlertData,
    userLocation,
    updateUserAlertData,
    currentUser,
    alert,
    setAlert,
  } = useContext(CurrentUserContext);
  const [modal, setModal] = useState(false);
  const [userAlert, setUserAlert] = useState([]);
  const [singleEvent, setSingleEvent] = useState([]);
  const [commentEvent, setCommentEvent] = useState([]);

  const fetchEvents = () => {
    fetch("https://eonet.gsfc.nasa.gov/api/v3/events?status=open&limit=20")
      .then((response) => response.json())
      .then((data) => {
        const filteredEvents = data.events.filter(
          (event) =>
            !event.categories.some(
              (category) => category.title === "Sea and Lake Ice"
            )
        );

        setEvents(filteredEvents);
        updateEventData(data);

        // Store the data in local storage
        localStorage.setItem("eventsData", JSON.stringify(data));
      })
      .catch((error) => console.log(error));
  };

 

  const latitude = events[0]?.geometry[0]?.coordinates[0];
  const longitude = events[0]?.geometry[0]?.coordinates[1];
  const alertLatitude = alert[0]?.eventCoordinates[0][1];
  const alertLongitude = alert[0]?.eventCoordinates[0][0];

  const fetchLayers = () => {
    fetch(
      `https://api.weather.gov/alerts?point=${alertLatitude},${alertLongitude}`
    )
      .then((response) => response?.json())
      .then((data) => {
        setUserAlert(data);
        updateUserAlertData(data);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    if (alertLatitude && alertLongitude) {
      fetchLayers();
    }
  }, [alertLatitude, alertLongitude]);

  useEffect(() => {
    fetchEvents();
    updateEventData();
    updateUserAlertData();
  }, []);

  const convertToMiles = (
    latitude2,
    latitude1,
    longtitude2,
    longtitude1,
    id
  ) => {
    const math = Math.floor(
      Math.sqrt(
        (latitude2 * 69 - latitude1 * 69) * (latitude2 * 69 - latitude1 * 69) +
          (longtitude2 * 54.6 - longtitude1 * 54.6) *
            (longtitude2 * 54.6 - longtitude1 * 54.6)
      )
    );
    return math >= 4.5
      ? `${Math.ceil(math)} miles`
      : `${Math.floor(math)} miles`;
  };
  const toggleModal = (event) => {
    setSingleEvent(event);
    setModal(!modal);
  };
  const eventId = events.map((event) => event.id);
  const alertProp = userAlert.features?.map((alerts) => alerts.properties);
  const alertId = alertProp?.map((a) => a.id);

  function extractDateFromString(inputString) {
    const pattern =
      /(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2}\s+at\s+\d{1,2}:\d{2}(am|pm)/i;

    const match = inputString.match(pattern);
    if (match) {
      return match[0];
    }
    // Return null if no matching date is found
  }
  return (
    <>
      <dl className="eventList">
        {modal && (
          <div className="modal">
            <div className="modal-content">
              <CommentModal data={singleEvent} closeButton={toggleModal} />
            </div>
          </div>
        )}
        {alert?.map((a) => {
          return (
            <React.Fragment key={a.id}>
              <li>
                <a href="#">
                  <div className="eventRow">
                    <div className="state">{a?.headline.split("NWS")[1]}</div>
                    <div className="date">
                      {extractDateFromString(a?.headline)}
                    </div>
                    <div className="eventType">{a?.event}</div>
                    <div className="eventTitle">{a?.severity}</div>
                    <div className="distance">
                      {convertToMiles(
                        userLocation?.myLatitude,
                        a.eventCoordinates[0][1],
                        userLocation?.myLongitude,
                        a.eventCoordinates[0][0]
                      )}
                    </div>
                    <button
                      className="btn-modal"
                      onClick={() => toggleModal(a)}
                    >
                      COMMENT
                    </button>
                  </div>
                  <em> Status: {a?.status}</em>
                </a>
              </li>
            </React.Fragment>
          );
        })}
      </dl>
    </>
  );
}

function Event() {
  return (
    <>
      <EventList />
    </>
  );
}

export default Event;
