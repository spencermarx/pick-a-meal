var utilities = {};

utilities.hasDuplicate = function(nameKey, myArray) {
    if (!myArray || myArray.length < 1) { //No liked items
        // console.log(myArray);
        // console.log("No liked recipes");
        return false;
    }
    for (var i = 0; i < myArray.length; i++) { //There is a duplicate
        // console.log("Namekey:", nameKey);
        // console.log("myArray:", myArray[i]._id);
        if (myArray[i]._id == nameKey) {

            console.log("Duplicate detected!");
            return true;
        }
    }
    // console.log(myArray);

    console.log("CheckDupes escaped");
    return false;
};

utilities.removeRecipe = async function(foundUser, nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i] == nameKey) {
            myArray.splice(i, 1);
        }
    }
    await foundUser.save();
}

utilities.userIsOwner = function(user, foundRecipe){
    return foundRecipe.addedBy._id.equals(user._id);
};

utilities.userHasAddedMeal = function(user, foundRecipe) {
	// console.log("TCL: utilities.userHasAddedMeal ->", user.addedMeals);
	// console.log("TCL: utilities.userHasAddedMeal ->", user.addedMeals.length);
    if(user.addedMeals && user.addedMeals.length >= 1){
        for (var i = 0; i < user.addedMeals.length; i++) {
            var userRecipe = user.addedMeals[i].name;
            // console.log("TCL: userHasAddedMeal -> userRecipe", userRecipe);
            var currentRecipe = foundRecipe.name;
            // console.log("TCL: userHasAddedMeal -> currentRecipe", currentRecipe);
            if(userRecipe === currentRecipe){
                return true;
            }
    }
    return false;
    }
};

module.exports = utilities;