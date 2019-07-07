const User = require("../database/models/User");

function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on 
  if (req.session.userId) {
    return res.redirect("/");
  }

  next();
}

module.exports = {
  isLoggedIn,
};