const express = require("express");
const connectDB = require("./config/database.js");
const User = require("./models/user.js");
const app = express();
const validateSignUpData = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth.js");

app.use(cookieParser());

app.use(express.json());

app.post("/signup", async (req, res) => {
  console.log(req.body);

  // creating a new user instance of user model
  const user = new User(req.body);

  const { firstName, lastName, email, password } = req.body;

  try {
    validateSignUpData(req);
    //Encrypt thr Password

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    await user.save();
    res.send("User created successfully");
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Error creating user: " + error.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.user.validatePassword(password);
    if (!isMatch) {
      return res.status(401).send("Invalid credentials");
    }

    const token = await user.getJWT();
    res.cookie("token", token, {
      secure: process.env.NODE_ENV === "production", // Set to true in production
    });

    res.send("Login successful");
  } catch (error) {
    res.status(500).send("Error logging in: " + error.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  // Implementation for fetching user profile
  try {
    const user = req.user; // Access the authenticated user from the request
    res.send(user);
  } catch (error) {
    res.status(500).send("Error fetching profile: " + error.message);
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;

    console.log("Sending a connection request");
    res.send(user.firstName + " is sending request");
  } catch (error) {
    res.status(500).send("Error sending connection request: " + error.message);
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
