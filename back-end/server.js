const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const cookieSession = require('cookie-session');
// import the users module and setup its API path
const users = require("./users.js");
const memories = require("./memories.js");

const app = express();

// bodyParser({limit: '4MB'})

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
  extended: false,
  limit: '50mb'
}));

// connect to the database
mongoose.connect('mongodb://localhost:27017/pensieve', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

app.use(cookieParser());

app.use(cookieSession({
  name: 'session',
  keys: ['secretValue'],
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

app.use("/", memories.routes);
app.use("/api/users", users.routes)

app.listen(3030, () => console.log('Server listening on port 3030!'));
