class ImageUploader {
    constructor(imageUploadParams) {
        this.imageList = [];
        this.pendingImages = [];
        this.existingImageFileTypes = [];
        this.existingImageIds = [];
        this.filesToDelete = [];
        this.btnTxt = "";

        this.uploaderParams = imageUploadParams;

        for (var key in imageUploadParams) {
            this[key] = imageUploadParams[key];
        }
    }

    //Class functions
    uploadImage(fieldName, file, metadata, load, error, progress, abort) {
        //cloudinary credentials
        var timestamp = new Date().getTime();
        var fileNameDotIdx = file.name.lastIndexOf(".");
        var fileName = file.name.substr(0, fileNameDotIdx);

        var td_year = new Date().getFullYear();

        const month = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        const d = new Date();
        var td_month = d.getMonth() + 1;
        var td_day = new Date().getDate();

        var public_id = `${fileName}`;

        var public_id = public_id.replace(/\//g, "-"); // replace slash(/) with dash (-)
        var public_id = public_id.replace(/\&/g, "and"); // replace slash(&) with and
        var self = this;

        var e_ID = Knack.getUserAttributes().values.field_1222;

        if (this.folder) {
            public_id = `${this.folder}/${td_month} - ${td_day} - ${td_year}/${public_id}`;
        }

        // var public_id = `${fileName}_${timestamp}`;
        // var self = this;
        // if (this.folder) {
        // 	public_id = `${this.folder}/${public_id}`;
        // }

        var url = `https://api.cloudinary.com/v1_1/${this.cloudName}/upload`;
        var signatureString = "";

        //it's imperative that the keys are in alphabetical order.
        var params = {
            public_id: public_id,
            return_delete_token: true,
            timestamp: timestamp,
        };

        var fd = new FormData();
        //   console.log("file.name: ", file.name);
        fd.append("file", file, file.name);
        fd.append("api_key", this.apiKey);

        for (var key in params) {
            signatureString += `${key}=${params[key]}&`;
            fd.append(key, params[key]);
        }

        //remove the last & and append apiSecret
        signatureString =
            signatureString.substring(0, signatureString.length - 1) + this.apiSecret;
        // console.log("signatureString: ", signatureString);
        var request = new XMLHttpRequest();

        this.digestMessage(signatureString).then((sig) => {
            fd.append("signature", this.hexString(sig));

            request.open("POST", url);

            // Should call the progress method to update the progress to 100% before calling load
            // Setting computable to false switches the loading indicator to infinite mode
            request.upload.onprogress = (e) => {
                progress(e.lengthComputable, e.loaded, e.total);
            };

            // Should call the load method when done and pass the returned server file id
            // this server file id is then used later on when reverting or restoring a file
            // so your server knows which file to return without exposing that info to the client
            request.onload = function () {
                if (request.status >= 200 && request.status < 300) {
                    // the load method accepts either a string (id) or an object
                    load(request.responseText);
                    var response = JSON.parse(request.responseText);
                    var url = response.secure_url;

                    var user_details = Knack.getUserAttributes();

                    // ADD IMAGE DATA TO PENDING OBJECTS
                    var params = {
                        url: response.secure_url,
                        public_id: response.public_id,
                        status: "Pending",
                        user_details: user_details,
                    };


                    // END ADD IMAGE DATA TO PENDING OBJECTS

                    if (fieldName.includes("field_2237")) {
                        self.multiple = true;
                    } else {
                        self.is_multiple = false;
                    }

                    //Download Uploaded Images
                    const blobUrl = URL.createObjectURL(file);
                    var user_details = Knack.getUserAttributes();

                    if (user_details.values.field_3025) {
                        downloadBlob(file, file.name);

                    } else {
                        var dlButton = $(`<a href="${blobUrl}" download='${file.name}'>Save to Device: ${file.name} </a><br/>`);

                        //  var cname = fieldName.replace('filepond-','');

                        var cname = fieldName.replace(`filepond-${self.upload_view_id}-`, '');

                        if (self.is_multiple) {
                            $(`#kn-input-${self.image_connection_field_id}`).append(dlButton);
                        } else {
                            $(`#kn-input-${cname}`).append(dlButton);
                        }

                    }

                    if (self.is_multiple) {

                        var filename = file.name;

                        var vfileNameDotIdx = filename.lastIndexOf(".");
                        var vfileName = filename.substr(0, vfileNameDotIdx)


                        var imgIdx = self.imageList.findIndex(
                            (img) => img.filename.substr(0, img.filename.lastIndexOf(".")) == vfileName
                        );
                        if (imgIdx > -1) {
                            self.imageList[imgIdx].token = response.delete_token;
                            self.imageList[imgIdx].url = url;
                        } else {
                            console.log(
                                `Cannot find image with file name ${fileName} @ index ${imgIdx}`
                            );
                        }
                    } else {
                        var fieldId = fieldName.split("-")[2];
                        var current_view_id = fieldName.split("-")[1]
                        // New Code to fix the issue of multiple form required issue
                        $(`#${current_view_id} #${fieldId}`).val(url);
                    }
                } else {
                    // Can call the error method if something is wrong, should exit after
                    error("oh no");
                }
            };

            request.send(fd);
        });

        // Should expose an abort method so the request can be cancelled
        return {
            abort: () => {
                // This function is entered if the user has tapped the cancel button
                request.abort();
                // Let FilePond know the request has been cancelled
                abort();
            },
        };
    }

    deleteImage(uniqueFileId, load, error) {
        var cloudinaryImgObj = JSON.parse(uniqueFileId);
        var url = `https://api.cloudinary.com/v1_1/${this.cloudName}/delete_by_token`;
        var self = this;

        $.ajax({
            url: url,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                token: cloudinaryImgObj.delete_token,
            }),
            success: function (result) {
                if (self.is_multiple) {
                    var imgIdx = self.imageList.findIndex(
                        (img) => img.token == cloudinaryImgObj.delete_token
                    );
                    if (imgIdx > -1) {
                        self.imageList.splice(imgIdx, 1);
                    } else {
                        console.log(
                            `Cannot find image with file token ${cloudinaryImgObj.delete_token} @ index ${imgIdx}`
                        );
                    }
                }
                load();
            },
            error: function (xhr, status, message) {
                error(message);
            },
        });
    }

    createImage(filePondInput) {
        var timestamp_field_id = this.timestamp_field_id;
        var address_field_id = this.address_field_id;
        var upload_view_id = this.upload_view_id;
        var accepted_files = this.accepted_files
            ? this.accepted_files
            : ["image/*", "video/*"];
        var filePondFilesParam = [];

        var selectedImgUrl = $(`#${this.image_field_id}`).val();

        var subfolder = this.subfolder;

        if (selectedImgUrl && selectedImgUrl.length > 0) {
            filePondFilesParam = [
                {
                    source: selectedImgUrl,
                    options: {
                        type: "local",
                    },
                },
            ];
        }

        this.filePondObj = FilePond.create(filePondInput, {
            labelIdle:
                '<span class="filepond--label-action"><i class="fa fa-camera" style="font-size:2em !important;"></i></span>',
            acceptedFileTypes: accepted_files,
            files: filePondFilesParam,
            onaddfilestart: (file) => {
                this.submitButton.addClass("hideMe");

                // $('.is-primary').attr('disabled','disabled');
                // if (this.is_multiple){
                // 	$('.is-primary').html('Please wait. Images are still uploading . . .');
                // }else{
                // 	$('.is-primary').html('Please wait. Image is still uploading . . .');
                // }

                if (file["serverId"]) {
                    var checkStateInt = setInterval(() => {
                        if (file.status == FilePond.FileStatus.IDLE) {
                            var existingData = {
                                url: file.serverId,
                                fileType: file.file.type,
                            };
                            this.existingImageFileTypes.push(existingData);

                            clearInterval(checkStateInt);
                        }
                    }, 10);

                    return; //skip doing stuff with existing items.
                }

                if (
                    file.fileType.indexOf("video") > -1 ||
                    file.fileType.indexOf("application/octet-stream") > -1
                ) {
                    this.imageList.push({
                        filename: file.file.name,
                    });

                } else {
                    $(".is-primary").attr("disabled", "disabled");
                    if (this.is_multiple) {
                        $(".is-primary").html(
                            "Please wait. Images are still uploading . . ."
                        );
                    } else {
                        $(".is-primary").html(
                            "Please wait. Image is still uploading . . ."
                        );
                    }

                    //EXIF DATA EXTRACTION

                    var img = document.createElement("img");
                    img.src = window.URL.createObjectURL(file.file);
                    img.addEventListener("load", () => {
                        var newImageToUpload = {
                            filename: file.file.name,
                        };

                        EXIF.getData(img, () => {
                            var longitude = null;
                            var latitude = null;
                            var hasGps = true;
                            if (img.exifdata.GPSLongitude) {
                                var lonDegree = img.exifdata.GPSLongitude[0];
                                var lonMinute = img.exifdata.GPSLongitude[1];
                                var lonSecond = img.exifdata.GPSLongitude[2];
                                var lonDirection = img.exifdata.GPSLongitudeRef;
                                longitude = this.convertDMSToDD(
                                    lonDegree,
                                    lonMinute,
                                    lonSecond,
                                    lonDirection
                                );
                            } else {
                                hasGps = false;
                            }

                            if (img.exifdata.GPSLatitude) {
                                var latDegree = img.exifdata.GPSLatitude[0];
                                var latMinute = img.exifdata.GPSLatitude[1];
                                var latSecond = img.exifdata.GPSLatitude[2];
                                var latDirection = img.exifdata.GPSLatitudeRef;
                                latitude = this.convertDMSToDD(
                                    latDegree,
                                    latMinute,
                                    latSecond,
                                    latDirection
                                );
                            } else {
                                hasGps = false;
                            }

                            $(`#${upload_view_id}-${timestamp_field_id}`).val('');
                            $(`#${upload_view_id}-${timestamp_field_id}-time`).val('');

                            if (
                                img.exifdata.DateTimeOriginal &&
                                img.exifdata.DateTimeOriginal.length > 0
                            ) {
                                //let's format the date. "2019:02:24 12:11:07" to MM/DD/YY HH:MM AM/PM
                                var origDate = img.exifdata.DateTimeOriginal.split(" ");
                                var datePart = origDate[0].split(":");
                                var timePart = origDate[1].split(":");

                                var hour = parseInt(timePart[0]);
                                var am_pm = hour < 12 ? "am" : "pm";
                                hour = hour > 12 ? hour - 12 : hour;
                                hour = ("00" + hour).slice(-2);

                                var newDateString = `${datePart[1]}/${datePart[2]}/${datePart[0]}`;
                                var newTimeString = `${hour}:${timePart[1]}${am_pm}`;
                                var dateId = `#${upload_view_id}-${timestamp_field_id}`;
                                var timeId = `#${upload_view_id}-${timestamp_field_id}-time`;

                                newImageToUpload.date = newDateString;
                                newImageToUpload.time = newTimeString;

                                if ($(dateId).length) {
                                    $(dateId).val(newDateString); //date
                                } else {
                                    $(dateId).val(''); //date
                                }

                                if ($(timeId)) {
                                    $(timeId).val(newTimeString); //time
                                } else {

                                }
                            }

                            if (hasGps && address_field_id) {
                                //field_1927 is the address field

  

                                newImageToUpload.lat = latitude;
                                newImageToUpload.lon = longitude;

                                $(`#kn-input-${address_field_id} input`).each(function () {
                                    var fieldName = $(this).attr("name");
                                    if (fieldName == "latitude") {
                                        $(this).val(latitude);
                                        // newImageToUpload.lat = latitude;
                                    } else if (fieldName == "longitude") {
                                        $(this).val(longitude);
                                        // newImageToUpload.lon = longitude;
                                    }
                                });
                            } else {
                                $(`#kn-input-${address_field_id} input`).each(function () {
                                    var fieldName = $(this).attr("name");
                                    if (fieldName == "latitude") {
                                        $(this).val('');
                                        // newImageToUpload.lat = latitude;
                                    } else if (fieldName == "longitude") {
                                        $(this).val('');
                                        // newImageToUpload.lon = longitude;
                                    }
                                });
                            }

                            this.imageList.push(newImageToUpload);
                        });
                    });
                }
            },

            onwarning: () => {
                if (this.is_multiple) {

                    var container = this.filePondObj.element.parentNode;
                    var error = container.querySelector('p.filepond--warning');

                    if (!error) {
                        alert('The maximum number of image upload is ' + (this.upload_limit ? this.upload_limit : 3))
                    }
                }
            },


            onprocessfiles: () => {
                if (this.is_multiple) {
                    $(".is-primary").removeAttr("disabled");
                    $(".is-primary").html(this.btnTxt);
                }
            },

            labelButtonDownloadItem: 'Download Image',
            allowDownloadByUrl: false,

            onprocessfile: (file) => {

                //VALIDATE FIELD IF IMAGE STILL UPLOADING
                if (this.is_multiple) {

                } else {
                    var status1 = "";
                    if (
                        this.upload_view_id == "view_5049" ||
                        this.upload_view_id == "view_5051" ||
                        this.upload_view_id == "view_80" ||
                        this.upload_view_id == "view_3292" ||
                        this.upload_view_id == "view_4146" ||
                        this.upload_view_id == "view_4036" ||
                        this.upload_view_id == "view_4042" ||
                        this.upload_view_id == "view_4467" ||
                        this.upload_view_id == "view_4165" ||
                        this.upload_view_id == "view_2978" ||
                        this.upload_view_id == "view_3292" ||
                        this.upload_view_id == "view_2852"
                    ) {  //RESIDENT INFRACTION
                        status = $(`#filepond-field_614 .filepond--file-status-main`).text();
                        status1 = $(`#filepond-field_615 .filepond--file-status-main`).text();

                    } else if (
                        this.upload_view_id == "view_5048" ||
                        this.upload_view_id == "view_4117" ||
                        this.upload_view_id == "view_4098" ||
                        this.upload_view_id == "view_4040" ||
                        this.upload_view_id == "view_2976" ||
                        this.upload_view_id == "view_2846"
                    ) {  //RADAR LOG
                        status = $(`#filepond-field_604 .filepond--file-status-main`).text();
                        status1 = $(`#filepond-field_605 .filepond--file-status-main`).text();

                    } else if (
                        this.upload_view_id == "view_923"
                    ) {  //CALL CENTER
                        status = $(`#filepond-field_1147 .filepond--file-status-main`).text();
                        status1 = $(`#filepond-field_1214 .filepond--file-status-main`).text();

                    } else if (
                        this.upload_view_id == "view_4779" ||
                        this.upload_view_id == "view_4120" ||
                        this.upload_view_id == "view_4202" ||
                        this.upload_view_id == "view_3932" ||
                        this.upload_view_id == "view_2087" ||
                        this.upload_view_id == "view_2089" ||
                        this.upload_view_id == "view_3097"
                    ) {  //TIMECLOCK
                        status = $(`#filepond-field_609 .filepond--file-status-main`).text();
                        status1 = $(`#filepond-field_260 .filepond--file-status-main`).text();

                    } else if (
                        this.upload_view_id == "view_1859" ||
                        this.upload_view_id == "view_2446"
                    ) {  //COMMUNITY
                        if ($(`#filepond-field_2440 .filepond--file-status-main`).text() == "Uploading" ||
                            $(`#filepond-field_2441 .filepond--file-status-main`).text() == "Uploading" ||
                            $(`#filepond-field_2442 .filepond--file-status-main`).text() == "Uploading" ||
                            $(`#filepond-field_2443 .filepond--file-status-main`).text() == "Uploading" ||
                            $(`#filepond-field_2496 .filepond--file-status-main`).text() == "Uploading" ||
                            $(`#filepond-field_2495 .filepond--file-status-main`).text() == "Uploading" ||
                            $(`#filepond-field_2552 .filepond--file-status-main`).text() == "Uploading" ||
                            $(`#filepond-field_2553 .filepond--file-status-main`).text() == "Uploading") {
                            status1 = "Uploading";
                        }


                    } else if (
                        this.upload_view_id == "view_2581"
                    ) {  //COMMUNITY
                        if ($(`#filepond-field_2557 .filepond--file-status-main`).text() == "Uploading" ||
                            $(`#filepond-field_2558 .filepond--file-status-main`).text() == "Uploading" ||
                            $(`#filepond-field_2559 .filepond--file-status-main`).text() == "Uploading") {
                            status1 = "Uploading";
                        }


                    } else if (
                        this.upload_view_id == "view_2405" ||
                        this.upload_view_id == "view_3113"
                    ) {  //COMMUNITY
                        if ($(`#filepond-field_616 .filepond--file-status-main`).text() == "Uploading" ||
                            $(`#filepond-field_617 .filepond--file-status-main`).text() == "Uploading" ||
                            $(`#filepond-field_618 .filepond--file-status-main`).text() == "Uploading") {
                            status1 = "Uploading";
                        }


                    }


                    if (status1 != "Uploading") {
                        $(".is-primary").removeAttr("disabled");
                        $(".is-primary").html(this.btnTxt);
                    }
                }


            },
        });
    }
    async deleteExistingImageFromCloudinary(cloudinaryPublicId, mediaType) {
        //generate cloudinary signature
        var timestamp = new Date().getTime();
        var url = `https://api.cloudinary.com/v1_1/${this.cloudName}/${mediaType}/destroy`;
        var signatureString = "";

        //it's imperative that the keys are in alphabetical order.
        var params = {
            public_id: cloudinaryPublicId,
            timestamp: timestamp,
        };

        this.filePondObj.removeFiles();

        if (cloudinaryPublicId != "") {
            var fd = new FormData();
            fd.append("api_key", this.apiKey);
            fd.append("resource_type", mediaType);

            for (var key in params) {
                signatureString += `${key}=${params[key]}&`;
                fd.append(key, params[key]);
            }

            //remove the last & and append apiSecret
            signatureString =
                signatureString.substring(0, signatureString.length - 1) +
                this.apiSecret;
            var signature = await this.digestMessage(signatureString);
            fd.append("signature", this.hexString(signature));

            //cloudinary delete promise
            return new Promise((resolve, reject) => {
                var request = new XMLHttpRequest();
                request.open("POST", url);

                request.onload = function () {
                    if (request.status >= 200 && request.status < 300) {
                        var response = JSON.parse(request.responseText);
  
                        resolve(response);
                    } else {
                        reject("oh no");
                    }
                };

                request.send(fd);
            });
        }
    }
    async removeExistingImage(cloudinaryPublicId, knackId, mediaType) {
        var promises = [];

        //knack delete promise
        promises.push(
            new Promise((resolve, reject) => {
                $.ajax({
                    url: `https://api.sv.knack.com/v1/objects/${this.object_id}/records/${knackId}`,
                    type: "DELETE",
                    headers: {
                        Authorization: Knack.getUserToken(),
                        "X-Knack-Application-Id": Knack.application_id,
                        "X-Knack-REST-API-Key": window.knackRestApiKey,
                        "Content-Type": "application/json",
                    },
                    //data: JSON.stringify(params),
                    success: function (data) {
                        resolve(data.delete);
                    },
                    error: function (err) {
                        console.error(err);
                        reject(err);
                    },
                });
            })
        );

        //cloudinary delete promise
        promises.push(
            this.deleteExistingImageFromCloudinary(cloudinaryPublicId, mediaType)
        );

        return Promise.all(promises);
    }

    initFilePond() {
        FilePond.registerPlugin(
            FilePondPluginImageExifOrientation,
            FilePondPluginImageCrop,
            FilePondPluginImageResize,
            FilePondPluginImageTransform,
            FilePondPluginFileValidateSize,
            FilePondPluginMediaPreview,
            FilePondPluginImagePreview,
            FilePondPluginFileValidateType,
            FilePondPluginGetFile,
            FilePondPluginFileRename,
        );

        FilePond.setOptions({
            imageTransformOutputStripImageHead: false,
            imageResizeUpscale: false,
            imageResizeTargetWidth: this.max_width ? this.max_width : 500,
            maxFiles: (this.upload_limit ? this.upload_limit : 3),
            imageResizeMode: "cover",
            imageTransformOutputQuality: (this.image_quality ? this.image_quality : 50),
            imageTransformOutputQualityMode: "optional",
            fileRenameFunction: (file) => {
                // generate a new file name using the current date and time
                const date = new Date();
                const timestamp = date.getTime();
                const newFileName = `${timestamp}_${file.name}`;
            
                return newFileName;
              },
            server: {
                process: (fieldName, file, metadata, load, error, progress, abort) => {
                    this.uploadImage(
                        fieldName,
                        file,
                        metadata,
                        load,
                        error,
                        progress,
                        abort
                    );
                },
                revert: (uniqueFileId, load, error) => {
                    this.deleteImage(uniqueFileId, load, error);
                },
                load: (source, load, error, progress, abort, headers) => {
                    var myRequest = new Request(source);
                    fetch(myRequest).then(function (response) {
                        response.blob().then(function (myBlob) {
                            load(myBlob);
                        });
                    });
                },
            },
            beforeRemoveFile: (item) => {
                var url = item.serverId;
                var public_id = item.filename;
                if (this.folder) {
                    public_id = `${this.folder}/${public_id}`;
                }

                public_id = public_id.substring(0, public_id.lastIndexOf(".")); //remove file extension

                var source = item.origin;


                var imageElem = $(`#${this.upload_view_id}`).find(
                    `input#${this.image_field_id}`
                );


                $(imageElem).val("");

                if (source == FilePond.FileOrigin.LOCAL) {
                    //an existing file, loaded from an existing knack object.
                    var knackImgObj = this.imageList.find((img) => img.url == url);

                    // KENT COMMENT - Detect File Type
                    // var mediaType = this.existingImageFileTypes.find(
                    //   (type) => type.url == url
                    // ).fileType;

                    // console.log("resource_type: ", mediaType);
                    // console.log("public_id: ", public_id);
                    // var type =
                    //   mediaType.indexOf("image") > -1
                    // 	? "image"
                    // 	: mediaType.indexOf("video") > -1 ||
                    // 	  mediaType.indexOf("application/octet-stream") > -1
                    // 	? "video"
                    // 	: "raw";

                    //     console.log ("TYPE: ", type);



                    var type = "image";
                    this.filesToDelete.push({
                        public_id: public_id,
                        object_id: knackImgObj ? knackImgObj.id : null,
                        type: type,
                    });

                    return true;
                }
            },
        });
    }

    async processFilesForDelete() {
        var promises = [];

        this.filesToDelete.forEach((file) => {
            promises.push(
                this.removeExistingImage(file.public_id, file.object_id, file.type)
            );
        });

        return Promise.all(promises);
    }

    async saveImages() {
        var promises = [];

        var str_images = "";
        var str_images1 = "";
        var img_email = "";
        var geo_status = "";
        var time_status = "";

        try {


            this.imageList.forEach((image) => {
                if ("id" in image) {
                    return; //skip, image already exists
                }

                var params = {};
                // params["field_2246"] = `${image.date} ${image.time}`;
                params[this.image_field_id] = image.url;
                params['field_3023'] = image.url;

                if (image.url !== undefined) {

                    if (image.lat !== undefined) {
                        params["field_2255"] = {
                            latitude: image.lat,
                            longitude: image.lon,
                        };

                        params["field_2441"] = "EXIF";
                        str_images = str_images + "EXIF,";
                        geo_status = geo_status + "EXIF,";
                    } else {
                        params["field_2441"] = "NONE";
                        str_images = str_images + image.url + ",";
                        geo_status = geo_status + "NONE,";
                    }
                    str_images1 = str_images1 + image.url + ",";
                    window.imageContainer.push({
                        "url" : image.url
                    });


                    if (image.date !== undefined) {
                        params["field_2246"] = `${image.date} ${image.time}`;

                        params["field_3032"] = "EXIF";
                        time_status = time_status + "EXIF,";
                    } else {
                        params["field_3032"] = "DEVICE";
                        time_status = time_status + "DEVICE,";
                    }


                    var user_details = Knack.getUserAttributes();

                    params["field_2239"] = user_details.id

                    if (this.image_connection_field_id == "field_616") {
                        params[this.connection_field_id] = Knack.hash_id;
                    }

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

                    params["field_2245"] = dateTime;
                    // params["field_2239"] = record.field_192;
                    params["field_2238"] = "Image";

                    img_email = img_email + "<img src='" + image.url + "'><br>"


                    promises.push(
                        new Promise((resolve, reject) => {
                            var useNoneAjax = true;
                            if (useNoneAjax) {
                                //Use None Jquery Ajax to update record

                                var xhr = new XMLHttpRequest();
                                xhr.open("POST", `https://api.sv.knack.com/v1/objects/${this.object_id}/records`);
                                xhr.setRequestHeader("Authorization", Knack.getUserToken());
                                xhr.setRequestHeader("X-Knack-Application-Id", Knack.application_id);
                                xhr.setRequestHeader("X-Knack-REST-API-Key", window.knackRestApiKey);
                                xhr.setRequestHeader("Content-Type", "application/json");
                                xhr.onload = function () {
                                    if (this.status >= 200 && this.status < 300) {
                                        var data = JSON.parse(xhr.responseText);
                                        resolve(data.id);
                                        addWaterMark(data);
                                    } else {
                                        reject({
                                            status: this.status,
                                            statusText: xhr.statusText,
                                        });
                                    }
                                };
                                xhr.onerror = function () {
                                    reject({
                                        status: this.status,
                                        statusText: xhr.statusText,
                                    });
                                };
                                xhr.send(JSON.stringify(params));

                            } else {
                                $.ajax({
                                    url: `https://api.sv.knack.com/v1/objects/${this.object_id}/records`,
                                    type: "POST",
                                    headers: {
                                        Authorization: Knack.getUserToken(),
                                        "X-Knack-Application-Id": Knack.application_id,
                                        "X-Knack-REST-API-Key": window.knackRestApiKey,
                                        "Content-Type": "application/json",
                                    },
                                    data: JSON.stringify(params),
                                    success: function (data) {
                                        resolve(data.id);
                                        addWaterMark(data);
                                    },
                                    error: function (err) {
                                        console.error(err);
                                        reject(err);
                                    },
                                });
                            }
                        })
                    );
                }
            });

            //   this.deletePendingImages();

            $(".filepond--root").after(
                `<input type="hidden" class="imgListURL" value="${str_images}"><input type="hidden" class="imgListURL1" value="${str_images1}"><input type="hidden" class="geo_status" value="${geo_status}"><input type="hidden" class="time_status" value="${time_status}">`
            );

            if (this.email_image_id) {
                $(`#kn-input-${this.email_image_id} textarea`).val(img_email);
            }

            if (this.existingImageIds.length > 0) {
                this.existingImageIds.forEach((imageId) => {
                    promises.push(
                        new Promise((resolve, reject) => {
                            resolve(imageId);
                        })
                    );
                });
            }
        } catch (error) {
            console.error(error);
            SV_Errorhandler("saveImages", e, errDeviceData(), this.imageList);
        }

        return Promise.all(promises);
    }

    deletePendingImages() {
        this.pendingImages.forEach((image) => {
            $.ajax({
                url: `https://api.sv.knack.com/v1/objects/object_121/records/${image.id}`,
                type: "DELETE",
                headers: {
                    Authorization: Knack.getUserToken(),
                    "X-Knack-Application-Id": Knack.application_id,
                    "X-Knack-REST-API-Key": window.knackRestApiKey,
                    "Content-Type": "application/json",
                },
                // data: JSON.stringify(params),
                success: function (data) { },
                error: function (err) {
                    console.error(err);
                },
            });
        });
    }

    async getSavedImages(object_ids) {
        var promises = [];

        object_ids.forEach((object_id) => {
            promises.push(
                new Promise((resolve, reject) => {
                    $.ajax({
                        url: `https://api.sv.knack.com/v1/objects/${this.object_id}/records/${object_id}`,
                        type: "GET",
                        headers: {
                            Authorization: Knack.getUserToken(),
                            "X-Knack-Application-Id": Knack.application_id,
                            "X-Knack-REST-API-Key": window.knackRestApiKey,
                            "Content-Type": "application/json",
                        },
                        success: function (data) {
                            resolve(data);
                        },
                        error: function (err) {
                            console.error(err);
                            reject(err);
                        },
                    });
                })
            );
        });

        return Promise.all(promises);
    }

    getExistingImages(imageIds) {
        var self = this;
        this.getSavedImages(imageIds).then((imageObjects) => {
            imageObjects.forEach((imageObject) => {
                var imageUrl = imageObject[`${self.image_field_id}_raw`];
                this.existingImageIds.push(imageObject["id"]);
                this.imageList.push({
                    id: imageObject["id"],
                    url: imageUrl,
                });

                self.filePondObj.addFile(imageUrl, {
                    type: "local",
                });
            });
        });
    }

    replaceSubmitButton(btnTxt) {
        var submitButtonHolder = $(this.submitButton).parent();
        var newSubmitButton = $(
            `<button class='kn-button is-primary' type='button'>${btnTxt}</button>`
        );
        var self = this;

        newSubmitButton.click((e) => {
            SlickLoader.enable();
            SlickLoader.setText("Saving Images", "");
            try {
                var doSave = () => {

                    if (this.is_multiple) {

                        try {

                            if (this.isRequired && this.imageList.length == 0) {
                                alert('Please upload an image first');
                                Knack.hideSpinner();
                                return false;
                            }

                            if (this.server_side && this.log_id) {

                                var user_details = Knack.getUserAttributes();


                                var log_id = $(`#${self.upload_view_id} #${self.log_id}`).val();

                                var params = {
                                    "images": self.imageList,
                                    "item": self.uploaderParams,
                                    "user_token": Knack.getUserToken(),
                                    "user_id": user_details.id,
                                    "log_id": log_id,
                                    "imgLength": self.imageList.length
                                }
                                $.ajax({
                                    url: `https://uploader.svweb.dev/webhook/process-multi-images`,
                                    type: "POST",
                                    dataType: 'json',
                                    data: params,
                                    success: () => {
                                        console.log('Sent to server');
                                        $(self.submitButton).click();
                                        self.filePondObj.removeFiles();
                                        Knack.hideSpinner();
                                    },
                                    error: (err) => {
                                        console.log("Failed to send to server, continue on client side", err);
                                        this.saveImages()
                                            .then((results) => {
                                                // console.log("saveImages results: ", results);

                                                results.forEach((result) => {
                                                    $(
                                                        `#${self.upload_view_id}-${self.image_connection_field_id}`
                                                    ).append(`<option value='${result}'>${result}</option>`);
                                                });
                                                $(`#${self.upload_view_id}-${self.image_connection_field_id}`)
                                                    .val(results)
                                                    .trigger("liszt:updated");

                                                $(".filepond--root").after(
                                                    `<input type="hidden" class="imgList" value="${results}">`
                                                );
                                                $(self.submitButton).click();
                                                self.filePondObj.removeFiles();
                                                Knack.hideSpinner();
                                            })
                                            .catch((e) => {
                                                console.error(e);
                                                Knack.hideSpinner();
                                                SV_Errorhandler("replaceSubmitButton->Multi Uploader->this.saveImages()->server side", e, errDeviceData(), self.imageList);
                                            });
                                    }
                                });

                            } else {
                                this.saveImages()
                                    .then((results) => {
                                        // console.log("saveImages results: ", results);

                                        results.forEach((result) => {
                                            $(
                                                `#${self.upload_view_id}-${self.image_connection_field_id}`
                                            ).append(`<option value='${result}'>${result}</option>`);
                                        });
                                        $(`#${self.upload_view_id}-${self.image_connection_field_id}`)
                                            .val(results)
                                            .trigger("liszt:updated");

                                        $(".filepond--root").after(
                                            `<input type="hidden" class="imgList" value="${results}">`
                                        );
                                        $(self.submitButton).click();
                                        self.filePondObj.removeFiles();
                                        Knack.hideSpinner();
                                    })
                                    .catch((e) => {
                                        console.error(e);
                                        Knack.hideSpinner();
                                        // SV_Errorhandler("replaceSubmitButton->Multi Uploader->this.saveImages()->Client Side", e, errDeviceData(), self.imageList);
                                    });
                            }
                        } catch (e) {
                            Knack.hideSpinner();
                            V_Errorhandler("replaceSubmitButton->Multi Uploader", e, errDeviceData(), self.imageList);
                        }

                    } else {
                        if (this.upload_view_id == "view_5044" || this.upload_view_id == "view_5573") {
                            getDeviceData("Butler Clockin");
                        }

                        //VALIDATE FIELD IF IMAGE STILL UPLOADING

                        var status1 = "";
                        if (
                            this.upload_view_id == "view_4779" ||
                            this.upload_view_id == "view_4120" ||
                            this.upload_view_id == "view_4202" ||
                            this.upload_view_id == "view_3932" ||
                            this.upload_view_id == "view_2087" ||
                            this.upload_view_id == "view_2089" ||
                            this.upload_view_id == "view_3097"
                        ) {  //TIMECLOCK
                            status = $(`#filepond-field_609 .filepond--file-status-main`).text();
                            status1 = $(`#filepond-field_260 .filepond--file-status-main`).text();

                        }


                        //   console.log("my view: ", this.upload_view_id);
                        //   console.log("stats: ", status1);

                        if (status1 == "Uploading") {
                            alert("Image is still uploading ... Please wait");
                        } else if (
                            status1 == "Error during upload" ||
                            status == "Error during upload"
                        ) {
                            alert("Invalid image... Please try again.");
                        } else {
                            $(self.submitButton).click();
                            // self.filePondObj.removeFiles();
                        }

                        //   Knack.hideSpinner();

                        // SlickLoader.enable();
                        // SlickLoader.setText("Saving Images", "");

                    }
                };

                Knack.showSpinner();
                // console.log("this.filesToDelete: ", this.filesToDelete);
                if (this.filesToDelete.length > 0) {
                    if (this.is_multiple) {
                        this.processFilesForDelete().then((deleteResults) => {
                            this.filesToDelete.forEach((fileToDelete) => {
                                //remove from imagelist
                                var imgIdx = this.imageList.findIndex(
                                    (img) => img.id == fileToDelete.object_id
                                );
                                if (imgIdx > -1) {
                                    this.imageList.splice(imgIdx, 1);
                                } else {
                                    console.log(
                                        `[1]Cannot find image with id ${fileToDelete.object_id} @ index ${imgIdx}`
                                    );
                                }

                                //remove from existingImageIds
                                var imgIdx = this.existingImageIds.findIndex(
                                    (imgId) => imgId == fileToDelete.object_id
                                );
                                if (imgIdx > -1) {
                                    this.existingImageIds.splice(imgIdx, 1);
                                } else {
                                    console.log(
                                        `[2]Cannot find image with id ${fileToDelete.object_id} @ index ${imgIdx}`
                                    );
                                }
                            });

                            doSave();
                        });
                    } else {
                        var imageElem = $(`#${this.upload_view_id}`).find(
                            `input#${this.image_field_id}`
                        );

                        //$(imageElem).val("");

                        var deleteFile = this.filesToDelete[0]; //most likely just one since it's only for single upload;
                        this.deleteExistingImageFromCloudinary(
                            deleteFile.public_id,
                            deleteFile.type
                        ).then((result) => {

                            doSave();
                        });
                    }
                } else {
                    doSave();
                }
            } catch (e) {
                Knack.hideSpinner();
                SV_Errorhandler("replaceSubmitButton", e, errDeviceData(), self.imageList);
            }
        });

        $(submitButtonHolder).append(newSubmitButton);
    }

    init() {
        this.imageList = [];
        this.existingImageFileTypes = [];
        this.existingImageIds = [];
        this.pendingImages = [];

        if (this.cloudName && this.apiKey && this.apiSecret) {
            var proceed = (imageElem) => {
                if (imageElem.length > 0) {
                    if (FilePond) {
                        var fieldImageContainer = this.is_multiple
                            ? imageElem
                            : $(imageElem).parent();

                        // var filePondId = `filepond-${this.image_field_id}`;

                        // NEW FILEPOND ID TO FIX MULTIPLE FORMS ISSUE
                        var filePondId = `filepond-${this.upload_view_id}-${this.image_field_id}`;

                        var multiple = this.is_multiple ? "multiple" : "";
                        var filePondInput = $(
                            `<input type="file" class="filepond" name="${filePondId}" id="${filePondId}" ${multiple}>`
                        );
                        $(fieldImageContainer).append(filePondInput);
                        if (EXIF) {
                            this.initFilePond();
                            this.submitButton = $(
                                `#${this.upload_view_id} div.kn-submit`
                            ).find("button");
                            this.btnTxt = $(`#${this.upload_view_id} div.kn-submit [type="submit"]`).text().trim();

                            this.submitButton.addClass("hideMe");
                            this.replaceSubmitButton(this.btnTxt);
                            if (this.is_multiple) {
                                //purpose of this is to retrieve the image objects recorded on a separate table
                                //this only applies if the image uploader is in multiple upload mode
                                var imageIds = $(
                                    `#${this.upload_view_id}-${this.image_connection_field_id}`
                                ).val();
                                if (imageIds && imageIds.length > 0) {
                                    this.getExistingImages(imageIds);
                                }
                            }
                            this.createImage(filePondInput[0]);
                        } else {
                            console.error("EXIF js required");
                        }
                    } else {
                        console.error("FilePond JS required");
                    }
                } else {
                    console.error("Image upload field not found");
                }
            };

            //try 10x at 500s each time.
            var counter = 0;
            var getImageElemeInt = setInterval(() => {
                var imageElem = null;
                if (this.is_multiple) {
                    imageElem = $(`#${this.upload_view_id}`).find(
                        `#kn-input-${this.image_connection_field_id}`
                    );
                } else {
                    imageElem = $(`#${this.upload_view_id}`).find(
                        `input#${this.image_field_id}`
                    );
                }

                if (imageElem.length > 0) {
                    clearInterval(getImageElemeInt);
                    proceed(imageElem);
                } else if (counter < 10) {
                    counter++;
                } else {
                    clearInterval(getImageElemeInt);
                    console.error("Image upload field not found");
                }
            }, 500);
        } else {
            console.error("Please set cloudinary credentials");
        }
    }

    //Setter Function
    setCloudinaryCredentials(cloudinaryCredentials) {
        for (var key in cloudinaryCredentials) {
            this[key] = cloudinaryCredentials[key];
        }
    }

    //Helper Functions
    convertDMSToDD(degrees, minutes, seconds, direction) {
        var dd = degrees + minutes / 60 + seconds / 3600;
        if (direction == "S" || direction == "W") {
            dd = dd * -1;
        }
        return dd;
    }

    hexString(buffer) {
        var byteArray = new Uint8Array(buffer);

        var hexCodes = [...byteArray].map((value) => {
            var hexCode = value.toString(16);
            var paddedHexCode = hexCode.padStart(2, "0");
            return paddedHexCode;
        });

        return hexCodes.join("");
    }

    digestMessage(message) {
        var encoder = new TextEncoder();
        var data = encoder.encode(message);
        return window.crypto.subtle.digest("SHA-1", data);
    }
}

