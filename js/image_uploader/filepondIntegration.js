var imageUrlUpdate = async function (record, params, isUpdate) {

    try {

        var waterMarkData = [];
        var img_email = "";
        var exifGeoStatus = 0;  // 0 = NO GEO  1 = EXIF DATA  2 = DEVICE DATA
        var exifTimeStatus = 0; // 1 = EXIF DATA  2 = DEVICE DATA

        var imgList = $('.imgListURL').val();
        var imgPlaceholder = $('.imgListURL1').val();
        var imgID = $('.imgList').val();
        var geo_status = $('.geo_status').val();
        var time_status = $('.time_status').val();

        var logger = {};


        logger['1'] = "FlexAdd Started";
        if (params.address_field_id && ((`${params.address_field_id}_raw` in record) && record[`${params.address_field_id}_raw`])) { //check if there's an address
            var addressField = record[`${params.address_field_id}_raw`];
            var address = '';

            if (('street' in addressField) && addressField['street']) {
                address += addressField.street + '\n';
            }

            if ((('city' in addressField) && addressField['city']) && (('state' in addressField) && addressField['state'])) {
                address += `${addressField.city}, ${addressField.state}`;
            }

            if (address.length > 0) {
                waterMarkData.push(address);

                if (params.is_multiple) {
                    exifGeoStatus = 2;
                } else {
                    if (record['field_2492'] == "EXIF Data" || record['field_2491'] == "EXIF Data" ||
                        record['field_2493'] == "EXIF Data" || record['field_2494'] == "EXIF Data" ||
                        record['field_2441'] == "EXIF Data" ||
                        record['field_2426'] == "EXIF") {

                        exifGeoStatus = 1;
                    } else {
                        exifGeoStatus = 2;
                    }
                }

            } else {
                exifGeoStatus = 0;
            }




        } else {
            exifGeoStatus = 0;
        }

        if ((params.timestamp_field_id in record) && record[params.timestamp_field_id]) { //check if there's a timestamp
            waterMarkData.push(record[params.timestamp_field_id]);
            if (record['field_2492'] == "EXIF Data" || record['field_2491'] == "EXIF Data" ||
                record['field_2493'] == "EXIF Data" || record['field_2494'] == "EXIF Data" ||
                record['field_2441'] == "EXIF Data" ||
                record['field_2426'] == "EXIF") {

                exifTimeStatus = 1;
                iLogger("exifTimeStatus 1: ", record[params.timestamp_field_id]);
            } else {
                exifTimeStatus = 2;
                iLogger("exifTimeStatus 2: ", record[params.timestamp_field_id]);
            }
        } else {

            var today = new Date();
            var dateTime = today.toLocaleString();

            waterMarkData.push(dateTime);
            exifTimeStatus = 2;
        }



        //only update if there's data to watermark.
        if (waterMarkData.length > 0) {
            var imageFieldRaw = record[`${params.image_field_id}_raw`];
            var imageUrl = '';

            if (typeof imageFieldRaw == 'object') {
                imageUrl = imageFieldRaw.url;
            } else {
                imageUrl = imageFieldRaw;
            }

            iLogger("image url: " + imageUrl);

            // console.log("imgList: ", imgList);

            if (params.is_multiple) {
                if (imgList != "" && imgList != undefined) {
                    logger['2'] = "Start Overlays for Multi Uploader";
                    var imgLists = imgList.split(',');
                    var imgPH = imgPlaceholder.split(',');
                    var imgIDs = imgID.split(',');

                    var sGeo_status = geo_status.split(',');
                    var sTime_status = time_status.split(',');

                    var counter = 0;
                    var totalCount = imgLists.length - 1;


                    SlickLoader.enable();
                    SlickLoader.setText("Saving Images", "");

                    logger['3'] = "Start Overlays for Multi Uploader";
                    for (i = 0; i < imgLists.length - 1; i++) {


                        var leftLabel = "";

                        if (sGeo_status[i] == "EXIF") {
                            exifGeoStatus = 1;
                        } else if (record[`${params.address_field_id}_raw`]) {
                            exifGeoStatus = 2;
                        } else {
                            exifGeoStatus = 0;
                        }

                        if (sTime_status[i] == "EXIF") {
                            exifTimeStatus = 1;
                        } else {
                            exifTimeStatus = 2;
                        }



                        if (exifGeoStatus == 1 && exifTimeStatus == 1) {
                            leftLabel = "EXIF/EXIF";
                        } else if (exifGeoStatus == 1 && exifTimeStatus == 2) {
                            leftLabel = "EXIF/DEVICE";
                        } else if (exifGeoStatus == 2 && exifTimeStatus == 1) {
                            leftLabel = "DEVICE/EXIF";
                        } else if (exifGeoStatus == 2 && exifTimeStatus == 2) {
                            leftLabel = "DEVICE/DEVICE";
                        } else if (exifGeoStatus == 0 && exifTimeStatus == 1) {
                            leftLabel = "NONE/EXIF";
                        } else if (exifGeoStatus == 0 && exifTimeStatus == 2) {
                            leftLabel = "NONE/DEVICE";
                        }

                        var data = {};

                        if (imgLists[i] !== "EXIF") {

                            var urls = imgLists[i].split("upload");
                            //   leftLabel = "DEVICE/EXIF";
                            var watermarkString = waterMarkData.join('\n');
                            var watermarkParam = `f_auto,c_scale,fl_relative,l_text:Doppio%20One_20_stroke:${encodeURIComponent(encodeURIComponent(watermarkString))},g_south_east,y_5,x_10,co_rgb:FFF,bo_5px_solid_black/`;
                            watermarkParam += `c_scale,fl_relative,l_text:Doppio%20One_20_stroke:${encodeURIComponent(encodeURIComponent(leftLabel))},g_south_west,y_5,x_10,co_rgb:FFF,bo_5px_solid_black/fl_keep_iptc`;
                            var imageRelPath = urls[1];

                            if (isUpdate) {
                                var url1Arr = urls[1].split("/");
                                imageRelPath = `/${url1Arr[url1Arr.length - 2]}/${url1Arr[url1Arr.length - 1]}`
                            }

                            var updatedImageUrl = `${urls[0]}upload/${watermarkParam}${imageRelPath}`;

                            updatedImageUrl = updatedImageUrl.replaceAll('+', '%20');
                            data[params.image_field_id] = updatedImageUrl;
                            img_email = img_email + "<img src='" + updatedImageUrl + "'><br>"

                        } else {


                            var urls = imgPH[i].split("upload");

                            var watermarkString = waterMarkData.join('\n');
                            var watermarkParam = `f_auto,c_scale,fl_relative,l_text:Doppio%20One_20_stroke:${encodeURIComponent(encodeURIComponent(watermarkString))},g_south_east,y_5,x_10,co_rgb:FFF,bo_5px_solid_black/`;
                            watermarkParam += `c_scale,fl_relative,l_text:Doppio%20One_20_stroke:${encodeURIComponent(encodeURIComponent(leftLabel))},g_south_west,y_5,x_10,co_rgb:FFF,bo_5px_solid_black/fl_keep_iptc`;
                            var imageRelPath = urls[1];

                            if (isUpdate) {
                                var url1Arr = urls[1].split("/");
                                imageRelPath = `/${url1Arr[url1Arr.length - 2]}/${url1Arr[url1Arr.length - 1]}`
                            }

                            var updatedImageUrl = "";

                            try {
                                let found = window.exifOverlays.find(({ id }) => id === imgIDs[i]);
                                updatedImageUrl = found.url;

                                data[params.image_field_id] = updatedImageUrl;
                            } catch (e) {

                            }


                            img_email = img_email + "<img src='" + updatedImageUrl + "'><br>"
                        }

                        data[params.connection_field_id] = record.id; //Set Connection Record 
                        data["field_3140"] = "Upload Complete"; //Update Upload Status

                        if (params.address_field_id) {
                            data["field_2965"] = { //address
                                latitude: record[`${params.address_field_id}_raw`].latitude,
                                longitude: record[`${params.address_field_id}_raw`].longitude
                            };
                        }

                        if (params.service_id) {
                            data["field_2253"] = record[`${params.service_id}_raw`][0].id;
                        }

                        if (params.community_unit) {
                            try {
                                data["field_3139"] = record[`${params.community_unit}_raw`][0].id;
                            } catch (e) {

                            }
                        }

                        if (params.media_caption) {
                            data['field_2249'] = params.media_caption;
                        }


                        if (exifGeoStatus == 2 && sGeo_status[i] == "NONE") {
                            data["field_2441"] = "DEVICE";
                        }

                        if (params.connection_field_id == "field_2963") {
                            data["field_2240"] = "Butler Audit";
                        } else if (params.connection_field_id == "field_2244") {
                            data["field_2240"] = "Service Hazard";
                        } else if (params.connection_field_id == "field_2242") {
                            data["field_2240"] = "Resident Infraction";
                        }
                        else if (params.connection_field_id == "field_2250") {
                            data["field_2240"] = "Compactor Log";
                        }
                        else if (params.connection_field_id == "field_2251") {
                            data["field_2240"] = "RADAR Log";
                        }
                        else if (params.connection_field_id == "field_2252") {
                            data["field_2240"] = "Butler Timeclock";
                        }



                        counter = i + 1;

                        SlickLoader.setText("Saving Images . . .", + counter + " / " + totalCount);

                        var useNoneAjax = true;

                        if (useNoneAjax) {  //Check if Ajax is supported
                            //Use None Jquery Ajax to update record
                            var xhr = new XMLHttpRequest();
                            xhr.open("PUT", `https://api.sv.knack.com/v1/objects/${params.object_id}/records/${imgIDs[i]}`, true);
                            xhr.setRequestHeader('Authorization', Knack.getUserToken());
                            xhr.setRequestHeader('X-Knack-Application-Id', Knack.application_id);
                            xhr.setRequestHeader('X-Knack-REST-API-Key', window.knackRestApiKey);
                            xhr.setRequestHeader('Content-Type', 'application/json');

                            xhr.onreadystatechange = function () {
                                if (xhr.readyState === 4 && xhr.status === 200) {
                                    Knack.hideSpinner();
                                    if (params.list_view_id) {
                                        try {
                                            Knack.views[params.list_view_id].model.fetch();
                                        } catch (err) {
                                        }

                                    }
                                }
                            }
                            xhr.send(JSON.stringify(data));

                        } else {

                            await $.ajax({
                                url: `https://api.sv.knack.com/v1/objects/${params.object_id}/records/${imgIDs[i]}`,
                                type: 'PUT',
                                headers: {
                                    'Authorization': Knack.getUserToken(),
                                    'X-Knack-Application-Id': Knack.application_id,
                                    'X-Knack-REST-API-Key': window.knackRestApiKey,
                                    'Content-Type': 'application/json'
                                },
                                data: JSON.stringify(data),
                                success: () => {


                                    if (params.list_view_id) {
                                        try {
                                            Knack.views[params.list_view_id].model.fetch();
                                        } catch (err) {
                                        }

                                    }
                                }
                            });
                        }


                    }

                    if (params.email_image_id) {
                        triggerUpdateServiceHazardForm(record.id, img_email);
                    }

                    setTimeout(function () {
                        SlickLoader.disable();
                        Knack.hideSpinner();
                        window.exifOverlays = [];

                        // Knack.router.scene_view.renderViews();

                        if (`${params.upload_view_id}` == "view_5003") {
                            // Knack.views.view_4763.model.fetch()
                            Knack.router.scene_view.renderViews()
                        }

                        if (`${params.upload_view_id}` == "view_4089") {
                            try {
                                Knack.views.view_5440.model.fetch()
                            } catch (err) {

                            }
                        }

                        if (`${params.upload_view_id}` == "view_5002") {
                            Knack.views.view_4798.model.fetch()
                        }

                        if (`${params.upload_view_id}` == "view_5004") {
                            Knack.views.view_4806.model.fetch()
                        }

                        if (`${params.upload_view_id}` == "view_5005") {
                            Knack.views.view_4802.model.fetch()
                        }

                        if (`${params.upload_view_id}` == "view_4993") {
                            Knack.views.view_4877.model.fetch()
                        }
                    }, 3000);


                }else{

                    var error= {
                        "message" : "imgList is blank or undefined",
                        "stack" : "imgList is blank or undefined"
                      }

                    var newImages =  window.imageContainer;

                    var blankImg = {
                        "imgList" : imgList,
                        "imgID" : imgID,
                        "images" :  newImages
                    }

                    SV_Errorhandler("processFlexAddforMultiImage", error, errDeviceData(), blankImg);
                }
            } else {

                iLogger("Start Overlays for Single Uploader");
                logger['2'] = "Start Overlays for Single Uploader";

                var leftLabel = "";

                if (exifGeoStatus == 1 && exifTimeStatus == 1) {
                    leftLabel = "EXIF/EXIF";
                } else if (exifGeoStatus == 1 && exifTimeStatus == 2) {
                    leftLabel = "EXIF/DEVICE";
                } else if (exifGeoStatus == 2 && exifTimeStatus == 1) {
                    leftLabel = "DEVICE/EXIF";
                } else if (exifGeoStatus == 2 && exifTimeStatus == 2) {
                    leftLabel = "DEVICE/DEVICE";
                } else if (exifGeoStatus == 0 && exifTimeStatus == 1) {
                    leftLabel = "NONE/EXIF";
                } else if (exifGeoStatus == 0 && exifTimeStatus == 2) {
                    leftLabel = "NONE/DEVICE";
                }

                iLogger("leftLabel: ", leftLabel);

                SlickLoader.enable();
                SlickLoader.setText("Saving Images", "");

                iLogger("current image url: ", imageUrl);

                var urls = imageUrl.split("upload");
                var watermarkString = waterMarkData.join('\n');
                var watermarkParam = `f_auto,c_scale,fl_relative,l_text:Doppio%20One_20_stroke:${encodeURIComponent(encodeURIComponent(watermarkString))},g_south_east,y_5,x_10,co_rgb:FFF,bo_5px_solid_black/`;
                watermarkParam += `c_scale,fl_relative,l_text:Doppio%20One_20_stroke:${encodeURIComponent(encodeURIComponent(leftLabel))},g_south_west,y_5,x_10,co_rgb:FFF,bo_5px_solid_black/fl_keep_iptc`;
                var imageRelPath = urls[1];


                iLogger("watermark params: ", watermarkString);
                iLogger("imageRelPath: ", imageRelPath);
                if (params.add_watermark) {
                    var updatedImageUrl = `${urls[0]}upload/${watermarkParam}${imageRelPath}`;
                } else {
                    var updatedImageUrl = `${urls[0]}upload/${imageRelPath}`;
                }

                iLogger("updatedImageUrl: ", updatedImageUrl);
                logger['3'] = updatedImageUrl;

                var updatedImageUrl_temp = `${urls[0]}upload/${imageRelPath}`;
                //CHECK EXTENTION

                var extension = updatedImageUrl_temp.substring(updatedImageUrl_temp.length - 3);


                if (extension.toUpperCase() == "PDF") {
                    updatedImageUrl = updatedImageUrl_temp;
                }

                //END CHECK EXTENTION

                Knack.showSpinner();
                var data = {};

                var data2 = {};

                updatedImageUrl = updatedImageUrl.replaceAll('+', '%20');

                data[params.image_field_id] = updatedImageUrl;
                data2['field_2237'] = updatedImageUrl;

                var today = new Date();
                var date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                var dateTime = date + " " + time;


                if (params.upload_view_id == "view_5044") { //clockin
                    // data["field_113"] = dateTime;
                } else if (params.upload_view_id == "view_5054") { //clockout
                    // data["field_114"] = dateTime;
                } else if (params.upload_view_id == "view_5045" ||
                    params.upload_view_id == "view_5046" ||
                    params.upload_view_id == "view_5052" ||
                    params.upload_view_id == "view_5053" ||
                    params.upload_view_id == "view_4158" || params.upload_view_id == "view_4945") { //compactor
                    data["field_103"] = dateTime;
                    data["field_1928"] = dateTime;
                } else if (params.upload_view_id == "view_5047") { //service hazard
                    data["field_1180"] = dateTime;
                } else if (params.upload_view_id == "view_5048") { //radar
                    data["field_2233"] = dateTime;
                } else if (params.upload_view_id == "view_5049" || params.upload_view_id == "view_5051") { //infraction
                    data["field_2234"] = dateTime;
                }


                if (exifTimeStatus == 2) {
                    data[params.timestamp_field_id] = dateTime;
                }

                iLogger("data parameters: ", data);
                logger['4'] = data;

                if (updatedImageUrl.includes("undefined")) {
                    iLogger("URL has undefined value: ", updatedImageUrl);
                    SlickLoader.disable();
                    Knack.hideSpinner();

                    logger['5'] = "undefined value";

                } else {
                    iLogger('updating image');
                    logger['6'] = "updating image";

                    var useNoneAjax = true;

                    if (useNoneAjax) {  //Check if Ajax is supported
                        //Use None Jquery Ajax to update record
                        var xhr = new XMLHttpRequest();
                        xhr.open('PUT', `https://api.sv.knack.com/v1/objects/${params.object_id}/records/${record.id}`);
                        xhr.setRequestHeader('Authorization', Knack.getUserToken());
                        xhr.setRequestHeader('X-Knack-Application-Id', Knack.application_id);
                        xhr.setRequestHeader('X-Knack-REST-API-Key', window.knackRestApiKey);
                        xhr.setRequestHeader('Content-Type', 'application/json');
                        xhr.onload = function () {
                            if (xhr.status === 200) {
                                SlickLoader.disable();
                                Knack.hideSpinner();
                                if (params.list_view_id) {
                                    Knack.views[params.list_view_id].model.fetch();
                                }
                            } else {
                                SlickLoader.disable();
                                Knack.hideSpinner();
                                if (params.list_view_id) {
                                    Knack.views[params.list_view_id].model.fetch();
                                }
                                alert('Request failed.  Returned status of ' + xhr.status);
                            }
                        };
                        xhr.send(JSON.stringify(data));
                    } else {
                        $.ajax({
                            url: `https://api.sv.knack.com/v1/objects/${params.object_id}/records/${record.id}`,
                            type: 'PUT',
                            headers: {
                                'Authorization': Knack.getUserToken(),
                                'X-Knack-Application-Id': Knack.application_id,
                                'X-Knack-REST-API-Key': window.knackRestApiKey,
                                'Content-Type': 'application/json'
                            },
                            data: JSON.stringify(data),
                            success: () => {
                                Knack.hideSpinner();
                                if (params.list_view_id) {
                                    Knack.views[params.list_view_id].model.fetch();
                                }
                            }
                        });

                    }

                    try {
                        if (params.flex_add) {
                            data["geo"] = exifGeoStatus;
                            data["time"] = exifTimeStatus;
                            data["field_2253"] = record[`${params.service_id}_raw`][0].id;

                            logger['7'] = "Adding flex add";
                            addNewFlexAddRecord(record, params, data);
                        }
                    } catch (err) {
                        logger['error 8'] = err;
                        serverLogs(logger);
                        SV_Errorhandler("addNewFlexAddRecord", err, errDeviceData(), data);
                    }

                }


                SlickLoader.disable();
            }

        }

    }
    catch (err) {
        logger['error 9'] = err;
        serverLogs(logger);

        SlickLoader.disable();
        Knack.hideSpinner();
        SV_Errorhandler("imageUrlUpdate", err, errDeviceData(), JSON.stringify(record));
    }


};

