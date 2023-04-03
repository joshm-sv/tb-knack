$(document).on('knack-scene-render.any', function(event, scene) {
    var measurementID ='G-3XYXWWXX44';
    if (typeof gtag ==='function'){
    gtag('js', new Date());
    gtag('config', measurementID, {
    // disable the default pageview hit
    send_page_view: false
    });
    gtag('event', 'page_view', {
    page_title: location.pathname + location.search + location.hash,
    page_location: location.search,
    page_path: location.pathname
    });
    } else {
    window.dataLayer = window.dataLayer || [];
    LazyLoad.js([`https://www.googletagmanager.com/gtag/js?id=${measurementID}`],function(){
    window.gtag = window.gtag || function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', measurementID, {
    // disable the default pageview hit
    send_page_view: false
    });
    // Manually send page_view events
    gtag('event', 'page_view', {
    page_title: location.pathname + location.search + location.hash,
    page_location: location.search,
    page_path: location.pathname
    });
    });
    }
    $('.kn-modal-bg').off('click'); //Will make the modal popup uncloseable when the outside is clicked
    // if( $('#kn-scene_1904').length === 0){
    //     $('.sv_carousel_bs').remove()
    // }
  });