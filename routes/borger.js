const { checkLogin } = require("./functions");

exports.index = function (req, res, dbConn) {
  if (checkLogin(req)) {
    var user = req.session.user;

    const sql =
      "SELECT places.id, name, address, phone, role FROM roles LEFT JOIN places ON places.id = roles.place WHERE roles.user = ? AND roles.role = 0";

    dbConn.query(sql, [user.id], function (err, result) {
      if (err) throw err;

      if (result.length > 0) {
        res.render("./borger/index", {
          user: req.session.user,
          places: result,
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
