exports.index = function(req, res){

  if (req.session.loggedin) {
    res.render("./borger/index", {
      user: req.session.user
    });
  } else {
    
    res.redirect('/login');
  }

};

exports.recepter = function(req, res){

  if (req.session.loggedin) {
    res.render("./borger/recepter", {
      user: req.session.user
    });
  } else {
    
    res.redirect('/login');
  }

};