var asHeader = {
'X-Knack-Application-Id': Knack.application_id,
"X-Knack-REST-API-Key": window.knackRestApiKey,
'Authorization': Knack.getUserToken()
};
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

// This will check if the current logged in user have a butler role
var userObjectRoles;
var isButler;

//Theme Append//
//This is the list of all SCENE IDs for the Area Command Center
//scene_1694, scene_1695 scene_1698, scene_1694 - for New Site Audit Mobile - https://builder.sv.knack.com/apps/trashdash#pages/scene_1698
var as_scenes = [ 'scene_1935','scene_1921','scene_1799','scene_1792', 'scene_1752','scene_1750','scene_1708','scene_1659','scene_1660','scene_1661','scene_1656','scene_1657','scene_1646','scene_1639','scene_1567','scene_1418', 'scene_1417', 'scene_1426', 'scene_1436', 'scene_1437', 'scene_1518', 'scene_1519', 'scene_1520', 'scene_1525', 'scene_1527', 'scene_1537', 'scene_1528', 'scene_1532', 'scene_1538', 'scene_1533', 'scene_1540', 'scene_1544', 'scene_1534', 'scene_1551', 'scene_1535', 'scene_1529', 'scene_1546', 'scene_1552', 'scene_1530', 'scene_1547', 'scene_1548', 'scene_1549', 'scene_1550', 'scene_1531', 'scene_1438', 'scene_1558', 'scene_1561', 'scene_1565', 'scene_1562', 'scene_1439', 'scene_1440', 'scene_1446', 'scene_1478', 'scene_1479', 'scene_1480', 'scene_1481', 'scene_1483', 'scene_1492', 'scene_1454', 'scene_1505', 'scene_1507', 'scene_1508', 'scene_1509', 'scene_1510', 'scene_1511', 'scene_1512', 'scene_1513', 'scene_1517', 'scene_1441', 'scene_1451', 'scene_1452', 'scene_1453', 'scene_1442', 'scene_1455', 'scene_1443', 'scene_1460', 'scene_1536', 'scene_1444', 'scene_1475', 'scene_1476', 'scene_1477', 'scene_1445', 'scene_1468', 'scene_1526', 'scene_1448', 'scene_1494', 'scene_1555', 'scene_1556', 'scene_1557', 'scene_1574', 'scene_1576', 'scene_1573', 'scene_1642', 'scene_1757']
//New Site Audit Setup Scene List - https://builder.sv.knack.com/apps/trashdash/pages/scene_1695
var siteAudit_scenes = ['scene_1698', 'scene_1915'];
var siteAuditShared = ['scene_1741','scene_1742','scene_1770','scene_1697','scene_1704','scene_1704','scene_1777','scene_1705','scene_1768']
// var siteAudit_scenes = ['scene_1698','scene_1741','scene_1742','scene_1697','scene_1704','scene_1705','scene_1768']
as_scenes = as_scenes.concat(siteAudit_scenes)
as_scenes.forEach((item, index) => {
$(document).on("knack-scene-render." + item, function(event, scene) {
    function initializeAreaCommandCenter(){
        if($('#app-menu-list-mobile').length > 0 ){ $('#app-menu-list-mobile').remove()}
        var loginPage = $('.kn-login').length == 1 ? true : false;
        var clockinStateHTML = `<p id="as_clock_status" class="as-tce hideMe"></p>`
        if($('#as_clock_status').length === 0 & !loginPage){ $('#kn-app-header').append(clockinStateHTML) }

        $('#kn-scene_1417').length ? $('#kn-app-header').hide() : $('#kn-app-header').show()
        //This check if Knack's Backlink exist -> Create a copy for the Custom Backlink in the Top of the existing scene
        var backLinkExist = setInterval(checkBackLink, 1000);
        function checkBackLink(){
            if($('.kn-back-link').html() === undefined){ }
            else{
                function addBackLink(){
                    var origLink = $($('.kn-back-link a')[0]).attr('href');
                    var backLink = `<a style="margin-left: 10px" class="sv-top-back-link" id="sv-top-back" href=`+origLink+`><span>Back<span></a>`;
                    $('#kn-app-header').append(backLink);
                    $('#sv-top-back').show();
                }
                if($('#sv-top-back').length == 1){ $('#sv-top-back').remove(); addBackLink() }
                else{ addBackLink(); }
                clearInterval(backLinkExist);
            }
        }
        //This check if Knack's Backlink exist -> Create a copy for the Custom Backlink in the Top of the existing scene
        addCustomMenuSv();
        if($('form').length > 0){ 
        $( `<label class="as-custom-label">Date</label>` ).insertBefore( "form .knack-date" );
        $( `<label class="as-custom-label">Time</label>` ).insertBefore( "form .kn-time" );
        }
        if(item != 'scene_1417'){ try{ getLateServices(); }catch(err){ } }
        if(item == 'scene_1518'){ $('#as_late_notif').remove(); }
        if (loginPage) {
        $('input[type="submit"]').click(function (e) {
            setTimeout(function(){getLateServices(); location.reload();}, 1000);
            $('form').submit();
        });
        }else{
            userObjectRoles = Knack.session.user.profile_objects;
            isButler = userObjectRoles.find(x => x.object == "object_4");
        }
        //This removes the LATE SERVICES NOTIF & CUSTOM BACK LINK & TCE when the user logged out
        $('.kn-log-out').on('click', function(){
            $('#sv-top-back').remove(); $('#as_late_notif').remove(); $('#as_clock_status').remove();
        })

        //This is a fast fix
        var labelChck = setInterval(lablF, 1000);
        function lablF(){
            if( $('.kn-detail-label').length > 0 ){ clearInterval(labelChck); }
        }
    }
    function appendTheme(){
        //THEME APPEND
        if ($('#as_command_center_theme').length == 0) {
            $('head').append('<link rel="stylesheet" type="text/css" id="as_command_center_theme" class="lazyload" href="https://strategic-visionz.github.io/knack-css/scss/Area%20Supervisor%20Theme.min.css">')
            //-- Hotjar Tracking Code for https://apps.sv.knack.com/trashdash#area-command-center-login -->
            $('head').append(`<script>
                (function(h,o,t,j,a,r){
                    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                    h._hjSettings={hjid:2773437,hjsv:6};
                    a=o.getElementsByTagName('head')[0];
                    r=o.createElement('script');r.async=1;
                    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                    a.appendChild(r);
                })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            </script>`)
            $('body').append('<button id="goTopBtn" class="sv-top-btn">&nbsp;<i class="fa fa-arrow-up"></i>&nbsp;</button>');
            //GOTOP BTN - CAN BE GLOBAL
            $('#goTopBtn').on('click', function(){
                $('html, body').animate({
                    scrollTop: 0
                }, 750);
            })
            window.onscroll = function() {
                document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000 ?
                    goTopBtn.style.display = "block" :
                    goTopBtn.style.display = "none";
            };
            //GOTOP BTN
            siteAudit_scenes = 'as_command_center_theme'
        }
    }

    if(siteAudit_scenes.includes(item)){
        //
    }else{
        initializeAreaCommandCenter();
        appendTheme()
    }
})

})

//NEW BUTLER SETUP - ASSIGN TO Service ID
$(document).on('knack-form-submit.view_3833', function(event, view, data) {
Knack.showSpinner('Loading... Please, wait');
for (let i = 0; i < data.field_1715_raw.length; i++) {
    getServiceId(data.field_1715_raw[i].id, data.id)
}

});
function getServiceId(service_id, butler_id){
Knack.showSpinner('Getting Service ID Details');
return $.ajax({
type: 'GET',
headers: asHeader,
url: 'https://api.sv.knack.com/v1/objects/object_9/records/' +service_id,
success: function(data) {
    addButlerToService(service_id, data.field_55_raw, butler_id);
}
});
}
function addButlerToService(service_id, butlers, butler_id) {
Knack.showSpinner('Assigning Butler to the Service');
var newButlers = {"id": butler_id};
butlers.push(newButlers)
return $.ajax({
type: 'PUT',
headers: asHeader,
url: 'https://api.sv.knack.com/v1/objects/object_9/records/'+service_id,
data: {
    field_55: butlers
},
success: function(data) {
    Knack.hideSpinner();
    $('.close-modal').click();//added by Josh
}
});

}
function butlerDeets(data){
if(data.length > 0){
for(var i = 0; i < data.length; i++){
    if(data[i].field_37.length > 0) { 
    //$($('.as_assigned_community')[i]).html('Currently Assigned to '+data[i].field_37_raw +' - '+data[i].field_475_raw) 
    }
    else { $($('.as_assigned_community')[i]).html('Not Assigned To Any Community!') }
}
}
}
//view_3831 New Butler Setup Butler's List
$(document).on("knack-view-render.view_3831", function(event, view, data) {
butlerDeets(data);
});
// https://builder.sv.knack.com/apps/trashdash#pages/scene_1441
$(document).on("knack-view-render.view_4735", function(event, view, data) {
butlerDeets(data);
});

