var cron = require("node-cron"),
    getWeekDates = require("./getWeekDates"),
    moment = require("moment"),
    mongoose = require("mongoose"),
    randomRecipes = require("./randomRecipes"),
    User = require("../../models/user");

var cronJobs = {};

cronJobs.saveDatesToUser = function(username) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            User.findOne({
                username: username
            }, function(err, user) {
                var today = moment();
                var weekDates = getWeekDates(today);
                // console.log(weekDates);
                if (err) {
                    reject(new Error('Ooops, something broke!'));
                } else {
                    for (var i = 0; i < 7; i++) {
                        user.plan.push(weekDates[i]);
                    }
                    user.save();
                    resolve(user);
                }
            });
        }, 0);
    });
};

cronJobs.saveDatesToUsers = function() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            User.find({}, function(err, users) {
                if (err) {
                    reject(new Error('Ooops, something broke!'));
                } else {
                    users.forEach(function(user) {
                        var today = moment();
                        var weekDates = getWeekDates(today);
                        // console.log(weekDates);
                        for (var i = 0; i < 7; i++) {
                            user.plan.push(weekDates[i]);
                        }
                        user.save();
                    });
                    resolve(users);
                }
            });
        }, 0);
    });
};


cronJobs.main = function() {
    cron.schedule("16 10 * * Fri", async function() {
        // console.log(moment().format());

        // console.log(weekDates);

        try {
            users = await cronJobs.saveDatesToUsers();

            // recipes = await randomRecipes(username);

            // Start here
        } catch (err) {
            users = "Error";
            // randomized = false;
        }
        // console.log(users);
        return users;
    });
};

module.exports = cronJobs;