var mongoose = require("mongoose");
var Recipe = require("../../models/recipe");
var User = require("../../models/user");

async function getCount(username) {
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

async function getRecipes(username) {
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
        User.findOne({
            username: username
        }).exec(function(err, found) {
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


        Promise.all([count, recipes, assigned]).then(function(values) {
            return values[2];

        });

    } catch (err) {
        count = 0;
        // randomized = false;
        return err;
    }
    // console.log("Exited assign recipes");
}

async function randomRecipes(req, res) {

    return new Promise(async function(resolve, reject) {
        resolve(await assignRecipes(req.user.username));
    });

}

module.exports = randomRecipes;