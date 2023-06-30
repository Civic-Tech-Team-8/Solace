const { Events } = require("pg");
const turf = require("turf");
const inPolygon = require("@turf/boolean-point-in-polygon");

const listEvents = async (req, res) => {
  const {
    session: { userId },
    db: { User },
  } = req;
  // console.log("user id", userId)

  const fetchData = async (url) => {
    try {
      const response = await fetch(url); // use fetch
      const data = await response.json(); // convert incoming json data to js object
      console.log(data)
      return data; // return that data
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  const processed = [];

  const { features: disasters } = await fetchData('https://api.weather.gov/alerts/active?severity=Severe&limit=1');
  
  const users = await User.list();
  // console.log(users[0].update)
  const filtered = disasters.filter((disaster) => !!disaster.geometry);
  filtered.forEach((disaster) => {
    const { geometry: { coordinates } } = disaster;
    const polygon = turf.polygon(coordinates);
    const usersToAdd = [];

    users.forEach((user) => {
      const { location: { latitude, longitude } } = user;
      const point = turf.point([+latitude, +longitude]);
      const isInside = inPolygon.default(point, polygon);
      if (isInside) {
        usersToAdd.push(user);
      }
    });

    const { 
      id,
      properties: {
      severity,
      event,
      headline,
      description,
      instruction,
      response,
      status
    } } = disaster;
    processed.push({
      id,
      severity,
      event,
      headline,
      description,
      instruction,
      response,
      nearByUsers: usersToAdd,
      eventCoordinates: coordinates[0],
      status });
  });
  let j = 0
  for(let i = 0; i < processed.length && j < users.length; i++) {
    const curr = processed[i];
    const currentIndex = j
    while(j < users.length) {
      curr.nearByUsers.push(users[j])
      if(j - currentIndex === 5) break;
      j++
    }
  }
  return res.send(processed);
  // return res.send(202)
};

module.exports = listEvents;
