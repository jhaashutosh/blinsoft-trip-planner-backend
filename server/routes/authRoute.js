const express = require("express");
const User = require("../database/model/user");
const passport = require("passport");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.post("/register", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).send("User already exists");

  //if user doesn't exist in the database

  req.body.password = await bcrypt.hash(req.body.password, 10);
  const newUser = await User.create(req.body);
  console.log(newUser);
  const userData = await newUser.save();
  res.status(201).send(newUser);
});

router.get("/register", (req, res) => {
  res.send("redirected to register page");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/register",
    successRedirect: "/trips",
  }),
  (req, res) => {
    return res.send("success");
  }
);

module.exports = router;