//view_3968 New Butler Setup Butler's Details Community
$(document).on("knack-view-render.view_3968", function(event, view, data) {
    $('#view_3968 section').attr('id', data.id)
});
//community_number view_3836
//view_3836 Assign Community - New Butler Setup Community List https://builder.sv.knack.com/apps/trashdash/pages/scene_1451/views/view_3836/list
$(document).on("knack-view-render.view_3836", function(event, view, data) {
var addedCommunitiesV = [];
$('#view_3836 .kn-list-content').hide();
var myVar = setInterval(test, 100);
function test(){
    if( typeof( $('#view_3968 section').attr('id') ) != 'string' ){  }
    else{
    for(var i = 0; i < data.length; i++){
        var haveService;
        var isCheck = '';
        var butlerId = $('#view_3968 section').attr('id');
        var butlersL = data[i].field_41_raw;
        for (let j = 0; j < butlersL.length; j++) {
        if(butlersL[j].id == butlerId){ isCheck = 'checked'; addedCommunitiesV.push(data[i].id) }
        }
        if(data[i].field_141_raw === true){ haveService = `<i class="fa fa-check-circle"></i> Have service Today` }else{ haveService = `<i class="fa fa-close"></i> NO service Today`}
        var communityAcc = `
                    <input class="as-new-list" type="checkbox" id=`+data[i].id+` `+isCheck+`><button class="as-accordion" style="width: 90%;">  `+data[i].field_37+`</button>
                    <div class="as-panel">
                        <div class="as_details">
                            <div class="kn-detail-label">
                                <p>Schedule Time: <span>`+data[i].field_44+`</span></p>
                                <p>`+haveService+`</p>
                <p>Assigned Butler:</p>
                <p>`+data[i].field_41+`</p>
                            </div>
                        </div>
                    </div>
                    `;
        $('#as_com_acc').append(communityAcc);
    }
    $('.as-accordion').on('click', function(){
        this.classList.toggle("as-active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
        } else {
        panel.style.maxHeight = panel.scrollHeight + 10 + "px";
        }
    })
    $('.as-new-list').on('click', function(){
        var commId = $(this).attr("id");
        if (addedCommunitiesV.includes(commId) === false) { addedCommunitiesV.push(commId); }
        else{ 
            for( var i = 0; i < addedCommunitiesV.length; i++){ 
                if ( addedCommunitiesV[i] === commId) { 
                    addedCommunitiesV.splice(i, 1); 
                }
            }
        }
        $('#view_3832-field_1711').val(addedCommunitiesV).trigger("liszt:updated");
    })
    clearInterval(myVar);
    }
}
});

//view_3973 New Butler Setup Butler's Details Service ID
$(document).on("knack-view-render.view_3973", function(event, view, data) {
    $('#view_3973 section').attr('id', data.id)
});
//view_3855 Assign Service ID - New Butler Setup Service ID List
$(document).on("knack-view-render.view_3855", function(event, view, data) {
var addedServiceID = [];
if(data.length > 0){
    var myVar = setInterval(checkButlerId, 100);
    function checkButlerId(){
        if( typeof( $('#view_3973 section').attr('id') ) != 'string'){  }
        else{
            $('#view_3855 .kn-list-content').hide();
            $('#view_3966').hide();
            $('#view_3833').show();
            for(var i = 0; i < data.length; i++){
                var isCheck = '';
        var butlerId = $('#view_3973 section').attr('id');
                var butlersL = data[i].field_55_raw;
                for (let j = 0; j < butlersL.length; j++) {
                    if(butlersL[j].id == butlerId){ isCheck = 'checked'; addedServiceID.push(data[i].id) }
                }
                var title = data[i].field_95 + " - " +data[i].field_37_raw+ " - " +data[i].field_170;
                var communityAcc = `
                    <input class="as-new-list" type="checkbox" id=`+data[i].id+` `+isCheck+`><button class="as-accordion" style="width: 90%;">  `+title+`</button>
                    <div class="as-panel">
                        <div class="as_details">
                            <div class="kn-detail-label">
                                <p><strong>Schedule Time:</strong> <span>`+data[i].field_170+`</span></p>
                            </div>
                            <div class="kn-detail-label">
                                <p>Assigned Butlers:</p>
                                <div class="as_assigned_butlers">`+data[i].field_55+`</div>
                            </div>
                        </div>
                    </div>
                    `;
                $('#as_service_acc').append(communityAcc);
            }
            $('.as-accordion').on('click', function(){
                this.classList.toggle("as-active");
                    var panel = this.nextElementSibling;
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + 10 + "px";
                }
            })
            
            $('.as-new-list').on("click", function(){
            var serviceID = $(this).attr("id");
            if (addedServiceID.includes(serviceID) === false) { addedServiceID.push(serviceID); }
            else{ 
                for( var i = 0; i < addedServiceID.length; i++){ 
                        if ( addedServiceID[i] === serviceID) { 
                            addedServiceID.splice(i, 1); 
                        }
                    }
                }
                $('#view_3833-field_1715').val(addedServiceID).trigger("liszt:updated");
            });
            clearInterval(myVar);
        }
    }
}
else{
    $('#view_3855 .kn-list-content').show();
    $('#view_3966').show();
    $('#view_3833').hide();
}
var changeSelect = setInterval(addToSelect, 1000);
function addToSelect(){
    if($('#view_3833-field_1715').length == 0){}
    else{
    $('#view_3833-field_1715').val(addedServiceID).trigger("liszt:updated");
    clearInterval(changeSelect);
    }
}
});

//view_3898 Training Logs List
$(document).on("knack-view-render.view_3916", function(event, view, data) {
    $('.field_1794').hide();
    for (let i = 0; i < data.length; i++) {
        if(data[i].field_1794 == ""){
        $($('#view_3916 .as_training_stat')[i]).html("Pending Review").addClass("sv-not-reviewed").addClass("sv-stats");
        }
        else if(data[i].field_1794 == "Flagged"){ 
        $($('#view_3916 .as_training_stat')[i]).html("Flagged").addClass("sv-fail").addClass("sv-stats");
        }
        else{ 
        $($('#view_3916 .as_training_stat')[i]).html("Passed").addClass("sv-pass").addClass("sv-stats"); 
        }
    }
});

//Training Grade Modal
$(document).on("knack-view-render.view_3922", function(event, view, data) {
$('.field_1187').hide();
if(data.length > 0){
    for (let i = 0; i < data.length; i++) {
        if(data[i].field_1187_raw > .66){
            $($('.as_training_grade')[i]).html("Pass").addClass("sv-pass").addClass("sv-stats");
        }
        
        else{ 
        $($('.as_training_grade')[i]).html("Failed").addClass("sv-fail").addClass("sv-stats"); 
        }
    }
}
});

//Service Assignment Section
$(document).on("knack-view-render.view_3944", function(event, view, data) {
$('#view_3944 .kn-list-item-container section .kn-detail-body').addClass('as-accordion');
var addedButler = [];
$('#view_3944 .kn-list-item-container section .kn-detail-body').on("click", function(){
    this.classList.toggle("as-active");
    var commId = $($(this).parents()[6]).attr('id')
    if (addedButler.includes(commId) === false) { addedButler.push(commId); }
    else{ 
        for( var i = 0; i < addedButler.length; i++){ 
            if ( addedButler[i] === commId) { 
                addedButler.splice(i, 1); 
            }
        }
    }
    $('#view_3838-field_55').val(addedButler).trigger("liszt:updated");
})
});

//view_3861 Support Tickets 
$(document).on("knack-view-render.view_3861", function(event, view, data) {
$('.field_306').hide();
$('.field_313').hide(); $('.kn-details-link').show();
$('.field_308').hide(); $('.field_1654').hide();
$('.field_303').hide();
$('.field_309').hide();
for (let i = 0; i < data.length; ++i) {
    var ticketDetails = `<p><span class="as_ticket_number">Ticket #: ` + data[i].field_313 +` </span> <span class="as_ticket_status">Status: `+data[i].field_308+`</span></p>
            <p><span class="as_ticket_reason">`+data[i].field_306+`</span></p>
            <p>Submitted by `+data[i].field_303+ ` `+data[i].field_309;+`</p>`
    $($('.ticket-details')[i]).html(ticketDetails);
    if(data[i].field_308_raw == "Closed"){ $($('.as_ticket_status')[i]).addClass('statclosed'); $($('.as_ticket_reason')[i]).addClass('statclosed'); }
    if(data[i].field_308_raw == "Open"){ $($('.as_ticket_status')[i]).addClass('statopen') ; $($('.as_ticket_reason')[i]).addClass('statopen') };
    if(data[i].field_308_raw == "Pending"){ $($('.as_ticket_status')[i]).addClass('statpending') ; $($('.as_ticket_reason')[i]).addClass('statpending'); }
    //
    if(data[i].field_306 != 'Resident Complaint / Request RADAR' && data[i].field_306 != 'Customer Complaint / Request Radar'){ 
    $($($('.as-active-radar')[i]).parents()[6]).hide()
    } //hide Activate RADAR if not Request RADAR AND not a complaint
}
});

