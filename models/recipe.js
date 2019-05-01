var mongoose = require("mongoose");

// Set up Mongoose Data Schemas
var recipeSchema = new mongoose.Schema({
    name: String,
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    image: String,
    portion: Number,
    health: Number,
    taste: Number,
    ingredients: [{
        ingredientName: String,
        ingredientQuantity: String
    }],
    directions: String,
    likes: Number,
    lastUpdated: { type: Date, default: Date.now } //Says date and sets default value to now
});

module.exports = mongoose.model("Recipe", recipeSchema);