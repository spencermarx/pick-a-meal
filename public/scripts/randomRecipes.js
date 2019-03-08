var mongoose = require("mongoose");
var Recipe = require("../../models/recipe");

function getRecipes() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            Recipe.find({}, function(err, found) {
                if (err) {
                    reject(new Error('Ooops, something broke!'));
                } else {
                    resolve(found);
                }
            });
        }, 0);
    });
}
async function randomRecipes() {
    try {
        recipes = await getRecipes();
        // Start here
    } catch (err) {
        recipes = ["No recipes"];
    }
    return recipes;
}

module.exports = randomRecipes;