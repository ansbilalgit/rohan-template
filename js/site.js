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