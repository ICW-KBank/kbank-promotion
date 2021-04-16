'use strict';
$(function () {
  if ($('.table-anime').length) {
    $('.table-anime').on('click', function (e) {
      e.preventDefault();
      $(this).css('display', 'none');
    });
  }

  if ($('.link-popup-img').length) {
    $('.link-popup-img').magnificPopup({
      type: 'inline',
      midClick: true,
      alignTop: true,
      fixedContentPos: true,
      mainClass: 'custom-popup',
      // other options
    });
  }

  if ($('.accordion').length) {
    $('.accordion').each(function () {
      var acc = $(this),
        title = $(this).find('>.accordion-title'),
        content = $(this).find('>.accordion-content');

      content.hide();

      if (acc.find('.accordion-content').length == 0) {
        acc.addClass('empty');
      }

      if (title.hasClass('active')) {
        $(this).parent().find(content).slideDown(300);
      }

      title.click(function () {
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
