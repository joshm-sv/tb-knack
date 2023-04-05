const { searchParam,
  currentServiceDate,
  prevServiceDate,
  addImagePreview } = require('/js/custom_functions/custom');

/*
START Custom Date Filter
*/

class DateFilter {
   /**
    * Class constructor
    * @param {Array} filterParams contains an array of {viewName:"",dateFieldId:""} objects dateField id is the field key for the date located in viewName
    * @param {string} dateFieldName the name of the field for the date.
    * @param {string} dateRangeDivSelector div selector where we will insert our date filter elements
    * @param {number} insertIndex determines the position of the date filter elements when inserting in dateRangeDivSelector
    */
   constructor(filterParams, dateFieldName, dateRangeDivSelector, insertIndex) {
       this.filterParams = filterParams;
       this.dateFieldName = dateFieldName;
       this.dateRangeDivSelector = dateRangeDivSelector;
       this.dateRangeDivInsertIndex = insertIndex < 1 ? -1 : (insertIndex - 1);
   }

   /**
    * Initializes our date filter elements. Creates and inserts the date filter elements
    * in this.dateRangeDivSelector
    */
   init() {
       var div = $('<div class="level" style="margin-bottom: .7em;">');
       var form = $('<form class="table-date-filter-' + this.dateFieldName + '">');
       var p = $('<p class="control has-addons">');
       var label = $('<span class="input" style="border:0;box-shadow: none;padding-left: 0;">' + this.dateFieldName + ' Filter:</span>');
       var filterFieldFrom = $(`<input type="text" class="input" id="from_datefilter" placeholder="From">`);
       var filterFieldTo = $(`<input type="text" class="input" id="to_datefilter" placeholder="To">`);

       var params = this.getFilterParam();
       if (params != null) {
           $(filterFieldFrom).val(params.from);
           $(filterFieldTo).val(params.to);
       }
       var filterBtn = $('<a class="kn-button filter">Apply Filter</a>');
       $(p).append(label);
       $(p).append(filterFieldFrom);
       $(p).append(filterFieldTo);
       $(p).append(filterBtn);
       $(form).append(p);
       $(div).append(form);

       if (this.dateRangeDivInsertIndex > -1) {
           $(`${this.dateRangeDivSelector}>div:eq(${this.dateRangeDivInsertIndex})`).after(div);
       } else {
           $(this.dateRangeDivSelector).prepend(div);
       }

       filterFieldFrom.datepicker();
       filterFieldTo.datepicker();

       filterBtn.click(() => {
           this.doFilter();
       });

   }

   /**
    * Converts a string  e.g. 07/30/2019, to a JS Date object.
    * @param {*} dateString the date string to convert to an object
    */
   getDateObject(dateString) {
       let dateArr = dateString.split("/");
       let dateObj = new Date();
       dateObj.setFullYear(dateArr[2], dateArr[0] - 1, dateArr[1]);
       return dateObj;
   }

   /**
    * Retrieves the from and to date values if the page has already been filtered so that
    * it can be set in the from and to field date fields.
    */
   getFilterParam() {
       var urlParams = window.location.href.split('?');
       var result = {
           from: null,
           to: null
       };

       if (urlParams.length >= 2) {
           var filterParams = urlParams[1];
           var filterString = decodeURI(filterParams)
               .replace(/%2F/g, '\/')
               .replace(/%2C/g, ',')
               .replace(/%3A/g, ':');
           var filter = filterString.split('&')[0].split('=')[1];
           var filterObj = JSON.parse(filter);

           if (filterObj.rules && filterObj.rules.length > 1) {
               result = {};
               for (var i = 0; i < filterObj.rules.length; i++) {
                   var filterRule = filterObj.rules[i];
                   var filterValue = filterRule.value;
                   var dateObj = this.getDateObject(filterValue);
                   if (filterRule.operator == 'is after') { //from date
                       dateObj.setDate(dateObj.getDate() + 1);
                       result.from = ("0" + (dateObj.getMonth() + 1)).slice(-2) + "/" + ("0" + dateObj.getDate()).slice(-2) + "/" + dateObj.getFullYear();
                   } else if (filterRule.operator == 'is before') { //to date
                       dateObj.setDate(dateObj.getDate() - 1);

                       result.to = ("0" + (dateObj.getMonth() + 1)).slice(-2) + "/" + ("0" + dateObj.getDate()).slice(-2) + "/" + dateObj.getFullYear();
                   } else {
                       //nani?
                   }
               }
           }
       }
       return result.from == null && result.to == null ? null : result;
   }

