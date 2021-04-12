/* --------------------------------------------------- */
/* ActionScript */
$(function(){
    var _page = $(document.getElementById('page')),
        _path = $('link[rel="shortcut icon"]').attr('href').replace(/SiteCollectionDocuments\/assets\/img\/favicon\.ico/,""),
        _loc = location.href,
        _lang = /kbank-retrainer\/([^\/]+)\//i.exec(_loc)[1];
    
    var _name = /\/([\w-_]+)\.html$/.exec(_loc),
        _mode = "",
        _prefix = _path+_lang+'/';
    
    if(_loc.search('/kasikornfactory-equipment/')+1){
        _lang = /kasikornfactory\-equipment\/([^\/]+)\//i.exec(_loc)[1];
        _prefix = _path.replace(/^(\.\.\/){2}/,"");
    }else if(_loc.search('/kasikornresearch/')+1){
        _lang = /kasikornresearch\/([^\/]+)\//i.exec(_loc)[1];
        _prefix = _path.replace(/^(\.\.\/){2}/,"");
    }else if(_loc.search('/international-business/wbs/')+1){
        _mode = "international-business/wbs/";
        _prefix += _mode; 
    }else if(_loc.search('/business/sme/')+1){
        _mode = "business/sme/";
        _prefix += _mode; 
    }else if(_loc.search('/international-business/')+1){
        _mode = "international-business/";
        _prefix += _mode; 
    }else if(_loc.search('/business/')+1){
        _mode = "business/";
        _prefix += _mode; 
    }else if(_loc.search('/ir/')+1){
        _mode = "ir/";
        _prefix += _mode;
    }else if(_loc.search('/k-expert/')+1){
        _mode = "k-expert/";
        _prefix += _mode;
    }else if(_loc.search('/k-home-smiles-club/')+1){
        _mode = "k-home-smiles-club/";
        _prefix += _mode;
    }
    
    _name = (_name)? _name[1] : "";

    if((_name != "footer") && (_name != "header")){
    }
})
/* --------------------------------------------------- */


/* Core Media Application */
window.matchMedia || (window.matchMedia = function () {
    "use strict";

    var styleMedia = (window.styleMedia || window.media);
    if (!styleMedia) {
        var style = document.createElement('style'),
            script = document.getElementsByTagName('script')[0],
            info = null;

        style.type = 'text/css';
        style.id = 'matchmediajs-test';

        script.parentNode.insertBefore(style, script);
        info = ('getComputedStyle' in window) && window.getComputedStyle(style, null) || style.currentStyle;

        styleMedia = {
            matchMedium: function (media) {
                var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';

                if (style.styleSheet) {
                    style.styleSheet.cssText = text;
                } else {
                    style.textContent = text;
                }

                return info.width === '1px';
            }
        };
    }

    return function (media) {
        return {
            matches: styleMedia.matchMedium(media || 'all'),
            media: media || 'all'
        };
    };
}());

(function(){
    if (window.matchMedia && window.matchMedia('all').addListener) {
        return false;
    }

    var localMatchMedia = window.matchMedia,
        hasMediaQueries = localMatchMedia('only all').matches,
        isListening     = false,
        timeoutID       = 0,
        queries         = [],  
        handleChange    = function(evt) {
            clearTimeout(timeoutID);

            timeoutID = setTimeout(function() {
                for (var i = 0, il = queries.length; i < il; i++) {
                    var mql         = queries[i].mql,
                        listeners   = queries[i].listeners || [],
                        matches     = localMatchMedia(mql.media).matches;

                    if (matches !== mql.matches) {
                        mql.matches = matches;

                        for (var j = 0, jl = listeners.length; j < jl; j++) {
                            listeners[j].call(window, mql);
                        }
                    }
                }
            }, 30);
        };

    window.matchMedia = function(media) {
        var mql         = localMatchMedia(media),
            listeners   = [],
            index       = 0;

        mql.addListener = function(listener) {
            if (!hasMediaQueries) return;

            if (!isListening) {
                isListening = true;
                window.addEventListener('resize', handleChange, true);
            }
            if (index === 0) {
                index = queries.push({
                    mql         : mql,
                    listeners   : listeners
                });
            }

            listeners.push(listener);
        };
        mql.removeListener = function(listener) {
            for (var i = 0, il = listeners.length; i < il; i++){
                if (listeners[i] === listener){
                    listeners.splice(i, 1);
                }
            }
        };
        return mql;
    };
}());

