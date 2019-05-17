var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var cronJobs = require("../jobs");
// =================
// INDEX ROUTING
// =================

// LANDING - Index Route
router.get("/", isLoggedIn, (req, res) => {
    res.redirect("/recipes");
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
                cronJobs.saveDatesToUser(user.username);
                req.flash("success", "Welcome to Pick-A-Meal " + user.username + "!\nTo use the dashboard, you must like at least 14 recipes. Happy cooking!");
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
            console.log("Error logging in ->", err);
            req.flash("error", info.message);
            return res.redirect('/login');
        }
        if (!user) {
            console.log("No user account");
            req.flash("error", info.message);
            return res.redirect('/login');
        }
        req.logIn(user, function(err) {
            if (err) {
                req.flash("error", info.message);
                return res.redirect('/login');
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
    res.redirect("/login");
});

// Middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;