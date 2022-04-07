const {
  randomNumber,
  getPatientNotes,
  getPatients,
  checkLogin,
} = require("./functions");

exports.index = function (req, res, dbConn) {
  if (checkLogin(req, true)) {
    var user = req.session.user;
    const alert = req.query.alert;

    const sql =
      "SELECT places.id, name, address, phone, role FROM roles LEFT JOIN places ON places.id = roles.place WHERE roles.user = ? AND roles.role != 0";

    dbConn.query(sql, [user.id], function (err, result) {
      if (err) throw err;

      if (result.length > 0) {
        getPatients(user.id, dbConn).then((patients) => {
          res.render("./fagperson/index", {
            user: req.session.user,
            workplaces: result,
            patients: patients,
            alert: alert,
          });
        });
      } else {
        res.redirect("/logout");
      }
    });
  } else {
    res.redirect("/fagperson/login");
  }
};

exports.patient = function (req, res, dbConn) {
  if (checkLogin(req, true)) {
    const patient = req.params.patient;
    const alert = req.query.alert;

    const sql = "SELECT id, CPR, name FROM citizens WHERE id = ?";

    dbConn.query(sql, [patient], function (err, result) {
      if (err) throw err;

      if (result.length > 0) {
        getPatientNotes(patient, req.session.user.id, dbConn).then((notes) => {
          res.render("./fagperson/patient", {
            user: req.session.user,
            patient: result[0],
            notes: notes,
            alert: alert,
          });
        });
      } else {
        res.redirect("/fagperson");
      }
    });
  } else {
    res.redirect("/fagperson/login");
  }
};

exports.indbakke = function (req, res, dbConn) {
  if (checkLogin(req, true)) {
    const sql =
      "SELECT id, pro, patient, message, date, seen, sentBy FROM messages WHERE pro = ? ORDER BY date DESC";

    dbConn.query(sql, [req.session.user.id], function (err, result) {
      if (err) throw err;

      res.render("./fagperson/indbakke", {
        user: req.session.user,
        messages: result,
      });
    });
  } else {
    res.redirect("/fagperson/login");
  }
};

exports.note = function (req, res, dbConn) {
  if (checkLogin(req, true)) {
    const id = randomNumber();
    const { note, patient } = req.body;

    const sql =
      "INSERT INTO notes (id, pro, patient, note) VALUES (?, ?, ?, ?)";

    dbConn.query(
      sql,
      [id, req.session.user.id, patient, note],
      function (err, result) {
        if (err) throw err;

        res.redirect(
          "/fagperson/patient/" + patient + "?alert=Noten blev tilføjet"
        );
      }
    );
  } else {
    res.send("Du skal være logget ind for at tilføje en note");
  }
};

exports.deleteNote = function (req, res, dbConn) {
  if (checkLogin(req, true)) {
    const { noteId, patient } = req.body;

    const sql = "DELETE FROM notes WHERE id = ?";

    dbConn.query(sql, [noteId], function (err, result) {
      if (err) throw err;

      res.redirect(
        "/fagperson/patient/" + patient + "?alert=Noten blev slettet"
      );
    });
  } else {
    res.send("Du skal være logget ind for at slette en note");
  }
};

exports.sendMessage = function (req, res, dbConn) {
  if (checkLogin(req, true)) {
    const { patient, message } = req.body;

    const sql =
      "INSERT INTO messages (id, pro, patient, message, sentBy) VALUES (?, ?, ?, ?, ?)";

    dbConn.query(
      sql,
      [
        randomNumber(),
        req.session.user.id,
        patient,
        message,
        req.session.user.id,
      ],
      function (err, result) {
        if (err) throw err;

        res.redirect("/fagperson/?alert=Besked blev sendt");
      }
    );
  } else {
    res.send("Du skal være logget ind for at sende en besked");
  }
};
