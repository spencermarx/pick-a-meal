var express = require("express");
var router = express.Router(); //({ mergeParams: true });
var User = require("../models/user");
var Recipe = require("../models/recipe");
var utilities = require("../public/scripts/utilities");
var multer = require('multer');
var cloudinary = require('cloudinary');

// Cloudinary Setup
var storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname);
    }
});
var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({
    storage: storage,
    fileFilter: imageFilter
});
cloudinary.config({
    cloud_name: 'spencermarx',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


//INDEX
router.get("/", isLoggedIn, (req, res) => {
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
router.get("/new", isLoggedIn, (req, res) => {
    res.render("recipes/new");
});

// SHOW
router.get("/:id", isLoggedIn, (req, res) => {
    Recipe.findById(req.params.id).populate("addedBy").exec((err, foundRecipe) => {
        if (err) {
            console.log(err);
        } else {
            User.findById(req.user._id).populate("addedMeals").exec(function (err, user) {


                // console.log("Recipe->", foundRecipe.addedBy._id, typeof foundRecipe.addedBy._id);
                // console.log("User->", user._id, typeof user._id);
                // console.log("User ->", user);
                var isOwner = utilities.userIsOwner(user,foundRecipe);
				// console.log("TCL: isOwner", isOwner);
                var hasAdded = utilities.userHasAddedMeal(user, foundRecipe);
                // console.log("TCL: hasAdded ->", hasAdded);
                var owner = Boolean;
                var added = Boolean;



                if (isOwner) {
                    added = "owner";
                    owner = true;
                    added = true;
                } else if (!isOwner && hasAdded ) {
                    owner = false;
                    added = true;
                } else {
                    owner = false;
                    added = false;
                }

                // console.log("Added Status:", added);

                res.render("recipes/show", {
                    added: added,
                    owner: owner,
                    recipe: foundRecipe
                });
            });
        }
    });

});

// CREATE
router.post("/", isLoggedIn, upload.single('image'), (req, res) => {

    cloudinary.uploader.upload(req.file.path, function (result) {
        // Add Data

        // Add cloudinary url for the image to the campground object under image property
        req.body.recipe.image = result.secure_url;
        console.log("Upload Succesful!", req.body.recipe.image);

        // Structure Recipe Data

        var recipeData = req.body.recipe;
        var reqIngredients = req.body.ingredient;
        recipeData.addedBy = req.user._id;

        var ingredients = [];
        for (var i = 0; i < reqIngredients.name.length; i++) {
            if (reqIngredients.name[i] && reqIngredients.name[i]) {
                var ingredientObj = {
                    ingredientName: reqIngredients.name[i],
                    ingredientQuantity: reqIngredients.quantity[i]
                };
                ingredients.push(ingredientObj);
            }
        }

        recipeData.ingredients = ingredients;
        recipeData.likes = 0;

        // Create Recipe
        Recipe.create(recipeData, (err, recipe) => {
            if (err) {
                console.log(err);
                res.render('recipes/new');
            } else {
                res.redirect('/recipes');
                console.log("Created Recipe:", recipe);
                User.findById(req.user._id).exec(function (err, user) {
                    if (err) {
                        console.log(err);
                    } else {
                        user.addedMeals.push(recipe);
                        user.save();
                        console.log(User + " added " + recipe);
                    }
                });
            }
        });
    });
});


// EDIT
router.get("/:id/edit", isLoggedIn, (req, res) => {
    Recipe.findById(req.params.id, (err, foundRecipe) => {
        if (err) {
            console.log(err);
            res.redirect("/recipes/" + req.params.id);
        } else {
            res.render("recipes/edit", {
                recipe: foundRecipe
            });
        }
    });
});

// UPDATE - Note: with put we need method-override package
router.put("/:id", isLoggedIn, function (req, res) {
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
    Recipe.findByIdAndUpdate(req.params.id, req.body.recipe, function (err, updatedRecipe) {
        if (err) {
            res.redirect("/recipes");
        } else {
            res.redirect(`/recipes/${req.params.id}`);
        }
    });
});

// DESTROY - Delete a recipe
router.delete("/:id", isLoggedIn, function (req, res) {
    // Destroy
    Recipe.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect("/recipes");
        } else {
            console.log("Recipe deleted!");

            // Redirect
            res.redirect("/recipes");
        }
    });
});



// Middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;