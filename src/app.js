const express = require("express");
const connectDB = require("./config/database.js");
const User = require("./models/user.js");
const app = express();

app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "Anandeshwar",
    lastName: "Singh",
    email: "anandeshwar.com",
    password: "123456",
    age: 25,
    gender: "Male",
  };

  // creating a new user instance of user model
  const user = new User(userObj);

  await user.save();
  res.send("User created successfully");
});

connectDB()
  .then(() => {
    console.log("Database connected successfully");

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
