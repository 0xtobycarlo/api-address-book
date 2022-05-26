const express = require("express");
const morgan = require("morgan"); // Express middleware allows us to extend express with additional functionality. Morgan is express middleware used to have our server automatically log all requests. This helps to give us visibility of what our server is doing.
const cors = require("cors"); // Cors allows us to make HTTP requests to our API.
const app = express();
const port = 3030;

const contacts = require("./data/contacts");
const meetings = require("./data/meetings");

app.use(morgan("dev"));
app.use(cors());

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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
