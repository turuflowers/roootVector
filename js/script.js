function resizeSections() {


    windowWidth = $(window).width();
    windowHeight = $(window).height();

    $("body, .item").height(windowHeight);
    $("body, .item").width(windowWidth);

    $(".pantallas").height(windowHeight * 3);
    $(".pantallas").width(windowWidth * 3);

    correctLocation(true);

}

function correctLocation(immediate) {

    currentItem = $(".item" + current);


    if (immediate) {


        $(".pantallas").animate({
            left: 0,
            top: 0
        }, 0);
        $(".pantallas").animate({
            left: -currentItem.offset().left,
            top: -currentItem.offset().top
        }, 0);

    }

}


$("document").ready(function () {

    windowWidth = $(window).width();
    windowHeight = $(window).height();
    current = 5;

    c = 9 / 3;

    $.get('templates/pantalla.html', function (html) {
        var template = $(html);

        var i = 0;
        $.ajax
        ({
            dataType: "json",
            url: "data/data.json",
            async: false,
            success: function (data) {


                $.each(data.pantallas, function (property, valor) {

                    i++;

                    var temp = template.clone();

                    temp.addClass("item" + i);

                    temp.find('h2').text(valor.id);


                    $(temp).appendTo(".pantallas");


                });


            }
        });

        //resize inicial
        resizeSections();

        //resize según evento
        $(window).bind('resize', function (event) {
            resizeSections();
        });
    });


    $("body").keydown(function (e) {

        if (e.keyCode == 37) { // left
            if ((-$(".pantallas").offset().left) > 0) {
                current = current - 1;
                $(".pantallas").animate({
                    left: "+=" + windowWidth
                }, 300);
            }
            e.preventDefault();
        }
        else if (e.keyCode == 38) { // up
            if (current > 3) {
                current = current - 3;
                $(".pantallas").animate({
                    top: "+=" + windowHeight
                }, 300);

            }
            e.preventDefault();
        }
        else if (e.keyCode == 39) { // right
            if ((-$(".pantallas").offset().left) + windowWidth < $(".pantallas").width()) {
                current = current + 1;
                currentItem = $(".item" + current);
                $(".pantallas").animate({
                    left: "-=" + windowWidth
                }, 300);

            }
            e.preventDefault();
        }
        else if (e.keyCode == 40) { // down
            if ((-$(".pantallas").offset().top) + windowHeight < $(".pantallas").height()) {
                current = current + 3;
                currentItem = $(".item" + current);
                $(".pantallas").animate({
                    top: "-=" + windowHeight
                }, 300);

            }
            e.preventDefault();
        }
    });

    $("body").swipe({
        swipeLeft: function (event, direction, distance, duration, fingerCount) {
            $("body").trigger(
                jQuery.Event('keydown', {keyCode: 39, which: 39})
            );
        },
        swipeRight: function (event, direction, distance, duration, fingerCount) {
            $("body").trigger(
                jQuery.Event('keydown', {keyCode: 37, which: 37})
            );
        },
        swipeUp: function (event, direction, distance, duration, fingerCount) {
            $("body").trigger(
                jQuery.Event('keydown', {keyCode: 40, which: 40})
            );
        },
        swipeDown: function (event, direction, distance, duration, fingerCount) {
            $("body").trigger(
                jQuery.Event('keydown', {keyCode: 38, which: 38})
            );
        }
    });

});