var mongoose = require("mongoose");

// Set up Mongoose Data Schemas
var recipeSchema = new mongoose.Schema({
    name: String,
    image: String,
    isRestaurant: Boolean,
    ingredients: [{
        ingredientName: String,
        ingredientQuantity: String
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    lastUpdated: { type: Date, default: Date.now } //Says date and sets default value to now
});

module.exports = mongoose.model("Recipe", recipeSchema);