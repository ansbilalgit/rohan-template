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