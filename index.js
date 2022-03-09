const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

const viewsDirPath = path.join(__dirname, "templates", "views");
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", viewsDirPath);
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "p2login" && password === "12345") {
    res.render("success", {
      username: username,
    });
  } else {
    res.render("failure");
  }
});

app.listen(3000, () => {
  console.log("server started on port 3000");
});
