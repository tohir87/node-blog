const User = require("../database/models/User");

module.exports = (req, res) => {
  User.create(req.body, (error, user) => {
    //create user

    if (error) {
      const registrationErrors = Object.keys(error.errors).map(
        key => error.errors[key].message
      );

      req.flash("registrationErrors", registrationErrors);
      //flash data
      req.flash("data", req.body);
      //redirects user back
      return res.redirect("/auth/register");
    }
    //redirect to home page
    res.redirect("/");
  });
};
