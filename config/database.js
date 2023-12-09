const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect('mongodb+srv://M001-student:ratantata@sandbox.wxtju51.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("DB connected successfully"))
    .catch((err) => {
      console.log("DB connection falied");
      console.log(err);
      process.exit(1);
    });
};
