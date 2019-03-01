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

// $('#recipe-submit').on('click', function() {

//     // var data = $('#recipe-form').serializeArray();
//     // data.push({ name: 'ingredients', value: ingredientArray });

//     // $.post("/recipes", data);

// });

// for(var i = 0; i <  recipe.ingredients.length; i++){
//     if(i !== recipe.ingredients.length-1) {
//         recipe.ingredients[i].ingredientName
//         recipe.ingredients[i].ingredientQuantity + "\n"
//     } else {
//         recipe.ingredients[i].ingredientName
//         recipe.ingredients[i].ingredientQuantity
//     }
// }