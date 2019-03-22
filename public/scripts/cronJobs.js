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
                console.log(weekDates);
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


cronJobs.main = function(username) {
    cron.schedule("5 1 * * Sun", async function() {
        // console.log(moment().format());

        // console.log(weekDates);

        try {
            user = await cronJobs.saveDatesToUser(username);

            recipes = await randomRecipes(username);

            // Start here
        } catch (err) {
            user = "Error";
            // randomized = false;
        }
        // console.log(user);
        return user;
    });
};

module.exports = cronJobs;