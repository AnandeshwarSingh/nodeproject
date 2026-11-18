const express = require("express");

const profileRouter = express.Router();

const { validateEditProfileData } = require("../utils/validation");

const { userAuth } = require("../middlewares/auth.js");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  // Implementation for fetching user profile
  try {
    const user = req.user; // Access the authenticated user from the request
    res.send(user);
  } catch (error) {
    res.status(500).send("Error fetching profile: " + error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid profile data");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();

    res.send(`${loggedInUser.firstName} profile updated successfully`);
  } catch (error) {
    res.status(500).send("Error editing profile: " + error.message);
  }
});

module.exports = profileRouter;
