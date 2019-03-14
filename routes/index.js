var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
// =================
// INDEX ROUTING
// =================

// LANDING - Index Route
router.get("/", isLoggedIn, (req, res) => {
    res.redirect("/dashboard");
});

// Signup
router.get("/register", function(req, res) {
    res.render("register");
});

// Handle Signup Logic
router.post("/register", function(req, res) {
    var newUser = new User({
        username: req.body.username
    });
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            res.render("register", {
                error: err.message
            });
        } else {
            passport.authenticate("local")(req, res, function() {
                req.flash("success", "Welcome to Pick-A-Meal " + user.username + "!");
                res.redirect("/recipes");
            });
        }
    });
});

// Login
router.get("/login", function(req, res) {
    res.render("login");
});

// Handle Login
router.post("/login", function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            req.flash("error", err.message);
            return res.redirect('/login');
        }
        req.logIn(user, function(err) {
            if (err) {
                return next(err);
            }
            req.flash("success", `Welcome ${user.username}!`);
            return res.redirect('/recipes');
        });
    })(req, res, next);
});





// Logout
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Successfully logged out!");
    res.redirect("/");
});

// Middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;