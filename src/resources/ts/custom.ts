$('.owl-paquetes').owlCarousel({
    loop: true,
    margin: 30,
    responsiveClass: true,
    nav: true,
    navText: ["<span class='icon icon-arrow-left7'></span>", "<span class='icon icon-arrow-right7'></span>"],
    responsive: {
        0: {
            items: 1,
            nav: true
        },
        600: {
            items: 2,
            nav: true
        },
        1000: {
            items: 3,
            nav: true
        }
    }
})

$('.owl-beneficios').owlCarousel({
    loop: true,
    margin: 30,
    responsiveClass: true,
    nav: true,
    navText: ["<span class='icon icon-arrow-left7'></span>", "<span class='icon icon-arrow-right7'></span>"],
    responsive: {
        0: {
            items: 1,
            nav: true
        },
        600: {
            items: 2,
            nav: true
        },
        1000: {
            items: 3,
            nav: true
        }
    }
})


$('.owl-membresias').owlCarousel({
    margin: 30,
    responsiveClass: true,
    nav: true,
    navText: ["<span class='icon icon-arrow-left7'></span>", "<span class='icon icon-arrow-right7'></span>"],
    responsive: {
        0: {
            items: 1,
            nav: true
        },
        600: {
            items: 2,
            nav: true
        },
        1000: {
            items: 3,
            nav: true
        }
    }
})

$('.owl-membresiasotros').owlCarousel({
    margin: 30,
    responsiveClass: true,
    nav: true,
    navText: ["<span class='icon icon-arrow-left7'></span>", "<span class='icon icon-arrow-right7'></span>"],
    responsive: {
        0: {
            items: 1,
            nav: true
        },
        600: {
            items: 2,
            nav: true
        },
        1000: {
            items: 2,
            nav: true
        }
    }
})

$('.owl-beneficiootros').owlCarousel({
    margin: 30,
    responsiveClass: true,
    nav: true,
    navText: ["<span class='icon icon-arrow-left7'></span>", "<span class='icon icon-arrow-right7'></span>"],
    responsive: {
        0: {
            items: 2,
            nav: true
        },
        600: {
            items: 4,
            nav: true
        },
        1000: {
            items: 4,
            nav: true
        }
    }
})

var btn = $('#button');

$(window).scroll(function() {
  if ($(window).scrollTop() > 300) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '300');
});

