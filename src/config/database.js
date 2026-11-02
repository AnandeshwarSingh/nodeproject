const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://anandeshwarsingh5899_db_user:F9L9ET1XCot5K79x@nodejs.teo5fim.mongodb.net/devT",
  );
};

module.exports = connectDB;
