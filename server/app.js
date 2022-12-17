const express = require("express");
const passport = require("passport");
const morgan = require("morgan");
const expressSession = require("express-session");
const bodyparser = require("body-parser");
require("dotenv").config();
const { connectMongoose } = require("./database/dBconnect");
const {
  initializingPassport,
  isAuthenticated,
} = require("./config/passportConfig");
const tripData = require("./database/model/trip");

//initial setup: express app creation and connection to db
const app = express();
connectMongoose();

//setting up session

app.use(
  expressSession({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

//initializing passport

initializingPassport(passport);
app.use(passport.initialize());
app.use(passport.session());

//built in middlewares:
app.use(express.json());
app.use(morgan("tiny"));

//parse requests to body-parser
app.use(bodyparser.urlencoded({ extended: true }));

//routes
app.use("/", require("./routes/authRoute"));

//routes for CRUD operations
app.use("/add-trip", require("./routes/tripRoute"));

//for testing of protected route:
// here if user is not found, page will be redirected to login page
app.get("/profile", isAuthenticated, (req, res) => {
  res.send(req.user);
});

//server port listening
app.listen(process.env.PORT || 4522, () => {
  console.log("server has been started!");
});
