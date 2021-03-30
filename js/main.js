$(function() {
  //init
  $(document).ready(function() {
    changeBanner('watchPink');
    $('#carousel').owlCarousel({
      dots: false,
      rtl: true,
      margin: 40,
      responsive: {
        0: {
          items: 1,
        },
        667: {
          items: 2,
          margin: 20,
        },
        1280: {
          items: 1,
        },
        1600: {
          items: 2,
        }
      }
    });
  });

  //show sidebar menu
  $('#header-layout-button').click(function() {
    $('#wrapper').addClass('sidebar');
    $('#sidebar').addClass('active');
  });

  $('#sidebar-close').click(function() {
    $('#sidebar').removeClass('active');
    $('#wrapper').removeClass('sidebar');
  });

  //horizontal arrow click
  $('#model-nav').click(function() {
    swapWatch($('#banner').attr('class'));
  });

  //sync carousel item with banner
  $('.carousel-item').click(function() {
    changeBanner($(this).attr('id'));
  });

  // change banner image
  function swapWatch(currentItem) {
    let nextIndex = bannerImgKeys.indexOf(currentItem) !== bannerImgKeys.length - 1 ?
      bannerImgKeys.indexOf(currentItem) + 1 :
      0;
    changeBanner(bannerImgKeys[nextIndex]);
  };

  function changeBanner(newItem) {
    $('#banner').removeClass().addClass(newItem);
    $('#banner').css('background-image', bannerImg[newItem]);
    if (($('#banner').is('.watchBlack') && $('#wrapper').is('.dark')) ||
      ($('#banner').is('.watchWhite') && !$('#wrapper').is('.dark'))) {
      toggleDarkMode();
    }
  };

  //dark mode for site
  function toggleDarkMode() {
    $('#wrapper').toggleClass('dark');
  };

  //collection of banner images
  let bannerImg = {
    watchPink: 'url(./images/watch-pink.png)',
    watchWhite: 'url(./images/watch-white.png)',
    watchBlack: 'url(./images/watch-black.png)',
  };
  let bannerImgKeys = Object.keys(bannerImg);
});