$(function(){
    var a = navigator.userAgent||navigator.vendor||window.opera;
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) {
        document.body.className += "device-mobile";
    }else{
        $("a[href^=tel]").click(function(e){e.preventDefault();});
    }
});
/* Core Media Application - End */


/* Fn 01 */
$(function() {
    $( ".header" ).each(function() {
                        
        $('.submenu-bottom').appendTo($('.submenu'));
        $('.submenu').parent().addClass('has-submenu');

        var hover = false;
        var submenu;
        $('.has-submenu').mouseover(function() {
            submenu = $(this);
            hover = true;
            setTimeout(function() {
                if(hover) { submenu.addClass('mouseenter'); } 
            }, 300);
        }).mouseleave(function() {
            hover = false;
            submenu.removeClass('mouseenter');
        });

        $('nav#menu').each(function() {
            var _API = $('nav#menu').mmenu({
                extensions	: [ "effect-listitems-fade", 'effect-menu-slide', "multiline" ],
                navbar 		: { title : "" },
                setSelected : { parent : true }
            }, {
                offCanvas: { pageSelector: "#page" },
                classNames  : { fixedElements: { fixed: "header-fixed" } }
            }).data( 'mmenu' );

            var $burger = $('#hamburger').on( 'click', function(e){
                e.preventDefault();
                if ( $('html').hasClass( 'mm-opened' ) ){
                    _API.close();
                } else {
                    _API.open();
                }
            });

            _API.bind( 'closed', function() {
                $burger.removeClass( 'is-active' );
            });
            _API.bind( 'opened', function() {
                $burger.addClass( 'is-active' );
            });
        });

        $(".kb-language").each(function(){
            var kb_Lang = $(this),
                kb_lang_selected = kb_Lang.find(".lang-selected"),
                kb_lang_box = kb_Lang.find(".lang-box");

            kb_lang_selected.on( 'click', function(){
                kb_lang_box.slideToggle(150);
            });
        });

    });
});


/* Fn 02 */
$(function() {    
    if($("#box-login").length) {
        var _API = $('#box-login').mmenu({
                extensions : [ "pagedim-black" ],
                navbar : { title : "" },
                dropdown: true
            }).data( 'mmenu' );
        
        function handleMQL(mql) {
            if (mql.matches) {
                $('.header-device .tool-login').on( 'click', function(e){
                    e.preventDefault();
                    if ( $('html').hasClass('mm-opened') ) {
                        _API.close();
                    } else {
                        _API.open();
                    }
                });
            } else {
               _API.close();
            }
        }
        
        var mql = window.matchMedia("(max-width: 1024px)");
            mql.addListener(handleMQL);
            handleMQL(mql);
    }
});

/* Fn 04 */
$(function() {
    if ($('.localnav-links').length) {
        $('.localnav-links').perfectScrollbar();
    }
    
    if ($('.ps-active-x').length) {
        $('.ps-active-x.pull-right').wrap('<div class="localnav-links-wrap pull-right"></div>');
        $('.ps-active-x.pull-left').wrap('<div class="localnav-links-wrap pull-left"></div>');
    }
    
    if ($('.sidebar-fixed').length) {
        $('.sidebar-fixed .sidebar-inner').perfectScrollbar();
    }
});


/* Fn 05 */
function onScroll(event){
    var scrollPos = $(document).scrollTop();
    $('a.moveScroll').each(function () {
        var currLink = $(this),
            refElement = $(currLink.attr("href")),
            localNav = $('#localnav-fixed').outerHeight(),
            headerDevice = $('.header-device').outerHeight(),
            h = (localNav + headerDevice)-1;
        if(refElement.length){
            if (refElement.position().top-h <= scrollPos && refElement.position().top-h + refElement.height() > scrollPos) {
                $('a.moveScroll').removeClass("active");
                currLink.addClass("active");
            }
            else{
                currLink.removeClass("active");
            }
        }
    });
}

