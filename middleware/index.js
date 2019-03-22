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
        return next();
    } else if (!req.user.plan[0].lunch && req.user.likedMeals.length >= 14) {
        await randomRecipes(req, res);
        return next();
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


module.exports = middlewareObj;