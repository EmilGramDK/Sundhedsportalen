
module.exports = function ({ app, dbConn }) {
  app.get("/", (req, res) => {

    if (req.session.loggedin) {
      
      res.redirect('/home');
      
    } else {

      res.render("index");

    }
  });
  
  app.get("/login", (req, res) => {

    if (req.session.loggedin) {

      res.redirect('/home');
      
    } else {

      res.render("login");

    }
  });

  app.get("/logout", (req, res) => {

    req.session.loggedin = false;
    res.redirect('/');

  });
  
  app.post("/login", (req, res) => {
    const { cpr, password } = req.body;

    if (cpr && password) {

      const sql = "SELECT * FROM users WHERE cpr=? AND password=? LIMIT 1";

      dbConn.query(sql, [cpr, password], function (err, result) {

        if (err) throw error;
        
        if (result.length > 0) {
          
          req.session.loggedin = true;
          req.session.user = result[0];
        
          res.redirect('/home');
  
        } else {

          res.render("login", {
            error: "Forkert brugernavn eller adgangskode"
          });

        }
      });

    } else {

      res.render("login", {
        error: "Forkert brugernavn eller adgangskode"
      });
    }
  });

  app.get('/home', function(req, res) {
    
    if (req.session.loggedin) {
      res.render("home", {
        user: req.session.user
      });
    } else {
      
      res.redirect('/login');
    }
  });

};