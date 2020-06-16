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

function startLoading() {
    var loaders = $('.loader');
    $('.shelf').show();
    loaders.each(function(idx, ldr) {
        setTimeout(function() {
            updateTimer(ldr, 0);
        }, Math.floor(1000 * Math.random()));
    });
}

$(".search_btn").on("click", function() {

    var color_loader = $(".loader_color");
    color_loader.show();
    $(".search__button").hide();

    setTimeout(function() {

        color_loader.hide();
        startLoading();
    }, 3000);
})