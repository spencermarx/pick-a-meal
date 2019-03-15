var axios = require("axios");

var url = "https://www.themealdb.com/api/json/v1/1/random.php"

var getRecipeAPI = async function() {
    console.log("Inside getRecipes");

    axios.get(url)
        .then(function(response) {
            // console.log(response.data.meals[0]);
            return response.data.meals[0];
        })
        .catch(function(error) {
            console.log(error);
        });

}


module.exports = getRecipeAPI;