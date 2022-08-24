let express = require("express");
let app = express();

app.use("/public", express.static(__dirname + "/public"));

const absolutePath = __dirname + "/views/index.html";

app.get("/", (req, res) => {
  res.sendFile(absolutePath);
});

app.get("/json", (req, res) => {
  res.json({ message: "Hello json" });
});

module.exports = app;
