var mongoose = require("mongoose");
var Recipe = require("../../models/recipe");
var User = require("../../models/user");

function getCount(username) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            User.findOne({
                username: username
            }, function(err, user) {
                if (err) {
                    reject(new Error('Ooops, something broke!'));
                } else {
                    // console.log("Getcount - User:", user);
                    // console.log("Getcount - Liked:", user.likedMeals.length);

                    resolve(user.likedMeals.length);
                }
            });
        }, 0);
    });
}

function getRecipes(username) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            User.findOne({
                username: username
            }).populate("likedMeals").exec(function(err, found) {
                if (err) {
                    reject(new Error('Ooops, something broke!'));
                } else {
                    resolve(found.likedMeals);
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
                // console.log("Entered assign user meals, user:", found);
                if (err) {
                    console.log("Error occured assigning meals", err);
                    reject(new Error('Ooops, something broke!'));
                } else {
                    var plan = found.plan;
                    // console.log("Random Plan ->", plan);
                    plan.forEach(function(day) {
                        var lunchNum = Math.floor(Math.random() * count);
                        var dinNum = Math.floor(Math.random() * count);
                        lunch = recipes[lunchNum];
                        dinner = recipes[dinNum];
                        // console.log(lunchNum)
                        day.lunch = lunch;
                        day.dinner = dinner;
                    });
                    // console.log(found);
                    found.save()
                        .then(function() {
                            // console.log("Assigned plan:", found.plan);
                            resolve(found.plan);
                        });
                }
            });
        }, 0);
    });
}

async function assignRecipes(username) {
    // var randomized = false;
    // console.log("Entered assign recipes");
    try {
        count = await getCount(username);

        recipes = await getRecipes(username);
        // user = await getUsers(username);

        assigned = await assignUserMeals(username, recipes, count);

        return assigned;

    } catch (err) {
        count = 0;
        // randomized = false;
        return err;
    }
    // console.log("Exited assign recipes");
}

async function randomRecipes(req, res) {
    // console.log("From randomRecipes->", req.user);

    function promise() {
        var promise = new Promise(function(resolve, reject) {
            resolve("Recipes randomized");
        });
        return promise;
    }
    promise().then(function() {
        // console.log("Entered 2nd promise of randomRecipes");
        var promise = new Promise(async function(resolve, reject) {
            resolve(await assignRecipes(req.user.username));
        });
        return promise;
    });
}

module.exports = randomRecipes;