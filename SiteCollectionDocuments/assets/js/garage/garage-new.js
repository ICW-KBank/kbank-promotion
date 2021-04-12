// API for Adobe Configurations //

// Sample data
/*
var adbConfig = {
    hero_banner: {
        imgD:["../../../../../SiteCollectionDocuments/personal/loan/personal-loan/k-personal/img/hero/hero-01.jpg"],
        imgM:["../../../../../SiteCollectionDocuments/personal/loan/personal-loan/k-personal/img/hero/hero-01-m.jpg"]
    },
    widget: {
        order: [3,2,4,1,5]
    }
};
*/

/* Code Responsive on Callback Function
try{
    if(CONFIG_ADB_TARGET == undefined) throw null;
    if(CONFIG_ADB_TARGET == false) throw false;
}catch(err){
    console.log("Run default.... ");
    $(function(){
        imgChangeInit();
        callWidgetRender();
    })
}
function adobeRenderPage(){
    // adbConfig Callback
    console.log(">>>>>> Call Adobe Rendering Page....");
    var d = window,
        j = document;
    if(typeof d.adbConfig == "object"){
        
        console.log(">>> adbConfig founded.");
        // Banner
        if(d.adbConfig.hero_banner != undefined && d.adbConfig.hero_banner.imgD.length){
            var imgx = j.getElementById("highlight").querySelectorAll("img.img-change");
            d.adbConfig.hero_banner.imgD.forEach(function(s,i){
                imgx[i].dataset.imgSrc = s;
                imgx[i].dataset.imgSrcset = d.adbConfig.hero_banner.imgM[i];
            })
        }
        // Widgets
        if(d.adbConfig.widget != undefined && d.adbConfig.widget.order.length){
            var _loc = j.getElementById("carousel").querySelector(".intro-card-container"),
                _elm = _loc.querySelectorAll(".item");
            d.adbConfig.widget.order.forEach(function(s){
                _loc.append(_elm[s-1]);
            })
        }
        //
    }else{
        // Initial Adobe Config
        console.log(">>> adbConfig is not set.")
        d.adbConfig = {
            hero_banner:{
                imgD:[],
                imgM:[]
            },
            widget:{
                order:[]
            }
        }
    }
    
    //
    $(function(){
        imgChangeInit();
        callWidgetRender();
    })
}
*/


// Code Responsive on DomReady Function
(function (d, j) {
    // Dom Ready 
    $(function () {
        console.log(">>> Garage Domready.");
        //

        // Check adbConfig
        if (typeof d.adbConfig == "object") {
            console.log(">>> adbConfig founded.");
            // Banner
            if (d.adbConfig.hero_banner != undefined && d.adbConfig.hero_banner.imgD.length) {
                var imgx = j.getElementById("highlight").querySelectorAll("img.img-change");
                d.adbConfig.hero_banner.imgD.forEach(function (s, i) {
                    imgx[i].dataset.imgSrc = s;
                    imgx[i].dataset.imgSrcset = d.adbConfig.hero_banner.imgM[i];
                })
            }
            // Widgets
            if (d.adbConfig.widget != undefined && d.adbConfig.widget.order.length) {
                var _loc = j.getElementById("carousel").querySelector(".intro-card-container"),
                    _elm = _loc.querySelectorAll(".item");
                d.adbConfig.widget.order.forEach(function (s) {
                    _loc.append(_elm[s - 1]);
                })
            }
        } else {
            // Initial Adobe Config
            console.log(">>> adbConfig is not set.")
            d.adbConfig = {
                hero_banner: {
                    imgD: [],
                    imgM: []
                },
                widget: {
                    order: []
                }
            }
        }

        // Default Render
        $(function () {
            imgChangeInit();
            callWidgetRender();
        })

    })
    // ReadySate Complete //

    j.onreadystatechange = function () {
        console.log(">>> Garage");
        if (j.readyState == "Complete") {
            //

        }
    }
    
    //
    // Detect Mobile
    function isMobileDevice() {
        return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
    };
    
    if(!isMobileDevice()){
        // $.each(j.querySelectorAll('a[href^="tel:"]'), function(elm,i){ elm.removeAttribute("href")});
        $("a[href^='tel:']").removeAttr("href");
    }
})(this, document)

