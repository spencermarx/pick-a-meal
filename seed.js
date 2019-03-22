var mongoose = require("mongoose");
var Recipe = require("./models/recipe");
var User = require("./models/user");
var randomRecipes = require("./public/scripts/randomRecipes");
var getRecipeAPI = require("./public/scripts/recipesAPI");
var seedData = require("./public/scripts/seedData");
var axios = require("axios");
var url = "https://www.themealdb.com/api/json/v1/1/random.php"

// var createSeedRecipes = new Promise(function(resolve, reject) {
//     seedData.recipeData.forEach(function(recipe) {
//         Recipe.create(recipe);
//     });
//     console.log("Recipes added!");
//     resolve("Recipes added");
// });

async function seedDB() {

    await Recipe.deleteMany();
    // await createSeedRecipes;
    await getRecipeAPI(100);

}

module.exports = seedDB;