$(function () {
    $(document).on("scroll", onScroll);
    
    $('a.moveScroll').on('click', function(e) {
        e.preventDefault();
        $(document).off("scroll");
        
        $('.localnav a.moveScroll').each(function () {
            $(this).removeClass('active');
        });
        
        $(this).addClass('active');
        
        var target = $(this.hash),
            localNav = $('#localnav-fixed').outerHeight(),
            headerDevice = $('.header-device').outerHeight(),
            h = (localNav + headerDevice)-1;
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
            $('html,body').animate({
            scrollTop: target.offset().top-h
            }, 800, 'swing', function () {
                $(document).on("scroll", onScroll);
            });
        }

    });
});


/* Fn 07 */
$(function() {
    if($(".carousel-slider").length){
        $(".carousel-slider").each(function() {
            var hlslider = $(this),
                msslider = $(this).find(".master-slider"),
                items = $(this).find(".ms-slide"),
                total = items.length,
                slider = new MasterSlider();

            slider.setup(msslider , {
                loop:true,
                width:1140,
                height:500,
                speed:20,
                view:'fadeBasic',
                preload:0,
                space:0
            });
            if(total > 1) {
                slider.control('arrows');
                slider.control('bullets',{autohide:false, align:"bottom"});
            }
            slider.control('slideinfo',{insertTo:'.ms-inner-controls-cont'});
        });
    }
});


/* Fn 08 */
$(function() {
    if($(".news-slider").length){
        $(".news-slider").each(function() {
            var hlslider = $(this),
                msslider = $(this).find(".master-slider"),
                items = $(this).find(".ms-slide"),
                total = items.length,
                slider = new MasterSlider();

            slider.setup(msslider , {
                width:366,
                height:175,
                view:'fade',
                layout:'fillwidth',
                space:0,
                autoplay:true,
                loop:(total > 2),
                speed:10
            });
            if(total > 1) {
                slider.control('bullets');
            }
            slider.control('slideinfo',{insertTo:".ms-container" , align:'bottom'});
        });
    }
});


/* Fn 09 */
$(function() {
    if($("#card-slider").length){
        $("#card-slider").each(function() {
            var hlslider = $(this),
                msslider = $(this).find(".master-slider"),
                items = $(this).find(".ms-slide"),
                total = items.length,
                slider = new MasterSlider();

            slider.setup(msslider , {
                width:428,
                height:270,
                view:"fade",
                mouse:false,
                loop:(total > 2)
            });
            slider.control('slideinfo',{insertTo:'.card-slider-info'});
            slider.control('thumblist',{autohide:false, insertTo:'.card-slider-thumb'});
        });
    }
});


/* Fn 10 */
$(function() {
    $("#recommend-video").each(function() {
        var hlslider = $(this),
            msslider = $(this).find(".master-slider"),
            items = $(this).find(".ms-slide"),
            total = items.length,
            slider = new MasterSlider();

        slider.setup(msslider , {
            width:1000,
            height:500,
            space:1,
            loop:true,
            preload:0,
            instantStartLayers:true,
            swipe:false,
            mouse:false,
            view:"mask"
        });
    });
});


/* Fn 11 
   http://owlgraphic.com/owlcarousel/
*/
$(function() {
    if($(".thumbnails-slider").length){
        $('.thumbnails-slider').each(function() {
            var owl = $(this).find('.owl-carousel'),
                items = $(this).find('.item'),
                max = items.length;
            owl.owlCarousel({
                items: 4,
                itemsDesktopSmall: [991, 3],
                itemsTablet: [767, 2],
                itemsMobile: [480, 1],
                pagination: (max > 1),
                navigation: true,
                navigationText: false,
                scrollPerPage : true
            });
        });
    }
});


/* Fn 12 */
$(function() {
    if($(".items-slider").length){
        
        function buildSlideOwl() {
            //console.log('buildSlideOwl');
            $('.items-slider').each(function() {
                var owl = $(this).find('.owl-carousel'),
                    items = $(this).find('.item'),
                    max = items.length;
                owl.owlCarousel({
                    items: 1,
                    itemsMobile: [991, 1],
                    pagination: (max > 1)
                });
            });
        }

        function destroySlideOwl() {
            //console.log('destroySlideOwl');
            $('.items-slider').each(function() {
                var owlCarousel = $(this).find('.owl-carousel');
                if(typeof owlCarousel.data('owlCarousel') != 'undefined') {
                    owlCarousel.data('owlCarousel').destroy();
                }
            });
        }

        enquire.register("screen and (max-width: 991px)", {
            match : function() {
                buildSlideOwl();
            },
            unmatch : function() {
                destroySlideOwl();
            }
        }, true);
    
    }
});


