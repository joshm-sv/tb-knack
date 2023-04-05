async function closeOrRedirect(name, services, coms) {
    const unassignedToCom = coms.map(b => b.field_37).join('<br>');
    const unassignedToSer = services.map(b => b.field_1939).join('<br>');
   
    const secondLine = `${name} is unassigned to the following records:`;
    const unassignedToComHtml = `<div class="col"><h5>Communities</h5><div>${unassignedToCom}</div></div>`;
    const unassignedToSerHtml = `<div class="col"><h5>Service IDs</h5><div>${unassignedToSer}</div></div>`;
    const newT = `<div class="row">${unassignedToComHtml} ${unassignedToSerHtml}</div>`;
   
    const textT = document.createElement("div");
    textT.innerHTML = newT;
   
    if ($('.kn-modal').length == 0) {
      history.back();
    } else {
      $('.close-modal').click();
      Knack.views.view_5312.model.fetch();
    }
   
    await swal({
      title: `You have successfully deactivated ${name}`,
      text: secondLine,
      content: textT,
      icon: "success",
      button: "Close"
    });
   }
   
async function getAllComAssignments(b_id, c_data) {
    const comCurrentButlers = c_data.map(b => b.field_41_raw);
   
    for (let i = 0; i < c_data.length; i++) {
      const c_ids = c_data.map(b => b.id);
      const comCurrentButlersIds = comCurrentButlers[i].map(b => b.id);
      const updatedButlers = comCurrentButlersIds.filter(item => item !== b_id);
   
      await updateComAPI(c_data[i].id, updatedButlers);
    }
}
   
async function removeFromServiceToday(b_id, servicesData) {
    const servCurrentButlers = servicesData.map(b => b.field_55_raw);
   
    for (let i = 0; i < servicesData.length; i++) {
      const c_ids = servicesData.map(b => b.id);
      const servCurrentButlersIds = servCurrentButlers[i].map(b => b.id);
      const updatedButlers = servCurrentButlersIds.filter(item => item !== b_id);
   
      await updateServAPI(servicesData[i].id, updatedButlers);
    }
}
   
function updateComAPI(comId, updatedButlers) {
console.log("comId", comId, "updatedButlers", updatedButlers);
Knack.showSpinner();

return $.ajax({
    type: 'PUT',
    headers: asHeader,
    url: `https://api.sv.knack.com/v1/objects/object_8/records/${comId}`,
    data: {
    field_41: updatedButlers
    },
    success: function(data) {
    console.log(data, "updateComAPI Successfull");
    Knack.hideSpinner();
    }
});
}
   
function updateServAPI(servId, updatedButlers) {
console.log("servId", servId, "updatedButlers", updatedButlers);

return $.ajax({
    type: 'PUT',
    headers: asHeader,
    url: `https://api.sv.knack.com/v1/objects/object_9/records/${servId}`,
    data: {
    field_55: updatedButlers
    },
    success: function(data) {
    console.log(data, "updateServAPI Successfull");
    }
});
}

$(document).on('knack-view-render.view_5316', function(event, view, data){
    $('#view_5316 [type="submit"]').prop('disabled', true);
    var ck = `<input type="checkbox" id="ischecked" class="checkTest" name="checkT">
    <label for="checkT"> By continuing, I have reviewed the above data and I'm ready to deactivate the Butler's user access effective immediately. </label><br>`;
    $('#view_5316 form').prepend(ck);
   
    $('#ischecked').click(function() {
          if(this.checked) {
            $('#view_5316 [type="submit"]').prop('disabled', false);
          }else{
            $('#view_5316 [type="submit"]').prop('disabled', true);
          }
                 
    });
});

// Deactivate Butler - Remove Connection
$(document).on('knack-form-submit.view_5316', async function(event, view, record) {
    console.log(record, "Deactivate Butler - Remove Connection");
   
    const b_id = record.id;
    const servicesData = Knack.views.view_5434.model.data.models.map(b => b.attributes);
    const c_data = Knack.views.view_5433.model.data.models.map(b => b.attributes);
   
    await Promise.all([
      getAllComAssignments(b_id, c_data),
      removeFromServiceToday(b_id, servicesData),
      closeOrRedirect(record.field_16, servicesData, c_data)
    ]);
});

//view_5346
$(document).on('knack-view-render.view_5346', function(event, view, data){
    if( $('#swal').length === 0 ){
      $('head').append(`<script class="lazyload" id="swal" src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>`);
    }
});