console.log("Load -> garage.js")
/* Form */
$(function () {
    var formElement = $('input, textarea, select');
    formElement.each(function () {
        if (!$(this).val()) {
            $(this).closest('.input').removeClass('filled');
        } else {
            $(this).closest('.input').addClass('filled');
        }
    });
    formElement.focusin(function () {
        $(this).closest('.input').addClass('filled');
    });
    formElement.focusout(function () {
        if (!$(this).val()) {
            $(this).closest('.input').removeClass('filled');
        }
    });

    // Select
    $(".select").each(function () {
        var selectParent = $(this),
            select = $(this).find(".select2"),
            selectFilter = $(this).find(".select2-filter");

        var query = {};

        function markMatch(text, term) {
            var match = text.toUpperCase().indexOf(term.toUpperCase());

            var $result = $('<span></span>');

            if (match < 0) {
                return $result.text(text);
            }

            $result.text(text.substring(0, match));

            var $match = $('<span class="select2-rendered__match"></span>');
            $match.text(text.substring(match, match + term.length));

            $result.append($match);

            $result.append(text.substring(match + term.length));

            return $result;
        }

        select.select2({
            width: '100%',
            minimumResultsForSearch: -1,
            dropdownParent: selectParent,
            templateResult: function (item) {
                if (item.loading) {
                    return item.text;
                }

                var term = query.term || '';
                var $result = markMatch(item.text, term);

                return $result;
            },
            language: {
                searching: function (params) {
                    query = params;
                    return 'Searching...';
                }
            }
        });

        selectFilter.select2({
            width: '100%',
            allowClear: true,
            dropdownParent: selectParent,
            templateResult: function (item) {
                if (item.loading) {
                    return item.text;
                }

                var term = query.term || '';
                var $result = markMatch(item.text, term);

                return $result;
            },
            language: {
                searching: function (params) {
                    query = params;
                    return 'Searching...';
                }
            }
        }).on("select2:unselecting", function (e) {
            $(this).data('state', 'unselected');
        }).on("select2:open", function (e) {
            if ($(this).data('state') === 'unselected') {
                $(this).removeData('state');
                var self = $(this);
                self.select2('close');
            }
        });

        select.parent(".select").addClass("select2-parent");
        selectFilter.parent(".select").addClass("select2-parent");

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            select.select2("destroy");
            select.parent(".select").removeClass("select2-parent");
        }
    });

    // Choice
    $('.choice-other').each(function () {
        var label = $(this).find('.choice-label input[type="checkbox"], .choice-label input[type="radio"]'),
            input = $(this).find('.input > input');

        label.click(function () {
            if ($(this).prop("checked") == true) {
                input.attr("disabled", false).focus();
                input.parent(".input").removeClass("disabled");
            } else {
                input.attr("disabled", true);
                input.parent(".input").addClass("disabled");
            }
        });
    });
});

