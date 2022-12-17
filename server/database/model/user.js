const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { collection: "userData" }
);
userSchema.method.success = (data) => {
  if (data) {
    alert("Form submitted successfully");
  }
};

const userData = new mongoose.model("userData", userSchema);
module.exports = userData;
