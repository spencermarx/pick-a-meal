var axios = require("axios");

var url = "https://www.themealdb.com/api/json/v1/1/random.php"

var getRecipesAPI = async function() {
    console.log("Inside getRecipes");

    axios.get(url)
        .then(function(response) {
            console.log(response);
            return response;
        })
        .catch(function(error) {
            console.log(error);
        });


}


module.exports = getRecipesAPI;