removeImageOverlayArray.forEach((item, index) => {
    if (item.type){
      if (item.type == "details_1"){
        rmvO_details(item);
      }else if (item.type =="details_2"){
        rmvO_details(item);
      }
      
    }else{
       rmvO_list(item);
    }
    
  });
  
  function rmvO_list(item){
    $(document).on(`knack-view-render.${item.view_id}`,function (event, view, data) {
        var imageUrl = "";
        var start_url = "";
        var end_url = "";
        var new_url = "";
        var orig_image;
  
        
        for (var i = 0; i < data.length; i++) {
          item.fields.forEach((item1, index1) => {
            
            orig_image = data[i][item1.field_id];
            imageUrl = $(orig_image).attr("src");
            
            
            if (imageUrl == undefined) return; 
            start_url = imageUrl.split("upload");
  
  
              //Check if image url has overlay
              if (imageUrl.includes("bo_5px_solid_black")) {
                
                //remove overlay params in url
                if (imageUrl.includes("fl_keep_iptc/v")) {
                  end_url = start_url[1].split("fl_keep_iptc/v");
  
                } else {
                  end_url = start_url[1].split("bo_5px_solid_black/v");
                }
  
                new_url = start_url[0] + "upload/fl_keep_iptc/v" + end_url[1];
                //end remove
                
              } else {
                new_url = imageUrl;
              }
  
            //change image url with no overlay
            if (item.view_id == "view_3370"){
              
              $( "#" + data[i].id + ' img' ).attr("src", new_url);
              
            }else{
               
              $( "#" + data[i].id + ' [class*=' + item1.field_id + '] img' ).attr("src", new_url);
  
              $( "#" + data[i].id + ' [class*=' + item1.field_id + '] img' ).attr("data-kn-img-gallery", new_url);
  
              
            }
              
          });
        }
      }
                   
    );
  }
  
  function rmvO_details(item){
    $(document).on(`knack-view-render.${item.view_id}`,function (event, view, data) {
         var imageUrl = "";
      var start_url = "";
      var end_url = "";
      var new_url = "";
      var orig_image;
  
  
      item.fields.forEach((item1, index1) => {
            
        orig_image = data[item1.field_id];
        imageUrl = $(orig_image).attr("src");
  
  
        if (imageUrl == undefined) return; 
        start_url = imageUrl.split("upload");
  
  
          //Check if image url has overlay
          if (imageUrl.includes("bo_5px_solid_black")) {
  
            //remove overlay params in url
            if (imageUrl.includes("fl_keep_iptc/v")) {
              end_url = start_url[1].split("fl_keep_iptc/v");
  
            } else {
              end_url = start_url[1].split("bo_5px_solid_black/v");
            }
  
            new_url = start_url[0] + "upload/fl_keep_iptc/v" + end_url[1];
            //end remove
  
          } else {
            new_url = imageUrl;
          }
  
        //change image url with no overlay
  
          $( "#" + item.view_id + ' div[class*=' + item1.field_id + '] img' ).attr("src", new_url);
  
        
  
  
  
      });
  
  
        
    });
  }
  
  function rmvO_details_group(item){
    $(document).on(`knack-view-render.${item.view_id}`,function (event, view, data) {
        var imageUrl = "";
        var start_url = "";
        var end_url = "";
        var new_url = "";
        var orig_image;
  
  
        for (var i = 0; i < data.length; i++) {
          item.fields.forEach((item1, index1) => {
            
            orig_image = data[i][item1.field_id];
            imageUrl = $(orig_image).attr("src");
            
            
            if (imageUrl == undefined) return; 
            start_url = imageUrl.split("upload");
  
  
              //Check if image url has overlay
              if (imageUrl.includes("bo_5px_solid_black")) {
                
                //remove overlay params in url
                if (imageUrl.includes("fl_keep_iptc/v")) {
                  end_url = start_url[1].split("fl_keep_iptc/v");
  
                } else {
                  end_url = start_url[1].split("bo_5px_solid_black/v");
                }
  
                new_url = start_url[0] + "upload/fl_keep_iptc/v" + end_url[1];
                //end remove
                
              } else {
                new_url = imageUrl;
              }
  
            //change image url with no overlay
            if (item.view_id == "view_3370"){
              
              $( "#" + data[i].id + ' img' ).attr("src", new_url);
              
            }else if (item.view_id == "view_3376"){
              
              $( "#" + data[i].id + ' img' ).attr("src", new_url);
  
              $( "#" + data[i].id + ' img' ).attr("data-kn-img-gallery", new_url);
              
            }else{
               
              $( "#" + data[i].id + ' [data-field-key="' + item1.field_id + '"] img' ).attr("src", new_url);
  
              $( "#" + data[i].id + ' [data-field-key="' + item1.field_id + '"] img' ).attr("data-kn-img-gallery", new_url);
            
            }
              
          });
        }
      }
                   
    );
  }