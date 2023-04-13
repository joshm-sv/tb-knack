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
var currentAppendedTheme;

//'scene_1697','scene_1704','scene_1705','scene_1712','scene_1714','scene_1715','scene_1719','scene_1737','scene_1738','scene_1739','scene_1740','scene_1741','scene_1742','scene_1698','scene_1694',
var geo_scenes = [ 'scene_1712', 'scene_1714', 'scene_1715', 'scene_1719', 'scene_1737', 'scene_1738', 'scene_1739', 'scene_1740', 'scene_877', 'scene_881', 'scene_882', 'scene_944', 'scene_945', 'scene_1628', 'scene_1632', 'scene_1662', 'scene_1663', 'scene_1664', 'scene_1666', 'scene_1665', 'scene_1667', 'scene_1668', 'scene_1897','scene_1897','scene_1900','scene_1903','scene_1905','scene_1899','scene_1902','scene_1901','scene_1922', 'scene_1924']
//New Site Audit Setup Scene List - https://builder.sv.knack.com/apps/trashdash/pages/scene_1695
var siteAudit_scenesDesktop = ['scene_1695','scene_1694', 'scene_1936', 'scene_1408', 'scene_1410', 'scene_1960'] //'scene_1408', 'scene_1410', 'scene_1960' = SERVICE HAZARDS
geo_scenes = geo_scenes.concat(siteAudit_scenesDesktop)
$(document).on('knack-scene-render.any', function(event, scene) {
   if(geo_scenes.includes(scene.key)){
       if($('#sv_geo_css').length === 0){
           currentAppendedTheme = 'sv_geo_css'
         $('head').append('<link rel="stylesheet" type="text/css" id="sv_geo_css" class="lazyload" href="https://strategic-visionz.github.io/knack-css/scss/Manage%20Geos%20Theme.1.0.0.min.css">')
       }
   }else{
       if($('#sv_geo_css').length > 0){
           if(siteAuditShared.includes(scene.key)){}
           else{ $('#sv_geo_css').remove(); }
       }
   }
   if(siteAudit_scenesDesktop.includes(scene.key)){
       currentAppendedTheme = 'as_command_center_theme';
       if($('#as_command_center_theme').length === 0){
           $('head').append('<link rel="stylesheet" type="text/css" id="as_command_center_theme" class="lazyload" href="https://strategic-visionz.github.io/knack-css/scss/Area%20Supervisor%20Theme.min.css">')
       }
   }
   checkCurrentTheme();    
});

function checkCurrentTheme(){
   if(currentAppendedTheme === 'sv_geo_css'){$('#as_command_center_theme').remove()} 
   else if (currentAppendedTheme == 'as_command_center_theme'){$('#sv_geo_css').remove()}
   else {}
}

