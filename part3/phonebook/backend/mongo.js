const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

if (process.argv.length !== 3 && process.argv.length !== 5) {
  console.log("Correct usage is: node mongo.js <password> [<name> <number>]");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://siim:${password}@cluster0.escks.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 5) {
  const name = process.argv[3];
  const number = process.argv[4];
  const person = new Person({
    name,
    number,
  });
  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}

if (process.argv.length === 3) {
  Person.find({}).then((persons) => {
    console.log("phonebook:");
    persons.forEach((p) => {
      console.log(p.name, p.number);
    });
    mongoose.connection.close();
  });
}
