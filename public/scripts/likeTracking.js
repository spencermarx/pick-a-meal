var likeTracking = {};

likeTracking.checkDuplicates = function(nameKey, myArray) {
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

likeTracking.unlikeRecipe = async function(foundUser, nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i] == nameKey) {
            myArray.splice(i, 1);
        }
    }
    await foundUser.save();
};

module.exports = likeTracking;