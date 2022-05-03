const main = require("./main");
module.exports = function ({ app, dbConn }) {
  var main = require("./main");
  var borger = require("./borger");
  var fagperson = require("./fagperson");

  // main routes
  app.get("/", main.index);
  app.get("/borger/login", main.borgerLoginGet);
  app.post("/borger/login", function (req, res) {
    main.borgerLoginPost(req, res, dbConn);
  });
  app.get("/fagperson/login", main.fagpersonLoginGet);
  app.post("/fagperson/login", function (req, res) {
    main.fagpersonLoginPost(req, res, dbConn);
  });
  app.get("/logout", main.logout);

  // borger routes
  app.get("/borger", function (req, res) {
    borger.index(req, res, dbConn);
  });
  app.get("/borger/recepter", borger.recepter);
  app.post("/borger/sendMessage", function (req, res) {
    borger.sendMessage(req, res, dbConn);
  });

  // fagperson routes
  app.get("/fagperson", function (req, res) {
    fagperson.index(req, res, dbConn);
  });
  app.get("/fagperson/patient/:patient", function (req, res) {
    fagperson.patient(req, res, dbConn);
  });
  app.get("/fagperson/indbakke", function (req, res) {
    fagperson.indbakke(req, res, dbConn);
  });
  app.get("/fagperson/recipes/:patient", function (req, res) {
    fagperson.recipes(req, res, dbConn);
  });

  app.post("/fagperson/note/", function (req, res) {
    fagperson.note(req, res, dbConn);
  });
  app.post("/fagperson/deleteNote", function (req, res) {
    fagperson.deleteNote(req, res, dbConn);
  });
  app.post("/fagperson/sendMessage", function (req, res) {
    fagperson.sendMessage(req, res, dbConn);
  });
  app.post("/fagperson/addRecipe", function (req, res) {
    fagperson.addRecipe(req, res, dbConn);
  });
  app.get("/main/nySide", function (req, res) {
    main.nySide(req, res, dbConn);
  });
  app.get("/main/nySide2", function (req, res) {
    main.nySide2(req, res, dbConn);
  });
};
