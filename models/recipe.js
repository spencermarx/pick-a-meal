var mongoose = require("mongoose");

// Set up Mongoose Data Schemas
var recipeSchema = new mongoose.Schema({
    name: String,
    image: String,
    portion: Number,
    health: Number,
    taste: Number,
    isRestaurant: Boolean,
    ingredients: [{
        ingredientName: String,
        ingredientQuantity: Number
    }],
    lastUpdated: { type: Date, default: Date.now } //Says date and sets default value to now
});

module.exports = mongoose.model("Recipe", recipeSchema);