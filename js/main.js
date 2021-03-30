$(function() {
  //initialize carousel
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

  //collection of banner images
  let bannerImg = {
    'watch-pink': 'url(./images/watch-pink.png)',
    'watch-white': 'url(./images/watch-white.png)',
    'watch-black': 'url(./images/watch-black.png)',
  };
  let bannerImgKeys = Object.keys(bannerImg);
  let bannerAutoplay;

  //load banner only when container is visible
  if ($(window).width() >= 567) loadBanner();

  //banner behavior on resize
  $(window).resize(function() {
    if ($(window).width() >= 567){
      if (!$('#banner').attr('class')) {
        loadBanner();
      } else if (!bannerAutoplay) {
        resetBannerAutoplay();
      }
    } else if (bannerAutoplay) {
      bannerAutoplay = clearInterval(bannerAutoplay);
    }
  });

  function loadBanner() {
    changeBanner(bannerImgKeys[0]);
    resetBannerAutoplay();
  }

  function resetBannerAutoplay() {
    bannerAutoplay = clearInterval(bannerAutoplay);
    bannerAutoplay = setInterval(() => swapWatch($('#banner').attr('class')), 5000);
  }

  // get next banner image
  function swapWatch(currentItem) {
    let nextIndex = bannerImgKeys.indexOf(currentItem) < bannerImgKeys.length - 1 ?
      bannerImgKeys.indexOf(currentItem) + 1 :
      0;
    changeBanner(bannerImgKeys[nextIndex]);
  };

  //show new banner image
  function changeBanner(newItem) {
    $('#banner').removeClass().addClass(newItem);
    $('#banner').css('background-image', bannerImg[newItem]);
    if (($('#banner').is('.watch-black') && $('#wrapper').is('.dark')) ||
      ($('#banner').is('.watch-white') && !$('#wrapper').is('.dark'))) {
      toggleDarkMode();
    }
  };

  function toggleDarkMode() {
    $('#wrapper').toggleClass('dark');
  };

  //toggle sidebar menu
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
    resetBannerAutoplay();
  });

  //sync carousel item with banner
  $('.carousel-item').click(function() {
    changeBanner($(this).attr('id'));
    resetBannerAutoplay();
  });
});
