const mongoose = require("mongoose");
const MONGO_URI = "mongodb+srv://arjun:1234@nodejsmongodb.aoy7b.mongodb.net/Ethnus?retryWrites=true&w=majority" || "mongodb://127.0.0.1:27017/budget-tracker-server";

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("Connected to Mongodb");
  })
  .catch((err) => {
    console.error("Something happened to mongodb ", err);
  });
