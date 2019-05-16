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
router.get("/", middleware.isLoggedIn, (req, res) => {
    User.findOne({
            username: req.user.username
        })
        .populate("addedMeals")
        // .populate("plan.dinner")
        .exec(function(err, user) {
            console.log("Dashboard ->", user);
            res.render("dashboard", {
                // plan: user.plan
                user: user
            });
        });
});



// UPDATE
router.put("/", middleware.isLoggedIn, middleware.checkPlan, middleware.randomize, function(req, res) {

    // FIXME: Redirect is firing before randomRecipes finishes...
    // req.flash("success", "Randomized your meals for the week!");
    res.redirect("/dashboard");
});

module.exports = router;