var currentLateCount = 0;
function computeLate(data){
var lateArray = [];
function getTimezone(i){
if(data[i].field_171 == 0){ return 'America/Toronto' }
else if(data[i].field_171 == 1){ return 'America/Chicago' }
else if(data[i].field_171 == 2){ return 'America/Denver' }
else if(data[i].field_171 == 3){ return 'America/Los_Angeles' }
else{ return 'EST' }
}

for (let i = 0; i < data.length; ++i) {
var time = new Date();
var timeNow = time.toLocaleString('en-US', {timeZone: getTimezone(i)});
timeNow = timeNow.split(",").join("");
var schedTime = data[i].field_170_raw.hours +':' +data[i].field_170_raw.minutes +' '+ data[i].field_170_raw.am_pm;
var timeStart = new Date(data[i].field_46+ " "+ schedTime);
var timeEnd = new Date(timeNow);
var diff;
diff = (timeEnd - timeStart)/ 60000
var minutes = diff % 60;
var hours = ( (diff - minutes) / 60 );
minutes = parseInt(minutes)
var lateMin = minutes - 15
if(hours <= 0){
    if(minutes <= 0 || minutes < 15){
    }
    else if(30 >= minutes >= 15){
        lateArray.push(i)
    }else{
        lateArray.push(i);
    }
    }else{
    lateArray.push(i)
    }
}
return lateArray.length;
}

function as_lateNotif(data){
var lateNumbers = computeLate(data);
var myVar = setInterval(myTimer, 30000);
function myTimer() {
if($('#view_4051').length > 0){
    $($('.as-late-service-count')[0]).html(lateNumbers);
    clearInterval(myVar);
}else{
}
}
if(lateNumbers > 0){ showLateNotif(); } else { $($('.as-late-service-count')[0]).attr('style', 'background-color: #7ac144')}
function showLateNotif(){
var lateNotifText = `<div id="as_late_notif"><p><span class="as-late-service-notif">`+lateNumbers+`</span> Service(s) Are Currently Late </p>
<p><a href="https://apps.sv.knack.com/trashdash#area-command-center/dashboards/in-service-dashboard/late-services/">Click Here to Review</a></p>`
var viewsToShow = $('#view_4069').length > 0;

if($('#as_late_notif').length){
    $($('.as-late-service-notif')[0]).html(lateNumbers)
}else{
    $('body').append(lateNotifText);
} 
}
if(lateNumbers > currentLateCount){ $('#as_late_notif').show() }
currentLateCount = lateNumbers;
$('#close_late_notif').on('click', function(){
$('#as_late_notif').hide()
});
}

//view_4070
$(document).on('knack-view-render.view_4070', function(event, view, data) {
if(getLateServicesLoaded === false){
    //Interval for the Late Services Notifications
    var myVar = setInterval(refreshInterval, 30000);
    function refreshInterval(){
    Knack.views.view_4069.model.fetch();
    $('#close_late_notif').on('click', function(){
        $('#as_late_notif').hide()
    });
    }
}
getLateServicesLoaded = true;
})
var myButlerList;
function getMyButlers(){
return $.ajax({
type: 'GET',
headers: asHeader,
url: 'https://api.sv.knack.com/v1/pages/scene_1531/views/view_4141/records/',
success: function(data) {
myButlerList = data.records;
}
});
}

//view_4052 ORIGINAL LATE SERVICES
$(document).on("knack-view-render.view_4052", function(event, view, data) {
getMyButlers();
$('#view_4052 .kn-records-nav').hide()
$('#view_4052 form').hide();
$('.field_121').hide(); $('.field_121').next().hide(); $('.field_171').hide();
$('.field_170').hide(); $('.field_46').hide();
$('.field_276').hide(); $('.field_16').hide();

var lateArray = [];
function getTimezone(i){
    if(data[i].field_171 == 0){ return 'America/Toronto' }
    else if(data[i].field_171 == 1){ return 'America/Chicago' }
    else if(data[i].field_171 == 2){ return 'America/Denver' }
    else if(data[i].field_171 == 3){ return 'America/Los_Angeles' }
    else{ return 'America/Toronto' }
}

for (let i = 0; i < data.length; ++i) {
    var time = new Date();
    var timeNow = time.toLocaleString('en-US', {timeZone: getTimezone(i)});
    timeNow = timeNow.split(",").join("");
    var timeZone = getTimezone(i)
    var schedTime = data[i].field_170_raw.hours +':' +data[i].field_170_raw.minutes +' '+ data[i].field_170_raw.am_pm;
    var timeStart = new Date(data[i].field_46+ " "+ schedTime);
    var timeEnd = new Date(timeNow);
    var diff;
    diff = (timeEnd - timeStart)/ 60000
    var minutes = diff % 60;
    var hours = ( (diff - minutes) / 60 );
    minutes = parseInt(minutes)
    var lateTimeDetails;
    if(hours <= 0){
    if(minutes < 15){
        $($('.kn-list-item-container')[i]).hide();
    }
    else if(30 >= minutes >= 15){
        lateTimeDetails = `<p>${minutes - 15} minute(s) late</p>`;
        lateArray.push(i)
    }else{
        lateTimeDetails = `<p>+15 minutes late</p>`;
        lateArray.push(i);
    }
    }else{
    lateTimeDetails = `+15 minutes late`;
    lateArray.push(i)
    }
    var schedAtText = `Scheduled At `+data[i].field_170+ ` - #` +data[i].field_95;
    $($('.sv-sched-at')[i]).append(schedAtText)
    $($('.as_late_service_clock')[i]).append(`<span>`+lateTimeDetails+`</span>`)
    //addButlerDeetails();
    const waitForButlerList = setInterval(loadButlerDetails, 500);
    function loadButlerDetails(){
    if(myButlerList){
        setTimeout(addButlerDeetails, 500);
        clearInterval(waitForButlerList);
    }
    }
    function addButlerDeetails(){

    if(data[i].field_16 != ''){
        var butlerList = data[i].field_55_raw;
        var bNumber, noNum;
        for(let j = 0; j < butlerList.length; ++j){
            
            for(let k = 0; k < myButlerList.length; ++k){
                if(myButlerList[k].field_276 != ''){ bNumber = myButlerList[k].field_276_raw.full; noNum = '' } else { noNum = `no-number`; }
                function getButlerNumber(tag){
                    return bNumber;
                }
                if(butlerList[j].id === myButlerList[k].id){
                    var nameAndNumber = `<div class="butler-contacts"><span class="sv-as-name">`+butlerList[j].identifier+`</span>
                    <span class="sv-as-number"><a href="tel:`+getButlerNumber(k)+`"><i class="fa fa-phone `+noNum+`"></i></a></span>
                    <span class="sv-as-message"><a href="sms:`+getButlerNumber(k)+`"><i class="fa fa-comment `+noNum+`"></i></a></span>
                    </div>`;
                    $($('.as_late_service_details')[i]).append(nameAndNumber);
                
                }
            
            }
            
        }
    }
    }
}
$($('.sv-as-number-of-late-service')[0]).html(lateArray.length+' Late Service(s)') 
});

var refreshLateListServices_MainPage = false;
$(document).on("knack-view-render.view_4068", function(event, view, data) {
var intervalLoadView = setInterval(waitList, 1000);
function waitList() {
    if($('#view_4052').length > 0){
    refreshLateList();
    clearInterval(intervalLoadView);
    }
}
function refreshLateList(){
    if(refreshLateListServices_MainPage === false){
    refreshLateListServices_MainPage = true;
    //This is the interval where the LATE Services Main Page is refresh
    var listInterval = setInterval(refreshList, 900000);
    function refreshList(){
        Knack.views.view_4052.model.fetch();
    }
    }
}
});

