const mongoose = require("mongoose");
const tripSchema = new mongoose.Schema(
  {
    destination: {
      type: String,
      required: true,
    },
    budget: {
      type: String,
      required: true,
    },
    tripType: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    activities: {
      type: Array,
      required: true,
    },
  },
  { collection: "tripData" }
);
tripSchema.method.success = (data) => {
  if (data) {
    alert("Form submitted successfully");
  }
};

const tripData = new mongoose.model("tripData", tripSchema);
module.exports = tripData;
