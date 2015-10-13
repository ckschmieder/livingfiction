$(document).ready(function () {
    if ($.browser.webkit) {
        // console.log('Safari on Mac detected, applying class...');
        $('html').addClass('safari_chrome'); // provide a class for the safari-mac specific css to filter with
    }
    var ww = $(document.body).width();
    //var ww = document.body.clientWidth;
    var adjustMenu = function () {
        if ($.browser.msie || $.browser.mozilla || ($.browser.webkit && window.chrome && $.browser.version >= 537.36)) {
            ww = ww + 17;
        }
        //$('.widowWidth').html(ww + ' Version:' + $.browser.version);
        if (ww <= 769) {
            $(".toggleMenu").css("display", "inline-block");
            $(".tagg").css("display", "none");
            if (!$(".toggleMenu").hasClass("active")) {
                $(".nav").hide();
            } else {
                $(".nav").show();
            }
            $(".nav li").unbind('mouseenter mouseleave');
            $(".nav").find("li").removeClass("hover");
            $(".nav li a.parent").unbind('click').bind('click', function (e) {
                // must be attached to anchor element to prevent bubbling
                e.preventDefault();

                //To hide all other menus which are open now
                $(this).parent("li").siblings().removeClass("bgChange");
                $(this).parent("li").siblings().find('ul').removeClass('childpos');
                $(this).parent("li").siblings().find('ul').css({
                    left: (-ww + 'px'),
                    display: 'none'
                });
                $(this).parent("li").toggleClass("bgChange");

                //To show the animation
                var subMenuUL = $(this).parent("li").find('ul')
                subMenuUL.css({
                    left: (-ww + 'px'),
                    display: 'none'
                });
                subMenuUL.toggleClass('childpos');

                $(this).parent("li").find('ul.childpos').show().animate({
                    left: '0px'
                }, 300);
            });
            $('#list2 > li').appendTo('.nav');
            //CR:82183 - F0188 - Responsive and signout
            var login = $('#login>a:first').clone();
            if (login.text().toString().toLowerCase() == "sign   out") {
                login.text(login.text().toLowerCase());
                login.css('text-transform', 'capitalize');
                $('#liLogin').show().html('').append(login);
            }

        } else if (ww >= 769 && ww <= 981) {

            $('li.bgChange ul.childpos').css('left', '')
					                    .removeClass('childpos');
            $('li.bgChange').removeClass('bgChange');

            $(".toggleMenu").css("display", "none");
            $(".tagg").css("display", "block");
            $(".nav li").unbind('mouseenter mouseleave').bind('mouseenter mouseleave', function () {
                // must be attached to li so that mouseleave is not triggered when hover over submenu
                $(this).toggleClass('hover');
            });
            $(".nav").css("display", "block");
            $('.nav > li').each(function (i) {
                if (i >= 4) {
                    $(this).addClass('splitcol_right');
                }
            });
            $('.nav > li.twoMenu a.parent').unbind('click');
            $('.nav > li.splitcol_right').appendTo('#list2');
            if (!$(".tagg").hasClass("active")) {
                $("#list2").hide();
            } else {
                $("#list2").show();
            }
            $("#list2 li").unbind('mouseenter mouseleave');
            $("#list2 li a.parent").unbind('click').bind('click', function (e) {
                // must be attached to anchor element to prevent bubbling
                e.preventDefault();
                //To hide all other menus which are open now.
                $(this).parent("li").siblings().removeClass("hover");
                $(this).parent("li").siblings().find('ul').removeClass('childpos');
                $(this).parent("li").siblings().find('ul').css({
                    left: (-ww + 'px'),
                    display: 'none'
                });
                $(this).parent("li").toggleClass("hover");

                //To show the animation.
                var subMenuUL = $(this).parent("li").find('ul')
                subMenuUL.css({
                    left: (-ww + 'px'),
                    display: 'none'
                });
                subMenuUL.toggleClass('childpos');
                $(this).parent("li").find('ul.childpos:not(li.twoMenu ul)').show().animate({
                    left: '0px'
                }, 300);
            });
            //CR:82183 - F0188 - Responsive and signout
            var login = $('#login>a:first');
            if (login.text().toString().toLowerCase() == "sign   out") {
                $('#liLogin>a').remove();
            }
            $('#liLogin').hide();
        } else if (ww > 980) {
            $(".toggleMenu").css("display", "none");
            $(".nav").show();
            $(".nav li").removeClass("hover");
            $(".nav li a").unbind('click');
            $(".nav li").unbind('mouseenter mouseleave').bind('mouseenter mouseleave', function () {
                // must be attached to li so that mouseleave is not triggered when hover over submenu
                $(this).toggleClass('hover');
            });
            $('#list2 > li').appendTo('.nav');
            //CR:82183 - F0188 - Responsive and signout
            var login = $('#login>a:first');
            if (login.text().toString().toLowerCase() == "sign   out") {
                $('#liLogin>a').remove();
            }
            $('#liLogin').hide();
        }
    }
    $(".nav li a").each(function () {
        if ($(this).next().length > 0) {
            $(this).addClass("parent");
        };
    })

    $(".toggleMenu").click(function (e) {
        if ($(e.target).hasClass("toggler") && e.target.tagName.toLowerCase() == "span") {
            e.preventDefault();
            $(this).toggleClass("active");
            $(".nav").toggle();
        }
    });
    $(".tagg").click(function (e) {
        e.preventDefault();
        $(this).toggleClass("active");
        $("#list2").toggle();
    });

    adjustMenu();

    $(window).bind('resize orientationchange', function () {
        ww = $(document.body).width();
        //ww = document.body.clientWidth;
        adjustMenu();

    });
    $(window).bind('scroll', function () {
        if ($('#addWorkoutSession').css('display') == 'block'
                    && $('#addWorkoutSession').css('position') == 'fixed'
                    && $("#" + $('#dateInputText').data('datepickerId')).css('display') == 'block'
                    && $('.closeButton', $('#addWorkoutSession')).css('display') != 'none') {
            $("#" + $('#dateInputText').data('datepickerId'))
                        .css('top'
                            , ($(document).scrollTop() + $('#dateInputText').position().top + $('#dateInputText').height() + 56) + 'px');
        }
    });
    $(window).bind('resize', function () {
        if ($('#addWorkoutSession').css('display') == 'block'
            && $("#" + $('#dateInputText').data('datepickerId')).css('display') == 'block') {
            $("#" + $('#dateInputText').data('datepickerId'))
                .css('display', 'none');
        }
        var popupContainer = $('.popupContainer');
        if (popupContainer.parent().css('display') == 'block') {
            if ($('.closeButton', popupContainer).css('display') == 'none') {
                $(window).scrollTop(0);
                $('div.container').css('display', 'none');
                $('.lightbox.level2').css('height', '100%');
            }
            else {
                $('div.container').css('display', '');
                $('.lightbox.level2').css('height', '');
            }
        }
    });
});
