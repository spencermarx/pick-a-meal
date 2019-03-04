const mongoose = require("mongoose");
const Recipe = require("./models/recipe");
const Day = require("./models/day");
randomRecipes = require("./public/scripts/randomRecipes");

const days = [{
        order: 0,
        day: "Sunday"
    },
    {
        order: 1,
        day: "Monday"
    },
    {
        order: 2,
        day: "Tuesday"
    },
    {
        order: 3,
        day: "Wednesday"
    },
    {
        order: 4,
        day: "Thursday"
    },
    {
        order: 5,
        day: "Friday"
    },
    {
        order: 6,
        day: "Saturday"
    },

];


const data = [{
        name: "Roasted Chicken",
        image: "https://i.pinimg.com/564x/7a/06/24/7a06240b035533a3c03301084f3b44bc.jpg?b=t",
        portion: 0.5,
        health: 6,
        taste: 10,
        isRestaurant: false,
        ingredients: [{
                ingredientName: "chicken",
                ingredientQuantity: 1
            },
            {
                ingredientName: "carrots",
                ingredientQuantity: 4
            },
            {
                ingredientName: "celery",
                ingredientQuantity: 3
            },
            {
                ingredientName: "onion",
                ingredientQuantity: 3
            },
            {
                ingredientName: "garlic",
                ingredientQuantity: 5
            },
            {
                ingredientName: "lemon",
                ingredientQuantity: 1
            },
            {
                ingredientName: "butter",
                ingredientQuantity: 0.15
            },
            {
                ingredientName: "rosemary",
                ingredientQuantity: 1
            },
            {
                ingredientName: "thyme",
                ingredientQuantity: 1
            }
        ]
    },
    {
        name: "Milanesa",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Cotoletta_alla_milanese.jpg/1200px-Cotoletta_alla_milanese.jpg",
        portion: 2,
        health: 3,
        taste: 10,
        isRestaurant: false,
        ingredients: [{
                ingredientName: "chicken",
                ingredientQuantity: 1
            },
            {
                ingredientName: "breadcrumbs",
                ingredientQuantity: 1
            },
            {
                ingredientName: "flour",
                ingredientQuantity: 1
            },
            {
                ingredientName: "lemon",
                ingredientQuantity: 1
            },
            {
                ingredientName: "garlic",
                ingredientQuantity: 2
            },
            {
                ingredientName: "oil",
                ingredientQuantity: 1
            }
        ]
    },
    {
        name: "Sushi",
        image: "https://www.thegalmont.com/files/hotel/hotel-a/08-generic/galmont-hotel-sushi-bar-01.jpg",
        portion: 2,
        health: 8,
        taste: 10,
        isRestaurant: false,
        ingredients: [{
                ingredientName: "crab",
                ingredientQuantity: 2
            },
            {
                ingredientName: "rice",
                ingredientQuantity: 1
            },
            {
                ingredientName: "seaweed",
                ingredientQuantity: 1
            },
            {
                ingredientName: "cucumber",
                ingredientQuantity: 1
            },
            {
                ingredientName: "avocado",
                ingredientQuantity: 2
            },
            {
                ingredientName: "sesame seeds",
                ingredientQuantity: 1
            }
        ]
    }
];

function seedDB() {

    Day.remove({}, function(err) {
        if (err) {
            console.log(err);
        }
        console.log("Removed days!");
        days.forEach(function(seed) {
            Day.create(seed, function(err, day) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Added day!");
                }
            });
        });
    });
    Recipe.remove({}, function(err) {
        if (err) {
            console.log(err);
        }
        console.log("Removed recipes!");
        data.forEach(function(seed) {
            Recipe.create(seed, function(err, recipe) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Added recipe!");
                }
            });
        });
    });
}

module.exports = seedDB;