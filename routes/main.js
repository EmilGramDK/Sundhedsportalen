const { checkLogin } = require("./functions");

exports.index = function (req, res) {
  if (checkLogin(req)) {
    res.redirect("/borger");
  } else if (checkLogin(req, true)) {
    res.redirect("/fagperson");
  } else {
    res.render("./main/index");
  }
};

exports.logout = function (req, res) {
  req.session.loggedin = false;
  res.redirect("/");
};

exports.borgerLoginGet = function (req, res) {
  if (checkLogin(req)) {
    res.redirect("/borger");
  } else {
    res.render("./main/login");
  }
};

exports.borgerLoginPost = function (req, res, dbConn) {
  const { cpr, password } = req.body;

  if (cpr && password) {
    const sql = "SELECT * FROM patients WHERE cpr=? AND password=? LIMIT 1";

    dbConn.query(sql, [cpr, password], function (err, result) {
      if (err) throw err;

      if (result.length > 0) {
        req.session.loggedin = true;
        req.session.fagperson = false;

        var cpr = `${result[0].CPR}`;
        var secure_cpr = cpr.replace(/\d{4}$/, "****");

        req.session.user = {
          id: result[0].id,
          name: result[0].name,
          cpr: secure_cpr,
          practitioner: result[0].practitioner,
          gender: result[0].gender,
          birthday: result[0].birthday,
        };

        res.redirect("/borger");
      } else {
        res.render("./main/login", {
          error: "Forkert brugernavn eller adgangskode",
        });
      }
    });
  } else {
    res.render("./main/login", {
      error: "Forkert brugernavn eller adgangskode",
    });
  }
};

exports.fagpersonLoginGet = function (req, res) {
  if (checkLogin(req, true)) {
    res.redirect("/fagperson");
  } else {
    res.render("./main/fagperson");
  }
};

exports.fagpersonLoginPost = function (req, res, dbConn) {
  const { cpr, password } = req.body;

  if (cpr && password) {
    const sql =
      "SELECT * FROM professionals WHERE MAS=? AND password=? LIMIT 1";

    dbConn.query(sql, [cpr, password], function (err, result) {
      if (err) throw err;

      if (result.length > 0) {
        req.session.loggedin = true;
        req.session.fagperson = true;

        var mas = `${result[0].MAS}`;
        var secure_mas = mas.replace(/\d{4}$/, "****");

        req.session.user = {
          id: result[0].id,
          name: result[0].name,
          mas: secure_mas,
          gender: result[0].gender,
          birthday: result[0].birthday,
        };

        res.redirect("/fagperson");
      } else {
        res.render("./main/fagperson", {
          error: "Forkert brugernavn eller adgangskode",
        });
      }
    });
  } else {
    res.render("./main/fagperson", {
      error: "Forkert brugernavn eller adgangskode",
    });
  }
};
