const User = require("../database/models/User");

function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on 
  if (req.session.userId) {
    return res.redirect("/");
  }

  next();
}

function userExist(req, res, next) {
  // fetch user from database
  User.findById(req.session.userId, (error, user) => {
    if (error || !user) {
      return res.redirect("/");
    }
    console.log("passed authentication");
    next();
  });
}

module.exports = {
  isLoggedIn,
  userExist,
};