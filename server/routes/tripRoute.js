const express = require("express");
const Trip = require("../database/model/trip");
const { isAuthenticated } = require("../config/passportConfig");

const router = express.Router();

//authentication is required to open trips page:

//getting all trips data:
router.get("/", isAuthenticated, (req, res) => {
  Trip.find()
    .then((tripData) => res.send(tripData))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error occurred while retrieving the data",
      });
    });
});

//getting a particular trip's Data:

router.get("/:id", isAuthenticated, async (req, res) => {
  const id = req.params.id;
  Trip.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `User may not be found` });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error updating user information" });
    });
});

//adding new trip to the list:
router.post("/", isAuthenticated, async (req, res) => {
  const tripData = await Trip.findOne({ destination: req.body.destination });
  if (tripData)
    return res.status(400).send("This location is already in your list");
  const newTrip = await Trip.create(req.body);
  console.log(newTrip);
  res.status(200).send("Your trip has been added");
});

//updating already added trip data:
router.put("/:id", isAuthenticated, async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }
  const id = req.params.id;
  Trip.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `User may not be found` });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error updating user information" });
    });
});

//deleting already added trip data:
router.delete("/:id", isAuthenticated, async (req, res) => {
  const id = req.params.id;
  Trip.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `User may not be found` });
      } else {
        res.send({ message: "User was deleted successfully" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error updating user information" });
    });
});

module.exports = router;
