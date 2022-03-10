
exports.index = function(req, res){

  if (req.session.loggedin) {
      
    res.redirect('/borger');
    
  } else {

    res.render("./main/index");
  }

};

exports.logout = function(req, res){

  req.session.loggedin = false;
  res.redirect('/');

};

exports.loginGet = function(req, res){

  if (req.session.loggedin) {

    res.redirect('/borger');
    
  } else {

    res.render("./main/login");

  }

};

exports.loginPost = function(req, res, dbConn){

  const { cpr, password } = req.body;

    if (cpr && password) {

      const sql = "SELECT * FROM users WHERE cpr=? AND password=? LIMIT 1";

      dbConn.query(sql, [cpr, password], function (err, result) {

        if (err) throw error;
        
        if (result.length > 0) {
          
          req.session.loggedin = true;
          req.session.user = result[0];
        
          res.redirect('/borger');
  
        } else {

          res.render("./main/login", {
            error: "Forkert brugernavn eller adgangskode"
          });

        }
      });

    } else {

      res.render("./main/login", {
        error: "Forkert brugernavn eller adgangskode"
      });
    }

};