function getServiceLogsAS(serviceFilter, j) {
    return $.ajax({
      type: 'GET',
      headers: asHeader,
      url: 'https://api.sv.knack.com/v1/objects/object_16/records?filters=' + encodeURIComponent(JSON.stringify(serviceFilter)),
      success: function(data) {	
        var types = data.records;
        if(types.length > 0){
          for (let i = 0; i < types.length; i++) {
            var details = `<p>Uploaded By: <span class="">`+types[i].field_102+`</span>
              <a class="kn-img-gallery" href="#" style="display: inline-block">
                                <div class="nailthumb-container">
                                    <span class="">
                                        <img data-kn-img-gallery=`+types[i].field_607_raw+` src=`+types[i].field_607_raw+`;>
                                    </span>
                                </div>
                              </a></p>
              `
            
            if(types[i].field_98 == 'Compactor Before (Resident Access)'){
                $($('.as-compactor-before-resident .as-warning')[j]).hide();
              $($('.as-compactor-before-resident')[j]).append(details)
            }
          }
        }
      }
    });
   }
   
   // ACC Custom Record Number List Major List View
   var customRecordNumberArray = [
      { 'v_id': 'view_4079' }, //Verify Compactor Log 
      { 'v_id': 'view_4732' }, //Today Service
      { 'v_id': 'view_3916' }, //Review Training Log
      { 'v_id': 'view_4760' }, //All Service Ids
      { 'v_id': 'view_3850' }, //Review Service IDs
      { 'v_id': 'view_4735' }, //New Butlers
      { 'v_id': 'view_3837' }, //Manage Service Assignment **
      { 'v_id': 'view_3861' }, //Manage Support Ticket **
      { 'v_id': 'view_4097' }, //Radar Logs
      { 'v_id': 'view_4112' }, //Resident Infraction
      { 'v_id': 'view_4113' }, //Compactor Logs
      { 'v_id': 'view_4118' }, //Butler Timeclock
      { 'v_id': 'view_4122' }, //Communities & Contacts
      { 'v_id': 'view_4151' }, //Community Service History
      { 'v_id': 'view_4961' }, //Verify Butler Timeclock
      { 'v_id': 'view_4174' }, //Still in Progress
      { 'v_id': 'view_4961' }, //Verify Butler Timeclock
      { 'v_id': 'view_4653' }, //TapCheck Review
      { 'v_id': 'view_3850' }, //Review Service IDs
      { 'v_id': 'view_4752' }, //My Site Audits
      { 'v_id': 'view_4961' }, //Verify Butler Timeclock
      { 'v_id': 'view_4877' }, //Manage Site Audits
   ]
   for (let i = 0; i < customRecordNumberArray.length; i++) {
      $(document).on(`knack-view-render.${customRecordNumberArray[i].v_id}`, function(event, view, data) {
          var text = addShowNumberText(data.length)
          if( $(`#${customRecordNumberArray[i].v_id} .kn-entries-summary`).length === 0 ){ $($(`#${customRecordNumberArray[i].v_id} .kn-records-nav`)[0]).append( text ) }
      });
   }
   // End
   function addShowNumberText(length){
      if(length > 0 ){
          return `<div class="kn-entries-summary" style="margin-right: .5em;">
            <span class="light">Showing 1-${length} of ${length}</span>
          </div>`;
      }else{
          return `<div class="kn-entries-summary" style="margin-right: .5em;">
            <span class="light">Showing 0 Record</span>
          </div>`;
      }
   }
   
   $(document).on("knack-view-render.view_4079", function(event, view, data) {
      $('.as-compactor-after-resident').parent().hide(); 
      $('.as-compactor-after-maintenance').parent().hide();
      for (let i = 0; i < data.length; i++) {
        var serviceFilter = [{"field":"field_97", "operator":"is", "value":data[i].id}]
        getServiceLogsAS(serviceFilter, i);
      }
      var numberText = `<div class="kn-entries-summary" style="margin-right: .5em;">
            <span class="light">Showing ${data.length} Compactor Log(s)</span>
          </div>`;
      if( $('.kn-entries-summary').length === 0 ){ $($('#view_4079 .kn-records-nav .level')[1]).append(numberText) }
   });
   
   //Contact Butler In Service 
   $(document).on("knack-view-render.view_4093", function(event, view, data) {
      $('.field_16').hide(); $('.field_276').hide(); $('.field_16').hide(); $('.field_277').hide();
      for (let i = 0; i < data.length; ++i) {
        var butlerName = data[i].field_16;
        var full, formatted, full2, formatted2;
        data[i].field_277_raw !== undefined ? full2 = data[i].field_277_raw.full : full2 = '';
        data[i].field_277_raw !== undefined ? formatted2 = data[i].field_277_raw.formatted : formatted2 = '';
        data[i].field_276_raw !== undefined ? full = data[i].field_276_raw.full : full = '';
        data[i].field_276_raw !== undefined ? formatted = data[i].field_276_raw.formatted : formatted = '';
        contactDisplay(data.length, '.as-butler-details', full, formatted, butlerName, i, full2, formatted2)
      }
   
});

//This will Add class to the Emergency Procedure Accordion
$(document).on("knack-view-render.view_4139", function(event, view, data) {
    var s = setInterval(t, 1000);
    function t() {
      if($('.as-accordion').length > 0){ 
        $($('#view_4139').parents()[1].previousElementSibling).addClass('sv-emergency')
        clearInterval(s);
      }
    }
 });

 //view_4130
$(document).on("knack-view-render.view_4130", function(event, view, data) {
    $('#view_4130 .field_385').hide();
    $('#view_4130 .field_386').hide();
    $('#view_4130 .field_388').hide();
    contactDisplay(1, '.as-maintenance-contact', data.field_386_raw.full, data.field_386_raw.formatted, data.field_385, 0, data.field_388_raw.full, data.field_388_raw.formatted)
});

//view_4135
$(document).on("knack-view-render.view_4135", function(event, view, data) {
    $('.field_16').hide(); $('.field_276').hide(); $('.field_16').hide(); $('.field_277').hide();
    for (let i = 0; i < data.length; ++i) {
      var butlerName = `<p><span class="sv-as-name">`+data[i].field_16_raw.first+` `+data[i].field_16_raw.last+`</span></p>`
      contactDisplay(data.length, '.as-butler-details', getVal("field_276_raw","full", data[i]), getVal("field_276_raw","formatted", data[i]), butlerName, i, 
                     getVal("field_277_raw","full", data[i]), getVal("field_277_raw","formatted", data[i]))
    }
});

//view_4137 Community Managers
$(document).on("knack-view-render.view_4137", function(event, view, data) {
    $('#view_4137 .kn-detail').hide()
    for (let i = 0; i < data.length; ++i) {
        contactDisplay(data.length, '.as-cm-details', getVal("field_1252_raw","full", 
        data[i]), getVal("field_1252_raw", "formatted", data[i]), data[i].field_21,i)
    }
 });
 
 function getVal(field, s, t){
  try { var y = t[field][s]
    return y
  }
  catch(err) {
    console.log(err)
  }
 }
 
 function contactDisplay(l, appendTo, num1, fnum1, name, i, num2, fnum2){
    var className = $($(appendTo)[i]);
    if(l > 0){
      function getNumber(num, s, p){
        try {
          var classA;
          var number;
          if(num == undefined){ classA = 'no-number'; number = 'No '+p+' : ' }else{ classA = ''; number = p+` `+s}
          return `<span class="as-formatted-number" style="font-size: 12px;">`+number+`</span>
                <span class="sv-as-number"><a class="${classA}" href="tel:`+num+`"><i class="fa fa-phone `+classA+`"></i></a></span>
                <span class="sv-as-message `+classA+`"><a class="${classA}" href="sms:`+num+`"><i class="fa fa-comment `+classA+`"></i></a><span>`
        }
        catch(err) {
          console.log(err);
          return `Error getting `+p+ ` #`
        }
      }
      var butlerName = `<p><span class="sv-as-name">`+name+`</span></p>`;
      var nameAndNumber = `<div>`+butlerName+`<div>`+getNumber(num1, fnum1, 'Phone 1')+`</div><div>`+getNumber(num2, fnum2, 'Phone 2')+`</div></div>`;
      className.append(nameAndNumber);
    }
 }
  
//view_4129 Assign Butler > Community Contacts Form
$(document).on("knack-view-render.view_4170", function(event, view, data) {
    $('#view_4170').attr('area-id', data.field_483_raw[0].id);
    $('#view_4170').attr('com-id', data.id);
    $('#kn-input-field_485').addClass('hideMe'); $('#kn-input-field_54').addClass('hideMe')
   var handler = setInterval(waitForForm, 500);
   $('#view_4129 form button').attr("disabled", true);
   Knack.showSpinner('Fetching data');
   
   function waitForForm() {
     Knack.showSpinner('Fetching data');
     if($('#view_4170').length == 1){
       var areaId = $('#view_4170').attr('area-id'); var comId = $('#view_4170').attr('com-id');
       if($('#view_4170').attr('area-id') == $('#view_4129-field_485').val() && $('#view_4170').attr('com-id') == $('#view_4129-field_54').val()) { 
         clearInterval(handler); 
         $('#view_4129 form button').attr("disabled", false);
         Knack.hideSpinner();
       }
       else{  
         changValue(areaId, comId); }
       }
     else{ //console.log('Form still loading');
         setTimeout(function(){
           clearInterval(handler);
           Knack.hideSpinner();
           //alert("Error: Please, try again"); 
         }, 10000);
      }
   }
   function changValue(a, c){
     $('#view_4129-field_485').val(a).change().trigger("liszt:updated");
     $('#view_4129-field_54').val(c).change().trigger("liszt:updated");
   }
});

//My Butlers
$(document).on("knack-view-render.view_4141", function(event, view, data) {
    butlerDeets(data);
   $('.field_17').hide();
   $('.field_277').hide();
});

// Community Filter
$(document).on("knack-view-render.view_4122", function(event, view, data) {
    var url = 'https://apps.sv.knack.com/trashdash#area-command-center/dashboards/in-service-dashboard/communities-contacts/'
    var activefilters = [
 
    // Filter for records with a value for this field in the last three months
    {
        "field":"field_642",
        "operator":"is",
        "text":'Active',
        'value': 'Active'
    }
    ];
    var inactivefilters = [
    // Filter for records with a value for this field in the last three months
    {
        "field":"field_642",
        "operator":"is",
        "text":'Inactive',
        'value': 'Inactive'
    }
    ];
    var active_url = url + '?view_4122_filters=' + encodeURIComponent(JSON.stringify(activefilters));
    var inactive_url = url + '?view_4122_filters=' + encodeURIComponent(JSON.stringify(inactivefilters));
    $('#as-active-filter').on('click', function(){
        window.location.href = active_url;
    })
    //as-inactive-filter
    $('#as-inactive-filter').on('click', function(){
    window.location.href = inactive_url;
    })
    $('#view_4122 .field_345').hide();
    var currentUTC = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    // $('.field_37 h2').append('<i class="sv-site-deets-btn fa fa-map-marker"></i>')
    for (let i = 0; i < data.length; i++) {
        $($($('.sv-site-details')[i]).parents()[6]).html($($('.sv-site-details')[i]).parents()[3]).removeClass('kn-details-link')
        $($('.sv-site-deets-btn')[i]).on('click', function(){
            $($('.sv-site-details')[i]).click()
        })
        var lastSiteVisit  = data[i].field_345;
        var diffInMs   = new Date(currentUTC) - new Date(lastSiteVisit)
        var daysDif = diffInMs / (1000 * 60 * 60 * 24);
        $($('.sv-site-details')[i]).html(daysDif)
        if(daysDif > 15 && daysDif < 31){
            $($($('.sv-site-details')[i]).parents()[2]).addClass('sv-yellow')
        }else if(30 < daysDif){
            $($($('.sv-site-details')[i]).parents()[2]).addClass('sv-red')
        }else{
            $($($('.sv-site-details')[i]).parents()[2]).addClass('sv-green')
        }
        if (data[i].field_141 == "Yes") {
            $($('.as-service-today')[i]).html('Service Today At ' + data[i].field_44);
        } else {
            $($('.as-service-today')[i]).html('No Service Today');
        }
    }
    $('.field_44').hide();$('.field_141').hide();
    
 });
 
