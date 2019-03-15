var express = require("express");
var router = express.Router(); //({ mergeParams: true });
var User = require("../models/user");
// var randomRecipes = require("../public/scripts/randomRecipes");
var middleware = require("../middleware");


// =================
// API ROUTING
// =================

// INDEX
router.get("/", middleware.isLoggedIn, function(req, res) {

});


module.exports = router;