/* Form Step */
/* https://codepen.io/atakan/pen/gqbIz */
$(function () {
    if ($("#msform").length) {
        //jQuery time
        var current_fs, next_fs, previous_fs; //fieldsets
        var left, opacity, scale; //fieldset properties which we will animate
        var animating; //flag to prevent quick multi-click glitches

        $("#msform .next").click(function () {
            if (animating) return false;
            animating = true;

            current_fs = $(this).parent();
            next_fs = $(this).parent().next();

            //activate next step on progressbar using the index of next_fs
            $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

            //show the next fieldset
            next_fs.show();
            //hide the current fieldset with style
            current_fs.animate({
                opacity: 0
            }, {
                step: function (now, mx) {
                    //as the opacity of current_fs reduces to 0 - stored in "now"
                    //1. scale current_fs down to 80%
                    scale = 1 - (1 - now) * 0.2;
                    //2. bring next_fs from the right(25%)
                    left = (now * 25) + "%";
                    //3. increase opacity of next_fs to 1 as it moves in
                    opacity = 1 - now;
                    current_fs.css({
                        'position': 'absolute',
                        'left': '-25%',
                        'opacity': '0',
                    });
                    next_fs.css({
                        'left': left,
                        'opacity': opacity,
                    });
                },
                duration: 300,
                complete: function () {
                    current_fs.hide();
                    next_fs.css({
                        'position': 'relative'
                    });
                    animating = false;
                },
                //this comes from the custom easing plugin
                easing: 'easeOutQuad'
            });

            //**custom
            /*
            var property_check_offset = $('#apply').offset().top - $('.header-device-fixed').height();
            $('html, body').animate({
                scrollTop: property_check_offset
            }, 700, 'easeOutQuad');
            */
        });

        $("#msform .previous").click(function () {
            if (animating) return false;
            animating = true;

            current_fs = $(this).parent();
            previous_fs = $(this).parent().prev();

            //de-activate current step on progressbar
            $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

            //show the previous fieldset
            previous_fs.show();
            //hide the current fieldset with style
            current_fs.animate({
                opacity: 0
            }, {
                step: function (now, mx) {
                    //as the opacity of current_fs reduces to 0 - stored in "now"
                    //1. scale previous_fs from 80% to 100%
                    scale = 0.8 + (1 - now) * 0.2;
                    //2. take current_fs to the right(25%) - from 0%
                    left = ((1 - now) * 25) + "%";
                    //3. increase opacity of previous_fs to 1 as it moves in
                    opacity = 1 - now;
                    current_fs.css({
                        'left': left,
                        'position': 'absolute',
                    });
                    previous_fs.css({
                        'opacity': '1',
                        'left': '0%',
                        '-webkit-transition': 'left 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95)',
                        '-o-transition': 'left 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95)',
                        'transition': 'left 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95)',
                    });
                },
                duration: 300,
                complete: function () {
                    current_fs.hide();
                    previous_fs.css({
                        'position': 'relative'
                    });
                    animating = false;
                },
                //this comes from the custom easing plugin
                easing: 'easeOutQuad'
            });

            //**custom
            /*
            var property_check_offset = $('#apply').offset().top - $('.header-device-fixed').height();
            $('html, body').animate({
                scrollTop: property_check_offset
            }, 700, 'easeOutQuad');
            */
        });

        /*
        $(".submit").click(function(){
            return false;
        });
        */
    }
});

