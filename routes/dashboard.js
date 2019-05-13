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
    res.render("dashboard");
        //             plan: user.plan
        //         });
    // User.findOne({
    //         username: req.user.username
    //     })
    //     .populate("plan.lunch")
    //     .populate("plan.dinner")
    //     .exec(function(err, user) {
    //         // console.log("Dashboard Load ->", user.plan);
    //         res.render("dashboard", {
    //             plan: user.plan
    //         });
    //     });
});



// UPDATE
router.put("/", middleware.isLoggedIn, middleware.checkPlan, middleware.randomize, function(req, res) {

    // FIXME: Redirect is firing before randomRecipes finishes...
    // req.flash("success", "Randomized your meals for the week!");
    res.redirect("/dashboard");
});

module.exports = router;