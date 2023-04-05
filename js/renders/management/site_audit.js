$(document).on("knack-view-render.view_4618", function(event, view, data) {
    $('#as_continue_audit_next').html('Next > Add Photos')
   });
   
   //view_4819 Save and Continue Later Btn Butler - https://builder.sv.knack.com/apps/trashdash#pages/scene_1697
   $(document).on("knack-view-render.view_4820", function(event, view, data) {
      $('#view_5267').hide();
      $('#view_4819 button[type=button]').addClass('hideMe')
      $('#kn-input-field_1916').addClass('hideMe');
      $('#kn-input-field_1900').addClass('hideMe');
      $('#as_continue_later_audit').on('click', function(){
          computeButlerScore()
          $('#view_4819-field_1900').prop("selectedIndex", 2);
          $('#field_2917').prop("selectedIndex", 1);
          $('#view_4819 form').submit();
          $('#view_4618 form').submit();
          $('.close-modal').click();
      });
      $('#as_continue_audit_next').on('click', function(){
          $('#field_2917').prop("selectedIndex", 0);
          computeButlerScore()
          validateFields()
          $('#view_4618 form').submit();
      })
   
      function validateFields(){
      var allField = $('#view_4819-field_1833').val() == '' || $('#field_1835').val() == '' ||
          $('#view_4819-field_1836').val() == '' || $('#field_1838').val() == '' ||
          $('#view_4819-field_1839').val() == '' || $('#field_1841').val() == '' ||
          $('#view_4819-field_1842').val() == '' || $('#field_1844').val() == '' ||
          $('#view_4819-field_1845').val() == '' || $('#field_1847').val() == '' ||
          $('#view_4819-field_1848').val() == '' || $('#field_1850').val() == '' ||
          $('#view_4819-field_1851').val() == '' || $('#field_1853').val() == '' ||
          $('#view_4819-field_1854').val() == '' || $('#field_1856').val() == '' ||
          $('#view_4819-field_1857').val() == '' || $('#field_1859').val() == '' ||
          $('#view_4819-field_1860').val() == '' || $('#field_1862').val() == ''  
      if(allField){
      $('#view_5267').show();
      $('html, #kn-modal-bg-0').animate({ scrollTop: $("#view_5267").offset().top }, 1000);
    }else{
        $('#view_4819-field_1900').prop("selectedIndex", 1);
        $('#view_4819 form').submit();
      }
   }
});

