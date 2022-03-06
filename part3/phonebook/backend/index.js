const { application } = require("express");
const express = require("express");
const app = express();

app.use(express.json());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((p) => p.id)) : 0;
  return maxId + 1;
};

app.get("/info", (_, res) => {
  const info = `<p>Phonebook has info for ${
    persons.length
  } people.</p><p>${new Date()}</p>`;
  res.send(info);
});

app.get("/api/persons", (_, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((p) => p.id === id);
  if (!person) {
    return res.status(404).json({ error: "no such person" });
  }
  res.json(person);
});

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;
  // TODO: we're repeating ourselves...
  if (!name) {
    return res.status(400).json({ error: "'name' is missing" });
  }
  if (!number) {
    return res.status(400).json({ error: "'number' is missing" });
  }
  const personWithMatchingName = persons.find((p) => p.name === name);
  if (personWithMatchingName) {
    return res.status(400).json({ error: "'name' must be unique" });
  }

  const person = {
    id: generateId(),
    name,
    number,
  };
  persons = persons.concat(person);
  res.json(person);
});

app.put("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((p) => p.id === id);
  if (!person) {
    return res.status(404).json({ error: "no such person" });
  }
  const { name, number } = req.body;
  if (!name) {
    return res.status(400).json({ error: "'name' is missing" });
  }
  if (!number) {
    return res.status(400).json({ error: "'number' is missing" });
  }
  if (person.name !== name) {
    const personWithMatchingName = persons.find((p) => p.name === name);
    if (personWithMatchingName) {
      return res.status(400).json({ error: "'name' must be unique" });
    }
  }

  const updatedPerson = {
    id,
    name,
    number,
  };
  persons = persons.map((p) => (p.id === id ? updatedPerson : p));
  res.json(updatedPerson);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((p) => p.id !== id);
  res.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
