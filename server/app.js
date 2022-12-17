const express = require("express");
const passport = require("passport");
require("dotenv").config();
const expressSession = require("express-session");
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
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/", require("./routes/authRoute"));
app.use("/trips", require("./routes/tripRoute"));

//for testing of protected route

// here if user is not found, page will be redirected to login page
app.get("/profile", isAuthenticated, (req, res) => {
  res.send(req.user);
});

//server port listening
app.listen(process.env.PORT || 4522, () => {
  console.log("server has been started!");
});