// view_5382
$(document).on("knack-view-render.view_5382", function(event, view, data) {
    $("#view_5382 .kn-submit").addClass('hideMe')
   });
   // view_5380
   $(document).on("knack-view-render.view_5380", function(event, view, data) {
      $($("#view_5255").parents()[1]).hide()
   });
   
   //view_5384
   $(document).on("knack-view-render.view_5384", function(event, view, data) {
      $("#view_5384 .kn-submit").addClass('hideMe');
   });
   
   //view_5373 Save and Continue Later Btn Butler - https://builder.sv.knack.com/apps/trashdash#pages/scene_1697
   $(document).on("knack-view-render.view_5385", function(event, view, data) {
      $('#as_continue_later_audit').on('click', function(){
          $('#field_2917').prop("selectedIndex", 1);
          $('#view_5384 form').submit();
      });
      $('#as_continue_audit_next').on('click', function(){
          validateFields()
      })
   
      function validateFields(){
        var allField =  $('#view_5384-field_389').val() == ''||
          $('#view_5384-field_390').val() == '' ||
          $('#view_5384-field_391').val() == '' ||
          $('#view_5384-field_392').val() == '' ||
          $('#view_5384-field_393').val() == '' ||
          $('#view_5384-field_394').val() == '' ||
          $('#view_5384-field_395').val() == '' ||
          $('#view_5384-field_396').val() == '' ||
          $('#view_5384-field_397').val() == '' ||
          $('#view_5384-field_398').val() == ''
        if(allField){
          $('#view_4497').show();
          $('.sv-field-validation').removeClass('hideMe')
          $('html, #kn-modal-bg-0').animate({ scrollTop: $("#view_4497").offset().top }, 1000);
        }else{
            $('#field_2917').prop("selectedIndex", 0);
            $("#view_5384 form").submit()
        }
      }
   });
   
   //view_5382
   $(document).on("knack-view-render.view_5382", function(event, view, data) {
      $("#view_5382 .kn-submit").addClass('hideMe');
   });
   
   //view_5373 Save and Continue Later Btn Butler - https://builder.sv.knack.com/apps/trashdash#pages/scene_1697 TTTTTTTTTTTTTTTTTTTTTTTTT
   $(document).on("knack-view-render.view_5376", function(event, view, data) {
      $('#as_continue_later_audit').on('click', function(){
          $('#field_2917').prop("selectedIndex", 1);
          $('#view_5382 form').submit();
      });
      $('#as_continue_audit_next').on('click', function(){
          $('#field_2917').prop("selectedIndex", 0);
          validateFields()
          
      })
   
      function validateFields(){
        var allField =  $('#view_5382-field_389').val() == ''||
          $('#view_5382-field_390').val() == '' ||
          $('#view_5382-field_391').val() == '' ||
          $('#view_5382-field_392').val() == '' ||
          $('#view_5382-field_393').val() == '' ||
          $('#view_5382-field_394').val() == '' ||
          $('#view_5382-field_395').val() == '' ||
          $('#view_5382-field_396').val() == '' ||
          $('#view_5382-field_397').val() == '' ||
          $('#view_5382-field_398').val() == ''
        if(allField){
          $('.sv-field-validation').removeClass('hideMe')
          $('html, #kn-modal-bg-0').animate({ scrollTop: $("#kn-input-field_390").offset().top }, 1000);
        }else{
            $('#field_2917').prop("selectedIndex", 0);
            $("#view_5382 form").submit()
        }
      }
   });
   
   //Audit's Ive Completed Mobile Version - https://builder.sv.knack.com/apps/trashdash/pages/scene_1694/views/view_4860/list
   $(document).on("knack-view-render.view_4860", function(event, view, data) {
      var userProfKeys = Knack.session.user.profile_keys;
      var isDev = userProfKeys.includes('profile_34');
      
      for(let i = 0; i < data.length; i++){
          if(data[i].field_689 != 'Butler Audit'){
              $('#view_4860 .field_409').hide();
              $('#view_4860 .field_192').hide();
          }
          if(!isDev){
              $($($('.update-audit-photos')[i]).parents()[4]).hide();
          }
      }
});

// view_4705
$(document).on('knack-view-render.view_4705', function(event, view, data){
  $($('#view_4705').parents()[1]).addClass('sticky');
  var nav = `<div id="audit_nav" class="align-self-end">
  <button class="audit-nav kn-button" data-id="inProgressAudit">In Progress</button>
  <button class="audit-nav kn-button" data-id="noAudit30_Days">No Audit Last 30 Days</button>
  <button class="audit-nav kn-button" data-id="allAudits">All Audits</button>
  <button class="audit-nav kn-button" data-id="completedAudits">My Audits</button>
  </div>`;
 
  if( $('#audit_nav').length === 0 ){$($('#view_4705').parents()[1]).append(nav);}
 
  $('.audit-nav').on('click', function(){
    var viewId = $(this).attr('data-id')
    $('html,body').animate({
          scrollTop: $("#"+viewId).offset().top - 170 },
      'slow');
  })
});

var inProgressAudit = [
  'view_5406',
  `view_5268`,
  `view_5274`];
  var noAudit30_Days = ['view_4837',
  'view_4839',
  'view_4838',
  'view_4858',
  'view_4717',
  'view_4851',
  'view_4850',
  'view_4852'];
  var allAudits = ['view_4617',
  'view_4656',
  'view_4854',
  'view_4857',
  'view_4627',
  'view_4713',
  'view_4853',
  'view_4859'];
  var completedAudits = [
  'view_4708',
  'view_4860',
  ];
  
  $(document).on('knack-scene-render.scene_1694', function(event, scene) {
      if( screen.width > 700){
          $('.kn-list.kn-view').remove();
          $('.view-group.view-group-9').remove();
      }else{
          $('.kn-table.kn-view').remove();
          $('.view-group.view-group-2').remove();
          $('.view-group.view-group-3').remove();
          $('.view-group.view-group-6').remove();
      }
      setTimeout(responsiveAcc, 2000)
      var userProfKeys = Knack.session.user.profile_keys;
      if( $('#inProgressAudit').length === 0 ){
          $('#view_5350').append(`<div id="inProgressAudit"></div>`);
          $('#view_5350').append(`<div id="noAudit30_Days"></div>`)
          $('#view_5350').append(`<div id="allAudits"></div>`)
          $('#view_5350').append(`<div id="completedAudits"></div>`)
  
          for(let i = 0; i < inProgressAudit.length; i++){
            $('#inProgressAudit').append( $('#'+inProgressAudit[i]) )
          }
          for(let i = 0; i < noAudit30_Days.length; i++){
            $('#noAudit30_Days').append( $('#'+noAudit30_Days[i]) )
          }
          for(let i = 0; i < allAudits.length; i++){
            $('#allAudits').append( $('#'+allAudits[i]) )
          }
          for(let i = 0; i < completedAudits.length; i++){
            $('#completedAudits').append( $('#'+completedAudits[i]) )
          }
      }
});

