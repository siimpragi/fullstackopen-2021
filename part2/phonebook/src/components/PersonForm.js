import React, { useState } from "react";

const PersonForm = ({ addPerson }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNewNameChange = (e) => setNewName(e.target.value);
  const handleNewNumberChange = (e) => setNewNumber(e.target.value);

  const handleAddPerson = (event) => {
    event.preventDefault();
    addPerson(newName, newNumber);
  };

  return (
    <form onSubmit={handleAddPerson}>
      <div>
        <label>
          name: <input value={newName} onChange={handleNewNameChange} />
        </label>
      </div>
      <div>
        <label>
          number: <input value={newNumber} onChange={handleNewNumberChange} />
        </label>
      </div>
      <button type="submit">add</button>
    </form>
  );
};

export default PersonForm;