/* Fn 13 */
$(function() {
    if($(".solution-slider").length){
        $('.solution-slider').each(function() {     
            var slick = $(this).find('.slick-slider'),
                items = $(this).find('.item'),
                item_wrap = $(this).find('.item-wrap'),
                max = items.length,
                heading = $(this).find('.sc-headline');
            
            heading.prependTo(item_wrap);
            
            slick.slick({
                dots: true,
                arrows: false,
                speed: 500,
                fade: true,
                cssEase: 'linear',
                pauseOnFocus: false,
                pauseOnHover: false,
                autoplaySpeed: 6000,
                adaptiveHeight: true
            });
            
            if(!$("html").hasClass("touch")){
                slick.slick('slickPause')
                $('.solution-slider').on("mouseenter", function(e) {
                    if(max>1) {
                        slick.slick('slickPlay');
                    }
                });
            } else {
                if(max>1) {
                    slick.slick('slickPlay');
                }
            }
        });
    }
});


/* Fn 14 */
$(function() {
    $(".tabs-group").each(function() {
        var tabContent = $(this).find(".tab-content"),
            tabList = $(this).find(".tabs-list"),
            tabTrigger = $(tabList).find(".tab-trigger");
        tabTrigger.click(function(e) {
            e.preventDefault();
            $(this).parent().addClass("current");
            $(this).parent().siblings().removeClass("current");
            var tab = $(this).attr("href");
            $(tab).stop(true).fadeIn(800).addClass("tab-content-current");
            $(tabContent).not(tab).css("display", "none").removeClass("tab-content-current");
        });
    });
});


/* Fn 15 */
$(function() {
    if($('.select-tabs-group').length) {
        $(".select-tabs-group").each(function() {
            var select_tabs = $(this).find(".select-tabs"),
                select_tabContent = $(this).find(".select-tab-content");
            select_tabs.on('change', function (e) {
                var valId = $(this).val();
                $(valId).stop(true).fadeIn(800).addClass("active");
                $(select_tabContent).not(valId).css("display", "none").removeClass("active");
            });
        });
    }
});


/* Fn 16 */
$(function() {
    $(".accordion").each(function() {
        var acc = $(this),
            title = $(this).find(">.accordion-title"),
            content = $(this).find(">.accordion-content"); 
        
        content.hide();
        
        if(acc.find(".accordion-content").length == 0) {
            acc.addClass("empty");
        }
        
        if(title.hasClass('active')) {
            $(this).parent().find(content).slideDown(300);
        }
        
        title.click(function() {
            if ($(this).hasClass('active')) {
               $(this).removeClass('active').parent().find(content).slideUp(300);
            } else {
               $(this).toggleClass('active').parent().find(content).slideDown(300);
            }
            return false;
        });
    });
});


/* Fn 17 */
$(function () {
    if ($("#section-filters").length) {
        var _loc = $("#section-filters");
        var filterBtn = _loc.find(".filter-btn"),
            filtersContainer = _loc.find(".sc-filters-container"),
            searchFilters = _loc.find(".search-filters");

        filterBtn.on('click', function(e) {
            e.preventDefault();
            
            filtersContainer.toggleClass("filter-open");
            
            window.setTimeout(function() {
                searchFilters.toggleClass("open");
            }, 600);
        });
    }
});


/* Fn 18 */
// $(function() {
//     if ($("#search-filters").length) {
//         $('.popup-search-filters').magnificPopup({
//             type: 'inline',
//             preloader: false,
//             mainClass: 'mfp-fade',
//             disableOn: function () {
//                 if ($(window).width() < 768) {
//                     return true;
//                 }
//                 return false;
//             }
//         });
        
//         var _desktop = $("#search-filters"),
//             _mobile = $("#search-filters-mobile"),
//             _content = _desktop.find(">.search-filter-container"),
//             _magnificPopup = $.magnificPopup.instance;
        
