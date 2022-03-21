
function checkLogin(req) {

  if (req.session.loggedin && req.session.fagperson) {
    return true;
  }

  return false;

}

exports.index = function(req, res, dbConn) {

  if (checkLogin(req)) {

    var user = req.session.user;

    const sql = "SELECT practitioner.id, name, address, phone, role FROM roles LEFT JOIN practitioner ON practitioner.id = roles.workplace WHERE roles.professionel = ?";

      dbConn.query(sql, [user.id], function (err, result) {

        if (err) throw err;
        
        if (result.length > 0) {

          res.render("./fagperson/index", {
            user: req.session.user,
            workplaces: result
          });

        }

      });

  } else {
    
    res.redirect('/fagperson/login');
  }

};