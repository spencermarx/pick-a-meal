var randomRecipes = require("../public/scripts/randomRecipes");



// =================
// MIDDLEWARE
// =================
var middlewareObj = {};

// Method: isLoggedIn
middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};

// Method: userHasRecipes
middlewareObj.checkPlan = async function(req, res, next) {
    // console.log(req.user);
    if (req.user.plan[0].lunch) {
        console.log("From MW CheckPlan Call - IF ->", req.user.plan[0].lunch);
        return next();
    } else if (!req.user.plan[0].lunch && req.user.likedMeals.length >= 14) {
        randomRecipes(req, res)
            .then(function(result) {
                console.log("From MW CheckPlan Call - Else IF ->", result);
                return next();
            });
    } else {
        if (req.user.likedMeals.length) {
            var remaining = 14 - req.user.likedMeals.length;
            req.flash("error", `You must add at least ${remaining} more meals to access dashboard`);
        } else {
            req.flash("error", "You must add at least 14 more meals to access dashboard");
        }
        res.redirect("/recipes");
    }
};

middlewareObj.randomize = function(req, res, next) {
    try {
        randomRecipes(req, res)
            .then(function(promise) {
                console.log("From MW Random Call ->", promise);
                next();
            });
    } catch (err) {
        console.log("Error in randomizer", err);
    }

}
module.exports = middlewareObj;