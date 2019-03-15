var recipeData = [{
        name: "Roasted Chicken",
        image: "https://i.pinimg.com/564x/7a/06/24/7a06240b035533a3c03301084f3b44bc.jpg?b=t",
        ingredients: [{
                ingredientName: "chicken",
                ingredientQuantity: "1 whole"
            },
            {
                ingredientName: "carrots",
                ingredientQuantity: "4 whole"
            },
            {
                ingredientName: "celery",
                ingredientQuantity: "3 stalks"
            },
            {
                ingredientName: "onion",
                ingredientQuantity: "3 whole"
            },
            {
                ingredientName: "garlic",
                ingredientQuantity: "5 cloves"
            },
            {
                ingredientName: "lemon",
                ingredientQuantity: "1 whole"
            },
            {
                ingredientName: "butter",
                ingredientQuantity: "1 tbsp"
            },
            {
                ingredientName: "rosemary",
                ingredientQuantity: "1 sprig"
            },
            {
                ingredientName: "thyme",
                ingredientQuantity: "1 sprig"
            }
        ]
    },
    {
        name: "Milanesa",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Cotoletta_alla_milanese.jpg/1200px-Cotoletta_alla_milanese.jpg",
        isRestaurant: false,
        ingredients: [{
                ingredientName: "chicken",
                ingredientQuantity: "2 breasts"
            },
            {
                ingredientName: "breadcrumbs",
                ingredientQuantity: "2 cups"
            },
            {
                ingredientName: "flour",
                ingredientQuantity: "2 cups"
            },
            {
                ingredientName: "lemon",
                ingredientQuantity: "1 whole"
            },
            {
                ingredientName: "garlic",
                ingredientQuantity: "2 cloves minced"
            },
            {
                ingredientName: "oil",
                ingredientQuantity: "3 cups"
            }
        ]
    },
    {
        name: "Sushi",
        image: "https://www.thegalmont.com/files/hotel/hotel-a/08-generic/galmont-hotel-sushi-bar-01.jpg",
        isRestaurant: false,
        ingredients: [{
                ingredientName: "crab",
                ingredientQuantity: "2 packages"
            },
            {
                ingredientName: "rice",
                ingredientQuantity: "2 cups"
            },
            {
                ingredientName: "seaweed",
                ingredientQuantity: "4 sheets"
            },
            {
                ingredientName: "cucumber",
                ingredientQuantity: "1 whole"
            },
            {
                ingredientName: "avocado",
                ingredientQuantity: "2 whole"
            },
            {
                ingredientName: "sesame seeds",
                ingredientQuantity: "2 tbsp"
            }
        ]
    }
];

var daysDefault = [{
        day: "Sunday",
        order: 0,
        lunch: {},
        dinner: {}
    },
    {
        day: "Monday",
        order: 1,
        lunch: {},
        dinner: {}
    },
    {
        day: "Tuesday",
        order: 2,
        lunch: {},
        dinner: {}
    },
    {
        day: "Wednesday",
        order: 3,
        lunch: {},
        dinner: {}
    },
    {
        day: "Thursday",
        order: 4,
        lunch: {},
        dinner: {}
    },
    {
        day: "Friday",
        order: 5,
        lunch: {},
        dinner: {}
    },
    {
        day: "Saturday",
        order: 6,
        lunch: {},
        dinner: {}
    },
];

var userData = [{
        username: "Angie",
        password: "password",
        plan: daysDefault
    },
    {
        username: "Rosa",
        password: "password",
        plan: daysDefault
    },
    {
        username: "Buby",
        password: "password",
        plan: daysDefault
    },
    {
        username: "Delfi",
        password: "password",
        plan: daysDefault
    },
    {
        username: "John",
        password: "password",
        plan: daysDefault
    },

];

var data = {
    recipeData: recipeData,
    userData: userData,
    daysData: daysDefault
};

module.exports = data;