var express = require("express");
var router = express.Router(); //({ mergeParams: true });
var User = require("../models/user");
var Recipe = require("../models/recipe");
// var randomRecipes = require("../public/scripts/randomRecipes");
var middleware = require("../middleware");
var utilities = require("../public/scripts/utilities");


// =================
// API ROUTING
// =================

// Liked
// router.post("/liked/:id", middleware.isLoggedIn, function(req, res) {
//     var recipeID = req.params.id;
//     // console.log(recipeID)
//     var userID = req.user._id;
//     // console.log("User ->", userID);
//     // console.log("Recieved Like")
//     User.findOne(userID, function(err, foundUser) {
//         if (err) {
//             console.log(err);
//         } else {
//             Recipe.findById(recipeID, function(err, recipe) {
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     if (!likeTracking.checkDuplicates(recipeID, foundUser.likedMeals)) {
//                         foundUser.likedMeals.push(recipe);
//                         foundUser.save();
//                         recipe.likes += 1;
//                         // console.log(recipe.likes);
//                         recipe.save().then(function() {
//                             res.status(200).send({
//                                 action: 'like'
//                             });
//                         }).catch(function(err) {
//                             console.log("Error saving like ->", err);
//                         })
//                     } else {
//                         likeTracking.unlikeRecipe(foundUser, recipeID, foundUser.likedMeals);
//                         recipe.likes -= 1;
//                         // console.log(recipe.likes);
//                         recipe.save().then(function() {
//                             res.status(200).send({
//                                 action: 'unlike'
//                             });
//                         }).catch(function(err) {
//                             console.log("Error saving like ->", err);
//                         })
//                     }
//                 }
//             });
//         }
//     });
// });

// Add
router.post("/add/:id", middleware.isLoggedIn, function(req, res) {
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
                    // console.log("CheckDupes ->", utilities.hasDuplicate(recipeID, foundUser.addedMeals));
                    // console.log("Is Owner ->", utilities.userIsOwner(foundUser,recipe));
                    if (!utilities.hasDuplicate(recipeID, foundUser.addedMeals)) {
                        foundUser.addedMeals.push(recipe);
                        foundUser.save();
                        recipe.save().then(function() {
                            res.status(200).send({
                                action: 'save'
                            });
                        }).catch(function(err) {
                            console.log("Error saving like ->", err);
                        })
                    } else if(utilities.userIsOwner(foundUser,recipe)) {
                        res.status(200).send({
                            action: 'stay'
                        });
                    } else {
                        utilities.removeRecipe(foundUser, recipeID, foundUser.addedMeals);
                        recipe.save().then(function() {
                            res.status(200).send({
                                action: 'remove'
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