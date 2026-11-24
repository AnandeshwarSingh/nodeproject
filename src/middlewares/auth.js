const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    // Read the token from the req cookies
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      return res.status(401).send("Please Login!");
    }
    const decodedObj = await jwt.verify(token, "Anand@#$123");

    const { _Id } = decodedObj;

    const user = await User.findById(_Id);

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user; // Attach the user object to the request for further use
    next();

    // Validate the token
    // Find the user
  } catch (error) {
    res.status(400).send("Unauthorized: " + error.message);
  }
};

module.exports = {
  userAuth,
};
