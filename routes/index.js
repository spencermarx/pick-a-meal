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
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            res.render("register");
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
})

// Handle Login
router.post("/login", passport.authenticate("local", {
        successRedirect: "/recipes",
        failureRedirect: "/login",
        failureFlash: 'Invalid username or password.'
    }),
    function(req, res) {}
);

// Logout
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
})


// Middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;