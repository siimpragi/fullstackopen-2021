import React from "react";

const CountriesList = ({ countries, show }) => {
  const handleShow = (country) => () => show(country);

  return (
    <ul>
      {countries.map((country) => {
        const { cca2, name } = country;
        return (
          <li key={cca2}>
            {name.common} <button onClick={handleShow(country)}>show</button>
          </li>
        );
      })}
    </ul>
  );
};

export default CountriesList;