window.imageUploadIntegrationArray.forEach((item, index) => {
    //there should be both the image_browse_field_id and image_field_id

    if (!('image_field_id' in item)) return;

    var renderSelector = item.is_view_popup ? 'knack-modal-render' : 'knack-view-render';

    $(document).on(`${renderSelector}.${item.upload_view_id}`, function (event, view, record) {
        imageList = [];
        existingImage = [];
        existingImageIds = [];
        filesToDelete = [];
        window.imageContainer = [];

        $(`#${item.upload_view_id}`).find(`input#${item.image_field_id}`).addClass('hideMe');
        $(`#kn-input-${item.timestamp_field_id}`).addClass('hideMe');
        $(`#kn-input-${item.log_id}`).addClass('hideMe');
        $(`#kn-input-${item.email_image_id}`).addClass('hideMe');
        $(`#kn-input-${item.email_image_id} .redactor-toolbar`).css("display", "none");

        if (item.address_field_id) {
            $(`#kn-input-${item.address_field_id}`).addClass('hideMe');
        }

        if (item.object_id == "object_107") {
            $(`#kn-input-field_1245`).addClass('hideMe');
        }

        $(`#kn-input-${item.image_browse_field_id}`).addClass('hideMe');

        if (item.is_multiple) {


            $(`#${item.upload_view_id} #kn-input-${item.log_id} input`).val(makeid(5));


            //try 10x at 500s each time.
            var counter = 0;
            var getImageElemeInt = setInterval(() => {
                var imageElem = null;
                if (item.is_multiple) {
                    imageElem = $(`#${item.upload_view_id}`).find(`#kn-input-${item.image_connection_field_id}`)
                } else {
                    imageElem = $(`#${item.upload_view_id}`).find(`input#${item.image_field_id}`)
                }

                if (imageElem.length > 0) {
                    clearInterval(getImageElemeInt);
                    var imagefield = $(imageElem).find("div.control");
                    $(imagefield).addClass('hideMe');
                } else if (counter < 10) {
                    counter++;
                } else {
                    clearInterval(getImageElemeInt);
                }
            }, 500)

        }

        var fpInt = setInterval(function () {
            if (typeof FilePond != 'undefined') {
                clearInterval(fpInt);
                let imageUploader = new ImageUploader(item);
                imageUploader.setCloudinaryCredentials(window.cloudinaryCredentials);
                imageUploader.init();
            }
        }, 100);
    });


    //Update image url when a record is updated
    if (typeof item.update_view_id != "undefined") {

        $(document).on(`knack-record-update.${item.update_view_id}`, async function (event, view, record) {
            imageUrlUpdate(
                record,
                item,
                true
            );


        });
    }

    //Update image url when a record is added, meaning an image was uploaded.
    $(document).on(`knack-form-submit.${item.upload_view_id}`, async function (event, view, record) {
        var user_details = Knack.getUserAttributes();

        var params = {
            "record": record,
            "item": item,
            "user_token": Knack.getUserToken(),
            "user_id": user_details.id,
        }

        var url = '';
        if (item.is_multiple) {
            url = 'https://uploader.svweb.dev/webhook/update-exif';
        } else {
            url = 'https://n.luckykeniks.com/webhook/flex';
        }

        // if ((item.server_side && user_details.id == "625364fa2dd2c2071c48a09c") || (item.server_side && user_details.id == "5bbcb6d1e4d9f1302c157fee") || (item.server_side && user_details.id == "611d18ecfbee5b07a16a5bd5") || (item.server_side && user_details.id == "60a4ab6ebf6550001bb6f99c")|| (item.server_side && user_details.id == "60b49f9f1f3544001e4b5c93")){
        if (item.server_side) {
            $.ajax({
                url: url,
                type: "POST",
                dataType: 'json',
                data: params,
                success: () => {
                    console.log('Sent to server');
                },
                error: (err) => {
                    console.log("Failed to send to server, continue on client side", err);

                    imageUrlUpdate(
                        record,
                        item,
                        false
                    );
                }
            });
        } else {
            imageUrlUpdate(
                record,
                item,
                false
            );
        }


    });
    // }
});

