
function checkLogin(req) {

  if (req.session.loggedin && !req.session.fagperson) {
    return true;
  }

  return false;

}

exports.index = function(req, res, dbConn) {

  if (checkLogin(req)) {

    var user = req.session.user;

    const sql = "SELECT * FROM practitioner WHERE id=? LIMIT 1";

      dbConn.query(sql, [user.practitioner], function (err, result) {

        if (err) throw err;
        
        if (result.length > 0) {

          res.render("./borger/index", {
            user: req.session.user,
            practitioner: result[0]
          });

        }

      });

  } else {
    
    res.redirect('/borger/login');
  }

};

exports.recepter = function(req, res){

  if (checkLogin(req)) {

    res.render("./borger/recepter", {
      user: req.session.user
    });

  } else {
    
    res.redirect('/borger/login');
  }

};