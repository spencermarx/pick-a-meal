// Dropdown Action
$('.ui.dropdown').dropdown();

// Ingredient Form
$('#addIngredient').on('click', function() {

    if ($('#ingredient-name').val() !== "" && $('#ingredient-quantity').val() !== "") {
        var ingredientArray = [];

        // Store Values
        $ingredientName = $('#ingredient-name').val();
        $ingredientQuantity = $('#ingredient-quantity').val();
        $ingredientHTML = `<div class="item">${$ingredientName} : ${$ingredientQuantity}</div>`;

        var ingredientObject = {
            ingredientName: $ingredientName,
            ingredientQuantity: $ingredientQuantity
        };

        ingredientArray.push(ingredientObject);

        // console.log(ingredientArray);


        // Create List Header
        $('#ingredients-list-header').text("List");
        $('#ingredients-list-header').append("<hr>");

        // Append Values to List
        $($ingredientHTML).appendTo('#ingredients-list');

        // Delete Values
        $('#ingredient-name').val("");
        $('#ingredient-quantity').val("");


    }
});

// $(document).ready(function() {
//     var url = $(location).attr('href');
//     console.log('TCL: url', url);
//     var initialCol = $(".column.four.wide.clonable");

//     if (url == "http://localhost:8080/recipes") {
//         for (var i = 0; i < 10; i++) {
//             $.getJSON('https://www.themealdb.com/api/json/v1/1/random.php')
//                 .done(function(data) {
//                     console.log('TCL: data', data);
//                     return parseRecipeData(data, initialCol, createCard);
//                 })
//                 .fail(function(err) {
//                     console.log("Error:", err);
//                 });
//         }
//     }
// });

// var createCard = function(recipe, initialCol) {
//     var newCard = initialCol.clone()
//     initialCol.after(newCard);
// }

// var parseRecipeData = function(data, initialCol, callback) {
//     var meal = data.meals[0];
//     var recipe = {
//         name: meal.strMeal,
//         image: meal.strMealThumb,
//     };
//     return callback(recipe, initialCol);
// };