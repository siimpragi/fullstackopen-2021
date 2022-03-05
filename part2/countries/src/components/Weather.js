import React from "react";

const Weather = ({ data }) => {
  const { current } = data;
  const { temp, wind_speed, weather } = current;

  return (
    <div>
      <div>
        <strong>temperature:</strong> {temp} Celcius
      </div>
      <div>
        {weather.map((w) => (
          <img
            key={w.id}
            alt={`icon for ${w.description}`}
            src={`http://openweathermap.org/img/wn/${w.icon}@2x.png`}
          />
        ))}
      </div>
      <div>
        <strong>wind speed:</strong> {wind_speed} m/s
      </div>
    </div>
  );
};

export default Weather;
