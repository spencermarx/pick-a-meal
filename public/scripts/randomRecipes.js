const mongoose = require("mongoose");
const Day = require("../../models/day");
const Recipe = require("../../models/recipe");

function randomSelectMeal() {
    Recipe.find({}, function(err, foundRecipes) {
        if (err) {
            console.log(err);
        } else {
            var randomNumLunch = Math.round(Math.random() * foundRecipes.length);
            var randomNumDinner = Math.round(Math.random() * foundRecipes.length);
            var lunch = foundRecipes[randomNumLunch];
            var dinner = foundRecipes[randomNumDinner];

            var dayRecipes = {
                lunch: lunch._id,
                dinner: dinner._id
            };

            console.log(dayRecipes);


            // console.log("Random Number: " + randomNum);
            // console.log("Lunch: " + lunch);
        }
    });
}


function randomRecipes() {

    Day.find({}, function(err, foundDays) {
        if (err) {
            console.log(err);
        } else {
            // console.log(foundDays);
            foundDays.forEach(function(day) {
                var newMeal = randomSelectMeal();
                console.log(newMeal);
                day.meals.push(newMeal);
                // day.save();
            });
        }
        console.log(foundDays);
        return foundDays;
    });
}




module.exports = randomRecipes;