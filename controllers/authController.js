const express = require("express"),
    router = express.Router(),
    connectFlash = require("connect-flash"),
    bcrypt = require('bcrypt'),
    User = require("../database/models/User");

/**
 * Render the login form
 */
router.get('/login', (req, res) => {
    res.render("login");
});

/**
 * This method will be fired when the login form is submitted
 */
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    //try to find user

    User.findOne({ email }, (error, user) => {
        if (user) {
            //compare password
            bcrypt.compare(password, user.password, (error, result) => {
                if (result) {
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
});

/**
 * Render the register page
 */
router.get('/register', (req, res) => {
    res.render("register", {
        // display validation error
        errors: req.flash("registrationErrors"),
        //send data to template
        data: req.flash("data")[0],
    });
});

/**
 * This method is fired the the register form is submitted
 */
router.post('/register', (req, res) => {
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
});

router.get('/logout', (req, res) => {
    //destroy session data including userId
    req.session.destroy(() => {
        res.redirect("/");
    });
});

module.exports = router;