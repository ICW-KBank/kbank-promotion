"use strict";
$(function () {
  
  $(".open-promotion-table").ready(function () {
    $(".open-promotion-table").magnificPopup({
      type: "inline",
      mainClass: "promotion-popup theme-home-loan",
      overflowY: "scroll",
      closeMarkup: '<button type="button" class="mfp-close"></button>',
      autoFocusLast: false,
      fixedContentPos: true,
      callbacks: {
        open: function () {
          $(window).trigger("resize");
        }
      }
    });
  });

  if ($(".accordion").length) {
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
}
  
  
});

