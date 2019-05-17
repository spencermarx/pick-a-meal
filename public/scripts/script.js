$(document).ready(function () {
    $.ajaxSetup({
        cache: false
    });

    // Initialize components

    // Dropdown Action
    $('.ui.dropdown').dropdown();

    //  Modal
    $('.ui.modal').modal();

    // // Add Image Dimmer
    $('.image .ui.dimmer').dimmer({
        on: 'hover'
    });
    $('.recipe-image-wrapper .ui.dimmer').dimmer({
        on: 'hover'
    });

    // DASHBOARD

    if (window.location.href.indexOf("dashboard") > -1) {
        // Draggable - Jquery UI

        var totalMealsLeft = 14;
        initializeStats(totalMealsLeft);



        var $draggable = $('.draggable');
        $draggable.draggable({
            cancel: "a.ui-icon", // clicking an icon won't initiate dragging
            //revert: "invalid", // when not dropped, the item will revert back to its initial position
            // revert: true, // bounce back when dropped
            helper: "clone", // create "copy" with original properties, but not a true clone
            cursor: "grabbing",
            // revertDuration: 300, // immediate snap
            start: function () {
                $(".drag-well").css("overflow", "inherit");
                $(this).css("opacity", "0.2");
                // $(ui.helper).addClass("ui-draggable-helper");
            },
            stop: function () {
                $(".drag-well").css("overflow", "auto");
                $(this).css("opacity", "1");
                // $(ui.helper).removeClass("ui-draggable-helper");
            }
        });

        $('.lunch').droppable({
            accept: ".draggable",
            tolerance: "pointer",
            // activeClass: "ui-state-highlight",
            drop: async function (event, ui) {
                handleDrop($(this), ui.draggable);
                var stats = calculateStats($(this));
                updateDayStatsView($(this), stats);
                updateInfoBarStatsView(totalMealsLeft);
                await saveMealsAJAX();
            }
        });
        $('.dinner').droppable({
            accept: ".draggable",
            tolerance: "pointer",
            // activeClass: "ui-state-highlight",
            drop: async function (event, ui) {
                handleDrop($(this), ui.draggable);
                var stats = calculateStats($(this));
                updateDayStatsView($(this), stats);
                updateInfoBarStatsView(totalMealsLeft);
                await saveMealsAJAX();
            }
        });
    }

    function initializeMealsLeft(totalMealsLeft) {
        var $lunch = $('.lunch');
        var $dinner = $('.dinner');

        var allMeals = $.merge($lunch, $dinner);


        if(totalMealsLeft > 0) {
            $.each(allMeals, function (index, val) {
                var id = $(this).attr('data-meal-id');
				// console.log("TCL: initializeMealsLeft -> id", id);
                if (id && (id.length > 1)) {
                    totalMealsLeft -= 1;
                }
            });
        }

		// console.log("TCL: initializeMealsLeft -> totalMealsLeft", totalMealsLeft);
        $('.stat-meals-left').text(totalMealsLeft);

        return totalMealsLeft;

    }

    function initializeStats() {
        totalMealsLeft = initializeMealsLeft(totalMealsLeft);


        var $lunch = $('.lunch');
        var $dinner = $('.dinner');

        if (totalMealsLeft < 14) {


            var $allMeals = $.merge($lunch, $dinner);
            var denom = 14 - totalMealsLeft;

            var totalHealthScore = 0;
            var totalTasteScore = 0;


            $.each($allMeals, function (index, val) {
                var meal = $(this);

                var mealHealth = parseInt(meal.attr('data-meal-health'));
                var mealTaste = parseInt(meal.attr('data-meal-taste'));

                if (mealHealth) {
                    totalHealthScore += mealHealth;
                }
                if (mealTaste) {
                    totalTasteScore += mealTaste;
                }
            });

            var avgHealthScore = Math.round((totalHealthScore / denom) * 100) / 100;
            var avgTasteScore = Math.round((totalTasteScore / denom) * 100) / 100;
            // console.log("total health points->", totalHealthScore);
            // console.log("total meals ->", $allMeals.length);
            // console.log("Total avg->", avgHealthScore);

            $('.stat-all-health').text(avgHealthScore);
            $('.stat-all-taste').text(avgTasteScore);

        } else {
            // console.log("TCL: initializeStats -> $lunch", $lunch);
            // entered else within initialize stats
            // $('.stat-meals-left').text(14);
            $('.stat-all-health').text('-');
            $('.stat-all-taste').text('-');
        }
    }
    function checkIfMealsPresent(arr){
        console.log("began check!")
        $.each(arr, function(index,val){
            var id = $(this).attr('data-meal-id');
			console.log("TCL: checkIfMealsPresent -> id", id);
            if(id){
                console.log("ID found!!!")
                return true;
            }
            console.log("No ID found")
            return false;
        });
    }

    async function saveMealsAJAX() {
        // define url endpoint
        var urlSaveDashboard = '/api/save-dashboard'

        // collect and package data
        var recipesData = collectRecipes();

        // console.log(recipesData);


        $.ajax({
            method: 'post',
            url: urlSaveDashboard,
            data: {
                data: recipesData
            },
            dataType: 'json',
            success: function (msg, status, jqXHR) {
                var jsonUpdatedData = msg;
                console.log(jsonUpdatedData);
            },
            error: function () {
                console.log('Error!!');
            }
        })
    }


    function collectRecipes() {
        // [
        // {
        // day: Monday
        // lunch: ID
        // dinner: ID
        // }
        // ]

        // Select days
        var $days = $('.day');

        // Export
        var daysArray = [];



        // For each day
        $.each($days, function (index, val) {
            var $lunch = $(this).find('.lunch');
            var $dinner = $(this).find('.dinner');

            var lunchId = $lunch.attr('data-meal-id');
            var dinnerId = $dinner.attr('data-meal-id');

            var dayDataObj = {
                order: index,
                lunch: lunchId,
                dinner: dinnerId
            }
            daysArray.push(dayDataObj);
        })



        return daysArray;

    }

    function handleDrop(selectedDrop, draggable) {
        // clone item to retain in original "list"

        var $dragID = draggable.attr('data-meal-id');
        var $dragImg = draggable.attr('data-meal-img');
        var $dragHealth = draggable.attr('data-meal-health');
        var $dragTaste = draggable.attr('data-meal-taste');

        selectedDrop.addClass('has-drop')
            .attr("data-meal-id", $dragID)
            .attr("data-meal-img", $dragImg)
            .attr("data-meal-health", $dragHealth)
            .attr("data-meal-taste", $dragTaste)
            .attr("onclick", "window.open('/recipes/" + $dragID + "','mywindow');");

        var $imgTarget = selectedDrop.find('.day-image-wrapper img');
        $imgTarget.attr('src', $dragImg);
    }

    function calculateStats(selectedDrop) {
        var $dayContent = selectedDrop.parent();
        var $day = $dayContent.parent();

        // Health Score
        var $lunchHealth = $dayContent.find('.lunch').attr('data-meal-health');
        var $dinnerHealth = $dayContent.find('.dinner').attr('data-meal-health');
        // Taste Score
        var $lunchTaste = $dayContent.find('.lunch').attr('data-meal-taste');
        var $dinnerTaste = $dayContent.find('.dinner').attr('data-meal-taste');

        // Calculate Total
        var totalHealth = totalStats($lunchHealth, $dinnerHealth);
        var totalTaste = totalStats($lunchTaste, $dinnerTaste);

        // Average Stats
        var avgHealth = totalHealth / getAvgDenom($lunchHealth, $dinnerHealth);
        var avgTaste = totalTaste / getAvgDenom($lunchTaste, $dinnerTaste);

        var statsObj = {
            avgHealth: avgHealth,
            avgTaste: avgTaste
        };

        // console.log("TCL: calculateStats -> statsObj", statsObj);
        return statsObj;


    }

    function totalStats($lunchStat, $dinnerStat) {
        var total;
        if ($lunchStat && $dinnerStat) {
            total = Number($lunchStat) + Number($dinnerStat);

        } else if ($lunchStat && !$dinnerStat) {
            total = Number($lunchStat);
        } else if (!$lunchStat && $dinnerStat) {
            total = Number($dinnerStat);
        }
        // console.log("TCL: checkStats -> total", total);
        return total;
    }

    function getAvgDenom($lunchStat, $dinnerStat) {
        var denom;
        if ($lunchStat && $dinnerStat) {
            denom = 2;

        } else if (($lunchStat && !$dinnerStat) || (!$lunchStat && $dinnerStat)) {
            denom = 1;
        } else {
            denom = null;
        }
        // console.log("TCL: getAvgDenom -> denom", denom);
        return denom;
    }

    function updateDayStatsView(selectedDrop, statsObj) {
        var $dayContent = selectedDrop.parent();
        var $day = $dayContent.parent();
        var $healthStat = $day.find('.health span');
        var $tasteStat = $day.find('.taste span');

        var avgHealth = statsObj.avgHealth;
        var avgTaste = statsObj.avgTaste;

        // console.log("Health ->", avgHealth);
        $healthStat.text(avgHealth);
        // console.log("Taste ->", avgTaste);
        $tasteStat.text(avgTaste);
    }

    function updateInfoBarStatsView(totalMealsLeft) {


        var $mealsLeft = $('.stat-meals-left');


        var $mealsLeftQty = parseInt($('.stat-meals-left').text());
        console.log("TCL: updateInfoBarStatsView -> mealsLeftQty", $mealsLeftQty);


        var $allHealth = $('.stat-all-health');
        var $allTaste = $('.stat-all-taste');
        var $healthStatsArray = $('.health .stat');
        var $tasteStatsArray = $('.taste .stat');

        var totalAllHealth = aggregateAllStats($healthStatsArray).total;
        var totalAllTaste = aggregateAllStats($tasteStatsArray).total;

        var avgAllHealth = Math.round((totalAllHealth / aggregateAllStats($healthStatsArray).denom) * 100) / 100;
        var avgAllTaste = Math.round((totalAllTaste / aggregateAllStats($tasteStatsArray).denom) * 100) / 100;

        var totalMealsLeft = $mealsLeftQty - 1;


        // console.log("TCL: updateInfoBarStatsView -> avgAllHealth", avgAllHealth);
        $mealsLeft.text(totalMealsLeft);
        $allHealth.text(avgAllHealth);
        $allTaste.text(avgAllTaste);

    }

    function aggregateAllStats(statsArray) {
        var total = 0;
        var denom = 0;
        $.each(statsArray, function (index, val) {

            // Get Value
            var currentStat = parseInt($(this).text());

            // console.log("TCL: updateInfoBarStatsView -> currentStat", currentStat);

            if (currentStat && !isNaN(currentStat)) {
                total += currentStat;
                denom += 1;
            }
        });

        var allStats = {
            total: total,
            denom: denom
        };
        return allStats;
    }


    // Delete Recipe Modal
    var $deleteButton = $("#recipe-delete");
    var $closeIcon = $(".close.icon");
    var $cancelButton = $(".cancel-button");
    var $deleteModal = $('.mini.modal.delete');

    $deleteButton.on("click", function () {
        // alert("about to delete!");
        $deleteModal.modal('show');
    });

    $closeIcon.on("click", function () {
        // alert("about to delete!");
        hideDeleteModal();
    });
    $cancelButton.on("click", function () {
        // alert("about to delete!");
        hideDeleteModal();
    });

    function hideDeleteModal() {
        $deleteModal.modal('hide');
    }




    // Navigation Dropdown Button
    var $menuButton = $("#expand-menu-button");
    var $collapsable = $(".collapsable");

    $menuButton.on("click", function () {
        $(this).toggleClass("is-active");
        $collapsable.toggleClass("collapsed");
    });



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

    var $addButton = $("#add-button");

    $addButton.on("click", function () {
        // alert("Clicked!");

        // Send request
        var urlID = getUrlID();

        $.ajax({
                method: 'post',
                url: '/api/add/' + urlID,
                success: function (msg, status, jqXHR) {
                    var jsonUpdatedData = msg;
                    console.log(jsonUpdatedData);
                },
                error: function () {
                    console.log('Error!!');
                },
                dataType: "json"
            })
            .done(function (response) {
                var action = response.action;
                if (action === "save") {
                    $addButton.text("Saved");
                    $addButton.toggleClass("btn-custom-gray");
                    $addButton.toggleClass("btn-custom-dark-blue");
                    // $likeBtn.html("<i class='heart icon'></i>Liked");
                } else if (action === "remove") {
                    $addButton.text("Save");
                    $addButton.toggleClass("btn-custom-gray");
                    $addButton.toggleClass("btn-custom-dark-blue");
                    // $likeBtn.html("<i class='heart icon'></i>Like");
                }
            });
    });


    // var $likeBtn = $("#like-button");
    // var $likeCounter = $("#like-counter");

    // $likeBtn.on("click", function () {
    //     var url = likeUrlAPI();

    //     $.ajax({
    //             method: 'post',
    //             url: '/api/liked/' + url,
    //             success: function (msg, status, jqXHR) {
    //                 var jsonUpdatedData = msg;
    //                 // console.log(jsonUpdatedData);
    //             },
    //             error: function () {
    //                 console.log('Error!!');
    //             },
    //             dataType: "json"
    //         })
    //         .done(function (response) {
    //             var action = response.action;
    //             if (action === "like") {
    //                 $likeCounter.text(changeLikeNumber("like"));
    //                 $likeBtn.toggleClass("inverted");
    //                 $likeBtn.html("<i class='heart icon'></i>Liked");
    //             } else if (action === "unlike") {
    //                 $likeCounter.text(changeLikeNumber("unlike"));
    //                 $likeBtn.toggleClass("inverted");
    //                 $likeBtn.html("<i class='heart icon'></i>Like");
    //             }
    //         });
    // });

    // Change Text Content of Like Counter
    // var changeLikeNumber = function (action) {
    //     var count = parseInt($likeCounter.text().replace(",", ""), 10);
    //     // console.log(count);
    //     // console.log(typeof count);
    //     if (action === "like") {
    //         return numberWithCommas(count += 1);
    //     } else if (action === "unlike") {
    //         return numberWithCommas(count -= 1);
    //     }
    // };

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function getUrlID() {
        var fullURL = $(location).attr('href');
        var urlSplit = fullURL.split("/");
        var id = urlSplit[urlSplit.length - 1];
        return id;
    };



    // Preview Image
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#preview-image').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#image").change(function () {
        readURL(this);
    });

    /*!
     * # Range slider for Semantic UI.
     *
     */

    ;
    (function ($, window, document, undefined) {

        "use strict";

        $.fn.range = function (parameters) {

            var
                $allModules = $(this),

                offset = 10,

                query = arguments[0],
                methodInvoked = (typeof query == 'string'),
                queryArguments = [].slice.call(arguments, 1);

            $allModules
                .each(function () {

                    var
                        settings = ($.isPlainObject(parameters)) ?
                        $.extend(true, {}, $.fn.range.settings, parameters) :
                        $.extend({}, $.fn.range.settings),

                        namespace = settings.namespace,
                        min = settings.min,
                        max = settings.max,
                        step = settings.step,
                        start = settings.start,
                        input = settings.input,

                        eventNamespace = '.' + namespace,
                        moduleNamespace = 'module-' + namespace,

                        $module = $(this),

                        element = this,
                        instance = $module.data(moduleNamespace),

                        inner,
                        thumb,
                        trackLeft,
                        precision,

                        module;

                    module = {

                        initialize: function () {
                            module.instantiate();
                            module.sanitize();
                        },

                        instantiate: function () {
                            instance = module;
                            $module
                                .data(moduleNamespace, module);
                            $(element).html("<div class='inner'><div class='track'></div><div class='track-fill'></div><div class='thumb'></div></div>");
                            inner = $(element).children('.inner')[0];
                            thumb = $(element).find('.thumb')[0];
                            trackLeft = $(element).find('.track-fill')[0];
                            // find precision of step, used in calculating the value
                            module.determinePrecision();
                            // set start location
                            module.setValuePosition(settings.start);
                            // event listeners
                            $(element).find('.track, .thumb, .inner').on('mousedown', function (event) {
                                event.stopImmediatePropagation();
                                event.preventDefault();
                                $(this).closest(".range").trigger('mousedown', event);
                            });
                            $(element).find('.track, .thumb, .inner').on('touchstart', function (event) {
                                event.stopImmediatePropagation();
                                event.preventDefault();
                                $(this).closest(".range").trigger('touchstart', event);
                            });
                            $(element).on('mousedown', function (event, originalEvent) {
                                module.rangeMousedown(event, false, originalEvent);
                            });
                            $(element).on('touchstart', function (event, originalEvent) {
                                module.rangeMousedown(event, true, originalEvent);
                            });
                        },

                        sanitize: function () {
                            if (typeof settings.min != 'number') {
                                settings.min = parseInt(settings.min) || 0;
                            }
                            if (typeof settings.max != 'number') {
                                settings.max = parseInt(settings.max) || false;
                            }
                            if (typeof settings.start != 'number') {
                                settings.start = parseInt(settings.start) || 0;
                            }
                        },

                        determinePrecision: function () {
                            var split = String(settings.step).split('.');
                            var decimalPlaces;
                            if (split.length == 2) {
                                decimalPlaces = split[1].length;
                            } else {
                                decimalPlaces = 0;
                            }
                            precision = Math.pow(10, decimalPlaces);
                        },

                        determineValue: function (startPos, endPos, currentPos) {
                            var ratio = (currentPos - startPos) / (endPos - startPos);
                            var range = settings.max - settings.min;
                            var difference = Math.round(ratio * range / step) * step;
                            // Use precision to avoid ugly Javascript floating point rounding issues
                            // (like 35 * .01 = 0.35000000000000003)
                            difference = Math.round(difference * precision) / precision;
                            return difference + settings.min;
                        },

                        determinePosition: function (value) {
                            var ratio = (value - settings.min) / (settings.max - settings.min);
                            return Math.round(ratio * $(inner).width()) + $(trackLeft).position().left - offset;
                        },

                        setValue: function (newValue, triggeredByUser) {
                            if (typeof triggeredByUser === 'undefined') {
                                triggeredByUser = true;
                            }
                            if (settings.input) {
                                $(settings.input).val(newValue);
                            }
                            if (settings.onChange) {
                                settings.onChange(newValue, {
                                    triggeredByUser: triggeredByUser
                                });
                            }
                        },

                        setPosition: function (value) {
                            $(thumb).css({
                                left: String(value) + 'px'
                            });
                            $(trackLeft).css({
                                width: String(value + offset) + 'px'
                            });
                        },

                        rangeMousedown: function (mdEvent, isTouch, originalEvent) {
                            if (!$(element).hasClass('disabled')) {
                                mdEvent.preventDefault();
                                var left = $(inner).offset().left;
                                var right = left + $(inner).width();
                                var pageX;
                                if (isTouch) {
                                    pageX = originalEvent.originalEvent.touches[0].pageX;
                                } else {
                                    pageX = (typeof mdEvent.pageX != 'undefined') ? mdEvent.pageX : originalEvent.pageX;
                                }
                                var value = module.determineValue(left, right, pageX);
                                if (pageX >= left && pageX <= right) {
                                    module.setPosition(pageX - left - offset);
                                    module.setValue(value);
                                }
                                var rangeMousemove = function (mmEvent) {
                                    mmEvent.preventDefault();
                                    if (isTouch) {
                                        pageX = mmEvent.originalEvent.touches[0].pageX;
                                    } else {
                                        pageX = mmEvent.pageX;
                                    }
                                    value = module.determineValue(left, right, pageX);
                                    if (pageX >= left && pageX <= right) {
                                        if (value >= settings.min && value <= settings.max) {
                                            module.setPosition(pageX - left - offset);
                                            module.setValue(value);
                                        }
                                    }
                                }
                                var rangeMouseup = function (muEvent) {
                                    if (isTouch) {
                                        $(document).off('touchmove', rangeMousemove);
                                        $(document).off('touchend', rangeMouseup);
                                    } else {
                                        $(document).off('mousemove', rangeMousemove);
                                        $(document).off('mouseup', rangeMouseup);
                                    }
                                }
                                if (isTouch) {
                                    $(document).on('touchmove', rangeMousemove);
                                    $(document).on('touchend', rangeMouseup);
                                } else {
                                    $(document).on('mousemove', rangeMousemove);
                                    $(document).on('mouseup', rangeMouseup);
                                }
                            }
                        },

                        setValuePosition: function (val, triggeredByUser) {
                            if (typeof triggeredByUser === 'undefined') {
                                triggeredByUser = true;
                            }
                            var position = module.determinePosition(val);
                            module.setPosition(position);
                            module.setValue(val, triggeredByUser);
                        },

                        invoke: function (query) {
                            switch (query) {
                                case 'set value':
                                    if (queryArguments.length > 0) {
                                        instance.setValuePosition(queryArguments[0], false);
                                    }
                                    break;
                            }
                        },

                    };

                    if (methodInvoked) {
                        if (instance === undefined) {
                            module.initialize();
                        }
                        module.invoke(query);
                    } else {
                        module.initialize();
                    }

                });

            return this;

        };

        $.fn.range.settings = {

            name: 'Range',
            namespace: 'range',

            min: 0,
            max: false,
            step: 1,
            start: 0,
            input: false,

            onChange: function (value) {},

        };


    })(jQuery, window, document);

    // Semantic UI Sliders
    if ($(location)[0].pathname.includes("edit")) {
        $('#portion').range({
            min: 0,
            max: 5,
            start: $('#portion-indicator').val(),
            step: 0.5,
            onChange: function (value) {
                $('#portion-indicator').val(value);
            }
        });
        $('#health').range({
            min: 0,
            max: 10,
            start: $('#health-indicator').val(),
            onChange: function (value) {
                $('#health-indicator').val(value);
            }
        });
        $('#taste').range({
            min: 0,
            max: 10,
            start: $('#taste-indicator').val(),
            onChange: function (value) {
                $('#taste-indicator').val(value);
            }
        });
    } else {
        $('#portion').range({
            min: 0,
            max: 5,
            start: 2,
            step: 0.5,
            onChange: function (value) {
                $('#portion-indicator').val(value);
            }
        });
        $('#health').range({
            min: 0,
            max: 10,
            start: 5,
            onChange: function (value) {
                $('#health-indicator').val(value);
            }
        });
        $('#taste').range({
            min: 0,
            max: 10,
            start: 5,
            onChange: function (value) {
                $('#taste-indicator').val(value);
            }
        });
    }





    // Add Ingredient
    // Process
    // 1 - Press plus sign
    //     • Save data under array of objects (Ingredients)
    //     • Change plus to a trash can
    //     • Make the input uneditable
    //     • Create an empty row below
    // 2  - Press trash sign
    //     • Erase data from array of objects (Ingredients)
    //     • Remove row
    // 3 - Press Submit
    //     • Package all inputs for submission
    //     • Send HTPP Post


    var $addIng = $(".add-button");
    var $removeIng = $(".remove-button");
    var $tableIng = $(".ingredients")[0];

    $addIng.on("click.addEvent", function () {

        // Save data under array of objects (Ingredients)
        var $currentIng = $(this).parent();

        // Create an empty row below
        newIngredient($currentIng);

        // Change button
        changeAddButton($currentIng);

        // Make the input uneditable
        inputDisabled($currentIng);
    });

    $removeIng.on("click", function () {

        // Save data under array of objects (Ingredients)
        var $currentIng = $(this).parent();

        removeRow($currentIng);
    })

    var newIngredient = function ($currentIng) {
        var $newRow = $currentIng.clone(true, true);
        $newRow.find("input").val("");
        // console.log($rowIng[0]);
        $tableIng.append($newRow[0]);
        // $rowIng.clone().appendTo($tableIng) ;
    };

    var changeAddButton = function ($currentIng) {
        // TODO: Remove Saved Data?

        // Change plus to a trash can
        $currentIng.find("i").removeClass("plus").addClass("trash");

        // Change Styling
        var $currentAddBtn = $currentIng.find(".add-button");
        $currentAddBtn.removeClass("add-button");
        $currentAddBtn.addClass("remove-button");

        // Turn off previous event listener
        $currentAddBtn.off("click.addEvent");
        $currentAddBtn.on("click.removeEvent", function () {
            var $currentIng = $(this).parent();
            $currentIng.remove();
        });

    };
    var removeRow = function ($currentIng) {
        $currentIng.remove();
    };

    var inputDisabled = function ($currentIng) {
        console.log($currentIng.find("input"));
        $currentIng.find("input").prop("readonly", true);
        $currentIng.find("input").addClass("added-ingredient");
    };
});