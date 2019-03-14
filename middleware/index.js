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
middlewareObj.userHasRecipes = function(req, res, next) {
    if (req.user.plan.length > 0) {
        return next();
    }
    req.flash("error", "You must add at least 7 meals to access dashboard");
    res.redirect("/recipes");
};


module.exports = middlewareObj;