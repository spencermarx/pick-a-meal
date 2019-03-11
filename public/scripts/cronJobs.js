var cron = require("node-cron"),
    getWeekDates = require("./getWeekDates")
moment = require("moment");

function cronJobs() {
    cron.schedule("* * * * * *", function() {
        console.log(moment().format());
        var today = moment();
        var weekDates = getWeekDates(today);
        console.log(weekDates);
        return weekDates;
    });
}


module.exports = cronJobs;