var recipeData = [{
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

var daysDefault = [{
        day: "Sunday",
        order: 0
    },
    {
        day: "Monday",
        order: 1
    },
    {
        day: "Tuesday",
        order: 2
    },
    {
        day: "Wednesday",
        order: 3
    },
    {
        day: "Thursday",
        order: 4
    },
    {
        day: "Friday",
        order: 5
    },
    {
        day: "Saturday",
        order: 6
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