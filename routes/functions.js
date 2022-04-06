exports.randomNumber = function () {
  return Math.floor(Math.random() * (947932948652987 - 345632 + 1)) + 345632;
};

exports.checkLogin = function (req, fagperson = false) {
  if (req.session.loggedin && req.session.fagperson == fagperson) {
    return true;
  }

  return false;
};

exports.getPatients = function (userID, dbConn) {
  const sql =
    "SELECT citizens.id, citizens.CPR, citizens.name FROM roles LEFT JOIN citizens ON citizens.id = roles.user WHERE role = 0 AND roles.place IN (SELECT places.id FROM roles LEFT JOIN places ON places.id = roles.place WHERE roles.user = ? AND roles.role != 0)";

  return new Promise((resolve, reject) => {
    dbConn.query(sql, [userID], function (err, result) {
      if (err) throw err;

      resolve(result);
    });
  });
};

exports.getPatientNotes = function (patientID, userID, dbConn) {
  const sql = "SELECT note, id FROM notes WHERE patient = ? AND pro = ?";

  return new Promise((resolve, reject) => {
    dbConn.query(sql, [patientID, userID], function (err, result) {
      if (err) throw err;

      resolve(result);
    });
  });
};
