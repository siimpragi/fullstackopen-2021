import { useState, useEffect } from "react";
import axios from "axios";
import Country from "./components/Country";
import CountriesList from "./components/CountriesList";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [nameFilter, setNameFilter] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const filteredCountries = nameFilter
    ? countries.filter((c) =>
        c.name.common.toLowerCase().includes(nameFilter.toLowerCase())
      )
    : countries;

  const show = (country) => {
    const { name } = country;
    setNameFilter(name.common);
  };

  return (
    <div>
      <div>
        <label>
          find countries{" "}
          <input
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
          />
        </label>
      </div>
      <div>
        {filteredCountries.length > 10 ? (
          "too many matches, specify another filter"
        ) : filteredCountries.length > 1 ? (
          <CountriesList countries={filteredCountries} show={show} />
        ) : filteredCountries.length === 1 ? (
          <Country country={filteredCountries[0]} />
        ) : (
          "no matches"
        )}
      </div>
    </div>
  );
};

export default App;
