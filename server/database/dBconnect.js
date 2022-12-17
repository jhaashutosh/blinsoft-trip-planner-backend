const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

exports.connectMongoose = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((event) => {
        console.log(`Connected to mongoDB: ${event.connection.host}`);
      });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
