const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

exports.connectMongoose = () => {
  mongoose
    .connect("mongodb://localhost:27017/user")
    .then((event) => {
      console.log(`Connected to mongoDB: ${event.connection.host}`);
    })
    .catch((err) => console.log(err));
};
