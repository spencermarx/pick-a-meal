var axios = require("axios");
var Recipe = require("../../models/recipe");
var url = "https://www.themealdb.com/api/json/v1/1/random.php"

var getRecipeAPI = async function(count) {

    var promises = [];
    for (var i = 0; i < count; i++) {
        promises.push(axios.get(url)
            .then(function(response) {
                return response.data.meals[0];
            }));
    }

    Promise.all(promises)
        .then(function(results) {
            // console.log('all resolved ', result);
            return new Promise(function(resolve, reject) {
                results.forEach(function(result) {
                    Recipe.create(createRecipeObj(result));
                });
                console.log("API Recipes added!");
                resolve("API Recipes added");
            });
        });
}

var createRecipeObj = function(result) {
    var allIngredients = []
    var ingredientNames = handleIngredients(result);
    var ingredientQuantities = handleQuantities(result);

    for (var i = 0; i < ingredientNames.length; i++) {
        var ingredient = {
            ingredientName: ingredientNames[i],
            ingredientQuantity: ingredientQuantities[i]
        }
        allIngredients.push(ingredient);
    }

    // console.log(allIngredients)

    recipe = {
        name: result.strMeal,
        image: result.strMealThumb,
        ingredients: allIngredients,
        process: result.strInstructions,
        likes: 0
    };
    return recipe;
};


var handleIngredients = function(result) {
    var ingredientArray = []
    var keysArray = Object.keys(result);
    for (var i = 0; i < keysArray.length; i++) {
        var key = keysArray[i];
        // console.log(key);
        if (key.substring(0, 13) === "strIngredient") {
            ingredient = result[key];
            if (ingredient) {
                ingredientArray.push(ingredient);
            }
        }
    }
    // console.log(ingredientArray);
    return ingredientArray;
};

var handleQuantities = function(result) {
    var quantitiesArray = []
    var keysArray = Object.keys(result);
    for (var i = 0; i < keysArray.length; i++) {
        var key = keysArray[i];
        // console.log(key);
        if (key.substring(0, 10) === "strMeasure") {
            quantity = result[key];
            if (quantity) {
                quantitiesArray.push(quantity);
            }
        }
    }
    // console.log(quantitiesArray);
    return quantitiesArray;
};

// idMeal: '52847',
//     strMeal: 'Pork Cassoulet',
//     strDrinkAlternate: null,
//     strCategory: 'Pork',
//     strArea: 'French',
//     strInstructions:
//      'Heat oven to 140C/120C fan/gas 1. Put a large ovenproof pan (with a tight-fitting lid) on a high heat. Add your fat and diced meat, cook for a few mins to seal the edges, giving it a quick stir to cook evenly. Reduce the heat to low, add the sliced onion, whole garlic cloves, carrot and fennel seeds, and cook gently to soften the veg for a few mins.\r\nPour over the red wine vinegar, scraping any meaty bits off the bottom of the pan. Add the stock, tomato purée, and half the rosemary and parsley. Bring to the boil and simmer for 10 mins, then season, cover with a lid and put into the oven for 2 hrs, removing the lid for the final hour of cooking. Stir occasionally and add the beans with 30 mins to go.\r\nRemove the pan from the oven and heat the grill. Scatter the top with the remaining herbs and breadcrumbs, drizzle a little oil over the top, and return to the oven for 5-10 mins, until the breadcrumbs are golden. Serve with crusty bread and green veg.',
//     strMealThumb:
//      'https://www.themealdb.com/images/media/meals/wxuvuv1511299147.jpg',
//     strTags: null,
//     strYoutube: 'https://www.youtube.com/watch?v=MEdHMTD0VCA',
//     strIngredient1: 'Goose Fat',
//     strIngredient2: 'Pork',
//     strIngredient3: 'Onion',
//     strIngredient4: 'Garlic',
//     strIngredient5: 'Carrots',
//     strIngredient6: 'Fennel Seeds',
//     strIngredient7: 'Red Wine Vinegar',
//     strIngredient8: 'Vegetable Stock',
//     strIngredient9: 'Tomato Puree',
//     strIngredient10: 'Rosemary',
//     strIngredient11: 'Parsley',
//     strIngredient12: 'Haricot Beans',
//     strIngredient13: 'Breadcrumbs',
//     strIngredient14: 'Oil',
//     strIngredient15: 'Bread',
//     strIngredient16: 'Broccoli',
//     strIngredient17: '',
//     strIngredient18: '',
//     strIngredient19: '',
//     strIngredient20: '',
//     strMeasure1: '4 tbsp',
//     strMeasure2: '350g',
//     strMeasure3: '1 large',
//     strMeasure4: '10',
//     strMeasure5: '1 thinly sliced',
//     strMeasure6: '1 tsp ',
//     strMeasure7: '2 tblsp ',
//     strMeasure8: '600ml',
//     strMeasure9: '1 tblsp ',
//     strMeasure10: '2 sticks',
//     strMeasure11: 'Handful',
//     strMeasure12: '400g',
//     strMeasure13: '2 tblsp ',
//     strMeasure14: 'drizzle',
//     strMeasure15: 'to serve',
//     strMeasure16: 'to serve',
//     strMeasure17: '',
//     strMeasure18: '',
//     strMeasure19: '',
//     strMeasure20: '',
//     strSource: 'https://www.bbcgoodfood.com/recipes/jacks-pork-cassoulet',
//     dateModified: null },

module.exports = getRecipeAPI;