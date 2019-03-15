var mongoose = require("mongoose");
var Recipe = require("./models/recipe");
var User = require("./models/user");
var randomRecipes = require("./public/scripts/randomRecipes");
var getRecipesAPI = require("./public/scripts/recipesAPI");
var seedData = require("./public/scripts/seedData");


async function seedDB() {

    await Recipe.remove();

    var createRecipes = new Promise(function(resolve, reject) {
        seedData.recipeData.forEach(function(recipe) {
            Recipe.create(recipe);
        });
        console.log("Recipes added!");
        resolve("Recipes added");
    });

    await createRecipes;
    var recipesAPI = await getRecipesAPI();
    console.log(recipesAPI);
}

module.exports = seedDB;