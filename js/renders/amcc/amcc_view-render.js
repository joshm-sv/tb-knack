var ASclock;
var currentEstDT = new Date();
var currentDate = currentEstDT.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', timeZone: 'America/New_York' });
currentEstDT = currentEstDT.toLocaleString('en-US', {timeZone: 'America/New_York'}).replace(",","");
currentEstDT = new Date(currentEstDT);
var endServiceDate = new Date(currentDate+" 6:00:00 AM");
var timeDiff = endServiceDate - currentEstDT;
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

//view_4192 Dashboard
$(document).on("knack-view-render.view_4193", function(event, view, data) {
   $('#view_4193').hide();
});
var showPopUpAs = true;
var getLateServicesLoaded = false;
function getLateServices(){
 if(Knack.session.user && !getLateServicesLoaded){
   var myVar = setInterval(refreshInterval, 30000);
   function refreshInterval(){
     return $.ajax({
       type: 'GET',
       headers: asHeader,
       url: 'https://api.sv.knack.com/v1/pages/scene_1437/views/view_4069/records',
       success: function(data) {
         as_lateNotif(data.records)
       }
     });
   }
 }else{
   $('#as_late_notif')
 }
}

function addCustomMenuSv(){
    var menuList =  [
 /*    {	title: 'Clock In Page',
        icon: "",
        link: Knack.url_base+"#area-command-center/"
    },*/
    {	title: 'Pre-Service Dashboard',
        icon: "",
        link: Knack.url_base+"#area-command-center/dashboards/pre-service-dashboard/"
    },{	title: 'In-Service Dashboard',
        icon: "",
        link: Knack.url_base+"#area-command-center/dashboards/in-service-dashboard"
    },{	title: 'Post-Service Dashboard',
        icon: "",
        link: Knack.url_base+"#area-command-center/dashboards/post-service-dashboard/"
    },{	title: 'View All Workflows',
        icon: "",
        link: Knack.url_base+"#area-command-center/dashboards/view-all-workflow/"
    },{	title: 'Quick Links',
        icon: "",
        link: Knack.url_base+"#area-command-center/dashboards/quick-links/"
    },{	title: 'My Profile',
        icon: "",
        link: Knack.url_base+"#area-command-center/dashboards/my-profile/"
    }
    ,
    {	title: `Switch to Butler View`,
        icon: "fa-exchange",
        link: Knack.url_base+"#butler/"
    }
    ]
    var list = ``;
    for (let i = 0; i < menuList.length; i++) {
      var icon = `<i style="margin-top: 3px;" class="fa ${menuList[i].icon}"></i>`;
    //   var icon = ''
      list = list + `<li><a href=${menuList[i].link} class="sv-cm-navbar"><span class="custom-menu-text">${icon}  ${menuList[i].title}</span></a></li>`;  
    }
    Knack.navList = list;
    var customMenu = `<ul id="custom_menu_id" style="list-style-type:none;">${list}</ul>`;
    if($('#custom_menu_id').length === 0){ $('#kn-mobile-menu').append(customMenu); }
    if(!isButler){
        $($('#custom_menu_id li')[6]).remove()
    }else{
        $($('#custom_menu_id li a')[6]).attr("target","_blank");
        // $($('#custom_menu_id li')[6]).remove() //Not yet live
    }
}
 //scene_1417 Hide other views (used for linked page) in the CLOCK IN PAGE
 $(document).on("knack-scene-render.scene_1417", function(event, scene) {
    $('#view_3808').hide();
    $('#view_3823').hide();
    $('#view_3825').hide();
 });
 
 //view_3825 User Butler List hide
 $(document).on("knack-view-render.view_3825", function(event, view, data) {
    $('#view_3825').hide();
 });

//view_3924 Clock in
var clockRunning = false;
$(document).on("knack-view-render.view_3924", function(event, view, data) {
 window.location.href = Knack.url_base + '#area-command-center/dashboards/'
});
//view_3956 AS Clock In Record For Today
$(document).on("knack-view-render.view_3956", function(event, view, data) {
     $('.kn-action-link').hide();
       $('#view_3956 .kn-action-link').on("click", function(){
           Knack.views.view_4193.model.fetch();
           ASclock = undefined;
           $('#as_clock_status').remove();
         })
         $('.field_1176').hide(); $('.field_1190').hide();
         if(data.length > 0 ){
           var clockedInText = 'You are already clocked in at <br><span class="svClockIn">' +data[0].field_1176+'</span>';
           var newTxt = `<br><div><h3 class="kn-title">Ready to Clock Out?</h3><hr><div>Have you verified that all services are completed and all Butlers have properly clocked out?</div></div>`;
           var nt2 = `<div id="clock_out"><p class="as-ready-out-main as-sub">YES, I'M READY TO CLOCK OUT →</p></div>`
           $('.as_is_clocked_in').html(clockedInText + newTxt + nt2);
         }
     $('#clock_out').on('click', function(){
         $('#clock_out').hide();
           $('.kn-action-link').show();
       })
        
});
//view_3856 Butler Timeclock Details - click to view hide link popup if timeclock is 0
$(document).on("knack-view-render.view_3856", function(event, view, data) {
   try{ 
   $('#view_3856').attr('service-id', data.id)
   $('#view_3856').attr('area-id', data.field_485_raw[0].id)
   $('#view_3856').attr('com-id', data.field_54_raw[0].id)
   data.field_809 === 0 ? $('#view_3856 .kn-details-link').hide() : $('#view_3856 .kn-details-link').show();}
   catch(err){ console.log(err) }
});

