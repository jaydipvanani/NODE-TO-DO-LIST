require("dotenv").config;
let mongoose = require("mongoose");

function dbConnect() {
let mongo_url = "mongodb://localhost:27017/crud"

  mongoose
    .connect(mongo_url)
    .then(() => {
      console.log("database connect success");
    })
    .catch((err) => {
      console.log(err, "err");
    });
}

module.exports = dbConnect;