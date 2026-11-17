const express = require("express");

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;

    console.log("Sending a connection request");
    res.send(user.firstName + " is sending request");
  } catch (error) {
    res.status(500).send("Error sending connection request: " + error.message);
  }
});

module.exports = requestRouter;