//         function handleMQL(mql) {
//             if (mql.matches) {
//                 _content.appendTo(_mobile);
//             } else {
//                 _magnificPopup.close();
//                 _content.appendTo(_desktop);
//             }
//         }
//         var mql = window.matchMedia("(max-width: 768px)");
//         mql.addListener(handleMQL);
//         handleMQL(mql);
//     }
// });


/* Fn 19 */
$(function () {
    if ($(".showmore-box").length) {
        $('.showmore-box').each(function() {
            var trHide = $(this).find(".hide"),
                actionShowmore = $(this).find(".showmore-action"),
                btnShowmore = $(this).find(".btn-showmore");
            
            btnShowmore.click(function(e) {
                e.preventDefault();
                trHide.addClass("show");
                actionShowmore.hide();
            });
        });
    }
});


/* Fn 20 */
$(function(){
    if($('.condition-detail').length){
        $(".condition-detail").each(function() {
            var c_box = $(this).find('.condition-box'),
                c_link = $(this).find('.condition-link');

            c_link.click(function(e) {
                e.preventDefault();
                c_box.slideToggle();
                $(this).toggleClass('active');
            });
        });
    }
});


/* Fn 21 */
$(function(){
    if ($(".icw-alert").length) {
        $('.icw-alert').each(function() {
             var icwAlert = $(this),
                 icwClose = icwAlert.find('.icw-close');
            icwClose.click(function(e){
                e.preventDefault();
                icwAlert.fadeOut(300);
            });
        });
    }
});


/* Fn Notify */
$(function(){
    if ($(".kb-notify").length) {
        $('.kb-notify').each(function() {
             var kbNotify = $(this),
                 kbClose = kbNotify.find('.icw-close');
            kbClose.click(function(e){
                e.preventDefault();
                kbNotify.fadeOut(300);
            });
        });
    }
});


/* Fn Sitemap */
$(function(){
    $(window).load(function(){
        $(".kb-sitemap").find("li").each(function(){
            var _loc = $(this);

            if(!_loc.find(">ul").length) return true;

            var _ul = $(_loc.find(">ul")[0]),
                _a = $(_loc.find(">a")[0]);
            _ul.hide();
            var _span = $('<span class="collapsed"></span>').appendTo(this);
            _span.click(function(){
                _ul.toggle();
                $(this).toggleClass("expanded");
            });
            if(!_a[0].hasAttribute("href")){
                _a.click(function(e){
                    e.preventDefault();
                    _ul.toggle();
                    _span.toggleClass("expanded");
                });
            }
            //
            if(_loc.hasClass("expanded")) _loc.parentsUntil(".kb-sitemap","li").addClass("expanded");
        });
        $(".kb-sitemap").find("li.expanded").each(function(){
            $(this).find(">.collapsed").addClass("expanded");
            $(this).find(">ul").show();
            $(this).removeClass("expanded");
        });
    });
});




/* Fn Popup
   http://dimsemenov.com/plugins/magnific-popup 
*/
// $(function(){
//     if($('.open-popup-content').length){
//         $('.open-popup-content').magnificPopup({
//             type: 'inline',
//             midClick: true,
//             alignTop: true,
//             mainClass: 'icw-popup-content',
//             closeOnBgClick: false
//         });
        
//         if( location.hash != '' && location.hash.indexOf('popup') > 0 ){
//             $.magnificPopup.open({
//                 items:{
//                     src: location.hash
//                 },
//                 type: 'inline',
//                 midClick: true,
//                 alignTop: true,
//                 mainClass: 'icw-popup-content',
//                 closeOnBgClick: false
//             });   
//         }
//     }
    
//     if($('.open-popup-share').length){
//         $('.open-popup-share').magnificPopup({
//             type: 'inline',
//             midClick: true,
//             alignTop: true,
//             mainClass: 'icw-popup-function',
//             closeOnBgClick: false,
//             fixedContentPos: true
//         });
//     }
    
//     if($('.open-popup-search').length){
//         $('.open-popup-search').magnificPopup({
//             type: 'inline',
//             midClick: true,
//             alignTop: true,
//             mainClass: 'icw-popup-function',
//             closeOnBgClick: false,
//             fixedContentPos: true,
//             focus: '#search'
//         });
//     }
    
//     if($('.open-popup-iframe').length){
//         $('.open-popup-iframe').magnificPopup({
//             type: 'iframe',
//             mainClass: 'mfp-fade',
//             preloader: false,
//             fixedContentPos: true
//         });
//     }
// });


