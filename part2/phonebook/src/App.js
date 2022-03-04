import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleFilterChange = (e) => setFilter(e.target.value);

  const shownPersons = filter
    ? persons.filter((p) => p.name.toLowerCase().includes(filter.toLowerCase()))
    : persons;

  const addPerson = (personObject) => {
    const personWithMatchingName = persons.find(
      (p) => p.name === personObject.name
    );
    if (personWithMatchingName) {
      const shouldReplace = window.confirm(
        `${personObject.name} is already added to phonebook, replace the old number with a new one?`
      );
      if (shouldReplace) {
        updatePerson(personWithMatchingName.id, personObject);
        return;
      }
    }
    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
    });
  };

  const updatePerson = (id, personObject) => {
    personService.update(id, personObject).then((returnedPerson) => {
      const updatedPersons = persons.map((p) =>
        p.id === id ? returnedPerson : p
      );
      setPersons(updatedPersons);
    });
  };

  const removePerson = (id) => {
    const person = persons.find((p) => p.id === id);
    const shouldRemove = window.confirm(`delete ${person.name}?`);
    if (shouldRemove === false) {
      return;
    }
    personService.remove(id).catch(() => {
      window.alert(`${person.name} was already deleted from server`);
    });
    const updatedPersons = persons.filter((p) => p.id !== id);
    setPersons(updatedPersons);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add new</h2>
      <PersonForm addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons persons={shownPersons} removePerson={removePerson} />
    </div>
  );
};

export default App;
