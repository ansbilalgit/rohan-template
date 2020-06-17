// Toggle done button

$(document).ready(function() {
    $('.redo').click(function() {
        $('.success, .error').toggle();
    });
});


// Cards

$(document).ready(function() {
    $(".signin").click(function() {
        $(".card-holder").hide(200);
        $(".signinsec").show(200);
    });

    $(".fprgetright").click(function() {
        $(".signinsec").hide(200);
        $(".forgetpasspopup").show(200);
    });
});

function rotateCard(btn) {
    var $card = $(btn).closest('.card-container');
    console.log($card);
    if ($card.hasClass('hover')) {
        $card.removeClass('hover');
    } else {
        $card.addClass('hover');
    }
}

// Slider

$('.slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.slider-nav'
});
$('.slider-nav').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    dots: true,
    focusOnSelect: true
});

$('a[data-slide]').click(function(e) {
    e.preventDefault();
    var slideno = $(this).data('slide');
    $('.slider-nav').slick('slickGoTo', slideno - 1);
});

// Handling slider click event

$('.slick-slider').on('click', '.slick-slide', function(e) {

    $(".flag_icon").hide();
    $(".flag").removeClass("selected_flag");
    $("img", this).addClass("selected_flag")
    $(".flag_icon", this).show();
});


function showPassword() {
    var x = document.getElementById("myInput");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

function myFunction1() {
    var x = document.getElementById("mypass");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

function myFunction2() {
    var x = document.getElementById("myconfirmpass");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

//loading icons

function updateTimer(el, status) {
    var smallPie = $(el).find('.pie.lt50');
    var largePie = $(el).find('.pie.fill');
    var ring = $(el).find('.ring');

    if (status < 180) {
        smallPie.css('-webkit-transform', 'rotate(' + status + 'deg)');
    } else if (status == 360) {
        $(el).addClass('done');
        return;
    } else {
        smallPie.addClass('gt50');
        largePie.css('-webkit-transform', 'rotate(' + status + 'deg)');
    }

    ++status;

    setTimeout(function() {
        updateTimer(el, status);
    }, 15);
}

function startLoading(loader, shelf) {
    debugger;
    var loaders = $(loader);
    $(shelf).show();
    loaders.each(function(idx, ldr) {
        setTimeout(function() {
            updateTimer(ldr, 0);
        }, Math.floor(1000 * Math.random()));
    });
}

$(".search_btn_printer").on("click", function() {

    var color_loader = $(".color_loader_printer");
    color_loader.show();
    $(this).hide();

    setTimeout(function() {

        color_loader.hide();
        startLoading(".loader_printer", ".shelf_printer");
    }, 3000);
})

$(".search_btn_pda").on("click", function() {

    var color_loader = $(".color_loader_pda");
    color_loader.show();
    $(this).hide();

    setTimeout(function() {

        color_loader.hide();
        startLoading(".loader_pda", ".shelf_pda");
    }, 3000);
})