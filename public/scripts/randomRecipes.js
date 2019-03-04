const mongoose = require("mongoose");
const Recipe = require("../../models/recipe");
const Day = require("../../models/day");

function randomNumber() {
    Recipe.find({}, function(err, foundRecipes) {
        if (err) {
            console.log(err);
        } else {
            var num = Math.round(Math.random() * foundRecipes.length + 1);
            console.log(num)
        }
    });
}

function randomRecipes() {
    return randomNumber();
}


module.exports = randomRecipes;