//view_4172 Area Details
$(document).on("knack-view-render.view_4172", function(event, view, data) {
    $('#view_4172').hide();
   });
   var inprogress = 
      { 
       'match': 'and',
       'rules':[{
         "field":"field_121",
         "operator":"is",
         "value": "Started - In Progress"
       },{
         "field":"field_46",
         "operator":"is",
         "value": currentServiceDate()
       }]
     }
   var butlerNotClockedOut = { 
      'match': 'and',
      'rules':[{
        "field":"field_114",
        "operator":"is blank"
      },{
        "field":"field_113",
        "operator":"is",
        "value": currentServiceDate()
      }
              ]
    }
    var tapcheckA = { 
      'match': 'and',
      'rules':[{
        "field":"field_114",
        "operator":"is not blank"
      },{
        "field":"field_113",
        "operator":"is",
        "value": currentServiceDate()
      }]
    }
   //POST SERVICE MENU
   $(document).on("knack-view-render.view_4168", function(event, view, data) {
    $('.kn-link-4').hide();
    getStillInProgress()
   });
   
   function getStillInProgress(){
    try{
      return $.ajax({
          type: 'GET',
          headers: asHeader,
          url: 'https://api.sv.knack.com/v1/pages/scene_1558/views/view_4174/records/?filters=' + encodeURIComponent(JSON.stringify(inprogress)),
          success: function(data) {
          $($('.as-late-service-count')[0]).html(data.records.length)
          }
      });
    }catch(err){
      console.log(err)
    }
}

//view_4118 - https://builder.sv.knack.com/apps/trashdash#pages/scene_1529
$(document).on("knack-view-render.view_4118", function(event, view, data) {
    for (let i = 0; i < data.length; i++) {
      $($($('.kn-link-delete')[i]).parents()[2]).hide()
      $($($('.sv-delete-link')[i]).parents()[3]).attr('style', 'color: red')
    }
    $( ".field_112 a" ).each(function( index ) {
      $( this ).html($( this ).text() + `<i class="fa fa-phone-square sv-contact-butler"></i>`)
    });
   });
   //TapCheck Review view_4653 - https://builder.sv.knack.com/apps/trashdash#pages/scene_1708/views/view_4653
   $(document).on("knack-view-render.view_4653", function(event, view, data) {
    for (let i = 0, len = data.length; i < len; i++) {
      if (data[i].field_2212_raw) { 
        const $h2 = $('.field_112 h2').eq(i);
        $h2.append(`<i style="position: absolute;right: 10%;color: red;" class="fa fa-flag"></i>`);
      }
      $($($('.sv-delete-record')[i]).parents()[3]).hide()
      $($($('.sv-delete-link')[i]).parents()[3]).attr('style', 'color: red')
    }
   });
   
   //view_4202
   $(document).on("knack-view-render.view_4202", function(event, view, data) {
    $('#view_4202-field_113').val(''); $('#view_4202-field_113-time').val(''); $('#view_4202-field_114').val(''); $('#view_4202-field_114-time').val(''); 
   });
   
   //view_4174
   $(document).on("knack-view-render.view_4174", function(event, view, data) {
    $('.field_121').hide();
    for (let i = 0; i < data.length; i++) {
      $($('.sv-stats')[i]).html(data[i].field_121)
      if(data[i].field_121 == "Started - In Progress"){
      $($('.sv-stats')[i]).html('In Progress').addClass('sv-not-reviewed')
      }else if(data[i].field_121 == "Pending"){
        $($('.sv-stats')[i]).addClass('sv-not-reviewed')
      }
      else{
        $($('.sv-stats')[i]).addClass('sv-fail')
      }
    }
   });
   
   
   $(document).on("knack-view-render.view_3833", function(event, view, data) {
    $('#view_3833-field_1715').val('').trigger("liszt:updated");
   });
   
   $(document).on("knack-view-render.view_4227", function(event, view, data) {
    $($('.as_close')[0]).hide();
    $('#as_input_all_workflows').on('input', function() {
        var inputVal = $('#as_input_all_workflows').val();
        inputVal = inputVal.toLocaleLowerCase()
        if($('#as_input_all_workflows').val() != ''){
            $($('.as_close')[0]).show();
            for (let i = 0; i < $('#view_4225 a').length; i++) {
                var str = $($($('#view_4225 a')[i]).children()[1]).html();
                str = str.toLocaleLowerCase()
              if(str.includes(inputVal)){ $($('#view_4225 a')[i]).show() }else{$($('#view_4225 a')[i]).hide()}
            }
        }
        else{ $('#view_4225 a').show(); $($('.as_close')[0]).hide(); }
    });
    
      $($('.as_close')[0]).on('click', function(){
      $($('.as_close')[0]).hide(); $('#as_input_all_workflows').val(''); $('#view_4225 a').show();
    })
   });
   
   $(document).on("knack-view-render.view_4769", function(event, view, data) {
    $($('.as_close')[0]).hide();
    $('#as_input_all_workflows').on('input', function() {
        var inputVal = $('#as_input_all_workflows').val();
        inputVal = inputVal.toLocaleLowerCase()
        if($('#as_input_all_workflows').val() != ''){
            $($('.as_close')[0]).show();
            for (let i = 0; i < $('.as-accordion').length; i++) {
                var str = $($('.as-accordion')[i]).html();
                str = str.toLocaleLowerCase()
              if(str.includes(inputVal)){ $($('.as-accordion')[i]).show() }else{$($('.as-accordion')[i]).hide()}
            }
        }
        else{ $('.as-accordion').show(); $($('.as_close')[0]).hide(); }
    });
    
      $($('.as_close')[0]).on('click', function(){
      $($('.as_close')[0]).hide(); $('#as_input_all_workflows').val(''); $('.as-accordion').show();
    })
   });
   
   var butlerNotClockedOut = { 
    'match': 'and',
    'rules':[{
      "field":"field_114",
      "operator":"is blank"
    },{
      "field":"field_113",
      "operator":"is",
      "value": currentServiceDate()
    }
            ]
   }
   var tapcheckA = { 
     'match': 'and',
     'rules':[{
       "field":"field_114",
       "operator":"is not blank"
     },{
       "field":"field_113",
       "operator":"is",
       "value": currentServiceDate()
     }]
   }
   
