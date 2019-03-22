var express = require("express");
var router = express.Router(); //({ mergeParams: true });
var User = require("../models/user");
var randomRecipes = require("../public/scripts/randomRecipes");
var middleware = require("../middleware");
var randomRecipes = require("../public/scripts/randomRecipes");


// =================
// DASHBOARD ROUTING
// =================

// INDEX
router.get("/", middleware.isLoggedIn, middleware.checkPlan, (req, res) => {
    User.findOne({
            username: req.user.username
        })
        .populate("plan.lunch")
        .populate("plan.dinner")
        .exec(function(err, user) {
            // console.log(user);
            res.render("dashboard", {
                plan: user.plan
            });
        });
});



// UPDATE
router.put("/", middleware.isLoggedIn, middleware.checkPlan, function(req, res) {
    randomRecipes(req, res)
        .then(function() {
            res.redirect("/dashboard");
        });
});

module.exports = router;