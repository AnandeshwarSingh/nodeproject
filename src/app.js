const express = require("express");
const connectDB = require("./config/database.js");
const User = require("./models/user.js");
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  console.log(req.body);

  // creating a new user instance of user model
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User created successfully");
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Error creating user: " + error.message);
  }
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
