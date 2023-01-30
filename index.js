const express = require('express')
const bodyParser = require('body-parser')


const app = express();
const port = process.env.PORT || 5000;
const db = require('./config/mongoose')

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// used for sessions
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local");
const MongoStore = require("connect-mongo");

// set up view engine
app.set("view engine", "ejs");
app.set("views", "./views");


// mongo-store is used to store session cookies in database
app.use(
  session({
    name: "placement-cell",
    secret: "secret",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create({
      mongoUrl:
        "mongodb://127.0.0.1/place_me",
      autoRemove: "disabled",
    }),
      function(err) {
      console.log(err || "connect-mongodb setup ok");
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// sets the authenticated user in the response
app.use(passport.setAuthenticatedUser);

// using express routers
app.use(require("./routes"));



//  listening to the port 8000;
app.listen(port, (err) => {
  if (err) {
    console.log("error in starting the server", err);
    return;
  }
  console.log("server listening on port 5000");
});