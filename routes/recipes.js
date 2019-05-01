var express = require("express");
var router = express.Router(); //({ mergeParams: true });
var User = require("../models/user");
var Recipe = require("../models/recipe");
var likeTracking = require("../public/scripts/likeTracking");
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
            User.findById(req.user._id).populate("likedMeals").exec(function (err, user) {
                //console.log("RecipeID ->", req.params.id);
                //console.log("LikedMeals ->", user.likedMeals);
                var liked = likeTracking.checkDuplicates(req.params.id, user.likedMeals); // true if liked
                // console.log("Liked Status:", liked);
                // console.log("Liked Status:", typeof liked);

                res.render("recipes/show", {
                    liked: liked,
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

        // add cloudinary url for the image to the campground object under image property
        req.body.recipe.image = result.secure_url;
        console.log("Upload Succesful!", req.body.recipe.image);

        // Structure Recipe Data
        var recipeData = req.body.recipe;
		console.log("RecipeData:", recipeData);




        // Create Recipe







        // var recipe = req.sanitize(req.body.recipe);
    // req.body.recipe.addedBy = req.user._id;

    // if (req.body.recipe.ingredients) {
    //     var ingredientsBody = req.sanitize(req.body.recipe.ingredients);
    //     var ingredientsArray = ingredientsBody.split("\r\n");
    //     var ingredientsData = [];

    //     ingredientsArray.forEach((ingredient) => {
    //         var ingredientSplit = ingredient.split(": ");
    //         var ingredientName = ingredientSplit[0];
    //         var ingredientQuantity = ingredientSplit[1];
    //         var newIngredient = {
    //             ingredientName: ingredientName,
    //             ingredientQuantity: ingredientQuantity
    //         };

    //         ingredientsData.push(newIngredient);

    //     });
    //     req.body.recipe.ingredients = ingredientsData;
    // } else {
    //     req.body.recipe.ingredients = [];
    // }

    // var location = req.body.recipe.isRestaurant.toLowerCase();
    // // console.log(location);

    // if (location === "restaurant") {
    //     req.body.recipe.isRestaurant = true;
    // } else {
    //     req.body.recipe.isRestaurant = false;
    // }

    // Recipe.create(req.body.recipe, (err, recipe) => {
    //     if (err) {
    //         console.log(err);
    //         res.render('recipes/new');
    //     } else {
    //         res.redirect('/recipes');
    //     }
    // });
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