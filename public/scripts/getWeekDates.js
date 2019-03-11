var moment = require("moment");

function getWeekDates(dateTime) {
    var weekMoments = [];
    var weekDates = [];
    var sunday = moment(dateTime).startOf('week');

    for (var i = 0; i < 7; i++) {
        weekMoments.push(moment(sunday).add(i, 'days'));
    }

    weekMoments.forEach(function(day) {
        var date = day.format('l');
        weekDates.push(date);
    });

    return weekDates; // returns a list of dates
}

module.exports = getWeekDates;