/* Apply Online */
$(function () {
    $('.sc-apply-online.m').addClass('show');
    $(window).scroll(function () {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || $(document).width() < 992) {
            var startAction = ($(document).height() * 5) / 100;
            var sc_scrollTop = $(document).scrollTop();
            var calculators_h = $('#calculators').height();
            var calculators_s = $('#calculators').offset().top;
            var calculators_e = $('#calculators').offset().top + $('#calculators').height();
            var faqs_h = $('#faqs').height();
            var faqs_s = $('#faqs').offset().top;

            var apply_h = $("#apply").height();
            var apply_s = $("#apply").offset().top;

            var w_height = $(window).height();

            // 160 below is negative offset of calculators height
            var isBetweenCalcAndApply = (sc_scrollTop > (calculators_s + (calculators_h - 160)) && (sc_scrollTop + w_height) < apply_s);
            /********** Register ***********/
            /*
            if((sc_scrollTop > startAction && ((sc_scrollTop < (calculators_s-(calculators_h/4)) || sc_scrollTop > (faqs_s-(faqs_h/2)))))){
                $('.sc-apply-online.m').addClass('show');
            }
            else{
                $('.sc-apply-online.m').removeClass('show');
            }
            */

            if ((((sc_scrollTop < (calculators_s - (calculators_h / 4)) || sc_scrollTop > (faqs_s - (faqs_h / 2)) || isBetweenCalcAndApply)))) {
                $('.sc-apply-online.m').addClass('show');
            } else {
                $('.sc-apply-online.m').removeClass('show');
            }

            //********** Calculate ***********/
            /*
            if(sc_scrollTop > startAction && (sc_scrollTop >= calculators_s && sc_scrollTop <= calculators_e)){
                $('#calculators').find('.bottom').addClass('move-bottom');
            }
            else{
                $('#calculators').find('.bottom').removeClass('move-bottom');
            }

            Show register button when scroll end
            if($(window).scrollTop() + $(window).height() >=  $(document).height() - $('.sc-apply-online-m').height()){
            }

            var _register_h =   $('.sc-apply-online-m').height();
            if($(window).scrollTop() + $(window).height() == $(document).height()) {
                $('body').css({'padding-bottom':_register_h});
                $('.sc-apply-online-m').addClass('show');
            }else{
                if($(window).scrollTop() + $(window).height() < $(document).height()-_register_h){
                    $('.sc-apply-online-m').removeClass('show');
                    $('body').css({'padding-bottom':0});
                }
            }
            */

        } else {
            if ($('.sc-apply-online.d').length) {
                var sc_scrollTop = $(document).scrollTop();
                var quick_cash_loans_s = $('#carousel').offset().top;
                var quick_cash_loans_e = $('#carousel').offset().top + $('#carousel').height();
                var application_details_h = $('#application-details').height();
                var application_details_s = $('#application-details').offset().top;
                var application_details_e = $('#application-details').offset().top + $('#application-details').height();
                var faqs_s = $('#faqs').offset().top;
                var faqs_e = $('#faqs').offset().top + $('#faqs').height();

                var calculators_h = $('#calculators').height();
                var calculators_s = $('#calculators').offset().top;
                var calculators_e = $('#calculators').offset().top + $('#calculators').height();

                var apply_h = $("#apply").height();
                var apply_s = $("#apply").offset().top;

                var w_height = $(window).height();

                // 160 below is negative offset of calculators height
                var isBetweenCalcAndApply = (sc_scrollTop > (calculators_s + (calculators_h - 200)) && (sc_scrollTop + w_height) < apply_s);

                if ((sc_scrollTop >= quick_cash_loans_s && sc_scrollTop <= quick_cash_loans_e) || (sc_scrollTop >= application_details_s && sc_scrollTop <= (application_details_e - (application_details_h / 4))) || (sc_scrollTop >= faqs_s && sc_scrollTop <= faqs_e) || isBetweenCalcAndApply) {
                    $('.sc-apply-online.d').addClass("full");
                } else {
                    $('.sc-apply-online.d').removeClass("full");
                }
            }
        }
    });
});

/*========== Revise : START ==========*/
$(function () {
    setTimeout(function () {
        $('#page').css('opacity', '1');
    }, 90);
});

$(function () {
    var version = detectIE();
    if (version === false) {
        $('html').removeClass("ie-edge");
        $('html').removeClass("edge");
        $('html').removeClass("ie");
    } else if (version >= 12) {
        $('html').addClass("ie-edge");
        $('html').addClass("edge");
    } else {
        $('html').addClass("ie-edge");
        $('html').addClass("ie");
    }

    function detectIE() {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }
        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }
        var edge = ua.indexOf('Edge/');
        if (edge > 0) {
            return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }
        return false;
    }

    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('safari') != -1) {
        if (ua.indexOf('chrome') > -1) {
            $('html').addClass('chrome');
        } else {
            $('html').addClass('safari');
        }
    }
});

function viewportHeight() {
    if (!($("html").hasClass("ie"))) {
        var vh = window.innerHeight * (0.01);
        document.documentElement.style.setProperty('--vh', vh + 'px');
    }
}


//####
//function imgChange(Obj) {
//    img = $(Obj);
//    imgSrc = $(Obj).data('img-src');
//    imgSrcset = typeof $(Obj).data('img-srcset') != 'undefined' ? $(Obj).data('img-srcset') : '';
//
//    var width = $(document).width();
//    if (width < 992 && imgSrcset != '') {
//        img.attr("src", imgSrcset);
//    } else {
//        img.attr("src", imgSrc);
//    }
//}

var SCREEN_MODE = "";

function imgChange(obj) {
    console.log("--- img chage ---");
    if(obj.dataset.imgSrcset == undefined){
        return false;
    }
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
        _imgSrc = obj.dataset.imgSrc,
        _imgSrcSet = (obj.dataset.imgSrcset != undefined) ? obj.dataset.imgSrcset : "";
    
    obj.src = (w < 768 && _imgSrcSet != "") ? _imgSrcSet : _imgSrc;
}