   /**
    * Does the actual filtering by date of the selected view tables.
    */
   doFilter() {
       var fromDate = $("#from_datefilter").val();
       var toDate = $("#to_datefilter").val();

       if (fromDate.length == 0 || toDate.length == 0) {
           alert("From and To dates are required");
       } else {
           var fromDateObj = this.getDateObject(fromDate);
           var toDateObj = this.getDateObject(toDate);
           if (toDateObj.getTime() < fromDateObj.getTime()) {
               alert("To date cannot be less than the From date");
           } else {
               fromDateObj.setDate(fromDateObj.getDate() - 1);
               toDateObj.setDate(toDateObj.getDate() + 1);

               var newFromDateString = ("0" + (fromDateObj.getMonth() + 1)).slice(-2) + "/" + ("0" + fromDateObj.getDate()).slice(-2) + "/" + fromDateObj.getFullYear();
               var newToDateString = ("0" + (toDateObj.getMonth() + 1)).slice(-2) + "/" + ("0" + toDateObj.getDate()).slice(-2) + "/" + toDateObj.getFullYear();
               var filterParamList = [];

               this.filterParams.forEach(param => {
                   var filter = {
                       "match": "and",
                       "rules": [{
                               "field": param.dateFieldId,
                               "operator": "is after",
                               "value": newFromDateString,
                               "field_name": this.dateFieldName
                           },
                           {
                               "match": "and",
                               "field": param.dateFieldId,
                               "operator": "is before",
                               "value": newToDateString,
                               "field_name": this.dateFieldName
                           }
                       ]
                   };

                   var filterString = JSON.stringify(filter);

                   filterString = encodeURI(filterString)
                       .replace(/%22/g, '"')
                       .replace(/\//g, '%2F')
                       .replace(/,/g, '%2C')
                       .replace(/:/g, '%3A')

                   var params = param.viewName + '_filters=' + filterString + '&' + param.viewName + '_page=1';
                   filterParamList.push(params);
               });

               var currPage = window.location.href.split('?')[0];
               Knack.showSpinner();
               window.location.href = currPage + "?" + filterParamList.join("&");
           }
       }
   }
}
window.originalKnackShowSpinner = Knack.showSpinner;
window.originalKnackHideSpinner = Knack.hideSpinner;

window.showSpinner = function(message) {
   $("#kn-loading-spinner").css("text-align", "");
   $("#kn-loading-spinner").removeClass("loading-text");
   $("#kn-loading-spinner").text("");
   window.originalKnackShowSpinner();

   if (message) {
       $("#kn-loading-spinner").css("text-align", "center");
       $("#kn-loading-spinner").addClass("loading-text");
       $("#kn-loading-spinner").text(message);
   }
   if( $('#sv-top-back').length > 0 || $('.kn-view.kn-back-link').length === 0 ){
       $('#sv-top-back').hide();
   }
}

window.hideSpinner = function() {
   $("#kn-loading-spinner").css("text-align", "");
   $("#kn-loading-spinner").removeClass("loading-text");
   $("#kn-loading-spinner").text("");
   window.originalKnackHideSpinner();
   if( $('#sv-top-back').length > 0 || $('.kn-view.kn-back-link').length > 0){
       $('#sv-top-back').show();
   }
}

Knack.showSpinner = window.showSpinner;
Knack.hideSpinner = window.hideSpinner;

//This is used to apply the custom date filter to a single table

//Services --> Time Clocks --> All Time Clocks - scene_804
$(document).on('knack-view-render.view_3257', function(event, view, data) {
   var dFilter = new DateFilter([{
       'viewName': 'view_3257',
       'dateFieldId': 'field_113'
   }], 'Clock In Date Range', '.kn-records-nav', 2)
   dFilter.init();
});

//Services --> Time Clocks --> All Time Clocks - scene_804
$(document).on('knack-view-render.view_3275', function(event, view, data) {
   var dFilter = new DateFilter([{
       'viewName': 'view_3275',
       'dateFieldId': 'field_113'
   }], 'Clock In Date Range', '.kn-records-nav', 2)
   dFilter.init();
});

//Services --> Time Clocks --> All Time Clocks - scene_804
$(document).on('knack-view-render.view_3244', function(event, view, data) {
   var dFilter = new DateFilter([{
       'viewName': 'view_3244',
       'dateFieldId': 'field_113'
   }], 'Clock In Date Range', '.kn-records-nav', 2)
   dFilter.init();
});

//Services --> Time Clocks --> All Time Clocks - scene_804
$(document).on('knack-view-render.view_4586', function(event, view, data) {
   var dFilter = new DateFilter([{
       'viewName': 'view_4586',
       'dateFieldId': 'field_113'
   }], 'Clock In Date Range', '.kn-records-nav', 2)
   dFilter.init();
});


/*
END CUSTOM DATE FILTER
*/



//This hides the clocked in timestamp on the Porter clock in form so that it can still collect information
$(document).on("knack-view-render.view_2795", function(event, view, data) {
   $("#kn-input-field_113").addClass('hideMe');
});


//This hides the timestamp fields on the Porter compactor-before form so that they can still collect information
$(document).on("knack-view-render.view_2811", function(event, view, data) {
   $("#kn-input-field_103").addClass('hideMe');
});

//This hides the timestamp fields on the Porter compactor-before-inside form so that they can still collect information
$(document).on("knack-view-render.view_2814", function(event, view, data) {
   $("#kn-input-field_103").addClass('hideMe');
});

//This hides the timestamp fields on the Porter compactor-after form so that they can still collect information
$(document).on("knack-view-render.view_2817", function(event, view, data) {
   $("#kn-input-field_103").addClass('hideMe');
});

//This hides the timestamp fields on the Porter compactor-after-inside form so that they can still collect information
$(document).on("knack-view-render.view_2820", function(event, view, data) {
   $("#kn-input-field_103").addClass('hideMe');
});


//This hides the timestamp fields on the Porter Forgot to Return from Lunch Break form so that they can still collect information
$(document).on("knack-view-render.view_2807", function(event, view, data) {
   $("#kn-input-field_1034").addClass('hideMe');
});


//This hides the timestamp fields on the Porter Clock Out form so that they can still collect information
$(document).on("knack-view-render.view_2798", function(event, view, data) {
   $("#kn-input-field_114").addClass('hideMe');
});

//Community Concierge Section
//May 2021

var currentEstDT = new Date();
var currentDate = currentEstDT.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', timeZone: 'America/New_York' });
currentEstDT = currentEstDT.toLocaleString('en-US', {timeZone: 'America/New_York'}).replace(",","");
currentEstDT = new Date(currentEstDT);
var endServiceDate = new Date(currentDate+" 6:00:00 AM");
var timeDiff = endServiceDate - currentEstDT;

/********************This is the AREA Command Center Section*************************************************/
var asHeader = {
     'X-Knack-Application-Id': Knack.application_id,
     "X-Knack-REST-API-Key": window.knackRestApiKey,
     'Authorization': Knack.getUserToken()
};

//CREATE CUSTOM ACCORDION LIST
var customAccor = [
   {   //Edit Service ID
       "view_id": "view_4033", //RICH TEXT - View ID where the accordion will be appended
       "accordions": [ // This are the accordion details
           {
               'name': 'Edit Service ID',
               'acc_view': 'view_4013', //View Id of the LIST to be appended to the Accordion List
               'add_menu_view': '' //View ID of the Add Menu to be appended to the Accordion List
           },{
               'name': 'Compactor Logs',
               'acc_view': 'view_4015',
               'add_menu_view': 'view_4022'
           },{
               'name': 'RADAR Logs',
               'acc_view': 'view_4016',
               'add_menu_view': 'view_4025'
           },{
               'name': 'Resident Infractions',
               'acc_view': 'view_4017',
               'add_menu_view': 'view_4031'
           },{
               'name': 'Support Tickets',
               'acc_view': 'view_4029',
               'add_menu_view': ''
           },
           {
               'name': 'Service Hazards',
               'acc_view': 'view_4018',
               'add_menu_view': 'view_4048'
           },
           {
               'name': 'Butler Timeclock',
               'acc_view': 'view_4200',
               'add_menu_view': 'view_4201'
           },
       ]
   },{   //Review Service ID Page
       "view_id": "view_3819", //RICH TEXT - View ID where the accordion will be appended
       "accordions": [ // This are the accordion details
           {
               'name': 'Compactor Logs',
               'acc_view': 'view_3820',
               'add_menu_view': ''
           },{
               'name': 'RADAR Logs',
               'acc_view': 'view_3821',
               'add_menu_view': ''
           },{
               'name': 'Resident Infractions',
               'acc_view': 'view_3822',
               'add_menu_view': ''
           },{
               'name': 'Service Hazards - new',
               'acc_view': 'view_3841',
               'add_menu_view': ''
           },{
               'name': 'Butler Timeclock',
               'acc_view': 'view_3828',
               'add_menu_view': ''
           },{
               'name': 'Support Tickets',
               'acc_view': 'view_4599',
               'add_menu_view': ''
           },{
               'name': 'Service Notes',
               'acc_view': 'view_4235',
               'add_menu_view': ''
           }
       ]
   },{   //Communities & Contacts
       "view_id": "view_4136", //RICH TEXT - View ID where the accordion will be appended
       "accordions": [ // This are the accordion details
           {
               'name': 'Maintenance',
               'acc_view': 'view_4130',
               'add_menu_view': ''
           },{
               'name': 'Assigned Butlers',
               'acc_view': 'view_4135',
               'add_menu_view': ''
           },{
               'name': 'Community Manager',
               'acc_view': 'view_4137',
               'add_menu_view': ''
           },{
               'name': 'Access Code (OLD)',
               'acc_view': 'view_4133',
               'add_menu_view': ''
           },{
               'name': 'Access Code (New)',
               'acc_view': 'view_4134',
               'add_menu_view': ''
           },{
               'name': 'Emergency Procedures',
               'acc_view': 'view_4139',
               'add_menu_view': ''
           }
       ]
   },{   //Community Units Details
       "view_id": "view_4250", //RICH TEXT - View ID where the accordion will be appended
       "accordions": [ // This are the accordion details
           {
               'name': 'RADAR Logs',
               'acc_view': 'view_4247',
               'add_menu_view': ''
           },{
               'name': 'Resident Infractions',
               'acc_view': 'view_4248',
               'add_menu_view': ''
           },{
               'name': 'Support Tickets',
               'acc_view': 'view_4249',
               'add_menu_view': ''
           }
       ]
   },{   //My Profile Accordion
           "view_id": "view_4255", //RICH TEXT - View ID where the accordion will be appended
           "accordions": [ // This are the accordion details
               {
                   'name': 'My Area(s)',
                   'acc_view': 'view_4646',
                   'add_menu_view': ''
               },{
                   'name': 'My Communities',
                   'acc_view': 'view_4239',
                   'add_menu_view': ''
               }
           ]
   },{   //Site Checklist Mobile - https://builder.sv.knack.com/apps/trashdash#pages/scene_1698
           "view_id": "view_4716", //RICH TEXT - View ID where the accordion will be appended
           "accordions": [ // This are the accordion details - Staff View 
               {
                   'name': 'All Site Audits',
                   'acc_view': 'view_4627',
                   'add_menu_view': ''
               },{
                   'name': 'Communities With No Audits Last 30 Days',
                   'acc_view': 'view_4717',
                   'add_menu_view': ''
               }
           ]
   },{   //Site Checklist Mobile - https://builder.sv.knack.com/apps/trashdash#pages/scene_1698
           "view_id": "view_4723", //RICH TEXT - View ID where the accordion will be appended
           "accordions": [ // This are the accordion details - FOQM View 
               {
                   'name': 'All Site Audits',
                   'acc_view': 'view_4853',
                   'add_menu_view': ''
               },{
                   'name': 'Communities With No Audits Last 30 Days',
                   'acc_view': 'view_4851',
                   'add_menu_view': ''
               }
           ]
   },{   //Site Checklist Mobile - https://builder.sv.knack.com/apps/trashdash#pages/scene_1698
           "view_id": "view_4724 ", //RICH TEXT - View ID where the accordion will be appended
           "accordions": [ // This are the accordion details - TM View 
               {
                   'name': 'All Site Audits',
                   'acc_view': 'view_4713',
                   'add_menu_view': ''
               },{
                   'name': 'Communities With No Audits Last 30 Days',
                   'acc_view': 'view_4850',
                   'add_menu_view': ''
               }
           ]
   },{   //Site Checklist Mobile - https://builder.sv.knack.com/apps/trashdash#pages/scene_1698
           "view_id": "view_4725", //RICH TEXT - View ID where the accordion will be appended
           "accordions": [ // This are the accordion details - AS View 
               {
                   'name': 'All Site Audits',
                   'acc_view': 'view_4859',
                   'add_menu_view': ''
               },{
                   'name': 'Communities With No Audits Last 30 Days',
                   'acc_view': 'view_4852',
                   'add_menu_view': ''
               }
           ]
   },{   //Site Checklist Desktop - https://builder.sv.knack.com/apps/trashdash/pages/scene_1695
           "view_id": "view_4841", //RICH TEXT - View ID where the accordion will be appended
           "accordions": [ // This are the accordion details - Staff View
               {
                   'name': 'All Audits',
                   'acc_view': 'view_4617',
                   'add_menu_view': ''
               },{
                   'name': 'Communities With No Audits Last 30 Days',
                   'acc_view': 'view_4837',
                   'add_menu_view': ''
               }
           ]
   },{   //Site Checklist Desktop - https://builder.sv.knack.com/apps/trashdash/pages/scene_1695
           "view_id": "view_4843", //RICH TEXT - View ID where the accordion will be appended
           "accordions": [ // This are the accordion details - TM View
               {
                   'name': 'All Audits',
                   'acc_view': 'view_4656',
                   'add_menu_view': ''
               },{
                   'name': 'Communities With No Audits Last 30 Days',
                   'acc_view': 'view_4839',
                   'add_menu_view': ''
               }
           ]
   },{   //Site Checklist Desktop - https://builder.sv.knack.com/apps/trashdash/pages/scene_1695
           "view_id": "view_4844", //RICH TEXT - View ID where the accordion will be appended
           "accordions": [ // This are the accordion details - FOQM View
               {
                   'name': 'All Audits',
                   'acc_view': 'view_4854',
                   'add_menu_view': ''
               },{
                   'name': 'Communities With No Audits Last 30 Days',
                   'acc_view': 'view_4838',
                   'add_menu_view': ''
               }
           ]
   },{   //Site Checklist Desktop - https://builder.sv.knack.com/apps/trashdash/pages/scene_1695
           "view_id": "view_4845", //RICH TEXT - View ID where the accordion will be appended
           "accordions": [ // This are the accordion details - AS View 
               {
                   'name': 'All Audits',
                   'acc_view': 'view_4857',
                   'add_menu_view': ''
               },{
                   'name': 'Communities With No Audits Last 30 Days',
                   'acc_view': 'view_4858',
                   'add_menu_view': ''
               }
           ]
   },{   //General Butler Audit Details - https://apps.sv.knack.com/trashdash#area-command-center/dashboards/view-all-workflow/my-butlers/butler-audit-details/617127bf229d70080cd2e91e/
           "view_id": "view_4915", //RICH TEXT - View ID where the accordion will be appended
           "accordions": [ // This are the accordion details - AS View 
               {
                   'name': 'Butler Audit Logs',
                   'acc_view': 'view_4913',
                   'add_menu_view': ''
               }
           ]
   },{   //Community Visit Logs - https://builder.sv.knack.com/apps/trashdash/pages/scene_1788/views/view_4919/rich_text
           "view_id": "view_4919", //RICH TEXT - View ID where the accordion will be appended
           "accordions": [ // This are the accordion details - AS View 
               {
                   'name': 'Community Visit Logs',
                   'acc_view': 'view_4918',
                   'add_menu_view': ''
               }
           ]
   },
]

customAccor.forEach((item, index) => {
   var v_id = item.view_id;
   $(document).on("knack-view-render." + v_id, function(event, view, date) {
     var accordion = '';
     item.accordions.forEach((a, i) => {
         var accViewID = a.acc_view +`_`+i;
         var isOpen = '';
         var maxH = '';
         if( a.is_open ){ isOpen = 'as-active'; maxH = "as-active-panel" }
         accordion = accordion +`<button class="as-accordion ${isOpen}">${a.name}</button>
                                     <div class="as-panel ${maxH}">
                                         <p id="${accViewID+'_menu'}"></p>
                     <p id="${accViewID+'_list'}"></p>
                                     </div>`;
         //This add the list view to the Accordion
         $(document).on("knack-view-render." + a.acc_view, function(event, view, date) {
             //This add the ADD MENU to the Accordion
             if(a.add_menu_view != '') {
               $(document).on("knack-view-render." + a.add_menu_view, function(event, view, date) {
                   $('#'+accViewID+'_menu').append($('#'+a.add_menu_view)) })
             }
             $('#'+accViewID+'_list').append($('#'+a.acc_view)); 
         })
     });
       $('#'+item.view_id).append(accordion);
       setTimeout(responsiveAcc, 2000)  
   })                   
})
//END CREATE CUSTOM ACCORDION

function responsiveAcc(){
   var acc = document.getElementsByClassName("as-accordion");
   var i;
   for (i = 0; i < acc.length; i++) {
     acc[i].addEventListener("click", function() {
       this.classList.toggle("as-active");
       var panel = this.nextElementSibling;
       if (panel.style.maxHeight) {
         $( this ).next().removeClass('as-active-panel');
         panel.style.maxHeight = null;
       } else {
         panel.style.maxHeight = panel.scrollHeight + 10 + "px";
       }
     });
   }           
}

////////////////////////IN Service
//Menu

//Refresh View - Close Modal
//List of Modal that will close when successfully submitted
var modalList = [
   {   //Edit Butler Profile
       form_id: 'view_3834',
       refresh: 'view_3831',
       closeModal: true
   },{   //Butler Service Notes
       form_id: 'view_3839',
       refresh: 'view_3837',
       closeModal: true
   },{   //Add Change Butler
       form_id: 'view_3992',
       refresh: 'view_3837',
       closeModal: true
   },{   //Approve Training
       form_id: 'view_3918',
       refresh: 'view_3916',
       closeModal: true
   },{   //Flagged Training
       form_id: 'view_3919',
       refresh: 'view_3916',
       closeModal: true
   },{   //Edit Radar Log
       form_id: 'view_4039',
       refresh: 'view_4016',
       closeModal: true
   },{   //Edit Resident Infractions
       form_id: 'view_4036',
       refresh: 'view_4017',
       closeModal: true
   },
   {   //Add Compactor Logs
       form_id: 'view_4041',
       refresh: 'view_4015',
       closeModal: true
   },{   //Edit Support Ticket
       form_id: 'view_4037',
       refresh: 'view_4029',
       closeModal: true
   },{//view_4040 ADd Radar Log
     form_id: 'view_4040',
       refresh: 'view_4016',
       closeModal: true
   },
    //NEW
   {   //Edit RADAR Photos
     form_id: 'view_4098',
     refresh: 'view_4097',
     closeModal: true
   },{   //Edit RADAR Logs
     form_id: 'view_4039',
     refresh: 'view_4097',
     closeModal: true
   },{   //Edit Resident Infraction Photo
     form_id: 'view_4146',
     refresh: 'view_4112',
     closeModal: true
   },{   //Edit Butler Profile
     form_id: 'view_4036',
     refresh: 'view_4112',
     closeModal: true
   },{   //Edit Compactor Logs
     form_id: 'view_4035',
     refresh: 'view_4113',
     closeModal: true
   },{   //Edit Butler Timeclock
     form_id: 'view_4120',
     refresh: 'view_4118',
     closeModal: true
   },{   //Edit Butler Profile
     form_id: 'view_3932',
     refresh: 'view_4118',
     closeModal: true
   },{   //Add RADAR Logs
     form_id: 'view_4117',
     refresh: 'view_4097',
     closeModal: true
   },{   //Add RADAR Logs
     form_id: 'view_4117',
     refresh: 'view_4097',
     closeModal: true
   },{   //Add Infraction
     form_id: 'view_4165',
     refresh: 'view_4112',
     closeModal: true
   },{   //Add Compactor
     form_id: 'view_4158',
     refresh: 'view_4113',
     closeModal: true
   },{   //Change Butler
     form_id: 'view_3992',
     refresh: 'view_4052',
     closeModal: true
   },{
     form_id: 'view_4158',
     refresh: 'view_4079',
     closeModal: true
   },{//Add Change Butler Community/ Update Butler Assignment
     form_id: 'view_4123',
     refresh: 'view_4122',
     closeModal: true
   },{//Add Service Today
     form_id: 'view_4129',
     refresh: 'view_4122',
     closeModal: true
   },{//Review Training - Approve
     form_id: 'view_3918',
     refresh: 'view_3916',
     closeModal: true
   },{//Add Resident Infractions
     form_id: 'view_4042',
     refresh: 'view_4017',
     closeModal: true
   },{//Activate RADAR
     form_id: 'view_4245',
     refresh: 'view_4242',
     closeModal: true
   },{//Edit My Profile
     form_id: 'view_4254',
     refresh: 'view_4253',
     closeModal: true
   },{//Quick Ratings
     form_id: 'view_3568',
     refresh: 'view_3374',
     closeModal: true
   },{//Community Audit Photos- https://builder.sv.knack.com/apps/trashdash/pages/scene_1704
     form_id: 'view_4815',
     refresh: 'view_4877',
     closeModal: false
   },{
     form_id: 'view_4779',
     refresh: 'view_4118',
     closeModal: true
   }
   ,{
     form_id: 'view_5254',
     refresh: 'view_5268',
     closeModal: true
   }
   ,{
     form_id: 'view_5254',
     refresh: 'view_4708',
     closeModal: true
   }
   ,{
     form_id: 'view_5205',
     refresh: 'view_5204',
     closeModal: true
   },
   {
     form_id: 'view_3832', //scene_1451 Assign First Day Butler
     refresh: 'view_4735',
     closeModal: true
   },
   {
     form_id: 'view_5222', //scene_1897" Add New template
     refresh: 'view_5210',
     closeModal: true
   },
   {
     form_id: 'view_5214', //scene_1897" Create New Popup Schedule
     refresh: 'view_5215',
     closeModal: true
   }
]
for (let i = 0; i < modalList.length; i++) {
 $(document).on('knack-form-submit.'+modalList[i].form_id, function(event, view, record) {
   if( $('#'+modalList[i].refresh).length > 0){
       Knack.views[modalList[i].refresh].model.fetch()
       setTimeout(function(){ $($('.as-panel')[i]).prev().click(); }, 2000);
       if( modalList[i].closeModal ){ $('.close-modal').click(); }
       if($('.as-panel').length > 0){
           for (let i = 0; i < $('.as-panel').length; i++) {
               if($($('.as-panel')[i]).attr('style')){  
               $($('.as-panel')[i]).removeAttr('style'); 
               setTimeout(function(){ $($('.as-panel')[i]).prev().click(); }, 700);
               
               }
         }
       }
   }
 });
}
//End Refresh List when Form is Submitted




/******************************************End AREA Command Center Section****************************************************************/

//CUSTOM FILTER OBJECT
var filterData = 
[ 
 {//Test Communities & Contacts
     "view_id": "view_4122",
     "filters": [
       {  
         'icon': 'fa-building',
         'title': 'Service Today',
         'filter_id': 'as-active',
         'filter':[
           {
             "field":"field_141",
             "operator":"is",
             'value': 'Yes'
           }
         ]
       },
       { 
         'icon': '',
         'title': 'All Communities',
         'filter_id': 'as-inactive',
         'filter':[{}]
       }
     ]
 },
 { //Verify Compactor Logs
   "view_id": "view_4079",
   "filters": [
     { 
       'icon': 'fa-exclamation-circle',
       'title': 'Warnings',
       'filter_id': 'as-warnings',
       'filter':[
         {
           "field":"field_1963",
           "operator":"lower than",
           'value': 2
         }
       ]
     },
     { 
       'icon': 'fa-file-text',
       'title': 'All Services',
       'filter_id': 'as-all',
       'filter':[
         {
           "field":"field_95",
           "operator":"is not blank"
         }
       ]
     }
   ]
 },
 { //RADAR Logs
   "view_id": "view_4097",
   "filters": [
     { 
       'icon': 'fa-exclamation-circle',
       'title': 'Not Updated',
       'filter_id': 'today_filter',
       'filter':[
         {
           "field":"field_74",
           "operator":"is blank"
         }
       ]
     },
     { 
       'icon': 'fa-file-text',
       'title': 'All RADAR',
       'filter_id': 'as-all',
       'filter':[
         {}
       ]
     }
   ]
 },
 { //Community Service History
   "view_id": "view_4151",
   "filters": [
     { 
       'icon': 'fa-users',
       'title': "All Services",
       'filter_id': 'allservices',
       'filter':[
         {
           "field":"field_95",
           "operator":"is not blank"
         }
       ]
     },
     { 
       'icon': 'fa-building-o',
       'title': "Today's Service",
       'filter_id': 'today_filter',
       'filter':[
         {
           "field":"field_46",
           "operator":"is",
           'value': currentServiceDate()
         }
       ]
     }
   ]
 },//view_4206
  { //Today's Service IDs
   "view_id": "view_4732",
   "filters": [
     { 
       'icon': 'fa-users',
       'title': "Pending",
       'filter_id': 'tspending',
       'filter':[
         {
           "field":"field_121",
           "operator":"is",
           'value': 'Pending'
         }
       ]
     },
     { 
       'icon': 'fa-building-o',
       'title': "In Progress",
       'filter_id': 'tsip',
       'filter':[
         {
           "field":"field_121",
           "operator":"is",
           'value': 'Started - In Progress'
         }
       ]
     },
     { 
       'icon': 'fa-building-o',
       'title': "Completed",
       'filter_id': 'tscompleted',
       'filter':[
         {
           "field":"field_121",
           "operator":"is",
           'value': 'Complete'
         }
       ]
     }
   ]
 },//view_3850
 { //Pre-Service Rview Service
   "view_id": "view_3850",
   "filters": [
     { 
       'icon': 'fa-users',
       'title': "Yesterday's Services",
       'filter_id': 'today_filter',
       'filter':[
         {
           "field":"field_46",
           "operator":"is",
           'value': prevServiceDate()
         }
       ]
     },
     { 
       'icon': 'fa-users',
       'title': "Today's Services",
       'filter_id': 'ryservice1',
       'filter':[
         {
           "field":"field_46",
           "operator":"is",
           'value': currentServiceDate()
         }
       ]
     }
   ]
 },//view_3850
 { //Pre-Service Rview Service
   "view_id": "view_4081",
   "filters": [
     { 
       'icon': 'fa-users',
       'title': "Reported Today",
       'filter_id': 'today_filter',
       'filter':[
         {
           "field":"field_1499",
           "operator":"is",
           'value': currentServiceDate()
         }
       ]
     },
     { 
       'icon': 'fa-users',
       'title': "All Hazards",
       'filter_id': 'ryservice',
       'filter':[
         {
           "field":"field_1499",
           "operator":"is not blank"
         }
       ]
     }
   ]
 },
 { //Compactor Logs
   "view_id": "view_4113",
   "filters": [
     { 
       'icon': 'fa-building-o',
       'title': "Compactors Today",
       'filter_id': 'today_filter',
       'filter':[
         {
           "field":"field_257",
           "operator":"is",
           'value': currentServiceDate()
         }
       ]
     },
     { 
       'icon': 'fa-folder',
       'title': "All Compactors",
       'filter_id': 'ryservice',
       'filter':[
         {
           "field":"field_257",
           "operator":"is not blank"
         }
       ]
     }
   ]
 },
 { //Manage TImeClock
   "view_id": "view_4118",
   "filters": [
     { 
       'icon': 'fa-building-o',
       'title': "Today's TimeClocks",
       'filter_id': 'today_filter',
       'filter':[
         {
           "field":"field_113",
           "operator":"is",
           'value': currentServiceDate()
         }
       ]
     },
     { 
       'icon': 'fa-folder',
       'title': "All TimeClocks",
       'filter_id': 'ryservice',
       'filter':[
         {
           "field":"field_113",
           "operator":"is not blank"
         }
       ]
     }
   ]
 },
 { //Infractions
   "view_id": "view_4112",
   "filters": [
     { 
       'icon': 'fa-building-o',
       'title': "Today",
       'filter_id': 'today_filter',
       'filter':[
         {
           "field":"field_66",
           "operator":"is",
           'value': currentServiceDate()
         }
       ]
     },
     { 
       'icon': 'fa-folder',
       'title': "All Infractions",
       'filter_id': 'ryservice',
       'filter':[
         {
           "field":"field_66",
           "operator":"is not blank"
         }
       ]
     }
   ]
 },{ //Butler Audit New Site Checklist
   "view_id": "view_4752",
   "filters": [
     { 
       'icon': 'fa-users',
       'title': "Butler's Audit",
       'filter_id': 'as-not-updated',
       'filter':[
         {
           "field":"field_689",
           "operator":"is",
           'value': 'Butler Audit'
         }
       ]
     },
     { 
       'icon': 'fa-building-o',
       'title': 'Community Audit',
       'filter_id': 'as-all',
       'filter':[
         {
           "field":"field_689",
           "operator":"is",
           'value': 'Community Audit'
         }
       ]
     }
   ]
 },{ //TapCheck Review - https://builder.sv.knack.com/apps/trashdash#pages/scene_1708
     "view_id": "view_4653",
     "filters": [
       { 
         'icon': 'fa-flag',
         'title': "Flagged",
         'filter_id': 'flagged',
         'filter':[
           {
             "field":"field_2212",
             "operator":"is",
             'value': 'Yes'
           }
         ]
       },{ 
       'icon': '',
       'title': 'All',
       'filter_id': 'as-all',
       'filter':[
         {
         }
       ]
     }
     ]
   },//view_4760
   { //All Service IDs
   "view_id": "view_4760",
   "filters": [
     { 
       'icon': 'fa-users',
       'title': "Pending",
       'filter_id': 'tspending',
       'filter':[
         {
           "field":"field_121",
           "operator":"is",
           'value': 'Pending'
         }
       ]
     },
     { 
       'icon': 'fa-building-o',
       'title': "In Progress",
       'filter_id': 'tsip',
       'filter':[
         {
           "field":"field_121",
           "operator":"is",
           'value': 'Started - In Progress'
         }
       ]
     },
     { 
       'icon': 'fa-building-o',
       'title': "Completed",
       'filter_id': 'tscompleted',
       'filter':[
         {
           "field":"field_121",
           "operator":"is",
           'value': 'Complete'
         }
       ]
     }
   ]
 },
 { //FLEX ADD FILTER https://builder.sv.knack.com/apps/trashdash/pages/scene_2051/views/view_5877/table/source
     "view_id": "view_5877",
     "filters": [
         { 
           'icon': 'fa-flag',
           'title': "Today's Services",
           'filter_id': 'todays',
           'filter':[
             {
               "field":"field_46",
               "operator":"is today",
             }
           ]
         },
         { 
           'icon': 'fa-flag',
           'title': "Yesterday's Services",
           'filter_id': 'yesterdays',
           'filter':[
             {
               "field":"field_46",
               "operator":"is during the previous",
               "range":1,
               "type":"days"
             }
           ]
         },{
           'icon': '',
           'title': 'All',
           'filter_id': 'as-all',
           'filter':[
             {
             }
           ]
       }
     ]
   },
   { //FLEX ADD FILTER https://builder.sv.knack.com/apps/trashdash/pages/scene_2051/views/view_5959/table/source
     "view_id": "view_5959",
     "filters": [
         { 
           'icon': 'fa-flag',
           'title': "Today's Services",
           'filter_id': 'todays',
           'filter':[
             {
               "field":"field_46",
               "operator":"is today",
             }
           ]
         },
         { 
           'icon': 'fa-flag',
           'title': "Yesterday's Services",
           'filter_id': 'yesterdays',
           'filter':[
             {
               "field":"field_46",
               "operator":"is during the previous",
               "range":1,
               "type":"days"
             }
           ]
         },{
           'icon': '',
           'title': 'All',
           'filter_id': 'as-all',
           'filter':[
             {
             }
           ]
       }
     ]
   },
   { //FLEX ADD FILTER https://builder.sv.knack.com/apps/trashdash/pages/scene_2051/views/view_5960/table/source
     "view_id": "view_5960",
     "filters": [
         { 
           'icon': 'fa-flag',
           'title': "Today's Services",
           'filter_id': 'todays',
           'filter':[
             {
               "field":"field_46",
               "operator":"is today",
             }
           ]
         },
         { 
           'icon': 'fa-flag',
           'title': "Yesterday's Services",
           'filter_id': 'yesterdays',
           'filter':[
             {
               "field":"field_46",
               "operator":"is during the previous",
               "range":1,
               "type":"days"
             }
           ]
         },{
           'icon': '',
           'title': 'All',
           'filter_id': 'as-all',
           'filter':[
             {
             }
           ]
       }
     ]
   },
   { //FLEX ADD FILTER https://builder.sv.knack.com/apps/trashdash/pages/scene_2051/views/view_5961/table/source
     "view_id": "view_5961",
     "filters": [
         { 
           'icon': 'fa-flag',
           'title': "Today's Services",
           'filter_id': 'todays',
           'filter':[
             {
               "field":"field_46",
               "operator":"is today",
             }
           ]
         },
         { 
           'icon': 'fa-flag',
           'title': "Yesterday's Services",
           'filter_id': 'yesterdays',
           'filter':[
             {
               "field":"field_46",
               "operator":"is during the previous",
               "range":1,
               "type":"days"
             }
           ]
         },{
           'icon': '',
           'title': 'All',
           'filter_id': 'as-all',
           'filter':[
             {
             }
           ]
       }
     ]
   },
]
var activeFilter;
var todayFilter = {'match': 'and',
                      'rules': [{
                        'field': 'field_46', //status
                        'operator': 'is',
                        'value': currentServiceDate()
                      }]}
for (let i = 0; i < filterData.length; i++) {
   $(document).on('knack-view-render.'+filterData[i].view_id, function(event, view, data) {
     var filterDiv = `<div id=${filterData[i].view_id}_c_filter'><div class="custom_filter js-filter-menu tabs is-toggle is-flush"><div><ul></ul></div><div></div></div></div>`
     if( $('#'+filterData[i].view_id).length > 0){
       if( $('#'+filterData[i].view_id+'_c_filter').length == 0 ){$($('#'+filterData[i].view_id+' .view-header')[0]).append(filterDiv);}
       var view_filters = filterData[i].filters
       for (let j = 0; j < view_filters.length; j++) {
         var icon = `<i class="fa `+view_filters[j].icon+`"></i>`;
         if( $(`#${view_filters[j].filter_id}`).length === 0 ){
           $(`#${filterData[i].view_id} .custom_filter ul`).append(`<li id=`+view_filters[j].filter_id+`><a class="custom_filter-li-a">`+icon+`<span class="as-custom-title">`+`  `+view_filters[j].title+`</span></a></li>`);
           $('.kn-add-filter').addClass('as-add-filter-js')
           activeFilter !== undefined ? $(activeFilter).addClass('is-active') : console.log('No Active filter')
         }
 
         $('.kn-remove-filter').on('click', function(){
           activeFilter = undefined
         })
         
         if(searchParam('is_today')){
             activeFilter = '#today_filter'; $('#today_filter').click();
         }
         
         if(searchParam('active')){
             activeFilter = '#today_filter';
         }
        
         $('#'+view_filters[j].filter_id).on('click', function(){
           var cFilter;
           activeFilter = '#'+view_filters[j].filter_id
           var loc = location.href;
           //Today's Service 
           if(filterData[i].view_id == "view_4732"){
             var todayAndFilter = todayFilter.rules.concat(view_filters[j].filter)
             var todayAndFilter = {'match': 'and',
                        'rules': todayAndFilter}
             var dest = loc.split('?')[0] + '?'+filterData[i].view_id+'_filters=' + encodeURIComponent(JSON.stringify(todayAndFilter));
           }else{
             var dest = loc.split('?')[0] + '?'+filterData[i].view_id+'_filters=' + encodeURIComponent(JSON.stringify(view_filters[j].filter));
           }
           window.location.href = dest;
         });
       }
     }
   });
}
//END CUSTOM FILTER OBJECT


//********************************Hide new service hazard Manage Logs and Infractions AS

$(document).on("knack-view-render.view_3819", function(event, view, data) {//Review SERVICE ID - https://apps.sv.knack.com/trashdash#area-command-center/dashboards/pre-service-dashboard/service-id-review/review-service-id/61ed1d269e23c12f8dfe902a/
 $($('#view_3819 .as-accordion')[3]).hide()
});










//Knack.showSpinner();
//view_5023







//POPUP Functionality







// view_5233





















// Define a reusable function for constructing the announcement notice HTML
function createNoticeHtml(title, id) {
 return `<div class="announcement alert alert-primary alert-dismissible fade show" role="alert">
   <span class="announcement-title alert-link"><strong>${title}</strong></span>
   <span class="announcement-details"><a href="#apps-announcements/view-announcement/${id}">Click here to learn more</a></span>
   <button type="button" class="close" data-dismiss="alert" aria-label="Close">
     <span aria-hidden="true">&times;</span>
   </button>
 </div>`;
}

// Event listener for rendering the first view
$(document).on('knack-view-render.view_5427', function(event, view, data) {
 console.log("View 5427 data:", data);
 var noticeHtml = createNoticeHtml(data[0].field_2990_raw, data[0].id);
 $('#announcements-container').prepend(noticeHtml);
 $('.announcement-details').hide();
 
 $('.announcement').on('click', function(event) {
   $(this).find('.announcement-details').show('fast');
 });
 
 $('.close').on('click', function(event) {
   $(this).closest('.announcement').hide('fast');
 });
});

// Event listener for rendering the second view
$(document).on('knack-view-render.view_5431', function(event, view, data) {
 console.log("View 5431 data:", data);
 if (data) {
   var noticeHtml = createNoticeHtml(data.field_2990_raw, data.id);
   $('#announcement-details').html(noticeHtml);
 }
});



//view_5499

//end queues functions

$(document).on('knack-view-render.view_6027', function(event, view, data) {
 $('#view_6027').append(`<label for="viewId">View ID:</label>
   <input type="text" id="viewId" name="viewId">`).append(`<button id="check_link">Check Link</button>`).append('<hr>')
   .append(`<table id="viewCheckerTable">
     <thead>
       <tr>
         <th>View ID</th>
         <th>Scene ID</th>
         <th>Type</th>
         <th>Link</th>
       </tr>
     </thead>
     <tbody>
     </tbody>
   </table>`);

 $('#check_link').on('click', function() {
   if( $('#viewId') != '' ){ 
     const targetViewKey = $('#viewId').val();
     const sceneWithView = Knack.scenes.models.find(scene => {
       return scene.attributes.views.some(view => view.key === targetViewKey);
     });

     if (sceneWithView) {
       const targetView = sceneWithView.attributes.views.find(view => view.key === targetViewKey);
       const targetType = targetView.type;
       const link = `https://builder.sv.knack.com/apps/trashdash/pages/${sceneWithView.attributes.key}/views/${targetViewKey}/${targetType}`;
       $('#viewCheckerTable tbody').prepend(`<tr>
           <td>${targetViewKey}</td>
           <td>${sceneWithView.attributes.key}</td>
           <td>${targetType}</td>
           <td><a href="${link}" target="_blank">
           ${link}</a></td>
         </tr>`);
     } else {
       alert(`The view ${targetViewKey} is not present in any scene`);
     }

     $('#viewId').val('');
   }
 });
})

$(document).on('knack-view-render.view_6035', function(event, view, data) {
 // Create an object to hold the grouped scenes
 var groupedScenes = {};

 Knack.scenes.models.forEach(function(scene) {
   // Extract scene properties
   var id = scene.attributes.key;
   var views = scene.attributes.views.map(view => view.key);
   var slug = scene.attributes.slug;
   var parentSlug = scene.attributes.parent || "PARENTS";

   // Add scene information to appropriate grouping
   if (!groupedScenes[parentSlug]) {
     groupedScenes[parentSlug] = [];
   }
   groupedScenes[parentSlug].push({id, views, slug, parentSlug});
 });

 // Load the external script using AJAX
 $.ajax({
   url: 'https://joshm-sv.github.io/tb-knack/dist/old.js',
   dataType: 'text',
   success: function(scriptText) {
     // Iterate through each view cell and update the "In Script?" value
     $('td.view-id').each(function(index, elem) {
       var viewId = $(elem).text();
       var viewExists = scriptText.includes(viewId);
       var inScriptText = viewExists ? 'Yes' : 'No';

       // Update the corresponding table cell with the value
       $(elem).siblings('.in-script').text(inScriptText);

       // Hide/show the row based on whether or not the view is in the script
       if (!viewExists && $('#toggle-btn').hasClass('active')) {
         $(elem).closest('tr').hide();
       } else {
         $(elem).closest('tr').show();
       }
     });

     // Save the script text for later use
     KNACK_GLOBALS.SCRIPT_TEXT = scriptText;
   }
 });

 // Declare KNACK_GLOBALS object
 var KNACK_GLOBALS = {
   SCRIPT_TEXT: "",
   // Add any other properties that you may need to use later
 };

 // Append the table to the container element
 $('#view_6035').html(Object.entries(groupedScenes).map(([parent, scenes], index) =>
   `<div class="scene-group" style="background-color: ${index % 2 ===0 ? '#f1f1f1' : '#e3e3e3'};">
     <div style="margin-bottom: 20px;">
       <button class="accordion" style="background-color: #ddd; color: black; padding: 14px 20px; font-size: 16px; border: none; cursor: pointer; width: 100%; text-align: left; outline: none;">${parent} - ${scenes[0].id}</button>
       <div class="panel active" style="padding: 0 18px; display: block; overflow: hidden;">
         <table style="width: 100%;">
           <thead>
             <tr>
               <th style="text-align: left;">Scene ID</th>
               <th style="text-align: left;">Slug</th>
               <th style="text-align: left;">Subtable</th>
             </tr>
           </thead>
           <tbody>
             ${scenes.map(({id, views, slug}) => `
               <tr class="scene-id-row">
                 <td style="text-align: left;">${id}</td>
                 <td style="text-align: left;">${slug}</td>
                 <td>
                   <table style="width: 100%;">
                     <thead>
                       <tr>
                         <th style="text-align: left; padding-right: 10px;">View ID</th>
                         <th style="text-align: left;">In Script?</th>
                       </tr>
                     </thead>
                     <tbody>
                       ${views.map(viewId => `
                         <tr class="view-id-row">
                           <td style="text-align: left; padding-right: 10px;" class="view-id">${viewId}</td>
                           <td class="in-script">Loading...</td>
                         </tr>
                       `).join('')}
                     </tbody>
                   </table>
                 </td>
               </tr>
             `).join('')}
           </tbody>
         </table>
       </div>
     </div>
   </div>
 `).join('<hr>'));
 
 // Add "active" class to all accordions
 $("button.accordion").addClass("active");

 // Add accordion functionality
 var acc = document.getElementsByClassName("accordion");
 for (var i = 0; i < acc.length; i++) {
   acc[i].addEventListener("click", function() {
     var panel = this.nextElementSibling;
     if (panel.style.display === "block") {
       panel.style.display = "none";
       this.classList.remove("active");
     } else {
       panel.style.display = "block";
       this.classList.add("active");
     }
   });
 }

 // Add toggle button and functionality
 $('#view_6035').prepend(`
   <div style="margin-bottom: 20px; text-align: right;">
     <button id="toggle-btn" style="background-color: #ddd; color: black; padding: 14px 20px; font-size: 16px; border: none; cursor: pointer; outline: none;">Show or hide views not in script</button>
   </div>
 `);

 $('#toggle-btn').on('click', function() {
   var scriptText = KNACK_GLOBALS.SCRIPT_TEXT;

   $(this).toggleClass('active');
   $('td.view-id').each(function(index, elem) {
     var viewId = $(elem).text();
     var viewExists = scriptText.includes(viewId);

     if (!viewExists && $('#toggle-btn').hasClass('active')) {
       $(elem).closest('tr').hide();
     } else {
       $(elem).closest('tr').show();
     }
   });
 });
});

