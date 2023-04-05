$(document).on('knack-view-render.view_5209', function(event, view, data){
    $('#view_5209').append(`<section id="sv_popup_prev"></section>`)
   });
$(document).on('knack-view-render.view_5293', function(event, view, data){
    $('#view_5293').append(`<section id="sv_popup_prev"></section>`)
});

// view_5208 Butler Popup https://builder.sv.knack.com/apps/trashdash/pages/scene_1900/views/view_5208/form
$(document).on('knack-view-render.view_5208', function(event, view, data){
    $('#view_5208_field_2877_chzn li').on('click', function(){ 
        if($('#view_5208-field_2877').val() != ''){
            KnackViewApi.GetObject('scene_1902', 'view_5212', $('#view_5208-field_2877').val(), {}).then((res) => {
                $('#sv_popup_prev').html(res)
                var newTemplate = `<div style="align-items: center;text-align: center;">
                <h2>${res.field_2648}</h2>
                <p>${res.field_2879}</p>
                <p>${res.field_2646}</p>
                <hr>
                </div>`
                $('#sv_popup_prev').html(newTemplate)
            });
        }
    })
 });
 
 // view_5214 Popup to CMs
 $(document).on('knack-view-render.view_5214', function(event, view, data){
    $('#view_5214_field_2478_chzn li').on('click', function(){ 
        if($('#view_5214-field_2478').val() != ''){
            KnackViewApi.GetObject('scene_1902', 'view_5212', $('#view_5214-field_2478').val(), {}).then((res) => {
                $('#sv_popup_prev').html(res)
                var newTemplate = `<div style="align-items: center;text-align: center;">
                <h2>${res.field_2648}</h2>
                <p>${res.field_2879}</p>
                <p>${res.field_2646}</p>
                <hr>
                </div>`
                $('#sv_popup_prev').html(newTemplate)
            });
        }
    })
 });