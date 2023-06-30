/* eslint-disable max-len */
/* eslint-disable space-before-blocks */
/* eslint-disable prefer-destructuring */
/* eslint-disable eol-last */
/* eslint-disable func-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
/* eslint-disable indent */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-use-before-define */
/* eslint-disable no-trailing-spaces */

import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import CurrentUserContext from '../contexts/current-user-context.js';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapComponent = () => {
  const [myLatitude, setLatitude] = useState(null); // Hook is used to retrieve the geolocation data when the component mounts
  const [myLongitude, setLongitude] = useState(null);

  const { eventData, userAlertData, alertData } = useContext(CurrentUserContext); // Data from MapComponent
  const events = eventData?.events;
  const data = events?.filter((event) => !event.categories.some((category) => category.title === 'Sea and Lake Ice'));

    if (alertData) {
      console.log(alertData[0]?.eventCoordinates[0][1]);
    }
  const navigate = useNavigate();
  // const [eventLatitude, setEventLatitude] = useState(data[0].geometry[0]?.coordinates[0]); 
  // const [eventLongitude, setEventLongitude] = useState(data[0].geometry[0]?.coordinates[1]);

  // the "?" character is if it doesn't exist give undefined

  // console.log("event data from map:", eventData);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
    function showPosition(position) {
      setLatitude(position?.coords.latitude); // Functions are used to update the state variables with the retrieved values.
      setLongitude(position?.coords.longitude);
    }

    mapboxgl.accessToken = 'pk.eyJ1IjoidHJleWphZGVkIiwiYSI6ImNsaXRnZGtmNjEzc2IzanF2c2xvYW54Y28ifQ.zOjQMeR4v4rGw4_L7_-Iig';
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/treyjaded/cliwe9c1002ak01qhag512fac', // style URL
      // DARK STYLE:     mapbox://styles/mapbox/dark-v11
      // CUSTOM TREVON STYLE:   mapbox://styles/treyjaded/cliwe9c1002ak01qhag512fac
      center: [myLongitude, myLatitude], // starting position [lng, lat] NJ = [-74.5, 40]
      zoom: 9, // starting zoom
    });
    // Add geolocate control to the map.
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: false,
      }),
    );
    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl());

    const eventRow = document.getElementsByClassName('eventRow');
    // console.log("event row:", eventRow);

    
    for (let i = 0; i < eventRow.length; i++) {
      const element = eventRow[i];
     
    
      // Add event listener to the element
      element.addEventListener('click', () => {
        // Handle the click event
        // Fly to a random location
        map.flyTo({
          center: [alertData[i]?.eventCoordinates[0][0], alertData[i]?.eventCoordinates[0][1]],
          essential: true, // this animation is considered essential with respect to prefers-reduced-motion
        });
      });
    }


    // Access the specific element in the array






    for (let i = 0; i < data?.length; i++) {
      const latitude = alert[i]?.eventCoordinates[0][1];
      const longitude = alert[i]?.eventCoordinates[0][0];

      const alertLatitude = alertData[i]?.eventCoordinates[0][1];
      const alertLongitude = alertData[i]?.eventCoordinates[0][0];

      const title = alertData[i].severity;
      const eventType = alertData[i].event;


      const mapHold = {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [alertLongitude, alertLatitude],
            },
            properties: {
              title: `${eventType}`,
              description: `${title}`,
            },
          }],
        },
      };




      for (const feature of mapHold.data.features) {
        map.on('load', () => {
          const el = document.createElement('div');
          el.className = 'marker';

          const userLocationPin = document.createElement('div');
          
          const coordinates = alertData[i]?.eventCoordinates[0]; // Coordinates of Disasters
          console.log("coor:", coordinates);
          const { description } = feature.properties; // Description of Disasters
          const type = feature.properties.title; // Type of Disasters

          new mapboxgl.Marker(userLocationPin) // User's location on MAPBOX
            .setLngLat([myLongitude, myLatitude])
            .addTo(map);

          // Make a marker for each feature and add it to the map
          const popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false,
          });

          new mapboxgl.Marker(el)
            .setLngLat(coordinates)
            .addTo(map);

          el.addEventListener('mouseenter', () => {
            // Change the cursor style as a UI indicator.
            map.getCanvas().style.cursor = 'pointer';
            // Copy coordinates array.

            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(coordinates[1] - coordinates[0]) > 180) {
              coordinates[0] += coordinates[1] > coordinates[0] ? 360 : -360;
            }

            // Populate the popup and set its coordinates
            // based on the feature found.
            popup.setLngLat(coordinates).setHTML(`<h3>${type}</h3><p>${description}</p>`).addTo(map);
          });

          el.addEventListener('mouseleave', () => {
            map.getCanvas().style.cursor = '';
            popup.remove();
          });
          
          el.addEventListener('click', () => (
            navigate(`/disaster/${data[i]?.id}`)// Navigate to the "/disaster" page with the specified ID
          ));
        });
      }
    }
  }, [data, myLatitude, myLongitude, alertData]);
  // [-74.5, 40]
  return (<div id="map"></div>);
};
export default MapComponent;

//   }
