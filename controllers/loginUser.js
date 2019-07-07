const User = require("../database/models/User");

module.exports = (req, res) => {
  const { email, password } = req.body;

  //try to find user

  User.findOne({ email }, (error, user) => {
    if (user) {
      //compare password
      bcrypt.compare(password, user.password, (error, same) => {
        if (same) {
          //save user id in session
          req.session.userId = user._id;
          //store user session
          res.redirect("/");
        } else {
          //redirect user back to login screen
          res.redirect("/auth/login");
        }
      });
    } else {
      return res.redirect("auth/login");
    }
  });
};