//view_3958 Preservice Dashboard Service IDs
$(document).on("knack-view-render.view_3958", function(event, view, data) {
   $('#view_3958').hide();
});

//view_3959  Preservice Dashboard New Butlers
$(document).on("knack-view-render.view_3959", function(event, view, data) {
   $('#view_3959').hide();
});

//view_3960  Preservice Dashboard Support Tickets
$(document).on("knack-view-render.view_3960", function(event, view, data) {
   $('#view_3960').hide();
});


var serviceIDsharedViews = [
 'view_3850', 'view_4732', 'view_4760'
]
//view_3850 Review Service ID List Data Source (Service IDs > Area)
serviceIDsharedViews.forEach((view_id, idx) => {
 $(document).on("knack-view-render."+view_id, function(event, view, data) {
   $('.field_1025').hide(); $('.field_46').hide(); $('.field_121').hide();
   $('.field_300').hide();
   $('.field_359').hide(); $('.field_170').hide(); //realService Schedule Time
   for (let i = 0; i < data.length; i++) {
     var classService;
     //if time started override have data > hide the original time started field
     data[i].field_793 == '' ? $($('.field_793')[i]).hide() : $($('.field_122')[i]).hide() ;
     data[i].field_1929 == '' ? $($('.field_1929')[i]).hide() : $($('.field_265')[i]).hide() ;
     if(data[i].field_121 == 'Complete'){ classService = "sv-pass" }
     else if(data[i].field_121 == 'Pending'){ classService = "sv-fail"; }
     else{ classService = "sv-not-reviewed" }
     if(data[i].field_1025 == ""){
       $($('.as_service_id_pass_fail')[i]).html("Not Reviewed").addClass("sv-not-reviewed").addClass("sv-stats");
       $($('.as_edit_review')[i]).hide();
       $($('.as_start_review')[i]).show();
     }
     if(data[i].field_1025 == "Fail"){ 
       $($('.as_service_id_pass_fail')[i]).html("Failed").addClass("sv-fail").addClass("sv-stats");
       $($('.as_edit_review')[i]).show();
       $($('.as_start_review')[i]).hide();
     }
     if(data[i].field_1025 == "Pass"){ 
       $($('.as_service_id_pass_fail')[i]).html("Passed").addClass("sv-pass").addClass("sv-stats"); 
       $($('.as_edit_review')[i]).show();
       $($('.as_start_review')[i]).hide();
     }
     data[i].field_300 === 0 ? $($('.kn-list-item-container')[i]).find('.field_362').hide() : $($('.kn-list-item-container')[i]).find('.field_362').show();
     if(data[i].field_121 != "Complete"){ $($('.as_edit_review')[i]).prop('disabled', true); $($('.as_start_review')[i]).prop('disabled', true); 
                                         $($('.as_edit_review')[i]).addClass('disabledButtons'); $($('.as_start_review')[i]).addClass('disabledButtons'); } 
     else{ $($('.as_edit_review')[i]).removeClass('disabledButtons'); $($('.as_start_review')[i]).removeClass('disabledButtons'); }

     var serviceStatus =`<span class="as-service-status ${classService}">Status: ` +data[i].field_121+`</span>`;
     var serviceTimeDate = data[i].field_46 + ` - ` +data[i].field_170;
     var radarLogsText =  data[i].field_360+ '/' +data[i].field_300;
     $($($('.field_360')[i]).children('div')[1]).children('span').html(radarLogsText);
     $($('.as-service-date-time')[i]).html(serviceStatus+' <br> '+serviceTimeDate);
   }
 });
})

//view_3925
$(document).on("knack-view-render.view_3925", function(event, view, data) {
    $('.as_number_of_service_today').html(data.length);
    $('#view_3925').hide();
});