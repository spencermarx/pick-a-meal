var mongoose = require("mongoose");

// Set up Mongoose Data Schemas
var recipeSchema = new mongoose.Schema({
    name: String,
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    image: String,
    ingredients: [{
        ingredientName: String,
        ingredientQuantity: String
    }],
    process: String,
    likes: Number,
    lastUpdated: { type: Date, default: Date.now } //Says date and sets default value to now
});

module.exports = mongoose.model("Recipe", recipeSchema);