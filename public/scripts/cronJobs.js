var cron = require("node-cron"),
    getWeekDates = require("./getWeekDates"),
    moment = require("moment"),
    mongoose = require("mongoose"),
    User = require("../../models/user");

function saveDatesToUser(username, weekDates) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            User.findOne({
                username: username
            }, function(err, user) {
                if (err) {
                    reject(new Error('Ooops, something broke!'));
                } else {
                    for (var i = 0; i < 7; i++) {
                        user.plan[i].date = weekDates[i];
                    }
                    user.save();
                    resolve(user);
                }
            });
        }, 0);
    });
}


function cronJobs(username) {
    cron.schedule("30 1 * * Sun", async function() {
        // console.log(moment().format());
        var today = moment();
        var weekDates = getWeekDates(today);
        // console.log(weekDates);

        try {
            user = await saveDatesToUser(username, weekDates);

            // Start here
        } catch (err) {
            user = "Error";
            // randomized = false;
        }
        console.log(user);
        return user;
    });
}

module.exports = cronJobs;