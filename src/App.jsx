import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [temp, setTemp] = useState([]);
  const [city, setCity] = useState('');
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      let { latitude, longitude } = position.coords;
      // Query API to get weather
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=4b3ae004b67065c36af21df0028adae9`
      );
      setTemp(weatherResponse.data.main.temp)
      // Query the Weather API to get city
      const locationResponse = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=9a5e70a1dda6499da0a396f3c8e9d84e`
      );
      setCity(locationResponse.data.results[0].components.city)
      debugger;
    });
  }, []);

  return (
    <div data-cy="weather-display">
      <h4 data-cy="temp">Temperature: {temp}°C </h4>
      <h4 data-cy="city">City: {city} </h4>
    </div>
  );
};

export default App;
