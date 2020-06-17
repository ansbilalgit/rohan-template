//background animation

var _canvas = document.createElement('canvas');
_canvas.classList.add('background-canvas');
const c = document.body.appendChild(_canvas).getContext('2d')
    // c.classList.add('background-canvas');
const { canvas } = c

const points = []

// Properties
const pointsCount = 100
const pointRadius = 1
const pointVelocity = 3
const maxDistBetweenPoint = 150
const maxLineWidth = 1
const renderPoints = true
const bokehBackground = true
const glow = true

//
let frame = 0

const resize = () => {
    if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
    }
}

const renderLines = (point) => {
    for (let i = 0; i < points.length; i++) {
        const _p = points[i]
        const _d = Math.sqrt((point.x - _p.x) ** 2 + (point.y - _p.y) ** 2)

        if (_d > maxDistBetweenPoint) continue

        let alpha = Math.min(1, Math.max(0, 1 - (_d / maxDistBetweenPoint)))

        c.save()
        c.globalAlpha = alpha
        c.lineWidth = maxLineWidth * alpha
        c.strokeStyle = `hsl(${ point.x + point.y }deg, 100%, 50%)`
        c.beginPath()
        c.moveTo(point.x, point.y)
        c.lineTo(_p.x, _p.y)
        c.stroke()
        c.restore()
    }
}

const loop = () => {
    frame++
    requestAnimationFrame(loop)

    resize()

    c.fillStyle = "#000"
    c.fillRect(0, 0, canvas.width, canvas.height)


    c.fillStyle = '#fff'
    points.forEach(point => {

        if (renderPoints) {
            c.beginPath()
            c.arc(point.x, point.y, pointRadius, 0, Math.PI * 2)
            c.fill()
        }

        point.x += point.velocity.x
        point.y += point.velocity.y

        if (point.x < -2) {
            point.x = 0
            point.velocity.x = -point.velocity.x
        }

        if (point.x > canvas.width + 2) {
            point.x = canvas.width
            point.velocity.x = -point.velocity.x
        }

        if (point.y < -2) {
            point.y = 0
            point.velocity.y = -point.velocity.y
        }

        if (point.y > canvas.height + 2) {
            point.y = canvas.height
            point.velocity.y = -point.velocity.y
        }

        renderLines(point)
    })

    c.save()
    c.globalCompositeOperation = "screen"
    c.filter = "blur(4px)"
    c.drawImage(canvas, 0, 0)
    c.restore()

    if (bokehBackground) {
        c.save()
        c.globalCompositeOperation = "screen"
        c.filter = "blur(20px)"
        c.scale(-1, 1)
        c.drawImage(canvas, -canvas.width, 0)
        c.restore()
    }
}

resize()

for (let i = 0; i < pointsCount; i++) {
    points.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        velocity: {
            x: -pointVelocity + Math.random() * pointVelocity * 2,
            y: -pointVelocity + Math.random() * pointVelocity * 2
        }
    })
}

loop()


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