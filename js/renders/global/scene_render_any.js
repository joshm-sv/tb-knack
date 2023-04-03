const measurementID = 'G-3XYXWWXX44';

async function initializeGoogleAnalytics() {
  if (typeof gtag !== 'function') {
    await new Promise(resolve => {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag() { dataLayer.push(arguments); }
      LazyLoad.js([`https://www.googletagmanager.com/gtag/js?id=${measurementID}`], resolve);
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
});