const express = require("express");

const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res) => {
  // Implementation for fetching user profile
  try {
    const user = req.user; // Access the authenticated user from the request
    res.send(user);
  } catch (error) {
    res.status(500).send("Error fetching profile: " + error.message);
  }
});

module.exports = profileRouter;
