// =================
// DOTENV SETUP
// =================
require('dotenv').config();

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
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    flash = require("connect-flash"),
    ejs = require("ejs"),
    Recipe = require("./models/recipe"),
    User = require("./models/user"),
    getWeekDates = require("./public/scripts/getWeekDates"),
    cronJobs = require("./public/scripts/cronJobs"),
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

// Flash Messages
app.use(flash());


// =================
// AUTHENTICATION SETUP
// =================

// Passport Config
app.use(require("express-session")({
    secret: "Angie is my baby",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// =================
// DATABASE SETUP
// =================

//Connect Mongoose
// mongoose.connect(process.env.DATABASEURL, {
//     useNewUrlParser: true
// });
mongoose.connect(process.env.MONGODBURLLOCAL, {
    useNewUrlParser: true
});


// =================
// SEED DATABASE
// =================
// seedDB();


// =================
// CRON JOBS
// =================
cronJobs.main("Angie");

// =================
// ROUTING
// =================

// Require Routing Files
var indexRoutes = require("./routes/index"),
    dashboardRoutes = require("./routes/dashboard"),
    recipeRoutes = require("./routes/recipes"),
    apiRoutes = require("./routes/api");

// Routes
app.use("/", indexRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/recipes", recipeRoutes);
app.use("/api", apiRoutes);


// -------- START SERVER --------
app.listen(process.env.PORT || port, () => {
    console.log('App listening on port 8080!');
});