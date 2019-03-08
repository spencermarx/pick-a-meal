var express = require("express");
var router = express.Router(); //({ mergeParams: true });
var User = require("../models/user");
var Recipe = require("../models/recipe");


//INDEX
router.get("/", (req, res) => {
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
router.get("/new", (req, res) => {
    res.render("recipes/new");
});

// SHOW
router.get("/:id", (req, res) => {
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
router.post("/", (req, res) => {
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
router.get("/:id/edit", (req, res) => {
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
router.put("/:id", function(req, res) {
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
router.delete("/:id", function(req, res) {
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


module.exports = router;