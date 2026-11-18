const express = require("express");

const authRoutes = express.Router();

const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

authRoutes.post("/signup", async (req, res) => {
  console.log(req.body);

  // creating a new user instance of user model
  const user = new User(req.body);

  const { firstName, lastName, email, password, age } = req.body;

  try {
    validateSignUpData(req);
    //Encrypt thr Password

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      age,
    });

    await user.save();
    res.send("User created successfully");
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Error creating user: " + error.message);
  }
});

authRoutes.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Compare the provided password with the hashed password
    const isMatch = await user.validatePassword(password);
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

authRoutes.post("/logout", (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()), // Set the cookie to expire immediately
    });
    res.send("Logout successful");
  } catch (error) {
    res.status(500).send("Error logging out: " + error.message);
  }
});

module.exports = authRoutes;
