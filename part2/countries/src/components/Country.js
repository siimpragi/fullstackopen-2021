import React, { useState, useEffect } from "react";
import axios from "axios";
import Weather from "./Weather";

const Country = ({ country }) => {
  const { name, capital, capitalInfo, area, languages, flags } = country;
  const { latlng } = capitalInfo;

  const [weatherData, setWeatherData] = useState(null);
  useEffect(() => {
    if (!latlng) {
      return;
    }
    const url =
      "https://api.openweathermap.org/data/2.5/onecall?units=metric" +
      `&lat=${latlng[0]}` +
      `&lon=${latlng[1]}` +
      `&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`;

    axios.get(url).then((result) => {
      setWeatherData(result.data);
    });
  }, [latlng]);

  return (
    <div>
      <h1>{name.common}</h1>

      <div>
        <strong>capital:</strong> {capital}
      </div>

      <div>
        <strong>area:</strong> {area}
      </div>

      <div>
        <strong>languages:</strong>
        {languages && (
          <ul>
            {Object.entries(languages).map(([lang, name]) => (
              <li key={lang}>{name}</li>
            ))}
          </ul>
        )}
      </div>

      <div>
        {flags.png && <img alt={`flag of ${name.common}`} src={flags.png} />}
      </div>

      <div>
        <h2>Weather in {capital}</h2>
        {weatherData ? <Weather data={weatherData} /> : "N/A"}
      </div>
    </div>
  );
};

export default Country;
