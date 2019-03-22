var moment = require("moment");

function getWeekDates(dateTime) {
    var weekMoments = [];
    var weekDates = [];
    var sunday = moment(dateTime).startOf('week');

    for (var i = 0; i < 7; i++) {
        weekMoments.push(moment(sunday).add(i, 'days'));
    }
    for (var i = 0; i < 7; i++) {
        var item = weekMoments[i]
        var date = item.format('l');
        var day = item.format('dddd');
        var order = i;
        // console.log('TCL: getWeekDates -> day', item);
        // TODO: Set Dates in correct format for user
        // var order =
        var dateObject = {
            day: day,
            order: order,
            date: date
        }
        weekDates.push(dateObject);
    }
    // console.log("Weekdates ->", weekDates);
    return weekDates; // returns a list of dates
}

module.exports = getWeekDates;