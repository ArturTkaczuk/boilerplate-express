require("dotenv").config();

let express = require("express");
let app = express();

app.use("/public", express.static(__dirname + "/public"));

const absolutePath = __dirname + "/views/index.html";

app.get("/", (req, res) => {
  res.sendFile(absolutePath);
});

app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({ message: "Hello json".toUpperCase() });
  } else {
    res.json({ message: "Hello json" });
  }
});

module.exports = app;
