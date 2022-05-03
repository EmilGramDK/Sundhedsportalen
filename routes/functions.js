const { use } = require("express/lib/application");

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

// funktion til at tælle antal ulæste beskeder
exports.countPatientMessages = function (userID, dbConn) {
  const sql =
    "SELECT COUNT(*) AS count FROM messages WHERE patient = ? AND sentBy != ? AND seen = 0";

  return new Promise((resolve, reject) => {
    dbConn.query(sql, [userID, userID], function (err, result) {
      if (err) throw err;

      resolve(result);
    });
  });
};

// funktion til at tælle antal ulæste beskeder
exports.countFagpersonMessages = function (userID, dbConn) {
  console.log(userID);

  const sql =
    "SELECT COUNT(*) AS count FROM messages WHERE pro = ? AND sentBy != ? AND seen = 0";

  return new Promise((resolve, reject) => {
    dbConn.query(sql, [userID, userID], function (err, result) {
      if (err) throw err;

      resolve(result);
    });
  });
};

// funktion til at markere beskeder som læst
exports.markMessagesAsSeenFagperson = function (userID, dbConn) {
  const sql = "UPDATE messages SET seen = 1 WHERE pro = ? AND sentBy != ?";

  dbConn.query(sql, [userID, userID], function (err, result) {
    if (err) throw err;
  });
};

// funktion til at markere beskeder som læst
exports.markMessagesAsSeenPatient = function (userID, dbConn) {
  const sql = "UPDATE messages SET seen = 1 WHERE patient = ? AND sentBy != ?";

  dbConn.query(sql, [userID, userID], function (err, result) {
    if (err) throw err;
  });
};

// funktion til at hente patientens recepter
exports.getPatientrecipes = function (patientID, dbConn) {
  const sql =
    "SELECT patient, medicine, description, pickedup, title, date FROM recipes LEFT JOIN medicine ON medicine.id = recipes.medicine WHERE patient = ?";

  return new Promise((resolve, reject) => {
    dbConn.query(sql, [patientID], function (err, result) {
      if (err) throw err;

      resolve(result);
    });
  });
};

// funktion til at hente patientens journaler
exports.getPatientJournals = function (patientID, dbConn) {
  const sql = "SELECT * FROM journals WHERE patient = ?";

  return new Promise((resolve, reject) => {
    dbConn.query(sql, [patientID], function (err, result) {
      if (err) throw err;

      resolve(result);
    });
  });
};

// funktion til at hente patientens laboratoiresvar
exports.getPatientLaboratories = function (patientID, dbConn) {
  const sql = "SELECT * FROM laboratories WHERE patient = ?";

  return new Promise((resolve, reject) => {
    dbConn.query(sql, [patientID], function (err, result) {
      if (err) throw err;

      resolve(result);
    });
  });
};

// funktion til at hente patientens vaccinationer
exports.getPatientVaccinations = function (patientID, dbConn) {
  const sql = "SELECT * FROM vaccinations WHERE patient = ?";

  return new Promise((resolve, reject) => {
    dbConn.query(sql, [patientID], function (err, result) {
      if (err) throw err;

      resolve(result);
    });
  });
};

// funktion til at hente alt medicin
exports.getMedicine = function (dbConn) {
  const sql = "SELECT * FROM medicine";

  return new Promise((resolve, reject) => {
    dbConn.query(sql, [], function (err, result) {
      if (err) throw err;

      resolve(result);
    });
  });
};
