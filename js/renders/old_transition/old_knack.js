$(document).on('knack-scene-render.any', function(event, scene) {
    var measurementID ='G-3XYXWWXX44';
    if (typeof gtag ==='function'){
    gtag('js', new Date());
    gtag('config', measurementID, {
    // disable the default pageview hit
    send_page_view: false
    });
    gtag('event', 'page_view', {
    page_title: location.pathname + location.search + location.hash,
    page_location: location.search,
    page_path: location.pathname
    });
    } else {
    window.dataLayer = window.dataLayer || [];
    LazyLoad.js([`https://www.googletagmanager.com/gtag/js?id=${measurementID}`],function(){
    window.gtag = window.gtag || function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', measurementID, {
    // disable the default pageview hit
    send_page_view: false
    });
    // Manually send page_view events
    gtag('event', 'page_view', {
    page_title: location.pathname + location.search + location.hash,
    page_location: location.search,
    page_path: location.pathname
    });
    });
    }
    $('.kn-modal-bg').off('click'); //Will make the modal popup uncloseable when the outside is clicked
    // if( $('#kn-scene_1904').length === 0){
    //     $('.sv_carousel_bs').remove()
    // }
    
    $('#fix_image_links').click(function(){
      data = {}
    
      data['app_id'] = Knack.application_id;
      data ['app_key'] = window.knackRestApiKey;
    
      $.ajax({
              url: `https://process2.svweb.dev/webhook/fix-images`,
              type: 'POST',
              data: {json: JSON.stringify(data)},
              dataType: 'json',
               success: () => {
                  alert('Request Sent')
               }
          });
    })
    
        
    
    });
    
    
    
    var KNACK_API_BASE_URL = "https://api.sv.knack.com";
    
    window.cloud_test_path = "Test App";
    window.exifOverlays = [];
    /**
    * Variables for the form path records - Image Uploader
    */
    //var communityAuditPhotoSiteID = window.location.href.split('/')[6];
    
    
    
    // Window Cloudinary
    window.cloudinaryCredentials = {
        cloudName: 'strategicvisionz',
        unsignedUploadPreset: 'trashdash-default',
        apiKey: '594146185129859',
        apiSecret: 'URPTARoCbgIdkfvOkdU_j-u0Btw'
    };
    
    window.knackRestApiKey = 'ab3b1089-a171-4263-b8ed-b3efaa50bc7f';
    
    var canSupportClass = function() {
        try {
            eval('"use strict"; class foo {}');
            return true;
        } catch (e) {
            return false;
        }
    }
    
    KnackInitAsync = function($, callback) {
        window.$ = $;
        window.menuIconMap = [];
    
        var asyncLoads = 0;
    
        //for image upload integration
        if (canSupportClass()) {
            if (typeof FilePond == 'undefined') {
                LazyLoad.css([
                    'https://unpkg.com/filepond/dist/filepond.css',
                    'https://unpkg.com/filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css',
                    'https://strategic-visionz.github.io/image-uploader/dist/filepond-plugin-get-file.min.css'
                ], function() {
                    LazyLoad.js(['https://cdn.jsdelivr.net/npm/exif-js',
                        'https://unpkg.com/filepond-plugin-image-crop/dist/filepond-plugin-image-crop.js',
                        'https://unpkg.com/filepond-plugin-image-resize/dist/filepond-plugin-image-resize.js',
                        'https://unpkg.com/filepond-plugin-image-transform/dist/filepond-plugin-image-transform.js',
                        'https://unpkg.com/filepond-plugin-file-validate-size/dist/filepond-plugin-file-validate-size.min.js',
                        'https://unpkg.com/filepond-plugin-image-exif-orientation/dist/filepond-plugin-image-exif-orientation.min.js',
                        'https://unpkg.com/filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.js',
                        'https://unpkg.com/filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.js',
                        'https://unpkg.com/filepond-plugin-media-preview@1.0.9/dist/filepond-plugin-media-preview.js',
                        'https://unpkg.com/filepond/dist/filepond.min.js',
                        'https://strategic-visionz.github.io/image-uploader/dist/filepond-plugin-get-file.min.js',
                        'https://unpkg.com/filepond-plugin-file-rename/dist/filepond-plugin-file-rename.js',
                        // 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCvEr_-Zmt-jLWdCZNHF_XWQkBBWVRDvKo',
                        // 'https://strategic-visionz.github.io/image-uploader/staging/imageUploadIntegrationArray.js?v1.1',
                        // 'https://strategic-visionz.github.io/image-uploader/staging/imageuploader.js?v1.1.7',
                        'https://staging.svdev.io/imageUploadIntegrationArray.js',
                        'https://staging.svdev.io/imageuploader.js',
                        'https://staging.svdev.io/filepondIntegration.js',
                        // 'https://strategic-visionz.github.io/image-uploader/staging/filepondIntegration.js?v1.2'
                    ], function() {
                        asyncLoads++;
                    });
                });
            }
        } else {
            LazyLoad.js(['https://cdn.jsdelivr.net/npm/exif-js',
                'https://server.chhjny.com/imageupload/OldImageUploader.js',
                'https://server.chhjny.com/imageupload/processImageUploadIntegration_ordinary.js'
            ], function() {
                asyncLoads++;
            });
        }
    
        //end image upload integration
        // if (!Knack.isMobile()) {
        //     LazyLoad.css(['https://strategic-visionz.github.io/knack-css/scss/Sidebar.css'], function() {
        //         window.menuIconMap = {
        //             //Menu Name: Icon Name
        //             "History": "fa-history",
        //             "Services": "fa-server",
        //             "Management": "fa-life-ring",
        //             "Archive Pages": "fa-archive",
        //             "Settings": "fa-gear",
        //             "Help Desk": "fa-question-circle",
        //         };
                LazyLoad.js(['https://td-staging.glitch.me/sidebar.js'], function() {
                    asyncLoads++;
                });
        //     });
        // } else {
            // $("#app-menu-container").show();
            // asyncLoads++;
        // }
    
        //knack js api and kanban
        LazyLoad.css(['https://server.chhjny.com/jkanban/jkanban.min.css'], function() {
            LazyLoad.js(['https://server.chhjny.com/jkanban/jkanban.min.js',
                'https://server.chhjny.com/jkanban/KnackKanban.js'
            ], function() {
                asyncLoads++;
            });
        });
    
        //knack js api and kanban
        LazyLoad.css(['https://strategic-visionz.github.io/knack-css/trashButler_staging/themeTrashButler.css'], function() {
            asyncLoads++;
        });
    
    
    
        var checkAsyncLoads = setInterval(function() {
            //there are 3 async loads we are waiting on.
            // 1 image upload scripts
            // 2 sidebar scripts.
            // 3 KnackJsApi & Kanban scripts/css
            if (asyncLoads == 4) {
                clearInterval(checkAsyncLoads);
                callback();
            }
        }, 200);
    };
    
    
    //LOAD REQUIRED LIBRARIES
    //load from chhjny server
    LazyLoad.css(['https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
        'https://server.chhjny.com/scripts/@fullcalendar/core@4.2.0/main.min.css',
        'https://server.chhjny.com/scripts/@fullcalendar/daygrid@4.2.0/main.min.css',
        'https://server.chhjny.com/scripts/@fullcalendar/timegrid@4.2.0/main.min.css',
        'https://server.chhjny.com/scripts/@fullcalendar/bootstrap@4.2.0/main.min.css',
        'https://server.chhjny.com/scripts/tingle@0.15.1/tingle.min.css'
    ], function() {
        LazyLoad.js([
            'https://server.chhjny.com/scripts/@fullcalendar/core@4.2.0/main.min.js',
            'https://server.chhjny.com/scripts/@fullcalendar/daygrid@4.2.0/main.min.js',
            'https://server.chhjny.com/scripts/@fullcalendar/timegrid@4.2.0/main.min.js',
            'https://server.chhjny.com/scripts/@fullcalendar/bootstrap@4.2.0/main.min.js',
            'https://server.chhjny.com/scripts/@fullcalendar/interaction@4.2.0/main.min.js',
            'https://server.chhjny.com/scripts/tingle@0.15.1/tingle.min.js',
            'https://unpkg.com/sweetalert/dist/sweetalert.min.js'
        ], function() {
    
    
        });
    });
    
    //load slick-loader.js
    LazyLoad.css(['https://unpkg.com/slick-loader@1.1.20/slick-loader.min.css'], 
        function() {
            LazyLoad.js([
                'https://unpkg.com/slick-loader@1.1.20/slick-loader.min.js'
            ], function() {
    
    
        });
    });
    
    // Remove Image Overlay
    // LazyLoad.js([
    //         'https://trash-dash-app.glitch.me/remove-overlay.js'
    //     ], function() {
    // });
    
    // //load BS 4
    // LazyLoad.css(['https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css'], 
    //     function() {
    //         LazyLoad.js([
    //             'https://code.jquery.com/jquery-3.2.1.slim.min.js',
    //             'https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js',
    //             'https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js'
    //         ], function() {
    
    
    //     });
    // });
    
    
    //A simple Knack REST API interface that handles the 10 request/sec
    //limitation of the KNACK REST API.
    KnackApi = {};
    KnackApi.callCount = 0;
    KnackApi.knackCall = async function(type, urlParams, obj = null) {
        if (!type) return;
    
        try {
            await new Promise((resolve, reject) => {
                let waitInt = setInterval(() => {
                    if (KnackApi.callCount < 5) {
                        KnackApi.callCount++;
                        clearInterval(waitInt);
                        resolve();
                    }
                }, 100);
            });
    
            obj = obj ? obj : {};
    
            var headers = {
                'X-Knack-Application-Id': Knack.application_id,
                'X-Knack-REST-API-KEY': "ab3b1089-a171-4263-b8ed-b3efaa50bc7f"
            };
    
            if (type == 'put' || type == 'post') {
                headers['Authorization'] = Knack.getUserToken();
                headers['Content-Type'] = 'application/json';
            }
    
            return new Promise((resolve, reject) => {
                $.ajax({
                    type: type,
                    headers: headers,
                    url: `${KNACK_API_BASE_URL}/v1/objects/${urlParams}`,
                    data: JSON.stringify(obj),
                    success: function(data) {
                        KnackApi.callCount--;
                        resolve(data);
                    },
                    error: function(data) {
                        KnackApi.callCount--;
                        resolve(data);
                    }
                });
            });
        } catch (e) {
            console.log(e);
            return e;
        }
    };
    
    KnackApi.GetObjects = async function(objectName, filter) {
        let currentPage = 0;
        let maxPages = 0;
        const responses = [];
        do {
            currentPage++;
            let url = `${objectName}/records`;
            url += '?rows_per_page=1000';
            url += `&filters=${encodeURIComponent(JSON.stringify(filter))}`;
            url += `&page=${currentPage}`
            const response = await KnackApi.knackCall('get', url);
            const records = response.records;
            maxPages = response.total_pages;
            responses.push(records);
        } while (currentPage < maxPages)
        return [].concat(...responses);
    };
    
    KnackApi.GetObject = async function(objectName, id) {
        return await KnackApi.knackCall('get', `${objectName}/records/${id}`);
    };
    
    KnackApi.SaveObject = async function(objectName, data) {
        return await KnackApi.knackCall('post', `${objectName}/records`, data);
    };
    
    KnackApi.UpdateObject = async function(objectName, id, data) {
        return await KnackApi.knackCall('put', `${objectName}/records/${id}`, data);
    };
    
    KnackApi.DeleteObject = async function(objectName, id) {
        return await KnackApi.knackCall('delete', `${objectName}/records/${id}`, data);
    };
    
    
    /******KNACK VIEW BASED API */
    KnackViewApi = {};
    KnackViewApi.callCount = 0;
    KnackViewApi.knackCall = async function(type, urlParams, obj = null) {
        if (!type) return;
    
        try {
            await new Promise((resolve, reject) => {
                let waitInt = setInterval(() => {
                    if (KnackViewApi.callCount < 5) {
                        KnackViewApi.callCount++;
                        clearInterval(waitInt);
                        resolve();
                    }
                }, 100);
            });
    
            obj = obj ? obj : null;
    
            var headers = {
                'X-Knack-Application-Id': Knack.application_id,
                'X-Knack-REST-API-KEY': "ab3b1089-a171-4263-b8ed-b3efaa50bc7f"
            };
    
            if (type == 'put' || type == 'post') {
                headers['Authorization'] = Knack.getUserToken();
                headers['Content-Type'] = 'application/json';
            }
    
            return new Promise((resolve, reject) => {
                $.ajax({
                    type: type,
                    headers: headers,
                    url: `${KNACK_API_BASE_URL}/v1/pages/${urlParams}`,
                    data: JSON.stringify(obj),
                    success: function(data) {
                        KnackViewApi.callCount--;
                        resolve(data);
                    },
                    error: function(data) {
                        KnackViewApi.callCount--;
                        resolve(data);
                    }
                });
            });
        } catch (e) {
            console.log(e);
            return e;
        }
    };
    
    KnackViewApi.GetObjects = async function(sceneID, viewID, filter) {
        let currentPage = 0;
        let maxPages = 0;
        const responses = [];
        do {
            currentPage++;
            let url = `${sceneID}/views/${viewID}/records`;
            // url += '?rows_per_page=1000';
            // url += `&filters=${encodeURIComponent(JSON.stringify(filter))}`;
            // url += `&page=${currentPage}`
            const response = await KnackViewApi.knackCall('get', url);
            const records = response.records;
            maxPages = response.total_pages;
            responses.push(records);
        } while (currentPage < maxPages)
        return [].concat(...responses);
    };
    
    KnackViewApi.SaveObject = async function(sceneID, viewID, data) {
        return await KnackViewApi.knackCall('post', `${sceneID}/views/${viewID}/records`, data);
    };
    
    KnackViewApi.GetObject = async function(sceneID, viewID, id, deets) {
        return await KnackViewApi.knackCall('get', `${sceneID}/views/${viewID}/records/${id}`, deets);
    };
    
    KnackViewApi.UpdateObject = async function(sceneID, viewID, id, data) {
        return await KnackViewApi.knackCall('put', `${sceneID}/views/${viewID}/records/${id}`, data);
    };
    
    /******END KNACK VIEW BASED API */
    
    /*************
    KNACK JS API
    ************/
    var KnackJs = function(info) {
        // Knack info
        this.applicationID = info.applicationID;
        this.restAPIkey = info.restAPIkey;
        this.knackURL = info.knackURL || `${KNACK_API_BASE_URL}/v1/`;
        this.jQuery = info.jQuery || window.$;
    
        // Environment info
        this.environment = info.environment || 'production';
        this.isProduction = this.environment === 'production';
        this.isDevelopment = this.environment === 'development';
    
        // Internal info
        this.$spinnerBackdrop = null;
    
        // External libraries
        this.libraries = info.libraries || {
            async: {
                url: 'https://cdnjs.cloudflare.com/ajax/libs/async/2.4.1/async.min.js',
                loaded: false,
                objectName: 'async'
            },
            jquery: {
                url: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js',
                loaded: false,
                objectName: 'jQuery'
            }
        };
    
        // Check compatibility
        this.assert(Knack || window.Knack, 'Error, this library only run on Knack applications');
        this.assert(this.jQuery, 'Error, jQuery instance is required');
    };
    
    Object.defineProperty(KnackJs.prototype, '$', {
        get: function() {
            return window.jQuery || this.jQuery || window.$;
        }
    });
    
    KnackJs.prototype.set = function(key, value) {
        Object.defineProperty(KnackJs.prototype, key, {
            get: function() {
                return value;
            }
        });
    };
    
    KnackJs.prototype.assert = function(cond, message) {
        if (!cond) {
            throw new Error(message);
        }
    };
    
    Object.defineProperty(KnackJs.prototype, 'headers', {
        get: function() {
            return {
                'X-Knack-Application-ID': this.applicationID,
                'X-Knack-REST-API-Key': this.restAPIkey,
                'content-type': 'application/json'
            };
        }
    });
    
    KnackJs.prototype.find = function(objectId, filters, sortField, sortOrder, recordPerPage) {
        filters = filters || [];
        sortOrder = sortOrder || '';
        sortField = sortField || '';
        recordPerPage = recordPerPage || 'all';
    
        var filterValEnc = encodeURIComponent(JSON.stringify(filters));
        var sortFEnc = encodeURIComponent(sortField);
        var sortOEnc = encodeURIComponent(sortOrder);
    
        return this.$.ajax({
            type: 'GET',
            headers: this.headers,
            url: this.knackURL + 'objects/' + objectId + '/records?rows_per_page=' + recordPerPage +
                '&filters=' + filterValEnc + "&sort_field=" + sortFEnc + "&sort_order=" +
                sortOEnc
        });
    };
    
    KnackJs.prototype.findById = function(objectId, id) {
    
        return this.$.ajax({
            type: 'GET',
            headers: this.headers,
            url: this.knackURL + 'objects/' + objectId + '/records/' + id
        });
    };
    
    KnackJs.prototype.update = function(objectId, id, data) {
    
        return this.$.ajax({
            type: 'PUT',
            headers: this.headers,
            url: this.knackURL + 'objects/' + objectId + '/records/' + id,
            data: data
        });
    };
    
    KnackJs.prototype.delete = function(objectId, id) {
    
        return this.$.ajax({
            type: 'DELETE',
            headers: this.headers,
            url: this.knackURL + 'objects/' + objectId + '/records/' + id
        });
    };
    
    KnackJs.prototype.create = function(objectId, data) {
        return this.$.ajax({
            type: 'POST',
            headers: this.headers,
            url: this.knackURL + 'objects/' + objectId + '/records',
            data: data
        });
    };
    
    var knackApi = new KnackJs({
        applicationID: '5bbcb6a739b582305a70b738',
        restAPIkey: 'ab3b1089-a171-4263-b8ed-b3efaa50bc7f',
        environment: 'production',
        jQuery: $
    });
    
    knackApi.set('OBJECT', {
        MGR_SCHED: 'object_36',
        MGR_EVENTS: 'object_32',
        DISTRICT: 'object_27',
        COMMUNITY: 'object_8',
        SCHED_ITEM_TEMPLATES: 'object_35',
        COMM_SMS_LIST: 'object_37'
    });
    
    
    /////////////////END KNACK JS API
    
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
        if( $('#sv-top-back').length > 0 ){
            $('#sv-top-back').hide();
        }
    }
    
    window.hideSpinner = function() {
        $("#kn-loading-spinner").css("text-align", "");
        $("#kn-loading-spinner").removeClass("loading-text");
        $("#kn-loading-spinner").text("");
        window.originalKnackHideSpinner();
        if( $('#sv-top-back').length > 0 ){
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
    $(document).on('knack-view-render.view_3246', function(event, view, data) {
        var dFilter = new DateFilter([{
            'viewName': 'view_3246',
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
    //This is used to apply the custom date filter to multiple tables on the same page
      $(document).on('knack-scene-render.scene_XXX', function(event, view, data) {
      var filterTableParams = [{
          'viewName':'view_XXX', 
          'dateFieldId':'field_XXX'	
      },{
          'viewName':'view_XXX', 
          'dateFieldId':'field_XXX'  
      },{
          'viewName':'view_XXX', 
          'dateFieldId':'field_XXX'
      },{
          'viewName':'view_XXX', 
          'dateFieldId':'field_XXX'  
      }];
      
      var dFilter = new DateFilter(filterTableParams, 'Clock In Timestamp', '#kn-scene_XXX', 0)
      dFilter.init();
      });
      
    */
    
    
    
    /*
    END CUSTOM DATE FILTER
    */
    
    
    
    
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
    
    
    
    //This hides the clocked in timestamp on the Butler clock in form so that it can still collect information
    $(document).on("knack-view-render.view_5044", function(event, view, data) {
        $("#kn-input-field_113").addClass('hideMe');
    });
    
    //This hides the clocked in timestamp on the Full time Butler clock in form so that it can still collect information
    $(document).on("knack-view-render.view_5199", function(event, view, data) {
        $("#kn-input-field_1176").addClass('hideMe');
    });
    
    
    //This hides the timestamp fields on the Butler compactor-before form so that they can still collect information
    $(document).on("knack-view-render.view_78", function(event, view, data) {
        $("#kn-input-field_103").addClass('hideMe');
    });
    
    //This hides the timestamp fields on the Butler compactor-before-inside form so that they can still collect information
    $(document).on("knack-view-render.view_98", function(event, view, data) {
        $("#kn-input-field_103").addClass('hideMe');
    });
    
    //This hides the timestamp fields on the Butler compactor-after form so that they can still collect information
    $(document).on("knack-view-render.view_101", function(event, view, data) {
        $("#kn-input-field_103").addClass('hideMe');
    });
    
    //This hides the timestamp fields on the Butler compactor-after-inside form so that they can still collect information
    $(document).on("knack-view-render.view_104", function(event, view, data) {
        $("#kn-input-field_103").addClass('hideMe');
    });
    
    
    //This hides the timestamp fields on the Butler Clock Out form so that they can still collect information
    $(document).on("knack-view-render.view_5054", function(event, view, data) {
       $("#kn-input-field_114").addClass('hideMe');
    });
    
    
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
    
    //This hides the timestamp fields on the Area Supervisor Dashboard Clock In form so that they can still collect information
    $(document).on("knack-view-render.view_3181", function(event, view, data) {
        $("#kn-input-field_1176").addClass('hideMe');
    });
    
    //This hides the timestamp fields on the Area Supervisor "Time Punches" Clock In form so that they can still collect information
    $(document).on("knack-view-render.view_3089", function(event, view, data) {
        $("#kn-input-field_1176").addClass('hideMe');
    });
    
    //This hides the timestamp fields on the Area Supervisor Clock Out form so that they can still collect information
    $(document).on("knack-view-render.view_3090", function(event, view, data) {
        $("#kn-input-field_1177").addClass('hideMe');
    });
    
    //This hides the timestamp fields on the Area Supervisor Clock Out form so that they can still collect information
    $(document).on("knack-view-render.view_3088", function(event, view, data) {
        $("#kn-input-field_1177").addClass('hideMe');
    });
    
    
    //This hides the timestamp fields on the Butler - Testing Clock In form so that they can still collect information
    $(document).on("knack-view-render.view_3192", function(event, view, data) {
        $("#kn-input-field_113").addClass('hideMe');
    });
    
    //This hides the timestamp fields on the Butler - Testing Compactor Before form so that they can still collect information
    $(document).on("knack-view-render.view_3196", function(event, view, data) {
        $("#kn-input-field_103").addClass('hideMe');
    });
    
    //This hides the timestamp fields on the Butler - Testing Compactor Before Inside form so that they can still collect information
    $(document).on("knack-view-render.view_3200", function(event, view, data) {
        $("#kn-input-field_103").addClass('hideMe');
    });
    
    //This hides the timestamp fields on the Butler - Testing Compactor After form so that they can still collect information
    $(document).on("knack-view-render.view_3227", function(event, view, data) {
        $("#kn-input-field_103").addClass('hideMe');
    });
    
    //This hides the timestamp fields on the Butler - Testing Compactor After Inside form so that they can still collect information
    $(document).on("knack-view-render.view_3231", function(event, view, data) {
        $("#kn-input-field_103").addClass('hideMe');
    });
    
    //SMS
    $(document).on('knack-record-create.view_1628', function(event, view, record) {
        var smsListId = record.field_697_raw[0].id;
        var message = record.field_698;
    
        knackApi.findById(knackApi.OBJECT.COMM_SMS_LIST, smsListId).then((result) => {
            //send the message to the linked number of smsListId
            var number = result.field_692_raw.formatted;
            $.ajax({
                type: "POST",
                url: "https://server.chhjny.com:3003/send",
                data: JSON.stringify({
                    to: number,
                    message: message
                }),
                contentType: "application/json"
            });
        });
    });
    
    
    //SMS Bulk
    $(document).on('knack-record-create.view_1742', function(event, view, record) {
        var communityId = record.field_715_raw[0].id;
        var message = record.field_714;
        var filter = {
            'match': 'and',
            'rules': [{
                'field': 'field_711',
                'operator': 'is',
                'value': communityId
            }]
        };
        Knack.showSpinner();
        knackApi.find(knackApi.OBJECT.BULK_SMS_LIST, filter).then((result) => {
            if (result.total_records > 0) {
                var numbers = [];
                result.records.forEach((record) => {
                    numbers.push(record.field_710_raw.formatted);
                });
    
                $.ajax({
                    type: "POST",
                    url: "https://server.chhjny.com:3003/send_multiple",
                    data: JSON.stringify({
                        number_csv: numbers.join(","),
                        message: message
                    }),
                    contentType: "application/json"
                });
            } else {
                alert("No sms list item found with the selected community");
                knackApi.delete("object_41", record.id); //delete the message
            }
            Knack.hideSpinner();
        });
    });
    
    //SMS CSS Phone like thread display
    function responsiveChat(element) {
        $(element).html('<form class="chat"><span></span><div class="messages"></div></form>');
    
        function showLatestMessage() {
            $(element).find('.messages').scrollTop($(element).find('.messages').height());
        }
    
        showLatestMessage();
    }
    
    function responsiveChatPush(element, sender, origin, date, message) {
        var originClass;
        if (origin == 'me') {
            originClass = 'myMessage';
        } else {
            originClass = 'fromThem';
        }
        $(element + ' .messages').append('<div class="message"><div class="' + originClass + '"><p>' + message + '</p><date><b>' + sender + '</b> ' + date + '</date></div></div>');
        $(element).scrollTop($(element)[0].scrollHeight);
    }
    
    var interval_view_1627 = null;
    var scheduleModelFetchTimeout_view_1627 = null;
    var chatScroll_view_1627 = -1;
    var prevDataLength_view_1627 = 0;
    
    $(document).on('knack-view-render.view_1627', function(event, view, data) {
        $("#view_1627 div.kn-table-wrapper").html('')
        $("#view_1627 div.kn-records-nav").remove();
    
        /* Activating chatbox on element */
        responsiveChat('#view_1627 div.kn-table-wrapper');
        data.forEach((message) => {
            var messageClass = message.field_700 == 'TB Response' ? "me" : "you";
            var name = message.field_700 == 'TB Response' ? message.field_702_raw[0].identifier : "Customer";
            responsiveChatPush('.chat', name, messageClass, message.field_703, message.field_698);
        });
    
    
        //retain the scroll position of the chat box
        if (chatScroll_view_1627 > -1 && prevDataLength_view_1627 == data.length) {
            $(".chat").scrollTop(chatScroll_view_1627);
        }
    
        prevDataLength_view_1627 = data.length;
    
        //make sure that the poll function has not been started yet
        //and also there is no scheduled event to start the poll function
        if (interval_view_1627 == null && scheduleModelFetchTimeout_view_1627 == null) {
            interval_view_1627 = setInterval(function() {
                Knack.views.view_1627.model.fetch();
            }, 1000);
        }
    
        //when scrolling for that sms messages, stop the polling of new messages for smooth scrolling
        //resume only after the scroll stopped and 500ms has passed.
        $(".chat").off().on("scroll", function() {
            chatScroll_view_1627 = $(".chat").scrollTop();
            clearInterval(interval_view_1627);
            interval_view_1627 = null;
            if (scheduleModelFetchTimeout_view_1627 != null) {
                clearTimeout(scheduleModelFetchTimeout_view_1627);
            }
    
            scheduleModelFetchTimeout_view_1627 = setTimeout(function() {
                interval_view_1627 = setInterval(function() {
                    Knack.views.view_1627.model.fetch();
                }, 1000);
            }, 500);
        });
    });
    
    //when butler sends message, append to message thread view_1628
    $(document).on('knack-record-create.view_1628', function(event, view, record) {
        responsiveChatPush('.chat', record.field_702_raw[0].identifier, "me", record.field_703, record.field_698);
    });
    
    //accordion stuff
    $.fn.toAccordion = function() {
        var generateAccordionRow = function(rowData, index, view_id) {
            var hasContent = rowData.content.length > 0;
            var mainDiv = $("<div> </div>");
            var checked = index == 0 ? "checked='true'" : "";
            var disableClick = hasContent ? "" : "disabled";
            var clickControl = $(`<input id='faq-${view_id}-${index}' name='faq-${view_id}' type='radio' ${disableClick}>`);
            var header = $(`<label for='faq-${view_id}-${index}'>${rowData.header}</label>`);
    
            mainDiv.append(clickControl);
            mainDiv.append(header);
    
            if (hasContent) {
                var contentContainer = $('<article class="ac-small"> </article>');
                var content = $(`<p>${rowData.content}</p>`);
                contentContainer.append(content);
                mainDiv.append(contentContainer);
            }
    
            return mainDiv;
        };
    
        //this is the view object
        var view_id = $(this).attr("id");
        var faqAccContainer = $('<section class="ac-container"></section>');
        $(this).find("table.kn-table").parent().css("display", "none");
        $(this).find("table.kn-table tbody tr").each((idx, tr) => {
            var faqAccordionData = {
                header: '',
                content: ''
            };
    
            if ($(tr).hasClass('kn-tr-nodata')) {
                faqAccordionData.header = 'No Data';
            } else {
                $(tr).find("td").each((i, td) => {
                    var text = $.trim($(td).text());
                    if (i == 0) { //header
                        faqAccordionData.header = text;
                    } else { //content
                        faqAccordionData.content = text;
                    }
                });
            }
    
            var accordionData = generateAccordionRow(faqAccordionData, idx, view_id);
            faqAccContainer.append(accordionData);
        });
        $(this).append(faqAccContainer);
        return this;
    };
    
    //The tables listed in this view array should:
    // - only have 2 columns, first column will be displayed has the header, and the second is the content of the accordion
    // - should not display any other element besides the table, so no pagination, filter, search.
    var tablesToAccordionViews = ['view_2246', 'view_2245', 'view_2244', 'view_2243', 'view_2242', 'view_2241', 'view_2240'];
    
    tablesToAccordionViews.forEach((view_id, idx) => {
        $(document).on(`knack-view-render.${view_id}`, function(event, view, data) {
            $(`#${view_id}`).toAccordion();
        });
    });
    
    //Listener for the Training Group assignment
    $(document).on('knack-record-create.view_2788', function(event, view, record) {
        Knack.showSpinner();
        $.ajax({
            url: 'https://knackhelper.azurewebsites.net/api/trainingGroupAssignment?code=QqMNtQyUkFQ1y/a0zqkZauduJE6N/my8FVCS2tUz/UmKMI/SaYTUrg==&&name=John',
            type: 'POST',
            data: JSON.stringify(record),
            success: function(response) {
                alert('API Called.');
            }
        });
        alert("Submitted!");
    });
    
    
    //Community Concierge Section
    //May 2021
    
    var loggedInState = { 'clocked_in': undefined, 'clockedTime' : '', 'clockedDate' : ''};
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
    
    //Log in Add Css if ID exist
    function addStyleSheet(){
        if ($('#community_concierge_theme').length == 0) {
            $('head').append('<link rel="stylesheet" type="text/css" id="community_concierge_theme" class="lazyload" href="https://strategic-visionz.github.io/knack-css/scss/Community%20Manager%20Theme.min.css">')
              $('head').append(`<script>
        (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:2773425,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    </script>`)
        }
    }
    //Login
    $(document).on("knack-view-render.view_3363", function(event, view, data) {
        addStyleSheet();
        if ($('#sv-top-back').length > 0) {
            $("#sv-top-back").remove();
        }
    });
    
    //view_3369 This will add the css for the CM Concierge - My Communities
    $(document).on("knack-view-render.view_3370", function(event, view, data) {
          $('.updates-from-tb-details').hide();
          addStyleSheet();
          console.log(data);
        try {
            if(data.length > 0){
                $('.field_1403').hide(); //Hide the Update From TB Team field
              if(data[0].field_1403 != ""){
                var updataText = data[0].field_1403;
                var updateLength = 100;
                var trimmedUpdate = updataText.substring(0, updateLength);
                // var stickyNotifFromTB = `<div class="sv-tooltip" id="notif_from_tb"><p><strong>UPDATE FROM THE TRASH BUTLER TEAM:</strong> ${trimmedUpdate}...<a id="view_TBupdate_btn0" style="font-style: italic; font-size: 15px;">(Click here to read more)</a></p></div>`;
                //$('#view_3370').append(stickyNotifFromTB);
                if(data[0].field_1403){$('#view_TBupdate_btn0').on('click', function(){ window.location.href = $(location).attr('href') +'updates-from-trash-butler-team/'+data[0].id })}
                  }
                  
                  var filterPrev = [{
                  "field":"field_46",
                  "operator":"is",
                  'value': prevServiceDate()
                }]
                
                $(".kn-list-item-container").addClass("pointer");
                $("#view_3370 section").click(function() {
                      //var redirectTo = $(this).find("a").attr("href") + '?view_3397_filters=' + encodeURIComponent(JSON.stringify(filterPrev));
                    window.location = $(this).find("a").attr("href");
                      //window.location = redirectTo;
                      $('')
                    return false;
                });
                if ($('#sv-top-back').length > 0) {
                $("#sv-top-back").remove();
                }
                //This add the text for the SERVICE TODAY -> Time info
                $('.kn-detail.field_141').addClass('hideMe');
                var i;
                for (i = 0; i < data.length; i++) {
                    if (data[i].field_141 == "Yes") {
                        $($('.field_44')[i]).html('Service Today At ' + data[i].field_44);
                    } else {
                        $($('.field_44')[i]).html('No Service Today');
                    }
                }
                function findHref(){
                    console.log("findHref")
                    window.location = $(this).find("a").attr("href");
                    return false;
                }
            }
          }
          catch(err) {
              console.log("view_3370", err)
          }
    });
    
    function appendCustomMenuBottom() {
        $($('.show-breadcrumbs')[0]).remove()
        if ($('#community_concierge_theme').length == 0) {
            $('head').append('<link rel="stylesheet" type="text/css" id="community_concierge_theme" class="lazyload" href="https://strategic-visionz.github.io/knack-css/scss/Community%20Manager%20Theme.min.css">')
        }
        let customMenu = $('#custom_menu_id');
    
        var myComIcon = `<i class="fa fa-building"></i>`;
        var logOutIcon = `<i class="fa fa-sign-out"></i>`;
    
        $('#kn-mobile-menu').append(customMenu);
        var customMenuBottom = $(`
            <ul class="sv-bottom-menu" style="list-style-type: none;">
              <li><a href="https://apps.sv.knack.com/trashdash#community-concierge">  ${myComIcon} <span class="custom-menu-text"> My Communities </span></a></li>
              <li><a href="#" class="kn-log-out">${logOutIcon} <span class="custom-menu-text"> Log Out</a> </span></li></ul>
            </ul>`);
        var checkIfExist = document.getElementsByClassName('sv-bottom-menu');
        if (checkIfExist.length == 0) {
            $('#kn-mobile-menu').append(customMenuBottom);
        }
    
    }
    //This will click the service Id btn on the hidden list (View And Rate Last night Service)
    $(document).on("knack-view-render.view_3397", function(event, view, data) {
        console.log("view_3397 is loaded", data);
        $('#view_3397').hide();
          // console.log(data, "SERVICE ID DATA")
        //this will hide the rate last night btn if there no exising service last night;
          //june 28 update, change the condition to hide if the LAST Service is Rated
          if(data.length > 0){
          if(data[0].field_1464 == "Yes"){
              //$('#view_last_night_service_btn').addClass("hideMe");
              $('#view_last_night_service_btn').append(`&nbsp;&nbsp;&nbsp;<i style="margin-top: 5px;" class="fa fa-check-circle"></i>`);
              data[0].field_1552.includes('up') ? $('#view_last_night_service_btn').addClass('rated-icon-green') : $('#view_last_night_service_btn').removeClass('rated-icon-green') 
          }
    
          $('#view_last_night_service_btn').on('click', function() {
              //$('#last_night_service_id').click();
             $('#review_service_po').click();
          });
        }
        else{
            $('#view_last_night_service_btn').hide();
            $($('#sv_view_service_history').parents()[4]).show()
        }
    });
    
    function showHideMenuText() {
        if ($(".minimizedMenu")[0]) {
            $('.custom-menu-text').addClass('hideMe');
            $('#custom_menu_id li').addClass('bigger-icon');
            $('.sv-bottom-menu').addClass('bigger-icon');
            $('#custom_menu_id').addClass('adjust-margin-top-60px');
    
        } else {
            $('.custom-menu-text').removeClass('hideMe');
            $('#custom_menu_id li').removeClass('bigger-icon');
            $('.sv-bottom-menu').removeClass('bigger-icon');
            $('#custom_menu_id').removeClass('adjust-margin-top-60px');
        }
    }
    
    function appendCustomMenuMain() {
        //Menu Icon
        var dashboard = `<i class="fa fa-th-large"></i>`;
        var serviceHistory = `<i class="fa fa-history "></i>`;
        var infractions = `<i class="fa fa-info-circle"></i>`;
        var units = `<i class="fa fa-tachometer"></i>`;
        var hazards = `<i class="fa fa-life-ring"></i>`;
        var supportTicket = `<i class="fa fa-inbox"></i>`;
        var billing = `<i class="fa fa-list-alt"></i>`;
        var profile = `<i class="fa fa-user"></i>`;
        //
        var radarLog = `<i class="fa fa-camera"></i>`;
        var comLog = `<i class="fa fa-building-o"></i>`;
        var userVidGuides = `<i class="fa fa-book"></i>`;
    
    
        var customMenu = $(`
            <ul id="custom_menu_id" style="list-style-type:none; display:none;">
              <li id="com_dashboard"><a class="sv-cm-navbar" >${dashboard} <span class="custom-menu-text"> Dashboard</span></a></li>
              <li id="com_service_history"><a class="sv-cm-navbar" >${serviceHistory} <span class="custom-menu-text"> Service History</span></a></li>
              <li id="com_infractions"><a class="sv-cm-navbar" >${infractions} <span class="custom-menu-text"> Infractions</span></a></li>
              
              <li id="com_hazards"><a class="sv-cm-navbar" >${hazards}<span class="custom-menu-text"> Service Hazards</span></a></li>
              <li id="com_support_tickets"><a class="sv-cm-navbar" >${supportTicket} <span class="custom-menu-text"> Support Tickets</span></a></li>
              <li id="com_radar"><a class="sv-cm-navbar" >${units}</i> <span class="custom-menu-text"> Community Units</span></a></li>
              <li id="com_radarLogs"><a class="sv-cm-navbar" >${radarLog} <span class="custom-menu-text"> RADAR Logs</span></a></li>
              <li id="com_account_billing" style="display: none;"><a class="sv-cm-navbar" >${billing} <span class="custom-menu-text"> Account/Billing</span></a></li>
              <li id="com_profile"><a class="sv-cm-navbar" >${profile} <span class="custom-menu-text"> Community Profile</span></a></li>
              <li id="user_guide"><a class="sv-cm-navbar" >${userVidGuides} <span class="custom-menu-text"> Video Training</span></a></li>
    
              
              <li id="com_comLogs" style="display: none;"><a class="sv-cm-navbar" >${comLog} <span class="custom-menu-text"> Community Logs</span></a></li>
            </ul>`
            //HIDDEN
            //Com log
            //Account Billing
        );
    
        if ($('#custom_menu_id').length == 0) {
            $('#kn-mobile-menu').append(customMenu);
        }
        $($('.kn-mobile-controls')[0]).on('click', function() {
            showHideMenuText();
        })
    
        //var backButtonTop = `<div id="sv-top-back" class="kn-view kn-back-link sv-top-back"><a class="ang-link">Back to Community Dashboard</a></div>`;
        //if($('.sv-top-back').length == 0 ) {$('#knack-dist_1').append(backButtonTop);}
        //if($('#kn-scene_1255').length > 0){ $('#sv-top-back').remove(); }
        if ($('.kn-back-link').length == 1) {
            let goBackTop = $('.kn-back-link').clone().attr("id", "sv-top-back").appendTo("#knack-dist_1");
            let origLink = $($('.kn-back-link a')[0]).attr('href');
    
            var timeout = setTimeout(function() {
                let orig = $($('.kn-back-link a')[0]).attr('href');
                $("#sv-top-back a").attr("href", origLink).addClass("sv-top-back");
                clearTimeout(timeout);
            }, 1000);
        } else {
            let origLink = $($('.kn-back-link a')[0]).attr('href');
            let origText = $($('.kn-back-link a')[0])[0].innerHTML;
            //console.log(origText, "origTEXT")
    
            var timeout = setTimeout(function() {
                let orig = $($('.kn-back-link a')[0]).attr('href');
                $("#sv-top-back a").attr("href", origLink).addClass("sv-top-back");
                $("#sv-top-back a").html(origText)
                clearTimeout(timeout);
            }, 200);
        }
    
        //Add the new section if dev
        // var currentLoc = window.location.href
        // // var userProfKeys = Knack.session.user.profile_keys;
        // // if(userProfKeys.includes('profile_34')){
        //     var guideVidSection = `<li id="user_guide"><a href="${currentLoc}video-user-guides2" class="sv-cm-navbar" >${userVidGuides} <span class="custom-menu-text"> User Guides</span></a></li>`
        //     $('#kn-mobile-menu ul').append(guideVidSection);
        // // }
    
    }
    //add href to the navbar
    function addLinkToCommunityDashboard(cid) {
        //console.log(data.field_1629, "sidebar data")
        appendCustomMenuBottom();
        $('.field_1629').hide();
        //Show Account Billing Menu if Account Billing Date Created is not empty;
        // if (data.field_1629) {
        //     //$('#com_account_billing').css('display', 'block');
        // }
    
        let varId = cid;
        $('#com_dashboard a').attr("href", "https://apps.sv.knack.com/trashdash#community-concierge/community-dashboard/" + varId);
        $('#com_service_history a').attr("href", "https://apps.sv.knack.com/trashdash#community-concierge/community-dashboard/" + varId + "/community-service-history/" + varId);
        $('#com_infractions a').attr("href", "https://apps.sv.knack.com/trashdash#community-concierge/community-dashboard/" + varId + "/infractions/" + varId);
        $('#com_radar a').attr("href", "https://apps.sv.knack.com/trashdash#community-concierge/community-dashboard/" + varId + "/radar-and-units/" + varId);
        $('#com_hazards a').attr("href", "https://apps.sv.knack.com/trashdash#community-concierge/community-dashboard/" + varId + "/service-hazards/" + varId);
        $('#com_support_tickets a').attr("href", "https://apps.sv.knack.com/trashdash#community-concierge/community-dashboard/" + varId + "/community-support-tickets/" + varId);
        $('#com_account_billing a').attr("href", "https://apps.sv.knack.com/trashdash#community-concierge/community-dashboard/" + varId + "/account-billing/" + varId);
        $('#com_profile a').attr("href", "https://apps.sv.knack.com/trashdash#community-concierge/community-dashboard/" + varId + "/my-community-profile/" + varId);
        //
        $('#com_radarLogs a').attr("href", "https://apps.sv.knack.com/trashdash#community-concierge/community-dashboard/" + varId + "/radar-logs/" + varId);
        $('#com_comLogs a').attr("href", "https://apps.sv.knack.com/trashdash#community-concierge/community-dashboard/" + varId + "/community-logs/" + varId);
        //back_to_dashboard
        $('#sv-top-back a').attr("href", "https://apps.sv.knack.com/trashdash#community-concierge/community-dashboard/" + varId);
        $('#user_guide a').attr("href", "https://apps.sv.knack.com/trashdash#community-concierge/community-dashboard/" + varId + "/cc-training-v2/" + varId);
        //$('#custom_menu_id').css({"display": "block"});
        var timeout = setTimeout(function() {
            document.getElementById('custom_menu_id').style.display = 'block';
            clearTimeout(timeout);
        }, 1000);
    
        // localStorage.currentCommunity = varId;
        // console.log(localStorage.currentCommunity)
    }
    //SIDE BAR
    //DASHBOARD
    $(document).on("knack-view-render.view_3374", function(event, view, data) {
        // console.log(data);
        appendCustomMenuMain();
        addLinkToCommunityDashboard(data.id);
        //$('#view_3374 #on_radar_num').hide();
        $('#com_dashboard').addClass('sv-active');
    
        $('.field_958').hide();
        $('.field_1144').hide();
        $('.field_1292').hide();
        var userIcon = `<i class="fa fa-user"></i> `;
        var phoneIcon = `<i class="fa fa-phone"></i>`;
        var emailIcon = `<i class="fa fa-inbox"></i>`;
    
        var crmName = `<p>${userIcon}<span>${data.field_958}<span></p>`;
        var crmPhone = `<p>${phoneIcon}<span>${data.field_1292}<span></p>`;
        var crmEmail = `<p>${emailIcon}<span>${data.field_1144}<span></p>`;
    
        if (data.field_958) {
            $('#crm_name').html(crmName);
        } else {
            $('#crm_name').html("");
        }
        if (data.field_1292) {
            $('#crm_phone').html(crmPhone);
        } else {
            $('#crm_phone').html("");
        }
        if (data.field_1144) {
            $('#crm_email').html(crmEmail);
        } else {
            $('#crm_email').html("");
        }
        $('#sv_survey_link').on('click', function(){
            $('#click_survey_id').click();
        })
    });
    
    //view_3749
    $(document).on("knack-view-render.view_3749", function(event, view, data) {
        console.log(data.field_1647, "RADAR FIELD");
        //Units On Radar Dashboard
        $('.field_1647').hide(); //On Radar Number
        var radarIcon = `<i class="fa fa-camera"></i>`;
        var noRadarText = `${radarIcon} <span>No Unit On RADAR</span>`;
    
        if (data.field_1647 == 0) {
            //$('#on_radar_num').innerHTML(noRadarText);
            document.getElementById("on_radar_num").innerHTML = noRadarText;
            console.log("NO RADAR")
    
        } else {
              $('#on_radar_num').html(`${radarIcon} <span> ${data.field_1647} Units On RADAR</span>`)
        }
        //End Units On Radar Dashboard
    });
    
    var setNumberOfRadar =  $(document).on("knack-view-render.view_3670", function(event, view, data) {
        console.log(data.field_1647);
        //Units On Radar Dashboard
        $('.field_1647').hide(); //On Radar Number
        var radarIcon = `<i class="fa fa-camera"></i>`;
    
        var noRadarText = `${radarIcon} <span>No Unit On RADAR</span>`;
        var withRadarText = `${radarIcon} <span> ${data.field_1647} Units On RADAR</span>`;
    
        if (data.field_1647 == 0) {
            //$('#on_radar_num').innerHTML(noRadarText);
            document.getElementById("on_radar_num").innerHTML = noRadarText;
            console.log("NO RADAR")
    
        } else {
            //$('#on_radar_num').html(withRadarText);
            document.getElementById("on_radar_num").innerHTML = withRadarText;
        }
        //End Units On Radar Dashboard
    });
    
    $(document).on("knack-view-render.view_3458", function(event, view, data) {
        appendCustomMenuMain();
        addLinkToCommunityDashboard(data.id);
        $('#com_service_history').addClass('sv-active');
    });
    
    //Infractions view_3561
    $(document).on("knack-view-render.view_3561", function(event, view, data) {
        appendCustomMenuMain();
        addLinkToCommunityDashboard(data.id);
        $('#com_infractions').addClass('sv-active');
    });
    //Radar and Units view_3465
    $(document).on("knack-view-render.view_3465", function(event, view, data) {
        appendCustomMenuMain();
        addLinkToCommunityDashboard(data.id);
        $('#com_radar').addClass('sv-active');
    
        if (data.field_1647 === 0) {
            $('#view_3465 #field_1647 span').style.display = "none";
        }
    });
    //view_3560 Service Hazards
    $(document).on("knack-view-render.view_3560", function(event, view, data) {
        appendCustomMenuMain();
        addLinkToCommunityDashboard(data.id);
        $('#com_hazards').addClass('sv-active');
    });
    
    //Service Hazards view_3463 UNSURE
    $(document).on("knack-view-render.view_3463", function(event, view, data) {
        appendCustomMenuMain();
        addLinkToCommunityDashboard(data.id);
    
    
    });
    //Support Ticket view_3468
    $(document).on("knack-view-render.view_3468", function(event, view, data) {
        appendCustomMenuMain();
        addLinkToCommunityDashboard(data.id);
        //com_support_tickets
        $('#com_support_tickets').addClass('sv-active');
    });
    //Account Billing view_3470
    $(document).on("knack-view-render.view_3470", function(event, view, data) {
        appendCustomMenuMain();
        addLinkToCommunityDashboard(data.id);
        $('#com_account_billing').addClass('sv-active');
    });
    //Profile view_3472 ? UNSURE
    $(document).on("knack-view-render.view_3472", function(event, view, data) {
        appendCustomMenuMain();
        addLinkToCommunityDashboard(data.id);
        $('#com_profile').addClass('sv-active');
    });
    //view_3551 Community Profile
    $(document).on("knack-view-render.view_3551", function(event, view, data) {
        appendCustomMenuMain();
        addLinkToCommunityDashboard(data.id);
        $('#com_profile').addClass('sv-active');
        //console.log(testGetId);
    });
    //view_3477
    $(document).on("knack-view-render.view_3477", function(event, view, data) {
        appendCustomMenuMain();
        addLinkToCommunityDashboard(data.id);
    });
    
    //view_3536 Edit Community Profile
    $(document).on("knack-view-render.view_3536", function(event, view, data) {
        appendCustomMenuMain();
        addLinkToCommunityDashboard(data.id);
    });
    
    //view_3587 RADAR Logs
    $(document).on("knack-view-render.view_3587", function(event, view, data) {
        appendCustomMenuMain();
        addLinkToCommunityDashboard(data.id);
        $('#com_radarLogs').addClass('sv-active');
    });
    
    //view_3586 Community Logs
    $(document).on("knack-view-render.view_3586", function(event, view, data) {
        appendCustomMenuMain();
        addLinkToCommunityDashboard(data.id);
    });
    
    //view_3604 Maange Access Code
    $(document).on("knack-view-render.view_3604", function(event, view, data) {
        appendCustomMenuMain();
        addLinkToCommunityDashboard(data.id);
    });
    
    //Community Units - view_3512
    $(document).on("knack-view-render.view_3512", function(event, view, data) {
        appendCustomMenuMain();
        addLinkToCommunityDashboard(data.id);
    
    });
    
    //Community Units - view_5247
    $(document).on("knack-view-render.view_5247", function(event, view, data) {
        appendCustomMenuMain();
        addLinkToCommunityDashboard(data.id);
    
    });
    
    //END SIDE BAR
    
    //Last Night Service Rating
    // $(document).on("knack-view-render.view_3410", function(event, view, data) {
    //     $("input").addClass("hideMe");
    //     $('#view_3410 button').addClass('hideMe');
    //     $(".radio").on('click', function() {
    //         if ($('.radio:checked').val() != null) {
    //             const selections = document.querySelectorAll('input[type="radio"]');
    //             let userSelection;
    //             for (const selection of selections) {
    //                 if (selection.checked) {
    //                     userSelection = selection.value;
    //                     break;
    //                 }
    //             }
    //             //console.log(userSelection);
    //             if (userSelection == `<i class="fa fa-thumbs-down rating-down"></i>`) {
    //                 //console.log("Thumbs D");
    //                 $('#view_3410 button').removeClass('hideMe');
    //                 //$("#view_3549-field_1495").prop("selectedIndex", 1).change();
    //                 $('#kn-input-field_1425').removeClass('hideMe');
    //             } else {
    //                 //console.log("Thumbs UP");
    //                 //$("#view_3549-field_1495").prop("selectedIndex", 2).change();
    //                 $('#view_3410 button').removeClass('hideMe');
    //                 $('#view_3410 form').submit();
    //                 //location.reload();
    //                 $('#kn-input-field_1425').addClass('hideMe');
    
    //             }
    //         }
    //     });
    //     //$($(".kn-button")[0]).addClass("hideMe");
    //     $(".radio").on('click', function() {
    //         if ($('.radio:checked').val() != null) {
    //             //$('form').submit();
    //             //location.reload();
    //         }
    //     });
    //   	  //close_rating_form
    //     $('#close_rating_form').on('click', function() {
    //       	console.log('close_rating_form')
    //       	$('.kn-radio').hide(); $('#close_rating_form').hide()
    //         $('#view_3473').removeClass('hideMe');
    //         $('#view_3410').addClass('hideMe');
    //       	$('#view_3473 i').show(); $('#edit-rating-id').show();
    //     });
    // });
    
    //Refresh the page once the rate is submitted successfully
    // $(document).on('knack-form-submit.view_3410', function(event, view, record) {
    //   location.reload();
    // //   $('#view_3410').addClass('hideMe');//view_3473
    //   $('#view_3473').removeClass('hideMe');
    //   $('#edit-rating-id').show();
    //   $('#view_3473 i').show();
    // });
    
    //view_3473 Survey Form
    $(document).on("knack-view-render.view_3473", function(event, view, data) {
        //console.log(data);
        var currentServiceId = $(location).attr("href").replace(/\/\s*$/, "").split('/').pop();
        var blankValue = `<i class="fa fa-plus-circle"></i>`;
        // if (data.field_1462 == blankValue || data.field_1462 == "") {
        //     // $('#view_3410').removeClass('hideMe');
        //     // $('#view_3473').addClass('hideMe');
        // } else {
        //     // $('#view_3410').addClass('hideMe');
        //     $('#view_3473').removeClass('hideMe');
        // }
        if(data.field_1464 != 'Yes'){
             $('#edit-rating-id').html('Add Rating');
             $('.field_1552').hide();
        }
        $('#edit-rating-id').on('click', function() {
    
              // $('#view_3473 i').hide(); $('#edit-rating-id').hide();
            // $('#view_3473').addClass('hideMe');
            // $('#view_3410').removeClass('hideMe');
              // $('.kn-radio').show();
            // $("#view_3410 input:radio").attr("checked", false);
            // $('#kn-input-field_1425').addClass('hideMe');
              // $('#close_rating_form').show()
              // $('#view_3410 .kn-form-reload').click();
            window.location.href = $(location).attr('href') + 'edit-service-id4/'+currentServiceId;
            
    
        });
    });
    
    function showInfractionLoss(data) {
          console.log(data, "number of Infraction");
        $('.field_1630').addClass('hideMe');
        $('.field_1487').addClass('hideMe');
        //
        var totalNumberInfractions = data.field_1630;
        var totalLoss = data.field_1487;
        var warningIcon = `<i class="fa fa-exclamation-triangle"></i>`;
        var goodIcon = `<i class="fa fa-check"></i>`;
        var warningText = `${warningIcon}<span class="sv-warning-cost">You currently have ${totalLoss} in lost revenue</span><br> from ${totalNumberInfractions} unaddressed infractions for the last 30 days.`;
        var goodText = `${goodIcon} All current infractions have been addressed.`;
    
        if (totalNumberInfractions > 0) {
            $('#infraction_warning').html(warningText);
            $('#infraction_warning').addClass('sv-warning-text');
        } else {
            $('#infraction_warning').html(goodText);
            $('#infraction_warning').addClass('sv-no-infraction');
            //$('#infraction_warning').hide();
        }
      
          //infrationTest();
        
        function infrationTest(){
              var filtersIn = {
        'match': 'and',
        'rules': [
                  { 
                    'match': 'or',
                    'rules': [
                            {
                                'field':'field_66',
                                'operator':'is today'
                            },
                              {
                                'field':'field_66',
                                'operator':'is during the previous',
                                "range":30,
                                "type":"days"
                            }
                          ]
                      
                  },
                      {'field':'field_65',
                      'operator':'is',
                      'value':data.id
                    }
                ],
    };
              console.log(data.id, "data.id")
            return $.ajax({
                type: 'GET',
                headers:  {
                              'X-Knack-Application-Id': Knack.application_id,
                              'X-Knack-REST-API-Key': window.knackRestApiKey,
                              'Authorization': Knack.getUserToken()
                    },
                url: 'https://api.sv.knack.com/v1/objects/object_10/records?filters=' + encodeURIComponent(JSON.stringify(filtersIn)),
                success: function(res) {
                    console.log(res, "infraction Data");
                }
            });
        }   
          
    }
    
    //view_3374 Show Infraction Total Loss
    $(document).on("knack-view-render.view_3374", function(event, view, data) {
        showInfractionLoss(data);
    });
    //view_3508 Show Infraction Total Loss on Infraction Page
    $(document).on("knack-view-render.view_3508", function(event, view, data) {
        showInfractionLoss(data);
    });
    
    //Get what quarter
    $(document).on("knack-view-render.view_3514", function(event, view, data) {
        $('#sv_survey_link').removeClass('hideMe')
        data.field_1113 = 0;
        console.log(data, "view_3514view_3514view_3514view_3514")
        $('#view_3514').hide();
        var date = new Date();
        var quarter = parseInt(date.getMonth() / 3) + 1;
        var currentYear = date.getFullYear();
        var lastSurveyDate = data.field_2375;
        var lastDate = new Date(lastSurveyDate)
        var lastSurveyQuarter = parseInt(lastDate.getMonth() / 3) + 1;
        var lastSurveyYear;
        var lastSurveyDateEqualsCurrentDate = false;
        var currentCMRoles = Knack.session.user.profile_objects;
        var currentCMId = currentCMRoles.find(x => x.object == "object_5").entry_id;
        if(lastSurveyDate != ''){
            lastSurveyYear = new Date(data.field_2375); lastSurveyYear = lastSurveyYear.getFullYear();
            if(currentYear == lastSurveyYear && quarter == lastSurveyQuarter){
                lastSurveyDateEqualsCurrentDate = true;
            }
        }
        console.log(currentYear, lastSurveyYear, quarter, lastSurveyQuarter)
        //check if current CM has taken the survey
        var takenBy = [];
        if(data.field_2379 != ''){
            takenBy = takenBy.concat(data.field_2379_raw); 
        }
        var surveyTakenByLoggedCM = false;
        takenBy.forEach(checkIfTakenByCurrentCM);
        function checkIfTakenByCurrentCM(item, index) {
            if(takenBy[index].id == currentCMId){
                surveyTakenByLoggedCM = true;
            }
        }
        console.log('surveyTakenByLoggedCM',surveyTakenByLoggedCM)
        //console.log(quarter, currentYear)
        //this will show the survey notification IF the current quarter total survey is more than 0.
        $('#current_year_id').html(currentYear);
        $('#current_quarter_id').html($('#sv_survey_quarter_v').html());
        
        if(lastSurveyDateEqualsCurrentDate && surveyTakenByLoggedCM){
            // $('p.sticky').hide();
            // $('p.sticky').removeClass('hideMe');
            $('#sv_survey_link').hide();
        }else{
           $('#view_survey_id').click();
           $('p.sticky').removeClass('hideMe');
        }
        console.log(lastSurveyDateEqualsCurrentDate, "lastSurveyDateEqualsCurrentDate", surveyTakenByLoggedCM, "surveyTakenByLoggedCM")
        //Close the Sticky Survey
        // $('#close_sticky').on('click', function() {
        //     $('p.sticky').hide();
        // });
    
        //view_survey_id Open the Survey
        $('#click_survey_id').on('click', function() {
            $('#view_survey_id').click();
            // $('p.sticky').hide();
        });
    });
    
    //HIDE THE SIDE WHEN ON THE MAIN MENU
    //kn-scene_1253
    
    $(document).on('knack-scene-render.scene_1253', function(event, scene) {
        //$('#kn-mobile-menu').addClass('hideMe');
        //document.getElementById('knack-body').style.margin-left = '-50px';
    
    });
    
    //view_3520 Survey Form ONGOING
    $(document).on("knack-view-render.view_3520", function(event, view, data) {
        $('#view_4929').addClass('hideMe')
        var date = new Date();
        var quarter = parseInt(date.getMonth() / 3) + 1;
        var quarterInput = 'Q' + quarter;
        //console.log(data, "quarterInput is ", quarterInput);
        if (quarter == 1) {
            $("#view_3520-field_1101").prop("selectedIndex", 0).change();
        }
        if (quarter == 2) {
            $("#view_3520-field_1101").prop("selectedIndex", 1).change();
        }
        if (quarter == 3) {
            $("#view_3520-field_1101").prop("selectedIndex", 2).change();
        }
        if (quarter == 4) {
            $("#view_3520-field_1101").prop("selectedIndex", 3).change();
        }
    });
    
    //view_4930 Survey Form ONGOING New Object
    $(document).on("knack-view-render.view_4930", function(event, view, data) {
        console.log('test')
        var date = new Date();
        var quarter = parseInt(date.getMonth() / 3) + 1;
        var quarterInput = 'Q' + quarter;
        $('#kn-input-field_2388').addClass('hideMe')
        //console.log(data, "quarterInput is ", quarterInput);
        if (quarter == 1) {
           $("#view_4930-field_2388").prop("selectedIndex", 1).change();
        }
        if (quarter == 2) {
            $("#view_4930-field_2388").prop("selectedIndex", 2).change();
        }
        if (quarter == 3) {
            $("#view_4930-field_2388").prop("selectedIndex", 3).change();
        }
        if (quarter == 4) {
            $("#view_4930-field_2388").prop("selectedIndex", 4).change();
        }
    });
    
    
    //view_3473 Survey Form
    $(document).on("knack-view-render.view_3473", function(event, view, data) {
        //console.log(data);
        // var blankValue = `<i class="fa fa-plus-circle"></i>`;
        // if (data.field_1552 == blankValue || data.field_1552 == "") {
        //     // $('#view_3410').removeClass('hideMe');
        //     $('#view_3473').addClass('hideMe');
        // } else {
        //     // $('#view_3410').addClass('hideMe');
        //     $('#view_3473').removeClass('hideMe');
        // }
        // $('#edit-rating-id').on('click', function() {
        //     $('#view_3473').addClass('hideMe');
        //     // $('#view_3410').removeClass('hideMe');
        // });
        // //close_rating_form
        // $('#close_rating_form').on('click', function() {
        //     $('#view_3473').removeClass('hideMe');
        //     $('#view_3410').addClass('hideMe');
        // });
    });
    //This will hide the side nav bar on the other pages.
    $(document).on('knack-scene-render.any', function(event, scene) {
        showHideMenuText();
        //List of the Page where the view exist to hide the side bar;
        var viewsToHide = document.getElementById('view_3370');
        if (viewsToHide) {
            $('#kn-mobile-menu').addClass('hideMe')
            //kn-app-header
            $('#kn-app-header').addClass('hideMe')
        } else {
            $('#kn-mobile-menu').removeClass('hideMe')
            $('#kn-app-header').removeClass('hideMe')
    
        }
    });
    //Documents Btn Function helper
    function documentFunctions(data){
          //docs_no_data
          !data.field_1533 & !data.field_2904 & !data.field_1534 & !data.field_1535 ? $('#docs_no_data').show() : $('#docs_no_data').hide(); 
        if (!data.field_1533) {
            $('#doc_resident_flyer_btn').addClass('hideMe'); //Resident Flyer
        }
        if (!data.field_2904) {
            $('#doc_com_flyer_btn').addClass('hideMe'); //Community Flyer
            $('#doc_com_flyer_btn').addClass('sv-no-data');
            $('#doc_com_flyer_btn_download').addClass('hideMe')
        }
          data.field_1534 ? $('#doc_cert_of_ins_btn').show() : $('#doc_cert_of_ins_btn').hide();
        //if(!data.field_1534){
        // $('#doc_cert_of_ins_btn').addClass('hideMe');//Certificate of Ins can be edit by the CM
        //}
        if (!data.field_1535) {
            $('#doc_holiday_flyer_btn').hide(); //Holiday Flyer
        }
    
        $('#doc_resident_flyer_btn').on('click', function() { //Resident Flyer
            $('.field_1533 a').click();
        });
        $('#doc_com_flyer_btn').on('click', function() { //Community Flyer
            $('#cmFlyer').click();
        });
        $('#doc_com_flyer_btn_download').on('click', function() { //Community Flyer
            // $('#cmFlyer').click();
            // window.location.href = $('#cmFlyer').attr('href')
            document.getElementById('cmFlyer').click()
        });
        $('#doc_cert_of_ins_btn').on('click', function() { //Certificate of Ins
            //$('#view_com_cert_of_ins').click();
            $('.field_1534 a').click();
        });
        $('#doc_holiday_flyer_btn').on('click', function() { //Holiday Flyer
            $('.field_1535 a').click();
        });
    }
    
    //view_3378 Community Documents BTN
    $(document).on("knack-view-render.view_3378", function(event, view, data) {
        //console.log(data , "document");
        $('#view_3378').hide();
          documentFunctions(data);
    
    });
    
    //view_3713 Community Profile Documents BTN
    $(document).on("knack-view-render.view_3713", function(event, view, data) {
        console.log(data , "documnet");
        $('#view_3713').addClass('hideMe');
          documentFunctions(data);
          var cmFlyerCloudField = data.field_2904_raw;
          // var customFlyerCloud = `<a id="cmFlyer" class="kn-img-gallery" href="#" style="display: none;">
          //       <div class="nailthumb-container" style="width: 100px; height: 100px; visibility: visible; overflow: hidden; padding: 0px;">
          //           <span class="">
          //               <img data-kn-img-gallery="${cmFlyerCloudField}"
          //               style="position: relative; width: 100px; height: 100px; top: 0px; left: 0px; display: inline;" 
          //               class="nailthumb-image" src="${cmFlyerCloudField}">
          //           </span>
          //       </div>
          //   </a>`
          // var customFlyerCloud =  `<a id="cmFlyer" href="${cmFlyerCloudField}" target="_blank">Download</a>`
        // $('#view_3713').append(customFlyerCloud)
        $('#cmFlyer').attr('href', cmFlyerCloudField )
    });
    
    $(document).on("knack-view-render.view_5243", function(event, view, data) {
        console.log(data , "documnet");
        // $('#view_3713').addClass('hideMe');
        $('#kn-scene_1908').removeClass('kn-scene').removeClass('kn-container').css('text-align', 'center')
        $('#view_5243 .field_2556').hide()
          documentFunctions(data);
          var cmFlyerCloudField = data.field_2556_raw;
          // var customFlyerCloud = `<a id="cmFlyer" class="kn-img-gallery" href="#" style="display: none;">
          //       <div class="nailthumb-container" style="width: 100px; height: 100px; visibility: visible; overflow: hidden; padding: 0px;">
          //           <span class="">
          //               <img data-kn-img-gallery="${cmFlyerCloudField}"
          //               style="position: relative; width: 100px; height: 100px; top: 0px; left: 0px; display: inline;" 
          //               class="nailthumb-image" src="${cmFlyerCloudField}">
          //           </span>
          //       </div>
          //   </a>`
          var customFlyerCloud =  `<a class="kn-button is-primary" id="cmFlyer" href="${cmFlyerCloudField}" target="_blank">Download Community Flyer</a>`
          var iframe = `<iframe src="${cmFlyerCloudField}" width="100%" height="600" style="border:none;"></iframe>`
        $('#view_5243').append(customFlyerCloud)
        // $('#view_5243').append(iframe)
    });
    
    $(document).on("knack-view-render.view_2536", function(event, view, data) {
        console.log(data , "documnet");
        // $('#view_3713').addClass('hideMe');
        // $('#kn-scene_1908').removeClass('kn-scene').removeClass('kn-container').css('text-align', 'center')
        $('#view_2536 .field_2557 img').hide()
        $('#view_2536 .field_2558 img').hide()
        $('#view_2536 .field_2559 img').hide()
          documentFunctions(data);
          var cmFlyerCloudField = data.field_2557_raw;
          var cmFlyerCloudField2 = data.field_2558_raw;
          var cmFlyerCloudField3 = data.field_2559_raw;
    
          var customFlyerCloud =  `<a class="kn-button is-primary" id="cmFlyer" href="${cmFlyerCloudField}" target="_blank">Download Contract Document</a>`
          var customFlyerCloud2 =  `<a class="kn-button is-primary" id="cmFlyer2" href="${cmFlyerCloudField2}" target="_blank">Download Contract Addendum</a>`
          var customFlyerCloud3 =  `<a class="kn-button is-primary" id="cmFlyer3" href="${cmFlyerCloudField3}" target="_blank">Download Master Agreement</a>`
    
        $('#view_2536 .field_2557 .kn-detail-body').append(customFlyerCloud)
        $('#view_2536 .field_2558 .kn-detail-body').append(customFlyerCloud2)
        $('#view_2536 .field_2559 .kn-detail-body').append(customFlyerCloud3)
        // $('#view_5243').append(iframe)
    });
    
    $(document).on("knack-view-render.view_1825", function(event, view, data) {
        console.log(data , "documnet");
        // $('#view_3713').addClass('hideMe');
        // $('#kn-scene_1908').removeClass('kn-scene').removeClass('kn-container').css('text-align', 'center')
        $('#view_1825 .field_2552 img').hide()
        $('#view_1825 .field_2495 img').hide()
        $('#view_1825 .field_2904 img').hide()
        $('#view_1825 .field_2553 img').hide()
        $('#view_1825 .field_2495 kn-detail-body span').hide()
    
        
    
    
          documentFunctions(data);
          var cmFlyerCloudField = data.field_2552_raw;
          var cmFlyerCloudField2 = data.field_2904_raw;
          var cmFlyerCloudField3 = data.field_2553_raw;
    
    
        if (cmFlyerCloudField != ""){
          var fileNameDotIdx = cmFlyerCloudField.lastIndexOf(".");
          var fileName = cmFlyerCloudField.substr(0, fileNameDotIdx);
    
    
          updatedImageUrl = fileName + ".jpg";
    
    
          var cloudImage = `<span><a class="kn-img-gallery" href="#"><span class=""><img data-kn-img-gallery="${updatedImageUrl}" class="nailthumb-image" src="${updatedImageUrl}"></span></a></span>`
          var customFlyerCloud =  `<a class="kn-button is-primary" id="cmFlyer" href="${cmFlyerCloudField}" target="_blank">Download Map</a>`
          
          $('#view_1825 .field_2552 .kn-detail-body').append(customFlyerCloud)
          $('#view_1825 .field_2495 .kn-detail-body').append(cloudImage)
        }
    
        if (cmFlyerCloudField2 != ""){
            var customFlyerCloud2 =  `<a class="kn-button is-primary" href="${cmFlyerCloudField2}" target="_blank">Download PDF Flyer</a>`
            $('#view_1825 .field_2904 .kn-detail-body').append(customFlyerCloud2)
        }
    
        if (cmFlyerCloudField3 != ""){
            var customFlyerCloud3 =  `<a class="kn-button is-primary" href="${cmFlyerCloudField3}" target="_blank">Download Letter</a>`
            $('#view_1825 .field_2553 .kn-detail-body').append(customFlyerCloud3)
        }
          
    
        // $('#view_5243').append(iframe)
    });
    
    
    
    //view_3582 Certificate of Ins POP UP - This will hide or show the form
    $(document).on("knack-view-render.view_3582", function(event, view, data) {
        $('#view_3583 .kn-asset-close').addClass('hideMe')
        if (data.field_1534) {
            //show details with edit
            //hide form
            //cert_of_ins_pdf_prev
            document.getElementById('cert_of_ins_pdf_prev').style.display = 'none';
            $('#cert_of_ins_pdf_prev').attr("src", data.field_1534_raw.url);
            //this waits for 2 seconds before showing the pdf iframe
            var timeout = setTimeout(function() {
                document.getElementById('cert_of_ins_pdf_prev').style.display = 'block';
                clearTimeout(timeout);
            }, 2000);
            //field_1534
            //hides the ins field
            $('.field_1534').addClass('hideMe');
            //adds href to the btn
            $('#view_coi').attr("href", data.field_1534_raw.url);
            $('#view_3580').addClass('hideMe'); //form
    
    
    
    
        } else {
            //show form
            //hide details
        }
    
        //btn - click to show the form
        //edit
        $('#edit_coi').on('click', function() {
            $('#view_3580').removeClass('hideMe'); //form
            $('#edit_coi').addClass('hideMe'); //form
        });
    
        $('#view_3580 .is-primary').on("click", function() {
    
            $("#view_3583").addClass("hideMe");
    
        });
    
    });
    
    //this will change the text display of the Reqeust RADAR column INFRACTION PAGE
    $(document).on("knack-view-render.view_3557", function(event, view, data) {
        console.log(data)
      
      //$("[myAttribute='my value']")
         $('#view_3557 .col-6').each(function(i) {
             $($('#view_3557 .col-6 a')[i]).text('Request RADAR');
        });
    
    });
    
    //view_3456 Service History
    $(document).on("knack-view-render.view_3456", function(event, view, data) {
        //console.log(data);
          //$('#view_3456 .col-7').each(function(i) {
             //$($('#view_3557 .col-7 a')[i]).text('Request RADAR');
              //console.log($($('#view_3557 .col-7 a')[i]));
        //});
          for (let i = 0; i < data.length; i++) {
            var tableX = document.getElementById('view_3456').getElementsByTagName('table')[0];
            var x = tableX.rows[i + 1].cells;
            var link = location.href + '/community-request-radar/' + data[i].field_146_raw[0].id;
            console.log(x[7].innerHTML)
            try {
                x[7].innerHTML = `<a href=${link}><span>Request RADAR</span></a>`;
            } catch (err) {
                console.log(err)
            }
        }
    });
    
    
    //view_3549 Survey Rating on the Service History table
    //This will change the value of the Rating Value field based on the radio input selected
    $(document).on("knack-view-render.view_3549", function(event, view, data) {
        //this will hide the input and the submit btn
        //$("input").addClass("hideMe");
        $("#kn-input-field_1495").addClass("hideMe");
    
        //hardcoded value of the thumbsup field
        var thumbsUpVal = '<img src="https://s3.amazonaws.com/assets.knackhq.com/assets/5bbcb6a739b582305a70b738/60afcd97af88d2001eebb81f/original/up.png" alt="Thumbs Up" width="50" height="50" />';
    
    
        //when click, submit the form & set the value of the Rating Value field
        $(".radio").on('click', function() {
    
            if ($('.radio:checked').val() != null) {
                const selections = document.querySelectorAll('input[type="radio"]');
                let userSelection;
                for (const selection of selections) {
                    if (selection.checked) {
                        userSelection = selection.value;
                        break;
                    }
                }
                if (userSelection == thumbsUpVal) {
                    console.log("Thumbs Up");
                    $("#view_3549-field_1495").prop("selectedIndex", 1).change();
                } else {
                    console.log("Thumbs D");
                    $("#view_3549-field_1495").prop("selectedIndex", 2).change();
    
    
                }
                $('button').on("click", function() {
                    $('.close-modal').click();
                });
    
                //$('form').submit();
                //$('.close-modal').click();
            }
        });
    });
    
    
    //Community Profile - Schedule Indicator -view_3566 
    $(document).on("knack-view-render.view_3744", function(event, view, data) {
          $('#view_3744').hide();
        //console.log(data);
        if (data.field_132 == "Yes") {
            $('#sunday').addClass("on-sched");
        } else {
            $('#sunday').addClass("not-on-sched");
        }
        if (data.field_133 == "Yes") {
            $('#monday').addClass("on-sched");
        } else {
            $('#monday').addClass("not-on-sched");
        }
        if (data.field_134 == "Yes") {
            $('#tuesday').addClass("on-sched");
        } else {
            $('#tuesday').addClass("not-on-sched");
        }
        if (data.field_135 == "Yes") {
            $('#wednesday').addClass("on-sched");
        } else {
            $('#wednesday').addClass("not-on-sched");
        }
        if (data.field_136 == "Yes") {
            $('#thursday').addClass("on-sched");
        } else {
            $('#thursday').addClass("not-on-sched");
        }
        if (data.field_137 == "Yes") {
            $('#friday').addClass("on-sched");
        } else {
            $('#friday').addClass("not-on-sched");
        }
        if (data.field_138 == "Yes") {
            $('#saturday').addClass("on-sched");
        } else {
            $('#saturday').addClass("not-on-sched");
        }
    
    });
    
    //Access Code - Indicator -view_3607 
    $(document).on("knack-view-render.view_3607", function(event, view, data) {
        //console.log(data);
        $('#view_3607').addClass("hideMe");
        if (data.field_1571 == "Yes") {
            $('#sunday').addClass("on-sched");
        } else {
            $('#sunday').addClass("not-on-sched");
        }
        if (data.field_1572 == "Yes") {
            $('#monday').addClass("on-sched");
        } else {
            $('#monday').addClass("not-on-sched");
        }
        if (data.field_1573 == "Yes") {
            $('#tuesday').addClass("on-sched");
        } else {
            $('#tuesday').addClass("not-on-sched");
        }
        if (data.field_1574 == "Yes") {
            $('#wednesday').addClass("on-sched");
        } else {
            $('#wednesday').addClass("not-on-sched");
        }
        if (data.field_1575 == "Yes") {
            $('#thursday').addClass("on-sched");
        } else {
            $('#thursday').addClass("not-on-sched");
        }
        if (data.field_1576 == "Yes") {
            $('#friday').addClass("on-sched");
        } else {
            $('#friday').addClass("not-on-sched");
        }
        if (data.field_1577 == "Yes") {
            $('#saturday').addClass("on-sched");
        } else {
            $('#saturday').addClass("not-on-sched");
        }
        //days_indicator
        var timeout = setTimeout(function() {
            document.getElementById('days_indicator').style.display = 'block';
            clearTimeout(timeout);
        }, 2000);
    });
    
    //view_3598 Edit Access Code
    
    $(document).on("knack-view-render.view_3598", function(event, view, data) {
        //console.log(data);
        $('#view_3598').addClass('hideMe');
        if (data.field_132 == "No") {
            $("input[type='checkbox'][name='field_1571']").attr('disabled', 'disabled');
        }
        if (data.field_133 == "No") {
            $("input[type='checkbox'][name='field_1572']").attr('disabled', 'disabled');
        }
    
        if (data.field_134 == "No") {
            $("input[type='checkbox'][name='field_1573']").attr('disabled', 'disabled');
        }
    
        if (data.field_135 == "No") {
            $("input[type='checkbox'][name='field_1574']").attr('disabled', 'disabled');
        }
    
        if (data.field_136 == "No") {
            $("input[type='checkbox'][name='field_1575']").attr('disabled', 'disabled');
        }
    
        if (data.field_137 == "No") {
            $("input[type='checkbox'][name='field_1576']").attr('disabled', 'disabled');
        }
    
        if (data.field_138 == "No") {
            $("input[type='checkbox'][name='field_1577']").attr('disabled', 'disabled');
        }
    
    });
    
    //view_3603 Add Access Code
    
    $(document).on("knack-view-render.view_3603", function(event, view, data) {
        //console.log(data);
        $('#view_3603').addClass('hideMe');
        if (data.field_132 == "No") {
            $("input[type='checkbox'][name='field_1571']").attr('disabled', 'disabled');
        }
        if (data.field_133 == "No") {
            $("input[type='checkbox'][name='field_1572']").attr('disabled', 'disabled');
        }
    
        if (data.field_134 == "No") {
            $("input[type='checkbox'][name='field_1573']").attr('disabled', 'disabled');
        }
    
        if (data.field_135 == "No") {
            $("input[type='checkbox'][name='field_1574']").attr('disabled', 'disabled');
        }
    
        if (data.field_136 == "No") {
            $("input[type='checkbox'][name='field_1575']").attr('disabled', 'disabled');
        }
    
        if (data.field_137 == "No") {
            $("input[type='checkbox'][name='field_1576']").attr('disabled', 'disabled');
        }
    
        if (data.field_138 == "No") {
            $("input[type='checkbox'][name='field_1577']").attr('disabled', 'disabled');
        }
    
    });
    
    //view_3374 Service Schedule on Dashboard
    $(document).on("knack-view-render.view_3374", function(event, view, data) {
        //console.log(data);
        $('#today-service-schedule').html(data.field_44);
        $('.field_44').addClass('hideMe');
    });
    //view_3407 Updates from TB on Dashboard
    $(document).on("knack-view-render.view_3407", function(event, view, data) {
          //$($('#view_3407 p')[1]).removeClass("tb-updates")
        //console.log(data);
        //$('#updates-from-tb-id').html(data.field_1403);
        //if (data.field_1403) {
            //$('.tb-updates').addClass('sv-read-more-updates');
        //}
          $('#view_updatesTB').hide();
        $('.field_1403').hide();
          if(data.field_1403){
          var updataText = data.field_1403;
          var updateLength = 300;
          var trimmedUpdate = updataText.substring(0, updateLength);
          //var trimmedUpdate = updataText;
          //var stickyNotifFromTB = `<span style="color: #8392ab;"><strong><i class="fa fa-bell-o"></i>Update From The Trash Butler Team:</span><br><p
          //data-toggle="tooltip" data-placement="left" title="${updataText}"
          //class="cm-limit-text" style="color: hsl(211, 71%, 28%); cursor: pointer;">${trimmedUpdate} <a style="color:#67748e; font-size: .875rem;" id="view_more_TBupdate">(Read More)</a></p></strong>`;
          var stickyNotifFromTB = `<div class="updateTB" style="cursor: pointer;">
              <strong>
                  <span style="color: #8392ab;"></span><i class="fa fa-bell-o"></i>Update From The Trash Butler Team:</span><br>
                  <p style="color: hsl(211, 71%, 28%);">${trimmedUpdate} ... <span style="font-style: italic;">(Read More)</span>
                  </p>
              </strong>
          </div>`;
          $('#updates-from-tb-id').html(stickyNotifFromTB);
        }else{$('#updates-from-tb-id').html(stickyNotifFromTB);}
          
          $($('.updateTB')[0]).on("click", function(){
            $('#view_updatesTB').click();
              console.log('Testasdadd')
        });
    });
    //view_3374 Community Information
    $(document).on("knack-view-render.view_3374", function(event, view, data) {
        //console.log(data);
        $('#ComAdd_ID').html(data.field_38);
        $('#ComPhone_ID').html(data.field_39);
        $('.field_38').addClass('hideMe');
        $('.field_39').addClass('hideMe');
      
        //hide extra column that has no data displayed - Kim APL
        $($("#view_3374 section.columns div.is-horizontal")[1]).addClass("hideMe");
    });
    
    //view_3374 Show Infraction Total Loss
    $(document).on("knack-view-render.view_3374", function(event, view, data) {
        //console.log(data);
        $('#today-service-schedule').html(data.field_44);
        $('.field_44').addClass('hideMe');
    });
    
    
    //view_3618 Add Support Ticket - Contact Support Ticket - https://builder.sv.knack.com/apps/trashdash/pages/scene_1357/views/view_3618/form
    //this will hide the other option
    $(document).on("knack-view-render.view_3618", function(event, view, data) {
        $('#kn-input-field_309 .kn-datetime').hide();
        $('#kn-input-field_309 label').hide();
        var selectId = document.getElementById("view_3618-field_306").getElementsByTagName("option");
        // selectId[4].style = "display: none;";
        selectId[2].style = "display: none;";
        selectId[6].style = "display: none;";
        selectId[7].style = "display: none;";
        //selectId[8].style = "display: none;";
        //selectId[9].style = "display: none;";
        selectId[10].style = "display: none;";
        selectId[11].style = "display: none;";
    
        var timeout = setTimeout(function() {
            document.getElementById('view_3618').style.display = 'block';
            clearTimeout(timeout);
        }, 500);
    });
    
    // //view_3621 RADAR LOGS PAGE Search Unit
    // $(document).on("knack-view-render.view_3621", function(event, view, data) {
    //     $('#view_3621 button').addClass('hideMe');
    //     $('#view_3588 form').addClass('hideMe');
    //     //$('#view_3588 .search').addClass("hideMe");
    //   	$('#clear_unit_filter').hide();
    //     document.getElementById('view_3621-field_305').options[0].innerHTML = "";
    // 	let test = document.getElementsByClassName("select")[0];
    //     $('#view_3621-field_305').on("change", function() {
    //       	let searchValue = '';
    //         searchValue = test.options[test.selectedIndex].text;
    //         console.log(typeof(searchValue), searchValue);
    //         $('#view_3588 input').val(searchValue).change();
    //         $('#view_3588 .search').click();
    //         $('#view_3588 input').addClass('hideMe');
    //         $('#view_3588 .search').addClass("hideMe");
    
    //         $('#selected_com').html(searchValue);
    //       	$('#clear_unit_filter').show();
    
    //     });
      
    //   	$('#clear_unit_filter').on("click", function() {
    //       	let searchValue = '';
    //       	document.getElementsByClassName("select").selectedIndex = "0";
    //         $('#view_3588 input').val(searchValue).change();
    //         $('#view_3588 .search').click();
    //         $('#view_3588 input').addClass('hideMe');
    //         $('#view_3588 .search').addClass("hideMe");
    //         $('#selected_com').html(searchValue);
    //       	$('#view_3621_field_305_chzn span').html(searchValue);
    //       	$('#clear_unit_filter').hide();
    //     });
    // });
    
    //view_3588 Radar Logs Table
    $(document).on("knack-view-render.view_3588", function(event, view, data) {
        //$('#view_3588 form').addClass('hideMe');
    });
    
    
    //Add Login/Logout Session Log Records object_89
    var LOGIN_PAGE = false;
    var LOGIN = false;
    // Helper functions
    function getUserDeviceJ(){
        let details = navigator.userAgent;
          
        let regexp = /android|iphone|kindle|ipad/i;
        
        let isMobileDevice = regexp.test(details);
        
        if (isMobileDevice) {
            return 'Mobile'
        } else {
            return 'Desktop'
        }
    }
    $(document).on('knack-scene-render.any', function (event, scene) {
        var device = getUserDeviceJ();
      LOGIN_PAGE = $('.kn-login').length == 1 ? true : false;
      if (LOGIN_PAGE) {
        LOGIN = false;
        $('input[type="submit"]').click(function (e) {
          e.preventDefault();
          LOGIN = true;
          $('form').submit();
        });
      } else {
        if (LOGIN) {
          LOGIN = false;
          getDeviceData("Login");
        }
      }
    });
    // Logout actions
    $(document).on('knack-scene-render.any', function (event, scene) {
         var device = getUserDeviceJ();
      // Check is already authenticated
      
      if (!Knack.session.user) {
        return;
      }
      $('.kn-log-out').on('click', function () {
        getDeviceData("Logout");
      });
    });
    //End Add Session Log
    
    //view_3568 Service History Pop up
    $(document).on('knack-form-submit.view_3568', function(event, view, record) {
      $('.close-modal').click();
     $('#view_3396 form a').click();
    });
    
    //view_3506 Dashboard Infraction Pop Up
    //this will refresh the Open Infractions (Dashboard) Table when submitted
    $(document).on('knack-form-submit.view_3506', function(event, view, record) {
        if($('#view_3376')){$('#view_3376 form a').click();}
          if($('#view_3557')){$('#view_3557 form a').click();}
    });
    //view_3523 Address Service Hazards Pop Up
    //this will refresh the Open Infractions (Dashboard) Table when submitted
    $(document).on('knack-form-submit.view_3523', function(event, view, record) {
          if($('#view_3379')){$('#view_3379 form a').click();}
          if($('#view_3559')){$('#view_3559 form a').click();}
    });
    
    //Notify Resident Infraction
    //view_3569
    //this will refresh the Notify Resident Infraction Table when submitted
    $(document).on('knack-form-submit.view_3569', function(event, view, record) {
           if($('#view_3376')){$('#view_3376 form a').click();}
          if($('#view_3557')){$('#view_3557 form a').click();}
    });
    //view_3597
    //this will refresh the Access Code Table when the edit form is submitted
    $(document).on('knack-form-submit.view_3597', function(event, view, record) {
           if($('#view_3596').length){$('#view_3596 form a').click(); console.log("Edited Access Code");}//view_3719
          if($('#view_3719').length){$('#view_3719 form a').click(); console.log("Edited Access Code");}//Community Profile
          if($('#view_3650').length){$('#view_3650 form a').click(); console.log("Edited Access Code");}//view_3650 Edit Community Profile Page
    });
    
    //view_3740
    //this will refresh the Access Code Table when the DELETE form is submitted
    $(document).on('knack-form-submit.view_3740', function(event, view, record) {
           if($('#view_3596').length){$('#view_3596 form a').click(); console.log("Deleted Access Code");}//view_3596
          if($('#view_3719').length){$('#view_3719 form a').click(); console.log("Deleted Access Code");}//Community Profile
          if($('#view_3650').length){$('#view_3650 form a').click(); console.log("Deleted Access Code");}//view_3650 Edit Community Profile Page
          $($('.close-modal')[0]).click();
    });
    
    //view_3516 Refresh Community Units Table when the form is submitted
    $(document).on('knack-form-submit.view_3516', function(event, view, record) {
           if($('#view_3393').length){$('#view_3393 form a').click();}//Dashboard
          //if($('#view_3719').length){$('#view_3719 form a').click(); console.log("Deleted Access Code");}//Community Profile
          //if($('#view_3650').length){$('#view_3650 form a').click(); console.log("Deleted Access Code");}//view_3650 Edit Community Profile Page
          //$($('.close-modal')[0]).click();
    });
    
    //Notify Resident Infraction this will add the placeholder content of the email
    $(document).on("knack-view-render.view_3569", function(event, view, data) {
          
          //console.log(data, "form data");
          $('#view_3729').hide();
          $('#view_3569 #field_1554').hide();
          $('#kn-input-field_614').hide();
          $('#kn-input-field_615').hide();
          $('#kn-input-field_338').hide();
          var newTextArea = `<textarea class="kn-textarea" id="email_content" name="email_content"></textarea>`;
          $('#kn-input-field_1554').append(newTextArea);
          var image1 = data.field_614 ? `<a href=${data.field_614_raw} target="_blank"><img src=${data.field_614_raw} height="600"></a>` : '';
          var image2 = data.field_615 ? `<a href=${data.field_615_raw} target="_blank"><img src=${data.field_615_raw} height="600"></a>` : '';
          var emailMessage;
          var emailContent = `
    <div id="images_div"><p id="image_section"><span>${image1}</span><span>${image2}</span></p></div>
    <hr>
    <p id="content_id"></p>
    `	
      if($('#view_3729 #images_div #image_section').length == 0){$('#view_3729 #images_div').append(`<p style="font-weight: bold;">Infraction Photos Documented by your Trash Butler</p><p id="image_section"><span>${image1}</span><span>${image2}</span></p>`);}
      $('#view_3569 #field_1554').val($('#view_3729').html()).change();
      //$('#images_div').append(`<p id="image_section"><span>${image1}</span><span>${image2}</span></p>`);
      $('input[name="field_1652"]').on("click", function(){
          if($('#view_3569 input[name="field_1652"]').is(':checked')){
                 $('#view_3729 #images_div').append(`<p id="image_section"><span>${image1}</span><span>${image2}</span></p>`);
             }
          else{
                  $('#view_3729 #image_section').remove()
          }
          $('#view_3569 #field_1554').val($('#view_3729').html()).change();
            console.log($('#view_3569 #field_1554').val())
      });
      $('#email_content').keyup(function(){
        $('#view_3729 #content_id').html($('#email_content').val());
        document.getElementById('content_id').value = document.getElementById('email_content').value;
        //console.log($('#content_id').val());
        $('#view_3569 #field_1554').val($('#view_3729').html()).change();
        console.log($('#view_3569 #field_1554').val());
        $('#view_3569 #field_338').val($('#content_id').val()).change();
    
      });
    });
    
    //put button view into list view data 
    //by KIM
    var buttonIntoListView = [{
        listView: "view_3376",
        buttonView: "view_3377"
    },{
        listView: "view_3762",
        buttonView: "view_3388"
    },{
        listView: "view_3379",
        buttonView: "view_3539"
    },{
        listView: "view_3393",
        buttonView: "view_3749"
    }];
    
    buttonIntoListView.forEach(blv => {
        $(document).on(`knack-view-render.${blv.listView}`, function(event, view, data) {
            $(`#${blv.buttonView}`).detach().prependTo(`#${blv.listView} div.view-header`);
            $(`#${blv.buttonView}`).addClass('sv-CMButtonViewInView');
            $(`#${blv.listView} div.view-header h2`).css('margin-top','0');
        });
    });
    
    //view_3393 Units Table Dashboard
    //Set the column to Request if not On Radar
    $(document).on("knack-view-render.view_3393", function(event, view, data) {
          //$('#view_3393 .col-2').each(function(i) {
         // 	if($($('#view_3393 .col-2 a')[i]).html() == "No"){
         //		$($('#view_3393 .col-2 a')[i]).text('Request');
         //   }
         // 	else{
          //    	$($('#view_3393 .col-2 a')[i]).removeAttr("href");
          //  }
        //});
    });
    
    //Service Hazard Dashboard - New Setup
    $(document).on("knack-view-render.view_3762", function(event, view, data) {
      for (let i = 0; i < $('#view_3762 .fa-eye').length; i++) {
        $($($('#view_3762 .fa-eye')[i]).parents()[4]).hide()
      }
    });
    
    //view_3379 Service Hazard Dashboard - Old
    $(document).on("knack-view-render.view_3379", function(event, view, data) {
      for (let i = 0; i < $('#view_3379 .fa-eye').length; i++) {
        $($($('#view_3379 .fa-eye')[i]).parents()[4]).hide()
      }
    });
    
    
    /********************This is the AREA Command Center Section*************************************************/
    var asHeader = {
          'X-Knack-Application-Id': Knack.application_id,
          "X-Knack-REST-API-Key": window.knackRestApiKey,
          'Authorization': Knack.getUserToken()
    };
    var ASclock;
    //view_4192 Dashboard
    $(document).on("knack-view-render.view_4193", function(event, view, data) {
          $('#view_4193').hide();
          var c = { 'isClockIn' : data.field_1179_raw, 'time': data.field_1966 }
          ASclock = c;
    });
    var showPopUpAs = true;
    var getLateServicesLoaded = false;
    function getLateServices(){
      if(Knack.session.user && !getLateServicesLoaded){
        var myVar = setInterval(refreshInterval, 30000);
        function refreshInterval(){
        //   console.log('getLateServices running')
          return $.ajax({
            type: 'GET',
            headers: asHeader,
            url: 'https://api.sv.knack.com/v1/pages/scene_1437/views/view_4069/records',
            success: function(data) {
              as_lateNotif(data.records)
            }
          });
        }
        getLateServices = true;
      }else{
        $('#as_late_notif')
      }
    }
    
    function getLoggedInState(){
      return $.ajax({
        type: 'GET',
        headers: asHeader,
        url: 'https://api.sv.knack.com/v1/pages/scene_1417/views/view_4193/records/' + Knack.session.user.profile_objects[0].entry_id,
        success: function(data) {
        //   console.log(data, "getLoggedInState")
          loggedInState.clocked_in = data.field_1179_raw
          loggedInState.clockedTime = data.field_1966
          try{
              loggedInState.clockedDate = data.field_1966_raw.date
          }
          catch(err){
          
          }
          addClockDetails();
        }
      });
    }
    
    //view_3801 Login Page AS Command Center
    $(document).on("knack-view-render.view_3801", function(event, view, data) {
      //$('.kn-button').on('click', function(){
          //setTimeout(getLateServices(), 3000);
      //})
    });
    
    //This add TimeClock Details TCE
    function addClockDetails(){
      var t;
      if(loggedInState.clocked_in){ t = `Clocked In At `+loggedInState.clockedTime; $('#as_clock_status').addClass('tce-in'); $('#as_clock_status').removeClass('tce-out') }
      else { t = 'You Are Clocked Out'; $('#as_clock_status').addClass('tce-out'); $('#as_clock_status').removeClass('tce-in')}
      $('#as_clock_status').html(t)
      $('#as_clock_status').removeClass('hideMe')
    }
    
    // This will check if the current logged in user have a butler role
    var userObjectRoles;
    var isButler;
    var currentAppendedTheme;
    //Theme Append//
    //This is the list of all SCENE IDs for the Area Command Center
    //scene_1694, scene_1695 scene_1698, scene_1694 - for New Site Audit Mobile - https://builder.sv.knack.com/apps/trashdash#pages/scene_1698
    var as_scenes = [ 'scene_1935','scene_1921','scene_1799','scene_1792', 'scene_1752','scene_1750','scene_1708','scene_1659','scene_1660','scene_1661','scene_1656','scene_1657','scene_1646','scene_1639','scene_1567','scene_1418', 'scene_1417', 'scene_1426', 'scene_1436', 'scene_1437', 'scene_1518', 'scene_1519', 'scene_1520', 'scene_1525', 'scene_1527', 'scene_1537', 'scene_1528', 'scene_1532', 'scene_1538', 'scene_1533', 'scene_1540', 'scene_1544', 'scene_1534', 'scene_1551', 'scene_1535', 'scene_1529', 'scene_1546', 'scene_1552', 'scene_1530', 'scene_1547', 'scene_1548', 'scene_1549', 'scene_1550', 'scene_1531', 'scene_1438', 'scene_1558', 'scene_1561', 'scene_1565', 'scene_1562', 'scene_1439', 'scene_1440', 'scene_1446', 'scene_1478', 'scene_1479', 'scene_1480', 'scene_1481', 'scene_1483', 'scene_1492', 'scene_1454', 'scene_1505', 'scene_1507', 'scene_1508', 'scene_1509', 'scene_1510', 'scene_1511', 'scene_1512', 'scene_1513', 'scene_1517', 'scene_1490', 'scene_1441', 'scene_1451', 'scene_1452', 'scene_1453', 'scene_1442', 'scene_1455', 'scene_1498', 'scene_1443', 'scene_1460', 'scene_1536', 'scene_1444', 'scene_1475', 'scene_1476', 'scene_1477', 'scene_1445', 'scene_1468', 'scene_1526', 'scene_1448', 'scene_1494', 'scene_1555', 'scene_1556', 'scene_1557', 'scene_1574', 'scene_1576', 'scene_1573', 'scene_1642', 'scene_1757']
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
                if(Knack.session.user){ getLoggedInState();} //Get Logged In State When Logged In
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
                addImagePreview();
                if($('form').length > 0){ 
                $( `<label class="as-custom-label">Date</label>` ).insertBefore( "form .knack-date" );
                $( `<label class="as-custom-label">Time</label>` ).insertBefore( "form .kn-time" );
                }
                if(item != 'scene_1417'){ try{ getLateServices(); }catch(err){ } }
                if(item == 'scene_1518'){ $('#as_late_notif').remove(); }
                //$(".kn-add-filter").css({'margin-right': '10px', 'margin-top': '-35px'});
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
                    if( $('.kn-detail-label').length > 0 ){ //$('.kn-detail-label').removeAttr('style'); 
                                                        clearInterval(labelChck); }
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
                // appendTheme()
                // console.log('AS Scenes')
            }else{
                initializeAreaCommandCenter();
                appendTheme()
                // console.log('Site Audit Scenes')
            }
            // checkCurrentTheme()
        })
      
    })
    function addImagePreview(){
      for (let i = 0; i < $('img').length; i++) {//This will makes the Multiple Image Upload Images Preview Full size image
        if($($('img')[i]).attr('data-kn-img-gallery') === undefined){
          $($('img')[i]).attr('data-kn-img-gallery', $($('img')[i]).attr('src'))
          $($('img')[i]).wrap('<a class="kn-img-gallery" href="#"></a>');
        }
      }
    }
    
    function addCustomMenuSv(){
          var menuList =  [
    /*    {	title: 'Clock In Page',
            icon: "",
            link: "https://apps.sv.knack.com/trashdash#area-command-center/"
        },*/
        {	title: 'Pre-Service Dashboard',
            icon: "",
            link: "https://apps.sv.knack.com/trashdash#area-command-center/dashboards/pre-service-dashboard/"
        },{	title: 'In-Service Dashboard',
            icon: "",
            link: "https://apps.sv.knack.com/trashdash#area-command-center/dashboards/in-service-dashboard"
        },{	title: 'Post-Service Dashboard',
            icon: "",
            link: "https://apps.sv.knack.com/trashdash#area-command-center/dashboards/post-service-dashboard/"
        },{	title: 'View All Workflows',
            icon: "",
            link: "https://apps.sv.knack.com/trashdash#area-command-center/dashboards/view-all-workflow/"
        },{	title: 'Quick Links',
            icon: "",
            link: "https://apps.sv.knack.com/trashdash#area-command-center/dashboards/quick-links/"
        },{	title: 'My Profile',
            icon: "",
            link: "https://apps.sv.knack.com/trashdash#area-command-center/dashboards/my-profile/"
        }
        ,
        {	title: `Switch to Butler View`,
            icon: "fa-exchange",
            link: "https://apps.sv.knack.com/trashdash#butler/"
        }
        ]
        var list = ``;
        for (let i = 0; i < menuList.length; i++) {
          var icon = `<i style="margin-top: 3px;" class="fa ${menuList[i].icon}"></i>`;
        //   var icon = ''
          list = list + `<li><a href=${menuList[i].link} class="sv-cm-navbar"><span class="custom-menu-text">${icon}  ${menuList[i].title}</span></a></li>`;  
        }
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
    
    //view_3924 Display CLOCK IN PAGE DISPLAYED NAME
    $(document).on("knack-view-render.view_3924", function(event, view, data) {
          $('.as_manager_name').html(Knack.session.user.values.field_6.first);
    });
    
    //view_3925
    $(document).on("knack-view-render.view_3925", function(event, view, data) {
          // console.log(data.length);
          $('.as_number_of_service_today').html(data.length);
          $('#view_3925').hide();
    });
    
    //view_3804 Clock in
    var clockRunning = false;
    $(document).on("knack-view-render.view_3804", function(event, view, data) {
          $('.kn-input-date_time').addClass('hideMe');
          if(!clockRunning){
            setInterval(() => {
              if($('#as_time_now').length > 0 ){
                var d = new Date();
                //var n = d.toLocaleTimeString('en-US', { timeZone: 'America/New_York' });//EST
                var n = d.toLocaleTimeString('en-US');
                $('#as_time_now').html(n);
                clockRunning = true;
              }
            }, 1000);
          }
    });
    //view_3956 AS Clock In Record For Today
    $(document).on("knack-view-render.view_3956", function(event, view, data) {
              //$('#view_3956').hide();
              $('.kn-action-link').hide();
                $('#view_3956 .kn-action-link').on("click", function(){
                  //AS_isClockedIn = false;
                // console.log("refreshing view_4193")
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
        // console.log(data, 'view_3856');
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
        console.log("review service id", data);
        $('.field_1025').hide(); $('.field_46').hide(); $('.field_121').hide();
        $('.field_300').hide();
        $('.field_359').hide(); $('.field_170').hide(); //realService Schedule Time
        for (let i = 0; i < data.length; i++) {
          var classService;
          //if time started override have data > hide the original time started field
          data[i].field_793 == '' ? $($('.field_793')[i]).hide() : $($('.field_122')[i]).hide() ;
          data[i].field_1929 == '' ? $($('.field_1929')[i]).hide() : $($('.field_265')[i]).hide() ;
          $('.as-show-edited').on('click', function(){
            // console.log('test 2');
          })
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
                },{
                    'name': 'Service Hazards - new',
                    'acc_view': 'view_4018',
                    'add_menu_view': 'view_4048'
                },{
                    'name': 'Butler Timeclock',
                    'acc_view': 'view_4200',
                    'add_menu_view': 'view_4201'
                },{
                    'name': 'Service Hazards',
                    'acc_view': 'view_4466',
                    'add_menu_view': 'view_4468'
                }
            ]
        },{   //View Service ID
            "view_id": "view_3996", //RICH TEXT - View ID where the accordion will be appended
            "accordions": [ // This are the accordion details
                {
                    'name': 'Compactor Logs',
                    'acc_view': 'view_3997',
                    'add_menu_view': ''
                },{
                    'name': 'RADAR Logs',
                    'acc_view': 'view_3999',
                    'add_menu_view': ''
                },{
                    'name': 'Resident Infractions',
                    'acc_view': 'view_4001',
                    'add_menu_view': ''
                },{
                   'name': 'Support Tickets',
                   'acc_view': 'view_4600',
                   'add_menu_view': ''
                },
                {
                    'name': 'Service Hazards - new',
                    'acc_view': 'view_4003',
                    'add_menu_view': ''
                },{
                    'name': 'Service Hazards',
                    'acc_view': 'view_4473',
                    'add_menu_view': ''
                },{
                    'name': 'Butler Timeclock',
                    'acc_view': 'view_4005',
                    'add_menu_view': ''
                },{
                    'name': 'Service Notes',
                    'acc_view': 'view_4008',
                    'add_menu_view': ''
                }
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
                    'name': 'Service Hazards',
                    'acc_view': 'view_4463',
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
        // {   //Site Audit Details
        //         "view_id": "view_5257", //RICH TEXT - View ID where the accordion will be appended
        //         "accordions": [ // This are the accordion details - AS View 
        //             {
        //                 'name': 'Butler Score Logs',
        //                 'acc_view': 'view_4862',
        //                 'add_menu_view': ''
        //             }
        //         ]
        // }
        // // ,{   //Site Audit Details
        // //         "view_id": "view_5256", //RICH TEXT - View ID where the accordion will be appended
        // //         "accordions": [ // This are the accordion details - AS View 
        // //             {
        // //                 'name': 'Site Audit Notes',
        // //                 'acc_view': 'view_4863',
        // //                 'add_menu_view': ''
        // //             }
        // //         ]
        // // }
    ]
    
    customAccor.forEach((item, index) => {
          var v_id = item.view_id;
        $(document).on("knack-view-render." + v_id, function(event, view, date) {
          
          var accordion = '';
          item.accordions.forEach((a, i) => {
              var accViewID = a.acc_view +`_`+i
              accordion = accordion +`<button class="as-accordion">${a.name}</button>
                                          <div class="as-panel">
                                              <p id="${accViewID+'_menu'}"></p>
                                              <p id="${accViewID+'_list'}"></p>
                                          </div>`;
              //This add the list view to the Accordion
              $(document).on("knack-view-render." + a.acc_view, function(event, view, date) {
                  //if(a[i].add_menu_view != '') { $('#'+a.acc_view + i).append($('#'+a.add_menu_view)) }
                  //This add the ADD MENU to the Accordion
                  if(a.add_menu_view != '') {
                    $(document).on("knack-view-render." + a.add_menu_view, function(event, view, date) {
                        $('#'+accViewID+'_menu').append($('#'+a.add_menu_view)) })
                  }
                  $('#'+accViewID+'_list').append($('#'+a.acc_view)); 
              })
          });
            $('#'+item.view_id).append(accordion);
            // responsiveAcc();
            setTimeout(responsiveAcc, 2000)  
        })                   
    })
    //END CREATE CUSTOM ACCORDION
    
    function responsiveAcc(){
          var acc = document.getElementsByClassName("as-accordion");
        var i;
        for (i = 0; i < acc.length; i++) {
          acc[i].addEventListener("click", function() {
            // console.log(i)
            this.classList.toggle("as-active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
              panel.style.maxHeight = null;
            } else {
              panel.style.maxHeight = panel.scrollHeight + 10 + "px";
            }
          });
        }           
    }
    
    
    
    
    //NEW BUTLER SETUP - ASSIGN TO Service ID
    $(document).on('knack-form-submit.view_3833', function(event, view, data) {
          Knack.showSpinner('Loading... Please, wait');
        // console.log(data);
          //$('#view_3858-field_1803').val('').trigger("liszt:updated");
          for (let i = 0; i < data.field_1715_raw.length; i++) {
        //   console.log(data.field_1715_raw[i].id)
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
              // console.log(data, "this is from the getServiceId return data");
              addButlerToService(service_id, data.field_55_raw, butler_id);
        }
      });
    }
    function addButlerToService(service_id, butlers, butler_id) {
      Knack.showSpinner('Assigning Butler to the Service');
    //   console.log(butlers, "butlers");
    //   console.log(service_id, "service_id");
    //   console.log("addButlerToCommunity");
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
              //console.log(data, "this is from the addButlerToService return data");
              Knack.hideSpinner();
              $('.close-modal').click();//added by Josh
        }
      });
     
    }
    function butlerDeets(data){
      if(data.length > 0){
        for(var i = 0; i < data.length; i++){
          if(data[i].field_37.length > 0) { //$($('.as_assigned_community')[i]).html('Currently Assigned to '+data[i].field_37_raw +' - '+data[i].field_475_raw) 
          }
          else { $($('.as_assigned_community')[i]).html('Not Assigned To Any Community!') }
        }
      }
    }
    //view_3831 New Butler Setup Butler's List
    $(document).on("knack-view-render.view_3831", function(event, view, data) {
        //console.log(data)
       butlerDeets(data);
    });
    // https://builder.sv.knack.com/apps/trashdash#pages/scene_1441
    $(document).on("knack-view-render.view_4735", function(event, view, data) {
        //console.log(data)
       butlerDeets(data);
    });
    
    //view_3968 New Butler Setup Butler's Details Community
    $(document).on("knack-view-render.view_3968", function(event, view, data) {
        // console.log(data)
           $('#view_3968 section').attr('id', data.id)
    });
    //community_number view_3836
    //view_3836 Assign Community - New Butler Setup Community List https://builder.sv.knack.com/apps/trashdash/pages/scene_1451/views/view_3836/list
    $(document).on("knack-view-render.view_3836", function(event, view, data) {
      //console.log(data);
      var addedCommunitiesV = [];
      $('#view_3836 .kn-list-content').hide();
      var myVar = setInterval(test, 100);
      function test(){
          if( typeof( $('#view_3968 section').attr('id') ) != 'string' ){  }
          else{
               //console.log(typeof( $('#view_3968 section').attr('id') ), $('#view_3968 section').attr('id'))
            for(var i = 0; i < data.length; i++){
              var haveService;
              var isCheck = '';
              var butlerId = $('#view_3968 section').attr('id');
              var butlersL = data[i].field_41_raw;
              for (let j = 0; j < butlersL.length; j++) {
                //console.log(butlersL[j].id, butlerId, butlersL[j].id == butlerId, "butlersL == butlerId")
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
            //console.log("addedCommunitiesV")
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
                //console.log(addedCommunitiesV, 'addedCommunitiesV')
            })
            clearInterval(myVar);
          }
      }
    });
    //view_3833 Assign Service ID - New Butler Setup Form
    $(document).on("knack-view-render.view_3833", function(event, view, data) {
          //$('#view_3833 form ul').addClass('hideMe');
          //$('.chzn-drop').addClass('hideMe')
          //$('#view_3833-field_1715').val('').trigger("liszt:updated");
    });
    //view_3973 New Butler Setup Butler's Details Service ID
    $(document).on("knack-view-render.view_3973", function(event, view, data) {
        //console.log(data)
           $('#view_3973 section').attr('id', data.id)
    });
    //view_3855 Assign Service ID - New Butler Setup Service ID List
    $(document).on("knack-view-render.view_3855", function(event, view, data) {
          //console.log(data)
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
                            //console.log(butlersL[j].id, butlerId, butlersL[j].id == butlerId, "butlersL == butlerId")
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
                    // console.log(serviceID)
                    if (addedServiceID.includes(serviceID) === false) { addedServiceID.push(serviceID); }
                    else{ 
                        for( var i = 0; i < addedServiceID.length; i++){ 
                                if ( addedServiceID[i] === serviceID) { 
                                    addedServiceID.splice(i, 1); 
                                }
                            }
                        }
                        $('#view_3833-field_1715').val(addedServiceID).trigger("liszt:updated");
                        // console.log(addedServiceID)
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
            if($('#view_3833-field_1715').length == 0){console.log("select id is loading")}
              else{
                  $('#view_3833-field_1715').val(addedServiceID).trigger("liszt:updated");
                  console.log('addedServiceID', addedServiceID)
                clearInterval(changeSelect);
            }
        }
    });
    
    //view_3898 Training Logs List
    $(document).on("knack-view-render.view_3916", function(event, view, data) {
          // console.log("Training Logs List", data);
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
    //view_3974 Training Logs List Accounts connected to this Area
    $(document).on("knack-view-render.view_3974", function(event, view, data) {
          // console.log("Training Logs List", data);
          $('.field_1794').hide();
          for (let i = 0; i < data.length; i++) {
            if(data[i].field_1794 == ""){
                $($('#view_3974 .as_training_stat')[i]).html("Pending Review").addClass("sv-not-reviewed").addClass("sv-stats");
                  
            }
              else if(data[i].field_1794 == "Flagged"){ 
              $($('#view_3974 .as_training_stat')[i]).html("Flagged").addClass("sv-fail").addClass("sv-stats");
              
            }
              else{ 
              $($('#view_3974 .as_training_stat')[i]).html("Passed").addClass("sv-pass").addClass("sv-stats"); 
            }
        }
    });
    //Training Grade Modal
    $(document).on("knack-view-render.view_3922", function(event, view, data) {
    //   console.log(data)
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
    //Edit Service ID view_3993
    $(document).on("knack-view-render.view_3993", function(event, view, data) {
          $('#view_3993 .kn-list-item-container section .kn-detail-body').addClass('as-accordion');
          var addedButler = [];
          $('#view_3993 .kn-list-item-container section .kn-detail-body').on("click", function(){
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
    
    //view_3957
    $(document).on("knack-view-render.view_3957", function(event, view, data) {
        //console.log(data);
    });
    
    //view_3861 Support Tickets 
    $(document).on("knack-view-render.view_3861", function(event, view, data) {
        // console.log(data);
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
          //if(data[i].field_306 != 'Resident Complaint / Request RADAR' && data[i].field_306 != 'Customer Complaint / Request Radar' || data[i].field_1654_raw === false){
          if(data[i].field_306 != 'Resident Complaint / Request RADAR' && data[i].field_306 != 'Customer Complaint / Request Radar'){ 
            $($($('.as-active-radar')[i]).parents()[6]).hide()
          } //hide Activate RADAR if not Request RADAR AND not a complaint
        }
    });
    
    ////////////////////////IN Service
    //Menu
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
    //view_4069 Late Service Count Table
    $(document).on('knack-view-render.view_4069', function(event, view, data) {
      //var lateNumbers = data.length;
      //as_lateNotif(data)
    });
    
    function as_lateNotif(data){
      var lateNumbers = computeLate(data);
      //console.log(data, "view_4069", lateNumbers)
      var myVar = setInterval(myTimer, 30000);
      function myTimer() {
        if($('#view_4051').length > 0){
          $($('.as-late-service-count')[0]).html(lateNumbers);
          clearInterval(myVar);
        }else{
        }
      }
      if(lateNumbers > 0){ showLateNotif(); sendSMSlateNotif(data) } else { $($('.as-late-service-count')[0]).attr('style', 'background-color: #7ac144')}
      function showLateNotif(){
        var lateNotifText = `<div id="as_late_notif"><p><span class="as-late-service-notif">`+lateNumbers+`</span> Service(s) Are Currently Late </p>
        <p><a href="https://apps.sv.knack.com/trashdash#area-command-center/dashboards/in-service-dashboard/late-services/">Click Here to Review</a></p>`
        //$($('.as-late-service-notif')[0]).html(lateNumbers);
        var viewsToShow = $('#view_4069').length > 0;
    
        if($('#as_late_notif').length){
          $($('.as-late-service-notif')[0]).html(lateNumbers)
        }else{
          $('body').append(lateNotifText);
        } 
      }
      if(lateNumbers > currentLateCount){ $('#as_late_notif').show() }
      currentLateCount = lateNumbers;
      //<span id="close_late_notif"><i class="fa fa-close"></i></span>
      $('#close_late_notif').on('click', function(){
        $('#as_late_notif').hide()
      });
      $('#as_late_notif a').on('click', function(){
        //$('#as_late_notif').hide();
      })
    }
    
    function sendSMSlateNotif(data){
        // console.log(data, 'sendSMSlateNotif')
        // for (let i = 0; i < data.length; ++i) {
        //     if(data[i].field_2777 == 'No'){
        //         KnackViewApi.UpdateObject('scene_1879', 'view_5155', data[i].id).then((res) => {
        //             console.log('sendSMSlateNotif View Bsed API test', res)
        //         });
        //     }
        // }
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
          //console.log('getMyButlers', data);
          myButlerList = data.records;
          //console.log(myButlerList, "myButlerList")
        }
      });
    }
    
    //view_4052 ORIGINAL LATE SERVICES
    $(document).on("knack-view-render.view_4052", function(event, view, data) {
        //getMyButlers();
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
                //console.log(butlerList, "butlerList")
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
          //console.log("view is loaded")
        var intervalLoadView = setInterval(waitList, 1000);
          function waitList() {
          if($('#view_4052').length > 0){
              refreshLateList();
            clearInterval(intervalLoadView);
          }else{console.log("loading list")}
        }
          function refreshLateList(){
          if(refreshLateListServices_MainPage === false){
            refreshLateListServices_MainPage = true;
            //This is the interval where the LATE Services Main Page is refresh
            var listInterval = setInterval(refreshList, 900000);
              function refreshList(){
                  //console.log("refreshing table")
                Knack.views.view_4052.model.fetch();
            }
          }
        }
    });
    
    //view_4077 Community AUdit Add Photo Form
    $(document).on("knack-view-render.view_4077", function(event, view, data) {
          //$($('.kn-button')[1]).html('Submit Final Audit');
    });
    
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
        },{   //Edit Service Hazard
            form_id: 'view_4038',
            refresh: 'view_4018',
            closeModal: true
        },{   //Add Compactor Logs
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
        },{   //Service Hazard Photos
          form_id: 'view_4094',
          refresh: 'view_4081',
          closeModal: true
        },{   //Edit Butler Profile
          form_id: 'view_4038',
          refresh: 'view_4081',
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
        },{   //Add Service Hazard
          form_id: 'view_4163',
          refresh: 'view_4081',
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
        },{//Add Butler Timeclock
          form_id: 'view_4150',
          refresh: 'view_4118',
          closeModal: true
        },{//Add Service Today
          form_id: 'view_4129',
          refresh: 'view_4122',
          closeModal: true
        },{//Add Service Today
          form_id: 'view_4050',
          refresh: 'view_4018',
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
        },{//Service Hazard - OLD Photo AS
          form_id: 'view_4462',
          refresh: 'view_4829',
          closeModal: true
        },{//Service Hazard - OLD Details AS
          form_id: 'view_4472',
          refresh: 'view_4829',
          closeModal: true
        },{//Service Hazard - OLD Details AS
          form_id: 'view_4467',
          refresh: 'view_4466',
          closeModal: true
        },{//Service Hazard - OLD Report New https://builder.sv.knack.com/apps/trashdash#pages/scene_1640/views/view_4475
          form_id: 'view_4475',
          refresh: 'view_4829',
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
        // {//Popup
        //   form_id: 'view_3568',
        //   refresh: 'view_3473'
        // }
        // {//Community Audit
        //   form_id: 'view_5002',
        //   refresh: 'view_4798'
        // },
        // {//Community Audit
        //   form_id: 'view_5004',
        //   refresh: 'view_4806'
        // },
        // {//Community Audit
        //   form_id: 'view_5005',
        //   refresh: 'view_4802'
        // }
        // Community Audit
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
            console.log($('#'+modalList[i].refresh).length, "refreshing", modalList[i].form_id)
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
    
    function getServiceLogsAS(serviceFilter, j) {
      return $.ajax({
        type: 'GET',
        headers: asHeader,
        url: 'https://api.sv.knack.com/v1/objects/object_16/records?filters=' + encodeURIComponent(JSON.stringify(serviceFilter)),
        success: function(data) {
                  
                  var types = data.records;
                  if(types.length > 0){
                  //console.log(types, "types")
                  for (let i = 0; i < types.length; i++) {
                    //console.log(i, "iii", types)
                    var details = `<p>Uploaded By: <span class="">`+types[i].field_102+`</span>
                                        <a class="kn-img-gallery" href="#" style="display: inline-block">
                                        <div class="nailthumb-container">
                                            <span class="">
                                                <img data-kn-img-gallery=`+types[i].field_607_raw+` src=`+types[i].field_607_raw+`;>
                                            </span>
                                        </div>
                                           </a></p>
                                   `
                    //var butler = `<p>Uploaded By: <span class="">`+types[i].field_102_raw[0].identifier+`</span></p>`;
                   
                    if(types[i].field_98 == 'Compactor Before (Resident Access)'){
                          //$($('#view_4079 .as-compactor-before-resident .as-warning')[j]).hide();
                        //$($('#view_4079 .as-compactor-before-resident')[j]).append(details)
                          $($('.as-compactor-before-resident .as-warning')[j]).hide();
                        $($('.as-compactor-before-resident')[j]).append(details)
                    }
                      else if(types[i].field_98 == 'Compactor Before (Maintenance Access)'){
                          //$($('#view_4079 .as-compactor-before-maintenance .as-warning')[j]).hide();
                        //$($('#view_4079 .as-compactor-before-maintenance')[j]).append(details)
                          $($('.as-compactor-before-maintenance .as-warning')[j]).hide();
                        $($('.as-compactor-before-maintenance')[j]).append(details)
                    }
                    else if(types[i].field_98 == 'Compactor After (Resident Access)'){
                          //$($('#view_4079 .as-compactor-after-resident .as-warning')[j]).hide();
                        //$($('#view_4079 .as-compactor-after-resident')[j]).append(details)
                          //$($('.as-compactor-after-resident')[j]).parent().show();
                          //$($('.as-compactor-after-resident .as-warning')[j]).hide();
                        //$($('.as-compactor-after-resident')[j]).append(details)
                    }
                    else if(types[i].field_98 == 'Compactor After (Maintenance Access)'){
                          //$($('#view_4079 .as-compactor-after-maintenance .as-warning')[j]).hide();
                        //$($('#view_4079 .as-compactor-after-maintenance')[j]).append(details)
                          //$($('.as-compactor-after-maintenance .as-warning')[j]).parent().show();
                          //$($('.as-compactor-after-maintenance .as-warning')[j]).hide();
                        //$($('.as-compactor-after-maintenance')[j]).append(details)
                    }
                    else if(types[i].field_98 == 'Compactor After'){//////////////////////////////////
                          //$($('#view_4079 .as-compactor-after .as-warning')[j]).hide();
                        //$($('#view_4079 .as-compactor-after')[j]).append(details)
                          //$($('.as-compactor-after .as-warning')[j]).parent().show();
                          //$($('.as-compactor-after .as-warning')[j]).hide();
                        //$($('.as-compactor-after')[j]).append(details)
                    }
                    else if(types[i].field_98 == 'Compactor Before'){
                          //$($('#view_4079 .as-compactor-before .as-warning')[j]).hide();
                        //$($('#view_4079 .as-compactor-before')[j]).append(details)
                          $($('.as-compactor-before .as-warning')[j]).hide();
                        $($('.as-compactor-before')[j]).append(details)
                    }
                    else if(types[i].field_98 == 'Compactor After (Inside Area)'){
                          //$($('#view_4079 .as-compactor-after-inside .as-warning')[j]).hide();
                        //$($('#view_4079 .as-compactor-after-inside')[j]).append(details);
                          //$($('.as-compactor-after-inside')[j]).parent().show();
                          //$($('.as-compactor-after-inside .as-warning')[j]).hide();
                        //$($('.as-compactor-after-inside')[j]).append(details)
                    }
                    else if(types[i].field_98 == 'Compactor Before (Inside Area)'){
                          //$($('#view_4079 .as-compactor-before-inside .as-warning')[j]).hide();
                        //$($('#view_4079 .as-compactor-before-inside')[j]).append(details);
                          $($('.as-compactor-after-inside .as-warning')[j]).hide();
                        $($('.as-compactor-after-inside')[j]).append(details)
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
        { 'v_id': 'view_4829' }, //Service Hazards
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
            console.log(customRecordNumberArray[i].v_id, "customRecordNumberArray[i].v_id")
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
        console.log(data);
          //$('.field_1019').hide();
          for (let i = 0; i < data.length; i++) {
          var serviceFilter = [{"field":"field_97", "operator":"is", "value":data[i].id}]
          getServiceLogsAS(serviceFilter, i);
        }
        var numberText = `<div class="kn-entries-summary" style="margin-right: .5em;">
              <span class="light">Showing ${data.length} Compactor Log(s)</span>
            </div>`;
        if( $('.kn-entries-summary').length === 0 ){ $($('#view_4079 .kn-records-nav .level')[1]).append(numberText) }
          
    });
    
    //view_4732
    // $(document).on("knack-view-render.view_4732", function(event, view, data) {
    //     var text = addShowNumberText(data.length)
    //     if( $('#view_4732 .kn-entries-summary').length === 0 ){ $($('#view_4732 .kn-records-nav')[0]).append( text ) }
          
    // });
    
    //Contact Butler In Service 
    $(document).on("knack-view-render.view_4093", function(event, view, data) {
          //console.log(data, data[0].field_277_raw);
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
    
    //view_4136 Create the Accordion - Community Contacts
    function createAsAccordionC(view_id, j){
      console.log('j', j)
      var accordion = '';
      for (let i = 0; i < j.length; i++) {
         accordion = accordion + `<button class="as-accordion">`+j[i].title+`</button>
          <div class="as-panel">
          <p id=`+j[i].id+`></p>
          </div>`;
          
      }
      console.log(accordion);
      $(view_id).append($(accordion));
      responsiveAcc();                                    
    }                                   
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
    });
    
    //view_4135
    $(document).on("knack-view-render.view_4130", function(event, view, data) {
      $('#view_4135 .field_276').hide();
    });
    
    //view_4135
    $(document).on("knack-view-render.view_4135", function(event, view, data) {
      //console.log(data, 'Assigned Butlers');
      $('.field_16').hide(); $('.field_276').hide(); $('.field_16').hide(); $('.field_277').hide();
      for (let i = 0; i < data.length; ++i) {
        var butlerName = `<p><span class="sv-as-name">`+data[i].field_16_raw.first+` `+data[i].field_16_raw.last+`</span></p>`
        contactDisplay(data.length, '.as-butler-details', getVal("field_276_raw","full", data[i]), getVal("field_276_raw","formatted", data[i]), butlerName, i, 
                       getVal("field_277_raw","full", data[i]), getVal("field_277_raw","formatted", data[i]))
      }
          
    });
    
    //view_4130
    $(document).on("knack-view-render.view_4130", function(event, view, data) {
          contactDisplay(1, '.as-maintenance-contact', data.field_386_raw.full, data.field_386_raw.formatted, data.field_385, 0, data.field_388_raw.full, data.field_388_raw.formatted)
    });
    
    //view_4137 Community Managers
    $(document).on("knack-view-render.view_4137", function(event, view, data) {
          $('#view_4137 .kn-detail').hide()
          //console.log(data, 'CM');
          for (let i = 0; i < data.length; ++i) {
            //var butlerName = `<p><span class="sv-as-name">`+data[i].field_16_raw.first+` `+data[i].field_16_raw.last+`</span></p>`
            //contactDisplay(data.length, '.as-cm-details', data[i].field_1252_raw.full,
              //       data[i].field_1252_raw.formatted, data[i].field_21)
              contactDisplay(data.length, '.as-cm-details', getVal("field_1252_raw","full", data[i]), getVal("field_1252_raw", "formatted", data[i]), data[i].field_21,
                          i)
          }
    });
    
    function getVal(field, s, t){
      try { var y = t[field][s]
        return y
      }
      catch(err) {
        //console.log(err)
      }
    }
                        
    function contactDisplay(l, appendTo, num1, fnum1, name, i, num2, fnum2){
          //console.log(l, appendTo, num1, fnum1, num2, fnum2, name, i)
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
            //if( num != undefined && num != '') {return `<span class="as-formatted-number" style="font-size: 12px;">`+p+` `+s+`</span><span class="sv-as-number"><a href="tel:`+num+`"><i class="fa fa-phone"></i></a><span>
            //					   </span><span class="sv-as-message"><a href="sms:`+num+`"><i class="fa fa-comment"></i></a><span>`
            //}else{ return '' }
          }
          var butlerName = `<p><span class="sv-as-name">`+name+`</span></p>`;
          var nameAndNumber = `<div>`+butlerName+`<div>`+getNumber(num1, fnum1, 'Phone 1')+`</div><div>`+getNumber(num2, fnum2, 'Phone 2')+`</div></div>`;
          className.append(nameAndNumber);
        }
    }
    
    //My Butlers
    $(document).on("knack-view-render.view_4141", function(event, view, data) {
       butlerDeets(data);
      $('.field_17').hide(); 
    //   $('.field_276').hide(); 
      $('.field_277').hide();
    });
    
    //view_4113
    $(document).on("knack-view-render.view_4113", function(event, view, data) {
       //console.log('TEST');
       //var myVar = setInterval(addAreaInterval, 1000);
       //function addArea(){ $('#view_4143-field_1927').val(); clearInterval(myVar); }
       //function addAreaInterval(){
           // if($('#view_4143-field_1927').val() == ''){ addArea(); }
       //}
    });
    
    //view_4170 Area Details
    $(document).on("knack-view-render.view_4170", function(event, view, data) {
       //console.log(data);
      $('#view_4170').attr('area-id', data.field_483_raw[0].id);
      $('#view_4170').attr('com-id', data.id);
    });
    
    //view_4129 Assign Butler > Community Contacts Form
    $(document).on("knack-view-render.view_4170", function(event, view, data) {
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
    
    //view_4170 Community Filter Test
    $(document).on("knack-view-render.view_4122", function(event, view, data) {
        console.log(data)
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
            console.log(active_url, 'active_url');
            window.location.href = active_url;
        })
        //as-inactive-filter
        $('#as-inactive-filter').on('click', function(){
        console.log(inactive_url, 'inactive_url')
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
            console.log(daysDif,  "daysDif");
            $($('.sv-site-details')[i]).html(daysDif)
            if(daysDif > 15 && daysDif < 31){
                $($($('.sv-site-details')[i]).parents()[2]).addClass('sv-yellow')
                console.log(i,daysDif, "yllw" )
            }else if(30 < daysDif){
                $($($('.sv-site-details')[i]).parents()[2]).addClass('sv-red')
            }else{
                $($($('.sv-site-details')[i]).parents()[2]).addClass('sv-green')
            }
            // $($($('.sv-site-details')[i]).parents()[7]).hide()
            if (data[i].field_141 == "Yes") {
                $($('.as-service-today')[i]).html('Service Today At ' + data[i].field_44);
            } else {
                $($('.as-service-today')[i]).html('No Service Today');
            }
        }
        $('.field_44').hide();$('.field_141').hide();
        
    });
    
    //view_4151
    $(document).on("knack-view-render.view_4151", function(event, view, data) {
        //if(data.length > 0 )( $($('.as-community-name')[0]).html(data[0].field_54) )
    });
    
    /******************************************End AREA Command Center Section****************************************************************/
    
    
    
    ///HIDES THE IN DEV***************************************************************************************************************************
    //view_1403 Butler Menu this will hide the menu for Report New Service Hazards
    $(document).on("knack-view-render.view_1403", function(event, view, data) {
          try {
          console.log(Knack.session.user.id);
          if(Knack.session.user.id != "600ee99f042013001b142c0a"){ $('#view_1403 .kn-link-2').addClass('hideMe'); }
        }
        catch(err) {
          console.log(err);
        }
    });
    //view_3760 Call Center Menu this will hide the menu for Report New Service Hazards
    $(document).on("knack-view-render.view_3760", function(event, view, data) {
          try {
          console.log(Knack.session.user.id);
          if(Knack.session.user.id != "600ee99f042013001b142c0a"){ $('#view_3760').addClass('hideMe'); }
        }
        catch(err) {
          console.log(err);
        }
    });
    //view_3795
    $(document).on("knack-view-render.view_3795", function(event, view, data) {
          try {
          console.log(Knack.session.user.id);
          if(Knack.session.user.id != "600ee99f042013001b142c0a"){ $('#view_3795').addClass('hideMe'); }
        }
        catch(err) {
          console.log(err);
        }
    });
    //view_3762 - NEW
    //view_3379 -OLD
    $(document).on("knack-view-render.view_3762", function() {
          //hide the New Service Hazard if login user is not Josh
          try {
          console.log(Knack.session.user.id);
          if(Knack.session.user.id != "600ee99f042013001b142c0a"){ $('#view_3379').hide(); $('#view_3762').show(); }
          else{ $('#view_3379').show(); $('#view_3762').hide(); }
        }
        catch(err) {
          console.log(err);
        }
    });
    
    //view_3764 Session Logs
    $(document).on("knack-view-render.view_3764", function() {
          //hide the New Service Hazard if login user is not Josh
          try {
          console.log(Knack.session.user.id);
          if(Knack.session.user.id != "600ee99f042013001b142c0a"){ $('#view_3764').hide(); }
          else{ $('#view_3764').show(); }
        }
        catch(err) {
          console.log(err);
        }
    });
    //scene_799 Service ID Details
    $(document).on('knack-scene-render.scene_799', function() {
      //view_3767
        try {
          console.log(Knack.session.user.id);
          if(Knack.session.user.id != "600ee99f042013001b142c0a"){ $('#view_3767').hide(); }
          else{ $('#view_3767').show(); }
        }
        catch(err) {
          console.log(err);
        }
    });
    
    //scene_954 view_3792 Service ID Edit
    $(document).on('knack-scene-render.scene_954', function() {
        try {
          console.log(Knack.session.user.id);
          if(Knack.session.user.id != "600ee99f042013001b142c0a"){ $('#view_3792').hide(); }
          else{ $('#view_3792').show(); }
        }
        catch(err) {
          console.log(err);
        }
    });
    
    //scene_816 view_3794 Management
    $(document).on('knack-scene-render.scene_816', function() {
        try {
          console.log(Knack.session.user.id);
          if(Knack.session.user.id != "600ee99f042013001b142c0a"){ $('#view_3794').hide(); }
          else{ $('#view_3794').show(); }
        }
        catch(err) {
          console.log(err);
        }
    });
    
    //scene_309/views/view_3797 CM OLD
    $(document).on('knack-scene-render.scene_309', function() {
        try {
          console.log(Knack.session.user.id);
          if(Knack.session.user.id != "600ee99f042013001b142c0a"){ $('#view_3797').hide(); }
          else{ $('#view_3797').show(); }
        }
        catch(err) {
          console.log(err);
        }
    });
    //scene_679/views/view_3799 Reports
    $(document).on('knack-scene-render.scene_679', function() {
        try {
          console.log(Knack.session.user.id);
          if(Knack.session.user.id != "600ee99f042013001b142c0a"){ $('#view_3799').hide(); }
          else{ $('#view_3799').show(); }
        }
        catch(err) {
          console.log(err);
        }
    });
    
    ///END HIDES THE IN DEV***************************************************************************************************************************
    
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
      },{ //Service Hazard OLD
        "view_id": "view_4829",
        "filters": [
          { 
            'icon': 'fa-building-o',
            'title': "Unaddressed",
            'filter_id': 'today_filter',
            'filter':
              {
                'match': 'or',
                'rules': [
                  {
                    "field":"field_1206",
                    "operator":"is",
                    'value': 'No'
                  }
                ]
              }
            
          },{ 
            'icon': 'fa-folder',
            'title': "All Service Hazards",
            'filter_id': 'ryservice',
            'filter':[
                {
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
      // { //All Audit - Staff - Table
      //   "view_id": "view_4617",
      //   "filters": [
      //     { 
      //       'icon': '',
      //       'title': "Community Audit",
      //       'filter_id': 'm_site_comAudit_staff_view_4617',
      //       'filter':[
      //         {
      //           "field":"field_689",
      //           "operator":"is",
      //           'value': 'Community Audit'
      //         }
      //       ]
      //     },
      //     { 
      //       'icon': '',
      //       'title': "Butler Audit",
      //       'filter_id': 'm_site_bAudit_staff_view_4617',
      //       'filter':[
      //         {
      //           "field":"field_689",
      //           "operator":"is",
      //           'value': 'Butler Audit'
      //         }
      //       ]
      //     },
      //     { 
      //       'icon': '',
      //       'title': "Clear",
      //       'filter_id': 'm_site_clear_staff_view_4617',
      //       'filter':[
      //         {
      //         }
      //       ]
      //     }
      //   ]
      // },
      // { //All Audit - Staff - List
      //   "view_id": "view_4627",
      //   "filters": [
      //     { 
      //       'icon': '',
      //       'title': "Community Audit",
      //       'filter_id': 'm_site_comAudit_staff_view_4627',
      //       'filter':[
      //         {
      //           "field":"field_689",
      //           "operator":"is",
      //           'value': 'Community Audit'
      //         }
      //       ]
      //     },
      //     { 
      //       'icon': '',
      //       'title': "Butler Audit",
      //       'filter_id': 'm_site_bAudit_staff_view_4627',
      //       'filter':[
      //         {
      //           "field":"field_689",
      //           "operator":"is",
      //           'value': 'Butler Audit'
      //         }
      //       ]
      //     },
      //     { 
      //       'icon': '',
      //       'title': "Clear",
      //       'filter_id': 'm_site_clear_staff_view_4627',
      //       'filter':[
      //         {
      //         }
      //       ]
      //     }
      //   ]
      // },
      // { //My Audits - Table
      //   "view_id": "view_4708",
      //   "filters": [
      //     { 
      //       'icon': '',
      //       'title': "Community Audit",
      //       'filter_id': 'm_site_comAudit_staff_view_4708',
      //       'filter':[
      //         {
      //           "field":"field_689",
      //           "operator":"is",
      //           'value': 'Community Audit'
      //         }
      //       ]
      //     },
      //     { 
      //       'icon': '',
      //       'title': "Butler Audit",
      //       'filter_id': 'm_site_bAudit_staff_view_4708',
      //       'filter':[
      //         {
      //           "field":"field_689",
      //           "operator":"is",
      //           'value': 'Butler Audit'
      //         }
      //       ]
      //     },
      //     { 
      //       'icon': '',
      //       'title': "Clear",
      //       'filter_id': 'm_site_clear_staff_view_4708',
      //       'filter':[
      //         {
      //         }
      //       ]
      //     }
      //   ]
      // },
      // { //My Audits - List
      //   "view_id": "view_4860",
      //   "filters": [
      //     { 
      //       'icon': '',
      //       'title': "Community Audit",
      //       'filter_id': 'm_site_comAudit_staff_view_4860',
      //       'filter':[
      //         {
      //           "field":"field_689",
      //           "operator":"is",
      //           'value': 'Community Audit'
      //         }
      //       ]
      //     },
      //     { 
      //       'icon': '',
      //       'title': "Butler Audit",
      //       'filter_id': 'm_site_bAudit_staff_view_4860',
      //       'filter':[
      //         {
      //           "field":"field_689",
      //           "operator":"is",
      //           'value': 'Butler Audit'
      //         }
      //       ]
      //     },
      //     { 
      //       'icon': '',
      //       'title': "Clear",
      //       'filter_id': 'm_site_clear_staff_view_4860',
      //       'filter':[
      //         {
      //         }
      //       ]
      //     }
      //   ]
      // },
    ]
    var activeFilter;
    var todayFilter = {'match': 'and',
                           'rules': [{
                             'field': 'field_46', //status
                             'operator': 'is',
                             'value': currentServiceDate()
                           }]}
    var newReviewServiceIDFilter = todayFilter.rules.concat({'field': 'field_121', 'operator': 'is','value': 'Complete'})
    for (let i = 0; i < filterData.length; i++) {
        $(document).on('knack-view-render.'+filterData[i].view_id, function(event, view, data) {
          var filterDiv = `<div id=${filterData[i].view_id}_c_filter'><div class="custom_filter js-filter-menu tabs is-toggle is-flush"><div><ul></ul></div><div></div></div></div>`
          if( $('#'+filterData[i].view_id).length > 0){
            //console.log('activeFilter', activeFilter)
            if( $('#'+filterData[i].view_id+'_c_filter').length == 0 ){$($('#'+filterData[i].view_id+' .view-header')[0]).append(filterDiv);}
            var view_filters = filterData[i].filters
            for (let j = 0; j < view_filters.length; j++) {
              var icon = `<i class="fa `+view_filters[j].icon+`"></i>`;
              if( $(`#${view_filters[j].filter_id}`).length === 0 ){
                // console.log( filterData[i].view_id,view_filters[j], "filterData[i].view_id is running" )
                $(`#${filterData[i].view_id} .custom_filter ul`).append(`<li id=`+view_filters[j].filter_id+`><a class="custom_filter-li-a">`+icon+`<span class="as-custom-title">`+`  `+view_filters[j].title+`</span></a></li>`);
                // $(`#${filterData[i].view_id} .custom_filter div`).append($($('.kn-add-filter')[i]))
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
                //$('#'+view_filters[j].filter_id).addClass('is-active')
                var cFilter;
                activeFilter = '#'+view_filters[j].filter_id
                var loc = location.href;
                //Today's Service 
                if(filterData[i].view_id == "view_4732"){
                  //cFilter = todayFilter.rules.push(view_filters[j].filter)
                  var todayAndFilter = todayFilter.rules.concat(view_filters[j].filter)
                  var todayAndFilter = {'match': 'and',
                             'rules': todayAndFilter}
                  var dest = loc.split('?')[0] + '?'+filterData[i].view_id+'_filters=' + encodeURIComponent(JSON.stringify(todayAndFilter));
                }else{
                  //cFilter = view_filters[j].filter
                  var dest = loc.split('?')[0] + '?'+filterData[i].view_id+'_filters=' + encodeURIComponent(JSON.stringify(view_filters[j].filter));
                }
                window.location.href = dest;
              });
              //if(filterData[i].view_id == "view_3850"){
              //	$('#'+view_filters[j].filter_id).click();
              //}
            }
      
          }
        });
    }
    //END CUSTOM FILTER OBJECT
    
    //view_4172 Area Details
     $(document).on("knack-view-render.view_4172", function(event, view, data) {
        $('#view_4172').hide();
     //   $('#view_4172').attr('area-id', data.id);
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
      var reviewService = [{
        "field":"field_46",
        "operator":"is",
        "value": currentServiceDate()
      }]
    //POST SERVICE MENU
    $(document).on("knack-view-render.view_4168", function(event, view, data) {
      $('.kn-link-4').hide();
      getStillInProgress()
    });
    
    function getStillInProgress(){
        return $.ajax({
          type: 'GET',
          headers: asHeader,
          url: 'https://api.sv.knack.com/v1/pages/scene_1558/views/view_4174/records/?filters=' + encodeURIComponent(JSON.stringify(inprogress)),
          success: function(data) {
           $($('.as-late-service-count')[0]).html(data.records.length)
          }
        });
    }
    
    function searchParam(name) {
        return (window.location.href.split(name + '=')[1] || '').split('&')[0];
    }
    //var currentBTC_back; //current Butler Timeclock scene back page
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
    //TapCheck - https://builder.sv.knack.com/apps/trashdash#pages/scene_1708/views/view_4653
    $(document).on("knack-view-render.view_4653", function(event, view, data) {
      for (let i = 0; i < data.length; i++) {
         $($($('.sv-delete-record')[i]).parents()[3]).hide()
        $($($('.sv-delete-link')[i]).parents()[3]).attr('style', 'color: red')
      }
    });
    
    //as-area-clock-status Area TimeClock - 
    $(document).on("knack-view-render.view_4186", function(event, view, data) {
      $('.field_1179').hide();
      //console.log(data, "as-area-clock-status")
      $($($('.field_1966')[1]).children()[0]).html('Current Service Date')
      $($($('.field_1966')[1]).children()[1]).html(currentServiceDate())
      var s, c;
      if(data.field_1179_raw){ s = 'You Are Clocked In'; c = 'statclosed'}
      else { s = 'You Are Clocked Out'; $('#view_4186 .field_1966').hide(); c = 'statpending' }
      s = `<span class="as_ticket_reason `+c+`">`+s+`</span>`
      $($('.as-area-clock-status')[0]).html(s)
    });
    //as-timeclock-date Area TimeClock - History
    $(document).on("knack-view-render.view_4185", function(event, view, data) {
      //console.log(data, "History");
      try{
        for (let i = 0; i < data.length; i++) {
        var hDate = data[i].field_1176_raw.date_formatted;
        var clockIn = $($('#view_4185 .field_1176 .kn-detail-body span span')[i]).html().split(" ")[1]
        var clockOut = $($('#view_4185 .field_1177 .kn-detail-body span span')[i]).html().split(" ")[1]
        $($('#view_4185 .field_1176 .kn-detail-body span span')[i]).html(clockIn)
        $($('#view_4185 .field_1177 .kn-detail-body span span')[i]).html(clockOut)
        $($('#view_4185 .as-timeclock-date')[i]).html(hDate)
      }
         }
      catch(err){
        //console.log(err)
      }
    });
    
    //view_4187 Ready to Clock Out? - My Time Clock
    $(document).on("knack-view-render.view_4187", function(event, view, data) {
      $($('.as-ready-out-main')[1]).hide(); $($('#view_4187 .kn-action-link')[0]).hide();
      $($('.as-ready-out-main')[0]).on("click", function(){
        $($('.as-ready-out-main')[1]).show(); $($('.as-ready-out-main')[0]).hide();
      })
      $($('.as-ready-out-main')[1]).on("click", function(){
        $($('#view_4187 .kn-action-link')[0]).click();
        $($('.kn-scenes')[0]).hide();
        location.reload()
      })
      $('#clock_out a').attr('style', "text-decoration: none;") //This removes the underline of the btn
    });
    
    //Add Butler Timeclock view_4150
    $(document).on("knack-view-render.view_4150", function(event, view, data) {
      $('#view_4150-field_113').val(''); $('#view_4150-field_113-time').val(''); $('#view_4150-field_114').val(''); $('#view_4150-field_114-time').val(''); 
    });
    
    //view_4202
    $(document).on("knack-view-render.view_4202", function(event, view, data) {
      $('#view_4202-field_113').val(''); $('#view_4202-field_113-time').val(''); $('#view_4202-field_114').val(''); $('#view_4202-field_114-time').val(''); 
    });
    
    //view_4174
    $(document).on("knack-view-render.view_4174", function(event, view, data) {
      //console.log(data)
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
          //$('#view_3855').hide();
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
     var still_inprogress = 
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
                    },{
                        'link_n':'5', // Service Hazards OLD
                        'filtered_view': 'view_4829', //view id that will be filtered
                        'filters': [{
                            "field":"field_1206",
                            "operator":"is",
                            'value': 'No'
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
                  //,{
                     //   'link_n':'5', // Compactor Logs
                     //    'filtered_view': 'view_4113', 
                     //   'filters': [{
                     //       "field":"field_257",
                     //       "operator":"is",
                    //		'value': currentServiceDate()
                     //   }],
                     //   'active_filter': true
                    //}
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
                        if(t.active_filter){ return '&active=true'; console.log('true') }else{ return '' }
                    }catch(err){
                        //console.log(err)
                    }
                }
                $('.kn-link-'+t.link_n).attr('href', $('.kn-link-'+t.link_n).attr('href') + '?'+t.filtered_view+'_filters='+ encodeURIComponent(JSON.stringify(t.filters)) + activeFilter());
            });
        });
    });
    //view_4242 Community Units
    $(document).on("knack-view-render.view_4242", function(event, view, data) {
        console.log(data, "units");
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
    
    //view_4245 Activate RADAR Form
    $(document).on("knack-view-render.view_4245", function(event, view, data) {
        //console.log(data, "units");
          //$('#view_4245 form input').val('')
    });
    
    //view_4243
    $(document).on("knack-view-render.view_4243", function(event, view, data) {
        console.log(data, "view_4243view_4243view_4243view_4243");
          var waitForView = setInterval(changeVal, 1000);
          function changeVal() {
          if($('#view_4245').length > 0){
            if(!data.field_149_raw){ $('#view_4245 form input').val('') }
              clearInterval(waitForView);
          }
        }
    });
    
    //Original CC
     $(document).on("knack-view-render.view_3374", function() {
        $($('#view_3374 .kn-details-group')[8]).addClass('cm-card')
       $($('#infraction_warning').parents()[5]).addClass('cm-card')
       //$($('#view_3374 .kn-details-group')[0]).addClass('test-card')
       //$($('#view_3374 img').parents()[4]).hide();
       $('#view_last_night_service_btn').css('margin-right', '10px');
       $($($('#view_3374 .sv-button-green')[1]).parents()[4]).hide()
    });
    
    //view_3407
     $(document).on("knack-view-render.view_3407", function() {
       $($('#updates-from-tb-id').parents()[1]).addClass('cm-card')
    });
    
    $(document).on("knack-view-render.view_3376", function(event, view, data) {
      for (let i = 0; i < data.length; i++) {//Add tooltip
        $($($('#view_3376 .field_60')[i]).children()[0]).addClass('cm-limit-text') //cm-tooltip
        $($('#view_3376 .field_60')[i]).attr('data-toggle', 'tooltip').addClass('cm-tooltip').attr('data-placement', 'right').attr('title', `${data[i].field_60}`)
        //$($('#view_3376 .field_60')[i]).attr('data-placement', 'right')
          //$($('#view_3376 .field_60')[i]).attr('title', `${data[i].field_60}`)
      }
    });
    
    //view_3568
    $(document).on("knack-view-render.view_3568", function(event, view, data) {
      $($('#view_3568 h2 i').parents()[1]).removeClass('level')
    });
    
    //view_4406 Quick Rating
    $(document).on("knack-view-render.view_4406", function(event, view, data) {
     $('#view_4406').hide();
      console.log(data)
      if(data.field_1464_raw === "Yes"){
          (data.field_1552).includes("down") ? $($('#view_3568 input[type=radio]')[1]).click() : $($('#view_3568 input[type=radio]')[0]).click()
        try{
            // $('#field_1425').val(data.field_1425_raw[data.field_1425_raw.length - 1])
            $('#field_1425').val(data.field_1425_raw[0])
        }
        catch(err){
        }
    
        // //For test only Josh
        // $($('#survey_submit_comment').parents()[1]).addClass('hideMe');
        // $('#view_3568 button').removeClass('hideMe')
        // var userProfKeys = Knack.session.user.profile_keys;
        // if(userProfKeys.includes('profile_34')){
        //     if( (data.field_1552).includes("down") ){
        //         // $($('#survey_submit_comment').parents()[1]).addClass('hideMe');
        //         $('#kn-input-field_1425').removeClass('hideMe')
        //     }
        // }
        // //For test only Josh
      }
    });
    //$('#view_last_night_service_btn').append(`&nbsp;<i style="margin-top: 5px;" class="fa fa-check-circle"></i>`)
    
    $(document).on('knack-form-submit.view_3568', function(event, view, record) {
          console.log(record)
          if($('#view_last_night_service_btn').length > 0){
          record.field_1495 == "Thumbs Up" ? $('#view_last_night_service_btn').addClass('rated-icon-green') : $('#view_last_night_service_btn').removeClass('rated-icon-green')
        }
          if($('#view_3374 .fa-check-circle').length === 0){
               $('#view_last_night_service_btn').append(`&nbsp;&nbsp;&nbsp;<i style="margin-top: 5px;" class="fa fa-check-circle"></i>`)
        }
    });
    
    //********************************Hide new service hazard Manage Logs and Infractions AS
    $(document).on("knack-view-render.view_4080", function(event, view, data) {
     $('.kn-link-1').hide()
    });
    
    $(document).on("knack-view-render.view_4080", function(event, view, data) {
     $('.kn-link-1').hide()
    });
    
    $(document).on("knack-view-render.view_4033", function(event, view, data) {//EDIT SERVICE ID - HIDE SERVICE HAZARD NEW https://apps.sv.knack.com/trashdash#area-command-center/dashboards/pre-service-dashboard/service-id-review/edit-service-id/61daa824aea5612e960fc42d/
        $($('#view_4033 .as-accordion')[5]).hide()
    });
    
    $(document).on("knack-view-render.view_3996", function(event, view, data) {//View SERVICE ID - https://apps.sv.knack.com/trashdash#area-command-center/dashboards/pre-service-dashboard/service-id-review/service-id/61dd4b5f183c852ca37e1e51/
        $($('#view_3996 .as-accordion')[4]).hide()
    });
    
    $(document).on("knack-view-render.view_3819", function(event, view, data) {//Review SERVICE ID - https://apps.sv.knack.com/trashdash#area-command-center/dashboards/pre-service-dashboard/service-id-review/review-service-id/61ed1d269e23c12f8dfe902a/
        $($('#view_3819 .as-accordion')[3]).hide()
    });
    
    
    $(document).on("knack-view-render.view_4225", function(event, view, data) {//View All Workflows Service Hazard 	https://builder.sv.knack.com/apps/trashdash#pages/scene_1439/views/view_4225
        $('#view_4225 .kn-link-21').remove()
          $('#view_4225 .kn-link-25').remove()
          $('#view_4225 .kn-link-3').remove()
        $('#view_4225 .kn-link-4').remove()
        
        if(!isButler){
            $('#view_4225 .kn-link-34').remove() //Switch to Butler View
        }else{
            // $('#view_4225 .kn-link-34').remove() //Switch to Butler View //Not yet live
        }  
    });
    
    $(document).on("knack-view-render.view_4051", function(event, view, data) {//view_4051 In Service https://apps.sv.knack.com/trashdash#area-command-center/dashboards/in-service-dashboard/
        $('#view_4051 .kn-link-11').remove();
          console.log(view, 'view')
    });
    
    var duplicateImageUploaderViews = ['view_4819', 'view_4493', 'view_5373']
    for (let i = 0; i < duplicateImageUploaderViews.length; i++) {
      $(document).on('knack-view-render.'+duplicateImageUploaderViews[i], function(event, view, data) {
        $('#view_4493 .kn-submit').addClass('hideMe');
        $('#view_5373 .kn-submit').addClass('hideMe');
        $('.field_1802').hide();
        // console.log('view render for {view_4493}');
        
        //hide the duplicate image container
            $('#kn-input-field_1916').addClass('hideMe'); //Audit Score
            $('#kn-input-field_1900').addClass('hideMe');
            // console.log('Hide the duplicate image container')
            // function hideDuplicate(){
            //     for (let i = 0; i < 10; i++) {
            //         $($('.kn-input-image')[i]).find('.filepond--root').next().hide();
            //     }
            // }
            // var runInterval = true;
            // var imageUploadWatcher = setInterval(test, 100);
            // function test(){
            //     //$('#view_4493 button[type="submit"]').hide();
            //     if($('.filepond--root').length == 6){
            //         hideDuplicate();
            //         clearInterval(imageUploadWatcher);  
            //     }
            //     else{
            //         console.log('interval running')
            //         if(runInterval){
            //             runInterval = false;
            //             //console.log('testinggggg')
            //             setTimeout(function () {
            //             //console.log('clear interval')
            //             clearInterval(imageUploadWatcher) 
            //             }, 5000);
            //         }
            //     }
            // }
        });
    }
    //NEW BUTLER AUDIT - NOT REFACTOR (view_4493 not sure if this view exist)
    //field_1802 view_4493 Perform Butler Audit Form
    // $(document).on("knack-view-render.view_4493", function(event, view, data) {
    //   $('#view_4493 .kn-submit').addClass('hideMe');
    //   $('.field_1802').hide();
    //   console.log('view render for view_4493');
      
    //   //hide the duplicate image container
    //   	$('#kn-input-field_1916').addClass('hideMe'); //Audit Score
    //   	$('#kn-input-field_1900').addClass('hideMe');
    //     console.log('Hide the duplicate image container')
    //   	function hideDuplicate(){
    //         for (let i = 0; i < 10; i++) {
    //             $($('.kn-input-image')[i]).find('.filepond--root').next().hide();
    //         }
    //     }
    //   	var runInterval = true;
    //   	var imageUploadWatcher = setInterval(test, 100);
    //   	function test(){
    //       	//$('#view_4493 button[type="submit"]').hide();
    //     	if($('.filepond--root').length == 20){
    //           	hideDuplicate();
    //         	clearInterval(imageUploadWatcher);  
    //         }
    //         else{
    //           	console.log('interval running')
    //           	if(runInterval){
    //             	runInterval = false;
    //               	//console.log('testinggggg')
    //               	setTimeout(function () {
    //                   //console.log('clear interval')
    //                   clearInterval(imageUploadWatcher) 
    //                 }, 5000);
    //             }
    //         }
    //     }
    // });
    //view_4497
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
    
    //view_4493 Save and Continue Later Btn Butler
    $(document).on("knack-view-render.view_4498", function(event, view, data) {
    //   $('#kn-input-field_1916').addClass('hideMe');
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
        // $('#view_4493 form').submit();
      })
    });
    
    $(document).on('knack-form-submit.view_4492', function(event, view, record) {
        console.log(record, "New butler audit") //Add Service ID to Site Audit
          siteAuditNew(record)
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
                  console.log(serviceData, "this is from the getServiceId return data");
                    try{
                    updateAudit(serviceData.records[0].id)
                  }catch(err){
                    console.log('The Community does not have service today')
                  }
                    
            }
          });
        }
          function updateAudit(serviceID){
            console.log(serviceID, "serviceID")
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
      // $('#as_continue_later_audit').on('click', function(){
      //   $('#view_4504-field_1884').prop("selectedIndex", 1);
      //     $('#view_4504 form').submit();
      // });
      $('#as_continue_audit_next').on('click', function(){
        // $('#view_4504-field_1884').prop("selectedIndex", 0);
          $('#view_4504 form').submit();
      })
    });
    
    $(document).on("knack-view-render.view_4504", function(event, view, data) {
      $('#kn-input-field_1884').addClass('hideMe');
      $("#view_4504 form button[type='submit']").addClass('hideMe')
    });
    
    //view_4752 Manage Audit - Post Service NEW SETUP
    $(document).on("knack-view-render.view_4752", function(event, view, data) {
      console.log(data);
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
    
      //console.log(data, "view_4752");
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
        // console.log(data);
        for (let j = 0; j < data.length; j++) {
          
          if(data[j].field_689 == 'Butler Audit'){
          //   $($('.as-com')[j]).parents().eq(5).hide();
          } 
          else{
            $($('#'+auditViews[i]+' .field_192')[j]).hide() // hide the butler
            $($('#'+auditViews[i]+' .field_409')[j]).hide() // hide the Audit Score
          }
        }
    
        //console.log(data, "view_4860");
        $('.field_1721').hide(); 
      //   $('.field_689').hide()
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
    
    //staging theme v2 - DO NOT DELETE - Manuel's Ongoing Project
    // var staging_theme_v2 = [ 'scene_1952']
    // // var siteAudit_scenesDesktop = [ 'scene_1952']
    // // staging_theme_v2 = staging_theme_v2.concat(siteAudit_scenesDesktop)
    // $(document).on('knack-scene-render.any', function(event, scene) {
       
    //     if(staging_theme_v2.includes(scene.key)){
    //         if($('#sv_theme_v2').length === 0){
    //             currentAppendedTheme = 'sv_theme_v2';
    //             $('head').append('<link rel="stylesheet" type="text/css" id="sv_theme_v2" href="https://strategic-visionz.github.io/knack-css/scss-staging/themeTrashButler.css">')
    //             console.log('check if theme is added', $('#sv_theme_v2').length);
    //         }
    //     }
    //     console.log(currentAppendedTheme)
    //     checkCurrentTheme();
    //     // addImagePreview();
        
    // });
    
    // //staging theme v2 - DO NOT DELETE - Manuel's Ongoing Project
    
    //NEW BUTLER AUDIT
    //'scene_1697','scene_1704','scene_1705','scene_1712','scene_1714','scene_1715','scene_1719','scene_1737','scene_1738','scene_1739','scene_1740','scene_1741','scene_1742','scene_1698','scene_1694',
    var geo_scenes = [ 'scene_1712', 'scene_1714', 'scene_1715', 'scene_1719', 'scene_1737', 'scene_1738', 'scene_1739', 'scene_1740', 'scene_877', 'scene_881', 'scene_882', 'scene_944', 'scene_945', 'scene_1628', 'scene_1632', 'scene_1662', 'scene_1663', 'scene_1664', 'scene_1666', 'scene_1665', 'scene_1667', 'scene_1668', 'scene_1897','scene_1897','scene_1900','scene_1903','scene_1905','scene_1899','scene_1902','scene_1901']
    //New Site Audit Setup Scene List - https://builder.sv.knack.com/apps/trashdash/pages/scene_1695
    var siteAudit_scenesDesktop = ['scene_1695','scene_1694', 'scene_1936']
    geo_scenes = geo_scenes.concat(siteAudit_scenesDesktop)
    $(document).on('knack-scene-render.any', function(event, scene) {
          if(geo_scenes.includes(scene.key)){
              if($('#sv_geo_css').length === 0){
                currentAppendedTheme = 'sv_geo_css'
                $('head').append('<link rel="stylesheet" type="text/css" id="sv_geo_css" class="lazyload" href="https://strategic-visionz.github.io/knack-css/scss/Manage%20Geos%20Theme.1.0.0.min.css">')
            }
        }else{
            if($('#sv_geo_css').length > 0){
                if(siteAuditShared.includes(scene.key)){}
                else{ $('#sv_geo_css').remove(); }
            }
        }
        if(siteAudit_scenesDesktop.includes(scene.key)){
            currentAppendedTheme = 'as_command_center_theme';
            if($('#as_command_center_theme').length === 0){
                $('head').append('<link rel="stylesheet" type="text/css" id="as_command_center_theme" class="lazyload" href="https://strategic-visionz.github.io/knack-css/scss/Area%20Supervisor%20Theme.min.css">')
            }
        }
        // console.log(currentAppendedTheme)
        checkCurrentTheme();
        
    });
    
    function checkCurrentTheme(){
        if(currentAppendedTheme === 'sv_geo_css'){$('#as_command_center_theme').remove()} 
        else if (currentAppendedTheme == 'as_command_center_theme'){$('#sv_geo_css').remove()}
        // else if (currentAppendedTheme == 'sv_theme_v2'){$('#sv_theme_v2').remove()}
        else {}
    }
    
    //TapCheck Review view_4653 - https://builder.sv.knack.com/apps/trashdash#pages/scene_1708/views/view_4653
    $(document).on("knack-view-render.view_4653", function(event, view, data) {
      console.log(data, "view_4653 data");
      
      for (let i = 0; i < data.length; i++) {
        if(data[i].field_2212_raw){ $($('.field_112 h2')[i]).append(`<i style="position: absolute;right: 10%;color: red;" class="fa fa-flag"></i>`) }
      }
    });
    
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
    
    //view_4743 Delete Timeclock
    $(document).on("knack-view-render.view_4743", function(event, view, data) {
     console.log(data)
      $('#sv_delete').on('click', function(){
        $('.close-modal').click()
         $($('.kn-link-delete[href=#'+data.id+']')[0]).click()
        window.alert = function(){};
      })
      $('#sv_cancel').on('click', function(){
         $('.close-modal').click()
      })
    });
    
    //
    $(document).on('knack-form-submit.view_4123', function(event, view, record) {
      console.log(record, "New view_4123 ", currentServiceDate())
      // var todayService = new Date().toJSON().slice(0,10).split('-').reverse().join('/');
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
      console.log(record, "New view_4503 ")
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
            console.log(filter, currentServiceDate())
          console.log(data, "this is from the getCommunityTodayService return data");
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
                    console.log(res)
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
          console.log(data, "this is from the getCommunityTodayService return data");
          assignButlersToTodayService(data, record)
        }
      })
    }
    
    function assignButlersToTodayService(data, record){
      console.log("assignButlersToTodayService", data, record)
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
      //sv_prim_number - field_276_raw.formatted
      //sv_sec_number - field_277_raw.formatted
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
    
    // //view_3832 New Butler Add Territory to Butler
    // $(document).on("knack-view-render.view_3832", function(event, view, data) {
    //   	$($('#kn-input-field_525').parents()[1]).addClass('hideMe')
    //  	$('#view_3832-field_525').val($($('#view_3832-field_525 option')[1]).val()).trigger("liszt:updated");
    //   	$('#view_3832-field_2075').val($($('#view_3832-field_2075 option')[1]).val()).trigger("liszt:updated");
    // });
    
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
      console.log(data, "video user guide")
      $('#kn-scene_1752 .view-group-3').hide()
        // var videoGuides = [
        //     {
        //         'title': 'How to Login & Clock-In using the Area Mobile Command Center?',
        //         'video': '<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/d87b2f3cc80d43169e5a07081d69e5e9" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>',
        //         'description' : ''
        //     },
        //     {
        //         'title': 'Dashboards & Workflows Overview',
        //         'video': '<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/7dc5c060dc1046559f227ce93903efcb" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>',
        //         'description' : ''
        //     },
        //     {
        //         'title': 'How to Keep Track Of Late Services',
        //         'video': '<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/45b08db477464ed29a89c0e0f8e5d84d" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>',
        //         'description' : ''
        //     },
        //     {
        //         'title': 'How To Set Up New Butlers Fast!',
        //         'video': '<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/a61eb3d84da848648df0e143645c93df" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>',
        //         'description' : ''
        //     },
        //     {
        //         'title': 'How to Perform Service ID Reviews',
        //         'video': '<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/f7249173409c485c95b148cf8ba2ebf1" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>',
        //         'description' : ''
        //     },
        //     {
        //         'title': 'How to View All Service IDs',
        //         'video': '<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/eb68588a71e342cf9ec38be46f5a0b20" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>',
        //         'description' : ''
        //     },
        //     {
        //         'title': 'How To Manage Service Assignments',
        //         'video': '<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/ccb941865c464bd881d244e11fad158f" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>',
        //         'description' : ''
        //     },
        //     {
        //         'title': 'How To Manage Support Tickets',
        //         'video': '<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/96886f6126b54ac08c71b78d6eaf536a" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>',
        //         'description' : ''
        //     },
        //     {
        //         'title': 'How To Review New Butler Training',
        //         'video': '<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/92ab800ebbc34a36a65350f38b7c5821" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>',
        //         'description' : ''
        //     },
        //     {
        //         'title': 'How To Quickly View Today’s Services',
        //         'video': '<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/c77086b80a9045c496bcc6590111cd5c" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>',
        //         'description' : ''
        //     },
        //     //{
        //        // 'title': 'How To Perform Site Audits Audit',
        //        // 'video': '',
        //        // 'description' : ''
        //     //},
        //     {
        //         'title': 'How To View & Update Important Community Information',
        //         'video': '<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/44d7d3b20994409bb7ef0b0f16d95f3f" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>',
        //         'description' : ''
        //     },
        //     {
        //         'title': 'How To Add Same Day Service For A Community',
        //         'video': '<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/062a4064d5f3425ca44c80ed31792c8c" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>',
        //         'description' : ''
        //     },
        //     {
        //         'title': 'Quickly Verify Compactor Logs At The Start Of Service',
        //         'video': '<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/bcec508a9ff3432baac210a3a8123980" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>',
        //         'description' : ''
        //     },
        //     {
        //         'title': 'How To Quickly Find, View, Edit, Add Infractions, Hazards, RADARs and Compactor Logs',
        //         'video': '<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/d3f6ed9af6c146fb898e0ee68256ef3f" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>',
        //         'description' : ''
        //     },
        //     {
        //         'title': 'How To Manage Butler Timeclocks',
        //         'video': '<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/8787345b5d8942949e3144a8ecc69c62" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>',
        //         'description' : ''
        //     },
        //     {
        //         'title': 'How To View A List Of All Butlers I Manage',
        //         'video': '<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/dd9dc13ab6f64744895071037a58602f" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>',
        //         'description' : ''
        //     },
        //     {
        //         'title': 'How To View The Areas and Communities I Manage (My Profile Page)',
        //         'video': '<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/79317c285ed641f7a818328d3a4bc618" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>',
        //         'description' : ''
        //     },
        //     {
        //         'title': 'How To Quickly See Which Services Are Still In Progress',
        //         'video': '<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/bcb4626c97c540bcba7753e5d47ec870" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>',
        //         'description' : ''
        //     },
        //     {
        //         'title': 'How To Quickly See If Any Of My Butlers Are Still Clocked In',
        //         'video': '<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/6cff0a908c014acba4ad2dd602f478ad" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>',
        //         'description' : ''
        //     },
        //     {
        //         'title': 'How To Manage My Tapcheck Flagging/Approvals',
        //         'video': '<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/59a6407b816147848051c1cc9efbfb6d" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>',
        //         'description' : ''
        //     },
        //     {
        //         'title': 'Show Area Supervisor Clock Out and Time Clock History',
        //         'video': '<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/45b53c7c63094b79a8896f4d44c4b93c" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>',
        //         'description' : ''
        //     }
        // ]
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
      console.log(data)
      //sv_prim_number - field_276_raw.formatted
      //sv_sec_number - field_277_raw.formatted
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
        //   var secN = `<span class="sv-as-number"><a class="${noNum2}" href="tel:`+data[i].field_277_raw.formatted+`"><i class="fa fa-phone ${noNum2}"></i></a></span>
        //   <span class="sv-as-message"><a class="${noNum2} href="sms:`+data[i].field_277_raw.formatted+`"><i class="fa fa-comment ${noNum2}"></i></a><span>`
        //   $($('.sv-sec')[i]).append(secN)
        }catch(err){
          console.log(err)
        }
      }
    });
    
    //view_4141 https://apps.sv.knack.com/trashdash#area-command-center/dashboards/view-all-workflow/my-butlers/
    $(document).on("knack-view-render.view_4812", function(event, view, data) {
      console.log(data)
      //sv_prim_number - field_276_raw.formatted
      //sv_sec_number - field_277_raw.formatted
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
            console.log("as_continue_audit_next")
            $('#field_2917').prop("selectedIndex", 0);
            computeButlerScore()
            //   $('#view_4819 form').submit();
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
    // //view_5373 Save and Continue Later Btn Butler - https://builder.sv.knack.com/apps/trashdash#pages/scene_1697
    // $(document).on("knack-view-render.view_5376", function(event, view, data) {
    //     $('#view_5267').hide();
    //     $("#view_5382 .kn-submit").addClass('hideMe')
    //     $('#view_5373 button[type=button]').addClass('hideMe')
    //     $('#kn-input-field_1916').addClass('hideMe');
    //     $('#kn-input-field_1900').addClass('hideMe');
    //     $('#as_continue_later_audit').on('click', function(){
    //         computeButlerScore()
    //         $('#view_5373-field_1900').prop("selectedIndex", 2);
    //         $('#field_2917').prop("selectedIndex", 1);
    //         $('#view_5373 form').submit();
    //         $('#view_4618 form').submit();
    //         $('.close-modal').click();
    //     });
    //     $('#as_continue_audit_next').on('click', function(){
    //         console.log("as_continue_audit_next")
    //         $('#field_2917').prop("selectedIndex", 0);
    //         computeButlerScore()
    //         //   $('#view_5373 form').submit();
    //         validateFields()
    //         $('#view_4618 form').submit();
            
    //     })
    
    //     function validateFields(){
    //     var allField =  $('#view_5373-field_1836').val() == ''
    //   	if(allField){
    // 		// $('#view_5267').show();
    //     $('.sv-field-validation').removeClass('hideMe')
    // 		$('html, #kn-modal-bg-0').animate({ scrollTop: $("#kn-input-field_1836").offset().top }, 1000);
    // 	}else{
    //     	$('#view_5373-field_1900').prop("selectedIndex", 1);
    //     	$('#view_5373 form').submit();
    //       $("#view_5382 form").submit()
    //     }
    // }
    // });
    
    //view_5384
    $(document).on("knack-view-render.view_5384", function(event, view, data) {
        $("#view_5384 .kn-submit").addClass('hideMe');
    });
    
    //view_5373 Save and Continue Later Btn Butler - https://builder.sv.knack.com/apps/trashdash#pages/scene_1697
    $(document).on("knack-view-render.view_5385", function(event, view, data) {
      console.log('view_5385view_5385view_5385view_5385view_5385view_5385view_5385')
        $('#as_continue_later_audit').on('click', function(){
            $('#field_2917').prop("selectedIndex", 1);
            $('#view_5384 form').submit();
        });
        $('#as_continue_audit_next').on('click', function(){
            console.log("as_continue_audit_next")
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
            console.log("as_continue_audit_next")
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
            // $('#view_5267').show();
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
    
    //view_4907 - Community & Contract - Site Details https://apps.sv.knack.com/trashdash#area-command-center/dashboards/view-all-workflow/communities-contacts/view-community-details3
    $(document).on("knack-view-render.view_4907", function(event, view, data) {
       var currentComId = $(location).attr("href").replace(/\/\s*$/, "").split('/').pop();
       $('#view_4907-field_193').val(currentComId).trigger("liszt:updated");
       $('#view_4907').hide();
    });
    
    $(document).on('knack-scene-render.scene_1530', function(event, scene) {
        $('.kn-records-nav').append($('.kn-view .kn-notification').parents()[0])
    });
    var tbUpdates;
    //Community Concierge https://builder.sv.knack.com/apps/trashdash/pages/scene_1255/views/view_4928/rich_text
    $(document).on('knack-view-render.view_4928', function(event, view, record) {
        console.log('object_90');
        var goToTest = window.location.href + 'tb-community-updates';
        var tbBtn = `<a href="${goToTest}">... Read More<a>`;
        return $.ajax({
            type: 'GET',
            headers: asHeader,
            url: 'https://api.sv.knack.com/v1/objects/object_90/records',
            success: function(res) {
              console.log('TB UPDATES API TEST', res)
              tbUpdates = res.records[0].field_1685;
                var updataText = tbUpdates;
                var updateLength = 300;
                var trimmedUpdate = updataText.substring(0, updateLength);
               $('#view_4928').append(trimmedUpdate)
               $('#view_4928').append(tbBtn);
            }
        });
       $('#view_4928').on('click', function(){
            window.location.href = goToTest;
        })
    });
    
    //view_4926
    $(document).on('knack-view-render.view_4926', function(event, view, record) {
        console.log('tbUpdates');
        $('#view_4926').append(`<span>${tbUpdates}<span>`)
    });
    
    //view_4929 - https://builder.sv.knack.com/apps/trashdash/pages/scene_1324/views/view_4929/form
    $(document).on('knack-view-render.view_4929', function(event, view, record) {
        $('#view_4929').addClass('hideMe');
        var currentCMRoles = Knack.session.user.profile_objects;
        var currentCMId = currentCMRoles.find(x => x.object == "object_5").entry_id;
        var takenBy = [currentCMId]
        takenBy.push($('#view_4929-field_2379').val());
        $('#view_4929-field_2379').val(takenBy).trigger("liszt:updated");
    });
    //https://builder.sv.knack.com/apps/trashdash/pages/scene_1324/views/view_3520/form
    //Submit the update Community Form when Survey is submitted
    $(document).on('knack-form-submit.view_3520', function(event, view, record) {
        $('p.sticky').hide();
        $('#sv_survey_link').hide();
        $('#view_4929 form').submit()
    });
    $(document).on('knack-form-submit.view_4930', function(event, view, record) {
        $('p.sticky').hide();
        $('#sv_survey_link').hide();
        $('#view_4929 form').submit()
    });
    //view_4929
    $(document).on('knack-form-submit.view_4929', function(event, view, record) {
       $('.close-modal').click()
    });
    
    //view_4954 make the modal bigger
    $(document).on('knack-view-render.view_4954', function(event, view, record) {
    //    $('#kn-modal-bg-0 .kn-modal').css('width', '70%');
       $('#kn-modal-bg-0 .kn-modal').addClass('wide-modal');
       $($('#view_4954').parents()[0]).addClass('sv-modal-survey-first-column')
      $('#kn-modal-bg-0 .kn-container').removeClass('kn-container')
      $('#kn-scene_1324').css('max-width', '100% !important')
      $($($('.sv-modal-survey')[0]).parents()[1]).addClass('sv-custom-header');
    //   $('#sv_quarter_year').html('Q1 2022')
    });
    
    //view_4958 Survey Control Panel
    $(document).on('knack-view-render.view_4958', function(event, view, data){
       $('#view_4958').hide();
    });
    
    //view_4958 Survey Control Panel
    $(document).on('knack-view-render.view_3810', function(event, view, data){
        if(!isButler){
            $('#view_3810 .kn-link-3').hide()
        }else{
            // $('#view_3810 .kn-link-3').hide() //Not yet live
        }  
    });
    
    //scene_1792 Test Only
    $(document).on('knack-scene-render.scene_1792', function(event, view, data) {
        var test = Knack.session.user.profile_objects;
        var test2 = test.find(x => x.object == "object_4");
        console.log(test2);
    
    });
    
    //view_4961 Verify Butler Timeclock https://builder.sv.knack.com/apps/trashdash/pages/scene_1799
    $(document).on('knack-view-render.view_4961', function(event, view, data){
        console.log(data);
        $('.level').hide();
        $('.field_55').hide();
        for (let i = 0; i < data.length; i++) {
        //   var serviceFilter = [{"field":"field_119", "operator":"is", "value":data[i].id}]
        //   var test = getButlerTimeclock(serviceFilter, i);
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
    
    
    // function getButlerTimeclock(serviceFilter, j) {
    function getButlerTimeclock() {
      return $.ajax({
        type: 'GET',
        headers: asHeader,
        url: 'https://api.sv.knack.com/v1/pages/scene_1799/views/view_4962/records',
        // url: 'https://api.sv.knack.com/v1/objects/object_18/records',
        success: function(data) {
                  console.log(data, "serviceFilter")
                var records = data.records;
                for (let i = 0; i < records.length; i++) {
                    for (let j = 0; j < $('.sv-butler-assigned').length; j++) {
                        if( $($('.sv-butler-assigned')[j]).attr('service-id') == records[i].field_119_raw[0].id ){
                            //  $($('.sv-butler-assigned')[j]).append('This is the service id')
                            var clockOutValue, clockOutPic;
                            var notClockOut = false;
                            // clockOutValue = (!records[i].field_114_raw.hours) ? return `Clock Out At ${records[i].field_114_raw.hours}:${records[i].field_114_raw.minutes}` : `Not Clocked Out`;
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
                            // if(notClockOut){
                            //     $($('.sv-butler-assigned')[j]).find(`[butler-id=${records[i].field_112_raw[0].id}]`).append(timeClockImage).find(`[class='as-warning-butler sv-checked']`).hide();
                            // }else{
                            //     $($('.sv-butler-assigned')[j]).find(`[butler-id=${records[i].field_112_raw[0].id}]`).append(timeClockImage).find(`[class='as-warning-butler sv-checked']`).show();
                            // }
                            
                        }
                    }
                }
            }
      });
    }
    
    //view_4982
    $(document).on('knack-view-render.view_4982', function(event, view, data){
        $('#view_4982 button').on('click', function(){
            $('.close-modal').click()
            $('#view_4985 form').submit()
            $('#view_4987 form').submit()
        })
    });
    
    //view_4985 Dismissed By Form
    $(document).on('knack-view-render.view_4985', function(event, view, data){
        console.log('New PopUp')
        $($('#view_4985').parents()[1]).addClass('hideMe')
        var currentCMRoles = Knack.session.user.profile_objects;
        var currentCMId = currentCMRoles.find(x => x.object == "object_5").entry_id;
        var takenBy = [currentCMId]
        if( $('#view_4985-field_2379').val() == null || !($('#view_4985-field_2379').val()).includes(currentCMId) ){
            var messageLink = window.location.href+ '/community-details3/';
            window.location.href = messageLink;
            console.log('NOT INCLUDES')
        }
        takenBy.push($('#view_4985-field_2379').val());
        $('#view_4985-field_2379').val(takenBy).trigger("liszt:updated");
    });
    //view_4987
    // $(document).on('knack-view-render.view_4987', function(event, view, data){
    //     $($('#view_4987').parents()[1]).addClass('hideMe')
    //     if(data.field_2440 != "Yes"){ //DELETED FIELD
    //         var messageLink = window.location.href+ '/community-details3/';
    //         window.location.href = messageLink
    //     }
    // });
    
    // //view_3568
    $(document).on('knack-view-render.view_3568', function(event, view, data){
          //     var userProfKeys = Knack.session.user.profile_keys;
          //     if(userProfKeys.includes('profile_34')){
          //         $('#view_3568 button').addClass('hideMe')
          //         $($('#survey_submit_comment').parents()[1]).removeClass('hideMe');
          //         $('#survey_submit_comment').hide();
          //         $('#survey_submit').html('Submit');
          
          //         $('input[type=radio]').on('click', function(){
          //             $('#view_3568 button').addClass('hideMe')
          //             $($('#survey_submit_comment').parents()[1]).removeClass('hideMe');
          //             if( $($('input[type=radio]')[1]).is(':checked') ){
          //                 $('#survey_submit').html(`No, I'll submit it as is`)
          //                     $('#survey_submit_comment').show();
          //                     $('#kn-input-field_1425').addClass('hideMe');
          //             }
          //             else{
          //                     $('#survey_submit_comment').hide();
          //                     $('#kn-input-field_1425').hide()
          //                     $('#survey_submit').html(`Submit`);
                              
          
          //             }
          //         });
          
          //         $('#survey_submit_comment').on('click', function(){
          //             $('#kn-input-field_1425').removeClass('hideMe');
          //             $($('#survey_submit_comment').parents()[1]).addClass('hideMe');
          //             $('#view_3568 button').removeClass('hideMe')
          //         })
          
          //         $('#survey_submit').on('click', function(){
          //             $('#view_3568 form').submit()
          //         })
                  
          //     }
          
            // var userProfKeys = Knack.session.user.profile_keys;
            // if(userProfKeys.includes('profile_34')){
            // $('#')
                $('#view_3568 button').addClass('hideMe')
            // }
    });
    //Knack.showSpinner();
    //view_5023
    $(document).on('knack-view-render.view_5023', function(event, view, data){
        $('#sv_rating_hidden').append(`<textarea class="kn-textarea hideMe" id="field_1425_new" name="field_1425"></textarea>`)
        $('#survey_submit_1').on('click', function(){
            console.log('survey_submit_1')
            $('#survey_submit_1').hide()
            if( $($('input[type=radio]')[1]).is(':checked') && $('#field_1425').val() == ''){
                $('#view_3568').addClass('hideMe');
                $('#sv_rating_hidden').removeClass('hideMe')
            }else{
                $('#view_3568 form').submit();
                // Knack.showSpinner();
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
    
    //view_5039
    $(document).on('knack-view-render.view_5039', function(event, view, data){
       $('#sv_show_popup').click();
       $($('#view_5039').parents()[0]).hide();
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
    
    
    const butler_service = ['scene_1904', 'scene_8','scene_7','scene_38','scene_274','scene_42','scene_50','scene_613','scene_427','scene_951','scene_43','scene_286','scene_51','scene_52','scene_950']
    $(document).on('knack-scene-render.any', function(event, scene) {
      if(butler_service.includes(scene.key)){
        if($('#butler_service_ui').length === 0){
          $('head').append('<link rel="stylesheet" type="text/css" id="butler_service_ui" class="lazyload" href="https://strategic-visionz.github.io/knack-css/scss/Butler%20Service%20Process%20Theme1.0.0.min.css">')
        }
      }
      else{
        if($('#butler_service_ui').length > 0){
          $('#butler_service_ui').remove();
        }
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
    
    //POPUP Functionality
    //Description
    //view_5058
    $(document).on('knack-view-render.view_5101', function(event, view, data){
        var currentUrl = window.location.href;
        var currentCMRoles = Knack.session.user.profile_objects;
        var currentCMId = currentCMRoles.find(x => x.object == "object_5").entry_id;
        $('#sv_cm_popups').click(()=>{
            window.location.href = currentUrl + 'cm-active-popups/' + currentCMId;
        })
    
        // return $.ajax({
        //     type: 'GET',
        //     headers: asHeader,
        //     url: 'https://api.sv.knack.com/v1/pages/scene_1253/views/view_5080/records',
        //     success: function(res) {
        //         console.log(res, "view_5101");
        //         // if(res.field_2488_raw.length > 0){
        //         //     $('#sv_cm_popups').click();
        //         // }
        //     }
        // });
    });
    
    // //view_5077
    // $(document).on('knack-view-render.view_5077', function(event, view, data){
    //     console.log(data);
    //     var currentCMRoles = Knack.session.user.profile_objects;
    //     var currentCMId = currentCMRoles.find(x => x.object == "object_5").entry_id;
    //     var upData = {"field_2468": 'TADASDS'}
    //     for (let i = 0; i < data.length; i++) {
    //         var allCM;
    //         if(data[i].field_2506_raw){
    //             allCM = data[i].field_2506_raw;
    //             for (let j = 0; j < allCM.length; j++) {
    //                 if(allCM[j].id == currentCMId){
    //                     $($('#view_5077 .kn-list-item-container')[i]).hide();
    //                 }
    //             }
                
                
    //         }
    //         var dismissedBy = data[i].field_2506_raw.map((b) => {return b.id})
    //             if(!dismissedBy.includes(currentCMId)){
    //                 dismissedBy.push(currentCMId)
    //             }
    //         console.log(i, dismissedBy, "dismissedBy")
    //         $($('.sv_add_cm_dismissed')[i]).on('click', function(){
    //                 KnackApi.UpdateObject('object_126', data[i].id, {"field_2506": dismissedBy}).then((results) => {
                    
    //                     // Knack.views.view_5077.model.fetch();
    //                 });
    
    //                     $($('#view_5077 .kn-list-item-container')[i]).hide();
    //         })
    //     }
        
    // });
    
    //
    var popUpOpen = false;
    //view_5102
    // $(document).on('knack-view-render.view_5102', function(event, view, data){
    //     console.log(data, 'views data')
    //     var inFieldSched = [];
    //     var currentCMRoles = Knack.session.user.profile_objects;
    //     var currentCMId = currentCMRoles.find(x => x.object == "object_5").entry_id;
    //     if(data.field_2489_raw){
    //        inFieldSched = data.field_2489_raw.map((b) => {return b.id})
    //     }
    //     var globalSched;
    //     return $.ajax({
    //         type: 'GET',
    //         headers: asHeader,
    //         url: 'https://api.sv.knack.com/v1/pages/scene_1253/views/view_5107/records',
    //         success: function(res) {
    //             console.log(res, 'view_5102 Global Popup Data');
    //             var records = res.records
    //             globalSched = records.map((b) => {return b.id});
    //             var newActiveSched = globalSched.concat(inFieldSched)
    //             newActiveSched = newActiveSched.filter((e, i, a) => a.indexOf(e) === i);
    //             var addToCMActiveField = globalSched.filter(n => !inFieldSched.includes(n))
    //             if(addToCMActiveField.length > 0){
    //                 updateCommunitysActiveField(data.id, newActiveSched, addToCMActiveField)
    //             }else{
    //                 KnackApi.GetObject('object_5', currentCMId).then((resu) => {
    //                     if(resu.field_2488 != '' && resu.field_2488_raw.length > 0){ console.log(res, "resuresuresuresu")
    //                        if( checkActivePopup(resu.field_2488_raw) ){
    //                            const myTimeout = setTimeout(()=>{$('#sv_cm_popups').click();}, 5000);
    //                            popUpOpen = true;
    //                        } 
    //                     }
    //                 });
    //             }
    //         }
    //     });
    
    
    // });
    
    // function updateCommunitysActiveField(comID, newActiveSched, addToCMActiveField){
    //     KnackApi.UpdateObject('object_8', comID, {"field_2489": newActiveSched}).then((results) => {
    //         var comManagers = results.field_43_raw.map((b) => {return b.id});
    //         updateLoggedCMActivePopupField(addToCMActiveField, comManagers)
    //         console.log('updateCommunitysActiveField function', results)
    //     });
    // }
    
    // function updateLoggedCMActivePopupField(addToCMActiveField, comManagers){
    //     console.log(addToCMActiveField, comManagers, "comManagers")
    //     var newCMActiveSched;
    //     for (let i = 0; i < comManagers.length; i++) {
    //         KnackApi.GetObject('object_5', comManagers[i]).then((res) => {
    //             newCMActiveSched = addToCMActiveField.concat(res.field_2488_raw);
    //             KnackApi.UpdateObject('object_5', comManagers[i], {"field_2488": newCMActiveSched}).then((results) => {
    //                 console.log('updateLoggedCMActivePopupField All is well', results)
    //                 if(i == (comManagers.length - 1)  && !popUpOpen){
    //                     const myTimeout = setTimeout(()=>{$('#sv_cm_popups').click();}, 5000);
    //                     popUpOpen = true;
    //                 }
    //             });
    //         }); 
    //     }
       
    // }
    
    $(document).on('knack-form-submit.view_5086', function(event, view, record) {
      if(record.field_2514 == 'Yes'){
          window.location.href = window.location.href + 'add-new-popup-schedule?temp-id=' + record.id;
          
      }
    });
    
    //view_5057
    $(document).on('knack-view-render.view_5057', function(event, view, data){
        function getUrlParameter(name) {
            name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
            var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
            var results = regex.exec(location.href);
            return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, '    '));
        };
        if(getUrlParameter('temp-id')){
            const myInterval = setInterval(addTempIDtoField, 1000);
            function addTempIDtoField() {
                if($('#view_5057-field_2478').val() == ''){
                    $('#view_5057-field_2478').val(getUrlParameter('temp-id')).trigger("liszt:updated");
                }else{
                    clearInterval(myInterval);
                }
            }   
        }
    });
    
    //view_5057
    $(document).on('knack-form-submit.view_5057', function(event, view, record) {
      if(record.field_2487 == 'Targeted'){
          //Get the Communities - https://builder.sv.knack.com/apps/trashdash/schema/list/objects/object_126/fields/field_2482/settings/
          //All CMs and Active Popup
          //Update the Community Active Popups, add this Popup to to Active Popup
          var newComActiveSched;
          var newComActiveSchedCM;
          var targetedSched = [record.id];
          var comIds = record.field_2482_raw.map((b) => {return b.id})
          console.log(comIds);
          for (let j = 0; j < comIds.length; j++) {
                Knack.showSpinner(`Updating Targeted Communities' ${comIds[j]} Active Popups`);
                KnackApi.GetObject('object_8', comIds[j]).then((res) => {
                    var comManagers = res.field_43_raw.map((b) => {return b.id});
                    newComActiveSched = targetedSched.concat(res.field_2489_raw);
                    console.log('GetObject object_8 Community', comIds[j], res, comManagers, "comManagers")
    
                    //Update Community Active Popup , add this Popup to to Active Popup
                    KnackApi.UpdateObject('object_8', comIds[j], {"field_2489": newComActiveSched}).then((results) => {
                        console.log(results, comIds[j])
                    });
    
                    //Update this Community's CMs - Add the Active Popup;
                    Knack.showSpinner(`Updating Targeted Communities' ${comIds[j]} Community Managers`);
                    for (let i = 0; i < comManagers.length; i++) {
                        KnackApi.GetObject('object_5', comManagers[i]).then((resu) => {
                            newComActiveSchedCM = targetedSched.concat(resu.field_2488_raw);
                            console.log('GetObject object_5 CM', comManagers[i], resu)
                            KnackApi.UpdateObject('object_5', comManagers[i], {"field_2488": newComActiveSchedCM}).then((result) => {
                                console.log('Targeted Sched Table - Updat CM data - Active Popups', result, comManagers[i])
                                Knack.hideSpinner();
                            });
                        });
                    }
                    
            });
            
        }
          
      }
    });
    
    function checkActivePopup(cmPop){//Chck the logged CM and the Current Community's active popup
        var communityActivePopups = (Knack.views.view_5102.model.attributes.field_2489_raw).map((b) => {return b.id});
        var commonPopup = [];
        console.log('checkActivePopup')
        for (let i = 0; i < cmPop.length; i++) {
           if( communityActivePopups.includes(cmPop[i].id) ){ return true; break; }
            // commonPopup.push(cmPop[i].id);
        }
    }
    
    
    // //view_4070 View Bsed API test
    // $(document).on('knack-view-render.view_4070', function(event, view, data){
    //    KnackViewApi.GetObjects('scene_1789', 'view_4911', {}).then((res) => {
    //        console.log('view_4070 View Bsed API test', res)
    //     });
    // });
    
    
    //view_3238 Highligh Icon when clicked DEV
    $(document).on('knack-view-render.view_3238', function(event, view, data){
        $('#view_3238 input[type=radio]').on('click', function(){
            $($(this).parents()[1]).addClass('sv-icon-highlight')
            $($($(this).parents()[1]).siblings()[0]).removeClass('sv-icon-highlight')
        })
    });
    
    
    //view_3238 DEV
    $(document).on('knack-form-submit.view_3238', function(event, view, record) {
        // console.log(record, "popo")
        if( record.field_2793 != '' ){ // if Butler Timeclock Thumbs Up/Down is not blank, insert a record to the Butler Service Ratings
            KnackViewApi.SaveObject('scene_1206', 'view_5177', { 'field_2796' : record.id }).then((res) => {
            console.log('view_3238 View Bsed API test', res)
            });
        }
    });
    
    //view_5278 Community Flyer PDF Version 2022
    $(document).on('knack-view-render.view_5278', function(event, view, data){
      console.log(data)
      var pdfView = `<div style="width:90%; margin: auto; margin-top: 20px">
      <button class="delete close-modal" id="sv_pdf_close"><i class="fa fa-close" style="font-size:24px"></i></button>
      <iframe src="${data.field_2904_raw}" width="100%" height="600" style="border:none;"></iframe>
      </div>`
      $('#kn-modal-bg-0').append(pdfView)
      // $('.modal-card-body').hide()
      $('.kn-modal').hide()
      $('#sv_pdf_close').on('click', function(){
        $('.close-modal').click();
      })
    
    });
    
    //view_5054 Highligh Icon when clicked 
    $(document).on('knack-view-render.view_5054', function(event, view, data){
        // var currentRoles = Knack.session.user.profile_objects;
        // var rolesObject = currentRoles.map((b) => {return b.object})
        // if( rolesObject.includes('object_34') ){
        //     $("#kn-input-field_2793").removeClass('hideMe'); //Thumbs Up/Down
        //     $("#kn-input-field_2795").removeClass('hideMe'); //Feedback
        // }
        $('#view_5054 input[type=radio]').on('click', function(){
            $($(this).parents()[1]).addClass('sv-icon-highlight')
            $($($(this).parents()[1]).siblings()[0]).removeClass('sv-icon-highlight')
        })
    });
    
    
    //view_5054
    $(document).on('knack-form-submit.view_5054', function(event, view, record) {
        // console.log(record, "popo")
        // var currentRoles = Knack.session.user.profile_objects;
        // var rolesObject = currentRoles.map((b) => {return b.object})
        // if( rolesObject.includes('object_34') ){
           if( record.field_2793 != '' ){ // if Butler Timeclock Thumbs Up/Down is not blank, insert a record to the Butler Service Ratings
                KnackViewApi.SaveObject('scene_950', 'view_5183', { 'field_2796' : record.id }).then((res) => {
                console.log('view_5054 View Bsed API test', res)
                });
            }
        // }
    });
    
    
    
    // //view_3588
    // $(document).on('knack-view-render.view_3588', function(event, view, data){
    //     console.log('getDeviceData', getDeviceData())
    // });
    
    // $(document).on('knack-form-submit.view_5047', async function(event, view, record) {
    //   await $.ajax(
    //         {
    //         url:"https://process.svweb.dev/webhook/11891acb-b4a4-4470-a6e2-7f8b49a2df7f",
    //         type:'POST',
    //         data: {json: JSON.stringify(record)},
    //         dataType: 'json'
            
    //         }
    //         )
    // });
    
    // $(document).on('knack-form-submit.view_5191', async function(event, view, record) {
    //   await $.ajax(
    //         {
    //         url:"https://process.svweb.dev/webhook/11891acb-b4a4-4470-a6e2-7f8b49a2df7f",
    //         type:'POST',
    //         data: {json: JSON.stringify(record)},
    //         dataType: 'json'
            
    //         }
    //         )
    // });
    
    //view_5175 Add Identifier to Butler Service Ratings > Butler Timeclock Connection
    $(document).on('knack-view-render.view_5175', async function(event, view, data) {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            if(data[i].field_2796 == ""){
                // console.log(data[i].field_2796_raw[0].id)
                setTimeout(correctIdentifier(i), (i*1000) + 1000);
            }
        }
        function correctIdentifier(i){
            var timeclockId = data[i].field_2796_raw[0].id
            return $.ajax({
                type: 'PUT',
                headers: asHeader,
                url: 'https://api.sv.knack.com/v1/pages/scene_1888/views/view_5176/records/'+data[i].id,
                data: {
                    field_2796: ["61eedf067fb8fb0775ed6bfe"]
                },
                success: function(res) {
                    console.log(res, "field_2796_raw", timeclockId)
                    return $.ajax({
                        type: 'PUT',
                        headers: asHeader,
                        url: 'https://api.sv.knack.com/v1/pages/scene_1888/views/view_5176/records/'+data[i].id,
                        data: {
                            field_2796: [timeclockId]
                        },
                        success: function(res) {
                            console.log(res, "field_2796_raw", timeclockId)
                        }
                    });
                }
            });
        }
        
    
        //scene_1888
        
    });
    
    //view_5176 Update Butler Service Rating to add the Identifier
    
    //view_3754
    $(document).on('knack-view-render.view_3754', function(event, view, data){
        $('#kn-scene_1253').removeClass('group-layout-wrapper')
    });
    
    //view_3369 //My Communities
    $(document).on('knack-view-render.view_3369', function(event, view, data){
        $($('.kn-info-bar')[0]).addClass('show-breadcrumbs')
        $($('.show-breadcrumbs')[0]).removeClass('kn-info-bar');
        var t = 1;
        const myInterval = setInterval(myTimer, 1000);
        function myTimer() {
            if(($($('.show-breadcrumbs')[0]).attr('style')).includes('none')){
                $($('.show-breadcrumbs')[0]).removeClass('kn-info-bar');
                $($('.show-breadcrumbs')[0]).css('display', 'block');
            }else{
                clearInterval(myInterval);
            }
            t = t+1;
            if(t>10){ clearInterval(myInterval) }
            // console.log(t,"time")
        }
    
    });
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
                console.log($('#view_5208-field_2877').val())
                //scene_1902/views/view_5212
                KnackViewApi.GetObject('scene_1902', 'view_5212', $('#view_5208-field_2877').val(), {}).then((res) => {
                    console.log('KnackViewApi Butler Popup', res)
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
        console.log('Test')
        $('#view_5214_field_2478_chzn li').on('click', function(){ 
            console.log('Clicked')
            if($('#view_5214-field_2478').val() != ''){
                console.log($('#view_5214-field_2478').val())
                //scene_1902/views/view_5212
                KnackViewApi.GetObject('scene_1902', 'view_5212', $('#view_5214-field_2478').val(), {}).then((res) => {
                    console.log('KnackViewApi Butler Popup', res)
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
    
    var allDismissedB;
    var allLive = [];
    // view_5223
    $(document).on('knack-view-render.view_5223', async function(event, view, data){
        $('#kn-scene_7 .view-group-4').addClass('hideMe')
        var userProfKeys = Knack.session.user.profile_keys;
        var isDev = userProfKeys.includes('profile_34');
        // if(userProfKeys.includes('profile_34')){
        //     allLive = Knack.views.view_5039.model.data.map((b) => {return b.id})
        // }else{
        //    allLive = Knack.views.view_5242.model.data.map((b) => {return b.id})
        // }
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
          console.log('allLive', allLive, 'allDismissedB', allDismissedB)
        
          for (let i = 0; i < allLive.length; i++) {
            if( !allDismissedB.includes(allLive[i]) ){ 
              // addBootstrapCarousel()
              $($('#view_5218 .kn-link')[0]).find('span').click();
              console.log( allLive[i], "not included" )
              break;
            }
          }
        }
    });
    
    function addBootstrapCarousel(){
      console.log("addBootstrapCarousel")
      // if( $('#sv_carousel_bs').length == 0 ){
      //       var sv_car = `<link class="lazyload" id="#sv_carousel_bs" rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">`;
      //       $('head').append(sv_car);
      //       $('body').append(`<script class="lazyload" src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
      //   <script class="lazyload" src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
      //   <script class="lazyload" src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>`)
      //       // $('body').append(`<script class="lazyload" src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>`)
      //       // $('body').append(`<script class="lazyload" src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>`)
      // }
    }
    
    //view_5219
    $(document).on('knack-view-render.view_5219', async function(event, view, data){
      // addBootstrapCarousel()
      if( $('.sv_carousel_bs').length == 0 ){
        var sv_car = `<link class="sv_carousel_bs" rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">`;
        $('head').append(sv_car);
        // $('head').append(`<script class="lazyload" src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>`)
        $('head').append(`<script class="lazyload" src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>`)
        $('head').append(`<script class="lazyload" src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>`)
      }
      redirectToButlerPageIfNotModal()
      console.log(data)
      var userProfKeys = Knack.session.user.profile_keys;
      var isDev = userProfKeys.includes('profile_34');
      $($('#view_5219').parents()[1]).hide()
      $('.field_2648').hide();
      try{ 
        //  $('#sv_notice_title').html(data[0].field_2648)
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
      console.log("allDismissedB", allDismissedB)
      function getNotDismissed(){
          for (let i = 0; i < data.length; i++) {
            if( !allDismissedB.includes( data[i].id ) ){
              if( isDev ){ notDismissed.push(data[i]) }
              else{
                if( !data[i].field_2881_raw){
                  notDismissed.push(data[i])
                }
              }
              console.log("notDismissed", notDismissed)
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
      //  await createPopup(notDismissed, "scene_1904")
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
                  console.log(res, "updateButlerDismissedPopup", allDismissed)
              }
        });
    }
    
    function addButtonFunction(){
      $('.sv_dont_show').on('click', function(){
          // var allDismissed = $('#view_5223-field_2892').val();
          // allDismissed.push( $(this).attr('data-id') )
          // $('#view_5223-field_2892').val(allDismissed)
          // console.log( allDismissed, "allDismissed", "data-id", $(this).attr('data-id') )
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
         console.log('TEST')
      }
    }
    
    // view_68 Butler Today's Services
    $(document).on('knack-view-render.view_68', function(event, view, data){
      var label = `<p><span class="kn-detail-label">
                  <span style="font-weight: bold;">Community Entry Gate Code</span>
                </span></p>`
      for (let i = 0; i < data.length; i++) {
        $($('tbody .field_938')[i]).prepend(label)
      }
    
      $("#view_68 tr").click(function() {
          //var redirectTo = $(this).find("a").attr("href") + '?view_3397_filters=' + encodeURIComponent(JSON.stringify(filterPrev));
          window.location = $(this).find("a").attr("href");
          return false;
      });
    });
    
    
    var popupOpenB = false;
    // Updated CM Popup
    $(document).on('knack-view-render.view_5224', function(event, view, data){
        // console.log(data)
        // var inFieldSched;
        // $('#view_5224-field_2489').val() ? inFieldSched = $('#view_5224-field_2489').val() : inFieldSched = []
        // return $.ajax({
        //     type: 'GET',
        //     headers: asHeader,
        //     url: 'https://api.sv.knack.com/v1/pages/scene_1253/views/view_5107/records',
        //     success: function(res) {
        //         console.log(res, 'view_5224 Global Popup Data');
        //         var records = res.records
        //         globalSched = records.map((b) => {return b.id});
        //         var newActiveSched = globalSched.concat(inFieldSched)
        //         newActiveSched = newActiveSched.filter((e, i, a) => a.indexOf(e) === i);
        //         var addToCMActiveField = globalSched.filter(n => !inFieldSched.includes(n))
        //         console.log('addToCMActiveField',addToCMActiveField, "newActiveSched", newActiveSched)
        //         $('#view_5224-field_2489').val(newActiveSched).trigger("liszt:updated").change();
        //         if(addToCMActiveField.length > 0 ){
        //             addNewPopCMActivityLog(data.id, addToCMActiveField)
        //         }else{openPopup()}
        //     }
        // });
    });
    
    function addNewPopCMActivityLog(comId, addToCMActiveField){
        for (let i = 0; i < addToCMActiveField.length; i++) {
            setTimeout(add(i), (i*500) + 1000);
            if(i == addToCMActiveField.length-1 ){ updateCommunityActivePopup() }
        }
    
        function add(i){
            return $.ajax({
                type: 'POST',
                headers: asHeader,
                url: 'https://api.sv.knack.com/v1/pages/scene_1255/views/view_5226/records',
                data: {
                    field_2893: comId,
                    field_2895: addToCMActiveField[i]
                },
                success: function(res) {
                    console.log('addNewPopCMActivityLog', res)
                }
    
            });
        }
    }
    
    function updateCommunityActivePopup(){
        $('#view_5224 .kn-submit button').click();
    }
    
    // function openPopup(){
    //     // if(!popupOpenB){
    //     //     //open
    //     //     var currentCMRoles = Knack.session.user.profile_objects;
    //     //     var currentCMId = currentCMRoles.find(x => x.object == "object_5").entry_id;
    //     //     var visibleToCMs = Knack.views.view_5227.model.data.models[0].attributes.field_2894_raw.map((b) => {return b.id})
    //     //     if( visibleToCMs.includes(currentCMId) ){
    //     //         $($('#view_5229 .kn-link')[0]).find('span').click()
    //     //     }
    //     // }
    // }
    
    
    // view_5227
    $(document).on('knack-view-render.view_5227', function(event, view, data){
      if(data.length > 0 ){
        $('p.sticky').removeClass('hideMe');
        $('#sv_survey_link').removeClass('hideMe');
      }
    
      $('#click_survey_id').on('click', function() {
            // $('#view_survey_id').click();
            // $('p.sticky').hide();
            location.href = location.href + `popup-cm-activity-logs-in-devs/${Knack.views.view_3374.record.id}/`
        });
    });
    
    $(document).on('knack-view-render.view_3517', function(event, view, data){
      $('#click_survey_id').on('click', function() {
            // $('#view_survey_id').click();
            // $('p.sticky').hide();
            location.href = location.href + `popup-cm-activity-logs-in-devs/${Knack.views.view_3374.record.id}/`
        });
    });
    
    
    $(document).on('knack-view-render.view_5234', async function(event, view, data){
      // addBootstrapCarousel()
      // if( $('#sv_carousel_bs').length == 0 ){
      //   var sv_car = `<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js"></script><script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js"></script>`;
      //   $('body').append(sv_car);
      // }
    });
    
    // view_5003
    // $(document).on('knack-form-submit.view_5003', function(event, view, record) {
    //   Knack.router.scene_view.renderViews()
    //   if( $('#sv_audit_completed_status').length == 0 ){
    //     $('#kn-scene_1661').prepend(`<div id="sv_audit_completed_status" class="kn-view">
    //     <div class="kn-notification is-confirmation">
    //       <button class="delete"></button>
    //       <p>Your audit is now completed. You can add more photo(s) or leave this page.
    //   </p>
    //     </div>
    //   </div>`)
    //   }
    // });
    
    // view_5230
    var currentPopupLogId;
    var currentVisTo;
    $(document).on('knack-view-render.view_5230', function(event, view, data){
        // currentPopupLogId = data[0].id
        // console.log(data)
        // $('.field_2653').hide()
        // if(data[0].field_2653_raw == true){
        //     $('#view_5230').hide();
        //     createPopupContainer(data)
        // }else{
        //     $($('#view_5233').parents()[1]).remove();
        // }
        
        // $('.field_2894').hide();
        // $('.field_2648').hide();
        // $('#sv_popup_title').html(data[0].field_2648)
        // // $('#kn-scene_1904').removeClass('kn-scene').css('text-align', 'center')
        // // $('#view_5219 img').css('width', '100%')
        // var currentCMRoles = Knack.session.user.profile_objects;
        // var currentCMId = currentCMRoles.find(x => x.object == "object_5").entry_id;
        // var visTo = data[0].field_2894_raw.map((b) => {return b.id});
        // currentVisTo = visTo;
        // $($('#view_5230 .dismissed-popup')[0]).on('click', function(){
        //     visTo = $.grep(visTo, function(value) {
        //         return value != currentCMId;
        //     });
          // return $.ajax({
          //     type: 'PUT',
          //     headers: asHeader,
          //     url: 'https://api.sv.knack.com/v1/pages/scene_1907/views/view_5232/records/'+data[0].id,
          //     data: {
          //         field_2894: visTo
          //     },
          //     success: function(res) {
          //         console.log('visTovisTovisTovisTovisTo', res)
          //         $('.close-modal').click();
          //     }
    
          // });
        // })
    });
    
    function createPopupContainer(data){
        // var htmlComponent;
        // // $($('#view_5233').parents()[1]).show();
        // for (let i = 0; i < data.length; i++) {
        //     if(data[i].field_2653_raw){
        //         htmlComponent = `
        //         <div class="row">
        //             <div class="col">
        //             <p>${data[i].field_2879}<p>
        //             <h2>${data[i]["field_2896.field_2646"]}</h2>
        //             </div>
        //             <div id="q_surveyForm" class="col"></div>
        //         </div>
        //     `}
        // }
        // $('#view_5234').append( htmlComponent )
        // $('#q_surveyForm').append( $('#view_5233') )
    }
    
    // view_5233
    $(document).on('knack-form-submit.view_5233', function(event, view, record) {
      // $('.close-modal').click();
      $('#sv_dont_show_survey').click();
      $('p.sticky').addClass('hideMe');
      $('#sv_survey_link').addClass('hideMe');
    });
    
    $(document).on('knack-form-submit.view_5234', function(event, view, record) {
    var currentCMRoles = Knack.session.user.profile_objects;
    var currentCMId = currentCMRoles.find(x => x.object == "object_5").entry_id;
    var visTo = $.grep(currentVisTo, function(value) {
        return value != currentCMId;
    });
    return $.ajax({
        type: 'PUT',
        headers: asHeader,
        url: 'https://api.sv.knack.com/v1/pages/scene_1907/views/view_5232/records/'+currentPopupLogId,
        data: {
            field_2894: visTo
        },
        success: function(res) {
            console.log('visTovisTovisTovisTovisTo', res)
            $('.close-modal').click();
        }
    
    });
    });
    
    // NEW POPUP FOR COMMUNITY CONCIERGE
        var comsActivePopups = [] //Popups that will be shown
        var comsScheduledPopups = [] //Popups in the Community's Field
        var globalActivePopups = []; //All Active Global Popup
        var popupScheduleLogs = []; //This community's Popup Schedule Logs
        var popupIsOpen = false;
        var currentCommunityId = '';
        function openPopup(){
            if( !popupIsOpen ){
                // Open Popup Code
                $($('#view_5229 .kn-link')[0]).find('span').click()
                popupIsOpen = true;
            }
        }
    
        async function createPopup(data, scene_id){
            await createCarouselContainer(scene_id)
            await createACarouselSection(data)
            $($('#survey_popup .col')[1]).append( $('#view_5233') )
            if( $('#view_5233').attr('style') == "display: none;" ){
              $('#view_5233').attr('style', 'display: block;')
            }
        }
    
        // CARAOUSEL FUNCTION
            function createCarouselContainer(scene_id){
                var car = `<div id="sv_popup_carousel_container" class="carousel slide" data-ride="carousel" data-interval="false">
                <div class="carousel-inner">
                </div>
                </div>`;
                $(`#kn-${scene_id}`).append(car);
            }
            function createACarouselSection(data){
                for (let i = 0; i < data.length; i++) {
                    var url = '';
                    var isActive = '';
                    var carouselData = '';
    
                    !$('.carousel-item').hasClass('active') ? isActive = 'active' : isActive = ''
                    data[i].field_2879 ? url = data[i].field_2879_raw : url = ''
    
                    if(data[i].field_2653_raw === true){
                        carouselData = `
                        <div class="carousel-item ${isActive}">
                        <h2> ${data[i].field_2648_raw}</h2>
                        <div class="row align-items-center" id="survey_popup">
                        <div class="col">
                        <img src=${url}>
                        <div class="pop-main-con">${data[i].field_2646}</div>
                        </div>
                        <div class="col"></div>
                        </div>
                        <button id="sv_dont_show_survey" class="sv_dont_show kn-button is-primary hideMe" data-id=${data[i].id} >Don't Show This Again</button>
                        </div>`;
    
                        $('#view_5233').show()
                    }else{
                        carouselData =`
                        <div class="carousel-item ${isActive}">
                        <h2>${data[i].field_2648_raw}</h2>
                        <img src=${url}>
                        <div class="pop-main-con">${data[i].field_2646}</div>
                        <button id="sv_dont_show_${i}" class="sv_dont_show kn-button is-primary" data-id=${data[i].id} >Don't Show This Again</button>
                        </div>`;
                    }
                    $('#sv_popup_carousel_container .carousel-inner').append(carouselData);
                    
                    console.log("field_2646",data[i].field_2646,isActive, url )
                }
                $($('#survey_popup .col')[1]).append( $('#view_5233') )
                addPrevNextToCarousel(data.length)
            }
            function addPrevNextToCarousel(l){
                var prevNext = '';
                if( l > 1){
                    prevNext = ` <div id="carousel_control"><a class="carousel-control-prev" href="#sv_popup_carousel_container" role="button" data-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Previous</span>
                                </a>
                                <a class="carousel-control-next" href="#sv_popup_carousel_container" role="button" data-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Next</span>
                                </a></div>`;
                    $('#sv_popup_carousel_container').append( prevNext )
                }
            }
        // END
    
        async function initializePopup(data){
            console.log("initializePopup running")
            comsActivePopups = [];
            comsScheduledPopups = []
            globalActivePopups = [];
            popupScheduleLogs = [];
            // check if there's active Popup
            await getGlobalActivePopup().then(
            );
            await getCommunitySchedPopupField(data);
            await checkIfActiveNotInCom();
            await getPopupScheduleLog()
        
            await console.log("comsActivePopups", comsActivePopups)
            await console.log("comsScheduledPopups", comsScheduledPopups)
            await console.log("globalActivePopups", globalActivePopups)
            await console.log("popupScheduleLogs", popupScheduleLogs)
            await console.log("popupIsOpen", popupIsOpen)
        }
        function getGlobalActivePopup(){
            return $.ajax({
                type: 'GET',
                headers: asHeader,
                url: 'https://api.sv.knack.com/v1/pages/scene_1253/views/view_5107/records',
                success: function(res) {
                    var records = res.records
                    globalActivePopups = records.map((b) => {return b.id});
                }
            });
        }
        function updateCommunitySchedPopupField(){ //Update Community Scheduled Popup Fields
            console.log("updateCommunitySchedPopupField")
            return $.ajax({
                type: 'PUT',
                headers: asHeader,
                url: 'https://api.sv.knack.com/v1/pages/scene_1255/views/view_5224/records/'+currentCommunityId,
                data: {
                    field_2489: comsScheduledPopups
                },
                success: function(res) {
                    console.log(res, "updateCommunitySchedPopupField")
                }
            });
        }
    
        function combineOldAndNewScheds(){
            var newActiveSched = globalActivePopups.concat(comsScheduledPopups)
            newActiveSched = newActiveSched.filter((e, i, a) => a.indexOf(e) === i);
        }
    
        async function createPopupScheduleLog(id){
            console.log("createPopupScheduleLog", id)
            return $.ajax({
                    type: 'POST',
                    headers: asHeader,
                    url: 'https://api.sv.knack.com/v1/pages/scene_1255/views/view_5226/records',
                    data: {
                        field_2893: currentCommunityId,
                        field_2895: id
                    },
                    success: function(res) {
                        console.log(res, "createPopupScheduleLog")
                    }
    
            });
        }
    
        function getCommunitySchedPopupField(data){
            if(data.field_2489_raw){ comsScheduledPopups = data.field_2489_raw.map((b) => {return b.id}); }
            // else{ comsScheduledPopups = [] }
            
        }
    
        async function getPopupScheduleLog(){
        await refreshData()
        }
    
        function updatePopupScheduleLog(){}
    
        async function checkIfActiveNotInCom(){
            var updateCom = false;
            console.log("checkIfActiveNotInCom")
            if( globalActivePopups.length > 0 ){
                function add(){
                    for (let i = 0; i < globalActivePopups.length; i++) {
                        if( !comsScheduledPopups.includes(globalActivePopups[i]) ){
                            updateCom = true;
                            createPopupScheduleLog( globalActivePopups[i] )
                            comsScheduledPopups.push( globalActivePopups[i] )
                        }
                    }
                }
                await add()
                if(updateCom){
                    await updateCommunitySchedPopupField()
                }
            }
        }
    
        // view_5102 Community Details including the Added Popups
        $(document).on('knack-view-render.view_5102', function(event, view, data){
            currentCommunityId = data.id
            initializePopup(data)
        });
    
        // view_5230 CM Popup Log connected to the Logged in CM
        $(document).on('knack-view-render.view_5230', async function(event, view, data){
            $($('#view_5230').parents()[1]).addClass('hideMe')
            $('#view_5233').hide()
            console.log(data,"CM Popup Log connected to the Logged in CM")
            await createPopup(data, "scene_1906")
            await addButtonFunctionCom()
        });
        // TO optimize
        function addButtonFunctionCom(){
          $('.sv_dont_show').on('click', function(){
              var popLogId = $(this).attr('data-id')
              var currentCMRoles = Knack.session.user.profile_objects;
              var currentCMId = currentCMRoles.find(x => x.object == "object_5").entry_id;
              var stillVisibleTo = (Knack.views.view_5230.model.data.models[0].attributes.field_2894_raw).map((b) => {return b.id})
              var newVistibleTo = stillVisibleTo.filter(item => item !== currentCMId)
              $($(this).parents()[0]).remove()
              $($('.carousel-item')[0]).addClass('active')
              
              updatePopLogCM(popLogId, newVistibleTo)
              if( $('.carousel-item').length === 0 ){
                  $('.close-modal').click()
              }
    
              if( $('.carousel-item').length == 1 ){
                $('#carousel_control').remove()
              }
          });
    
          $('#sv_dont_show_survey').on('click', function(){//Redundant
              var popLogId = $(this).attr('data-id')
              var currentCMRoles = Knack.session.user.profile_objects;
              var currentCMId = currentCMRoles.find(x => x.object == "object_5").entry_id;
              var stillVisibleTo = (Knack.views.view_5230.model.data.models[0].attributes.field_2894_raw).map((b) => {return b.id})
              var newVistibleTo = stillVisibleTo.filter(item => item !== currentCMId)
              $($(this).parents()[0]).remove()
              $($('.carousel-item')[0]).addClass('active')
              
              updatePopLogCM(popLogId, newVistibleTo)
              if( $('.carousel-item').length === 0 ){
                  $('.close-modal').click()
              }
    
              if( $('.carousel-item').length == 1 ){
                $('#carousel_control').remove()
              }
          });
        }
    
        function updatePopLogCM(popLogId, newVistibleTo){
          return $.ajax({
            type: 'PUT',
            headers: asHeader,
            url: 'https://api.sv.knack.com/v1/objects/object_148/records/'+popLogId,
            data: {
                field_2894: newVistibleTo
            },
            success: function(data) {
                console.log(data, "this is from the updatePopLogCM return data");
                // Knack.hideSpinner();
                // $('.close-modal').click();//added by Josh
          }
          });
        }
    
        async function refreshData(){
            await Knack.views.view_5227.model.fetch()
            await getData();
            function getData(){
                $(document).on('knack-view-render.view_5227', function(event, view, data){
                    popupScheduleLogs = data
                    console.log(data)
                    if(data.length > 0){
                        openPopup()
                    }
                });
            }
            await console.log(popupScheduleLogs, "popupScheduleLogs refreshData")
        }
    
    // END NEW POPUP FOR COMMUNITY CONCIERGE
    
    //GLITCH CODES //
    
    
    $(document).on('knack-view-render.view_5281', function(event, view, data) {
       $('#send_winner_sms').click(function(){
           alert('its working!');
       });
      
    });
    
    
    var removeImageOverlayArray = [
      {
        view_id: "view_3370", //My Communities
        fields: [
          {
            field_id: "field_296",
          },
        ],
      },
      {
        view_id: "view_3374", //Dashboard > Community Details
        fields: [
          {
            field_id: "field_296",
          },
        ],
      },
      {
        view_id: "view_3376", //Dashboard >Infractions
        fields: [
          {
            field_id: "field_614",
          },
          {
            field_id: "field_615",
          },
        ],
      },
      {
        view_id: "view_3557", //Infractions
        fields: [
          {
            field_id: "field_614",
          },
          {
            field_id: "field_615",
          },
        ],
      },
      {
        view_id: "view_3677", //Infractions Details
        type: "details_2",
        fields: [
          {
            field_id: "field_614",
          },
          {
            field_id: "field_615",
          },
        ],
      },
      
      {
        view_id: "view_3456", //Dashboard - Infractions Details
        fields: [
          {
            field_id: "field_614",
          },
          {
            field_id: "field_615",
          },
        ],
      },
      
      {
        view_id: "view_3588", //RADAR Logs
        fields: [
          {
            field_id: "field_604",
          },
          {
            field_id: "field_605",
          },
        ],
      },
      {
        view_id: "view_3484", //RADAR Logs Details
        fields: [
          {
            field_id: "field_604",
          },
          {
            field_id: "field_605",
          },
        ],
      },
      
      {
        view_id: "view_3497", //Dashboard -> RADAR Logs Details
        fields: [
          {
            field_id: "field_604",
          },
          {
            field_id: "field_605",
          },
        ],
      },
    
      {
        view_id: "view_3412", //RADAR Logs
        type: "details_1",
        fields: [
          {
            field_id: "field_296",
          }
        ],
      },
      
       {
        view_id: "view_3620", //Service Hazzard details
        type: "details_1",
        fields: [
          {
            field_id: "field_620",
          }
        ],
      },
      
      {
        view_id: "view_3525", //Support Ticket Details
        type: "details_1",
        fields: [
          {
            field_id: "field_620",
          }
        ],
      },
      
      {
        view_id: "view_3570", //Compactor Before Resident Access
        // type: "details_group",
        fields: [
          {
            field_id: "field_607",
          },
        ],
      },
      
      {
        view_id: "view_3571", //Compactor Before Maintenance Access
        fields: [
          {
            field_id: "field_607",
          },
        ],
      },
      
      {
        view_id: "view_3572", // Compactor After Resident Access
        fields: [
          {
            field_id: "field_607",
          },
        ],
      },
      
      {
        view_id: "view_3573", //Compactor After Maintenance Access
        fields: [
          {
            field_id: "field_607",
          },
        ],
      },
    ];
    
    
    
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
                
    //           }else if (item.view_id == "view_3376"){
                
    //             $( "#" + data[i].id + ' img' ).attr("src", new_url);
    
    //             $( "#" + data[i].id + ' img' ).attr("data-kn-img-gallery", new_url);
                
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
    
    // TESTING THE SQL FILTER ISSUE
    
    $(document).on('knack-form-submit.view_5292', function(event, view, record) {
      console.log(record, "SQL TESTING")
      // var filter = {"match":"and","rules":[{"field":"field_54","operator":"is","value":[record.field_193_raw[0].id]},{"field":"field_46","operator":"is","value":{"all_day":false,"date":"08/23/2022"}}]}
      var filter = {
        'match': 'and',
        'rules': [
          {
            "field":"field_54",
            "operator":"is",
            'value': [record.field_193_raw[0].id]
          },
          {
            'field': 'field_46', //date
            'operator': 'is',
            "value":{
              "all_day":false,
              "date":"08/23/2022"
            }
          }
        ]
      }
      Knack.showSpinner('Getting Service ID Details');
      return $.ajax({
        type: 'GET',
        headers: asHeader,
        // url: 'https://api.sv.knack.com/v1/objects/object_9/records?filters=' + filter,
        url: 'https://api.sv.knack.com/v1/objects/object_9/records?filters=' + encodeURIComponent(JSON.stringify(filter)),
        success: function(data) {
          console.log(filter, currentServiceDate(), data, "form-submit.view_5292")
          console.log(data, "this is from the getCommunityTodayService return data");
          // assignServiceIDtoAudit(data, record)
        }
      })
    })
    
    // END TESTING THE SQL FILTER ISSUE
    
    //Deactivate Butler - Remove Connection
    $(document).on('knack-form-submit.view_5316',async function(event, view, record) {
      console.log(record, "Deactivate Butler - Remove Connection");
      var b_id = record.id;
      await getAllComAssignments(b_id)
      await removeFromServiceToday(b_id);
      await closeOrRedirect()
    })
    
    function closeOrRedirect(){
      if( $('.kn-modal').length == 0){
        history.back()
      }else{
        $('.close-modal').click();
        Knack.views.view_5312.model.fetch();
      }
      swal("Completed!", "You have successfully deactivated the user", "success");
    }
    
    function updateComAssignedButlers(b_id, c_data){
      console.log(c_data)
      var comCurrentButlers = c_data.map((b) => {return b.field_41_raw});
      for(var i = 0; i < c_data.length; i++){
        var c_ids = c_data.map((b) => {return b.id})
        var comCurrentButlersIds = (comCurrentButlers[i]).map((b) => {return b.id})
        var updatedButlers = comCurrentButlersIds.filter(item => item !== b_id)
        console.log(c_ids, comCurrentButlersIds)
        updateComAPI(c_data[i].id, updatedButlers);
      }
    }
    
    function updateServAssignedButlers(b_id, servicesData){
      console.log(servicesData)
      var servCurrentButlers = servicesData.map((b) => {return b.field_55_raw});
      for(var i = 0; i < servicesData.length; i++){
        var c_ids = servicesData.map((b) => {return b.id})
        var servCurrentButlersIds = (servCurrentButlers[i]).map((b) => {return b.id})
        var updatedButlers = servCurrentButlersIds.filter(item => item !== b_id)
        updateServAPI(servicesData[i].id, updatedButlers);
      }
    }
    
    function updateServAPI(servId, updatedButlers){
      console.log("servId", servId, "updatedButlers", updatedButlers)
      return $.ajax({
          type: 'PUT',
          headers: asHeader,
          url: 'https://api.sv.knack.com/v1/objects/object_9/records/'+servId,
          data: {
              field_55: updatedButlers
          },
          success: function(data) {
              console.log(data, "updateServAPI Successfull");
          }
        });
    }
    
    function updateComAPI(comId, updatedButlers){
      console.log("comId", comId, "updatedButlers", updatedButlers)
      Knack.showSpinner()
      return $.ajax({
          type: 'PUT',
          headers: asHeader,
          url: 'https://api.sv.knack.com/v1/objects/object_8/records/'+comId,
          data: {
              field_41: updatedButlers
          },
          success: function(data) {
              console.log(data, "updateComAPI Successfull");
              Knack.hideSpinner();
          }
        });
      // return $.ajax({
      //         type: 'PUT',
      //         headers: asHeader,
      //         url: 'https://api.sv.knack.com/v1/pages/scene_1949/views/view_5421/records/'+comId,
      //         data: {
      //             field_41: updatedButlers
      //         },
      //         success: function(data) {
      //           console.log(data, "updateComAPI Successfull");
      //           Knack.hideSpinner();
      //         }
      // });
    }
    
    
    function removeFromServiceToday(b_id){
      var servicesData = Knack.views.view_5322.model.data.models.map((b) => {return b.attributes});
      updateServAssignedButlers(b_id, servicesData); 
    }
    
    function getAllComAssignments(b_id){
      var c_data = Knack.views.view_5314.model.data.models.map((b) => {return b.attributes});
      updateComAssignedButlers(b_id, c_data);
    }
    
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
    
        // $('#view_5350')
        // console.log('TESTEST')
        var userProfKeys = Knack.session.user.profile_keys;
      // if(userProfKeys.includes('profile_34')){
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
    
    $(document).on('knack-view-render.view_5316', function(event, view, data){
      // var $('.view-header') = $('.view-header');
      $('#view_5316 [type="submit"]').prop('disabled', true);
      var ck = `<input type="checkbox" id="ischecked" class="checkTest" name="checkT">
      <label for="checkT"> I have a reviewed the following data.</label><br>`;
      $('#view_5316 form').prepend(ck);
    
      $('#ischecked').click(function() {
            if(this.checked) {
              $('#view_5316 [type="submit"]').prop('disabled', false);
            }else{
              $('#view_5316 [type="submit"]').prop('disabled', true);
            }
                   
      });
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
    
      // var userProfKeys = Knack.session.user.profile_keys;
      // if(userProfKeys.includes('profile_34')){
      //     $($('#view_4705').parents()[1]).addClass('sticky');
      //     var nav = `<div id="audit_nav" class="align-self-end">
      //     <button class="audit-nav kn-button" data-id="inProgressAudit">In Progress</button>
      //     <button class="audit-nav kn-button" data-id="noAudit30_Days">No Audit Last 30 Days</button>
      //     <button class="audit-nav kn-button" data-id="allAudits">All Audits</button>
      //     <button class="audit-nav kn-button" data-id="completedAudits">My Audits</button>
      //   </div>`;
    
      //   if( $('#audit_nav').length === 0 ){$($('#view_4705').parents()[1]).append(nav);}
    
      //   $('.audit-nav').on('click', function(){
      //     var viewId = $(this).attr('data-id')
      //     $('html,body').animate({
      //           scrollTop: $("#"+viewId).offset().top - 170 },
      //       'slow');
      //   })
      // }
    });
    
    // view_5371
    $(document).on('knack-view-render.view_5371', function(event, view, data){
      if(data.length > 1){
      $($('.kn-list-item-container')[0]).append(`<button class="audit-show audit-show btn btn-outline-success btn-block" style="font-size: .8em;"><i class="fa fa-eye"></i> VIEW MORE</button>`)
      $('#view_5371').append(`<button class="audit-hide btn btn-outline-success btn-block" style="font-size: .8em;"><i class="fa fa-eye"></i> SHOW LESS</button>`)
      $(".audit-show").hide();
      $(".audit-hide").click(function(){
        // $('.kn-list-content').hide("slow");
        // $('.kn-records-nav').hide("slow");
        $('.kn-list-item-container:not(:first)').hide('slow')
        $(".audit-show").show("fast");
        $(".audit-hide").hide("fast");
      });
    
      $(".audit-show").click(function(){
        // $('.kn-list-content').show("slow");
        // $('.kn-records-nav').show("slow");
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
      // $('#view_5377').show("slow");
      $($('.kn-list-item-container')[0]).append(`<button class="audit-show audit-show btn btn-outline-success btn-block" style="font-size: .8em;"><i class="fa fa-eye"></i> VIEW MORE</button>`)
      $('#view_5358').append(`<button class="audit-hide btn btn-outline-success btn-block" style="font-size: .8em;"><i class="fa fa-eye"></i> SHOW LESS</button>`)
      $(".audit-show").hide();
      $(".audit-hide").click(function(){
        // $('.kn-list-content').hide("slow");
        // $('.kn-records-nav').hide("slow");
        $('.kn-list-item-container:not(:first)').hide('slow')
        $(".audit-show").show("fast");
        $(".audit-hide").hide("fast");
      });
    
      $(".audit-show").click(function(){
        // $('.kn-list-content').show("slow");
        // $('.kn-records-nav').show("slow");
        $('.kn-list-item-container:not(:first)').show('slow')
        $(".audit-show").hide("fast");
        $(".audit-hide").show("fast");
      });
      }else{
        $('.audit-show').hide();
        $('.audit-hide').hide();
        // $('#view_5377').hide();
      }
    });
    
    //view_5388
    $(document).on('knack-view-render.view_5388', function(event, view, data){
      try{
        var currentButler = Knack.views.view_4861.model.attributes.field_192_raw[0].id;
        console.log(data, currentButler)
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
        console.log(data, currentButler)
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
        console.log(data, currentButler)
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
    
    // //view_5346
    // $(document).on('knack-view-render.view_5346', function(event, view, data){
    //   if( $('#swal').length === 0 ){
    //     $('head').append(`<script class="lazyload" id="swal" src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>`);
    //   }
    // });
    
    //New Radar Logs
    $(document).on('knack-form-submit.view_4744', function(event, view, record) {
         $.ajax({
                url: `https://process2.svweb.dev/webhook/radar`,
                type: "POST",
                data: record,
                success: function () {
                  console.log("New Radar Submitted: ", record);
                },
                error: function (err) {
                  console.error(err);
                  //   reject(err);
                },
          });
    });
    
    $(document).on('knack-form-submit.view_2111', function(event, view, record) {
         $.ajax({
                url: `https://process2.svweb.dev/webhook/radar`,
                type: "POST",
                data: record,
                success: function () {
                  console.log("New Radar Submitted: ", record);
                },
                error: function (err) {
                  console.error(err);
                  //   reject(err);
                },
          });
    
        
    });
    
    $(document).on('knack-form-submit.any', function(event, view, record) {
      console.log(record);
      swal("Submitted!", "", "success");
    });
    
    $(document).on('knack-view-render.view_4993', function(event, view, data) {
    
    $('.customRefresh').click(function(){
      alert('clicked!');
       Knack.views.view_4877.model.fetch()
    });
    });
    
    