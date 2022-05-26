const express = require("express");
const morgan = require("morgan"); // Express middleware allows us to extend express with additional functionality. Morgan is express middleware used to have our server automatically log all requests. This helps to give us visibility of what our server is doing.
const cors = require("cors"); // Cors allows us to make HTTP requests to our API.
const app = express();
const port = 3030;

const contacts = require("./data/contacts");
const meetings = require("./data/meetings");

app.use(morgan("dev"));
app.use(cors());
app.use(express.json()); // allows us to automatically pass requests

// 1st arg - the path. 2nd arg - a function, what to do when a particular request is received.
app.get("/", (req, res) => {
  console.log("Reqs", req);
  console.log("Res", res);
  console.log("Got request!");
  res.json("Hello");
});

app.get("/contacts", (req, res) => {
  res.json({ contacts: contacts });
});

app.get("/contacts/:id", (req, res) => {
  console.log("params", req.params);
  console.log("id", req.params.id);
  const contact = contacts.find((item) => item.id === +req.params.id);
  res.json({ contact: contact });
});

app.get("/contacts/:id/meetings", (req, res) => {
  const id = req.params.id;
  const filteredMeetings = meetings.filter((meeting) => {
    return meeting.contactId === id;
  });
  res.json({ meetings: filteredMeetings });
});

app.post("/contacts", (req, res) => {
  console.log(req.body);
  const contactData = { ...req.body, id: contacts.length + 1 };
  contacts.push(contactData);
  res.json({ contact: contact });
});

app.delete("/contacts/:id", (req, res) => {
  const contact = contacts.find((item) => item.id === Number(req.params.id));
  const index = contacts.indexOf(contact);
  contacts.splice(index, 1);
  res.json();
});

app.put("/contacts/:id", (req, res) => {
  const contact = contacts.find((item) => item.id === Number(req.params.id));
  contacts.contacts.map((item) => {
    if (item.id === contact.id) {
      return { ...req.body };
    } else {
      return item;
    }
  });
  contact.firstName = req.body.firstName;
  contact.lastName = req.body.id;
  contact.street = req.body.street;
  contact.city = req.body.city;
  contact.type = req.body.type;
  contact.email = req.body.email;
  contact.linkedIn = req.body.linkedIn;
  contact.twitter = req.body.twitter;
  res.json({ contact: contact });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
