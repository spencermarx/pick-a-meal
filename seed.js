var mongoose = require("mongoose");
var Recipe = require("./models/recipe");
var User = require("./models/user");
var randomRecipes = require("./public/scripts/randomRecipes");
var seedData = require("./public/scripts/seedData");


// var usingItNow = function (callback) {
//     callback(null, 'get it?'); // I dont want to throw an error, so I pass null for the error argument
// };

async function seedDB() {

    Recipe.remove().exec()
        .then(function() {
            var promise = new Promise(function(resolve, reject) {
                resolve("Recipes removed");
            });
            return promise;
        })
        .then(function(result) {
            console.log(result)

            var promise = new Promise(function(resolve, reject) {
                seedData.recipeData.forEach(function(recipe) {
                    Recipe.create(seedData.recipeData[0]);
                });
                resolve("Recipes added");
            });
            return promise;
        }).then(function(result) {
            console.log(result);
            return randomRecipes();
            // START HERE
        })
        .then(function(result) {
            console.log(result);
        });
}

module.exports = seedDB;