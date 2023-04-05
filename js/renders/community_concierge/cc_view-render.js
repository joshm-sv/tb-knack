const { addStyleSheet } = require('/js/custom_functions/custom');

//scene_1254
$(document).on('knack-view-render.view_3754', function(event, view, data){
    // $('#kn-scene_1253').removeClass('group-layout-wrapper')
 });

 //scene_1254 Login
$(document).on("knack-view-render.view_3363", function(event, view, data) {
    addStyleSheet();
    if ($('#sv-top-back').length > 0) {
        $("#sv-top-back").remove();
    }
 });

 //My Communities

 //view_3369 //My Communities
$(document).on('knack-view-render.view_3369', function(event, view, data){
    $($('.kn-info-bar')[0]).addClass('show-breadcrumbs')
    $($('.show-breadcrumbs')[0]).removeClass('kn-info-bar');
    var t = 1;
    const myInterval = setInterval(myTimer, 1000);
    function myTimer() {
        if( $($('.show-breadcrumbs')[0]) ){
          if(($($('.show-breadcrumbs')[0]).attr('style')).includes('none')){
            $($('.show-breadcrumbs')[0]).removeClass('kn-info-bar');
            $($('.show-breadcrumbs')[0]).css('display', 'block');
          }else{
              clearInterval(myInterval);
          }
        }
        t = t+1;
        if(t>10){ clearInterval(myInterval) }
    }
 
});

//Dashboard

//put button view into list view data 
//by KIM
var buttonIntoListView = [
    {
      listView: "view_5467",
      buttonView: "view_3377"
    },{
        listView: "view_5448",
        buttonView: "view_3388"
    },
    {
        listView: "view_3615",
        buttonView: "view_3539"
    },
      {
        listView: "view_3393",
        buttonView: "view_3749"
    }
   ];
   
   buttonIntoListView.forEach(blv => {
      $(document).on(`knack-view-render.${blv.listView}`, function(event, view, data) {
          $(`#${blv.buttonView}`).detach().prependTo(`#${blv.listView} div.view-header`);
          $(`#${blv.buttonView}`).addClass('sv-CMButtonViewInView');
          $(`#${blv.listView} div.view-header h2`).css('margin-top','0');
      });
   });

//view_3407 Updates from TB on Dashboard
$(document).on("knack-view-render.view_3407", function(event, view, data) {
    $('#view_updatesTB').hide();
    $('.field_1403').hide();
    if(data.field_1403){
      var updataText = data.field_1403;
      var updateLength = 300;
      var trimmedUpdate = updataText.substring(0, updateLength);
      var stickyNotifFromTB = `<div class="updateTB" style="cursor: pointer;">
          <strong>
              <span style="color: #8392ab;"></span><i class="fa fa-bell-o"></i>Update From The Trash Butler Team:</span><br>
              <p style="color: hsl(211, 71%, 28%);">${trimmedUpdate} ... <span style="font-style: italic;">(Read More)</span>
              </p>
          </strong>
      </div>`;
      $('#updates-from-tb-id').html(stickyNotifFromTB);
    }else{$('#updates-from-tb-id').html(stickyNotifFromTB);}
    
    $($('.updateTB')[0]).on("click", function(){
      $('#view_updatesTB').click();
    });

    $($('#updates-from-tb-id').parents()[1]).addClass('cm-card')
 });

//view_3749
$(document).on("knack-view-render.view_3749", function(event, view, data) {
    $('.field_1647').hide(); //On Radar Number
    var radarIcon = `<i class="fa fa-camera"></i>`;
    var noRadarText = `${radarIcon} <span>No Unit On RADAR</span>`;

    if (data.field_1647 == 0) {
        document.getElementById("on_radar_num").innerHTML = noRadarText;
    } else {
        $('#on_radar_num').html(`${radarIcon} <span> ${data.field_1647} Units On RADAR</span>`)
    }
    //End Units On Radar Dashboard
 });


$(document).on('knack-form-submit.view_3568', function(event, view, record) {
    if($('#view_last_night_service_btn').length > 0){
      record.field_1495 == "Thumbs Up" ? $('#view_last_night_service_btn').addClass('rated-icon-green') : $('#view_last_night_service_btn').removeClass('rated-icon-green')
    }
    if($('#view_3374 .fa-check-circle').length === 0){
       $('#view_last_night_service_btn').append(`&nbsp;&nbsp;&nbsp;<i style="margin-top: 5px;" class="fa fa-check-circle"></i>`)
    }
 });

 $(document).on('knack-view-render.view_3517', function(event, view, data){
    $('#click_survey_id').on('click', function() {
          location.href = location.href + `popup-cm-activity-logs-in-devs/${Knack.views.view_3374.record.id}/`
    });
});