//home_slug
$(document).on('knack-scene-render.any', function(event, scene) {
  if( Knack.home_slug == 'butler' ){
    if($('#butler_service_ui').length === 0){
      $('head').append('<link rel="stylesheet" type="text/css" id="butler_service_ui" class="lazyload" href="https://strategic-visionz.github.io/knack-css/scss/Butler%20Service%20Process%20Theme1.0.0.min.css">')
    }
  }else{
    if($('#butler_service_ui').length > 0){
      $('#butler_service_ui').remove();
    }
  }
  // if( Knack.home_slug != 'service-activity-logs'){
    if( $('#kn-scene_2013').length === 0 && $('#kn-scene_2042').length === 0){
      if($('#service-activity-logs').length > 0){
        $('#service-activity-logs').remove();
      }
      if( Knack.home_slug != "area-command-center" ){
      }
    }
 
    if( $('#kn-scene_2013').length === 1 || $('#kn-scene_2042').length === 1){
      if( Knack.home_slug == "area-command-center" ){
        if( Knack.navList){
          var customMenu = `<ul id="custom_menu_id" style="list-style-type:none;">${Knack.navList}</ul>`;
          if($('#custom_menu_id').length === 0){ $('#kn-mobile-menu').append(customMenu); }
        }
        addSvTopBack();
      }
      $('#as_command_center_theme').remove()
    }
 
  try{
    var userProfKeys = Knack.session.user.profile_keys;
    var isDev = userProfKeys.includes('profile_34');
    var isTM = userProfKeys.includes('profile_15')
    var isStaff = userProfKeys.includes('profile_6')
    var isFOQM = userProfKeys.includes('profile_101')
    var isAS = userProfKeys.includes('profile_3')
    var isPilot = userProfKeys.includes('profile_155')
    var runQueue = isDev || isPilot;
  }
  catch(err){
  }
 
  if( Knack.home_slug == "area-command-center"){
    if( $('#custom_menu_id').length === 0 ){
      addCustomMenuSv();
    }
    if ($('#as_command_center_theme').length == 0) {
        if( $('#kn-scene_2042').length === 0 && $('#kn-scene_2013').length === 0){
          $('head').append('<link rel="stylesheet" type="text/css" id="as_command_center_theme" class="lazyload" href="https://strategic-visionz.github.io/knack-css/scss/Area%20Supervisor%20Theme.min.css">')
        }else{
        }
    }
  }
  try{
    var review_data = JSON.parse(sessionStorage.getItem("review_data")) || [];
    var flexQueueStartAt = JSON.parse(sessionStorage.getItem("flex_queue_started")) || '';
    Knack.flexQueueStartAt = flexQueueStartAt;
    Knack.reviewedCount = 0;
    $.each(review_data, function(index, value) {
      if (value.field_1025 !== "") {
        Knack.reviewedCount = Knack.reviewedCount + 1;
      }
  });
  }catch(err){
    console.log(err)
  }
  if( $('#view_5808').length === 0 ){ $('#view_5851').remove();}
  if( $('#view_5730').length === 0 ){ $('#view_5964').remove();}
  var withReviewData = '';
  try{
    if( review_data.length > 0 ){
        withReviewData = `<p id="return_to_active_queue">Return to Active Queue</p>
          <div style="margin-bottom:1em;cursor: pointer;">
          ${Knack.reviewedCount ? "<p class='queue-element'>Reviewed " +Knack.reviewedCount+"/"+Knack.flexServices.length+"</p>" : ""}
          ${Knack.flexQueueStartAt ? "<p class='queue-element' style='font-size: .8em;'>Started At: "+Knack.flexQueueStartAt+"</p>" : ''}
          </div>`
    }
  }catch(err){
    console.log(err)
  }
  try{
    if( runQueue && Knack.home_slug !== "community-concierge" ){
      var fq_sidebarHtml = `<div id="flex_queue_sibar">
          ${withReviewData}
          <p id="flex_service_quick_queue" class="hideMe">Service QuickQueue</p>
          </div>`;
      $('#flex_queue_sibar').remove()
      if($('#flex_queue_sibar').length === 0){
        $('#kn-mobile-menu').append(fq_sidebarHtml)
      }
      $('#return_to_active_queue').on('click', function(){
        window.location.href = Knack.url_base+'#'+Knack.hash_parts[0]+'/service-id--flexadd-details-mobile2/'+Knack.flexServices[0].id+'?'+(Knack.query_string || "");
      })
    }
    }
  catch(err){
    console.log(err)
  }
  if( runQueue && $('#flex_service_quick_queue').length === 0 ){
  }
  $('#flex_service_quick_queue').on('click', function(){
    var link = $('#services_quickqueue').attr('href');
    if(link){ window.location.href = link;}
  })
 
  //Add QuickQueue
  if( runQueue ){
    var review_data = JSON.parse(sessionStorage.getItem("review_data")) || [];
    Knack.flexServices = review_data;
    var currentUrl = window.location.href.split('?')[0];
    
    setTimeout(function() {
      
      if( $('#services_quickqueue').length === 0 )$('#knack-logo').append(`<a id="services_quickqueue" class="hideMe" href="${currentUrl}services-quickqueue/${Knack.hash_id||''}">Service QuickQueue</a>`)
      $('#flex_service_quick_queue').removeClass('hideMe')
      if( review_data.length > 0 && $('#flex_return_active_queue').length === 0 ) {
        try{
          $(`#flex_sidebar_nav`).append(`<div id="flex_return_active_queue">
          <div id="flex_sidebar_nav"><a id="services_quickqueue_sidebar" class="" href="${currentUrl}services-quickqueue/${Knack.hash_id||''}">Service QuickQueue</a></div>
          <a href="${Knack.url_base+'#'+Knack.hash_parts[0]+'/service-id--flexadd-details-mobile2/'+Knack.flexServices[0].id+'?'+(Knack.query_string || "")}">
          Return to Active Queue</a>
          <div>
          <h3>${Knack.reviewedCount}/${review_data.length} Reviewed</h3>
          </div>
          </div>`)
 
          
        }catch(err){
          console.log(err)
        }
      }
    }, 2000);
  }
  //End
 })

 //Add Login/Logout Session Log Records object_89
var LOGIN_PAGE = false;
var LOGIN = false;
// Helper functions
function getUserDeviceJ(){
   let details = navigator.userAgent;

   let regexp = /android|iphone|kindle|ipad/i;

   let isMobileDevice = regexp.test(details);

   if (isMobileDevice) {
       return 'Mobile'
   } else {
       return 'Desktop'
   }
}
$(document).on('knack-scene-render.any', function (event, scene) {
   var device = getUserDeviceJ();
 LOGIN_PAGE = $('.kn-login').length == 1 ? true : false;
 if (LOGIN_PAGE) {
   LOGIN = false;
   $('input[type="submit"]').click(function (e) {
     e.preventDefault();
     LOGIN = true;
     $('form').submit();
   });
 } else {
   if (LOGIN) {
     LOGIN = false;
     getDeviceData("Login");
   }
 }
});
// Logout actions
$(document).on('knack-scene-render.any', function (event, scene) {
    var device = getUserDeviceJ();
 // Check is already authenticated
 if (!Knack.session.user) {
   return;
 }
 $('.kn-log-out').on('click', function () {
   getDeviceData("Logout");
 });
});
//End Add Session Log