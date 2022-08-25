require("dotenv").config();
const bodyParser = require("body-parser");

let express = require("express");
let app = express();

app.use("/public", express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);

  next();
});

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

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({ time: req.time });
  }
);

app.get("/:word/echo", (req, res) => {
  const requestWord = req.params.word;
  console.log("req.params: ", req.params, "req.params.word: ", req.params.word);

  res.json({ echo: requestWord });
});

app.route("/name").get((req, res) => {
  const fullName = req.query.first + " " + req.query.last;

  res.json({ name: fullName });
});

module.exports = app;
