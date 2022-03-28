require("dotenv").config();
const express = require("express");
const session = require('cookie-session');
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const mysql = require("mysql");
const { PORT, DB_HOST, DB_NAME, DB_PORT, DB_USER_NAME, DB_USER_PASSWORD, HASH } =
  process.env;

// check if the constants above is defined
if (!PORT || !DB_HOST || !DB_NAME || !DB_PORT || !DB_USER_NAME || !DB_USER_PASSWORD || !HASH) {
  console.log("Please make sure you have defined all the constants in the .env file");
  process.exit(1);
}

// setup hash for cookie storage
app.use(session({
	secret: HASH,
	resave: true,
	saveUninitialized: true
}));

// setup view path
const viewsDirPath = path.join(__dirname, "views");
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