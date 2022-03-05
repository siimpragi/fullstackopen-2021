import React from "react";

const Persons = ({ persons, removePerson }) => (
  <div>
    {persons.map((person) => {
      const handleRemove = () => removePerson(person.id);
      return (
        <Person key={person.id} person={person} handleRemove={handleRemove} />
      );
    })}
  </div>
);

const Person = ({ person, handleRemove }) => {
  const { name, number } = person;
  return (
    <div>
      {name} {number} <button onClick={handleRemove}>delete</button>
    </div>
  );
};

export default Persons;