var newReviewServiceIDFilter = todayFilter.rules.concat({'field': 'field_121', 'operator': 'is','value': 'Complete'})
   //This is the custom filter that is added on the list with the Knack's funnel filter
   var routeFilterMenu = [
          {   //PRE Service Dashboard Menu
              'route_view_id' : 'view_3812', 
              'menus':[
                  {
                      'link_n':'2', //Service ID Reviews filtered by the PREVIOUS Service Date
                      'filtered_view': 'view_3850', //view id that will be filtered
                      'filters': [{
                          "field":"field_46",
                          "operator":"is",
                          "value": prevServiceDate()
                      },{'field': 'field_121', 'operator': 'is','value': 'Complete'}],
                      'active_filter': true
                  },{
                      'link_n':'9', // Today's Services  - menu items order number top to btom
                      'filtered_view': 'view_4732', //view id that will be filtered
                      'filters': todayFilter
                  }
              ]
          },{ //In Service Dashboard Menu
            'route_view_id' : 'view_4051', 
            'menus':[
                  {
                      'link_n':'4', //Verify Compactor Logs filtered Current Service date
                      'filtered_view': 'view_4079',
                      'filters': todayFilter
                  },{
                      'link_n':'6', //Manage Timeclocks filtered Current Service Date
                      'filtered_view': 'view_4118',
                      'filters': [{
                                  "field":"field_113",
                                  "operator":"is",
                                  'value': currentServiceDate()
                              }]
                  },{
                      'link_n':'2', //Today'S Services
                      'filtered_view': 'view_4732', 
                      'filters': todayFilter
                  },{
                      'link_n':'9', //View Completed Services
                       'filtered_view': 'view_3850',
                      'filters': newReviewServiceIDFilter
                  }
            ]
          },{ // POST SERVICE DASHBOARD MENUS
              'route_view_id' : 'view_4168',
              'menus':[
                  {
                      'link_n':'2', //Service Still In Progress filtered Current Service Date
                      'filtered_view': 'view_4174', 
                      'filters': { 
                          'match': 'and',
                          'rules':[{
                          "field":"field_121",
                          "operator":"is",
                          "value": "Started - In Progress"
                          },{
                          "field":"field_46",
                          "operator":"is",
                          "value": currentServiceDate()
                          }]
                      }
                  },{
                      'link_n':'3', //Butlers Not Clocked Out filters Clock Out is Blank AND Current Service Date
                      'filtered_view': 'view_4118',
                      'filters': butlerNotClockedOut
                  },{
                      'link_n':'4', //TAPCHECK filters Clock Out is NOT Blank AND Current Service Date
                      'filtered_view': 'view_4118',
                      'filters': tapcheckA
                  },{
                      'link_n':'6', //REVIEW SERVICE ID filtered CURRENT SERVICE DATE
                      'filtered_view': 'view_3850',
                      'filters': newReviewServiceIDFilter
                  },{
                      'link_n':'10', //Today's Services
                      'filtered_view': 'view_4732',
                      'filters': todayFilter
                  }
              ]
          },{  //Manage Logs and Infractions Menus
              'route_view_id' : 'view_4080', 
              'menus':[
                  {
                      'link_n':'1', //Service ID Reviews filtered by the PREVIOUS Service Date
                      'filtered_view': 'view_4081', //view id that will be filtered
                      'filters': [{
                          "field":"field_1499",
                          "operator":"is",
                            "value": currentServiceDate()
                      }],
                      'active_filter': true
                  },{
                      'link_n':'2', // Today's Services  - menu items order number top to btom
                      'filtered_view': 'view_4097', //view id that will be filtered
                      'filters': [{
                          "field":"field_74",
                          "operator":"is blank"
                      }],
                      'active_filter': true
                  },{
                      'link_n':'3', // Resident Infractions
                      'filtered_view': 'view_4112', //view id that will be filtered
                      'filters': [{
                          "field":"field_66",
                          "operator":"is",
                      'value': currentServiceDate()
                      }],
                      'active_filter': true
                  },{
                      'link_n':'4', // Compactor Logs
                      'filtered_view': 'view_4113', //view id that will be filtered
                      'filters': [{
                          "field":"field_257",
                          "operator":"is",
                      'value': currentServiceDate()
                      }],
                      'active_filter': true
                  }
              ]
          },{ //View All Workflows Page
              'route_view_id' : 'view_4225', 
              'menus':[
                  {
                      'link_n':'5', //Butlers not Clocked Out
                      'filtered_view': 'view_4118',
                      'filters': butlerNotClockedOut,
                      'active_filter': true
                  },
                  {
                      'link_n':'25', // TapCheck
                      'filtered_view': 'view_4118',
                      'filters': tapcheckA,
                      'active_filter': true
                  },{
                      'link_n':'24', // Still In Progress
                      'filtered_view': 'view_4174',
                      'filters': [{
                          "field":"field_46",
                          "operator":"is",
                      'value': currentServiceDate()
                      }]
                  }
                  ,{
                      'link_n':'26', //Today's Services
                      'filtered_view': 'view_4732',
                      'filters': todayFilter
                  },{
                      'link_n':'18', //Review Service ID
                       'filtered_view': 'view_3850',
                      'filters': newReviewServiceIDFilter
                  },{
                      'link_n':'32', //Review Service ID
                       'filtered_view': 'view_3850',
                      'filters': newReviewServiceIDFilter
                  }
              ]
          }
   ]
   routeFilterMenu.forEach((item) => {
      $(document).on("knack-view-render." +item.route_view_id, function(event, view, data) {
          item.menus.forEach((t) => {
              function activeFilter(){
                  try {
                      if(t.active_filter){ return '&active=true' }else{ return '' }
                  }catch(err){
                  }
              }
              $('.kn-link-'+t.link_n).attr('href', $('.kn-link-'+t.link_n).attr('href') + '?'+t.filtered_view+'_filters='+ encodeURIComponent(JSON.stringify(t.filters)) + activeFilter());
          });
      });
   });
   //view_4242 Community Units
   $(document).on("knack-view-render.view_4242", function(event, view, data) {
    //hide the RADAR Date if RADAR is No
    //Change Activate RADAR to Edit RADAR
      $('.field_151').hide()
      for (let i = 0; i < data.length; i++) {
        if(data[i].field_149_raw){
          $($('.field_151')[i]).show()
          $($('.as-activate-radar')[i]).html('Edit RADAR')//as-accordion sv-emergency
          $($($('.as-activate-radar')[0]).parents()[3]).addClass('as-red')
        }else{
        }
      }
      
   });
   
   //view_4243
   $(document).on("knack-view-render.view_4243", function(event, view, data) {
      var waitForView = setInterval(changeVal, 1000);
      function changeVal() {
        if($('#view_4245').length > 0){
          if(!data.field_149_raw){ $('#view_4245 form input').val('') }
          clearInterval(waitForView);
        }
      }
   });
   
   //view_3568
   $(document).on("knack-view-render.view_3568", function(event, view, data) {
    $($('#view_3568 h2 i').parents()[1]).removeClass('level')
   });
   
   //view_4406 Quick Rating
   $(document).on("knack-view-render.view_4406", function(event, view, data) {
   $('#view_4406').hide();
    if(data.field_1464_raw === "Yes"){
      (data.field_1552).includes("down") ? $($('#view_3568 input[type=radio]')[1]).click() : $($('#view_3568 input[type=radio]')[0]).click()
      try{
          $('#field_1425').val(data.field_1425_raw[0])
      }
      catch(err){
      }
    }
});

$(document).on("knack-view-render.view_4225", function(event, view, data) {//View All Workflows Service Hazard 	https://builder.sv.knack.com/apps/trashdash#pages/scene_1439/views/view_4225
    $('#view_4225 .kn-link-29').remove() // Support Ticket Service Hazard
    $('#view_4225 .kn-link-25').remove()
    $('#view_4225 .kn-link-3').remove()
    $('#view_4225 .kn-link-4').remove()

    if(!isButler){
    $('#view_4225 .kn-link-34').remove() //Switch to Butler View
    } 
});

$(document).on("knack-view-render.view_4051", function(event, view, data) {//view_4051 In Service https://apps.sv.knack.com/trashdash#area-command-center/dashboards/in-service-dashboard/
    $('#view_4051 .kn-link-11').remove();
});

$(document).on("knack-view-render.view_4497", function(event, view, data) {
    $('#view_4497').hide();
});



function computeButlerScore(){
    var count = 0;
    for (let i = 0; i < 10; i++) {
      if($($('select')[i]).val() == 'Yes'){
          count = count + 1;
      }
    }
    count = count/10;
    $('#field_1916').val(count).change();
 }
 //view_4493 Save and Continue Later Btn Butler
 $(document).on("knack-view-render.view_4498", function(event, view, data) {
  function computeButlerScore(){
    var count = 0;
    for (let i = 0; i < 10; i++) {
      if($($('select')[i]).val() == 'Yes'){
          count = count + 1;
      }
    }
    count = count/10;
    $('#field_1916').val(count).change();
  }
  
  function validateFields(){
    var allField = $('#view_4493-field_1833').val() == '' || $('#field_1835').val() == '' ||
        $('#view_4493-field_1836').val() == '' || $('#field_1838').val() == '' ||
        $('#view_4493-field_1839').val() == '' || $('#field_1841').val() == '' ||
        $('#view_4493-field_1842').val() == '' || $('#field_1844').val() == '' ||
        $('#view_4493-field_1845').val() == '' || $('#field_1847').val() == '' ||
        $('#view_4493-field_1848').val() == '' || $('#field_1850').val() == '' ||
        $('#view_4493-field_1851').val() == '' || $('#field_1853').val() == '' ||
        $('#view_4493-field_1854').val() == '' || $('#field_1856').val() == '' ||
        $('#view_4493-field_1857').val() == '' || $('#field_1859').val() == '' ||
        $('#view_4493-field_1860').val() == '' || $('#field_1862').val() == ''  
    if(allField){
    $('#view_4497').show();
    $('html, body').animate({ scrollTop: $("#view_4497").offset().top }, 1000);
  }else{
      $('#view_4493-field_1900').prop("selectedIndex", 1);
      $('#view_4493 form').submit();
    }
  }
  $('#kn-input-field_1900').addClass('hideMe');
  $('#as_continue_later_audit').on('click', function(){
    computeButlerScore()
    $('#view_4493-field_1900').prop("selectedIndex", 2);
    $('#view_4493 form').submit();
  });
  $('#as_continue_audit_next').on('click', function(){
    computeButlerScore()
    $('#view_4493-field_1900').prop("selectedIndex", 1);
    validateFields()
  })
 });
 
 $(document).on('knack-form-submit.view_4492', function(event, view, record) {
  siteAuditNew(record) //Add Service ID to Site Audit
 });
 
 function siteAuditNew(record){
    let serviceIdFilter = {
                'match': 'and',
                'rules': [{
                    'field': 'field_54', //status
                    'operator': 'is',
                    'value': record.field_193_raw[0].id
                 }, {
                    'field': 'field_46', //Date of service
                    'operator': 'is',
                    'value': currentServiceDate()
                 }]
    };
    function getService(){
      return $.ajax({
        type: 'GET',
        headers: asHeader,
        url: 'https://api.sv.knack.com/v1/objects/object_9/records?filters='+ encodeURIComponent(JSON.stringify(serviceIdFilter)),
        success: function(serviceData) {
              try{
                updateAudit(serviceData.records[0].id)
              }catch(err){
                console.log(err)
              }
              
        }
      });
    }
    function updateAudit(serviceID){
        return $.ajax({
        type: 'PUT',
        headers: asHeader,
        url: 'https://api.sv.knack.com/v1/objects/object_19/records/' + record.id,
        data: {
            field_1245: [serviceID]
        }
    
      });
    }
    getService()
 }
 
 //view_4509 Save and Continue LAter Btn Community Audit
 $(document).on("knack-view-render.view_4509", function(event, view, data) {
  $('#as_continue_audit_next').on('click', function(){
      $('#view_4504 form').submit();
  })
 });
 
 $(document).on("knack-view-render.view_4504", function(event, view, data) {
  $('#kn-input-field_1884').addClass('hideMe');
  $("#view_4504 form button[type='submit']").addClass('hideMe')
});

