var express = require("express");
var router = express.Router(); //({ mergeParams: true });
var User = require("../models/user");
var Recipe = require("../models/recipe");
// var randomRecipes = require("../public/scripts/randomRecipes");
var middleware = require("../middleware");
var likeTracking = require("../public/scripts/likeTracking");


// =================
// API ROUTING
// =================

// Liked
router.post("/liked/:id", middleware.isLoggedIn, function(req, res) {
    var recipeID = req.params.id;
    // console.log(recipeID)
    var userID = req.user._id;
    // console.log("User ->", userID);
    // console.log("Recieved Like")
    User.findOne(userID, function(err, foundUser) {
        if (err) {
            console.log(err);
        } else {
            Recipe.findById(recipeID, function(err, recipe) {
                if (err) {
                    console.log(err);
                } else {
                    if (!likeTracking.checkDuplicates(recipeID, foundUser.likedMeals)) {
                        foundUser.likedMeals.push(recipe);
                        foundUser.save();
                        recipe.likes += 1;
                        // console.log(recipe.likes);
                        recipe.save().then(function() {
                            res.status(200).send({
                                action: 'like'
                            });
                        }).catch(function(err) {
                            console.log("Error saving like ->", err);
                        })
                    } else {
                        likeTracking.unlikeRecipe(foundUser, recipeID, foundUser.likedMeals);
                        recipe.likes -= 1;
                        // console.log(recipe.likes);
                        recipe.save().then(function() {
                            res.status(200).send({
                                action: 'unlike'
                            });
                        }).catch(function(err) {
                            console.log("Error saving like ->", err);
                        })
                    }
                }
            });
        }
    });
});





module.exports = router;