function SaveImageLogs(data) {
    // UPDATE IMAGE DATA TO PENDING OBJECTS
    // console.log('NEW IMAGE LOGS FUNCTION');
    data["status"] = "Saved";

    $.ajax({
        url: `https://td.luckykeniks.live/webhook/tds-update-logs`,
        type: "POST",
        data: data,
        success: function (data) {
            // console.log("LOGS UPDATED: ", params);
        },
        error: function (err) {
            console.error(err);
            //   reject(err);
        },
    });

    // END UPDATE IMAGE DATA TO PENDING OBJECTS
}

function getDeviceData(action) {
    var module = {
        options: [],
        header: [
            navigator.platform,
            navigator.userAgent,
            navigator.appVersion,
            navigator.vendor,
            window.opera,
        ],
        dataos: [
            { name: "Windows Phone", value: "Windows Phone", version: "OS" },
            { name: "Windows", value: "Win", version: "NT" },
            { name: "iPhone", value: "iPhone", version: "OS" },
            { name: "iPad", value: "iPad", version: "OS" },
            { name: "Kindle", value: "Silk", version: "Silk" },
            { name: "Android", value: "Android", version: "Android" },
            { name: "PlayBook", value: "PlayBook", version: "OS" },
            { name: "BlackBerry", value: "BlackBerry", version: "/" },
            { name: "Macintosh", value: "Mac", version: "OS X" },
            { name: "Linux", value: "Linux", version: "rv" },
            { name: "Palm", value: "Palm", version: "PalmOS" },
        ],
        databrowser: [
            { name: "Chrome", value: "Chrome", version: "Chrome" },
            { name: "Firefox", value: "Firefox", version: "Firefox" },
            { name: "Safari", value: "Safari", version: "Version" },
            { name: "Internet Explorer", value: "MSIE", version: "MSIE" },
            { name: "Opera", value: "Opera", version: "Opera" },
            { name: "BlackBerry", value: "CLDC", version: "CLDC" },
            { name: "Mozilla", value: "Mozilla", version: "Mozilla" },
        ],
        init: function () {
            var agent = this.header.join(" "),
                os = this.matchItem(agent, this.dataos),
                browser = this.matchItem(agent, this.databrowser);

            return { os: os, browser: browser };
        },
        matchItem: function (string, data) {
            var i = 0,
                j = 0,
                html = "",
                regex,
                regexv,
                match,
                matches,
                version;

            for (i = 0; i < data.length; i += 1) {
                regex = new RegExp(data[i].value, "i");
                match = regex.test(string);
                if (match) {
                    regexv = new RegExp(data[i].version + "[- /:;]([\\d._]+)", "i");
                    matches = string.match(regexv);
                    version = "";
                    if (matches) {
                        if (matches[1]) {
                            matches = matches[1];
                        }
                    }
                    if (matches) {
                        matches = matches.split(/[._]+/);
                        for (j = 0; j < matches.length; j += 1) {
                            if (j === 0) {
                                version += matches[j] + ".";
                            } else {
                                version += matches[j];
                            }
                        }
                    } else {
                        version = "0";
                    }
                    return {
                        name: data[i].name,
                        version: parseFloat(version),
                    };
                }
            }
            return { name: "unknown", version: 0 };
        },
    };

    var e = module.init();

    var user_details = Knack.getUserAttributes();

    var browser_name = "";

    if (isChrome) {
        browser_name = "Chrome";
    } else if (isFirefox) {
        browser_name = "Firefox";
    } else if (isSafari) {
        browser_name = "Safari";
    } else {
        browser_name = "e.browser.name";
    }

    var params = {};
    params["field_2502"] = e.os.name;
    params["field_2503"] = e.os.version;
    params["field_2504"] = browser_name;
    params["field_2505"] = e.browser.version;
    params["field_2501"] = user_details.name;
    params["field_2500"] = user_details.values.field_1222;
    params["field_2898"] = user_details.id;

    params["field_2899"] = action; //action
    params["field_2900"] = user_details.roles; //roles

    var urlParams = window.location.href;
    params["field_2901"] = urlParams;
    params["field_2902"] = urlParams;

    //Add Device Resolution
    var screen_res = window.screen.width * window.devicePixelRatio + "x" + window.screen.height * window.devicePixelRatio;
    var screen_wh = screen.width + "x" + screen.height;

    // console.log ("screen resolution: ", screen_res);
    // console.log ("screen wh: ", screen_wh);

    params["field_2926"] = screen_res;
    params["field_2927"] = screen_wh;


    try {
        $.ajax({
            url: `https://api.sv.knack.com/v1/objects/object_127/records`,
            type: "POST",
            headers: {
                Authorization: Knack.getUserToken(),
                "X-Knack-Application-Id": Knack.application_id,
                "X-Knack-REST-API-Key": window.knackRestApiKey,
                "Content-Type": "application/json",
            },
            data: JSON.stringify(params),
            success: function (data) {
                // console.log("params", params);
            },
            error: function (err) {
                console.error(err);
            },
        });
    }
    catch (err) {
        SlickLoader.disable();
        SV_Errorhandler("getDeviceData", err, errDeviceData(), "");

    }
}

