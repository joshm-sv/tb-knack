//view_5725 Service ID > FLEXADD https://builder.sv.knack.com/apps/trashdash/pages/scene_2013/views/view_5725/table
$(document).on('knack-view-render.view_5725', function(event, view, data) {
    $('#view_5725 .field_2241').hide()
    $('#view_5725 .field_2963').hide()
    $('#view_5725 .field_2242').hide()
    $('#view_5725 .field_2244').hide()
    $('#view_5725 .field_2250').hide()
    $('#view_5725 .field_2251').hide()
    $('#view_5725 .field_2252').hide()
    $('#view_5725 .field_146').hide()
    $('#view_5725 .field_1501').hide()
    $('#view_5725 .field_155').hide()
   
    for(var i = 0; i < data.length; i++){
      var recordType = data[i].field_2240;
      var unitData = '';
      switch (recordType) {
        case "Service Hazard":
          unitData = data[i].field_1501
          break;
        case "RADAR Log":
          unitData = data[i].field_155
          break;
        case "Resident Infraction":
          unitData = data[i].field_146
          break;
      }
      $($('#view_5725 tbody tr .field_2240 .col-2')[i]).html(unitData);
      var txt = $($('#view_5725 tbody tr .field_2240 .col-12')[i]).html();
      var link = $($('#view_5725 tbody tr')[i]).find("a:not('.kn-img-gallery')").attr("href")
      $($('#view_5725 tbody tr .field_2238 .col-12')[i]).html(`<a href=${link}><i class='fa fa-pencil'></i></a>`);
    }
   
     $('#view_5725 .flex-delete').on('click', function(){
       $($(this).parents()[3]).find(".kn-link-delete").click()
      })
   
      //nav var hidden
      $('#view_5725 .view-header').hide();
      $('#view_5725 .js-filter-menu').hide();
   });
   
   //view_5723
   $(document).on('knack-view-render.view_5723', function(event, view, data) {
    $('.field_170').hide()
    $($('.field_46 .kn-detail-body span span')[0]).append(` at ${data.field_170}` )
    $('#view_5723 .field_95').hide()
    $('#flex_service_id').html(`${data.field_95}`);
    $($('#view_5723 .flex-time-container')[0]).append( $('.kn-detail.field_122'));
    $($('#view_5723 .flex-time-container')[0]).append( $('.kn-detail.field_123'));
   });
   
   //view_5809
   $(document).on('knack-view-render.view_5809', function(event, view, data) {
    $('.field_170').hide()
    $($('.field_46 .kn-detail-body span span')[0]).append(` at ${data.field_170}` )
    $('#view_5809 .field_95').hide()
    $('#flex_service_id').html(`${data.field_95}`);
    $($('#view_5809 .flex-time-container')[0]).append( $('.kn-detail.field_122'));
    $($('#view_5809 .flex-time-container')[0]).append( $('.kn-detail.field_123'));
   });
   
   //view_5726
   $(document).on('knack-view-render.view_5726', function(event, view, data) {
    $('.field_1025').hide()
    //
    $($('#active_pilot_queue').parents()[4]).hide()
   
    var userProfKeys = Knack.session.user.profile_keys;
    var isPilot = userProfKeys.includes('profile_155')
    if(isPilot){
      $($('#active_pilot_queue').parents()[4]).show()
      $($('#view_5726 .kn-details-link a')[0]).hide()
    }
    //
    var isReviewed = data.field_1019_raw;
    $($('#view_5726 .kn-details-link')[1]).hide()
    $('#view_5726 .field_121').hide()
      var text = $($('.field_1020')[0]).text();
      text = text.substr(0,100) + '...';
   
   
    if( isReviewed ){
      var reviewClass = '';
      if(data.field_1025 == 'Pass'){
        reviewClass = 'pass-service';
      }else{
        reviewClass = 'fail-service';
      }
      $($('#view_5726 .field_1019')[0]).html(`<div><span class=${reviewClass}>${data.field_1025}</span></div>`);
   
        $($('#view_5726 .kn-details-link a')[0]).html(`<i class="fa fa-edit"></i>Edit Service ID Review`).addClass('editable-review');
        $($('#active_pilot_queue').parents()[1]).html(`<i class="fa fa-edit"></i>Edit Service ID Review`).addClass('editable-review');
   
    }else{
      $('.field_3077').hide();
      $('.field_1814').hide();
      $($('#view_5726 .field_1019')[0]).html(`<div><span class="not-reviewed">Not Reviewed Yet</span></div>`);
      // field_1020
      $($('.field_1020 span')[0]).html('No Review has been made yet.');
   
      if( data.field_121 == "Complete" ){
        $($('#view_5726 .kn-details-link a')[0]).addClass("completed-service-noreview");
        $($('#active_pilot_queue').parents()[1]).addClass("completed-service-noreview");
      }
    }
   
    if( data.field_121 != "Complete" ){
      $($('#view_5726 .kn-details-link a')[0]).addClass("disable-click");
      $($('#active_pilot_queue').parents()[1]).addClass("disable-click");
    }else{
   
    }
   });
   //view_5810
   $(document).on('knack-view-render.view_5810', function(event, view, data) {
    $('.field_1025').hide()
    //
    $($('#active_pilot_queue').parents()[4]).hide()
   
    var userProfKeys = Knack.session.user.profile_keys;
    var isPilot = userProfKeys.includes('profile_155')
    if(isPilot){
      $($('#active_pilot_queue').parents()[4]).show()
      $($('#view_5810 .kn-details-link a')[0]).hide()
    }
    //
    var isReviewed = data.field_1019_raw;
    $('#view_5810 .field_121').hide()
      var text = $($('.field_1020')[0]).text();
      text = text.substr(0,100) + '...';
   
   
    if( isReviewed ){
      var reviewClass = '';
      if(data.field_1025 == 'Pass'){
        reviewClass = 'pass-service';
      }else{
        reviewClass = 'fail-service';
      }
      $($('#view_5810 .field_1019')[0]).html(`<div><span class=${reviewClass}>${data.field_1025}</span></div>`);
   
        $($('#view_5810 .kn-details-link a')[0]).html(`<i class="fa fa-edit"></i>Edit Service ID Review`).addClass('editable-review');
        $($('#active_pilot_queue').parents()[1]).html(`<i class="fa fa-edit"></i>Edit Service ID Review`).addClass('editable-review');
   
    }else{
      $('.field_3077').hide();
      $('.field_1814').hide();
      $($('#view_5810 .field_1019')[0]).html(`<div><span class="not-reviewed">Not Reviewed Yet</span></div>`);
      // field_1020
      $($('.field_1020 span')[0]).html('No Review has been made yet.');
   
      if( data.field_121 == "Complete" ){
        $($('#view_5810 .kn-details-link a')[0]).addClass("completed-service-noreview");
        $($('#active_pilot_queue').parents()[1]).addClass("completed-service-noreview");
      }
    }
   
    if( data.field_121 != "Complete" ){
      $($('#view_5810 .kn-details-link a')[0]).addClass("disable-click");
      $($('#active_pilot_queue').parents()[1]).addClass("disable-click");
    }else{
   
    }
   
    var originalDiv = $("#view_5810");
    var cloneDiv = originalDiv.clone();
    $($(".view-group.view-group-2 .view-column-group-2")[0]).append(cloneDiv);
   });
   
   $(document).on('knack-view-render.view_5808', function(event, view, data) {
    if( screen.width > 650){
      var newUrl = Knack.url_base+'#';
        for (let i = 0; i < Knack.hash_parts.length; i++) {
            if(Knack.hash_parts[i] === "service-id--flexadd-details-mobile2"){
                newUrl = newUrl + 'service-id--flexadd-details2/'
            }else{
                newUrl = newUrl + Knack.hash_parts[i] + '/'
            }
        }
        window.location.href = newUrl+'?'+(Knack.query_string || "");
    }
    if($('#service-activity-logs').length === 0){
        $('head').append('<link rel="stylesheet" type="text/css" id="service-activity-logs" class="lazyload" href="https://strategic-visionz.github.io/knack-css/scss/ServiceIDActivityLog_UI.min.css">')
    }
   
    if($('#service-activity-logs').length === 0){
      $('head').append('<link rel="stylesheet" type="text/css" id="service-activity-logs" class="lazyload" href="https://strategic-visionz.github.io/knack-css/scss/ServiceIDActivityLog_UI.min.css">')
    }
   });
   
   function addSvTopBack(){
    var backLinkExist = setInterval(checkBackLink, 1000);
    function checkBackLink(){
        if($('.kn-back-link').html() === undefined){ }
        else{
            function addBackLink(){
                var origText = $($('.kn-back-link a')[0])[0].innerHTML
                var origLink = $($('.kn-back-link a')[0]).attr('href');
                if( Knack.query_string ){
                  origLink = origLink+'?'+(Knack.query_string || "");
                }
                var backLink = `<a style="margin-left: 10px" class="sv-top-back-link hideMe" id="sv-top-back" href=`+origLink+`><span>${origText}<span></a>`;
               if( $('.kn-view.kn-back-link').length ){ $('#kn-app-header').append(backLink); }
                $('#sv-top-back').show();
            }
            if($('#sv-top-back').length == 1){ $('#sv-top-back').remove(); addBackLink() }
            else{ addBackLink(); }
            clearInterval(backLinkExist);
        }
        var userProfKeys = Knack.session.user.profile_keys;
        var isDev = userProfKeys.includes('profile_34')
        if(isDev){
          $('#sv-top-back').removeClass('hideMe')
        }else{
          $('#sv-top-back').removeClass('hideMe')
        }
    }
   }
   
   $(document).on(`knack-scene-render.scene_2042`, function(event, view, data) {
    addSvTopBack()
   });
   
   var flexMenu = [
    {
      scene_id: 'scene_2013',
      menu_id: 'view_5741',
      all_id: 'view_5725',
      timeclock_id: 'view_5736',
      compactor_id: 'view_5737',
      radar_id: 'view_5738',
      inf_id: 'view_5739',
      haz_id: 'view_5740',
      notUpdated_id: 'view_5870',
    }
   ]
   
   flexMenu.forEach((el, index, array) => {
    $(document).on(`knack-scene-render.${el.scene_id}`, function(event, view, data) {
      if($('#service-activity-logs').length === 0){
        $('head').append('<link rel="stylesheet" type="text/css" id="service-activity-logs" class="lazyload" href="https://strategic-visionz.github.io/knack-css/scss/ServiceIDActivityLog_UI.min.css">')
      }
      addSvTopBack()
      $(`#${el.menu_id} a`).removeAttr('href');
   
      function initFlex(){
        $(`#${el.all_id}`).show()
        $(`#${el.timeclock_id}`).hide()
        $(`#${el.compactor_id}`).hide()
        $(`#${el.radar_id}`).hide()
        $(`#${el.inf_id}`).hide()
        $(`#${el.haz_id}`).hide()
        $(`#${el.notUpdated_id}`).hide()
      }
   
      function showAllActivity(){
        $(`#${el.all_id}`).show()
        $(`#${el.timeclock_id}`).hide()
        $(`#${el.compactor_id}`).hide()
        $(`#${el.radar_id}`).hide()
        $(`#${el.inf_id}`).hide()
        $(`#${el.haz_id}`).hide()
        $(`#${el.notUpdated_id}`).hide()
      }
   
      function showTimeClocks(){
        $(`#${el.all_id}`).hide()
        $(`#${el.timeclock_id}`).show()
        $(`#${el.compactor_id}`).hide()
        $(`#${el.radar_id}`).hide()
        $(`#${el.inf_id}`).hide()
        $(`#${el.haz_id}`).hide()
        $(`#${el.notUpdated_id}`).hide()
      }
   
      function showCompactors(){
        $(`#${el.all_id}`).hide()
        $(`#${el.timeclock_id}`).hide()
        $(`#${el.compactor_id}`).show()
        $(`#${el.radar_id}`).hide()
        $(`#${el.inf_id}`).hide()
        $(`#${el.haz_id}`).hide()
        $(`#${el.notUpdated_id}`).hide()
      }
   
      function showRadar(){
        $(`#${el.all_id}`).hide()
        $(`#${el.timeclock_id}`).hide()
        $(`#${el.compactor_id}`).hide()
        $(`#${el.radar_id}`).show()
        $(`#${el.notUpdated_id}`).hide()
        $(`#${el.inf_id}`).hide()
        $(`#${el.haz_id}`).hide()
      }
   
      function showNotUpdated(){
        $(`#${el.all_id}`).hide()
        $(`#${el.timeclock_id}`).hide()
        $(`#${el.compactor_id}`).hide()
        $(`#${el.radar_id}`).hide()
        $(`#${el.inf_id}`).hide()
        $(`#${el.haz_id}`).hide()
        $(`#${el.notUpdated_id}`).show()
      }
   
      function showInfractions(){
        $(`#${el.all_id}`).hide()
        $(`#${el.timeclock_id}`).hide()
        $(`#${el.compactor_id}`).hide()
        $(`#${el.radar_id}`).hide()
        $(`#${el.inf_id}`).show()
        $(`#${el.haz_id}`).hide()
        $(`#${el.notUpdated_id}`).hide()
      }
   
      function showHazards(){
        $(`#${el.all_id}`).hide()
        $(`#${el.timeclock_id}`).hide()
        $(`#${el.compactor_id}`).hide()
        $(`#${el.radar_id}`).hide()
        $(`#${el.inf_id}`).hide()
        $(`#${el.haz_id}`).show()
        $(`#${el.notUpdated_id}`).hide()
      }
   
      var userProfKeys = Knack.session.user.profile_keys;
      var isDev = userProfKeys.includes('profile_34')
   
      initFlex()
      $(`#${el.menu_id} .kn-link-5`).hide();
      if(isDev){
        if( Knack.views.view_5870.model.data.length > 0 ){ $(`#${el.menu_id} .kn-link-5`).show(); }
      }
      $(`#${el.menu_id} .kn-link-5`).css({'color':'red'});
      $(`#${el.menu_id} .kn-link-1`).addClass('flex-active').siblings().removeClass('flex-active');
   
      $(`#${el.menu_id} .kn-link-1`).on('click', function(){
        showAllActivity()
        $(`#${el.menu_id} .kn-link-1`).addClass('flex-active').siblings().removeClass('flex-active');
      });
      $(`#${el.menu_id} .kn-link-2`).on('click', function(){
        showTimeClocks()
        $(`#${el.menu_id} .kn-link-2`).addClass('flex-active').siblings().removeClass('flex-active');
      })
      $(`#${el.menu_id} .kn-link-3`).on('click', function(){
        showCompactors()
        $(`#${el.menu_id} .kn-link-3`).addClass('flex-active').siblings().removeClass('flex-active');
      })
      $(`#${el.menu_id} .kn-link-4`).on('click', function(){
        showRadar()
        $(`#${el.menu_id} .kn-link-4`).addClass('flex-active').siblings().removeClass('flex-active');
      })
      $(`#${el.menu_id} .kn-link-5`).on('click', function(){
        showNotUpdated()
        $(`#${el.menu_id} .kn-link-5`).addClass('flex-active').siblings().removeClass('flex-active');
      })
      $(`#${el.menu_id} .kn-link-6`).on('click', function(){
        showInfractions()
        $(`#${el.menu_id} .kn-link-6`).addClass('flex-active').siblings().removeClass('flex-active');
      })
      $(`#${el.menu_id} .kn-link-7`).on('click', function(){
        showHazards()
        $(`#${el.menu_id} .kn-link-7`).addClass('flex-active').siblings().removeClass('flex-active');
      })
    });
   });
   
   
   //flexTables
   var flexTables = [
    {
      view_id: 'view_5739',
      edit_col: 'col-8',
      group_name: 'Resident Infraction ID - '
    },
    //view_5737
    {
      view_id: 'view_5737',
      edit_col: 'col-6',
      group_name: 'Compactor Log ID - '
    },
    {
      view_id: 'view_5736',
      edit_col: 'col-11',
      group_name: 'Butler Timeclock ID - '
    },
    //view_5740
    {
      view_id: 'view_5740',
      edit_col: 'col-10',
      group_name: 'Service Hazard ID - '
    },
    {
      view_id: 'view_5738',
      edit_col: 'col-8',
      group_name: 'RADAR Log ID - '
    },
   ]
   
   flexTables.forEach((element, index, array) => {
    $(document).on(`knack-view-render.${element.view_id}`, function(event, view, data) {
      $(`#${element.view_id} tr.kn-table-group td`).prepend(`${element.group_name}`)
      for(var i = 0; i < $(`#${element.view_id} tbody tr`).length; i++){
        var link = $($(`#${element.view_id} tbody tr .${element.edit_col}`)[i]).find("a").attr("href")
        $($(`#${element.view_id} tbody tr .${element.edit_col}`)[i]).html(`<a href=${link}><i class='fa fa-pencil flex-table-edit'></i></a>`);
      }
        if( element.view_id == 'view_5736' ){
        }
    });
   });
   
   $(document).on('knack-view-render.view_5736', function(event, view, data) {
    
    for(var i = 0; i < data.length; i++){
      var approveText = 'Approve';
      var flaggedHtml = `Flag`
      if(data[i]["field_2252.field_2212_raw"].length != 0){
        approveText = 'Unflag & Approve';
        flaggedHtml = `<i class="fa fa-flag" style="font-size: 1.25em; margin-right: 0.4em; color: #e94c4c;"></i>`
      }
      var approveLink = $($(`#view_5736 tbody tr .col-9`)[i]).find("a").attr("href");
      var flagLink = $($(`#view_5736 tbody tr .col-10`)[i]).find("a").attr("href");
      $($(`#view_5736 tbody tr .col-9`)[i]).html(`<a href=${approveLink}>${approveText}</a>`);
      $($(`#view_5736 tbody tr .col-10`)[i]).html(`<a href=${flagLink}>${flaggedHtml}</a>`);
    }
   });
   
   //view_5728
   $(document).on('knack-view-render.view_5728', function(event, view, data) {
    $('#view_5728 .kn-details-link').hide()
    var notUpdated = data.field_359 - data.field_360;
    $('#view_5728 .field_360 .kn-detail-body span:first').text(notUpdated)
    $('#view_5728 .field_809 .kn-detail-body span:first').addClass('flex-by-numbers-green');
    data.field_1805 > 0 ? $('#view_5728 .field_1805 .kn-detail-body span:first').addClass('flex-by-numbers-red') : $('#view_5728 .field_1805 .kn-detail-body span:first').addClass('flex-by-numbers-green')
    data.field_3073 > 0 ? $('#view_5728 .field_3073 .kn-detail-body span:first').addClass('flex-by-numbers-red') : $('#view_5728 .field_3073 .kn-detail-body span:first').addClass('flex-by-numbers-green')
    $('#view_5728 .field_301 .kn-detail-body span:first').addClass('flex-by-numbers-green');
    $('#view_5728 .field_359 .kn-detail-body span:first').addClass('flex-by-numbers-green');
    notUpdated > 0 ? $('#view_5728 .field_360 .kn-detail-body span:first').addClass('flex-by-numbers-red') : $('#view_5728 .field_360 .kn-detail-body span:first').addClass('flex-by-numbers-green')
    $('#view_5728 .field_589 .kn-detail-body span:first').addClass('flex-by-numbers-green');
   
     $('#view_5728 .kn-detail.field_809').wrap(`<a href="${$($('#sv_timeclocks').parents()[1]).attr('href')}"></a>`) //Timeclock
     $('#view_5728 .kn-detail.field_1805').wrap(`<a href="${$($('#sv_bn_not_clockout').parents()[1]).attr('href')}"></a>`) //Not Clocked Out
     $('#view_5728 .kn-detail.field_3073').wrap(`<a href="${$($('#sv_bn_flag').parents()[1]).attr('href')}"></a>`) //Flag
     $('#view_5728 .kn-detail.field_301').wrap(`<a href="${$($('#sv_bn_infractions').parents()[1]).attr('href')}"></a>`) //Inf
     $('#view_5728 .kn-detail.field_359').wrap(`<a href="${$($('#sv_bn_radar').parents()[1]).attr('href')}"></a>`) //RAD
     $('#view_5728 .kn-detail.field_360').wrap(`<a href="${$($('#sv_bn_not_updated').parents()[1]).attr('href')}"></a>`) //Not Updated
     $('#view_5728 .kn-detail.field_589').wrap(`<a href="${$($('#sv_bn_hazards').parents()[1]).attr('href')}"></a>`) //Hazards
   
   });
   
   //view_5811
   $(document).on('knack-view-render.view_5811', function(event, view, data) {
    // field_809 Timeclocks
    // field_1805 Not Clocked Out
    // field_3073 Flagged T
    // field_301 Infractions
    // field_359 RADAR Logs
    // field_360 Not Updted
    // field_589 Service Hazards
    var tclockNum = data.field_809;
    var notClockedNum = data.field_1805;
    var flaggedNum = data.field_3073;
    var infNum = data.field_301;
    var radNum = data.field_359;
    var notUpdated = data.field_359 - data.field_360;
    var serHazNum = data.field_589;
    $('#view_5811 .kn-details-link').hide();
   
    $('#view_5811 .field_360 .kn-detail-body span:first').text(notUpdated)
    $('#view_5811 .field_809 .kn-detail-body span:first').addClass('flex-by-numbers-green');
    notClockedNum > 0 ? $('#view_5811 .field_1805 .kn-detail-body span:first').addClass('flex-by-numbers-red') : $('#view_5811 .field_1805 .kn-detail-body span:first').addClass('flex-by-numbers-green')
    flaggedNum > 0 ? $('#view_5811 .field_3073 .kn-detail-body span:first').addClass('flex-by-numbers-red') : $('#view_5811 .field_3073 .kn-detail-body span:first').addClass('flex-by-numbers-green')
    $('#view_5811 .field_301 .kn-detail-body span:first').addClass('flex-by-numbers-green');
    $('#view_5811 .field_359 .kn-detail-body span:first').addClass('flex-by-numbers-green');
    notUpdated > 0 ? $('#view_5811 .field_360 .kn-detail-body span:first').addClass('flex-by-numbers-red') : $('#view_5811 .field_360 .kn-detail-body span:first').addClass('flex-by-numbers-green')
    $('#view_5811 .field_589 .kn-detail-body span:first').addClass('flex-by-numbers-green');
    var timeClock_dis, notClock_dis, flg_dis, inf_dis, rad_dis, notUpdated_dis, serHaz_dis;
   
    tclockNum == 0 ? timeClock_dis = "pointer-events: none" : timeClock_dis = '';
    notClockedNum == 0 ? notClock_dis = "pointer-events: none" : notClock_dis = '';
    flaggedNum == 0 ? flg_dis = "pointer-events: none" : flg_dis = '';
    infNum == 0 ? inf_dis = "pointer-events: none" : inf_dis = '';
    radNum == 0 ? rad_dis = "pointer-events: none" : rad_dis = '';
    notUpdated == 0 ? notUpdated_dis = "pointer-events: none" : notUpdated_dis = '';
    serHazNum == 0 ? serHaz_dis = "pointer-events: none" : serHaz_dis = '';
   
    $('#view_5811 .kn-detail.field_809').wrap(`<a style="${timeClock_dis}" href="${$($('#sv_timeclocks').parents()[1]).attr('href')}"></a>`) //Timeclock
    $('#view_5811 .kn-detail.field_1805').wrap(`<a style="${notClock_dis}" href="${$($('#sv_bn_not_clockout').parents()[1]).attr('href')}"></a>`) //Not Clocked Out
    $('#view_5811 .kn-detail.field_3073').wrap(`<a style="${flg_dis}" href="${$($('#sv_bn_flag').parents()[1]).attr('href')}"></a>`) //Flag
    $('#view_5811 .kn-detail.field_301').wrap(`<a style="${inf_dis}" href="${$($('#sv_bn_infractions').parents()[1]).attr('href')}"></a>`) //Inf
    $('#view_5811 .kn-detail.field_359').wrap(`<a style="${rad_dis}" href="${$($('#sv_bn_radar').parents()[1]).attr('href')}"></a>`) //RAD
    $('#view_5811 .kn-detail.field_360').wrap(`<a style="${notUpdated_dis}" href="${$($('#sv_bn_not_updated').parents()[1]).attr('href')}"></a>`) //Not Updated
    $('#view_5811 .kn-detail.field_589').wrap(`<a style="${serHaz_dis}" href="${$($('#sv_bn_hazards').parents()[1]).attr('href')}"></a>`) //Hazards
   
   });
   //view_5729
   $(document).on('knack-view-render.view_5729', function(event, view, data) {
    if(data.field_55_raw){
      $('#view_5729 .kn-special-title h3').prepend(`<span class="flex-assigned-butlers-num">${data.field_55_raw.length} </span>`)
    }
   });
   
   //view_5812
   $(document).on('knack-view-render.view_5812', function(event, view, data) {
    if(data.field_55_raw){
      $('#view_5812 .kn-special-title h3').prepend(`<span class="flex-assigned-butlers-num">${data.field_55_raw.length} </span>`)
    }
   });
   
   //view_5729
   $(document).on('knack-view-render.view_5771', function(event, view, data) {
    $('#view_5771 .kn-details-link').hide()
    $("#view_5771").on({
      mouseenter: function () {
          $('#view_5771 .kn-details-link').show()
      },
      mouseleave: function () {
          $('#view_5771 .kn-details-link').hide()
      }
    });
   });
   
   $(document).on('knack-view-render.view_5823', function(event, view, data) {
    $('#view_5823 .kn-details-link').hide()
    $("#view_5823").on({
      click: function () {
          $('#view_5823 .kn-details-link').show()
      }
    });
   });
   
   //view_5814 List View Service ID Details > FlexAd
   $(document).on('knack-view-render.view_5814', function(event, view, data) {
    $('.field_1339 .kn-detail-body').hide();
    $('.field_2212 .kn-detail-body').hide();
    //
    for(var i = 0; i < data.length; i++){
      if( data[i].field_2240_raw == "Butler Timeclock" ){
        $($($('.flex-m-delete')[i]).parents()[3]).hide()
      }
      
    }
    //
    for(var i = 0; i < $('.flex-edit-link').length; i++){
      $($('.flex-edit-link')[i]).attr('href', $($($('.flex-edit-link')[i]).parents()[3]).find(`a:not('.flex-edit-link')`).attr('href') )
       $($($('.flex-edit-link')[i]).parents()[3]).find(`.kn-detail-body`).hide()
    }
    for(var i = 0; i < $('.flex-m-timeclock-flag').length; i++){
      var approveText = 'Approve';
      var flaggedHtml = `Flag Timeclock`;
      var approveLink = $($($('.flex-m-timeclock-approve')[i]).parents()[3]).find(`a:not('.flex-m-timeclock-approve')`).attr('href')
      var flagLink = $($($('.flex-m-timeclock-flag')[i]).parents()[3]).find(`a:not('.flex-m-timeclock-flag')`).attr('href')
      
      if( $($($('.flex-m-timeclock-flag')[i]).parents()[3]).find(`a:not('.flex-m-timeclock-flag')`).text() != 'No' ){
         $($(`.flex-m-timeclock-flag`)[i]).addClass('disable-flag');
        approveText = 'Unflag & Approve';
        flaggedHtml = `<span class=""><i class="fa fa-flag" style="font-size: 1.25em; margin-right: 0.4em; color: #e94c4c;"></i> Flagged</span>`;
      }
   
      if( $($($('.flex-m-timeclock-approve')[i]).parents()[3]).find(`a:not('.flex-m-timeclock-approve')`).text() == 'Yes' ){
          $($('.flex-m-timeclock-approve')[i]).css('pointer-events', 'none')
          approveText = `<span class=""><i class="fa fa-check-circle" style="font-size: 1.25em; margin-right: 0.4em; color: green;"></i> Timeclock Approved</span>`;
      }
   
      $($(`.flex-m-timeclock-approve`)[i]).html(`<a href=${approveLink}>${approveText}</a>`);
      $($(`.flex-m-timeclock-flag`)[i]).html(`<a href=${flagLink}>${flaggedHtml}</a>`);
    }
   });
   
   // view_5730 Desktop
   $(document).on('knack-view-render.view_5730', function(event, view, data) {
   
    $('#as_command_center_theme').remove();
    if( screen.width < 650){
      if( Knack.user.id == '611d18ecfbee5b07a16a5bd5xxxx' ){
        var newUrl = Knack.url_base+'#';
        for (let i = 0; i < Knack.hash_parts.length; i++) {
            if(Knack.hash_parts[i] === "service-id--flexadd-details2"){
                newUrl = newUrl + 'service-id--flexadd-details-mobile2/'
            }else{
                newUrl = newUrl + Knack.hash_parts[i] + '/'
            }
        }
        window.location.href = newUrl+'?'+(Knack.query_string || "");
      }else{
        var newUrl = Knack.url_base+'#';
        for (let i = 0; i < Knack.hash_parts.length; i++) {
            if(Knack.hash_parts[i] === "service-id--flexadd-details2"){
                newUrl = newUrl + 'service-id--flexadd-details-mobile2/'
            }else{
                newUrl = newUrl + Knack.hash_parts[i] + '/'
            }
        }
        window.location.href = newUrl+'?'+(Knack.query_string || "");
      }
    }
   });
   
   function getFlexAddServiceIDs(){
    return $.ajax({
        type: 'GET',
        headers: asHeader,
        url: 'https://api.sv.knack.com/v1/pages/scene_2010/views/view_5675/records',
        success: function(data) {
          var isActive = '';
          for(var i = 0; i < data.records.length; i++){
            
            if( Knack.hash_id == data.records[i].id ){ isActive = 'active' }else{ isActive = '' }
            $('#services_pool_main_container ul').append(`<li class="kn-detail-label service-pool-item ${isActive}" data-id="${data.records[i].id}">Service ID - ${data.records[i].field_95}</li>`)
          }
   
          $('.service-pool-item').on('click', function(){
              var id = $( this ).attr('data-id');
              window.location.href = Knack.url_base+'#'+Knack.hash_parts[0]+'/service-id--flexadd-details2/'+id + (Knack.query_string || "");
          })
        }
    });
   }
   
   var serviceQueueINIT = [
      { 'v_id': 'view_5851', 'review_view_id': 'view_5810', 'serv_title_view_id': 'view_5808' }, //Mobile Version https://builder.sv.knack.com/apps/trashdash/pages/scene_2042/views/view_5851/menu
      { 'v_id': 'view_5964', 'review_view_id': 'view_5726', 'serv_title_view_id': 'view_5730' },
   ]
   for (let i = 0; i < serviceQueueINIT.length; i++) {
      $(document).on(`knack-view-render.${serviceQueueINIT[i].v_id}`, function(event, view, data) {
        //add css
        $('#services_quickqueue').removeClass('hideMe')
        $('#flex_reviewed_queue_count').remove();
        if( $('#phase_one_test_theme').length === 0 ){
            $('head').append('<link rel="stylesheet" type="text/css" id="phase_one_test_theme" class="lazyload" href="https://cream-stitch-bagel.glitch.me/style.css">')
        }
        getFlexServices(serviceQueueINIT[i].v_id, true, serviceQueueINIT[i].review_view_id, serviceQueueINIT[i].serv_title_view_id)
        var review_data = [];
        if(Knack.flexServices){ review_data = Knack.flexServices }
        //
        $(`#${serviceQueueINIT[i].v_id}`).hide()
        var url = window.location.href
        var url = url.split(`?`)[0] +`start-new-filter/`
        $($(`#${serviceQueueINIT[i].v_id} a`)[0]).attr(`href`, url+Knack.hash_id);
   
        var review_data = JSON.parse(sessionStorage.getItem("review_data")) || [];
        Knack.service_review_data = review_data;
        
        if(review_data.length > 0){
              var reviewedCount = 0;
              Knack.reviewedCount = 0;
              var viewingCount = 1;
              $.each(review_data, function(index, value) {
                  if (value.field_1025 !== "") {
                    reviewedCount++;
                    Knack.reviewedCount = Knack.reviewedCount + 1;
                  }
                  if(value.id === Knack.hash_id){
                    viewingCount = viewingCount + index;
                  }
              });
            $($(`#${serviceQueueINIT[i].v_id} span`)[1]).text(`Viewing ${viewingCount}/${Knack.service_review_data.length} in Queue`).addClass('queue-element')
             if( $('#flex_reviewed_queue_count').length === 0 ){
                $(`#${serviceQueueINIT[i].v_id}`).append(`<div id="flex_reviewed_queue_count" class="review-count-num"><span class="queue-element">Reviewed <span class="num">${reviewedCount}</span>/<span class="den">${Knack.service_review_data.length}</span></span></div>`)
             }else{
                $(`#flex_reviewed_queue_count .num`).text(`${reviewedCount}`)
             }
              $(`#kn-app-mobile-container`).append($(`#${serviceQueueINIT[i].v_id}`));
              $(`#${serviceQueueINIT[i].v_id}`).show()
          flexQueue_getCurrentActiveFilter()
          $('#flex_return_active_queue').on('click', function(){
            window.location.href = Knack.url_base+'#'+Knack.hash_parts[0]+'/service-id--flexadd-details-mobile2/'+Knack.flexServices[0].id+'?'+(Knack.query_string || "");
          })
            
        } else {
        }
      });
   }
   
   
   $(document).on('knack-view-render.view_5867', function(event, view, x) {
    var data = JSON.parse(sessionStorage.getItem("review_data")) || [];
    var filters = JSON.parse(sessionStorage.getItem("review_data_active_filters")) || [];
    if(filters.length > 0){
      var filterViewId = filters[1].view_id;
    var filterSceneId = filters[1].scene_id;
    var filters = filters[0]
    $('.modal-card-title').text('Manage Active Queue');
    var queueFirst = `<div class="refresh-cancel-btns row">
    <div class="col col-lg-6"></div>
    <div class="col col-lg-3">
    <p class="text-grn" id="refresh_queue"><i class="fa fa-refresh" aria-hidden="true"></i>Refresh Queue</p>
    </div>
    <div class="col col-lg-3">
    <p class="text-red" id="cancel_queue"><i class="fa fa-times-circle-o" aria-hidden="true"></i>Cancel Queue</p>
    </div>
    </div>`;
    var queueSec = `<div class="reviewed-count">
    <h3>${Knack.reviewedCount}/${data.length} Reviewed</h3>
    </div>
    <div class="active-filters hideMe">
    <p> <span class="blue">Active Filters:</span> <span class="blue-paragraph">1/30/23</span><span
    class="spacer">,</span> <span class="green">Completed</span><span class="spacer">,</span> <span
    class="red">Not Reviewed</span> </p>
    </div>
    <div class="text-instructions">
    <p>From this screen, you can quickly navigate the Active Queue or Cancel the Active Queue</p>
    </div>`;
    $('#view_5867').prepend(queueSec);
    $('#view_5867').prepend(queueFirst);
    if(Knack.flexServices){
      data = Knack.flexServices;
    }
    if( Knack.flex_queue_params ){
      window.location.href = window.location.href+'?'+Knack.flex_queue_params;
      Knack.flex_queue_params = undefined;
    }
    $('#view_5867 .service-pool-item').remove();
    $('#view_5867 .kn-entries-summary').remove()
    $('#view_5867 .kn-list-content').remove()
    if( $('#services_pool_main_container_currentFilter').length === 0 ){
      $('#view_5867').append('<div id="services_pool_main_container_currentFilter"></div>');
    }
    var isActive;
    for(var i = 0; i < data.length; i++){
      if( Knack.hash_id == data[i].id ){ isActive = 'flex-queue-current-service' }else{ isActive = '' }
      var iconNotReviewed = 'fa-circle-thin';
      var iconReviewed = 'fa-check-circle';
      var icon;
      if(data[i].field_1025 == ""){
        icon = iconNotReviewed;
      }else{
        icon = iconReviewed;
      }
      var cardItem;
      cardItem = `<div class="card-holder row ${isActive}">
        <div class="col col-lg-1">
        <i class="fa ${icon}" aria-hidden="true"></i>
        </div>
        <div class="col col-lg-3">
        <p class="kng-ttl">${data[i].field_54}</p>
        <p class="ttle-dt"> ${data[i].field_46} - ${data[i].field_95}</p>
        <p class="status-text">${data[i].field_121}</p>
        </div>
        <div class="col col-lg-5 time-holder">
        <p class="complete-time">Started at: ${data[i].field_122}</p>
        <p class="complete-time">Completed at: ${data[i].field_123}</p>
        </div>
        <div class="col col-lg-3 btn-holder">
        <button data-id="${data[i].id}" class="btn-go service-pool-item">Go to ID</button>
        <p>${data[i].field_1025}</p>
        </div>
        <i style="cursor:pointer;" data-id="${data[i].id}" class="fa fa-trash delete-queue-item" aria-hidden="true"></i>
        </div>`;
      if( Knack.isMobile() ){
        cardItem = `<div class="card-holder row ${isActive}">
          <div class="col col-12" style="text-align: center;">
            <i class="fa ${icon}" aria-hidden="true"></i>
            <span class="kng-ttl">${data[i].field_54}</span>
            <span>${data[i].field_1025}</span>
          </div>
          <div class="col col-6">
            <span class="status-text">${data[i].field_121}</span>
            <span class="ttle-dt"> ${data[i].field_46} - ${data[i].field_95}</span>
          </div>
          <div class="col col-6 time-holder" style="display: inline-grid;">
            <span class="complete-time">Started at: ${data[i].field_122}</span>
            <span class="complete-time">Completed at: ${data[i].field_123}</span>
          </div>
          <div class="col col-12 btn-holder">
            <button style="width: 100%;" data-id="${data[i].id}" class="btn-go service-pool-item">Go to ID</button>
          </div>
        </div>`;
      }
      $('#services_pool_main_container_currentFilter').append(cardItem);
    }
   
    $('.service-pool-item').on('click', function(){
        var url = window.location.href;
        Knack.flex_queue_params = url.split('?')[1];
        var id = $( this ).attr('data-id');
        window.location.href = Knack.url_base+'#'+Knack.hash_parts[0]+'/service-id--flexadd-details-mobile2/'+id;
    })
   
    $('.delete-queue-item').on('click', function(){
        flexQueue_loading();
        var id = $( this ).attr('data-id');
        flexQueue_removeQueueItem(id)
        $('.close-modal').click();
        setTimeout(function() {
        Knack.router.scene_view.renderViews()
        }, 300); 
    })
   
    $('#cancel_queue').on('click', function(){
      flexQueue_loading()
      $('.close-modal').click();
      sessionStorage.removeItem("review_data");
      sessionStorage.removeItem("review_data_active_filters");
      sessionStorage.removeItem("flex_queue_started");
      $('#flex_queue_sibar').remove()
      $('#services_quickqueue').remove()
      $($('#flex_reviewed_queue_count').parents()[0]).remove()
      $('#sv-top-back').click();
      setTimeout(function() {
        window.location.href = $('#sv-top-back').attr('href')
      }, 100);
    })
   
    $('#refresh_queue').on('click', function(){
      flexQueue_loading();
      var href = $('#view_5964 .kn-link-1').attr('href');
      return $.ajax({
        type: 'GET',
        headers: asHeader,
        url: `https://api.sv.knack.com/v1/pages/${filterSceneId}/views/${filterViewId}/records?filters=${encodeURIComponent(JSON.stringify(filters))}&page=1&rows_per_page=99`,
        success: function(newData) {
            sessionStorage.setItem("review_data", JSON.stringify(newData.records));
            $('.close-modal').click();
            $('#flex_reviewed_queue_count').remove();
            setTimeout(function() {
                Knack.router.scene_view.renderViews()
            }, 100);
        }
      });
    })
    }
   
   });
   
   $(document).on('knack-form-submit.view_5732', function(event, view, record) {
      $('.close-modal').click();
      setTimeout(function() {
          window.location.href = $('#sv-top-back').attr('href')
      }, 1000);
   });
   
   //Dev Service Queuw 
   $(document).on('knack-form-submit.view_5874', function(event, view, record) {
    Knack.router.scene_view.renderViews()
    var review_data = JSON.parse(sessionStorage.getItem("review_data"));
    $.each(review_data, function(index, value) { //Need to change
        if (value.id === record.id ) {
          value.reviewed = true;
          value.field_1025 = record.field_1025;
          value.field_1025_raw = record.field_1025_raw;
          return false;
        }
    });
    sessionStorage.setItem("review_data", JSON.stringify(review_data));
    if( Knack.flex_justClose ){
      $('.close-modal').click();
      setTimeout(function() {
        Knack.router.scene_view.renderViews()
      }, 1000);
    }
    else if(Knack.nextReviewId !== null){
      window.location.href = Knack.flex_next_service_link;
    }
    else{
      $('.close-modal').click();
    }
   });
   
   //view_5864 - Current LIVE - https://builder.sv.knack.com/apps/trashdash/pages/scene_2014/views/view_5864/rich_text
   $(document).on('knack-view-render.view_5864', function(event, view, data) {
    //retrieve review_data from session storage
    var review_data = JSON.parse(sessionStorage.getItem("review_data"));
    Knack.nextReviewId = null;
    Knack.flex_can_proceed_next = true;
    Knack.flex_next_service_link = null;
      for (var i = 0; i < review_data.length; i++) {
        if (review_data[i].id !== Knack.hash_id && review_data[i].reviewed === false) {
            Knack.nextReviewId = review_data[i].id;
            Knack.flex_can_proceed_next = true;
            Knack.flex_next_service_link = 'https://apps.sv.knack.com/trashdash#service-activity-logs/service-id--flexadd-details-mobile2/'+review_data[i].id;
            break;
        }
    }
   
    if( Knack.nextReviewId === null ){
      $('#view_5864').hide()
    }
   
    $('#view_5864 button').on('click', function(){
      $('#view_5732 form').submit();
    })
   });
   
   function getFlexServices(view_id, canCreate, review_view_id, serv_title_view_id){
    var review_data = JSON.parse(sessionStorage.getItem("review_data")) || [];
    for (var i = 0; i < review_data.length; i++) {
      if (review_data[i]["id"] === Knack.hash_id) {
        if(review_view_id != "view_5874") review_data[i]["field_1025"] = Knack.views[review_view_id].record.field_1025;
        else{
          review_data[i]["field_1025"] = Knack.views.view_5874.model.attributes.field_1025;
        }
        break;
      }
    }
    // Store the updated data back into the local storage
    sessionStorage.setItem("review_data", JSON.stringify(review_data));
   
    Knack.flexServices = review_data;
    Knack.nextReviewId = null;
    Knack.flex_next_service_link = null;
   
    // Find the index of the current service ID
    const currentServiceId = Knack.hash_id;
    const currentIndex = review_data.findIndex(service => service.id === currentServiceId);
   
    // Get the previous service ID
    let previousServiceId;
    if (currentIndex > 0) {
        previousServiceId = review_data[currentIndex - 1].id;
    } else {
        previousServiceId = null;
    }
   
    // Get the next service ID
    let nextServiceId;
    if (currentIndex < review_data.length - 1) {
        nextServiceId = review_data[currentIndex + 1].id;
    } else {
        nextServiceId = null;
    }
   
    Knack.flex_nextServiceId = nextServiceId;
    Knack.flex_previousServiceId = previousServiceId;
    if(canCreate){
       createFlexAddServiceNavigation(serv_title_view_id);
    }
   
   }
   
   function getUrlNextPrev(id){
    var newUrl = '#';
    var urlWithoutHashId = '#'
    for (let i = 0; i < Knack.hash_parts.length; i++) {
        if(Knack.hash_parts[i] === Knack.hash_id){
          //service-id--flexadd-details-mobile2 service-id--flexadd-details2
            newUrl = newUrl + id+'/';
        }else{
            newUrl = newUrl + Knack.hash_parts[i] + '/'
            urlWithoutHashId = urlWithoutHashId + Knack.hash_parts[i] + '/'
        }
    }
    if(Knack.query_string){
          newUrl = newUrl+'?'+(Knack.query_string || "");
    }
    Knack.urlWithoutHashId = urlWithoutHashId;
    return newUrl;
   }
   
   function createFlexAddServiceNavigation(v_id){
   if( $('.previous-service-id').length === 0 ){
      $(`#${v_id} h2`).prepend(`<a href="#" class="previous-service-id"><i class="fa fa-chevron-circle-left"><i/></a>`)
   }
   if( $('.next-service-id').length === 0 ){
    $(`#${v_id} h2`).append(`<a href="#" class="next-service-id"><i class="fa fa-chevron-circle-right"><i/></a>`)
   }
    $(`#${v_id} h2`).css({
      "display": "flex",
      "justify-content": "space-between"
    });
   
    // Update the previous service ID arrow
    if (Knack.flex_previousServiceId) {
        $(".previous-service-id").attr("href", getUrlNextPrev(Knack.flex_previousServiceId));
    } else {
        $(".previous-service-id").addClass("flex-disabled");
    }
   
    // Update the next service ID arrow
    if (Knack.flex_nextServiceId) {
        $(".next-service-id").attr("href", getUrlNextPrev(Knack.flex_nextServiceId));
    } else {
        $(".next-service-id").addClass("flex-disabled");
    }
   }
   
   //view_5875 DEV ONLY - Submit and Proceed Btn
   $(document).on('knack-view-render.view_5875', function(event, view, data) {
    var review_data = JSON.parse(sessionStorage.getItem("review_data")) || [];
    Knack.flexServices = review_data;
    for (var i = 0; i < review_data.length; i++) {
      if (review_data[i].id == Knack.hash_id) {
        if(review_data.length == 1+i){
          $('#view_5875 button').text('Submit Review & Go to Services Page')
          Knack.nextReviewId = 'X';
          Knack.flex_next_service_link = $('#sv-top-back').attr('href');
          break;
        }else{
          Knack.nextReviewId = review_data[i+1].id;
          Knack.flex_next_service_link = Knack.url_base+'#'+Knack.hash_parts[0]+'/service-id--flexadd-details2/'+review_data[i+1].id + '?'+(Knack.query_string || "");
          break;
        }
      }
    }
   
    if( review_data.length < 2 ){
      Knack.flex_justClose = true;
      $('#view_5875 button').text('Submit Review')
    }else{
       $('#view_5875').append('<a id="flex_just_close">or Just Submit and Close this Form</a></div>')
    }
   
    $('#flex_just_close').on('click', function(){
        flexQueue_loading()
        Knack.flex_justClose = true;
        $('#view_5874 form').submit();
    })
   
    $('#view_5875 button').on('click', function(){
        flexQueue_loading()
        Knack.flex_justClose = false;
        $('#view_5874 form').submit();
    })
   });
   
   
   // Service IDs Table/List > FlexAdd Records
   function getMoreServiceIDs(v_id, i){
    var filters = Knack.views[v_id].model.view.filters;
    var currentScene = Knack.router.current_scene_key
    return $.ajax({
      type: 'GET',
      headers: asHeader,
      url: `https://api.sv.knack.com/v1/pages/${currentScene}/views/${v_id}/records?filters=${encodeURIComponent(JSON.stringify(filters))}&page=1&rows_per_page=99`,
      success: function(data) {
        $('#flex_loading_btn_test').html('DATA IS LOADED')
        var data = data.records;
        var newData = data;
        Knack.flexServices = data;
        Knack.service_review_data = newData;
        var activeFilters = Knack.views[v_id].model.view.filters.rules || [];
        var viewDataSource = Knack.views[v_id].model.view.source.criteria.rules;
        var serviceObjectAttr = Knack.objects.models.filter(item => item.id === "object_9")[0].attributes.fields;
        for (let i = 0; i < viewDataSource.length; i++) {
            var fieldName;
            if(!viewDataSource[i].field_name){
                fieldName = serviceObjectAttr.filter(item => item.key === viewDataSource[i].field)[0].name;
                viewDataSource[i].field_name = fieldName
            }
        }
        activeFilters = activeFilters.concat(viewDataSource);
        
        Knack.queue_service_views[v_id] = {
          "filters": activeFilters,
          "data": newData
        }
        if( data.length > 0 ){ 
          $($(`#${serviceIdsFlexAdd[i].v_id} .kn-records-nav .level`)[0]).append(`<div class="sv-flex-table-start-queue-btn"
          "><a class="sv-flex-table-start-queue-link" 
          href="#${Knack.home_slug}/service-id--flexadd-details-mobile2/${newData[0].id}/?${(Knack.query_string || "")}"
          >Start Service Queue</a></div>`)
        }else{
          $(`${v_id} .sv-flex-table-start-queue-link`).hide()
        }
   
        if( Knack.isMobile() ){
          $('.sv-flex-table-start-queue-btn').css({
              "text-align": "center",
              "margin-top": "1.2em",
              "margin-bottom": "1.5em"})
        }
   
        $(`#${v_id} .sv-flex-table-start-queue-link`).on('click', function(){
          Knack.current_view_queue = v_id;
          var viewData = Knack.queue_service_views[v_id].data;
          var viewFilter = Knack.queue_service_views[v_id].filters;
          var d = new Date();
          var localtime = d.toLocaleTimeString('en-US', { hour12: true });
          Knack.flexQueueStartAt = localtime;
          for (let i = 0; i < viewData.length; i++) {
            viewData[i].current_queue_isReviewed = false;
          }
          viewFilter = [viewFilter, {"view_id": v_id, "scene_id": currentScene}]
          sessionStorage.setItem("review_data", JSON.stringify(viewData));
          sessionStorage.setItem("review_data_active_filters", JSON.stringify(viewFilter));
          sessionStorage.setItem("flex_queue_started", JSON.stringify(localtime));
        })
      }
    });
   }
   
   var serviceIdsFlexAdd = [ //This array is used for Starting a Queue
      { 'v_id': 'view_5958' },
      { 'v_id': 'view_5966' },
      { 'v_id': 'view_5998' },//First Phase View
      { 'v_id': 'view_5999' },//First Phase View with DS
      { 'v_id': 'view_6000' },//QuickQueue List view https://builder.sv.knack.com/apps/trashdash/pages/scene_2079
      { 'v_id': 'view_6001' },//QuickQueue List view https://builder.sv.knack.com/apps/trashdash/pages/scene_2079
      { 'v_id': 'view_6002' },//QuickQueue List view https://builder.sv.knack.com/apps/trashdash/pages/scene_2079
      { 'v_id': 'view_6003' },//QuickQueue List view https://builder.sv.knack.com/apps/trashdash/pages/scene_2079
      { 'v_id': 'view_6019' },//Queue Pilot Test Page https://builder.sv.knack.com/apps/trashdash/pages/scene_2086
      { 'v_id': 'view_6016' },//Queue Pilot Test Page https://builder.sv.knack.com/apps/trashdash/pages/scene_2086
      { 'v_id': 'view_6020' },//Queue Pilot Test Page https://builder.sv.knack.com/apps/trashdash/pages/scene_2086
      { 'v_id': 'view_6021' },//Queue Pilot Test Page https://builder.sv.knack.com/apps/trashdash/pages/scene_2086
      { 'v_id': 'view_5850' },//Late Service > Flex Testing
   ]
   for (let i = 0; i < serviceIdsFlexAdd.length; i++) {
    if(!Knack.queue_service_views){
      Knack.queue_service_views = []
    }
    $(document).on(`knack-view-render.${serviceIdsFlexAdd[i].v_id}`, function(event, view, data) {
        getMoreServiceIDs(serviceIdsFlexAdd[i].v_id, i);
    });
   }
   
   //views array
   var servicesPerRole = [
    'view_5970', //Staff
    'view_5976', //TM
    'view_5977', //FOQM
    'view_5971', //AS
   ]
   
   //getServiceData
   function getServiceData(view_id, filter, title, btnId, id){
    return $.ajax({
      type: 'GET',
      headers: asHeader,
      url: `https://api.sv.knack.com/v1/pages/scene_2079/views/${view_id}/records?rows_per_page=99&filters=${encodeURIComponent(JSON.stringify(filter))}&sort_field=field_95&sort_order=desc`,
      success: function(data) {
        $(`#${btnId}`).prop('disabled', false)
        Knack[`${id}`] = data;
      }
    });
   }
   
   //End FlexAdd QuickQueue
   
   //queues functions
   function initQueues(){
    var review_data = [];
    sessionStorage.setItem("flexQueu_review_data", JSON.stringify(review_data))
    Knack.flexQueu_review_data = []
   } //
   
   function flexQueue_getQueuesData(){} //API
   
   function flexQueue_getQueuesDataFromLocal(){} //Session Storage
   
   function flexQueue_refreshQueues(){} //
   
   function flexQueue_setSessionQueuesData(){} //
   
   function flexQueue_createComponents(){}//
   
   function flexQueue_removeQueueItem(id){
    var review_data = JSON.parse(sessionStorage.getItem("review_data"));
    var newData = $.grep(review_data, function(item) {
      return item.id !== id;
    });
    sessionStorage.setItem("review_data", JSON.stringify(newData));
   }//
   
   function flexQueue_countRecords(data){
    if(data.length > 0){
    var reviewedCount = 0;
    Knack.reviewedCount = 0;
    var viewingCount = 1;
    $.each(data, function(index, value) {
      if (value.field_1025 !== "") {
        reviewedCount++;
        Knack.reviewedCount = Knack.reviewedCount + 1;
      }
      if(value.id === Knack.hash_id){
        viewingCount = viewingCount + index;
      }
    });
    }
   }
   
   function flexQueue_updateComponent(className, data){
    $(`.${className}`).text(data)
    
   }//
   
   //queue-element
   function flexQueue_loading(className, data){
    $(`.queue-element`).text('Loading...')
   }//
   
   function flexQueue_getCurrentActiveFilter(){
    var review_data_active_filters = JSON.parse(sessionStorage.getItem("review_data_active_filters")) || [];
    try{
      var filters = review_data_active_filters[0];
      if( filters.length > 0 ){
        var str = '';
        for (var i = 0; i < filters.length; i++) {
          var obj = filters[i];
            str += obj["field_name"] + ' ' + obj["operator"] + ' ' + obj["value"] + ', ';
            
        }
      }
    }
    catch(err){
    }
   }