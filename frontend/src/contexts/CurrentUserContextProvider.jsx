/* eslint-disable func-style */
/* eslint-disable max-len */
import { useState, useEffect } from "react";
import CurrentUserContext from "./current-user-context";

export default function CurrentUserContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [eventData, setEventData] = useState(null);
  const [alertData, setAlertData] = useState(null);
  const [userAlertData, setUserAlertData] = useState(null);
  const [isSafe, setIsSafe] = useState(true);
  const [myLatitude, setLatitude] = useState(null); // Hook is used to retrieve the geolocation data when the component mounts
  const [myLongitude, setLongitude] = useState(null);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
  function showPosition(position) {
    setLatitude(position?.coords.latitude); // Functions are used to update the state variables with the retrieved values.
    setLongitude(position?.coords.longitude);
  }

  const updateEventData = (data) => {
    setEventData(data);
  };
  const updateAlertData = (data) => {
    setAlertData(data);
  };
  const updateUserAlertData = (data) => {
    setUserAlertData(data);
  };

  const userLocation = { myLatitude, myLongitude };
  const context = { currentUser, setCurrentUser, eventData, updateEventData, updateAlertData, alertData, userLocation, isSafe, setIsSafe, userAlertData, updateUserAlertData };

  return (
    <CurrentUserContext.Provider value={context}>
      {children}
    </CurrentUserContext.Provider>
  );
}