/* Fn scrollTo */
$(function() {
    $('a.scrollTo').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash),
                localNav = $('#localnav-fixed').outerHeight(),
                headerDevice = $('.header-device').outerHeight(),
                h = (localNav + headerDevice)-1;
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top-h
                }, 800);
                return false;
            }
        }
    });
});


/* Fn Tabs List Scrollbar */
$(function(){
    if($('.tabs-list-scrollbar').length){
        $('.tabs-list-scrollbar').perfectScrollbar();
    }
});


/* Fn matchHeight */
function itemMatchHeight() {
    $('.matchheight-group').each(function() {
        $(this).find('.matchheight').matchHeight({
            byRow: false
        });

        $(this).find('.matchheight-byrow').matchHeight({
            byRow: true
        });
    });
}
$(function() {
    if($(".matchheight-group").length){
        itemMatchHeight();
    }
    
    // $.magnificPopup.defaults.callbacks = {
    //     open: function() {
    //         if($(".matchheight-group").length){
    //             itemMatchHeight();
    //         }
    //     }
    // };
});

/* Fn Share */
function addQS(d, c) {
    var a = [];
    for (var b in c)
        if (c[b]) a.push(b.toString() + '=' + encodeURIComponent(c[b]));
    return d + '?' + a.join('&')
}

function getMETAContent(attr, data) {
    var meta = document.getElementsByTagName("META"),
        max = meta.length;
    for (var i = 0; i < max; i++) {
        if (meta[i].getAttribute(attr) == data) {
            return meta[i].content;
        }
    }
    return -1;
}

function fbShare() {
    var g = {
        u: document.URL,
        t: document.title
    };
    var a = addQS('https://www.facebook.com/sharer.php', g);
    window.open(a, 'sharer', 'toolbar=0,status=0,width=626,height=436');
    return false
}

function fbIMGShare(img) {
    var g = {
        u: document.URL + "?fbimg=" + img,
        t: document.title
    };
    var a = addQS('https://www.facebook.com/sharer.php', g);
    window.open(a, 'sharer', 'toolbar=0,status=0,width=626,height=436');
    return false
}

function fbURLShare(u) {
    var g = {
        u: u,
        t: document.title
    };
    var a = addQS('https://www.facebook.com/sharer.php', g);
    window.open(a, 'sharer', 'toolbar=0,status=0,width=626,height=436');
    return false;
}

function tweetShare() {
    var g = {
        url: document.URL,
        text: document.title + ' - '
    };
    var a = addQS('http://twitter.com/share', g);
    window.open(a, 'tweet', 'toolbar=0,status=0,width=626,height=436');
    return false;
}

function tweetURLShare(u) {
    var g = {
        url: u,
        text: document.title + ' - '
    };
    var a = addQS('http://twitter.com/share', g);
    window.open(a, 'tweet', 'toolbar=0,status=0,width=626,height=436');
    return false;
}

function gpShare() {
    var g = {
        url: document.URL,
        hl: "th"
    };
    var a = addQS('https://plus.google.com/share', g);
    window.open(a, 'sharer', 'menubar=no,toolbar=no,resizable=yes,status=0,width=600,height=600');
    return false;
}

function lineMSG() {
    window.location = "line://msg/text/" + encodeURIComponent(document.URL);
}

function pinShare(m) {
    var ogimg = getMETAContent("property", "og:image");
    ogimg = ogimg.replace("480x250", "full");

    var g = {
        url: document.URL,
        description: document.title + '\n' + $("meta[property=og\\:description]").attr('content'),
        media: ogimg
    };

    if (m != undefined) g.media = m;
    var a = addQS('https://www.pinterest.com/pin/create/button/', g);
    window.open(a, 'sharer', 'menubar=no,toolbar=no,resizable=yes,status=0,width=750,height=331');
    return false;
}

function mailShare() {
    var g = 'mailto:';
    g += '?subject=' + encodeURIComponent(document.title) + ' %2D KASIKORNBANK';
    g += '&body=' + $("meta[property=og\\:description]").attr('content') + '\n\n' + encodeURIComponent(document.URL);
    win = window.open(g, 'emailWindow');
}
