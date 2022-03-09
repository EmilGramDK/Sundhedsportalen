require("dotenv").config();
const express = require("express");
const session = require('express-session');
const axios = require("axios");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
app.use(session({
	secret: 'secrethash',
	resave: true,
	saveUninitialized: true
}));
const mysql = require("mysql");
const { PORT, DB_HOST, DB_NAME, DB_PORT, DB_USER_NAME, DB_USER_PASSWORD } =
  process.env;

// setup view path
const viewsDirPath = path.join(__dirname, "templates", "views");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", viewsDirPath);
app.use(express.static(path.join(__dirname, "public")));

// connect to the database
const dbConn = mysql.createConnection({
  host: DB_HOST || "",
  user: DB_USER_NAME || "",
  password: DB_USER_PASSWORD || "",
  database: DB_NAME || "",
});

dbConn.connect(function (err) {
  if (err) {
    console.log(err);
    throw err;
  }

  console.log("Connected to the database!");

  // include website routes
  require('./routes')({ app, dbConn });

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});