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
