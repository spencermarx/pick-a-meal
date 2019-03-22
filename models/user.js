var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

// Set up Mongoose Data Schemas
var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    likedMeals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe"
    }],
    plan: [{
        day: String,
        order: Number,
        date: Date,
        lunch: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Recipe"
        },
        dinner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Recipe"
        }
    }]
});


userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);