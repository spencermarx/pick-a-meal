$(function () {
    // Navigation Dropdown Button
    var $menuButton = $("#expand-menu-button");
    var $collapsable = $(".collapsable");

    $menuButton.on("click", function () {

        $collapsable.toggleClass("collapsed");
    });

    // Dropdown Action
    $('.ui.dropdown').dropdown();

    // Ingredient Form
    $('#addIngredient').on('click', function () {

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

    var $likeBtn = $("#like-button");
    var $likeCounter = $("#like-counter");

    $likeBtn.on("click", function () {
        var url = likeUrlAPI();

        $.ajax({
                method: 'post',
                url: 'http://localhost:8080/api/liked/' + url,
                success: function (msg, status, jqXHR) {
                    var jsonUpdatedData = msg;
                    // console.log(jsonUpdatedData);
                },
                error: function () {
                    console.log('Error!!');
                },
                dataType: "json"
            })
            .done(function (response) {
                var action = response.action;
                if (action === "like") {
                    $likeCounter.text(changeLikeNumber("like"));
                    $likeBtn.toggleClass("inverted");
                    $likeBtn.html("<i class='heart icon'></i>Liked");
                } else if (action === "unlike") {
                    $likeCounter.text(changeLikeNumber("unlike"));
                    $likeBtn.toggleClass("inverted");
                    $likeBtn.html("<i class='heart icon'></i>Like");
                }
            });
    });

    // Change Text Content of Like Counter
    var changeLikeNumber = function (action) {
        var count = parseInt($likeCounter.text().replace(",", ""), 10);
        // console.log(count);
        // console.log(typeof count);
        if (action === "like") {
            return numberWithCommas(count += 1);
        } else if (action === "unlike") {
            return numberWithCommas(count -= 1);
        }
    };

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    var likeUrlAPI = function () {
        var fullURL = $(location).attr('href');
        var urlSplit = fullURL.split("/");
        var id = urlSplit[urlSplit.length - 1];
        return id;
    };
})



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