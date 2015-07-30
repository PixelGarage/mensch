/**
 * This file contains all Drupal behaviours of the Apia theme.
 *
 * Created by ralph on 05.01.14.
 */

(function ($) {

    /**
     * This behavior adds shadow to header on scroll.
     *
     */
    Drupal.behaviors.addHeaderShadow = {
        attach: function (context) {
            $(window).on("scroll", function() {
                var $header = $("header.navbar"),
                    $headerCont = $("header.navbar .container"),
                    fixedHeaderScrollPos = 100,
                    $width = $(window).width();

                fixedHeaderScrollPos = 0;

                if ($(window).scrollTop() > fixedHeaderScrollPos) {
                    // keep header fixed at this scroll position
                    $header.css({position: 'fixed', top: -fixedHeaderScrollPos + 'px'});
                    $header.removeClass('navbar-static-top').addClass('navbar-fixed-top');
                    $('body').removeClass('navbar-is-static-top').addClass('navbar-is-fixed-top');

                    // add shadow to header
                    $headerCont.css( "box-shadow", "0 4px 3px -4px gray");
                } else {
                    // set header to static in top scroll region (> 110px)
                    $header.css({position: 'static', top: 'auto'});
                    $header.removeClass('navbar-fixed-top').addClass('navbar-static-top');
                    $('body').removeClass('navbar-is-fixed-top').addClass('navbar-is-static-top');

                    // remove shadow to header
                    $headerCont.css( "box-shadow", "none");
                }
            });
        }
    };

    /**
     * Show / hide the carousel controls depending on the number of items.
     *
     */
    Drupal.behaviors.manageCarouselControls = {
        attach: function (context) {
            var $carousels = $('.node-kfartwork .field-name-field-images .carousel');

            $carousels.each(function() {
                var $carousel = $(this),
                    $items = $carousel.find('.item'),
                    $controls = $carousel.find('.carousel-control');

                if ($items.length <= 1) {
                    $controls.hide();
                }
            });
        }
    };

    /**
     * Scrolls smoothly to the url anchor, when menu is clicked.
     */
    Drupal.behaviors.smoothScrollingToAnchor = {
        attach: function () {
            var $header = $("header.navbar .container"),
                $anchorMenus = $('a#menu-contact, a#menu-about, a#menu-submit'),
                _animatedScrollTo = function(anchor) {
                    var $width = $(window).width(),
                        headerHeight = 100,
                        offset = 80;

                    if ($width <= 350) {
                        headerHeight = $header.height() - 80
                        offset = 20;
                    } else if ($width <= 450) {
                        headerHeight = $header.height() - 80;
                        offset = 30;
                    } else if ($width <= 550) {
                        headerHeight = $header.height() - 90;
                        offset = 30;
                    } else if ($width <= 650) {
                        headerHeight = $header.height() - 100;
                    }

                    $('html, body').stop().animate({
                        scrollTop: $(anchor).offset().top - headerHeight - offset
                    }, 600);
                };


            // anchor menu click (same page active)
            $header.once('click', function () {
                $anchorMenus.on('click', function () {
                    // animated scrolling to anchor
                    var anchor = "#" + $(this).attr('href').split("#")[1];
                    _animatedScrollTo(anchor);
                    return false;
                });
            });
        }
    };


})(jQuery);