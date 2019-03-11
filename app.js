// =================
// PACKAGES SETUP
// =================

var bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer"),
    mongoose = require("mongoose"),
    express = require("express"),
    cron = require("node-cron"),
    moment = require("moment"),
    getWeekDates = require("./public/scripts/getWeekDates"),
    cronJobs = require("./public/scripts/cronJobs"),
    ejs = require("ejs"),
    Recipe = require("./models/recipe"),
    User = require("./models/user"),
    randomRecipes = require("./public/scripts/randomRecipes"),
    seedDB = require("./seed"),
    app = express();


// =================
// MIDDLEWARE SETUP
// =================

//Set Up Body Parser
app.use(bodyParser.urlencoded({
    extended: true
}));
var port = process.envPORT || 8080;

// Set default file to ejs
app.set("view engine", "ejs");
app.locals.rmWhitespace = true;

// Set up Public Folder
app.use(express.static(__dirname + "/public"));

// Set up Method-Override
app.use(methodOverride("_method"));

// Set up Express-Sanitizer to prevent JS injections by user
// Note:Must follow set up for Body-Parser
app.use(expressSanitizer());

// =================
// DATABASE SETUP
// =================

//Connect Mongoose
// mongoose.connect('mongodb://localhost:27017/pick_a_meal', {
//     useNewUrlParser: true
// });
mongoose.connect('mongodb+srv://spencermarx:Angie37477842.@project-apps-tpbj7.mongodb.net/pick_a_meal?retryWrites=true', {
    useNewUrlParser: true
});


// =================
// SEED DATABASE
// =================
// seedDB();


// =================
// CRON JOBS
// =================
cronJobs();


// =================
// ROUTING
// =================

// Require Routing Files
var indexRoutes = require("./routes/index"),
    dashboardRoutes = require("./routes/dashboard"),
    recipeRoutes = require("./routes/recipes");

// Routes
app.use("/", indexRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/recipes", recipeRoutes);


// -------- START SERVER --------
app.listen(process.env.PORT || port, () => {
    console.log('App listening on port 8080!');
});