
function checkLogin(req) {

  if (req.session.loggedin && req.session.fagperson) {
    return true;
  }

  return false;

}

exports.index = function(req, res, dbConn) {

  if (checkLogin(req)) {

    var user = req.session.user;

    const sql = "SELECT places.id, name, address, phone, role FROM roles LEFT JOIN places ON places.id = roles.place WHERE roles.user = ? AND roles.role != 0";

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