function isChrome() {
    var isChromium = window.chrome,
        winNav = window.navigator,
        vendorName = winNav.vendor,
        isOpera = winNav.userAgent.indexOf("OPR") > -1,
        isIEedge = winNav.userAgent.indexOf("Edge") > -1,
        isIOSChrome = winNav.userAgent.match("CriOS");

    if (isIOSChrome) {
        // is Google Chrome on IOS
        return true;
    } else if (
        isChromium !== null &&
        typeof isChromium !== "undefined" &&
        vendorName === "Google Inc." &&
        isOpera === false &&
        isIEedge === false
    ) {
        // is Google Chrome
        return true;
    } else {
        // not Google Chrome
        return false;
    }
}

//function to detect iphone's browser is using chrome, safari or firefox
function isSafari() {
    var isSafari =
        navigator.vendor &&
        navigator.vendor.indexOf("Apple") > -1 &&
        navigator.userAgent &&
        !navigator.userAgent.match("CriOS");
    if (isSafari) {
        return true;
    } else {
        return false;
    }
}

//function to detect iphone's browser is using chrome, safari or firefox
function isFirefox() {
    if (typeof InstallTrigger !== "undefined") {
        return true;
    } else {
        return false;
    }
}

async function addWaterMark(record) {
    var waterMarkData = [];

    var exifGeoStatus = 0;  // 0 = NO GEO  1 = EXIF DATA  2 = DEVICE DATA
    var exifTimeStatus = 0; // 1 = EXIF DATA  2 = DEVICE DATA


    var address = '';

    if (record.field_2255_raw.street) {
        address += record.field_2255_raw.street + '\n';
    }

    if ((record.field_2255_raw.city) && (record.field_2255_raw.state)) {
        address += `${record.field_2255_raw.city}, ${record.field_2255_raw.state}`;
    }

    if (address.length > 0) {
        waterMarkData.push(address);

        if (record.field_2441_raw == "EXIF") {
            exifGeoStatus = 1;
        } else if (record.field_2441_raw == "DEVICE") {
            exifGeoStatus = 2;
        }
        else {
            exifGeoStatus = 0;
        }

    }

    if (record.field_2246) { //check if there's a timestamp
        waterMarkData.push(record.field_2246);
        exifTimeStatus = 1;
    } else {

        var today = new Date();
        var dateTime = today.toLocaleString();

        waterMarkData.push(dateTime);
        exifTimeStatus = 2;
    }

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


    var urls = record.field_2237_raw.split("upload");


    var watermarkString = waterMarkData.join('\n');
    var watermarkParam = `f_auto,c_scale,fl_relative,l_text:Doppio%20One_20_stroke:${encodeURIComponent(encodeURIComponent(watermarkString))},g_south_east,y_5,x_10,co_rgb:FFF,bo_5px_solid_black/`;
    watermarkParam += `c_scale,fl_relative,l_text:Doppio%20One_20_stroke:${encodeURIComponent(encodeURIComponent(leftLabel))},g_south_west,y_5,x_10,co_rgb:FFF,bo_5px_solid_black/fl_keep_iptc`;
    var imageRelPath = urls[1];


    var updatedImageUrl = `${urls[0]}upload/${watermarkParam}${imageRelPath}`;
    updatedImageUrl = updatedImageUrl.replaceAll('+', '%20');

    var c_data = {};
    c_data["field_2237"] = updatedImageUrl;

    window.exifOverlays.push({
        "url": updatedImageUrl,
        "id": record.id
    });

    // var useNoneAjax = true;
    // if (useNoneAjax) {
    //     //Use None Jquery Ajax to update record
    //     var xhr = new XMLHttpRequest();
    //     xhr.open("PUT", `https://api.sv.knack.com/v1/objects/object_107/records/${record.id}`);
    //     xhr.setRequestHeader("Authorization", Knack.getUserToken());
    //     xhr.setRequestHeader("X-Knack-Application-Id", Knack.application_id);
    //     xhr.setRequestHeader("X-Knack-REST-API-Key", window.knackRestApiKey);
    //     xhr.setRequestHeader("Content-Type", "application/json");
    //     xhr.send(JSON.stringify(c_data));


    // } else {
    //     await $.ajax({
    //         url: `https://api.sv.knack.com/v1/objects/object_107/records/${record.id}`,
    //         type: 'PUT',
    //         headers: {
    //             'Authorization': Knack.getUserToken(),
    //             'X-Knack-Application-Id': Knack.application_id,
    //             'X-Knack-REST-API-Key': window.knackRestApiKey,
    //             'Content-Type': 'application/json'
    //         },
    //         data: JSON.stringify(c_data),
    //         success: () => {

    //         }
    //     });
    // }




}

