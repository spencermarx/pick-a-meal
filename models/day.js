const mongoose = require("mongoose");

// Set up Mongoose Data Schemas
const daySchema = new mongoose.Schema({
    order: Number,
    day: String,
    meals: [{
        lunch: Object,
        dinner: Object
    }]
});

module.exports = mongoose.model("Day", daySchema);