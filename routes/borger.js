const { checkLogin, getFagpersoner, randomNumber } = require("./functions");

exports.index = function (req, res, dbConn) {
  if (checkLogin(req)) {
    var user = req.session.user;

    const sql =
      "SELECT places.id, name, address, phone, role FROM roles LEFT JOIN places ON places.id = roles.place WHERE roles.user = ? AND roles.role = 0";

    dbConn.query(sql, [user.id], function (err, result) {
      if (err) throw err;

      if (result.length > 0) {
        getFagpersoner(dbConn).then((fagpersoner) => {
          res.render("./borger/index", {
            user: req.session.user,
            places: result,
            fagpersoner: fagpersoner,
          });
        });
      }
    });
  } else {
    res.redirect("/borger/login");
  }
};

exports.recepter = function (req, res) {
  if (checkLogin(req)) {
    res.render("./borger/recepter", {
      user: req.session.user,
    });
  } else {
    res.redirect("/borger/login");
  }
};

exports.sendMessage = function (req, res, dbConn) {
  if (checkLogin(req, false)) {
    const { fagperson, message } = req.body;

    const sql =
      "INSERT INTO messages (id, pro, patient, message, sentBy) VALUES (?, ?, ?, ?, ?)";

    dbConn.query(
      sql,
      [
        randomNumber(),
        fagperson,
        req.session.user.id,
        message,
        req.session.user.id,
      ],
      function (err, result) {
        if (err) throw err;

        res.redirect("/borger/?alert=Besked blev sendt");
      }
    );
  } else {
    res.send("Du skal være logget ind for at sende en besked");
  }
};
