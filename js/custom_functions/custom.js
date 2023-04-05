function addCCStyleSheet(){
    if ($('#community_concierge_theme').length == 0) {
          $('head').append('<link rel="stylesheet" type="text/css" id="community_concierge_theme" class="lazyload" href="https://strategic-visionz.github.io/knack-css/scss/Community%20Manager%20Theme.min.css">')
          $('head').append(`<script>
      (function(h,o,t,j,a,r){
          h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
          h._hjSettings={hjid:2773425,hjsv:6};
          a=o.getElementsByTagName('head')[0];
          r=o.createElement('script');r.async=1;
          r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
          a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
   </script>`)
      }
}

function showHideMenuText() {
    if ($(".minimizedMenu")[0]) {
        $('.custom-menu-text').addClass('hideMe');
        $('#custom_menu_id li').addClass('bigger-icon');
        $('.sv-bottom-menu').addClass('bigger-icon');
        $('#custom_menu_id').addClass('adjust-margin-top-60px');

    } else {
        $('.custom-menu-text').removeClass('hideMe');
        $('#custom_menu_id li').removeClass('bigger-icon');
        $('.sv-bottom-menu').removeClass('bigger-icon');
        $('#custom_menu_id').removeClass('adjust-margin-top-60px');
    }
}

function searchParam(name) {
    return (window.location.href.split(name + '=')[1] || '').split('&')[0];
}

function prevServiceDate(){
    var d = new Date(currentServiceDate());
    d.setDate( d.getDate() - 1 );
    return d.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })
 }
 
 function currentServiceDate(){
  if(0 > timeDiff) { return currentDate}
    else {
      var d = new Date(currentDate);
    d.setDate( d.getDate() - 1 );
        return d.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })
    }
 }

module.exports = {
    addCCStyleSheet: addCCStyleSheet,
    searchParam: searchParam,
    showHideMenuText: showHideMenuText,
    prevServiceDate: prevServiceDate,
    currentServiceDate: currentServiceDate
};