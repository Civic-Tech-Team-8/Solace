/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable func-style */
import { useParams, useLocation } from 'react-router-dom';
import React, { useEffect, useState, useContext } from "react";
import CurrentUserContext from '../contexts/current-user-context.js';

function InfoList() {
  const [events, setEvents] = useState([]);
  const [nearByUsers, setNearByUsers] = useState([])
  const { eventData, userLocation, updateEventData, alert } = useContext(CurrentUserContext); // Data from MapComponent

  const { eventId } = useParams();
  const eventsId = events.map((event) => event.id);
  console.log(eventsId);
  console.log(eventId);

  useEffect(() => {
    // Retrieve data from local storage
    const storedData = localStorage.getItem('eventsData');
    const imgData = localStorage.getItem('imageData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const filteredEvents = parsedData?.events.filter((event) => !event.categories.some((category) => category.title === 'Sea and Lake Ice'));
      const getNearByUsers = () => {
        const users = alert.map(({nearByUsers}) => nearByUsers)
        setNearByUsers(users)
        console.log(nearByUsers)
      }
      getNearByUsers()
      setEvents(filteredEvents);
      updateEventData(parsedData);
    }
  }, []);

  // return (
  //   <div>
  //     <h2>Disaster Page</h2>
  //     <p>Event ID: {eventId}</p>
  //     {/* Render the rest of the page */}
  //   </div>
  // );


  return (
    <div className="container">
      <dl className="disasterList">
        {selectedEvent && (
          <React.Fragment key={selectedEvent.id}>
            <li>
              <a href="#">
                <div className="disasterRow">
                  <div className="disasterDate">{selectedEvent.geometry[0].date.slice(0, 16).replace("T", " ")}</div>
                  {selectedEvent.categories.map((category) => (
                    <div className="disasterType" key={category.id}>
                      {category.title}
                    </div>
                  ))}
                   <div className="disasterParticipants">Participants:
                                        <li> {nearByUsers.map(user => {
                                            return (
                                                <div key={user.id}>
                                                    <h6>{user.username}</h6>
                                                    <p>{user.isSafe ? 'In Solace' : 'Out of Solace'}</p>
                                                </div>
                                            )
                                        })}
                                        </li>
                                         </div>
                  <div className="disasterTitle">{selectedEvent.title}</div>
                </div>
                {selectedEvent.description && (
                  <dd className="disasterDd">
                    <em>{selectedEvent.description}</em>
                  </dd>
                )}
              </a>
              <div className="disasterDetails">
                <div className="disasterLocation">Location: New York</div>
                <div className="disasterTime">Time: 10:00 AM</div>
                <div className="disasterParticipants">Participants: 50</div>
              </div>
            </li>
          </React.Fragment>
        )}
      </dl>
      <footer className="footer">
        <p>&copy; 2023 Solace. All rights reserved.</p>
      </footer>
    </div>
  );
}

const Disaster = () => (
  <div>
    <InfoList />
    {/* Add your content here */}
  </div>
);

export default Disaster;
