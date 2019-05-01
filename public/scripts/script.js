$(document).ready(function () {
    $.ajaxSetup({
        cache: false
    });
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
                url: '/api/liked/' + url,
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

    // Add Image Dimmer
    $('.ui.dimmer').dimmer({on: 'hover'});

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
    $('#portion').range({
        min: 0,
        max: 5,
        start: 1,
        step: 0.5,
        onChange: function (value) {
            $('#portion-indicator').html(value);
        }
    });
    $('#health').range({
        min: 0,
        max: 10,
        start: 5,
        onChange: function (value) {
            $('#health-indicator').html(value);
        }
    });
    $('#taste').range({
        min: 0,
        max: 10,
        start: 5,
        onChange: function (value) {
            $('#taste-indicator').html(value);
        }
    });



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
    var $tableIng = $(".ingredients")[0];

    $addIng.on("click.addEvent", function(){

        // Save data under array of objects (Ingredients)
        var $currentIng = $(this).parent();

        // Create an empty row below
        newIngredient($currentIng);

        // Change button
        changeAddButton($currentIng);

        // Make the input uneditable
        inputDisabled($currentIng);
    });

    var newIngredient = function($currentIng){
        var $newRow = $currentIng.clone(true, true);
        $newRow.find("input").val("");
        // console.log($rowIng[0]);
        $tableIng.append($newRow[0]);
        // $rowIng.clone().appendTo($tableIng) ;
    };

    var changeAddButton = function($currentIng){
        // TODO: Remove Saved Data?

        // Change plus to a trash can
        $currentIng.find("i").removeClass("plus").addClass("trash");

        // Change Styling
        var $currentAddBtn = $currentIng.find(".add-button");
        $currentAddBtn.removeClass("add-button");
        $currentAddBtn.addClass("remove-button");

        // Turn off previous event listener
        $currentAddBtn.off("click.addEvent");
        $currentAddBtn.on("click.removeEvent", function(){
            var $currentIng = $(this).parent();
            $currentIng.remove();
        });

    };

    var inputDisabled = function($currentIng){
        console.log($currentIng.find("input"));
        $currentIng.find("input").prop("readonly", true);
        $currentIng.find("input").addClass("added-ingredient");
    };
});