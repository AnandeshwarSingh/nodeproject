const express = require("express");

const app = express();

app.use("/user", (req, res) => {
  res.send("Hahahahahhahaha");
});

app.use("/hello/2", (req, res) => {
  res.send(
    "Kdak sing k khadane se khadakti hai khidkiya khidkiyon k kdakne se khadakte hai khadak Singh.",
  );
});

app.get("/user", (req, res) => {
  res.send({ "first name": "Anand", "last name": "Singh" });
});

app.post("/user", (req, res) => {
  console.log("Data received in the server:");
  res.send("Data successfully saved in the database");
});

app.delete("/user", (req, res) => {
  res.send("Data successfully deleted from the database");
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