//view_4752 Manage Audit - Post Service NEW SETUP
$(document).on("knack-view-render.view_4752", function(event, view, data) {
    $('#view_4179').remove();
    $('.field_1884').hide();
    for (let i = 0; i < data.length; i++) {
      
      if(data[i].field_689 == 'Butler Audit'){
        $($('.as-com')[i]).parents().eq(5).hide();
      } 
      else{
        $($('.field_192')[i]).hide() // hide the butler
        $($('.field_409')[i]).hide() // hide the Audit Score
        $($('.as-butler')[i]).parents().eq(5).hide(); // hide the Edit Butler
      }
    }
   
    $('.field_1721').hide(); $('.field_689').hide()
    for (let i = 0; i < data.length; i++) {
      $($('.as-audit-type')[i]).html(data[i].field_689);
      if(data[i].field_688 == ""){
        $($('.as-audit-status')[i]).addClass('statpending').html("In Progress");
      }else{
        $($('.as-audit-status')[i]).addClass('statclosed').html("Completed");
      }
    }
   });
   // MANAGE MY AUDITS NEW SITE AUDIT MOBILE https://builder.sv.knack.com/apps/trashdash/pages/scene_1694/views/view_4860/list
   var auditViews = ['view_4860', 'view_4627', 'view_4713', 'view_4853', 'view_4859']
   for (let i = 0; i < auditViews.length; i++) {
    $(document).on("knack-view-render."+auditViews[i], function(event, view, data) {
      for (let j = 0; j < data.length; j++) {
        
        if(data[j].field_689 == 'Butler Audit'){
        //   $($('.as-com')[j]).parents().eq(5).hide();
        } 
        else{
          $($('#'+auditViews[i]+' .field_192')[j]).hide() // hide the butler
          $($('#'+auditViews[i]+' .field_409')[j]).hide() // hide the Audit Score
        }
      }
   
      $('.field_1721').hide(); 
      for (let j = 0; j < data.length; j++) {
        $($('#'+auditViews[i]+' .as-audit-type')[j]).html(data[j].field_689);
        if(data[j].field_688 == ""){
          $($('#'+auditViews[i]+' .as-audit-status')[j]).addClass('statpending').html("In Progress");
            $($($('#'+auditViews[i]+' .sv-edit-audit')[j]).parents()[6]).hide()
        }else{
          $($('#'+auditViews[i]+' .as-audit-status')[j]).addClass('statclosed').html("Completed");
            $($($('#'+auditViews[i]+' .sv-continue-audit')[j]).parents()[6]).hide()
        }
      }
    });
   }
   
   
   //NEW BUTLER AUDIT
   
   var auditShared = ['view_4741', 'view_4740'];
   //Start Community Audit - In Progress
   auditShared.forEach(v_id => {
    $(document).on("knack-view-render."+v_id, function(event, view, data) {
      var userProfKeys = Knack.session.user.profile_keys;
      var isDev = userProfKeys.includes('profile_34')
          for (let i = 0; i < data.length; i++) {
            if(data[i].field_689 == 'Butler Audit'){
                $($('.as-com')[i]).parents().eq(5).hide();
            } 
            else{
                $($('.field_192')[i]).hide() // hide the butler
                $($('.field_409')[i]).hide() // hide the Audit Score
                $($('.as-butler')[i]).parents().eq(5).hide(); // hide the Edit Butler
            }
            if(!isDev){
              $($($('.update-audit-photo')[i]).parents()[6]).hide();
            }
          }
      });
   })
   
   // view_4743 Delete Timeclock
   $(document).on("knack-view-render.view_4743", (event, view, data) => {
    const $deleteButton = $('#sv_delete');
    const $cancelButton = $('#sv_cancel');
    const $deleteLink = $(`.kn-link-delete[href="#${data.id}"]`);
   
    $deleteButton.on('click', () => {
      $('.close-modal').click();
      $deleteLink[0].click();
    });
   
    $cancelButton.on('click', () => {
      $('.close-modal').click();
    });
   });
   
   //
   $(document).on('knack-form-submit.view_4123', function(event, view, record) {
    var filter = {
      'match': 'and',
      'rules': [
        {
          "field":"field_54",
          "operator":"is",
          'value': record.id
        },
        {
          'field': 'field_46', //date
          'operator': 'is',
          'value': currentServiceDate()
        }
      ]
    }
    if(record.field_2274_raw){ getCommunityTodayService(filter, record) }
   })
   
   //view_4503 https://builder.sv.knack.com/apps/trashdash/pages/scene_1519/views/view_4503/form Community Audit
   $(document).on('knack-form-submit.view_4503', function(event, view, record) {
      var filter = {
      'match': 'and',
      'rules': [
        {
          "field":"field_54",
          "operator":"is",
          'value': record.field_193_raw[0].id
        },
        {
          'field': 'field_46', //date
          'operator': 'is',
          'value': currentServiceDate()
        }
      ]
    }
    Knack.showSpinner('Getting Service ID Details');
    return $.ajax({
      type: 'GET',
      headers: asHeader,
      url: 'https://api.sv.knack.com/v1/objects/object_9/records?filters=' + encodeURIComponent(JSON.stringify(filter)),
      success: function(data) {
        assignServiceIDtoAudit(data, record)
      }
    })
   })
   
   function assignServiceIDtoAudit(data, record){
      if(data.records.length > 0){
          Knack.showSpinner('Adding Service ID');
          return $.ajax({
              type: 'PUT',
              headers: asHeader,
              url: 'https://api.sv.knack.com/v1/objects/object_19/records/' + record.id,
              data: {
                  field_1245: data.records[0].id
              },
              success: function(res) {
                  Knack.hideSpinner();
              }
          });
      }
   }
   
   function getCommunityTodayService(filterToday, record){
    Knack.showSpinner('Getting Service ID Details');
    return $.ajax({
      type: 'GET',
      headers: asHeader,
      url: 'https://api.sv.knack.com/v1/objects/object_9/records?filters=' + encodeURIComponent(JSON.stringify(filterToday)),
      success: function(data) {
        assignButlersToTodayService(data, record)
      }
    })
   }
   
   function assignButlersToTodayService(data, record){
    if(data.records[0].field_54_raw[0].id === record.id){
      return $.ajax({
        type: 'PUT',
        headers: asHeader,
        url: 'https://api.sv.knack.com/v1/objects/object_9/records/' + data.records[0].id,
        data: {
         field_55: record.field_41_raw
        },
        success: function() {
          Knack.hideSpinner();
        }
      });
    }
   }
   
   //view_4754 Delete Timeclock
   $(document).on("knack-view-render.view_4754", function(event, view, data) {
    try{
      var primN = `<span class="sv-as-number"><a href="tel:`+data.field_276_raw.formatted+`"><i class="fa fa-phone `+data.field_276_raw.formatted+`"></i></a></span>
      <span class="sv-as-message `+data.field_276_raw.formatted+`"><a href="sms:`+data.field_276_raw.formatted+`"><i class="fa fa-comment"></i></a><span>`
      $('#sv_prim_number').append(primN)
      var secN = `<span class="sv-as-number"><a href="tel:`+data.field_277_raw.formatted+`"><i class="fa fa-phone `+data.field_277_raw.formatted+`"></i></a></span>
      <span class="sv-as-message `+data.field_277_raw.formatted+`"><a href="sms:`+data.field_277_raw.formatted+`"><i class="fa fa-comment"></i></a><span>`
      $('#sv_sec_number').append(secN)
    }catch(err){
      console.log(err)
    }
   });
   
   //This changes the Text of the Community Name to "Edit Community Assignment"
   //view_4732 view_3837 - https://builder.sv.knack.com/apps/trashdash/pages/scene_1567/views/view_4732/list 
   var shared2 = [//Edit Community Assignment - https://builder.sv.knack.com/apps/trashdash/pages/scene_1442/views/view_3837/list 
        'view_4732', 'view_3837'
   ]
   shared2.forEach((view_id, idx) => {
    $(document).on("knack-view-render."+view_id, function(event, view, data) {
    var btnC = $('.updateComButlers');
    var title = `Edit Community Assignment`; var icon = `<span class="icon is-left"><i class="fa fa-edit"></i></span>`
      for (let i = 0; i < $('.updateComButlers').length; i++) {
        $($($('.updateComButlers')[i]).parents()[2]).next().find('a').html(`${icon}  Edit Community Assignment`).css('text-decoration', 'none');
        $($($('.updateComButlers')[i]).parents()[2]).next().addClass('kn-details-link')
        
      }
   });
})