// view_5371
$(document).on('knack-view-render.view_5371', function(event, view, data){
  if(data.length > 1){
  $($('.kn-list-item-container')[0]).append(`<button class="audit-show audit-show btn btn-outline-success btn-block" style="font-size: .8em;"><i class="fa fa-eye"></i> VIEW MORE</button>`)
  $('#view_5371').append(`<button class="audit-hide btn btn-outline-success btn-block" style="font-size: .8em;"><i class="fa fa-eye"></i> SHOW LESS</button>`)
  $(".audit-show").hide();
  $(".audit-hide").click(function(){
    $('.kn-list-item-container:not(:first)').hide('slow')
    $(".audit-show").show("fast");
    $(".audit-hide").hide("fast");
  });
 
  $(".audit-show").click(function(){
    $('.kn-list-item-container:not(:first)').show('slow')
    $(".audit-show").hide("fast");
    $(".audit-hide").show("fast");
  });
  }else{
    $('.audit-show').hide();
    $('.audit-hide').hide();
  }
});

// view_5358
$(document).on('knack-view-render.view_5358', function(event, view, data){
  if(data.length > 1){
  $($('.kn-list-item-container')[0]).append(`<button class="audit-show audit-show btn btn-outline-success btn-block" style="font-size: .8em;"><i class="fa fa-eye"></i> VIEW MORE</button>`)
  $('#view_5358').append(`<button class="audit-hide btn btn-outline-success btn-block" style="font-size: .8em;"><i class="fa fa-eye"></i> SHOW LESS</button>`)
  $(".audit-show").hide();
  $(".audit-hide").click(function(){
    $('.kn-list-item-container:not(:first)').hide('slow')
    $(".audit-show").show("fast");
    $(".audit-hide").hide("fast");
  });
 
  $(".audit-show").click(function(){
    $('.kn-list-item-container:not(:first)').show('slow')
    $(".audit-show").hide("fast");
    $(".audit-hide").show("fast");
  });
  }else{
    $('.audit-show').hide();
    $('.audit-hide').hide();
  }
});

//view_5388
$(document).on('knack-view-render.view_5388', function(event, view, data){
  try{
    var currentButler = Knack.views.view_4861.model.attributes.field_192_raw[0].id;
    for(var i = 0; i < data.length; i++){
      if(data[i].field_112_raw[0].id != currentButler) {
        $($('#view_5388 .kn-list-item-container')[i]).hide()
      }
    }
  }catch(err){
    console.log(err)
  }
 });
 
 //view_5403
 $(document).on('knack-view-render.view_5403', function(event, view, data){
  try{
    var currentButler = Knack.views.view_5366.model.attributes.field_192_raw[0].id;
    for(var i = 0; i < data.length; i++){
      if(data[i].field_112_raw[0].id != currentButler) {
        $($('#view_5403 .kn-list-item-container')[i]).hide()
      }
    }
  }catch(er){ console.log(er) }
 });

//view_5402
$(document).on('knack-view-render.view_5402', function(event, view, data){
  try{
    var currentButler = Knack.views.view_5355.model.attributes.field_192_raw[0].id;
    for(var i = 0; i < data.length; i++){
      if(data[i].field_112_raw[0].id != currentButler) {
        $($('#view_5402 .kn-list-item-container')[i]).hide()
      }
    }
  }
  catch(err){
    console.log(err)
  }
});