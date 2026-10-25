const express = require("express");

const app = express();

app.use("/hello/2", (req, res) => {
  res.send(
    "Kdak sing k khadane se khadakti hai khidkiya khidkiyon k kdakne se khadakte hai khadak Singh.",
  );
});

app.use("/hello", (req, res) => {
  res.send("Hello, from hello path!");
});

app.use("/", (req, res) => {
  res.send("Hello, from the server!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
