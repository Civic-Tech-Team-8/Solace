/* eslint-disable max-len */
import React, { useEffect, useContext, useState} from 'react';
import mapboxgl from 'mapbox-gl';
import CurrentUserContext from '../contexts/current-user-context.js';
import 'mapbox-gl/dist/mapbox-gl.css';
// import { DataContext } from '/Users/jaded/Development/test react/src/assets/DataContext.jsx'

const MapComponent = () => {
  // const [latitude, setLatitude] = useState([]);
  const { eventData } = useContext(CurrentUserContext); // Data from MapComponent

  console.log("event data from map:", eventData);

  const latitude = eventData?.events[0]?.geometry[0]?.coordinates[0];
  const longitude = eventData?.events[0]?.geometry[0]?.coordinates[1] // the "?" character is if it doesn't exist give undefined

  console.log("Latitude:", latitude);
  console.log("Longitude:", longitude);

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoidHJleWphZGVkIiwiYSI6ImNsaXRnZGtmNjEzc2IzanF2c2xvYW54Y28ifQ.zOjQMeR4v4rGw4_L7_-Iig';
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/treyjaded/cliwe9c1002ak01qhag512fac', // style URL
      center: [-74.5, 40], // starting position [lng, lat] NJ = [-74.5, 40]
      zoom: 9, // starting zoom
    });
    //  const popup = new mapboxgl.Popup({ closeOnClick: false })
    map.on('load', () => {
      new mapboxgl.Popup({ closeOnClick: false })
        .setLngLat([latitude, longitude])
        .setHTML('<h1>longitude check!</h1>')
        .addTo(map);

      new mapboxgl.Popup({ closeOnClick: false })
        .setLngLat([-123.9749, 40.7736])
        .setHTML('<h1>Hey World!</h1>')
        .addTo(map);

      new mapboxgl.Popup({ closeOnClick: false })
        .setLngLat([14, 23])
        .setHTML('<h1>Bonjour le monde!</h1>')
        .addTo(map);

      new mapboxgl.Popup({ closeOnClick: false })
        .setLngLat([-97.91772901156455, 18.988768526321365])
        .setHTML('<h1>Hola Mundo!</h1>')
        .addTo(map);

      new mapboxgl.Popup({ closeOnClick: false })
        .setLngLat([-67.67617340843067, -33.80002186085345])
        .setHTML('<h1>Olá Mundo!</h1>')
        .addTo(map);

      new mapboxgl.Popup({ closeOnClick: false })
        .setLngLat([19.35052445717912, 64.63980479322365])
        .setHTML('<h1>Witaj świecie!</h1>')
        .addTo(map);

      new mapboxgl.Popup({ closeOnClick: false })
        .setLngLat([115.9518135866121, 63.20184619910259])
        .setHTML('<h1>Привет, мир!</h1>')
        .addTo(map);
    });

    return () => {
      map.remove();
    };
  }, [latitude, longitude]);

  return (
      <div id="map"></div>
  );
};

export default MapComponent;
