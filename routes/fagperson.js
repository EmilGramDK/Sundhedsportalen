
function checkLogin(req) {

  if (req.session.loggedin && req.session.fagperson) {
    return true;
  }

  return false;

}

function getPatients(userID, dbConn) {

  const sql = "SELECT citizens.id, citizens.CPR, citizens.name FROM roles LEFT JOIN citizens ON citizens.id = roles.user WHERE role = 0 AND roles.place IN (SELECT places.id FROM roles LEFT JOIN places ON places.id = roles.place WHERE roles.user = ? AND roles.role != 0)";

  return new Promise((resolve, reject) => {

    dbConn.query(sql, [userID], function (err, result) {

      if (err) throw err;

      resolve(result);

    });

  });
}

exports.index = function(req, res, dbConn) {

  if (checkLogin(req)) {

    var user = req.session.user;

    const sql = "SELECT places.id, name, address, phone, role FROM roles LEFT JOIN places ON places.id = roles.place WHERE roles.user = ? AND roles.role != 0";

      dbConn.query(sql, [user.id], function (err, result) {

        if (err) throw err;
         
        if (result.length > 0) {

          getPatients(user.id, dbConn).then(patients => {

            res.render("./fagperson/index", {
              user: req.session.user,
              workplaces: result,
              patients: patients
            });

          });

        } else {

          res.redirect('/logout');

        }

      });

  } else {
    
    res.redirect('/fagperson/login');
  }

};

exports.patient = function(req, res, dbConn) {

  if (checkLogin(req)) {

    const patient = req.params.patient;

    const sql = "SELECT id, CPR, name FROM citizens WHERE id = ?";

    dbConn.query(sql, [patient], function (err, result) {

      if (err) throw err;

      if (result.length > 0) {
          
          res.render("./fagperson/patient", {
            user: req.session.user,
            patient: result[0]
          });
  
        } else {
            
            res.redirect('/fagperson');
  
        }

    });

  } else {
    
    res.redirect('/fagperson/login');
  }

}