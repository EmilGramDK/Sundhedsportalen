
module.exports = function ({ app, dbConn }) {

  var main = require('./main')
  var borger = require('./borger')
  
  // main routes
  app.get('/', main.index);
  app.get('/login', main.loginGet);
  app.post('/login', function(req, res) { main.loginPost(req, res, dbConn) });
  app.get('/logout', main.logout);

  // borger routes
  app.get('/borger', borger.index)
  app.get('/borger/recepter', borger.recepter)

  // fagperson routes

};