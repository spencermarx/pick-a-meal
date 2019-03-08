// -------- PACKAGES SETUP --------
var bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer"),
    mongoose = require("mongoose"),
    express = require("express"),
    ejs = require("ejs"),
    Recipe = require("./models/recipe"),
    User = require("./models/user"),
    randomRecipes = require("./public/scripts/randomRecipes"),
    seedDB = require("./seed"),
    app = express();


// -------- MIDDLEWARE SETUP --------

//Set Up Body Parser
app.use(bodyParser.urlencoded({
    extended: true
}));
var port = process.envPORT || 8080;

// mongoose.Promise = global.Promise;

// app.use(express.static(__dirname));

// Set default file to ejs
app.set("view engine", "ejs");
app.locals.rmWhitespace = true;

// Set up Public Folder
app.use(express.static("public"));

// Set up Method-Override
app.use(methodOverride("_method"));

// Set up Express-Sanitizer to prevent JS injections by user
// Note:Must follow set up for Body-Parser
app.use(expressSanitizer());

// -------- DATABASE SETUP --------

//Connect Mongoose
mongoose.connect('mongodb://localhost:27017/pick_a_meal', {
    useNewUrlParser: true
});
// mongoose.connect('mongodb+srv://spencermarx:Angie37477842.@project-apps-tpbj7.mongodb.net/test?retryWrites=true', {
//     useNewUrlParser: true
// });

// Seed Database
// seedDB();

// -------- RESTful ROUTING --------
// Index Route
app.get("/", (req, res) => {
    res.redirect("/dashboard");
});

// DASHBOARD - Index Route
app.get("/dashboard", (req, res) => {
    User.findOne({ username: "Angie" }, (err, user) => {
        if (err) {
            console.log(err);
        } else {
            console.log(user);
            res.render("dashboard", {
                plan: user.plan
            });
        }
    });
});


// DASHBOARD - Create Route
app.put("/dashboard", (req, res) => {
    function promise() {
        var promise = new Promise(function(resolve, reject) {
            resolve("Recipes randomized");
        });
        return promise;
    }
    promise().then(function() {
        var promise = new Promise(function(resolve, reject) {
            resolve(randomRecipes("Angie"));
        });
        return promise;
    }).then(function() {
        res.redirect("/dashboard");
    });
});


//INDEX
app.get("/recipes", (req, res) => {
    Recipe.find({}, (err, foundRecipes) => {
        if (err) {
            console.log(err);
        } else {
            res.render("recipes/index", {
                recipes: foundRecipes
            });
        }
    });
});

// NEW
app.get("/recipes/new", (req, res) => {
    res.render("recipes/new");
});

// SHOW
app.get("/recipes/:id", (req, res) => {
    Recipe.findById(req.params.id, (err, foundRecipe) => {
        if (err) {
            console.log(err);
        } else {
            res.render("recipes/show", {
                recipe: foundRecipe
            });
        }
    })
});

// CREATE
app.post("/recipes", (req, res) => {
    var recipe = req.sanitize(req.body.recipe);

    if (req.body.recipe.ingredients) {
        var ingredientsBody = req.sanitize(req.body.recipe.ingredients);
        var ingredientsArray = ingredientsBody.split("\r\n");
        var ingredientsData = [];

        ingredientsArray.forEach((ingredient) => {
            var ingredientSplit = ingredient.split(": ");
            var ingredientName = ingredientSplit[0];
            var ingredientQuantity = ingredientSplit[1];
            var newIngredient = {
                ingredientName: ingredientName,
                ingredientQuantity: ingredientQuantity
            };

            ingredientsData.push(newIngredient);

        });
        req.body.recipe.ingredients = ingredientsData;
    } else {
        req.body.recipe.ingredients = [];
    }

    var location = req.body.recipe.isRestaurant.toLowerCase();
    // console.log(location);

    if (location === "restaurant") {
        req.body.recipe.isRestaurant = true;
    } else {
        req.body.recipe.isRestaurant = false;
    }

    Recipe.create(req.body.recipe, (err, recipe) => {
        if (err) {
            console.log(err);
            res.render('recipes/new');
        } else {
            res.redirect('/recipes');
        }
    });
});


// EDIT
app.get("/recipes/:id/edit", (req, res) => {
    Recipe.findById(req.params.id, (err, foundRecipe) => {
        if (err) {
            console.log(err);
            res.redirect("/recipes/" + req.params.id);
        } else {
            res.render("recipes/edit", { recipe: foundRecipe });
        }
    });
});

// UPDATE - Note: with put we need method-override package
app.put("/recipes/:id", function(req, res) {
    var recipe = req.sanitize(req.body.recipe);

    if (req.body.recipe.ingredients) {
        var ingredientsBody = req.sanitize(req.body.recipe.ingredients);
        var ingredientsArray = ingredientsBody.split("\r\n");
        var ingredientsData = [];

        ingredientsArray.forEach((ingredient) => {
            var ingredientSplit = ingredient.split(": ");
            var ingredientName = ingredientSplit[0];
            var ingredientQuantity = ingredientSplit[1];
            var newIngredient = {
                ingredientName: ingredientName,
                ingredientQuantity: ingredientQuantity
            };

            ingredientsData.push(newIngredient);

        });
        req.body.recipe.ingredients = ingredientsData;
    } else {
        req.body.recipe.ingredients = [];
    }

    var location = req.body.recipe.isRestaurant.toLowerCase();
    // console.log(location);

    if (location === "restaurant") {
        req.body.recipe.isRestaurant = true;
    } else {
        req.body.recipe.isRestaurant = false;
    }
    Recipe.findByIdAndUpdate(req.params.id, req.body.recipe, function(err, updatedRecipe) {
        if (err) {
            res.redirect("/recipes");
        } else {
            res.redirect(`/recipes/${req.params.id}`);
        }
    });
});

// DESTROY - Delete a recipe
app.delete("/recipes/:id", function(req, res) {
    // Destroy
    Recipe.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/recipes");
        } else {
            console.log("Recipe deleted!");

            // Redirect
            res.redirect("/recipes");
        }
    });


});

// -------- START SERVER --------
app.listen(process.env.PORT || port, () => {
    console.log('App listening on port 8080!');
});