$(document).on('knack-view-render.view_2536', function (event, view, data) {
 
    $('.field_2442 img').click(function () {
        var imgVal = $(this).attr('src');

        var fileNameDotIdx = imgVal.lastIndexOf(".");
        var fileName = imgVal.substr(0, fileNameDotIdx);

        window.open(fileName + ".pdf", '_blank');
    });


    $('.field_2557 img').click(function () {
        var imgVal = $(this).attr('src');

        var fileNameDotIdx = imgVal.lastIndexOf(".");
        var fileName = imgVal.substr(0, fileNameDotIdx);

        window.open(fileName + ".pdf", '_blank');
    });

    $('.field_2558 img').click(function () {
        var imgVal = $(this).attr('src');

        var fileNameDotIdx = imgVal.lastIndexOf(".");
        var fileName = imgVal.substr(0, fileNameDotIdx);

        window.open(fileName + ".pdf", '_blank');
    });

    $('.field_2559 img').click(function () {
        var imgVal = $(this).attr('src');

        var fileNameDotIdx = imgVal.lastIndexOf(".");
        var fileName = imgVal.substr(0, fileNameDotIdx);

        window.open(fileName + ".pdf", '_blank');
    });
});

$(document).on('knack-view-render.view_3300', function (event, view, data) {

    $('.field_2556 img').click(function () {
        var imgVal = $(this).attr('src');

        var fileNameDotIdx = imgVal.lastIndexOf(".");
        var fileName = imgVal.substr(0, fileNameDotIdx);

        // window.open(fileName + ".pdf", '_blank');
        window.location.replace("https://pdf.svdev.io?l=" + fileName + ".pdf");
        view_5273
        element.innerHTML += "additional HTML code"

        document.getElementById("view_5273").innerHTML +=
            '<iframe src=https://pdf.svdev.io/?l=https://res.cloudinary.com/strategicvisionz/image/upload//v1658249317/2022%20Image%20Uploader%20-%20Trash%20Dash%20Parent%20Directory/Community%20Audits/PDF/7%20-%2019/Trash%20Butler%20Resident%20Flyer%20-%206%20PM%20Sun-Thur%20%2B%20Tue%20Recycling_1658249318284.pdf" width="100%" height="600" style="border:none;"></iframe>';
    });

});

