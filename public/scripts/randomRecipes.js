var mongoose = require("mongoose");
var Recipe = require("../../models/recipe");

function randomRecipes() {
    Recipe.find({}, function(err, foundRecipes) {
        if (err) {
            console.log(err);
        } else {
            // console.log(foundRecipes);
            var recipesLength = foundRecipes.length;

            var lunchNum = Math.round(Math.random * recipesLength);

            console.log(lunchNum);
        }
    });

}


module.exports = randomRecipes;