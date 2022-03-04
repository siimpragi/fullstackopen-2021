import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleFilterChange = (e) => setFilter(e.target.value);

  const shownPersons = filter
    ? persons.filter((p) => p.name.toLowerCase().includes(filter.toLowerCase()))
    : persons;

  const addPerson = (name, number) => {
    const personWithMatchingName = persons.find((p) => p.name === name);
    if (personWithMatchingName) {
      window.alert(`${name} is already added to phonebook`);
    }

    const fauxId = persons.length + 1;
    const newPerson = {
      id: fauxId,
      name,
      number,
    };

    setPersons(persons.concat(newPerson));
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add new</h2>
      <PersonForm addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons persons={shownPersons} />
    </div>
  );
};

export default App;