function imgChangeInit() {
    console.log("call Init--");
    var _wd = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
        _checkDeviceMode = (_wd < 768) ? "desktop" : "mobile";
    if(SCREEN_MODE != _checkDeviceMode){
        $('.img-change').each(function () {
            //var Obj = $(this);
            imgChange(this);
        });
        SCREEN_MODE = _checkDeviceMode;
    }
    
}
$(function () {
    viewportHeight();

    $(window).resize(function () {
        viewportHeight();
        imgChangeInit();
    });
});

/* Location Hash */
/*
$(function () {
    setTimeout(function () {
        var nav = $('.header-device-fixed').outerHeight(),
            h = nav - 2;

        if (window.location.hash) {
            $('html, body').delay(100).animate({
                scrollTop: $(window.location.hash).offset().top - h
            }, 700, 'easeOutQuad');
        }
    }, 90);
});
*/

// Link Scroll
$(function () {
    $('.link-scroll').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var nav = $('.header-device-fixed').outerHeight(),
                h = nav - 2;
            var target = $(this.hash);
            var _headH = (window.outerWidth > 820) ? 90 : 54;
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    $('html, body').animate({
                        scrollTop: target.offset().top - _headH
                    }, 0, 'easeOutQuad');
                    return false;
                } else {
                    $('html, body').animate({
                        scrollTop: target.offset().top - _headH
                    }, 0, 'easeOutQuad');
                    return false;
                }
            }
        }
    });
});

// Tab
$(function () {
    $('.tab-container').each(function () {

        var tab = $(this).find('.tab'),
            tabContent = $(this).find('.tab-content');

        var selector = tab.find(".selector");

        var item = tab.find('a'),
            itemTotal = tab.find('a').length;

        function tabSelector() {
            var activeItem = tab.find('.active'),
                activeWidth = activeItem.innerWidth();

            selector.css({
                "left": activeItem.position.left + "px",
                "width": activeWidth + "px"
            });
        }

        tabSelector();

        tab.on("click", "a", function (e) {
            e.preventDefault();
            item.removeClass('active');
            $(this).addClass('active');

            var activeWidth = $(this).innerWidth(),
                itemPos = $(this).position();

            selector.css({
                "left": itemPos.left + "px",
                "width": activeWidth + "px"
            });

            var tabAttr = $(this).attr("href");

            tabContent.removeClass('active');
            $(tabAttr).addClass('active');
        });

        $(window).resize(function () {
            tabSelector();

            setTimeout(function () {
                var activeWidth = tab.find('.active').innerWidth(),
                    itemPos = tab.find('.active').position();
                /*
                ### Code Bug
                */
//                selector.css({
//                    "left": itemPos.left + "px",
//                    "width": activeWidth + "px"
//                });
            }, 100);
        });

    });
});

// Highlight
//$(function () {
//    var ele = $('.highlight-container');
//    if (ele.length) {
//        ele.each(function () {
//            ele.slick({
//                arrows: false,
//                dots: true,
//                infinite: true,
//                speed: 900,
//                touchThreshold: 300
//            });
//        });
//    }
//});

// Intro Card
function callWidgetRender() {
    console.log(">> render widget...")
    $(function () {
        var ele = $('.intro-card-container');
        if (ele.length) {
            ele.on('init', function (event, slick) {
                ele.each(function () {
//                    $(this).find('.caption').matchHeight({
//                        byRow: true
//                    });
                });
            });

            ele.slick({
                centerMode: true,
                centerPadding: '0px',
                slidesToShow: 3,
                dots: true,
                arrows: true,
                infinite: true,
                speed: 400,
                touchThreshold: 300,
                autoplay: true,
                autoplaySpeed: 5000,
                responsive: [
                    {
                        breakpoint: 992,
                        settings: {
                            centerPadding: '180px',
                            slidesToShow: 1,
                        }
                },
                    {
                        breakpoint: 768,
                        settings: {
                            centerPadding: '120px',
                            slidesToShow: 1,
                        }
                },
                    {
                        breakpoint: 641,
                        settings: {
                            centerPadding: '60px',
                            slidesToShow: 1,
                        }
                },
                    {
                        breakpoint: 376,
                        settings: {
                            centerPadding: '30px',
                            slidesToShow: 1,
                        }
                }
            ]
            });

            function elePc() {

                if ($(document).width() > 991) {
                    
                }

            }

            function eleDevice() {

                if ($(document).width() < 992) {
                    
                }

            }

            elePc();
            eleDevice();
            $(window).resize(function () {
                elePc();
                eleDevice();
            });
        }
    });
}

