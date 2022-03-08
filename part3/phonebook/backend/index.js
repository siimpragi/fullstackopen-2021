require("dotenv").config();
const express = require("express");
const app = express();
const Person = require("./models/person");
const morgan = require("morgan");
const cors = require("cors");

app.use(cors());
app.use(express.static("build"));
app.use(express.json());

morgan.token("post-req-body", function (req, _) {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
});
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :post-req-body"
  )
);

app.get("/info", (_, res) => {
  Person.find({}).then((persons) => {
    const info = `<p>Phonebook has info for ${
      persons.length
    } people.</p><p>${new Date()}</p>`;
    res.send(info);
  });
});

app.get("/api/persons", (_, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id).then((person) => {
    if (!person) {
      return res.status(404).json({ error: "no such person" });
    }
    res.json(person);
  });
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
  const person = new Person({ name, number });
  person.save().then((savedPerson) => {
    res.json(savedPerson);
  });
});

app.put("/api/persons/:id", (req, res) => {
  const { name, number } = req.body;
  if (!name) {
    return res.status(400).json({ error: "'name' is missing" });
  }
  if (!number) {
    return res.status(400).json({ error: "'number' is missing" });
  }
  // TODO: not sure if 'Update' is correct in case of a PUT
  Person.findByIdAndUpdate(req.params.id, { name, number }).then(
    (updatedPerson) => {
      if (!updatedPerson) {
        return res.status(404).json({ error: "no such person" });
      }
      res.json(updatedPerson);
    }
  );
});

app.delete("/api/persons/:id", (req, res) => {
  Person.findByIdAndRemove(req.params.id).then(() => {
    res.status(204).end();
  });
});

const unknownEndpoint = (_, res) => {
  res.status(404).json({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
