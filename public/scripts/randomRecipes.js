var mongoose = require("mongoose");
var Recipe = require("../../models/recipe");
var User = require("../../models/user");

function getCount() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            Recipe.countDocuments({}, function(err, count) {
                if (err) {
                    reject(new Error('Ooops, something broke!'));
                } else {
                    resolve(count);
                }
            });
        }, 0);
    });
}

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

function getUsers(username) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            User.find({
                username: username
            }, function(err, found) {
                if (err) {
                    reject(new Error('Ooops, something broke!'));
                } else {
                    resolve(found);
                }
            });
        }, 0);
    });
}

function assignUserMeals(username, recipes, count) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            User.findOne({
                username: username
            }, function(err, found) {
                if (err) {
                    reject(new Error('Ooops, something broke!'));
                } else {
                    plan = found.plan;

                    plan.forEach(function(day) {
                        var lunchNum = Math.floor(Math.random() * count);
                        var dinNum = Math.floor(Math.random() * count);
                        lunch = recipes[lunchNum];
                        dinner = recipes[dinNum];
                        // console.log(lunchNum)
                        day.lunch = lunch;
                        day.dinner = dinner;
                    });
                    found.save();
                    resolve(found.plan);
                }
            });
        }, 0);
    });
}

async function randomRecipes(username) {
    // var randomized = false;
    try {
        count = await getCount();

        recipes = await getRecipes();
        // user = await getUsers(username);

        assigned = await assignUserMeals(username, recipes, count);


        // Start here
    } catch (err) {
        count = 0;
        // randomized = false;
    }
    return assigned;
}

module.exports = randomRecipes;