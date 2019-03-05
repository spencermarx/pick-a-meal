var mongoose = require("mongoose");
var Recipe = require("./models/recipe");
var User = require("./models/user");
var randomRecipes = require("./public/scripts/randomRecipes");
var seedData = require("./public/scripts/seedData");


// var usingItNow = function (callback) {
//     callback(null, 'get it?'); // I dont want to throw an error, so I pass null for the error argument
// };

function seedDB() {
    Recipe.remove({}, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Removed recipes!");
            seedData.recipeData.forEach(function(seedRecipe) {
                Recipe.create(seedRecipe, function(err, recipe) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(`Added recipe: ${recipe.name}`);
                    }
                });

            });
        }
    });
    User.remove({}, function(err, foundUsers) {
        if (err) {
            console.log(err);
        } else {
            console.log("Removed users!");
            seedData.userData.forEach(function(seedUser) {
                User.create(seedUser, function(err, user) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(`Added user: ${user.username}`);
                    }
                });

            });
        }
    });
}

module.exports = seedDB;