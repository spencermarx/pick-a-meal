var mongoose = require("mongoose");

// Set up Mongoose Data Schemas
var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    plan: [{
        day: String,
        order: Number,
        lunch: Object,
        dinner: Object
    }]
});

module.exports = mongoose.model("User", userSchema);