// Popup
$(function () {
    if ($('.open-popup-image').length) {
        $('.garage-container').magnificPopup({
            delegate: 'a.open-popup-image',
            type: 'image',
            mainClass: 'popup-image-style',
        });
    }
    if ($('.open-popup-lightbox').length) {
        $('.open-popup-lightbox').magnificPopup({
            type: 'inline',
            preloader: false,
            closeOnBgClick: false,
            mainClass: 'popup-lightbox-style',
            showCloseBtn: false,
            removalDelay: 300,
        });
    }
    // Close Popup
    $(document).on('click', '.modal-dismiss', function (e) {
        e.preventDefault();
        $.magnificPopup.close();
    });
});

// Details
$(function () {
    $('<div class="tab-headline qualifications"><h2 class="heading">คุณสมบัติ</h2></div>').prependTo('.tab-container').hide();
    $('<div class="tab-headline documents"><h2 class="heading">เอกสารประกอบการสมัคร</h2></div>').prependTo('.tab-container').hide();
    $('.details-clones-control #qualifications, .open-qualifications').click(function () {
        $('html').addClass('details-clones-enabled');
        $('.details-clones').addClass('open');
        $('.details-container.documents').hide();
        $('.tab-headline.documents').hide();
        $('.tab-headline.qualifications').show();

        // hide header menu
        $('.header-top').fadeOut();

        // show apply button
        // waiting for translation complete (500ms)
        setTimeout(function() {
            $(".apply-online-mobile").addClass("show");
        }, 500);
    });
    $('.details-clones-control #documents, .open-documents').click(function () {
        $('html').addClass('details-clones-enabled');
        $('.details-clones').addClass('open');
        $('.details-container.qualifications').hide();
        $('.tab-headline.qualifications').hide();
        $('.tab-headline.documents').show();

        // hide header menu
        $('.header-top').fadeOut();

        // show apply button
        // waiting for translation complete (500ms)
        setTimeout(function() {
            $(".apply-online-mobile").addClass("show");
        }, 500);
    });
    $('.details-clones-close').click(function () {
        $('html').removeClass('details-clones-enabled');
        $('.details-clones').removeClass('open');
        $('.details-container').show();
        $('.tab-headline').hide();

        // show header menu
        $('.header-top').fadeIn();

        // hide apply button and trigger scroll event
        $(".apply-online-mobile").removeClass("show");
        $(window).trigger("scroll");
    });
});


$(function () {

    /* Responsive table */
    function rewidth() {
        $(".table-responsive, .table-responsive > .table").ready(function() {
            let width = $(".table-responsive").width() * $(".table-responsive").width() / $(".table-responsive > .table").width();
            $(".responsive-scroll > .scroll").css("width", width + "px");
        });
    }

    // on initial
    rewidth();

    // on windows resizing
    $(window).on("resize", rewidth);

    // on table scroll
    $(".table-responsive").on("scroll", function() {
        rewidth();
        $(".responsive-scroll > .scroll").css("margin-left", ($(".table-responsive").scrollLeft() / $(".table-responsive > .table").width() * $(".table-responsive").width()) + "px");
    });

    /* Rate */
    if ($("#rate-table").length) {
        $("#general-interest-rate").click(function () {
            $('#rate-table').slideToggle();
            $(this).parent().toggleClass("change");
            $(this).toggleClass("show");

            rewidth();

            var nav = $('.header-top').outerHeight(),
                h = nav - 2;
            $('html, body').animate({
                scrollTop: $('#rate-table-area').offset().top - h
            }, 0, 'easeOutQuad', function() {
                $(document).trigger("scroll");
            });
        });

        $('.open-rate-table').click(function (e) {
            e.preventDefault();
            if (!$('#general-interest-rate').parent().hasClass('change')) {
                $('#general-interest-rate').click();
            }
            $(window).scrollTop($('#rate-table').offset().top - $('.header-top').height());
            rewidth();
        });
    }
    // Details
    $("#cash-loan-detail-toggle").click(function () {
        var nav = $('.header-top').outerHeight(),
            h = nav - 2;
        $('html, body').animate({
            scrollTop: $('#cash-loan-detial-area').offset().top - h
        }, 0, 'easeOutQuad', function() {
            $(document).trigger("scroll");
        });
    });
});

