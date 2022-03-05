import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch(() => {
        setNotification({
          message: "failed to fetch persons from the server",
          type: "error",
        });
      });
  }, []);

  useEffect(() => {
    if (notification !== null) {
      const id = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(id);
    }
  }, [notification]);

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
        `'${personWithMatchingName.name}' is already added to phonebook, replace the old number with a new one?`
      );
      if (shouldReplace) {
        updatePerson(personWithMatchingName.id, personObject);
      }
      return;
    }

    personService
      .create(personObject)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNotification({
          message: `created '${returnedPerson.name}'`,
          type: "success",
        });
      })
      .catch(() => {
        setNotification({
          message: `failed to create '${personObject.name}'`,
          type: "error",
        });
      });
  };

  const updatePerson = (id, personObject) => {
    personService
      .update(id, personObject)
      .then((returnedPerson) => {
        const updatedPersons = persons.map((p) =>
          p.id === id ? returnedPerson : p
        );
        setPersons(updatedPersons);
        setNotification({
          message: `updated '${returnedPerson.name}'`,
          type: "success",
        });
      })
      .catch(() => {
        const updatedPersons = persons.filter((p) => p.id !== personObject.id);
        setPersons(updatedPersons);
        setNotification({
          message: `'${personObject.name}' was already deleted from server`,
          type: "error",
        });
      });
  };

  const removePerson = (id) => {
    const person = persons.find((p) => p.id === id);
    const shouldRemove = window.confirm(`delete '${person.name}'?`);
    if (shouldRemove === false) {
      return;
    }
    personService
      .remove(id)
      .then(() => {
        setNotification({
          message: `deleted '${person.name}'`,
          type: "success",
        });
      })
      .catch(() => {
        setNotification({
          message: `'${person.name}' was already deleted from server`,
          type: "error",
        });
      });
    const updatedPersons = persons.filter((p) => p.id !== id);
    setPersons(updatedPersons);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification notification={notification} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add new</h2>
      <PersonForm addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons persons={shownPersons} removePerson={removePerson} />
    </div>
  );
};

export default App;