$(document).on('knack-view-render.view_5281', function (event, view, data) {
    $('#send_winner_sms').click(function () {
        alert('its working!');
    });

});

$(document).on('knack-form-submit.view_3297', function (event, view, record) {


    if (record.field_1279 == "Active") {

        record.field_1272_raw.forEach(param => {

            //CHECK EXTENTION

            var updatedImageUrl = record.field_2556_raw;

            var extension = updatedImageUrl.substring(updatedImageUrl.length - 3);

            if (extension.toUpperCase() == "PDF") {

                var fileNameDotIdx = updatedImageUrl.lastIndexOf(".");
                var fileName = updatedImageUrl.substr(0, fileNameDotIdx);


                updatedImageUrl = fileName + ".jpg";

            }

            var data = {};

            data['field_2904'] = updatedImageUrl;


        }
        );


    }
});

$(document).on('knack-form-submit.view_3300', function (event, view, record) {


    if (record.field_1279 == "Active") {

        record.field_1272_raw.forEach(param => {

            //CHECK EXTENTION

            var updatedImageUrl = record.field_2467_raw;

            var extension = updatedImageUrl.substring(updatedImageUrl.length - 3);


            if (extension.toUpperCase() == "PDF") {

                var fileNameDotIdx = updatedImageUrl.lastIndexOf(".");
                var fileName = updatedImageUrl.substr(0, fileNameDotIdx);


                updatedImageUrl = fileName + ".jpg";

            }

            var data = {};

            data['field_2469'] = updatedImageUrl;


            $.ajax({
                url: `https://api.sv.knack.com/v1/objects/object_8/records/${param.id}`,
                type: 'PUT',
                headers: {
                    'Authorization': Knack.getUserToken(),
                    'X-Knack-Application-Id': Knack.application_id,
                    'X-Knack-REST-API-Key': window.knackRestApiKey,
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(data),
                success: () => {
                    console.log('success!');
                }
            });
        }
        );


    }
});

function triggerUpdateServiceHazardForm(hazard_id, imgTagWithOverlays) {


    var data = {};

    data['field_3018'] = imgTagWithOverlays;

    return $.ajax({
        type: 'PUT',
        headers: {
            'Authorization': Knack.getUserToken(),
            'X-Knack-Application-Id': Knack.application_id,
            'X-Knack-REST-API-Key': window.knackRestApiKey,
            'Content-Type': 'application/json'
        },
        url: 'https://api.sv.knack.com/v1/pages/scene_1974/views/view_5525/records/' + hazard_id,
        data: JSON.stringify(data),
        success: function () {
            // console.log('triggerUpdateServiceHazardForm success')
        }
    });
}

function addNewFlexAddRecord(record, params, data) {


    var f_data = {};

    if (params.image_field_id == "field_609") {
        var url = data.field_609;
        f_data['field_2237'] = url.replaceAll('+', '%20');
    } else {
        var url = data.field_260;
        f_data['field_2237'] = url.replaceAll('+', '%20');
    }

    f_data['field_2238'] = 'Image';
    f_data["field_3140"] = "Upload Complete";
    f_data['field_2252'] = record.id;
    f_data['field_2253'] = data.field_2253;
    f_data['field_2441'] = data.field_2441;
    f_data['field_2240'] = "Butler Timeclock";


    if (data.field_113) {
        f_data['field_2245'] = data.field_113;
    } else {

        var today = new Date();
        var date =
            today.getFullYear() +
            "-" +
            (today.getMonth() + 1) +
            "-" +
            today.getDate();
        var time =
            today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + " " + time;

        f_data['field_2245'] = dateTime;
    }

    f_data['field_2965'] = {
        latitude: record[`${params.address_field_id}_raw`].latitude,
        longitude: record[`${params.address_field_id}_raw`].longitude
    }

    if (data.geo == 1) {
        f_data['field_2441'] = "EXIF";
        f_data['field_2255'] = {
            latitude: record[`${params.address_field_id}_raw`].latitude,
            longitude: record[`${params.address_field_id}_raw`].longitude
        }
    } else if (data.geo == 2) {
        f_data['field_2441'] = "DEVICE";
    } else {
        f_data['field_2441'] = "NONE";
    }

    if (data.time == 1) {
        f_data['field_3032'] = "EXIF";
        f_data["field_2246"] = record[params.timestamp_field_id];
    } else {
        f_data['field_3032'] = "DEVICE";
    }

    if (params.media_caption) {
        f_data['field_2249'] = params.media_caption;
    }



    var user_details = Knack.getUserAttributes();

    f_data["field_2239"] = user_details.id



    var useNoneAjax = true;
    if (useNoneAjax) { // Check if Ajax is supported

        //Use None Jquery Ajax to update record

        var xhr = new XMLHttpRequest();
        xhr.open("POST", `https://api.sv.knack.com/v1/objects/object_107/records`);
        xhr.setRequestHeader("Authorization", Knack.getUserToken());
        xhr.setRequestHeader("X-Knack-Application-Id", Knack.application_id);
        xhr.setRequestHeader("X-Knack-REST-API-Key", window.knackRestApiKey);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = function () {
            f_data['status'] = "success";
        };
        xhr.onerror = function (err) {
            console.error("AddFlexAdd Error", err);
            f_data['status'] = "error";
            SV_Errorhandler("addNewFlexAddRecord", err, errDeviceData(), "");
        };
        xhr.send(JSON.stringify(f_data));

    } else {
        $.ajax({
            url: `https://api.sv.knack.com/v1/objects/object_107/records`,
            type: "POST",
            headers: {
                Authorization: Knack.getUserToken(),
                "X-Knack-Application-Id": Knack.application_id,
                "X-Knack-REST-API-Key": window.knackRestApiKey,
                "Content-Type": "application/json",
            },
            data: JSON.stringify(f_data),
            success: function (data) {
                f_data['status'] = "success";
            },
            error: function (err) {
                console.error(err);
                f_data['status'] = "error";
            },
        });
    }
    // serverLogs(f_data);
}

function iLogger(def, params) {
    // console.log("--------------------------------------------------------------------------------");
    // if (params) {
    //     console.log(def, params);
    // } else {
    //     console.log(def);
    // }
    // console.log("--------------------------------------------------------------------------------");

}

function serverLogs(params) {
    // console.log(params);
    // try {
    //     $.ajax({
    //         url: `https://k.luckykeniks.com/webhook/image-logs`,
    //         type: "POST",
    //         dataType: 'json',
    //         data: params,
    //     });

    // } catch (err) {
    //     console.log(err);
    // }
}

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    result = result + "_" + Math.floor(Date.now() / 1000)
    return result;
}