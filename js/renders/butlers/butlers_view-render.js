var asHeader = {
    'X-Knack-Application-Id': Knack.application_id,
    "X-Knack-REST-API-Key": window.knackRestApiKey,
    'Authorization': Knack.getUserToken()
};

// view_68 Butler Today's Services
$(document).on('knack-view-render.view_68', function(event, view, data){
    // Create the label as a jQuery object
    const label = $('<p>').html(`<span class="kn-detail-label"><span style="font-weight: bold;">Community Entry Gate Code</span></span>`);
   
    // Add the label to the table rows
    $('tbody .field_938').prepend(label);
   
    // Handle table row clicks
    $('#view_68 tr').on('click', function() {
      // Redirect to the linked page
      const href = $(this).find('a').attr('href');
      window.location.href = href;
      return false;
    });
});


//This is the view modification for Butlers - dropdown
const butlerViews = {
    ['Today\'s Services']: 'view_68',
    ['Current Time Clocks']: 'view_457',
 
 }
 
 for (let view in butlerViews) {
    $(document).on(`knack-view-render.${butlerViews[view]}`, () => {
        $(`#${butlerViews[view]} .view-header h2`).html(`<i class="fa fa-chevron-down"></i>${view}<i class="fa fa-chevron-down"></i>`);
        $(`#${butlerViews[view]} .view-header`).click(function() {
            $(`#${butlerViews[view]} .kn-table-wrapper`).slideToggle(300, () => {
                if ($(`#${butlerViews[view]} .view-header h2`).html().indexOf('down') > -1)
                    $(`#${butlerViews[view]} .view-header h2`).html(`<i class="fa fa-chevron-up"></i>${view}<i class="fa fa-chevron-up"></i>`);
                else
                    $(`#${butlerViews[view]} .view-header h2`).html(`<i class="fa fa-chevron-down"></i>${view}<i class="fa fa-chevron-down"></i>`);
            });
        });
    });
 }
 //end Butler view modification

 //view_5039
$(document).on('knack-view-render.view_5039', function(event, view, data){
    $('#sv_show_popup').click();
    $($('#view_5039').parents()[0]).hide();
});

var allDismissedB;
var allLive = [];
// view_5223
$(document).on('knack-view-render.view_5223', async function(event, view, data){
   $('#kn-scene_7 .view-group-4').addClass('hideMe')
   var userProfKeys = Knack.session.user.profile_keys;
   var isDev = userProfKeys.includes('profile_34');
   var allLiveData = Knack.views.view_5039.model.data.map((b) => {return b.attributes})
   await getLivePopUpsB();
   await checkIfOpenPopup();
   
   function getLivePopUpsB(){
     if(isDev){
       allLive = Knack.views.view_5039.model.data.map((b) => {return b.id})
     }else{
       for (let i = 0; i < allLiveData.length; i++) {
         if( !allLiveData[i].field_2881_raw ){ allLive.push( allLiveData[i].id ) }
       }
     }
   }

   function checkIfOpenPopup(){
     $('#view_5223-field_2892').val() == null ? allDismissedB = [] : allDismissedB = $('#view_5223-field_2892').val()
     for (let i = 0; i < allLive.length; i++) {
       if( !allDismissedB.includes(allLive[i]) ){ 
         $($('#view_5218 .kn-link')[0]).find('span').click();
         break;
       }
     }
   }
});

