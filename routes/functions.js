// funktion til at generere et random tal
exports.randomNumber = function () {
  return Math.floor(Math.random() * (947932948652987 - 345632 + 1)) + 345632;
};

// funktion til at tjekke om brugeren er logget ind
exports.checkLogin = function (req, fagperson = false) {
  if (req.session.loggedin && req.session.fagperson == fagperson) {
    return true;
  }

  return false;
};

// funktion til at få alle fagpersonens patienter
exports.getPatients = function (userID, dbConn) {
  const sql =
    "SELECT patients.id, patients.CPR, patients.name FROM roles LEFT JOIN patients ON patients.id = roles.user WHERE role = 0 AND roles.place IN (SELECT places.id FROM roles LEFT JOIN places ON places.id = roles.place WHERE roles.user = ? AND roles.role != 0)";

  return new Promise((resolve, reject) => {
    dbConn.query(sql, [userID], function (err, result) {
      if (err) throw err;

      resolve(result);
    });
  });
};

// funktion til at hente alle fagpersonens noter
exports.getPatientNotes = function (patientID, userID, dbConn) {
  const sql = "SELECT note, id FROM notes WHERE patient = ? AND pro = ?";

  return new Promise((resolve, reject) => {
    dbConn.query(sql, [patientID, userID], function (err, result) {
      if (err) throw err;

      resolve(result);
    });
  });
};

// funktion til at få alle fagpersonens patienter
exports.getFagpersoner = function (dbConn) {
  const sql =
    "SELECT professionals.id, roles.role, professionals.name, professionals.MAS FROM roles LEFT JOIN professionals ON roles.user = professionals.id WHERE roles.role > 0";

  return new Promise((resolve, reject) => {
    dbConn.query(sql, [], function (err, result) {
      if (err) throw err;

      resolve(result);
    });
  });
};
