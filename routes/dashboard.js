var express = require("express");
var router = express.Router(); //({ mergeParams: true });
var User = require("../models/user");
var randomRecipes = require("../public/scripts/randomRecipes");

// =================
// DASHBOARD ROUTING
// =================

// INDEX
router.get("/", (req, res) => {
    User.findOne({ username: "Angie" }, (err, user) => {
        if (err) {
            console.log(err);
        } else {
            // console.log(user);
            res.render("dashboard", {
                plan: user.plan
            });
        }
    });
});


// UPDATE
router.put("/", (req, res) => {
    function promise() {
        var promise = new Promise(function(resolve, reject) {
            resolve("Recipes randomized");
        });
        return promise;
    }
    promise().then(function() {
        var promise = new Promise(function(resolve, reject) {
            resolve(randomRecipes("Angie"));
        });
        return promise;
    }).then(function() {
        res.redirect("/dashboard");
    });
});

module.exports = router;