function appendCustomMenuMain() {
    //Menu Icon
    var dashboard = `<i class="fa fa-th-large"></i>`;
    var serviceHistory = `<i class="fa fa-history "></i>`;
    var infractions = `<i class="fa fa-info-circle"></i>`;
    var units = `<i class="fa fa-tachometer"></i>`;
    var hazards = `<i class="fa fa-life-ring"></i>`;
    var supportTicket = `<i class="fa fa-inbox"></i>`;
    var billing = `<i class="fa fa-list-alt"></i>`;
    var profile = `<i class="fa fa-user"></i>`;
    //
    var radarLog = `<i class="fa fa-camera"></i>`;
    var comLog = `<i class="fa fa-building-o"></i>`;
    var userVidGuides = `<i class="fa fa-book"></i>`;
 
 
    var customMenu = $(`
        <ul id="custom_menu_id" style="list-style-type:none; display:none;">
          <li id="com_dashboard"><a class="sv-cm-navbar" >${dashboard} <span class="custom-menu-text"> Dashboard</span></a></li>
          <li id="com_service_history"><a class="sv-cm-navbar" >${serviceHistory} <span class="custom-menu-text"> Service History</span></a></li>
          <li id="com_infractions"><a class="sv-cm-navbar" >${infractions} <span class="custom-menu-text"> Infractions</span></a></li>
          
          <li id="com_hazards"><a class="sv-cm-navbar" >${hazards}<span class="custom-menu-text"> Service Hazards</span></a></li>
          <li id="com_support_tickets"><a class="sv-cm-navbar" >${supportTicket} <span class="custom-menu-text"> Support Tickets</span></a></li>
      <li id="com_radar"><a class="sv-cm-navbar" >${units}</i> <span class="custom-menu-text"> Community Units</span></a></li>
      <li id="com_radarLogs"><a class="sv-cm-navbar" >${radarLog} <span class="custom-menu-text"> RADAR Logs</span></a></li>
          <li id="com_account_billing" style="display: none;"><a class="sv-cm-navbar" >${billing} <span class="custom-menu-text"> Account/Billing</span></a></li>
          <li id="com_profile"><a class="sv-cm-navbar" >${profile} <span class="custom-menu-text"> Community Profile</span></a></li>
          <li id="user_guide"><a class="sv-cm-navbar" >${userVidGuides} <span class="custom-menu-text"> Video Training</span></a></li>
 
          
          <li id="com_comLogs" style="display: none;"><a class="sv-cm-navbar" >${comLog} <span class="custom-menu-text"> Community Logs</span></a></li>
      </ul>`
        //HIDDEN
        //Com log
        //Account Billing
    );
 
    if ($('#custom_menu_id').length == 0) {
        $('#kn-mobile-menu').append(customMenu);
    }
    $($('.kn-mobile-controls')[0]).on('click', function() {
        showHideMenuText();
    })
 
    if ($('.kn-back-link').length == 1) {
        let goBackTop = $('.kn-back-link').clone().attr("id", "sv-top-back").appendTo("#knack-dist_1");
        let origLink = $($('.kn-back-link a')[0]).attr('href');
 
        var timeout = setTimeout(function() {
            let orig = $($('.kn-back-link a')[0]).attr('href');
            $("#sv-top-back a").attr("href", origLink).addClass("sv-top-back");
            clearTimeout(timeout);
        }, 1000);
    } else {
        let origLink = $($('.kn-back-link a')[0]).attr('href');
        let origText = $($('.kn-back-link a')[0])[0].innerHTML;
 
        var timeout = setTimeout(function() {
            let orig = $($('.kn-back-link a')[0]).attr('href');
            $("#sv-top-back a").attr("href", origLink).addClass("sv-top-back");
            $("#sv-top-back a").html(origText)
            clearTimeout(timeout);
        }, 200);
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

//add href to the navbar
function addLinkToCommunityDashboard(cid) {
    appendCustomMenuBottom();
    $('.field_1629').hide();
 
    let varId = cid;
    $('#com_dashboard a').attr("href", "https://apps.sv.knack.com/trashdash#community-concierge/community-dashboard/" + varId);
    $('#com_service_history a').attr("href", "https://apps.sv.knack.com/trashdash#community-concierge/community-dashboard/" + varId + "/community-service-history/" + varId);
    $('#com_infractions a').attr("href", "https://apps.sv.knack.com/trashdash#community-concierge/community-dashboard/" + varId + "/infractions/" + varId);
    $('#com_radar a').attr("href", "https://apps.sv.knack.com/trashdash#community-concierge/community-dashboard/" + varId + "/radar-and-units/" + varId);
    $('#com_hazards a').attr("href", "https://apps.sv.knack.com/trashdash#community-concierge/community-dashboard/" + varId + "/service-hazards/" + varId);
    $('#com_support_tickets a').attr("href", "https://apps.sv.knack.com/trashdash#community-concierge/community-dashboard/" + varId + "/community-support-tickets/" + varId);
    $('#com_account_billing a').attr("href", "https://apps.sv.knack.com/trashdash#community-concierge/community-dashboard/" + varId + "/account-billing/" + varId);
    $('#com_profile a').attr("href", "https://apps.sv.knack.com/trashdash#community-concierge/community-dashboard/" + varId + "/my-community-profile/" + varId);
    //
    $('#com_radarLogs a').attr("href", "https://apps.sv.knack.com/trashdash#community-concierge/community-dashboard/" + varId + "/radar-logs/" + varId);
    $('#com_comLogs a').attr("href", "https://apps.sv.knack.com/trashdash#community-concierge/community-dashboard/" + varId + "/community-logs/" + varId);
    //back_to_dashboard
    $('#sv-top-back a').attr("href", "https://apps.sv.knack.com/trashdash#community-concierge/community-dashboard/" + varId);
    $('#user_guide a').attr("href", "https://apps.sv.knack.com/trashdash#community-concierge/community-dashboard/" + varId + "/cc-training-v2/" + varId);
    var timeout = setTimeout(function() {
        document.getElementById('custom_menu_id').style.display = 'block';
        clearTimeout(timeout);
    }, 1000);
}

function appendCustomMenuBottom() {
    $($('.show-breadcrumbs')[0]).remove()
    if ($('#community_concierge_theme').length == 0) {
        $('head').append('<link rel="stylesheet" type="text/css" id="community_concierge_theme" class="lazyload" href="https://strategic-visionz.github.io/knack-css/scss/Community%20Manager%20Theme.min.css">')
    }
    let customMenu = $('#custom_menu_id');
 
    var myComIcon = `<i class="fa fa-building"></i>`;
    var logOutIcon = `<i class="fa fa-sign-out"></i>`;
 
    $('#kn-mobile-menu').append(customMenu);
    var customMenuBottom = $(`
        <ul class="sv-bottom-menu" style="list-style-type: none;">
          <li><a href="https://apps.sv.knack.com/trashdash#community-concierge">  ${myComIcon} <span class="custom-menu-text"> My Communities </span></a></li>
          <li><a href="#" class="kn-log-out">${logOutIcon} <span class="custom-menu-text"> Log Out</a> </span></li></ul>
      </ul>`);
    var checkIfExist = document.getElementsByClassName('sv-bottom-menu');
    if (checkIfExist.length == 0) {
        $('#kn-mobile-menu').append(customMenuBottom);
    }
 
}


 $(document).on("knack-view-render.view_3458", function(event, view, data) {
    appendCustomMenuMain();
    addLinkToCommunityDashboard(data.id);
    $('#com_service_history').addClass('sv-active');
 });
 
 var fromEmailOn = false;
 $(document).on("knack-view-render.view_4260", function(event, view, data) {
    var comID = data.field_1500_raw[0].id
    appendCustomMenuMain();
    addLinkToCommunityDashboard( comID );
    $('#com_hazards').addClass('sv-active');
    if(!fromEmailOn && Knack.hash_parts[2] == 'addressed-service-hazards'){
      window.location.href = `${Knack.url_base}#community-concierge/community-dashboard/${comID}/?hazard_id=${data.id}`;
      fromEmailOn = true;
    }
 });
 
 //Infractions view_3561
 $(document).on("knack-view-render.view_3561", function(event, view, data) {
    appendCustomMenuMain();
    addLinkToCommunityDashboard(data.id);
    $('#com_infractions').addClass('sv-active');
 });
 //Radar and Units view_3465
 $(document).on("knack-view-render.view_3465", function(event, view, data) {
    appendCustomMenuMain();
    addLinkToCommunityDashboard(data.id);
    $('#com_radar').addClass('sv-active');
 
    if (data.field_1647 === 0) {
        $('#view_3465 #field_1647 span').style.display = "none";
    }
 });
 //view_3560 Service Hazards
 $(document).on("knack-view-render.view_3560", function(event, view, data) {
    appendCustomMenuMain();
    addLinkToCommunityDashboard(data.id);
    $('#com_hazards').addClass('sv-active');
 });
 
 //Service Hazards view_3463 UNSURE
 $(document).on("knack-view-render.view_3463", function(event, view, data) {
    appendCustomMenuMain();
    addLinkToCommunityDashboard(data.id);
 });
 //Support Ticket view_3468
 $(document).on("knack-view-render.view_3468", function(event, view, data) {
    appendCustomMenuMain();
    addLinkToCommunityDashboard(data.id);
    $('#com_support_tickets').addClass('sv-active');
 });
 //Account Billing view_3470
 $(document).on("knack-view-render.view_3470", function(event, view, data) {
    appendCustomMenuMain();
    addLinkToCommunityDashboard(data.id);
    $('#com_account_billing').addClass('sv-active');
 });
 //Profile view_3472 ? UNSURE
 $(document).on("knack-view-render.view_3472", function(event, view, data) {
    appendCustomMenuMain();
    addLinkToCommunityDashboard(data.id);
    $('#com_profile').addClass('sv-active');
 });
 //view_3551 Community Profile
 $(document).on("knack-view-render.view_3551", function(event, view, data) {
    appendCustomMenuMain();
    addLinkToCommunityDashboard(data.id);
    $('#com_profile').addClass('sv-active');
 });
 //view_3477
 $(document).on("knack-view-render.view_3477", function(event, view, data) {
    appendCustomMenuMain();
    addLinkToCommunityDashboard(data.id);
 });
 
 //view_3536 Edit Community Profile
 $(document).on("knack-view-render.view_3536", function(event, view, data) {
    appendCustomMenuMain();
    addLinkToCommunityDashboard(data.id);
 });
 
 //view_3587 RADAR Logs
 $(document).on("knack-view-render.view_3587", function(event, view, data) {
    appendCustomMenuMain();
    addLinkToCommunityDashboard(data.id);
    $('#com_radarLogs').addClass('sv-active');
 });
 
 //view_3586 Community Logs
 $(document).on("knack-view-render.view_3586", function(event, view, data) {
    appendCustomMenuMain();
    addLinkToCommunityDashboard(data.id);
 });
 
 //view_3604 Maange Access Code
 $(document).on("knack-view-render.view_3604", function(event, view, data) {
    appendCustomMenuMain();
    addLinkToCommunityDashboard(data.id);
 });
 
 //Community Units - view_3512
 $(document).on("knack-view-render.view_3512", function(event, view, data) {
    appendCustomMenuMain();
    addLinkToCommunityDashboard(data.id);
 
 });
 
 //Community Units - view_5247
 $(document).on("knack-view-render.view_5247", function(event, view, data) {
    appendCustomMenuMain();
    addLinkToCommunityDashboard(data.id);
 });

//SIDE BAR
//DASHBOARD
$(document).on("knack-view-render.view_3374", function(event, view, data) {
    appendCustomMenuMain();
    addLinkToCommunityDashboard(data.id);
    $('#com_dashboard').addClass('sv-active');
 
    $('.field_958').hide();
    $('.field_1144').hide();
    $('.field_1292').hide();
    var userIcon = `<i class="fa fa-user"></i> `;
    var phoneIcon = `<i class="fa fa-phone"></i>`;
    var emailIcon = `<i class="fa fa-inbox"></i>`;
 
    var crmName = `<p>${userIcon}<span>${data.field_958}<span></p>`;
    var crmPhone = `<p>${phoneIcon}<span>${data.field_1292}<span></p>`;
    var crmEmail = `<p>${emailIcon}<span>${data.field_1144}<span></p>`;
 
    if (data.field_958) {
        $('#crm_name').html(crmName);
    } else {
        $('#crm_name').html("");
    }
    if (data.field_1292) {
        $('#crm_phone').html(crmPhone);
    } else {
        $('#crm_phone').html("");
    }
    if (data.field_1144) {
        $('#crm_email').html(crmEmail);
    } else {
        $('#crm_email').html("");
    }
    $('#sv_survey_link').on('click', function(){
        $('#click_survey_id').click();
    })
    $('#view_3374 .field_2066').hide(); $('#view_3374 .field_2067').hide(); $('#view_3374 .field_2068').hide();
    $('#view_3374 .field_578').hide(); $('#view_3374 .field_533').hide(); $('#view_3374 .field_534').hide(); 
 
    var contactInfo = `<div class="primary-service-contact"><span class="sv-contact-info-title">Primary Service Contact</span>
    <p class="sv-cntct-info">${data.field_2066}</p>
    <p class="sv-cntct-info">${data.field_2067}</p>
    <p class="sv-cntct-info">${data.field_2068}</p>
    </div>
    <div class="escalation-contact"><span class="sv-contact-info-title">Escalation Contact</span>
    <p class="sv-cntct-info">${data.field_578}</p>
    <p class="sv-cntct-info">${data.field_533}</p>
    <p class="sv-cntct-info">${data.field_534}</p>
    </div>
    `
    $('#cntct_info_').append(contactInfo)
 
    $($('#view_3374 .kn-details-group')[8]).addClass('cm-card')
    $($('#infraction_warning').parents()[5]).addClass('cm-card')
    $('#view_last_night_service_btn').css('margin-right', '10px');
    $($($('#view_3374 .sv-button-green')[1]).parents()[4]).hide()
 });

//view_3374 Show Infraction Total Loss
$(document).on("knack-view-render.view_3374", function(event, view, data) {
    showInfractionLoss(data);
    url = new URL(window.location.href);
    if ( searchParam('hazard_id') != '' ) {
     
      setTimeout(openAddressHazard, 2000)
 
      function openAddressHazard(){
         window.location.replace(`#community-concierge/community-dashboard/${data.id}/addressed-service-hazards/${ searchParam('hazard_id') }`)
      }
    }
});

//view_3374 Service Schedule on Dashboard
$(document).on("knack-view-render.view_3374", function(event, view, data) {
    $('#today-service-schedule').html(data.field_44);
    $('.field_44').addClass('hideMe');
 });

 //view_3374 Community Information
$(document).on("knack-view-render.view_3374", function(event, view, data) {
    $('#ComAdd_ID').html(data.field_38);
    $('#ComPhone_ID').html(data.field_39);
    $('.field_38').addClass('hideMe');
    $('.field_39').addClass('hideMe');
  
    //hide extra column that has no data displayed - Kim APL
    $($("#view_3374 section.columns div.is-horizontal")[1]).addClass("hideMe");
});

//view_3374 Show Infraction Total Loss
$(document).on("knack-view-render.view_3374", function(event, view, data) {
    $('#today-service-schedule').html(data.field_44);
    $('.field_44').addClass('hideMe');
});

 //view_3516 Refresh Community Units Table when the form is submitted
$(document).on('knack-form-submit.view_3516', function(event, view, record) {
    if($('#view_3393').length){$('#view_3393 form a').click();}//Dashboard
});

//view_3378 Community Documents BTN
$(document).on("knack-view-render.view_3378", function(event, view, data) {
    $('#view_3378').hide();
    documentFunctions(data);
});

//This will click the service Id btn on the hidden list (View And Rate Last night Service)
$(document).on("knack-view-render.view_3397", function(event, view, data) {
    $('#view_3397').hide();
    //this will hide the rate last night btn if there no exising service last night;
    //june 28 update, change the condition to hide if the LAST Service is Rated
    if(data.length > 0){
      if(data[0].field_1464 == "Yes"){
          //$('#view_last_night_service_btn').addClass("hideMe");
          $('#view_last_night_service_btn').append(`&nbsp;&nbsp;&nbsp;<i style="margin-top: 5px;" class="fa fa-check-circle"></i>`);
          data[0].field_1552.includes('up') ? $('#view_last_night_service_btn').addClass('rated-icon-green') : $('#view_last_night_service_btn').removeClass('rated-icon-green') 
      }
 
      $('#view_last_night_service_btn').on('click', function() {
         $('#review_service_po').click();
      });
    }
    else{
        $('#view_last_night_service_btn').hide();
        $($('#sv_view_service_history').parents()[4]).show()
    }
 });

 $(document).on('knack-view-render.view_5101', function(event, view, data){
    var currentUrl = window.location.href;
    var currentCMRoles = Knack.session.user.profile_objects;
    var currentCMId = currentCMRoles.find(x => x.object == "object_5").entry_id;
    $('#sv_cm_popups').click(()=>{
        window.location.href = currentUrl + 'cm-active-popups/' + currentCMId;
    })
 });

 // view_5102 Community Details including the Added Popups
 $(document).on('knack-view-render.view_5102', function(event, view, data){
    currentCommunityId = data.id
    initializePopup(data)
});

//view_5448 Community Manager Dashboard Service Hazard New
$(document).on('knack-view-render.view_5448', function(event, view, data){
    $('.field_2237').hide();
    $('.field_3023').hide();
   
    function createImageContainer(){
      for(var i = 0; i < data.length; i++){
        $($($('.uploadHazardBtn')[i]).parents()[4]).hide();
        // 
        $($('.service-hazard-image-cont')[i]).append(`<div class="row"
        data-nav="thumbs" id="fotoramaDash_${i}">
        </div>`);
          //
        var notDeleted =  data[i]["field_3023_raw"].length - data[i].field_2248_raw.length;
        var sectionPhotos = data[i].field_3023;
        var combinedArray = combineImagesAndDeletedField(data[i]["field_2244.field_3023"],data[i]["field_2244.field_2248"])
        sectionPhotos = sectionPhotos.split(", ");
        $($('.service-hazard-image-cont-number')[i]).html( `${notDeleted} Photo(s)` )
        var isFirstNo = true;
        for (let t = 0; t < combinedArray.length; t++) {
          if( combinedArray[t].deleted === "No" ){
            if(isFirstNo){
              $($('.service-hazard-image-cont')[i]).prepend(`<div class="col-12"><img src="${combinedArray[t].src}" height="100px"></div>`)
              isFirstNo = false;
            }else{
              if(0 < t < 4){
                $(`#fotoramaDash_${i}`).append(`<div class="col-4"><img src="${combinedArray[t].src}" height="30px"></div>`);
              }
            }
          }
        }
      }
    }
    createImageContainer();
    $($('#view_5448 .kn-special-title')[0]).on('click', function(){
          $($('.uploadHazardBtn')[0]).click()
    })
    $($('#view_5448 .kn-special-title')[1]).on('click', function(){
          $($('.uploadHazardBtn')[1]).click()
    })
});

// view_3640
$(document).on('knack-form-submit.view_3640', function(event, view, record) {
    $('.close-modal').click();
    if( Knack.views.view_5448 ) { Knack.views.view_5448.model.fetch(); }
    if( Knack.views.view_3638 ) { Knack.views.view_3638.model.fetch(); }
});

//view_5467 Community Manager Dashboard Infraction New
$(document).on('knack-view-render.view_5467', function(event, view, data){
    $('.field_2237').hide();
    $('.field_614').hide();
    $('.field_615').hide();
    $('.field_3023').hide();
   
    function createContainer(){
      for(var i = 0; i < data.length; i++){
       $($('.infraction-image-cont')[i]).append(`<div class="fotorama row"
          data-nav="thumbs" id="fotoramaDashInfra_${i}">
          </div>`);
      }
    }
    function createImageContainer(){
      for(var i = 0; i < data.length; i++){
        $($($('.uploadInfractionBtn')[i]).parents()[4]).hide();
        // 
        $($('.infraction-image-cont')[i]).append(`<div class="row"
        data-nav="thumbs" id="fotoramaDashInfra_${i}">
        </div>`);
        var sectionPhotos = 0;
        if(data[i].field_3054 === 'Yes'){
            sectionPhotos = data[i]["field_3023_raw"]
            $($('.infraction-image-cont-number')[i]).html( `${sectionPhotos.length} Photo(s)` )
            $($('.infraction-image-cont')[i]).prepend(`<div class="col-12"><img src="${sectionPhotos[0]}" height="100px"></div>`)
   
            for(var k = 1; k < 4; k++){
              if(sectionPhotos[k]){
                $(`#fotoramaDashInfra_${i}`).append(`<div class="col-4"><img src="${sectionPhotos[k]}" height="30px"></div>`);
              }
            }
        }
        else{
          if( data[i].field_614 != '' ){ sectionPhotos = sectionPhotos + 1 }
          if( data[i].field_615 != '' ){ sectionPhotos = sectionPhotos + 1 }
          $($('.infraction-image-cont-number')[i]).html( `${sectionPhotos} Photo(s)` )
          $($('.infraction-image-cont')[i]).prepend(`<div class="col-12"><img src="${data[i].field_614_raw}" height="100px"></div>`)
   
          $(`#fotoramaDashInfra_${i}`).append(`<div class="col-4"><img src="${data[i].field_614_raw}" height="30px"></div>`);
        }
      }
    }
    createImageContainer();
   
    function addImagePreview2(){
      for (let i = 0; i < $('img').length; i++) {//This will makes the Multiple Image Upload Images Preview Full size image
        if($($('img')[i]).attr('data-kn-img-gallery') === undefined){
          $($('img')[i]).attr('data-kn-img-gallery', $($('img')[i]).attr('src'))
          $($('img')[i]).wrap('<a class="kn-img-gallery" href="#"></a>');
        }
      }
    }
   
    $($('#view_5467 .kn-special-title')[0]).on('click', function(){
          $($('.uploadInfractionBtn')[0]).click()
    })
    $($('#view_5467 .kn-special-title')[1]).on('click', function(){
          $($('.uploadInfractionBtn')[1]).click()
    })
});

//view_5816
$(document).on('knack-view-render.view_5816', function(event, view, data) {
    console.log(data)
    if(data.length > 0 && $('#q_survey').length === 0){
      $($('#infraction_warning').parents()[1]).append(`<p class="hideMe" id="q_survey" style="color: #15467A;padding-left: 10px;">
      <a style="text-decoration: none;" href="${$('#view_5816 .kn-details-link').find('a').attr('href') }">
        <i style="margin-top: 0.3em;" class="fa fa-pencil-square-o"></i> 
          Click Here to Edit my <strong style="color: #7bc245;">Q1 Trash Butler Satisfaction Survey</strong></a></p>`)
    }
});

//
$(document).on('knack-view-render.view_5833', function(event, view, data) {
    console.log(data, "view_5833")
   
    var currentCMRoles = Knack.session.user.profile_objects;
    var currentCMId = currentCMRoles.find(x => x.object == "object_5").entry_id;
    
    let waitInt1 = setInterval(() => {
      if ($('#q_survey').length > 0 ) {
        for(var i = 0; i < data.length; i++){
          // if(data[i].field_2653_raw != true){
            console.log(data[i], "view_583311111111")
            const stillVisTo = (data[i].field_2894_raw).map((b) => {return b.id});
            console.log( stillVisTo.includes(currentCMId), "currentCMId" )
            if( !stillVisTo.includes(currentCMId) ) $('#q_survey').removeClass('hideMe')
            break;
            
          // }
        }
        clearInterval(waitInt1)
      }
    }, 500);
});

// view_5840
$(document).on('knack-view-render.view_5840', function(event, view, data){ //QUARTERLY SURVEY
    //FORCE OPEN POPUP
     if(data.length > 0){
       const myInterval = setInterval(checkIfExist, 500);
    
       function checkIfExist(){
         if( $('#view_5229').length === 0 ){
         }else{
             openPopup()
             clearInterval(myInterval);
             
         }
       }
     }
     //FORCE OPEN POPUP
     for(var i = 0; i < data.length; i++){
       if(data[i].field_2653_raw == true){
         $('p.sticky').removeClass('hideMe');
         $('#sv_survey_link').removeClass('hideMe');
       }
     }
});

//Documents Btn Function helper
function documentFunctions(data){
    //docs_no_data
    !data.field_1533 & !data.field_2904 & !data.field_1534 & !data.field_1535 ? $('#docs_no_data').show() : $('#docs_no_data').hide(); 
  if (!data.field_1533) {
        $('#doc_resident_flyer_btn').addClass('hideMe'); //Resident Flyer
    }
    if (!data.field_2904) {
        $('#doc_com_flyer_btn').addClass('hideMe'); //Community Flyer
        $('#doc_com_flyer_btn').addClass('sv-no-data');
        $('#doc_com_flyer_btn_download').addClass('hideMe')
    }
    data.field_1534 ? $('#doc_cert_of_ins_btn').show() : $('#doc_cert_of_ins_btn').hide();
    if (!data.field_1535) {
        $('#doc_holiday_flyer_btn').hide(); //Holiday Flyer
    }
 
    $('#doc_resident_flyer_btn').on('click', function() { //Resident Flyer
        $('.field_1533 a').click();
    });
    $('#doc_com_flyer_btn').on('click', function() { //Community Flyer
        $('#cmFlyer').click();
    });
    $('#doc_com_flyer_btn_download').on('click', function() { //Community Flyer
        document.getElementById('cmFlyer').click()
    });
    $('#doc_cert_of_ins_btn').on('click', function() { //Certificate of Ins
        $('.field_1534 a').click();
    });
    $('#doc_holiday_flyer_btn').on('click', function() { //Holiday Flyer
        $('.field_1535 a').click();
    });
}
 
 //view_3713 Community Profile Documents BTN
 $(document).on("knack-view-render.view_3713", function(event, view, data) {
    $('#view_3713').addClass('hideMe');
    documentFunctions(data);
      var cmFlyerCloudField = data.field_2904_raw;
     $('#cmFlyer').attr('href', cmFlyerCloudField )
 });
 
 $(document).on("knack-view-render.view_5243", function(event, view, data) {
    $('#kn-scene_1908').removeClass('kn-scene').removeClass('kn-container').css('text-align', 'center')
    $('#view_5243 .field_2556').hide()
    documentFunctions(data);
    var cmFlyerCloudField = data.field_2556_raw;
    var customFlyerCloud =  `<a class="kn-button is-primary" id="cmFlyer" href="${cmFlyerCloudField}" target="_blank">Download Community Flyer</a>`
    var iframe = `<iframe src="${cmFlyerCloudField}" width="100%" height="600" style="border:none;"></iframe>`
    $('#view_5243').append(customFlyerCloud)
 });
 
 $(document).on("knack-view-render.view_2536", function(event, view, data) {
    $('#view_2536 .field_2557 img').hide()
    $('#view_2536 .field_2558 img').hide()
    $('#view_2536 .field_2559 img').hide()
    documentFunctions(data);
    var cmFlyerCloudField = data.field_2557_raw;
    var cmFlyerCloudField2 = data.field_2558_raw;
    var cmFlyerCloudField3 = data.field_2559_raw;
 
    var customFlyerCloud =  `<a class="kn-button is-primary" id="cmFlyer" href="${cmFlyerCloudField}" target="_blank">Download Contract Document</a>`
    var customFlyerCloud2 =  `<a class="kn-button is-primary" id="cmFlyer2" href="${cmFlyerCloudField2}" target="_blank">Download Contract Addendum</a>`
    var customFlyerCloud3 =  `<a class="kn-button is-primary" id="cmFlyer3" href="${cmFlyerCloudField3}" target="_blank">Download Master Agreement</a>`
 
    $('#view_2536 .field_2557 .kn-detail-body').append(customFlyerCloud)
    $('#view_2536 .field_2558 .kn-detail-body').append(customFlyerCloud2)
    $('#view_2536 .field_2559 .kn-detail-body').append(customFlyerCloud3)
 });
 
 $(document).on("knack-view-render.view_1825", function(event, view, data) {
    $('#view_1825 .field_2552 img').hide()
    $('#view_1825 .field_2495 img').hide()
    $('#view_1825 .field_2904 img').hide()
    $('#view_1825 .field_2553 img').hide()
    $('#view_1825 .field_2495 kn-detail-body span').hide()
 
    documentFunctions(data);
    var cmFlyerCloudField = data.field_2552_raw;
    var cmFlyerCloudField2 = data.field_2904_raw;
    var cmFlyerCloudField3 = data.field_2553_raw;
 
 
    if (cmFlyerCloudField != ""){
      var fileNameDotIdx = cmFlyerCloudField.lastIndexOf(".");
      var fileName = cmFlyerCloudField.substr(0, fileNameDotIdx);
 
      updatedImageUrl = fileName + ".jpg";
 
      var cloudImage = `<span><a class="kn-img-gallery" href="#"><span class=""><img data-kn-img-gallery="${updatedImageUrl}" class="nailthumb-image" src="${updatedImageUrl}"></span></a></span>`
      var customFlyerCloud =  `<a class="kn-button is-primary" id="cmFlyer" href="${cmFlyerCloudField}" target="_blank">Download Map</a>`
      
      $('#view_1825 .field_2552 .kn-detail-body').append(customFlyerCloud)
      $('#view_1825 .field_2495 .kn-detail-body').append(cloudImage)
    }
 
    if (cmFlyerCloudField2 != ""){
        var customFlyerCloud2 =  `<a class="kn-button is-primary" href="${cmFlyerCloudField2}" target="_blank">Download PDF Flyer</a>`
        $('#view_1825 .field_2904 .kn-detail-body').append(customFlyerCloud2)
    }
 
    if (cmFlyerCloudField3 != ""){
        var customFlyerCloud3 =  `<a class="kn-button is-primary" href="${cmFlyerCloudField3}" target="_blank">Download Letter</a>`
        $('#view_1825 .field_2553 .kn-detail-body').append(customFlyerCloud3)
    }
 });
 
