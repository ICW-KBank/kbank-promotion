$(function () {
  /* Responsive component overflower */
  $.each($(".compn-overflow"), function () {
    var width = $(this).find(".compn-overflow-wrapper").width() 
        * $(this).find(".compn-overflow-wrapper").width() 
        / $(this).find(".compn").width();

    $(this).find(".compn-overflow-scroll").css("width", width + "px");

    $(this).find(".compn-overflow-wrapper").scroll(function () {
      width = $(this).find(".compn-overflow-wrapper").width() 
        * $(this).find(".compn-overflow-wrapper").width() 
        / $(this).find(".compn").width();
      $(this).parent().find(".compn-overflow-scroll").css("width", width + "px");
      $(this).parent().find(".compn-overflow-scroll").css(
        "margin-left", ($(this).parent().find(".compn-overflow-wrapper").scrollLeft()
        / $(this).parent().find(".compn").width()
        * $(this).parent().find(".compn-overflow-wrapper").width()) + "px");
    });
  });

  // Custom event trigger
  $(window).on("compn-rewidth", rewidthComponent);

  // trigger once
  $(window).trigger("compn-rewidth");
});

function rewidthComponent () {
  $.each($(".compn-overflow"), function () {
    var width = $(this).find(".compn-overflow-wrapper").width() 
        * $(this).find(".compn-overflow-wrapper").width() 
        / $(this).find(".compn").width();

    $(this).find(".compn-overflow-scroll").css("width", width + "px");
  });
}