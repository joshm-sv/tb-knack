const { showHideMenuText } = require('/js/custom_functions/custom');

const measurementID = 'G-3XYXWWXX44';

async function initializeGoogleAnalytics() {
  if (typeof gtag !== 'function') {
    await new Promise(resolve => {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag() { dataLayer.push(arguments); }
    //   LazyLoad.js([`https://www.googletagmanager.com/gtag/js?id=${measurementID}`], resolve);
      $('body').append(`<script class="lazyload" src="https://www.googletagmanager.com/gtag/js?id=${measurementID}></script>`)
    });
  }

  gtag('config', measurementID, {
    send_page_view: false
  });

  gtag('event', 'page_view', {
    page_title: location.pathname + location.search + location.hash,
    page_location: location.search,
    page_path: location.pathname
  });
}

$(document).on('knack-scene-render.any', function(event, scene) {
    initializeGoogleAnalytics();
    showHideMenuText();
    //List of the Page where the view exist to hide the side bar;
    var viewsToHide = document.getElementById('view_3370');
    if (viewsToHide) {
        $('#kn-mobile-menu').addClass('hideMe')
        //kn-app-header
        $('#kn-app-header').addClass('hideMe')
    } else {
        $('#kn-mobile-menu').removeClass('hideMe')
        $('#kn-app-header').removeClass('hideMe')
    }
});