function downloadBlob(blob, name) {
    const blobUrl = URL.createObjectURL(blob);

    // Create a link element
    const link = document.createElement("a");

    // Set link's href to point to the Blob URL
    link.href = blobUrl;
    link.download = name;

    // Append link to the body
    document.body.appendChild(link);

    // Dispatch click event on the link
    // This is necessary as link.click() does not work on the latest firefox
    link.dispatchEvent(
        new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        })
    );

    // Remove link from body
    document.body.removeChild(link);
}

//Function that send's the error details to the server
function SV_Errorhandler(errLoc, err, device, pdata) {

    var data = {};

    var error= {
        "message" : err.message,
        "stack" : err.stack
      }

    data = {
        "location": errLoc,
        "error": error,
        "device": device,
        "pdata": pdata
    }


    $.ajax({
        url: `https://uploader.svweb.dev/webhook/handler-error`,
        type: "POST",
        dataType: 'json',
        data: data,
        success: () => {
            console.log('Sent to server');
        },
        error: (err) => {

        }
    });
    

}

function errDeviceData() {
    var module = {
        options: [],
        header: [
            navigator.platform,
            navigator.userAgent,
            navigator.appVersion,
            navigator.vendor,
            window.opera,
        ],
        dataos: [
            { name: "Windows Phone", value: "Windows Phone", version: "OS" },
            { name: "Windows", value: "Win", version: "NT" },
            { name: "iPhone", value: "iPhone", version: "OS" },
            { name: "iPad", value: "iPad", version: "OS" },
            { name: "Kindle", value: "Silk", version: "Silk" },
            { name: "Android", value: "Android", version: "Android" },
            { name: "PlayBook", value: "PlayBook", version: "OS" },
            { name: "BlackBerry", value: "BlackBerry", version: "/" },
            { name: "Macintosh", value: "Mac", version: "OS X" },
            { name: "Linux", value: "Linux", version: "rv" },
            { name: "Palm", value: "Palm", version: "PalmOS" },
        ],
        databrowser: [
            { name: "Chrome", value: "Chrome", version: "Chrome" },
            { name: "Firefox", value: "Firefox", version: "Firefox" },
            { name: "Safari", value: "Safari", version: "Version" },
            { name: "Internet Explorer", value: "MSIE", version: "MSIE" },
            { name: "Opera", value: "Opera", version: "Opera" },
            { name: "BlackBerry", value: "CLDC", version: "CLDC" },
            { name: "Mozilla", value: "Mozilla", version: "Mozilla" },
        ],
        init: function () {
            var agent = this.header.join(" "),
                os = this.matchItem(agent, this.dataos),
                browser = this.matchItem(agent, this.databrowser);

            return { os: os, browser: browser };
        },
        matchItem: function (string, data) {
            var i = 0,
                j = 0,
                html = "",
                regex,
                regexv,
                match,
                matches,
                version;

            for (i = 0; i < data.length; i += 1) {
                regex = new RegExp(data[i].value, "i");
                match = regex.test(string);
                if (match) {
                    regexv = new RegExp(data[i].version + "[- /:;]([\\d._]+)", "i");
                    matches = string.match(regexv);
                    version = "";
                    if (matches) {
                        if (matches[1]) {
                            matches = matches[1];
                        }
                    }
                    if (matches) {
                        matches = matches.split(/[._]+/);
                        for (j = 0; j < matches.length; j += 1) {
                            if (j === 0) {
                                version += matches[j] + ".";
                            } else {
                                version += matches[j];
                            }
                        }
                    } else {
                        version = "0";
                    }
                    return {
                        name: data[i].name,
                        version: parseFloat(version),
                    };
                }
            }
            return { name: "unknown", version: 0 };
        },
    };

    var e = module.init();

    var user_details = Knack.getUserAttributes();

    var browser_name = "";

    if (isChrome) {
        browser_name = "Chrome";
    } else if (isFirefox) {
        browser_name = "Firefox";
    } else if (isSafari) {
        browser_name = "Safari";
    } else {
        browser_name = "e.browser.name";
    }

    var params = {};
    params["OS Name"] = e.os.name;
    params["OS Version"] = e.os.version;
    params["Browser Name"] = browser_name;
    params["Browser Version"] = e.browser.version;
    params["User Name"] = user_details.name;
    params["Employee ID"] = user_details.values.field_1222;
    params["ID"] = user_details.id;

    params["User Role"] = user_details.roles; //roles

    var urlParams = window.location.href;
    params["URL Params"] = urlParams;

    //Add Device Resolution
    var screen_res = window.screen.width * window.devicePixelRatio + "x" + window.screen.height * window.devicePixelRatio;
    var screen_wh = screen.width + "x" + screen.height;


    params["Screen Res"] = screen_res;
    params["Scree  WH"] = screen_wh;


    return params;

}