//view_5296 View User Guide
$(document).on("knack-view-render.view_5296", function(event, view, data) {
    $('#kn-scene_1752 .view-group-3').hide()
    var accordion = ``;
    data.forEach((a, i) => {
        accordion = accordion +`<button class="as-accordion">${a.field_2345}</button>
          <div class="as-panel">
              <p>${a.field_2348}</p>
              <p>${a.field_2347}</p>
          </div>`;
    });
      $('#view_4769').append(accordion);
      responsiveAcc()
});

//view_4141 https://apps.sv.knack.com/trashdash#area-command-center/dashboards/view-all-workflow/my-butlers/
$(document).on("knack-view-render.view_4141", function(event, view, data) {
    for (let i = 0; i < data.length; i++) {
      try{
        var noNum = ''; var noNum2 = '';
        if(data[i].field_276 == ''){ noNum = 'no-number' }//
        if(data[i].field_277 == ''){ noNum2 = 'no-number' }//
        var primN = `<span class="sv-as-number">
                      <a class="${noNum}" href="tel:${data[i].field_276_raw.formatted}">
                          <i class="fa fa-phone ${noNum}"></i>
                      </a>
                  </span>
                  <span class="sv-as-message">
                      <a class="${noNum}" href="sms:${data[i].field_276_raw.full}">
                          <i class="fa fa-comment ${noNum}"></i>
                      </a>
                  </span>`
        $($('.sv-prim')[i]).append(primN)
     }catch(err){
        console.log(err)
      }
    }
});

//view_4141 https://apps.sv.knack.com/trashdash#area-command-center/dashboards/view-all-workflow/my-butlers/
$(document).on("knack-view-render.view_4812", function(event, view, data) {
    for (let i = 0; i < data.length; i++) {
      try{
        var noNum = ''; var noNum2 = '';
        if(data[i].field_276 == ''){ noNum = 'no-number' }//
        if(data[i].field_277 == ''){ noNum2 = 'no-number' }//
        var primN = `<span class="sv-as-number"><a class="${noNum}" href="tel:`+data[i].field_276_raw.formatted+`"><i class="fa fa-phone ${noNum}"></i></a></span>
        <span class="sv-as-message"><a class="${noNum}" href="sms:`+data[i].field_276_raw.formatted+`"><i class="fa fa-comment ${noNum}""></i></a><span>`
        $($('.sv-prim')[i]).append(primN)
      }catch(err){
        console.log(err)
      }
    }
});

//view_5303 Survey Control Panel
$(document).on('knack-view-render.view_5303', function(event, view, data){
    if(!isButler){
        $('#view_5303 .kn-link-3').hide()
    }else{
        // $('#view_5303 .kn-link-3').hide() //Not yet live
    }  
});

//view_4907 - Community & Contract - Site Details https://apps.sv.knack.com/trashdash#area-command-center/dashboards/view-all-workflow/communities-contacts/view-community-details3
$(document).on("knack-view-render.view_4907", function(event, view, data) {
    var currentComId = $(location).attr("href").replace(/\/\s*$/, "").split('/').pop();
    $('#view_4907-field_193').val(currentComId).trigger("liszt:updated");
    $('#view_4907').hide();
});

//view_4961 Verify Butler Timeclock https://builder.sv.knack.com/apps/trashdash/pages/scene_1799
$(document).on('knack-view-render.view_4961', function(event, view, data){
    $('.level').hide();
    $('.field_55').hide();
    for (let i = 0; i < data.length; i++) {
        var assignedButlers = data[i].field_55_raw;
        for (let j = 0; j < assignedButlers.length; j++) {
            var butlerText = 
            `<div class="sv-butler-timeclock-verify hideMe" butler-id="${assignedButlers[j].id}">
                <span class="sv-butler-name">${assignedButlers[j].identifier}</span>
                <span class="as-warning-butler sv-checked"><i class="fa fa-check-circle"></i></span>
                <hr>
                <div class="sv-timeclock-container">
                    <span class="sv-not-clocked-out">Not Clocked In</span>
                </div>
            </div>`;
            var notClockedInButler = 
            `<div class="sv-not-clocked-in-butler" butler-id="${assignedButlers[j].id}">
                <span class="sv-butler-name">${assignedButlers[j].identifier}</span>
            </div>`
            $($('.sv-butler-assigned')[i]).append(butlerText);
            $($('.sv-butler-assigned-not-clocked-in')[i]).append(notClockedInButler);
        }
        $($('.sv-butler-assigned')[i]).attr('service-id', data[i].id)
    }
    getButlerTimeclock()
        
});

function getButlerTimeclock() {
 return $.ajax({
   type: 'GET',
   headers: asHeader,
   url: 'https://api.sv.knack.com/v1/pages/scene_1799/views/view_4962/records',
   success: function(data) {
           var records = data.records;
           for (let i = 0; i < records.length; i++) {
               for (let j = 0; j < $('.sv-butler-assigned').length; j++) {
                   if( $($('.sv-butler-assigned')[j]).attr('service-id') == records[i].field_119_raw[0].id ){
                       var clockOutValue, clockOutPic;
                       var notClockOut = false;
                       if((!records[i].field_114_raw.hours)){
                           clockOutValue = '<span class="sv-not-clocked-out">Not Clocked Out</span>';
                           clockOutPic = ``;
                           notClockOut = true;
                       }else{
                           clockOutValue = `Clock Out At ${records[i].field_114_raw.hours}:${records[i].field_114_raw.minutes}`;
                           clockOutPic = records[i].field_260_raw
                       }
                       var timeClockImage = `<div class="sv-timeclock-container">
                                   <div style="width: 50%;">
                                       <p> Clock In At ${records[i].field_113_raw.hours}:${records[i].field_113_raw.minutes} </p>
                                       <a class="kn-img-gallery" href="#" style="display: inline-block">
                                           <div class="nailthumb-container">
                                               <img data-kn-img-gallery=`+records[i].field_609_raw+` src=`+records[i].field_609_raw+`;>
                                           </div>
                                       </a>    
                                   </div>
                                   <div style="width: 50%;">
                                       <p> ${clockOutValue} </p>
                                       <a class="kn-img-gallery" href="#" style="display: inline-block">
                                           <div class="nailthumb-container">
                                               <img data-kn-img-gallery=${clockOutPic} src=${clockOutPic};>
                                           </div>
                                       </a>    
                                   </div>
                               </div>`;
                           $($('.sv-butler-assigned')[j]).find(`[butler-id=${records[i].field_112_raw[0].id}]`).removeClass('hideMe')
                           $($('.sv-butler-assigned')[j]).find(`[butler-id=${records[i].field_112_raw[0].id}]`).find(`[class='sv-timeclock-container']`).hide();
                           $($('.sv-butler-assigned-not-clocked-in')[j]).find(`[butler-id=${records[i].field_112_raw[0].id}]`).hide();
                           $($('.sv-butler-assigned')[j]).find(`[butler-id=${records[i].field_112_raw[0].id}]`).append(timeClockImage);
                   }
               }
           }
       }
 });
}

// //view_3568
$(document).on('knack-view-render.view_3568', function(event, view, data){
    $('#view_3568 button').addClass('hideMe')
});

$(document).on('knack-view-render.view_5023', function(event, view, data){
    $('#sv_rating_hidden').append(`<textarea class="kn-textarea hideMe" id="field_1425_new" name="field_1425"></textarea>`)
    $('#survey_submit_1').on('click', function(){
        $('#survey_submit_1').hide()
        if( $($('input[type=radio]')[1]).is(':checked') && $('#field_1425').val() == ''){
            $('#view_3568').addClass('hideMe');
            $('#sv_rating_hidden').removeClass('hideMe')
        }else{
            $('#view_3568 form').submit();
        }
    });
    $('#survey_submit').on('click', function(){
        $('#view_3568 form').submit();
    })
 
    $('#survey_submit_comment').on('click', function(){
        $('#sv_rating_hidden button').hide();
        $('#field_1425_new').removeClass('hideMe')
        $('#survey_submit_1').show(); 
        $('#survey_submit_1').addClass('quick-rating');
        $($('.sv_text_center')[0]).html('We apologize and understand your frustration.')
        $($('.sv_text_center')[1]).html('Please let us know what we could have done better.')
      });
      $('#field_1425_new').keyup(()=>{
          $('#field_1425').val($('#field_1425_new').val())
    })
});

//view_5035
$(document).on('knack-view-render.view_5035', function(event, view, data){
    if(showPopUpAs){
        showPopUpAs = false;
        $('#sv_show_popup').click();
    }
   $($('#view_5035').parents()[0]).hide();
 });
 //$('#view_3812 .kn-link-5').hide()
 $(document).on('knack-view-render.view_3812', function(event, view, data){
  $('#view_3812 .kn-link-5').hide()
 });
 
 $(document).on('knack-form-submit.view_3568', function(event, view, record) {
   if($('#view_3473').length > 0){
       location.reload()
   }
});

//view_4760 Service ID List Accordion Test
$(document).on('knack-view-render.view_4760', function(event, view, data){
    $('#view_5056').html('');
    var accordion = '';
    data.forEach((a, i) => {
          accordion = accordion +`<button class="as-accordion"></button>
                                      <div class="as-panel">
                                      </div>`;
       
    });
    $('#view_5056').append(accordion);
    responsiveAcc();
    for (let j = 0; j <  data.length; j++) {
        $($('#view_5056 .as-accordion')[j]).append($($('#'+data[j].id+' .column-1')[0]));
        $($('#view_5056 .as-panel')[j]).append( $('#'+data[j].id) );
    }
 
});