//view_5219
$(document).on('knack-view-render.view_5219', async function(event, view, data){
    if( $('.sv_carousel_bs').length == 0 ){
      var sv_car = `<link class="sv_carousel_bs" rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">`;
      $('head').append(sv_car);
      $('head').append(`<script class="lazyload" src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>`)
      $('head').append(`<script class="lazyload" src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>`)
      $('head').append(`<script class="lazyload" src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>`)
    }
    redirectToButlerPageIfNotModal()
    var userProfKeys = Knack.session.user.profile_keys;
    var isDev = userProfKeys.includes('profile_34');
    $($('#view_5219').parents()[1]).hide()
    $('.field_2648').hide();
    try{ 
      $('#kn-scene_1904').removeClass('kn-scene').css('text-align', 'center')
      $('#view_5219 img').css('width', '100%')
      if( $('#view_5223').length > 0  ){//Check if the form exist
         var allDismissed = [];
         allDismissed.push(data[0].id)
         $('#view_5223-field_2892').val(allDismissed).trigger("liszt:updated").change();
         $('#view_5219 button').on('click', function(){
             $('.close-modal').click()
             $('#view_5223 .kn-submit button').click();
         })
    }}catch(err){console.log(err)}
    var notDismissed = [];
    function getNotDismissed(){
        for (let i = 0; i < data.length; i++) {
          if( !allDismissedB.includes( data[i].id ) ){
            if( isDev ){ notDismissed.push(data[i]) }
            else{
              if( !data[i].field_2881_raw){
                notDismissed.push(data[i])
              }
            }
          }
        }
     }
     function checkIfWillCreatePopUp(){
       if(notDismissed.length == 0){
         $('.close-modal').click()
       }else{
         createPopup(notDismissed, "scene_1904")
       }
     }
     await getNotDismissed()
     await checkIfWillCreatePopUp()
     $('.carousel-inner img').css('width', "100%")
   
     await addButtonFunction()
});

function updateButlerDismissedPopup(allDismissed){
    var currentRoles = Knack.session.user.profile_objects;
    var currentButlerId = currentRoles.find(x => x.object == "object_4").entry_id
    return $.ajax({
          type: 'PUT',
          headers: asHeader,
          url: 'https://api.sv.knack.com/v1/pages/scene_7/views/view_5223/records/'+currentButlerId,
          data: {
            field_2892: allDismissed
          },
          success: function(res) {
          }
    });
 }
 
 function addButtonFunction(){
  $('.sv_dont_show').on('click', function(){
      allDismissedB.push( $(this).attr('data-id') )
      $($(this).parents()[0]).remove()
      $($('.carousel-item')[0]).addClass('active')
      
      updateButlerDismissedPopup(allDismissedB)
      if( $('.carousel-item').length === 0 ){
          $('.close-modal').click()
      }
 
      if( $('.carousel-item').length == 1 ){
        $('#carousel_control').remove()
      }
  })
 }
 
 function redirectToButlerPageIfNotModal(){
  if( $('.modal-card-head').length === 0 ){ 
     window.location.href = 'https://apps.sv.knack.com/trashdash#butler'
  }
}

//This hides the clocked in timestamp on the Butler clock in form so that it can still collect information
$(document).on("knack-view-render.view_5044", function(event, view, data) {
    $("#kn-input-field_113").addClass('hideMe');
 });

 //This hides the timestamp fields on the Butler Clock Out form so that they can still collect information
$(document).on("knack-view-render.view_5054", function(event, view, data) {
    $("#kn-input-field_114").addClass('hideMe');
});

//view_5054 Highligh Icon when clicked 
$(document).on('knack-view-render.view_5054', function(event, view, data){
    $('#view_5054 input[type=radio]').on('click', function(){
        $($(this).parents()[1]).addClass('sv-icon-highlight')
        $($($(this).parents()[1]).siblings()[0]).removeClass('sv-icon-highlight')
    })
 });

 //view_5054
$(document).on('knack-form-submit.view_5054', function(event, view, record) {
    if( record.field_2793 != '' ){ // if Butler Timeclock Thumbs Up/Down is not blank, insert a record to the Butler Service Ratings
        KnackViewApi.SaveObject('scene_950', 'view_5183', { 'field_2796' : record.id }).then((res) => {
        });
    }
});

//view_4089 Butler Report service hazard 
$(document).on('knack-view-render.view_4089', function(event, view, data){
    $("#view_4089-field_1500").prop("selectedIndex", 1).trigger("liszt:updated").change();
});

var doneUploadBtnArray = ['view_5506', 'view_5507', 'view_5512', 'view_5551']; //I'M DONE UPLOADING PHOTOS

doneUploadBtnArray.forEach((view_id, idx) => {
   $(document).on(`knack-view-render.${view_id}`, function(event, view, data) {
     $(`#${view_id}`).css('text-align', 'center')
     $(`#${view_id}`).css('cursor', 'pointer')
        $(`#${view_id}`).on('click', function(){
           if( $('.delete.close-modal').length > 0 ){
               $('.delete.close-modal').click();
           }else{
               window.history.back();
           }
       })
   });
});

//view_5439
$(document).on('knack-form-submit.view_5439', function(event, view, record) {
    $('#view_5439').hide();
    $('.edit-hazard-form').show();
});