/* Back to top */
$(function () {
    //    if ($('.back-to-top').length) {
    //        var scrollTrigger = 1000,
    //            backToTop = function() {
    //                var scrollTop = $(window).scrollTop();
    //                if (scrollTop > scrollTrigger) {
    //                    $('.back-to-top').addClass('show');
    //                } else {
    //                    $('.back-to-top').removeClass('show');
    //                }
    //            };
    //        backToTop();
    //        $(window).on('scroll', function() {
    //            backToTop();
    //        });
    //        $('.back-to-top').on('click', function(e) {
    //            e.preventDefault();
    //            $('html,body').animate({
    //                scrollTop: 0
    //            }, 700);
    //        });
    //    }

//    $(window).scroll(function () {
//        if ($(this).scrollTop()) {
//            $(".back-to-top").fadeIn();
//        } else {
//            $(".back-to-top").fadeOut();
//        }
//        if ($(window).scrollTop() + $(window).height() < $(document).height() - $("#service").height()) {
//            $('.back-to-top').removeClass('show');
//        }
//        if ($(window).scrollTop() + $(window).height() > $(document).height() - $("#service").height()) {
//            $('.back-to-top').addClass('show');
//        }
//    });
    $(".back-to-top").click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 700);
    });
});

/* Scrollbar */
// (function ($) {
//     $(window).on("load", function () {
//         $(".table-wrapper").mCustomScrollbar({
//             axis: "x",
//             autoExpandScrollbar: true,
//             advanced: {
//                 autoExpandHorizontalScroll: true,
//                 autoScrollOnFocus: true,
//                 normalizeDelta: true,
//                 deltaFactor: 5,
//                 preventDefault: false
//             },
//             mouseWheelPixels: 5,
//             timeout: 0,
//             scrollInertia: 200,
//         });
//     });
// })(jQuery);

/* Phone number in Desktop */
var _isTouch = 'ontouchstart' in document.documentElement;
$(function () {
    var _ua = (navigator.userAgent || navigator.vendor || window.opera),
        _device = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

    $("body").addClass((_isTouch) ? "isTouch" : "no-touch");
    if (_device.test(_ua)) {
        $("body").addClass("device-mobile");
    } else {
        $('a[href^="tel:"]').removeAttr("href");
    }
});
/*========== Revise : END ==========*/

/* Click Open Tab */
$(function(){
    $("a.fx-clickOpenTab").click(function(e){
        e.preventDefault();
        if($(this.dataset.tabTrigger).length){
            var _obj = $(this.dataset.tabTrigger);
            if(!_obj.hasClass("show")) {
                _obj.trigger("click");
            }
            $(_obj.closest(".sc-container").find(".sc-content").find(".tab .control>a")[this.dataset.tabSelect]).delay(100).trigger("click");
        }
    })
})

/* Scroll animation */ 
$(function() {
    $(".scroll").on("click", function() {
        if ($(this).data("href")) {
            $(document).scrollTop($($(this).data("href")).offset().top - $(".header-top").height() - $(".sc-apply-online").height());
        }
    });
});

/* Apply onliine mobile floating button on click */
$(function() {
    $(".floating-apply-online-mobile").on("click", function() {
        $(".details-clones-close").trigger("click");
    });
});

