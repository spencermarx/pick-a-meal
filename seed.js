var mongoose = require("mongoose");
var Recipe = require("./models/recipe");
var User = require("./models/user");
var randomRecipes = require("./public/scripts/randomRecipes");
var seedData = require("./public/scripts/seedData");


// var usingItNow = function (callback) {
//     callback(null, 'get it?'); // I dont want to throw an error, so I pass null for the error argument
// };

function seedDB() {

    var seedPromise = Recipe.remove({}).exec();

    seedPromise.then(function() {
            console.log("Removed Recipes!");
            return;
        })
        .then(function() {
            seedData.recipeData.forEach(function(seedRecipe) {
                Recipe.create(seedRecipe).exec()
                    .then(function(err, recipe) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(`Added recipe: ${recipe.name}`);
                        }
                    });
            });
        })
        .then(function() {
            console.log("then");
        })
        .catch(function(err) {
            // just need one of these
            console.log('error:', err);
        });
}

module.exports = seedDB;