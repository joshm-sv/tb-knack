
function initializeGoogleAnalytics() {
   const measurementID = 'G-3XYXWWXX44';
   if (typeof gtag === 'function') {
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
      LazyLoad.js([`https://www.googletagmanager.com/gtag/js?id=${measurementID}`], function () {
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
}

$(document).on('knack-scene-render.any', function(event, scene) {
  initializeGoogleAnalytics();
  $('.kn-modal-bg').off('click'); //Will make the modal popup uncloseable when the outside is clicked
});

/** 
 * This is a switch for determining whether to use the unpkg CDN or GitHub.
 * If `isUNPKG` is set to `true`, automatic updates from the official filepond uploader repository will be obtained using the unpkg CDN.
 * If `isUNPKG` is set to `false`, the unpkg CDN will be turned off, and the GitHub repository will be used instead. 
*/
var isUNPKG = false;
//End Switch


var KNACK_API_BASE_URL = "https://api.sv.knack.com";

/**
* Variables for the form path records - Image Uploader
*/
//var communityAuditPhotoSiteID = window.location.href.split('/')[6];

window.exifOverlays = [];

// Window Cloudinary
window.cloudinaryCredentials = {
    cloudName: 'strategicvisionz',
    unsignedUploadPreset: 'trashdash-default',
    apiKey: '594146185129859',
    apiSecret: 'URPTARoCbgIdkfvOkdU_j-u0Btw'
};

window.knackRestApiKey = '874a0c90-cbe0-11e8-bc1a-bd0ff4f2a6dd';

var canSupportClass = function() {
    try {
        eval('"use strict"; class foo {}');
        return true;
    } catch (e) {
        return false;
    }
}

KnackInitAsync = function ($, callback) {
  window.$ = $;
  window.menuIconMap = [];


  const imageUploadIntegration = () => {
    if (typeof FilePond == 'undefined') {
      return new Promise(resolve => {
        LazyLoad.css([
          'https://strategic-visionz.github.io/image-uploader/filepond/filepond.css',
          'https://strategic-visionz.github.io/image-uploader/filepond/filepond-plugin-image-preview.css',
          'https://strategic-visionz.github.io/image-uploader/dist/filepond-plugin-get-file.min.css'
        ], function () {
          LazyLoad.js([
            'https://cdn.jsdelivr.net/npm/exif-js',
            'https://strategic-visionz.github.io/image-uploader/filepond/filepond-plugin-image-crop.js',
            'https://strategic-visionz.github.io/image-uploader/filepond/filepond-plugin-image-resize.js',
            'https://strategic-visionz.github.io/image-uploader/filepond/filepond-plugin-image-transform.js',
            'https://strategic-visionz.github.io/image-uploader/filepond/filepond-plugin-file-validate-size.min.js',
            'https://strategic-visionz.github.io/image-uploader/filepond/filepond-plugin-image-exif-orientation.min.js',
            'https://strategic-visionz.github.io/image-uploader/filepond/filepond-plugin-file-validate-type.js',
            'https://strategic-visionz.github.io/image-uploader/filepond/filepond-plugin-image-preview.min.js',
            'https://strategic-visionz.github.io/image-uploader/filepond/filepond-plugin-media-preview.js',
            'https://strategic-visionz.github.io/image-uploader/filepond/filepond.min.js',
            'https://strategic-visionz.github.io/image-uploader/dist/filepond-plugin-get-file.min.js',
            'https://strategic-visionz.github.io/image-uploader/filepond/filepond-plugin-file-rename.js',
            'https://strategic-visionz.github.io/image-uploader/live/imageUploadIntegrationArray.js?v1.31',
            'https://strategic-visionz.github.io/image-uploader/live/imageuploader.js?v1.2.0.18',
            'https://strategic-visionz.github.io/image-uploader/live/filepondIntegration.js?v1.2.53'
          ], function () {
            resolve();
          });
        });
      });
    } else {
      return new Promise(resolve => {
        resolve();
      });
    }
  }

  const loadSidebar = () => {
    return new Promise((resolve) => {
      if (!Knack.isMobile()) {
        LazyLoad.css(['https://strategic-visionz.github.io/knack-css/scss/Sidebar.css'], function() {
          window.menuIconMap = {
            //Menu Name: Icon Name
            "History": "fa-history",
            "Services": "fa-server",
            "Management": "fa-life-ring",
            "Archive Pages": "fa-archive",
            "Settings": "fa-gear",
            "Help Desk": "fa-question-circle",
          };
          LazyLoad.js(['https://strategic-visionz.github.io/knack-css/scss/sidebar.js'], function() {
            resolve();
          });
        });
      } else {
        $("#app-menu-container").show();
        resolve();
      }
    });
  };
  
  const loadSlickLoader = () => {
    return new Promise((resolve) => {
      LazyLoad.css(['https://strategic-visionz.github.io/image-uploader/slickloader/slick-loader.min.css'], function() {
        LazyLoad.js(['https://strategic-visionz.github.io/image-uploader/slickloader/slick-loader.min.js'], function() {
          resolve();
        });
      });
    });
  };


  Promise.all([loadSidebar(), imageUploadIntegration(), loadSlickLoader()]).then(() => {
    callback();
  });


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
        'https://server.chhjny.com/scripts/tingle@0.15.1/tingle.min.js'
    ], function() {


    });
});





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
            'X-Knack-REST-API-KEY': "874a0c90-cbe0-11e8-bc1a-bd0ff4f2a6dd"
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
            'X-Knack-REST-API-KEY': "874a0c90-cbe0-11e8-bc1a-bd0ff4f2a6dd"
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
    restAPIkey: '874a0c90-cbe0-11e8-bc1a-bd0ff4f2a6dd',
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
    try {
        if(data.length > 0){
            $('.field_1403').hide(); //Hide the Update From TB Team field
          if(data[0].field_1403 != ""){
            var updataText = data[0].field_1403;
            var updateLength = 100;
            var trimmedUpdate = updataText.substring(0, updateLength);
            if(data[0].field_1403){$('#view_TBupdate_btn0').on('click', function(){ window.location.href = $(location).attr('href') +'updates-from-trash-butler-team/'+data[0].id })}
          	}
          	
          	var filterPrev = [{
              "field":"field_46",
              "operator":"is",
              'value': prevServiceDate()
            }]
            
            $(".kn-list-item-container").addClass("pointer");
            $("#view_3370 section").click(function() {
                window.location = $(this).find("a").attr("href");
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
    $('#view_3397').hide();
    //this will hide the rate last night btn if there no exising service last night;
  	//june 28 update, change the condition to hide if the LAST Service is Rated
  	if(data.length > 0){
      if(data[0].field_1464 == "Yes"){
          //$('#view_last_night_service_btn').addClass("hideMe");
          $('#view_last_night_service_btn').append(`&nbsp;&nbsp;&nbsp;<i style="margin-top: 5px;" class="fa fa-check-circle"></i>`);
          data[0].field_1552.includes('up') ? $('#view_last_night_service_btn').addClass('rated-icon-green') : $('#view_last_night_service_btn').removeClass('rated-icon-green') 
      }

      $('#view_last_night_service_btn').on('click', function() {
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

        var timeout = setTimeout(function() {
            let orig = $($('.kn-back-link a')[0]).attr('href');
            $("#sv-top-back a").attr("href", origLink).addClass("sv-top-back");
            $("#sv-top-back a").html(origText)
            clearTimeout(timeout);
        }, 200);
    }
}
//add href to the navbar
function addLinkToCommunityDashboard(cid) {
    appendCustomMenuBottom();
    $('.field_1629').hide();

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
    var timeout = setTimeout(function() {
        document.getElementById('custom_menu_id').style.display = 'block';
        clearTimeout(timeout);
    }, 1000);
}
//SIDE BAR
//DASHBOARD
$(document).on("knack-view-render.view_3374", function(event, view, data) {
    appendCustomMenuMain();
    addLinkToCommunityDashboard(data.id);
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
    $('#view_3374 .field_2066').hide(); $('#view_3374 .field_2067').hide(); $('#view_3374 .field_2068').hide();
    $('#view_3374 .field_578').hide(); $('#view_3374 .field_533').hide(); $('#view_3374 .field_534').hide(); 

    var contactInfo = `<div class="primary-service-contact"><span class="sv-contact-info-title">Primary Service Contact</span>
    <p class="sv-cntct-info">${data.field_2066}</p>
    <p class="sv-cntct-info">${data.field_2067}</p>
    <p class="sv-cntct-info">${data.field_2068}</p>
    </div>
    <div class="escalation-contact"><span class="sv-contact-info-title">Escalation Contact</span>
    <p class="sv-cntct-info">${data.field_578}</p>
    <p class="sv-cntct-info">${data.field_533}</p>
    <p class="sv-cntct-info">${data.field_534}</p>
    </div>
    `
    $('#cntct_info_').append(contactInfo)

    $($('#view_3374 .kn-details-group')[8]).addClass('cm-card')
    $($('#infraction_warning').parents()[5]).addClass('cm-card')
    $('#view_last_night_service_btn').css('margin-right', '10px');
    $($($('#view_3374 .sv-button-green')[1]).parents()[4]).hide()
});

//view_3749
$(document).on("knack-view-render.view_3749", function(event, view, data) {
    $('.field_1647').hide(); //On Radar Number
    var radarIcon = `<i class="fa fa-camera"></i>`;
    var noRadarText = `${radarIcon} <span>No Unit On RADAR</span>`;

    if (data.field_1647 == 0) {
        document.getElementById("on_radar_num").innerHTML = noRadarText;
    } else {
      	$('#on_radar_num').html(`${radarIcon} <span> ${data.field_1647} Units On RADAR</span>`)
    }
    //End Units On Radar Dashboard
});

var setNumberOfRadar =  $(document).on("knack-view-render.view_3670", function(event, view, data) {
    //Units On Radar Dashboard
    $('.field_1647').hide();
    var radarIcon = `<i class="fa fa-camera"></i>`;

    var noRadarText = `${radarIcon} <span>No Unit On RADAR</span>`;
    var withRadarText = `${radarIcon} <span> ${data.field_1647} Units On RADAR</span>`;

    if (data.field_1647 == 0) {
        document.getElementById("on_radar_num").innerHTML = noRadarText;

    } else {
        document.getElementById("on_radar_num").innerHTML = withRadarText;
    }
});

$(document).on("knack-view-render.view_3458", function(event, view, data) {
    appendCustomMenuMain();
    addLinkToCommunityDashboard(data.id);
    $('#com_service_history').addClass('sv-active');
});

var fromEmailOn = false;
$(document).on("knack-view-render.view_4260", function(event, view, data) {
    var comID = data.field_1500_raw[0].id
    appendCustomMenuMain();
    addLinkToCommunityDashboard( comID );
    $('#com_hazards').addClass('sv-active');
    if(!fromEmailOn && Knack.hash_parts[2] == 'addressed-service-hazards'){
      window.location.href = `${Knack.url_base}#community-concierge/community-dashboard/${comID}/?hazard_id=${data.id}`;
      fromEmailOn = true;
    }
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

//view_3473 Survey Form
$(document).on("knack-view-render.view_3473", function(event, view, data) {
    var currentServiceId = $(location).attr("href").replace(/\/\s*$/, "").split('/').pop();
    var blankValue = `<i class="fa fa-plus-circle"></i>`;
 
    if(data.field_1464 != 'Yes'){
         $('#edit-rating-id').html('Add Rating');
         $('.field_1552').hide();
    }
    $('#edit-rating-id').on('click', function() {
        window.location.href = $(location).attr('href') + 'edit-service-id4/'+currentServiceId;
    });
});

function showInfractionLoss(data) {
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
    }
  
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
        return $.ajax({
            type: 'GET',
            headers:  {
                      	'X-Knack-Application-Id': Knack.application_id,
              			'X-Knack-REST-API-Key': window.knackRestApiKey,
                      	'Authorization': Knack.getUserToken()
                },
            url: 'https://api.sv.knack.com/v1/objects/object_10/records?filters=' + encodeURIComponent(JSON.stringify(filtersIn)),
            success: function(res) {
            }
        });
    }   
  	
}

//view_3374 Show Infraction Total Loss
$(document).on("knack-view-render.view_3374", function(event, view, data) {
    showInfractionLoss(data);
    url = new URL(window.location.href);
    if ( searchParam('hazard_id') != '' ) {
     
      setTimeout(openAddressHazard, 2000)

      function openAddressHazard(){
         window.location.replace(`#community-concierge/community-dashboard/${data.id}/addressed-service-hazards/${ searchParam('hazard_id') }`)
      }
    }
});
//view_3508 Show Infraction Total Loss on Infraction Page
$(document).on("knack-view-render.view_3508", function(event, view, data) {
    showInfractionLoss(data);
});

$(document).on('knack-scene-render.scene_2086', function(event, scene) {
  $('#sv-top-back').remove();
});

//view_4930 Survey Form New Object
$(document).on("knack-view-render.view_4930", function(event, view, data) {
    var date = new Date();
    var quarter = parseInt(date.getMonth() / 3) + 1;
    var quarterInput = 'Q' + quarter;
    $('#kn-input-field_2388').addClass('hideMe')
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
        document.getElementById('cmFlyer').click()
    });
    $('#doc_cert_of_ins_btn').on('click', function() { //Certificate of Ins
        $('.field_1534 a').click();
    });
    $('#doc_holiday_flyer_btn').on('click', function() { //Holiday Flyer
        $('.field_1535 a').click();
    });
}

//view_3378 Community Documents BTN
$(document).on("knack-view-render.view_3378", function(event, view, data) {
    $('#view_3378').hide();
  	documentFunctions(data);
});

//view_3713 Community Profile Documents BTN
$(document).on("knack-view-render.view_3713", function(event, view, data) {
    $('#view_3713').addClass('hideMe');
  	documentFunctions(data);
      var cmFlyerCloudField = data.field_2904_raw;
     $('#cmFlyer').attr('href', cmFlyerCloudField )
});

$(document).on("knack-view-render.view_5243", function(event, view, data) {
    $('#kn-scene_1908').removeClass('kn-scene').removeClass('kn-container').css('text-align', 'center')
    $('#view_5243 .field_2556').hide()
  	documentFunctions(data);
    var cmFlyerCloudField = data.field_2556_raw;
    var customFlyerCloud =  `<a class="kn-button is-primary" id="cmFlyer" href="${cmFlyerCloudField}" target="_blank">Download Community Flyer</a>`
    var iframe = `<iframe src="${cmFlyerCloudField}" width="100%" height="600" style="border:none;"></iframe>`
    $('#view_5243').append(customFlyerCloud)
});

$(document).on("knack-view-render.view_2536", function(event, view, data) {
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
});

$(document).on("knack-view-render.view_1825", function(event, view, data) {
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
        //hides the ins field
        $('.field_1534').addClass('hideMe');
        //adds href to the btn
        $('#view_coi').attr("href", data.field_1534_raw.url);
        $('#view_3580').addClass('hideMe'); //form

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
 	$('#view_3557 .col-6').each(function(i) {
 		$($('#view_3557 .col-6 a')[i]).text('Request RADAR');
  });

});

//view_3456 Service History
$(document).on("knack-view-render.view_3456", function(event, view, data) {
  	for (let i = 0; i < data.length; i++) {
        var tableX = document.getElementById('view_3456').getElementsByTagName('table')[0];
        var x = tableX.rows[i + 1].cells;
        var link = location.href + '/community-request-radar/' + data[i].field_146_raw[0].id;
        try {
            x[7].innerHTML = `<a href=${link}><span>Request RADAR</span></a>`;
        } catch (err) {
            console.log(err)
        }
    }
});


//Community Profile - Schedule Indicator 
$(document).on("knack-view-render.view_3744", function(event, view, data) {
  	$('#view_3744').hide();
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
    $('#today-service-schedule').html(data.field_44);
    $('.field_44').addClass('hideMe');
});
//view_3407 Updates from TB on Dashboard
$(document).on("knack-view-render.view_3407", function(event, view, data) {
  	$('#view_updatesTB').hide();
    $('.field_1403').hide();
  	if(data.field_1403){
      var updataText = data.field_1403;
      var updateLength = 300;
      var trimmedUpdate = updataText.substring(0, updateLength);
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
    });
});
//view_3374 Community Information
$(document).on("knack-view-render.view_3374", function(event, view, data) {
    $('#ComAdd_ID').html(data.field_38);
    $('#ComPhone_ID').html(data.field_39);
    $('.field_38').addClass('hideMe');
    $('.field_39').addClass('hideMe');
  
    //hide extra column that has no data displayed - Kim APL
    $($("#view_3374 section.columns div.is-horizontal")[1]).addClass("hideMe");
});

//view_3374 Show Infraction Total Loss
$(document).on("knack-view-render.view_3374", function(event, view, data) {
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
  	if($('#view_3557')){$('#view_3557 form a').click();}
});

//Notify Resident Infraction
//view_3569
//this will refresh the Notify Resident Infraction Table when submitted
$(document).on('knack-form-submit.view_3569', function(event, view, record) {
  	if($('#view_3557')){$('#view_3557 form a').click();}
});
//view_3597
//this will refresh the Access Code Table when the edit form is submitted
$(document).on('knack-form-submit.view_3597', function(event, view, record) {
   	if($('#view_3596').length){$('#view_3596 form a').click() }//view_3719
  	if($('#view_3719').length){$('#view_3719 form a').click() }//Community Profile
  	if($('#view_3650').length){$('#view_3650 form a').click() }//view_3650 Edit Community Profile Page
});

//view_3740
//this will refresh the Access Code Table when the DELETE form is submitted
$(document).on('knack-form-submit.view_3740', function(event, view, record) {
   	if($('#view_3596').length){$('#view_3596 form a').click(); }//view_3596
  	if($('#view_3719').length){$('#view_3719 form a').click(); }//Community Profile
  	if($('#view_3650').length){$('#view_3650 form a').click(); }//view_3650 Edit Community Profile Page
  	$($('.close-modal')[0]).click();
});

//view_3516 Refresh Community Units Table when the form is submitted
$(document).on('knack-form-submit.view_3516', function(event, view, record) {
   	if($('#view_3393').length){$('#view_3393 form a').click();}//Dashboard
});

//Notify Resident Infraction this will add the placeholder content of the email
$(document).on("knack-view-render.view_3569", function(event, view, data) {
    Knack.showSpinner();
    $('#view_3569 button').prop('disabled', true);
    const myInterval = setInterval(checkIfExist, 800);

    function checkIfExist(){
      if( $('#view_3442').length === 0 ){
      }else{
        $('#view_3569 button').prop('disabled', false);
          Knack.hideSpinner();
          mainViewFunction();
          clearInterval(myInterval);
      }
    }
    
   
   function mainViewFunction(){
    $('#view_3729').hide();
  	$('#view_3569 #field_1554').hide();
  	$('#kn-input-field_614').hide();
  	$('#kn-input-field_615').hide();
  	$('#kn-input-field_338').hide();
  	var newTextArea = `<textarea class="kn-textarea" id="email_content" name="email_content"></textarea>`;
  	$('#kn-input-field_1554').append(newTextArea);
    var image1 = $('.field_614 img').attr('src') ? $('.field_614 img').attr('src') : '';
  	var image2 = $('.field_615 img').attr('src') ? $('.field_615 img').attr('src') : '';
  	image1 = data.field_614 ? `<a href=${image1} target="_blank"><img src=${image1} height="600"></a>` : '';
  	image2 = data.field_615 ? `<a href=${image2} target="_blank"><img src=${image2} height="600"></a>` : '';
  	var emailMessage;
  	var emailContent = `
      <div id="images_div"><p id="image_section"><span>${image1}</span><span>${image2}</span></p></div>
      <hr>
      <p id="content_id"></p>
    `
  if($('#view_3729 #images_div #image_section').length == 0){$('#view_3729 #images_div').append(`<p style="font-weight: bold;">Infraction Photos Documented by your Trash Butler</p><p id="image_section"><span>${image1}</span><span>${image2}</span></p>`);}
  $('#view_3569 #field_1554').val($('#view_3729').html()).change();
  $('input[name="field_1652"]').on("click", function(){
      if($('#view_3569 input[name="field_1652"]').is(':checked')){
         	$('#view_3729 #images_div').append(`<p id="image_section"><span>${image1}</span><span>${image2}</span></p>`);
         }
      else{
      		$('#view_3729 #image_section').remove()
      }
      $('#view_3569 #field_1554').val($('#view_3729').html()).change();
  });
  $('#email_content').keyup(function(){
    $('#view_3729 #content_id').html($('#email_content').val());
    document.getElementById('content_id').value = document.getElementById('email_content').value;
    $('#view_3569 #field_1554').val($('#view_3729').html()).change();
    $('#view_3569 #field_338').val($('#content_id').val()).change();

  });
   }
});

//put button view into list view data 
//by KIM
var buttonIntoListView = [
  {
    listView: "view_5467",
    buttonView: "view_3377"
  },{
      listView: "view_5448",
      buttonView: "view_3388"
  },
  {
      listView: "view_3615",
      buttonView: "view_3539"
  },
    {
      listView: "view_3393",
      buttonView: "view_3749"
  }
];

buttonIntoListView.forEach(blv => {
    $(document).on(`knack-view-render.${blv.listView}`, function(event, view, data) {
        $(`#${blv.buttonView}`).detach().prependTo(`#${blv.listView} div.view-header`);
        $(`#${blv.buttonView}`).addClass('sv-CMButtonViewInView');
        $(`#${blv.listView} div.view-header h2`).css('margin-top','0');
    });
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

function getLoggedInState(){
  return $.ajax({
    type: 'GET',
    headers: asHeader,
    url: 'https://api.sv.knack.com/v1/pages/scene_1417/views/view_4193/records/' + Knack.session.user.profile_objects[0].entry_id,
    success: function(data) {
      loggedInState.clocked_in = data.field_1179_raw
      loggedInState.clockedTime = data.field_1966
      try{
      	loggedInState.clockedDate = data.field_1966_raw.date
      }
	  catch(err){
      
      }
    }
  });
}

// This will check if the current logged in user have a butler role
var userObjectRoles;
var isButler;
var currentAppendedTheme;
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
function addImagePreview(){
  for (let i = 0; i < $('img').length; i++) {//This will makes the Multiple Image Upload Images Preview Full size image
      $($('img')[i]).attr('data-kn-img-gallery', $($('img')[i]).attr('src'))
      $($('img')[i]).wrap('<a class="kn-img-gallery" href="#"></a>');
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

//view_3925
$(document).on("knack-view-render.view_3925", function(event, view, data) {
  	$('.as_number_of_service_today').html(data.length);
  	$('#view_3925').hide();
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
//view_3974 Training Logs List Accounts connected to this Area
$(document).on("knack-view-render.view_3974", function(event, view, data) {
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

//view_4136 Create the Accordion - Community Contacts
function createAsAccordionC(view_id, j){
  var accordion = '';
  for (let i = 0; i < j.length; i++) {
     accordion = accordion + `<button class="as-accordion">`+j[i].title+`</button>
      <div class="as-panel">
      <p id=`+j[i].id+`></p>
      </div>`;
      
  }
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

//view_4170 Area Assign Butler > Community Contacts Form
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

//My Butlers
$(document).on("knack-view-render.view_4141", function(event, view, data) {
   butlerDeets(data);
  $('.field_17').hide();
  $('.field_277').hide();
});


// Community Filter Test
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
var newReviewServiceIDFilter = todayFilter.rules.concat({'field': 'field_121', 'operator': 'is','value': 'Complete'})
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

//view_3407
 $(document).on("knack-view-render.view_3407", function() {
   $($('#updates-from-tb-id').parents()[1]).addClass('cm-card')
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

$(document).on('knack-form-submit.view_3568', function(event, view, record) {
  	if($('#view_last_night_service_btn').length > 0){
      record.field_1495 == "Thumbs Up" ? $('#view_last_night_service_btn').addClass('rated-icon-green') : $('#view_last_night_service_btn').removeClass('rated-icon-green')
    }
  	if($('#view_3374 .fa-check-circle').length === 0){
   		$('#view_last_night_service_btn').append(`&nbsp;&nbsp;&nbsp;<i style="margin-top: 5px;" class="fa fa-check-circle"></i>`)
    }
});

//********************************Hide new service hazard Manage Logs and Infractions AS

$(document).on("knack-view-render.view_3819", function(event, view, data) {//Review SERVICE ID - https://apps.sv.knack.com/trashdash#area-command-center/dashboards/pre-service-dashboard/service-id-review/review-service-id/61ed1d269e23c12f8dfe902a/
	$($('#view_3819 .as-accordion')[3]).hide()
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
//'scene_1697','scene_1704','scene_1705','scene_1712','scene_1714','scene_1715','scene_1719','scene_1737','scene_1738','scene_1739','scene_1740','scene_1741','scene_1742','scene_1698','scene_1694',
var geo_scenes = [ 'scene_1712', 'scene_1714', 'scene_1715', 'scene_1719', 'scene_1737', 'scene_1738', 'scene_1739', 'scene_1740', 'scene_877', 'scene_881', 'scene_882', 'scene_944', 'scene_945', 'scene_1628', 'scene_1632', 'scene_1662', 'scene_1663', 'scene_1664', 'scene_1666', 'scene_1665', 'scene_1667', 'scene_1668', 'scene_1897','scene_1897','scene_1900','scene_1903','scene_1905','scene_1899','scene_1902','scene_1901','scene_1922', 'scene_1924']
//New Site Audit Setup Scene List - https://builder.sv.knack.com/apps/trashdash/pages/scene_1695
var siteAudit_scenesDesktop = ['scene_1695','scene_1694', 'scene_1936', 'scene_1408', 'scene_1410', 'scene_1960'] //'scene_1408', 'scene_1410', 'scene_1960' = SERVICE HAZARDS
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
    checkCurrentTheme();    
});

function checkCurrentTheme(){
    if(currentAppendedTheme === 'sv_geo_css'){$('#as_command_center_theme').remove()} 
    else if (currentAppendedTheme == 'as_command_center_theme'){$('#sv_geo_css').remove()}
    else {}
}

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

//view_4907 - Community & Contract - Site Details https://apps.sv.knack.com/trashdash#area-command-center/dashboards/view-all-workflow/communities-contacts/view-community-details3
$(document).on("knack-view-render.view_4907", function(event, view, data) {
   var currentComId = $(location).attr("href").replace(/\/\s*$/, "").split('/').pop();
   $('#view_4907-field_193').val(currentComId).trigger("liszt:updated");
   $('#view_4907').hide();
});

$(document).on('knack-scene-render.scene_1530', function(event, scene) {
    $('.kn-records-nav').append($('.kn-view .kn-notification').parents()[0])
});

//view_5303 Survey Control Panel
$(document).on('knack-view-render.view_5303', function(event, view, data){
    if(!isButler){
        $('#view_5303 .kn-link-3').hide()
    }else{
        // $('#view_5303 .kn-link-3').hide() //Not yet live
    }  
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
//Knack.showSpinner();
//view_5023
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
});

//
var popUpOpen = false;

$(document).on('knack-form-submit.view_5086', function(event, view, record) {
  if(record.field_2514 == 'Yes'){
      window.location.href = window.location.href + 'add-new-popup-schedule?temp-id=' + record.id;
      
  }
});

//view_5278 Community Flyer PDF Version 2022
$(document).on('knack-view-render.view_5278', function(event, view, data){
  var pdfView = `<div style="width:90%; margin: auto; margin-top: 20px">
  <button class="delete close-modal" id="sv_pdf_close"><i class="fa fa-close" style="font-size:24px"></i></button>
  <iframe src="${data.field_2904_raw}" width="100%" height="600" style="border:none;"></iframe>
  </div>`
  $('#kn-modal-bg-0').append(pdfView)
  $('.kn-modal').hide()
  $('#sv_pdf_close').on('click', function(){
    $('.close-modal').click();
  })

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

//view_3754
$(document).on('knack-view-render.view_3754', function(event, view, data){
    // $('#kn-scene_1253').removeClass('group-layout-wrapper')
});

//view_3369 //My Communities
$(document).on('knack-view-render.view_3369', function(event, view, data){
    $($('.kn-info-bar')[0]).addClass('show-breadcrumbs')
    $($('.show-breadcrumbs')[0]).removeClass('kn-info-bar');
    var t = 1;
    const myInterval = setInterval(myTimer, 1000);
    function myTimer() {
        if( $($('.show-breadcrumbs')[0]) ){
          if(($($('.show-breadcrumbs')[0]).attr('style')).includes('none')){
            $($('.show-breadcrumbs')[0]).removeClass('kn-info-bar');
            $($('.show-breadcrumbs')[0]).css('display', 'block');
          }else{
              clearInterval(myInterval);
          }
        }
        t = t+1;
        if(t>10){ clearInterval(myInterval) }
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
        });
    }
}

function updateCommunityActivePopup(){
    $('#view_5224 .kn-submit button').click();
}

// view_5840
$(document).on('knack-view-render.view_5840', function(event, view, data){ //QUARTERLY SURVEY
//FORCE OPEN POPUP
  if(data.length > 0){
    const myInterval = setInterval(checkIfExist, 500);

    function checkIfExist(){
      if( $('#view_5229').length === 0 ){
      }else{
          openPopup()
          clearInterval(myInterval);
          
      }
    }
  }
  //FORCE OPEN POPUP
  for(var i = 0; i < data.length; i++){
    if(data[i].field_2653_raw == true){
      $('p.sticky').removeClass('hideMe');
      $('#sv_survey_link').removeClass('hideMe');
    }
  }
});

$(document).on('knack-view-render.view_3517', function(event, view, data){
  $('#click_survey_id').on('click', function() {
        location.href = location.href + `popup-cm-activity-logs-in-devs/${Knack.views.view_3374.record.id}/`
    });
});


$(document).on('knack-view-render.view_5234', async function(event, view, data){
  if( $('#sv_carousel_bs').length == 0 ){
    var sv_car = `<script class="lazyload" src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script><script class="lazyload" src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js"></script><script class="lazyload" src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js"></script>`;
    $('body').append(sv_car);
  }
});

// view_5233
$(document).on('knack-form-submit.view_5233', function(event, view, record) {
  swal({
      title: `Thank you for your feedback!`,
      icon: "success",
      button: "Close"
  })
  $('#sv_dont_show_survey').click();
  $('p.sticky').addClass('hideMe');
  $('#sv_survey_link').addClass('hideMe');
});

$(document).on('knack-view-render.view_5817', function(event, view, data){
   if( $('#swal').length === 0 ){
    $('head').append(`<script class="lazyload" id="swal" src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>`);
  }
});

$(document).on('knack-form-submit.view_5817', function(event, view, record) {
   swal({
      title: `Thank you for your feedback!`,
      icon: "success",
      button: "Close"
  })
});

// NEW POPUP FOR COMMUNITY CONCIERGE
    var comsActivePopups = [] //Popups that will be shown
    var comsScheduledPopups = [] //Popups in the Community's Field
    var globalActivePopups = []; //All Active Global Popup
    var popupScheduleLogs = []; //This community's Popup Schedule Logs
    var popupIsOpen = false;
    var currentCommunityId = '';
    function openPopup(){
            $($('#view_5229 .kn-link')[0]).find('span').click()
            popupIsOpen = true;
    }

    async function createPopup(data, scene_id){
        await createCarouselContainer(scene_id)
        await createACarouselSection(data)
        $($('#survey_popup .col')[1]).append( $('#view_5233') )
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
                  $('#view_5233').hide()
                    carouselData =`
                    <div class="carousel-item ${isActive}">
                    <h2>${data[i].field_2648_raw}</h2>
                    <img src=${url}>
                    <div class="pop-main-con">${data[i].field_2646}</div>
                    <button id="sv_dont_show_${i}" class="sv_dont_show kn-button is-primary" data-id=${data[i].id} >Don't Show This Again</button>
                    </div>`;
                }
                $('#sv_popup_carousel_container .carousel-inner').append(carouselData);                
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
        comsActivePopups = [];
        comsScheduledPopups = []
        globalActivePopups = [];
        popupScheduleLogs = [];
        await getGlobalActivePopup().then(
        );
        await getCommunitySchedPopupField(data);
        await checkIfActiveNotInCom();
        await getPopupScheduleLog()
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
        return $.ajax({
            type: 'PUT',
            headers: asHeader,
            url: 'https://api.sv.knack.com/v1/pages/scene_1255/views/view_5224/records/'+currentCommunityId,
            data: {
                field_2489: comsScheduledPopups
            }
        });
    }

    function combineOldAndNewScheds(){
        var newActiveSched = globalActivePopups.concat(comsScheduledPopups)
        newActiveSched = newActiveSched.filter((e, i, a) => a.indexOf(e) === i);
    }

    async function createPopupScheduleLog(id){
        return $.ajax({
                type: 'POST',
                headers: asHeader,
                url: 'https://api.sv.knack.com/v1/pages/scene_1255/views/view_5226/records',
                data: {
                    field_2893: currentCommunityId,
                    field_2895: id
                },
                success: function(res) {
                }
        });
    }

    function getCommunitySchedPopupField(data){
        if(data.field_2489_raw){ comsScheduledPopups = data.field_2489_raw.map((b) => {return b.id}); }        
    }
    async function getPopupScheduleLog(){
      await refreshData()
    }
    async function checkIfActiveNotInCom(){
        var updateCom = false;
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
            Knack.hideSpinner();
            $('.close-modal').click();
      }
      });
    }

    async function refreshData(){
        await Knack.views.view_5840.model.fetch()
        await getData();
        function getData(){
            $(document).on('knack-view-render.view_5840', function(event, view, data){
                popupScheduleLogs = data
                if(data.length > 0){
                    openPopup()
                }
            });
        }
    }

// END NEW POPUP FOR COMMUNITY CONCIERGE
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

//view_5346
$(document).on('knack-view-render.view_5346', function(event, view, data){
  if( $('#swal').length === 0 ){
    $('head').append(`<script class="lazyload" id="swal" src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>`);
  }
});

//view_5233 CC > Notice 
$(document).on('knack-view-render.view_5233', function(event, view, data){
  if( $('#swal').length === 0 ){
    $('head').append(`<script class="lazyload" id="swal" src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>`);
  }
});

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

//view_5438 Service Hazard New Address CM
$(document).on('knack-view-render.view_5438', function(event, view, data){
  $('#view_5438').hide();
  let script = document.createElement('script');
  script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js';
  script.class = 'lazyload';
  document.documentElement.firstChild.appendChild(script);
  if( $('#desoSlide').length === 0 ){
      $('head').append(`<script id="desoSlide" src="https://cdnjs.cloudflare.com/ajax/libs/fotorama/4.6.4/fotorama.min.js" integrity="sha512-cWEytOR8S4v/Sd3G5P1Yb7NbYgF1YAUzlg1/XpDuouZVo3FEiMXbeWh4zewcYu/sXYQR5PgYLRbhf18X/0vpRg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <link  href="https://cdnjs.cloudflare.com/ajax/libs/fotorama/4.6.4/fotorama.css" rel="stylesheet">`);
  }

  $('#view_4260').prepend(`<div class="fotorama"
        data-nav="thumbs" id="service_hazard_fotorama">
    </div>`)
  for(var i = 0; i < data.length; i++){
    $('#service_hazard_fotorama').append(`
    <a href="${i+1}.jpg"><img src="${data[i].field_3023_raw}"></a>`)
  }

});

//view_5508 Service Hazard New Address CM
$(document).on('knack-view-render.view_5508', function(event, view, data){
  $('#view_5508').hide();
  let script = document.createElement('script');
  script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js';
  script.class = 'lazyload';
  document.documentElement.firstChild.appendChild(script);
  if( $('#desoSlide').length === 0 ){
      $('head').append(`<script id="desoSlide" src="https://cdnjs.cloudflare.com/ajax/libs/fotorama/4.6.4/fotorama.min.js" integrity="sha512-cWEytOR8S4v/Sd3G5P1Yb7NbYgF1YAUzlg1/XpDuouZVo3FEiMXbeWh4zewcYu/sXYQR5PgYLRbhf18X/0vpRg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <link  href="https://cdnjs.cloudflare.com/ajax/libs/fotorama/4.6.4/fotorama.css" rel="stylesheet">`);
  }

  $('#view_3718').prepend(`<div class="fotorama hideMe"
     data-nav="thumbs" id="infraction_fotorama">
</div>`)
  for(var i = 0; i < data.length; i++){
    $('#infraction_fotorama').append(`
    <a href="${i+1}.jpg"><img src="${data[i].field_2237_raw}"></a>`)
  }
  $('#infraction_fotorama').removeClass('hideMe')
});

//view_4089 Butler Report service hazard 
$(document).on('knack-view-render.view_4089', function(event, view, data){
  $("#view_4089-field_1500").prop("selectedIndex", 1).trigger("liszt:updated").change();
});

//view_5439
$(document).on('knack-form-submit.view_5439', function(event, view, record) {
  $('#view_5439').hide();
  $('.edit-hazard-form').show();
});

function transformImage(dataImage){
  var imageUrl = "";
  var start_url = "";
  var end_url = "";
  var new_url = "";
  var orig_image;
     
  imageUrl = dataImage;
  if (imageUrl == undefined) return; 
  start_url = imageUrl.split("upload");
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
  return new_url;
}

function combineImagesAndDeletedField(img, del){
  var image = img;
  var isDeleted = del;
  var imageArray = image.split(", ").map(function(img) {
    var id = img.match(/id="(.*?)"/)[1];
    var src = img.match(/src="(.*?)"/)[1];
    return { id: id, src: src };
  });
  var isDeletedArray = isDeleted.split(", ").map(function(del) {
    var id = del.match(/id="(.*?)"/)[1];
    var deleted = del.match(/>(.*?)</)[1];
    return { id: id, deleted: deleted };
  });

  var result = imageArray.map(function(img) {
    var deleted = isDeletedArray.find(function(del) {
      return del.id === img.id;
    }).deleted;
    return { id: img.id, src: img.src, deleted: deleted };
  });
  return result;
}

//view_5448 Community Manager Dashboard Service Hazard New
$(document).on('knack-view-render.view_5448', function(event, view, data){
  $('.field_2237').hide();
  $('.field_3023').hide();

  function createImageContainer(){
    for(var i = 0; i < data.length; i++){
      $($($('.uploadHazardBtn')[i]).parents()[4]).hide();
      // 
      $($('.service-hazard-image-cont')[i]).append(`<div class="row"
      data-nav="thumbs" id="fotoramaDash_${i}">
      </div>`);
        //
      var notDeleted =  data[i]["field_3023_raw"].length - data[i].field_2248_raw.length;
      var sectionPhotos = data[i].field_3023;
      var combinedArray = combineImagesAndDeletedField(data[i]["field_2244.field_3023"],data[i]["field_2244.field_2248"])
      sectionPhotos = sectionPhotos.split(", ");
      $($('.service-hazard-image-cont-number')[i]).html( `${notDeleted} Photo(s)` )
      var isFirstNo = true;
      for (let t = 0; t < combinedArray.length; t++) {
        if( combinedArray[t].deleted === "No" ){
          if(isFirstNo){
            $($('.service-hazard-image-cont')[i]).prepend(`<div class="col-12"><img src="${combinedArray[t].src}" height="100px"></div>`)
            isFirstNo = false;
          }else{
            if(0 < t < 4){
              $(`#fotoramaDash_${i}`).append(`<div class="col-4"><img src="${combinedArray[t].src}" height="30px"></div>`);
            }
          }
        }
      }
    }
  }
  createImageContainer();
  $($('#view_5448 .kn-special-title')[0]).on('click', function(){
        $($('.uploadHazardBtn')[0]).click()
  })
  $($('#view_5448 .kn-special-title')[1]).on('click', function(){
        $($('.uploadHazardBtn')[1]).click()
  })
});

//view_5467 Community Manager Dashboard Infraction New
$(document).on('knack-view-render.view_5467', function(event, view, data){
  $('.field_2237').hide();
  $('.field_614').hide();
  $('.field_615').hide();
  $('.field_3023').hide();

  function createContainer(){
    for(var i = 0; i < data.length; i++){
     $($('.infraction-image-cont')[i]).append(`<div class="fotorama row"
        data-nav="thumbs" id="fotoramaDashInfra_${i}">
        </div>`);
    }
  }
  function createImageContainer(){
    for(var i = 0; i < data.length; i++){
      $($($('.uploadInfractionBtn')[i]).parents()[4]).hide();
      // 
      $($('.infraction-image-cont')[i]).append(`<div class="row"
      data-nav="thumbs" id="fotoramaDashInfra_${i}">
      </div>`);
      var sectionPhotos = 0;
      if(data[i].field_3054 === 'Yes'){
          sectionPhotos = data[i]["field_3023_raw"]
          $($('.infraction-image-cont-number')[i]).html( `${sectionPhotos.length} Photo(s)` )
          $($('.infraction-image-cont')[i]).prepend(`<div class="col-12"><img src="${sectionPhotos[0]}" height="100px"></div>`)

          for(var k = 1; k < 4; k++){
            if(sectionPhotos[k]){
              $(`#fotoramaDashInfra_${i}`).append(`<div class="col-4"><img src="${sectionPhotos[k]}" height="30px"></div>`);
            }
          }
      }
      else{
        if( data[i].field_614 != '' ){ sectionPhotos = sectionPhotos + 1 }
        if( data[i].field_615 != '' ){ sectionPhotos = sectionPhotos + 1 }
        $($('.infraction-image-cont-number')[i]).html( `${sectionPhotos} Photo(s)` )
        $($('.infraction-image-cont')[i]).prepend(`<div class="col-12"><img src="${data[i].field_614_raw}" height="100px"></div>`)

        $(`#fotoramaDashInfra_${i}`).append(`<div class="col-4"><img src="${data[i].field_614_raw}" height="30px"></div>`);
      }
    }
  }
  createImageContainer();

  function addImagePreview2(){
    for (let i = 0; i < $('img').length; i++) {//This will makes the Multiple Image Upload Images Preview Full size image
      if($($('img')[i]).attr('data-kn-img-gallery') === undefined){
        $($('img')[i]).attr('data-kn-img-gallery', $($('img')[i]).attr('src'))
        $($('img')[i]).wrap('<a class="kn-img-gallery" href="#"></a>');
      }
    }
  }

  $($('#view_5467 .kn-special-title')[0]).on('click', function(){
        $($('.uploadInfractionBtn')[0]).click()
  })
  $($('#view_5467 .kn-special-title')[1]).on('click', function(){
        $($('.uploadInfractionBtn')[1]).click()
  })
});

//view_5499

$(document).on('knack-view-render.view_5499', function(event, view, data){
  addImagePreview();
});

$(document).on('knack-view-render.view_5552', function(event, view, data){
  addImagePreview();
});

$(document).on('knack-view-render.view_5619', function(event, view, data){
  addImagePreview();
});

//view_5504
$(document).on('knack-view-render.view_5504', function(event, view, data){
  addImagePreview();
});
//view_5503
$(document).on('knack-view-render.view_5503', function(event, view, data){
  addImagePreview();
});
//view_5436
$(document).on('knack-view-render.view_5436', function(event, view, data){
  addImagePreview();
});

//view_5499
$(document).on('knack-view-render.view_5499', function(event, view, data){
  addImagePreview();
});
//view_5659
$(document).on('knack-view-render.view_5659', function(event, view, data){
  addImagePreview();
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

//home_slug
$(document).on('knack-scene-render.any', function(event, scene) {
  if( Knack.home_slug == 'butler' ){
    if($('#butler_service_ui').length === 0){
      $('head').append('<link rel="stylesheet" type="text/css" id="butler_service_ui" class="lazyload" href="https://strategic-visionz.github.io/knack-css/scss/Butler%20Service%20Process%20Theme1.0.0.min.css">')
    }
  }else{
    if($('#butler_service_ui').length > 0){
      $('#butler_service_ui').remove();
    }
  }
  // if( Knack.home_slug != 'service-activity-logs'){
    if( $('#kn-scene_2013').length === 0 && $('#kn-scene_2042').length === 0){
      if($('#service-activity-logs').length > 0){
        $('#service-activity-logs').remove();
      }
      if( Knack.home_slug != "area-command-center" ){
      }
    }

    if( $('#kn-scene_2013').length === 1 || $('#kn-scene_2042').length === 1){
      if( Knack.home_slug == "area-command-center" ){
        if( Knack.navList){
          var customMenu = `<ul id="custom_menu_id" style="list-style-type:none;">${Knack.navList}</ul>`;
          if($('#custom_menu_id').length === 0){ $('#kn-mobile-menu').append(customMenu); }
        }
        addSvTopBack();
      }
      $('#as_command_center_theme').remove()
    }

  try{
    var userProfKeys = Knack.session.user.profile_keys;
    var isDev = userProfKeys.includes('profile_34');
    var isTM = userProfKeys.includes('profile_15')
    var isStaff = userProfKeys.includes('profile_6')
    var isFOQM = userProfKeys.includes('profile_101')
    var isAS = userProfKeys.includes('profile_3')
    var isPilot = userProfKeys.includes('profile_155')
    var runQueue = isDev || isPilot;
  }
  catch(err){
  }

  if( Knack.home_slug == "area-command-center"){
    if( $('#custom_menu_id').length === 0 ){
      addCustomMenuSv();
    }
    if ($('#as_command_center_theme').length == 0) {
        if( $('#kn-scene_2042').length === 0 && $('#kn-scene_2013').length === 0){
          $('head').append('<link rel="stylesheet" type="text/css" id="as_command_center_theme" class="lazyload" href="https://strategic-visionz.github.io/knack-css/scss/Area%20Supervisor%20Theme.min.css">')
        }else{
        }
    }
  }
  try{
    var review_data = JSON.parse(sessionStorage.getItem("review_data")) || [];
    var flexQueueStartAt = JSON.parse(sessionStorage.getItem("flex_queue_started")) || '';
    Knack.flexQueueStartAt = flexQueueStartAt;
    Knack.reviewedCount = 0;
    $.each(review_data, function(index, value) {
      if (value.field_1025 !== "") {
        Knack.reviewedCount = Knack.reviewedCount + 1;
      }
  });
  }catch(err){
    console.log(err)
  }
  if( $('#view_5808').length === 0 ){ $('#view_5851').remove();}
  if( $('#view_5730').length === 0 ){ $('#view_5964').remove();}
  var withReviewData = '';
  try{
    if( review_data.length > 0 ){
        withReviewData = `<p id="return_to_active_queue">Return to Active Queue</p>
          <div style="margin-bottom:1em;cursor: pointer;">
          ${Knack.reviewedCount ? "<p class='queue-element'>Reviewed " +Knack.reviewedCount+"/"+Knack.flexServices.length+"</p>" : ""}
          ${Knack.flexQueueStartAt ? "<p class='queue-element' style='font-size: .8em;'>Started At: "+Knack.flexQueueStartAt+"</p>" : ''}
          </div>`
    }
  }catch(err){
    console.log(err)
  }
  try{
    if( runQueue && Knack.home_slug !== "community-concierge" ){
      var fq_sidebarHtml = `<div id="flex_queue_sibar">
          ${withReviewData}
          <p id="flex_service_quick_queue" class="hideMe">Service QuickQueue</p>
          </div>`;
      $('#flex_queue_sibar').remove()
      if($('#flex_queue_sibar').length === 0){
        $('#kn-mobile-menu').append(fq_sidebarHtml)
      }
      $('#return_to_active_queue').on('click', function(){
        window.location.href = Knack.url_base+'#'+Knack.hash_parts[0]+'/service-id--flexadd-details-mobile2/'+Knack.flexServices[0].id+'?'+(Knack.query_string || "");
      })
    }
    }
  catch(err){
    console.log(err)
  }
  if( runQueue && $('#flex_service_quick_queue').length === 0 ){
  }
  $('#flex_service_quick_queue').on('click', function(){
    var link = $('#services_quickqueue').attr('href');
    if(link){ window.location.href = link;}
  })

  //Add QuickQueue
  if( runQueue ){
    var review_data = JSON.parse(sessionStorage.getItem("review_data")) || [];
    Knack.flexServices = review_data;
    var currentUrl = window.location.href.split('?')[0];
    
    setTimeout(function() {
      
      if( $('#services_quickqueue').length === 0 )$('#knack-logo').append(`<a id="services_quickqueue" class="hideMe" href="${currentUrl}services-quickqueue/${Knack.hash_id||''}">Service QuickQueue</a>`)
      $('#flex_service_quick_queue').removeClass('hideMe')
      if( review_data.length > 0 && $('#flex_return_active_queue').length === 0 ) {
        try{
          $(`#flex_sidebar_nav`).append(`<div id="flex_return_active_queue">
          <div id="flex_sidebar_nav"><a id="services_quickqueue_sidebar" class="" href="${currentUrl}services-quickqueue/${Knack.hash_id||''}">Service QuickQueue</a></div>
          <a href="${Knack.url_base+'#'+Knack.hash_parts[0]+'/service-id--flexadd-details-mobile2/'+Knack.flexServices[0].id+'?'+(Knack.query_string || "")}">
          Return to Active Queue</a>
          <div>
          <h3>${Knack.reviewedCount}/${review_data.length} Reviewed</h3>
          </div>
          </div>`)

          
        }catch(err){
          console.log(err)
        }
      }
    }, 2000);
  }
  //End
})

$(document).on('knack-view-render.view_3640', function(event, view, data){
  $('#view_3640 button').prop('disabled', true);
   const myInterval = setInterval(checkIfExist, 500);

    function checkIfExist(){
      if( $('#view_5438').length === 0 ){
      }else{
          $('#view_3640 button').prop('disabled', false);
          addImageToField()
          clearInterval(myInterval);
      }
    }

    function addImageToField(){
      var imageUrl = Knack.views.view_5438.model.data.models.map((b) => {return b})
      imageUrl = imageUrl.map((b) => {return b.attributes.field_2237_raw})
      removeOverlay3(imageUrl)
    }

    function removeOverlay3(imageData){
      var emailImage = '';
      for(var i = 0; i < imageData.length; i++){
        var imageUrl = "";
        var start_url = "";
        var end_url = "";
        var new_url = "";
        var orig_image;
          
        imageUrl = imageData[i];
        if (imageUrl == undefined) return; 
        start_url = imageUrl.split("upload");
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
        emailImage = emailImage + `<img src="${ new_url }" width="300px">`;
      }
      $('#field_3018').val(emailImage).change();
    }
  
});

// view_3640
$(document).on('knack-form-submit.view_3640', function(event, view, record) {
  $('.close-modal').click();
  if( Knack.views.view_5448 ) { Knack.views.view_5448.model.fetch(); }
  if( Knack.views.view_3638 ) { Knack.views.view_3638.model.fetch(); }
});

//https://builder.sv.knack.com/apps/trashdash/pages/scene_2013/views/view_5699
$(document).on('knack-view-render.view_5699', function(event, view, data) {
  $('.field_1296').hide() //Infractions
  $('.field_313').hide() //Support Ticket
  $('.field_1497').hide() //Service Hazards
  $('.field_1297').hide() //Compactor Log
  $('.field_799').hide() //RADAR Log
  $('.field_810').hide() //Timeclock
  $('.flex-buttons').html();
  for(var i = 0; i < data.length; i++){
    var hrefLink = ``;
    if(data[i].field_2240 == "Butler Timeclock"){
      hrefLink = $($('.field_810')[i]).find("a:not('.kn-img-gallery')").attr("href");
    }
    else if(data[i].field_2240 == "Compactor Log"){
      hrefLink = $($('.field_1297')[i]).find("a:not('.kn-img-gallery')").attr("href");
    }
    else if(data[i].field_2240 == "Resident Infraction"){
      hrefLink = $($('.field_1296')[i]).find("a:not('.kn-img-gallery')").attr("href");
    }
    else if(data[i].field_2240 == "Service Hazard"){
      hrefLink = $($('.field_1497')[i]).find("a:not('.kn-img-gallery')").attr("href");
    }
    else{

    }
    $($('.flex-buttons')[i]).html(`<a class="" href=${hrefLink}>VIEW/EDIT</a>`);
  }
});

//view_5725 Service ID > FLEXADD https://builder.sv.knack.com/apps/trashdash/pages/scene_2013/views/view_5725/table
$(document).on('knack-view-render.view_5725', function(event, view, data) {
  $('#view_5725 .field_2241').hide()
  $('#view_5725 .field_2963').hide()
  $('#view_5725 .field_2242').hide()
  $('#view_5725 .field_2244').hide()
  $('#view_5725 .field_2250').hide()
  $('#view_5725 .field_2251').hide()
  $('#view_5725 .field_2252').hide()
  $('#view_5725 .field_146').hide()
  $('#view_5725 .field_1501').hide()
  $('#view_5725 .field_155').hide()

  for(var i = 0; i < data.length; i++){
    var recordType = data[i].field_2240;
    var unitData = '';
    switch (recordType) {
      case "Service Hazard":
        unitData = data[i].field_1501
        break;
      case "RADAR Log":
        unitData = data[i].field_155
        break;
      case "Resident Infraction":
        unitData = data[i].field_146
        break;
    }
    $($('#view_5725 tbody tr .field_2240 .col-2')[i]).html(unitData);
    var txt = $($('#view_5725 tbody tr .field_2240 .col-12')[i]).html();
    var link = $($('#view_5725 tbody tr')[i]).find("a:not('.kn-img-gallery')").attr("href")
    $($('#view_5725 tbody tr .field_2238 .col-12')[i]).html(`<a href=${link}><i class='fa fa-pencil'></i></a>`);
  }

   $('#view_5725 .flex-delete').on('click', function(){
     $($(this).parents()[3]).find(".kn-link-delete").click()
    })

    //nav var hidden
    $('#view_5725 .view-header').hide();
    $('#view_5725 .js-filter-menu').hide();
});

//view_5723
$(document).on('knack-view-render.view_5723', function(event, view, data) {
  $('.field_170').hide()
  $($('.field_46 .kn-detail-body span span')[0]).append(` at ${data.field_170}` )
  $('#view_5723 .field_95').hide()
  $('#flex_service_id').html(`${data.field_95}`);
  $($('#view_5723 .flex-time-container')[0]).append( $('.kn-detail.field_122'));
  $($('#view_5723 .flex-time-container')[0]).append( $('.kn-detail.field_123'));
});

//view_5809
$(document).on('knack-view-render.view_5809', function(event, view, data) {
  $('.field_170').hide()
  $($('.field_46 .kn-detail-body span span')[0]).append(` at ${data.field_170}` )
  $('#view_5809 .field_95').hide()
  $('#flex_service_id').html(`${data.field_95}`);
  $($('#view_5809 .flex-time-container')[0]).append( $('.kn-detail.field_122'));
  $($('#view_5809 .flex-time-container')[0]).append( $('.kn-detail.field_123'));
});

//view_5726
$(document).on('knack-view-render.view_5726', function(event, view, data) {
  $('.field_1025').hide()
  //
  $($('#active_pilot_queue').parents()[4]).hide()

  var userProfKeys = Knack.session.user.profile_keys;
  var isPilot = userProfKeys.includes('profile_155')
  if(isPilot){
    $($('#active_pilot_queue').parents()[4]).show()
    $($('#view_5726 .kn-details-link a')[0]).hide()
  }
  //
  var isReviewed = data.field_1019_raw;
  $($('#view_5726 .kn-details-link')[1]).hide()
  $('#view_5726 .field_121').hide()
    var text = $($('.field_1020')[0]).text();
    text = text.substr(0,100) + '...';


  if( isReviewed ){
    var reviewClass = '';
    if(data.field_1025 == 'Pass'){
      reviewClass = 'pass-service';
    }else{
      reviewClass = 'fail-service';
    }
    $($('#view_5726 .field_1019')[0]).html(`<div><span class=${reviewClass}>${data.field_1025}</span></div>`);

      $($('#view_5726 .kn-details-link a')[0]).html(`<i class="fa fa-edit"></i>Edit Service ID Review`).addClass('editable-review');
      $($('#active_pilot_queue').parents()[1]).html(`<i class="fa fa-edit"></i>Edit Service ID Review`).addClass('editable-review');

  }else{
    $('.field_3077').hide();
    $('.field_1814').hide();
    $($('#view_5726 .field_1019')[0]).html(`<div><span class="not-reviewed">Not Reviewed Yet</span></div>`);
    // field_1020
    $($('.field_1020 span')[0]).html('No Review has been made yet.');

    if( data.field_121 == "Complete" ){
      $($('#view_5726 .kn-details-link a')[0]).addClass("completed-service-noreview");
      $($('#active_pilot_queue').parents()[1]).addClass("completed-service-noreview");
    }
  }

  if( data.field_121 != "Complete" ){
    $($('#view_5726 .kn-details-link a')[0]).addClass("disable-click");
    $($('#active_pilot_queue').parents()[1]).addClass("disable-click");
  }else{

  }
});
//view_5810
$(document).on('knack-view-render.view_5810', function(event, view, data) {
  $('.field_1025').hide()
  //
  $($('#active_pilot_queue').parents()[4]).hide()

  var userProfKeys = Knack.session.user.profile_keys;
  var isPilot = userProfKeys.includes('profile_155')
  if(isPilot){
    $($('#active_pilot_queue').parents()[4]).show()
    $($('#view_5810 .kn-details-link a')[0]).hide()
  }
  //
  var isReviewed = data.field_1019_raw;
  $('#view_5810 .field_121').hide()
    var text = $($('.field_1020')[0]).text();
    text = text.substr(0,100) + '...';


  if( isReviewed ){
    var reviewClass = '';
    if(data.field_1025 == 'Pass'){
      reviewClass = 'pass-service';
    }else{
      reviewClass = 'fail-service';
    }
    $($('#view_5810 .field_1019')[0]).html(`<div><span class=${reviewClass}>${data.field_1025}</span></div>`);

      $($('#view_5810 .kn-details-link a')[0]).html(`<i class="fa fa-edit"></i>Edit Service ID Review`).addClass('editable-review');
      $($('#active_pilot_queue').parents()[1]).html(`<i class="fa fa-edit"></i>Edit Service ID Review`).addClass('editable-review');

  }else{
    $('.field_3077').hide();
    $('.field_1814').hide();
    $($('#view_5810 .field_1019')[0]).html(`<div><span class="not-reviewed">Not Reviewed Yet</span></div>`);
    // field_1020
    $($('.field_1020 span')[0]).html('No Review has been made yet.');

    if( data.field_121 == "Complete" ){
      $($('#view_5810 .kn-details-link a')[0]).addClass("completed-service-noreview");
      $($('#active_pilot_queue').parents()[1]).addClass("completed-service-noreview");
    }
  }

  if( data.field_121 != "Complete" ){
    $($('#view_5810 .kn-details-link a')[0]).addClass("disable-click");
    $($('#active_pilot_queue').parents()[1]).addClass("disable-click");
  }else{

  }

  var originalDiv = $("#view_5810");
  var cloneDiv = originalDiv.clone();
  $($(".view-group.view-group-2 .view-column-group-2")[0]).append(cloneDiv);
});

$(document).on('knack-view-render.view_5808', function(event, view, data) {
  if( screen.width > 650){
    var newUrl = Knack.url_base+'#';
      for (let i = 0; i < Knack.hash_parts.length; i++) {
          if(Knack.hash_parts[i] === "service-id--flexadd-details-mobile2"){
              newUrl = newUrl + 'service-id--flexadd-details2/'
          }else{
              newUrl = newUrl + Knack.hash_parts[i] + '/'
          }
      }
      window.location.href = newUrl+'?'+(Knack.query_string || "");
  }
  if($('#service-activity-logs').length === 0){
      $('head').append('<link rel="stylesheet" type="text/css" id="service-activity-logs" class="lazyload" href="https://strategic-visionz.github.io/knack-css/scss/ServiceIDActivityLog_UI.min.css">')
  }

  if($('#service-activity-logs').length === 0){
    $('head').append('<link rel="stylesheet" type="text/css" id="service-activity-logs" class="lazyload" href="https://strategic-visionz.github.io/knack-css/scss/ServiceIDActivityLog_UI.min.css">')
  }
});

function addSvTopBack(){
  var backLinkExist = setInterval(checkBackLink, 1000);
  function checkBackLink(){
      if($('.kn-back-link').html() === undefined){ }
      else{
          function addBackLink(){
              var origText = $($('.kn-back-link a')[0])[0].innerHTML
              var origLink = $($('.kn-back-link a')[0]).attr('href');
              if( Knack.query_string ){
                origLink = origLink+'?'+(Knack.query_string || "");
              }
              var backLink = `<a style="margin-left: 10px" class="sv-top-back-link hideMe" id="sv-top-back" href=`+origLink+`><span>${origText}<span></a>`;
             if( $('.kn-view.kn-back-link').length ){ $('#kn-app-header').append(backLink); }
              $('#sv-top-back').show();
          }
          if($('#sv-top-back').length == 1){ $('#sv-top-back').remove(); addBackLink() }
          else{ addBackLink(); }
          clearInterval(backLinkExist);
      }
      var userProfKeys = Knack.session.user.profile_keys;
      var isDev = userProfKeys.includes('profile_34')
      if(isDev){
        $('#sv-top-back').removeClass('hideMe')
      }else{
        $('#sv-top-back').removeClass('hideMe')
      }
  }
}

$(document).on(`knack-scene-render.scene_2042`, function(event, view, data) {
  addSvTopBack()
});

var flexMenu = [
  {
    scene_id: 'scene_2013',
    menu_id: 'view_5741',
    all_id: 'view_5725',
    timeclock_id: 'view_5736',
    compactor_id: 'view_5737',
    radar_id: 'view_5738',
    inf_id: 'view_5739',
    haz_id: 'view_5740',
    notUpdated_id: 'view_5870',
  }
]

flexMenu.forEach((el, index, array) => {
  $(document).on(`knack-scene-render.${el.scene_id}`, function(event, view, data) {
    if($('#service-activity-logs').length === 0){
      $('head').append('<link rel="stylesheet" type="text/css" id="service-activity-logs" class="lazyload" href="https://strategic-visionz.github.io/knack-css/scss/ServiceIDActivityLog_UI.min.css">')
    }
    addSvTopBack()
    $(`#${el.menu_id} a`).removeAttr('href');

    function initFlex(){
      $(`#${el.all_id}`).show()
      $(`#${el.timeclock_id}`).hide()
      $(`#${el.compactor_id}`).hide()
      $(`#${el.radar_id}`).hide()
      $(`#${el.inf_id}`).hide()
      $(`#${el.haz_id}`).hide()
      $(`#${el.notUpdated_id}`).hide()
    }

    function showAllActivity(){
      $(`#${el.all_id}`).show()
      $(`#${el.timeclock_id}`).hide()
      $(`#${el.compactor_id}`).hide()
      $(`#${el.radar_id}`).hide()
      $(`#${el.inf_id}`).hide()
      $(`#${el.haz_id}`).hide()
      $(`#${el.notUpdated_id}`).hide()
    }

    function showTimeClocks(){
      $(`#${el.all_id}`).hide()
      $(`#${el.timeclock_id}`).show()
      $(`#${el.compactor_id}`).hide()
      $(`#${el.radar_id}`).hide()
      $(`#${el.inf_id}`).hide()
      $(`#${el.haz_id}`).hide()
      $(`#${el.notUpdated_id}`).hide()
    }

    function showCompactors(){
      $(`#${el.all_id}`).hide()
      $(`#${el.timeclock_id}`).hide()
      $(`#${el.compactor_id}`).show()
      $(`#${el.radar_id}`).hide()
      $(`#${el.inf_id}`).hide()
      $(`#${el.haz_id}`).hide()
      $(`#${el.notUpdated_id}`).hide()
    }

    function showRadar(){
      $(`#${el.all_id}`).hide()
      $(`#${el.timeclock_id}`).hide()
      $(`#${el.compactor_id}`).hide()
      $(`#${el.radar_id}`).show()
      $(`#${el.notUpdated_id}`).hide()
      $(`#${el.inf_id}`).hide()
      $(`#${el.haz_id}`).hide()
    }

    function showNotUpdated(){
      $(`#${el.all_id}`).hide()
      $(`#${el.timeclock_id}`).hide()
      $(`#${el.compactor_id}`).hide()
      $(`#${el.radar_id}`).hide()
      $(`#${el.inf_id}`).hide()
      $(`#${el.haz_id}`).hide()
      $(`#${el.notUpdated_id}`).show()
    }

    function showInfractions(){
      $(`#${el.all_id}`).hide()
      $(`#${el.timeclock_id}`).hide()
      $(`#${el.compactor_id}`).hide()
      $(`#${el.radar_id}`).hide()
      $(`#${el.inf_id}`).show()
      $(`#${el.haz_id}`).hide()
      $(`#${el.notUpdated_id}`).hide()
    }

    function showHazards(){
      $(`#${el.all_id}`).hide()
      $(`#${el.timeclock_id}`).hide()
      $(`#${el.compactor_id}`).hide()
      $(`#${el.radar_id}`).hide()
      $(`#${el.inf_id}`).hide()
      $(`#${el.haz_id}`).show()
      $(`#${el.notUpdated_id}`).hide()
    }

    var userProfKeys = Knack.session.user.profile_keys;
    var isDev = userProfKeys.includes('profile_34')

    initFlex()
    $(`#${el.menu_id} .kn-link-5`).hide();
    if(isDev){
      if( Knack.views.view_5870.model.data.length > 0 ){ $(`#${el.menu_id} .kn-link-5`).show(); }
    }
    $(`#${el.menu_id} .kn-link-5`).css({'color':'red'});
    $(`#${el.menu_id} .kn-link-1`).addClass('flex-active').siblings().removeClass('flex-active');

    $(`#${el.menu_id} .kn-link-1`).on('click', function(){
      showAllActivity()
      $(`#${el.menu_id} .kn-link-1`).addClass('flex-active').siblings().removeClass('flex-active');
    });
    $(`#${el.menu_id} .kn-link-2`).on('click', function(){
      showTimeClocks()
      $(`#${el.menu_id} .kn-link-2`).addClass('flex-active').siblings().removeClass('flex-active');
    })
    $(`#${el.menu_id} .kn-link-3`).on('click', function(){
      showCompactors()
      $(`#${el.menu_id} .kn-link-3`).addClass('flex-active').siblings().removeClass('flex-active');
    })
    $(`#${el.menu_id} .kn-link-4`).on('click', function(){
      showRadar()
      $(`#${el.menu_id} .kn-link-4`).addClass('flex-active').siblings().removeClass('flex-active');
    })
    $(`#${el.menu_id} .kn-link-5`).on('click', function(){
      showNotUpdated()
      $(`#${el.menu_id} .kn-link-5`).addClass('flex-active').siblings().removeClass('flex-active');
    })
    $(`#${el.menu_id} .kn-link-6`).on('click', function(){
      showInfractions()
      $(`#${el.menu_id} .kn-link-6`).addClass('flex-active').siblings().removeClass('flex-active');
    })
    $(`#${el.menu_id} .kn-link-7`).on('click', function(){
      showHazards()
      $(`#${el.menu_id} .kn-link-7`).addClass('flex-active').siblings().removeClass('flex-active');
    })
  });
});


//flexTables
var flexTables = [
  {
    view_id: 'view_5739',
    edit_col: 'col-8',
    group_name: 'Resident Infraction ID - '
  },
  //view_5737
  {
    view_id: 'view_5737',
    edit_col: 'col-6',
    group_name: 'Compactor Log ID - '
  },
  {
    view_id: 'view_5736',
    edit_col: 'col-11',
    group_name: 'Butler Timeclock ID - '
  },
  //view_5740
  {
    view_id: 'view_5740',
    edit_col: 'col-10',
    group_name: 'Service Hazard ID - '
  },
  {
    view_id: 'view_5738',
    edit_col: 'col-8',
    group_name: 'RADAR Log ID - '
  },
]

flexTables.forEach((element, index, array) => {
  $(document).on(`knack-view-render.${element.view_id}`, function(event, view, data) {
    $(`#${element.view_id} tr.kn-table-group td`).prepend(`${element.group_name}`)
    for(var i = 0; i < $(`#${element.view_id} tbody tr`).length; i++){
      var link = $($(`#${element.view_id} tbody tr .${element.edit_col}`)[i]).find("a").attr("href")
      $($(`#${element.view_id} tbody tr .${element.edit_col}`)[i]).html(`<a href=${link}><i class='fa fa-pencil flex-table-edit'></i></a>`);
    }
      if( element.view_id == 'view_5736' ){
      }
  });
});

$(document).on('knack-view-render.view_5736', function(event, view, data) {
  
  for(var i = 0; i < data.length; i++){
    var approveText = 'Approve';
    var flaggedHtml = `Flag`
    if(data[i]["field_2252.field_2212_raw"].length != 0){
      approveText = 'Unflag & Approve';
      flaggedHtml = `<i class="fa fa-flag" style="font-size: 1.25em; margin-right: 0.4em; color: #e94c4c;"></i>`
    }
    var approveLink = $($(`#view_5736 tbody tr .col-9`)[i]).find("a").attr("href");
    var flagLink = $($(`#view_5736 tbody tr .col-10`)[i]).find("a").attr("href");
    $($(`#view_5736 tbody tr .col-9`)[i]).html(`<a href=${approveLink}>${approveText}</a>`);
    $($(`#view_5736 tbody tr .col-10`)[i]).html(`<a href=${flagLink}>${flaggedHtml}</a>`);
  }
});

//view_5728
$(document).on('knack-view-render.view_5728', function(event, view, data) {
  $('#view_5728 .kn-details-link').hide()
  var notUpdated = data.field_359 - data.field_360;
  $('#view_5728 .field_360 .kn-detail-body span:first').text(notUpdated)
  $('#view_5728 .field_809 .kn-detail-body span:first').addClass('flex-by-numbers-green');
  data.field_1805 > 0 ? $('#view_5728 .field_1805 .kn-detail-body span:first').addClass('flex-by-numbers-red') : $('#view_5728 .field_1805 .kn-detail-body span:first').addClass('flex-by-numbers-green')
  data.field_3073 > 0 ? $('#view_5728 .field_3073 .kn-detail-body span:first').addClass('flex-by-numbers-red') : $('#view_5728 .field_3073 .kn-detail-body span:first').addClass('flex-by-numbers-green')
  $('#view_5728 .field_301 .kn-detail-body span:first').addClass('flex-by-numbers-green');
  $('#view_5728 .field_359 .kn-detail-body span:first').addClass('flex-by-numbers-green');
  notUpdated > 0 ? $('#view_5728 .field_360 .kn-detail-body span:first').addClass('flex-by-numbers-red') : $('#view_5728 .field_360 .kn-detail-body span:first').addClass('flex-by-numbers-green')
  $('#view_5728 .field_589 .kn-detail-body span:first').addClass('flex-by-numbers-green');

   $('#view_5728 .kn-detail.field_809').wrap(`<a href="${$($('#sv_timeclocks').parents()[1]).attr('href')}"></a>`) //Timeclock
   $('#view_5728 .kn-detail.field_1805').wrap(`<a href="${$($('#sv_bn_not_clockout').parents()[1]).attr('href')}"></a>`) //Not Clocked Out
   $('#view_5728 .kn-detail.field_3073').wrap(`<a href="${$($('#sv_bn_flag').parents()[1]).attr('href')}"></a>`) //Flag
   $('#view_5728 .kn-detail.field_301').wrap(`<a href="${$($('#sv_bn_infractions').parents()[1]).attr('href')}"></a>`) //Inf
   $('#view_5728 .kn-detail.field_359').wrap(`<a href="${$($('#sv_bn_radar').parents()[1]).attr('href')}"></a>`) //RAD
   $('#view_5728 .kn-detail.field_360').wrap(`<a href="${$($('#sv_bn_not_updated').parents()[1]).attr('href')}"></a>`) //Not Updated
   $('#view_5728 .kn-detail.field_589').wrap(`<a href="${$($('#sv_bn_hazards').parents()[1]).attr('href')}"></a>`) //Hazards

});

//view_5811
$(document).on('knack-view-render.view_5811', function(event, view, data) {
  // field_809 Timeclocks
  // field_1805 Not Clocked Out
  // field_3073 Flagged T
  // field_301 Infractions
  // field_359 RADAR Logs
  // field_360 Not Updted
  // field_589 Service Hazards
  var tclockNum = data.field_809;
  var notClockedNum = data.field_1805;
  var flaggedNum = data.field_3073;
  var infNum = data.field_301;
  var radNum = data.field_359;
  var notUpdated = data.field_359 - data.field_360;
  var serHazNum = data.field_589;
  $('#view_5811 .kn-details-link').hide();

  $('#view_5811 .field_360 .kn-detail-body span:first').text(notUpdated)
  $('#view_5811 .field_809 .kn-detail-body span:first').addClass('flex-by-numbers-green');
  notClockedNum > 0 ? $('#view_5811 .field_1805 .kn-detail-body span:first').addClass('flex-by-numbers-red') : $('#view_5811 .field_1805 .kn-detail-body span:first').addClass('flex-by-numbers-green')
  flaggedNum > 0 ? $('#view_5811 .field_3073 .kn-detail-body span:first').addClass('flex-by-numbers-red') : $('#view_5811 .field_3073 .kn-detail-body span:first').addClass('flex-by-numbers-green')
  $('#view_5811 .field_301 .kn-detail-body span:first').addClass('flex-by-numbers-green');
  $('#view_5811 .field_359 .kn-detail-body span:first').addClass('flex-by-numbers-green');
  notUpdated > 0 ? $('#view_5811 .field_360 .kn-detail-body span:first').addClass('flex-by-numbers-red') : $('#view_5811 .field_360 .kn-detail-body span:first').addClass('flex-by-numbers-green')
  $('#view_5811 .field_589 .kn-detail-body span:first').addClass('flex-by-numbers-green');
  var timeClock_dis, notClock_dis, flg_dis, inf_dis, rad_dis, notUpdated_dis, serHaz_dis;

  tclockNum == 0 ? timeClock_dis = "pointer-events: none" : timeClock_dis = '';
  notClockedNum == 0 ? notClock_dis = "pointer-events: none" : notClock_dis = '';
  flaggedNum == 0 ? flg_dis = "pointer-events: none" : flg_dis = '';
  infNum == 0 ? inf_dis = "pointer-events: none" : inf_dis = '';
  radNum == 0 ? rad_dis = "pointer-events: none" : rad_dis = '';
  notUpdated == 0 ? notUpdated_dis = "pointer-events: none" : notUpdated_dis = '';
  serHazNum == 0 ? serHaz_dis = "pointer-events: none" : serHaz_dis = '';

  $('#view_5811 .kn-detail.field_809').wrap(`<a style="${timeClock_dis}" href="${$($('#sv_timeclocks').parents()[1]).attr('href')}"></a>`) //Timeclock
  $('#view_5811 .kn-detail.field_1805').wrap(`<a style="${notClock_dis}" href="${$($('#sv_bn_not_clockout').parents()[1]).attr('href')}"></a>`) //Not Clocked Out
  $('#view_5811 .kn-detail.field_3073').wrap(`<a style="${flg_dis}" href="${$($('#sv_bn_flag').parents()[1]).attr('href')}"></a>`) //Flag
  $('#view_5811 .kn-detail.field_301').wrap(`<a style="${inf_dis}" href="${$($('#sv_bn_infractions').parents()[1]).attr('href')}"></a>`) //Inf
  $('#view_5811 .kn-detail.field_359').wrap(`<a style="${rad_dis}" href="${$($('#sv_bn_radar').parents()[1]).attr('href')}"></a>`) //RAD
  $('#view_5811 .kn-detail.field_360').wrap(`<a style="${notUpdated_dis}" href="${$($('#sv_bn_not_updated').parents()[1]).attr('href')}"></a>`) //Not Updated
  $('#view_5811 .kn-detail.field_589').wrap(`<a style="${serHaz_dis}" href="${$($('#sv_bn_hazards').parents()[1]).attr('href')}"></a>`) //Hazards

});
//view_5729
$(document).on('knack-view-render.view_5729', function(event, view, data) {
  if(data.field_55_raw){
    $('#view_5729 .kn-special-title h3').prepend(`<span class="flex-assigned-butlers-num">${data.field_55_raw.length} </span>`)
  }
});

//view_5812
$(document).on('knack-view-render.view_5812', function(event, view, data) {
  if(data.field_55_raw){
    $('#view_5812 .kn-special-title h3').prepend(`<span class="flex-assigned-butlers-num">${data.field_55_raw.length} </span>`)
  }
});

//view_5729
$(document).on('knack-view-render.view_5771', function(event, view, data) {
  $('#view_5771 .kn-details-link').hide()
  $("#view_5771").on({
    mouseenter: function () {
        $('#view_5771 .kn-details-link').show()
    },
    mouseleave: function () {
        $('#view_5771 .kn-details-link').hide()
    }
  });
});

$(document).on('knack-view-render.view_5823', function(event, view, data) {
  $('#view_5823 .kn-details-link').hide()
  $("#view_5823").on({
    click: function () {
        $('#view_5823 .kn-details-link').show()
    }
  });
});

//view_5816
$(document).on('knack-view-render.view_5816', function(event, view, data) {
  console.log(data)
  if(data.length > 0 && $('#q_survey').length === 0){
    $($('#infraction_warning').parents()[1]).append(`<p class="hideMe" id="q_survey" style="color: #15467A;padding-left: 10px;">
    <a style="text-decoration: none;" href="${$('#view_5816 .kn-details-link').find('a').attr('href') }">
      <i style="margin-top: 0.3em;" class="fa fa-pencil-square-o"></i> 
        Click Here to Edit my <strong style="color: #7bc245;">Q1 Trash Butler Satisfaction Survey</strong></a></p>`)
  }
});

//
$(document).on('knack-view-render.view_5833', function(event, view, data) {
  console.log(data, "view_5833")

  var currentCMRoles = Knack.session.user.profile_objects;
  var currentCMId = currentCMRoles.find(x => x.object == "object_5").entry_id;
  
  let waitInt1 = setInterval(() => {
    if ($('#q_survey').length > 0 ) {
      for(var i = 0; i < data.length; i++){
        // if(data[i].field_2653_raw != true){
          console.log(data[i], "view_583311111111")
          const stillVisTo = (data[i].field_2894_raw).map((b) => {return b.id});
          console.log( stillVisTo.includes(currentCMId), "currentCMId" )
          if( !stillVisTo.includes(currentCMId) ) $('#q_survey').removeClass('hideMe')
          break;
          
        // }
      }
      clearInterval(waitInt1)
    }
  }, 500);
});

//view_5814 List View Service ID Details > FlexAd
$(document).on('knack-view-render.view_5814', function(event, view, data) {
  $('.field_1339 .kn-detail-body').hide();
  $('.field_2212 .kn-detail-body').hide();
  //
  for(var i = 0; i < data.length; i++){
    if( data[i].field_2240_raw == "Butler Timeclock" ){
      $($($('.flex-m-delete')[i]).parents()[3]).hide()
    }
    
  }
  //
  for(var i = 0; i < $('.flex-edit-link').length; i++){
    $($('.flex-edit-link')[i]).attr('href', $($($('.flex-edit-link')[i]).parents()[3]).find(`a:not('.flex-edit-link')`).attr('href') )
     $($($('.flex-edit-link')[i]).parents()[3]).find(`.kn-detail-body`).hide()
  }
  for(var i = 0; i < $('.flex-m-timeclock-flag').length; i++){
    var approveText = 'Approve';
    var flaggedHtml = `Flag Timeclock`;
    var approveLink = $($($('.flex-m-timeclock-approve')[i]).parents()[3]).find(`a:not('.flex-m-timeclock-approve')`).attr('href')
    var flagLink = $($($('.flex-m-timeclock-flag')[i]).parents()[3]).find(`a:not('.flex-m-timeclock-flag')`).attr('href')
    
    if( $($($('.flex-m-timeclock-flag')[i]).parents()[3]).find(`a:not('.flex-m-timeclock-flag')`).text() != 'No' ){
       $($(`.flex-m-timeclock-flag`)[i]).addClass('disable-flag');
      approveText = 'Unflag & Approve';
      flaggedHtml = `<span class=""><i class="fa fa-flag" style="font-size: 1.25em; margin-right: 0.4em; color: #e94c4c;"></i> Flagged</span>`;
    }

    if( $($($('.flex-m-timeclock-approve')[i]).parents()[3]).find(`a:not('.flex-m-timeclock-approve')`).text() == 'Yes' ){
        $($('.flex-m-timeclock-approve')[i]).css('pointer-events', 'none')
        approveText = `<span class=""><i class="fa fa-check-circle" style="font-size: 1.25em; margin-right: 0.4em; color: green;"></i> Timeclock Approved</span>`;
    }

    $($(`.flex-m-timeclock-approve`)[i]).html(`<a href=${approveLink}>${approveText}</a>`);
    $($(`.flex-m-timeclock-flag`)[i]).html(`<a href=${flagLink}>${flaggedHtml}</a>`);
  }
});

// view_5730 Desktop
$(document).on('knack-view-render.view_5730', function(event, view, data) {

  $('#as_command_center_theme').remove();
  if( screen.width < 650){
    if( Knack.user.id == '611d18ecfbee5b07a16a5bd5xxxx' ){
      var newUrl = Knack.url_base+'#';
      for (let i = 0; i < Knack.hash_parts.length; i++) {
          if(Knack.hash_parts[i] === "service-id--flexadd-details2"){
              newUrl = newUrl + 'service-id--flexadd-details-mobile2/'
          }else{
              newUrl = newUrl + Knack.hash_parts[i] + '/'
          }
      }
      window.location.href = newUrl+'?'+(Knack.query_string || "");
    }else{
      var newUrl = Knack.url_base+'#';
      for (let i = 0; i < Knack.hash_parts.length; i++) {
          if(Knack.hash_parts[i] === "service-id--flexadd-details2"){
              newUrl = newUrl + 'service-id--flexadd-details-mobile2/'
          }else{
              newUrl = newUrl + Knack.hash_parts[i] + '/'
          }
      }
      window.location.href = newUrl+'?'+(Knack.query_string || "");
    }
  }
});

function getFlexAddServiceIDs(){
  return $.ajax({
      type: 'GET',
      headers: asHeader,
      url: 'https://api.sv.knack.com/v1/pages/scene_2010/views/view_5675/records',
      success: function(data) {
        var isActive = '';
        for(var i = 0; i < data.records.length; i++){
          
          if( Knack.hash_id == data.records[i].id ){ isActive = 'active' }else{ isActive = '' }
          $('#services_pool_main_container ul').append(`<li class="kn-detail-label service-pool-item ${isActive}" data-id="${data.records[i].id}">Service ID - ${data.records[i].field_95}</li>`)
        }

        $('.service-pool-item').on('click', function(){
            var id = $( this ).attr('data-id');
            window.location.href = Knack.url_base+'#'+Knack.hash_parts[0]+'/service-id--flexadd-details2/'+id + (Knack.query_string || "");
        })
      }
  });
}

var serviceQueueINIT = [
    { 'v_id': 'view_5851', 'review_view_id': 'view_5810', 'serv_title_view_id': 'view_5808' }, //Mobile Version https://builder.sv.knack.com/apps/trashdash/pages/scene_2042/views/view_5851/menu
    { 'v_id': 'view_5964', 'review_view_id': 'view_5726', 'serv_title_view_id': 'view_5730' },
]
for (let i = 0; i < serviceQueueINIT.length; i++) {
    $(document).on(`knack-view-render.${serviceQueueINIT[i].v_id}`, function(event, view, data) {
      //add css
      $('#services_quickqueue').removeClass('hideMe')
      $('#flex_reviewed_queue_count').remove();
      if( $('#phase_one_test_theme').length === 0 ){
          $('head').append('<link rel="stylesheet" type="text/css" id="phase_one_test_theme" class="lazyload" href="https://cream-stitch-bagel.glitch.me/style.css">')
      }
      getFlexServices(serviceQueueINIT[i].v_id, true, serviceQueueINIT[i].review_view_id, serviceQueueINIT[i].serv_title_view_id)
      var review_data = [];
      if(Knack.flexServices){ review_data = Knack.flexServices }
      //
      $(`#${serviceQueueINIT[i].v_id}`).hide()
      var url = window.location.href
      var url = url.split(`?`)[0] +`start-new-filter/`
      $($(`#${serviceQueueINIT[i].v_id} a`)[0]).attr(`href`, url+Knack.hash_id);

      var review_data = JSON.parse(sessionStorage.getItem("review_data")) || [];
      Knack.service_review_data = review_data;
      
      if(review_data.length > 0){
            var reviewedCount = 0;
            Knack.reviewedCount = 0;
            var viewingCount = 1;
            $.each(review_data, function(index, value) {
                if (value.field_1025 !== "") {
                  reviewedCount++;
                  Knack.reviewedCount = Knack.reviewedCount + 1;
                }
                if(value.id === Knack.hash_id){
                  viewingCount = viewingCount + index;
                }
            });
          $($(`#${serviceQueueINIT[i].v_id} span`)[1]).text(`Viewing ${viewingCount}/${Knack.service_review_data.length} in Queue`).addClass('queue-element')
           if( $('#flex_reviewed_queue_count').length === 0 ){
              $(`#${serviceQueueINIT[i].v_id}`).append(`<div id="flex_reviewed_queue_count" class="review-count-num"><span class="queue-element">Reviewed <span class="num">${reviewedCount}</span>/<span class="den">${Knack.service_review_data.length}</span></span></div>`)
           }else{
              $(`#flex_reviewed_queue_count .num`).text(`${reviewedCount}`)
           }
            $(`#kn-app-mobile-container`).append($(`#${serviceQueueINIT[i].v_id}`));
            $(`#${serviceQueueINIT[i].v_id}`).show()
        flexQueue_getCurrentActiveFilter()
        $('#flex_return_active_queue').on('click', function(){
          window.location.href = Knack.url_base+'#'+Knack.hash_parts[0]+'/service-id--flexadd-details-mobile2/'+Knack.flexServices[0].id+'?'+(Knack.query_string || "");
        })
          
      } else {
      }
    });
}


$(document).on('knack-view-render.view_5867', function(event, view, x) {
  var data = JSON.parse(sessionStorage.getItem("review_data")) || [];
  var filters = JSON.parse(sessionStorage.getItem("review_data_active_filters")) || [];
  if(filters.length > 0){
    var filterViewId = filters[1].view_id;
  var filterSceneId = filters[1].scene_id;
  var filters = filters[0]
  $('.modal-card-title').text('Manage Active Queue');
  var queueFirst = `<div class="refresh-cancel-btns row">
  <div class="col col-lg-6"></div>
  <div class="col col-lg-3">
  <p class="text-grn" id="refresh_queue"><i class="fa fa-refresh" aria-hidden="true"></i>Refresh Queue</p>
  </div>
  <div class="col col-lg-3">
  <p class="text-red" id="cancel_queue"><i class="fa fa-times-circle-o" aria-hidden="true"></i>Cancel Queue</p>
  </div>
  </div>`;
  var queueSec = `<div class="reviewed-count">
  <h3>${Knack.reviewedCount}/${data.length} Reviewed</h3>
  </div>
  <div class="active-filters hideMe">
  <p> <span class="blue">Active Filters:</span> <span class="blue-paragraph">1/30/23</span><span
  class="spacer">,</span> <span class="green">Completed</span><span class="spacer">,</span> <span
  class="red">Not Reviewed</span> </p>
  </div>
  <div class="text-instructions">
  <p>From this screen, you can quickly navigate the Active Queue or Cancel the Active Queue</p>
  </div>`;
  $('#view_5867').prepend(queueSec);
  $('#view_5867').prepend(queueFirst);
  if(Knack.flexServices){
    data = Knack.flexServices;
  }
  if( Knack.flex_queue_params ){
    window.location.href = window.location.href+'?'+Knack.flex_queue_params;
    Knack.flex_queue_params = undefined;
  }
  $('#view_5867 .service-pool-item').remove();
  $('#view_5867 .kn-entries-summary').remove()
  $('#view_5867 .kn-list-content').remove()
  if( $('#services_pool_main_container_currentFilter').length === 0 ){
    $('#view_5867').append('<div id="services_pool_main_container_currentFilter"></div>');
  }
  var isActive;
  for(var i = 0; i < data.length; i++){
    if( Knack.hash_id == data[i].id ){ isActive = 'flex-queue-current-service' }else{ isActive = '' }
    var iconNotReviewed = 'fa-circle-thin';
    var iconReviewed = 'fa-check-circle';
    var icon;
    if(data[i].field_1025 == ""){
      icon = iconNotReviewed;
    }else{
      icon = iconReviewed;
    }
    var cardItem;
    cardItem = `<div class="card-holder row ${isActive}">
      <div class="col col-lg-1">
      <i class="fa ${icon}" aria-hidden="true"></i>
      </div>
      <div class="col col-lg-3">
      <p class="kng-ttl">${data[i].field_54}</p>
      <p class="ttle-dt"> ${data[i].field_46} - ${data[i].field_95}</p>
      <p class="status-text">${data[i].field_121}</p>
      </div>
      <div class="col col-lg-5 time-holder">
      <p class="complete-time">Started at: ${data[i].field_122}</p>
      <p class="complete-time">Completed at: ${data[i].field_123}</p>
      </div>
      <div class="col col-lg-3 btn-holder">
      <button data-id="${data[i].id}" class="btn-go service-pool-item">Go to ID</button>
      <p>${data[i].field_1025}</p>
      </div>
      <i style="cursor:pointer;" data-id="${data[i].id}" class="fa fa-trash delete-queue-item" aria-hidden="true"></i>
      </div>`;
    if( Knack.isMobile() ){
      cardItem = `<div class="card-holder row ${isActive}">
        <div class="col col-12" style="text-align: center;">
          <i class="fa ${icon}" aria-hidden="true"></i>
          <span class="kng-ttl">${data[i].field_54}</span>
          <span>${data[i].field_1025}</span>
        </div>
        <div class="col col-6">
          <span class="status-text">${data[i].field_121}</span>
          <span class="ttle-dt"> ${data[i].field_46} - ${data[i].field_95}</span>
        </div>
        <div class="col col-6 time-holder" style="display: inline-grid;">
          <span class="complete-time">Started at: ${data[i].field_122}</span>
          <span class="complete-time">Completed at: ${data[i].field_123}</span>
        </div>
        <div class="col col-12 btn-holder">
          <button style="width: 100%;" data-id="${data[i].id}" class="btn-go service-pool-item">Go to ID</button>
        </div>
      </div>`;
    }
    $('#services_pool_main_container_currentFilter').append(cardItem);
  }

  $('.service-pool-item').on('click', function(){
      var url = window.location.href;
      Knack.flex_queue_params = url.split('?')[1];
      var id = $( this ).attr('data-id');
      window.location.href = Knack.url_base+'#'+Knack.hash_parts[0]+'/service-id--flexadd-details-mobile2/'+id;
  })

  $('.delete-queue-item').on('click', function(){
      flexQueue_loading();
      var id = $( this ).attr('data-id');
      flexQueue_removeQueueItem(id)
      $('.close-modal').click();
      setTimeout(function() {
      Knack.router.scene_view.renderViews()
      }, 300); 
  })

  $('#cancel_queue').on('click', function(){
    flexQueue_loading()
    $('.close-modal').click();
    sessionStorage.removeItem("review_data");
    sessionStorage.removeItem("review_data_active_filters");
    sessionStorage.removeItem("flex_queue_started");
    $('#flex_queue_sibar').remove()
    $('#services_quickqueue').remove()
    $($('#flex_reviewed_queue_count').parents()[0]).remove()
    $('#sv-top-back').click();
    setTimeout(function() {
      window.location.href = $('#sv-top-back').attr('href')
    }, 100);
  })

  $('#refresh_queue').on('click', function(){
    flexQueue_loading();
    var href = $('#view_5964 .kn-link-1').attr('href');
    return $.ajax({
      type: 'GET',
      headers: asHeader,
      url: `https://api.sv.knack.com/v1/pages/${filterSceneId}/views/${filterViewId}/records?filters=${encodeURIComponent(JSON.stringify(filters))}&page=1&rows_per_page=99`,
      success: function(newData) {
          sessionStorage.setItem("review_data", JSON.stringify(newData.records));
          $('.close-modal').click();
          $('#flex_reviewed_queue_count').remove();
          setTimeout(function() {
              Knack.router.scene_view.renderViews()
          }, 100);
      }
    });
  })
  }

});

$(document).on('knack-form-submit.view_5732', function(event, view, record) {
    $('.close-modal').click();
    setTimeout(function() {
        window.location.href = $('#sv-top-back').attr('href')
    }, 1000);
});

//Dev Service Queuw 
$(document).on('knack-form-submit.view_5874', function(event, view, record) {
  Knack.router.scene_view.renderViews()
  var review_data = JSON.parse(sessionStorage.getItem("review_data"));
  $.each(review_data, function(index, value) { //Need to change
      if (value.id === record.id ) {
        value.reviewed = true;
        value.field_1025 = record.field_1025;
        value.field_1025_raw = record.field_1025_raw;
        return false;
      }
  });
  sessionStorage.setItem("review_data", JSON.stringify(review_data));
  if( Knack.flex_justClose ){
    $('.close-modal').click();
    setTimeout(function() {
      Knack.router.scene_view.renderViews()
    }, 1000);
  }
  else if(Knack.nextReviewId !== null){
    window.location.href = Knack.flex_next_service_link;
  }
  else{
    $('.close-modal').click();
  }
});

//view_5864 - Current LIVE - https://builder.sv.knack.com/apps/trashdash/pages/scene_2014/views/view_5864/rich_text
$(document).on('knack-view-render.view_5864', function(event, view, data) {
  //retrieve review_data from session storage
  var review_data = JSON.parse(sessionStorage.getItem("review_data"));
  Knack.nextReviewId = null;
  Knack.flex_can_proceed_next = true;
  Knack.flex_next_service_link = null;
    for (var i = 0; i < review_data.length; i++) {
      if (review_data[i].id !== Knack.hash_id && review_data[i].reviewed === false) {
          Knack.nextReviewId = review_data[i].id;
          Knack.flex_can_proceed_next = true;
          Knack.flex_next_service_link = 'https://apps.sv.knack.com/trashdash#service-activity-logs/service-id--flexadd-details-mobile2/'+review_data[i].id;
          break;
      }
  }

  if( Knack.nextReviewId === null ){
    $('#view_5864').hide()
  }

  $('#view_5864 button').on('click', function(){
    $('#view_5732 form').submit();
  })
});

function getFlexServices(view_id, canCreate, review_view_id, serv_title_view_id){
  var review_data = JSON.parse(sessionStorage.getItem("review_data")) || [];
  for (var i = 0; i < review_data.length; i++) {
    if (review_data[i]["id"] === Knack.hash_id) {
      if(review_view_id != "view_5874") review_data[i]["field_1025"] = Knack.views[review_view_id].record.field_1025;
      else{
        review_data[i]["field_1025"] = Knack.views.view_5874.model.attributes.field_1025;
      }
      break;
    }
  }
  // Store the updated data back into the local storage
  sessionStorage.setItem("review_data", JSON.stringify(review_data));

  Knack.flexServices = review_data;
  Knack.nextReviewId = null;
  Knack.flex_next_service_link = null;

  // Find the index of the current service ID
  const currentServiceId = Knack.hash_id;
  const currentIndex = review_data.findIndex(service => service.id === currentServiceId);

  // Get the previous service ID
  let previousServiceId;
  if (currentIndex > 0) {
      previousServiceId = review_data[currentIndex - 1].id;
  } else {
      previousServiceId = null;
  }

  // Get the next service ID
  let nextServiceId;
  if (currentIndex < review_data.length - 1) {
      nextServiceId = review_data[currentIndex + 1].id;
  } else {
      nextServiceId = null;
  }

  Knack.flex_nextServiceId = nextServiceId;
  Knack.flex_previousServiceId = previousServiceId;
  if(canCreate){
     createFlexAddServiceNavigation(serv_title_view_id);
  }

}

function getUrlNextPrev(id){
  var newUrl = '#';
  var urlWithoutHashId = '#'
  for (let i = 0; i < Knack.hash_parts.length; i++) {
      if(Knack.hash_parts[i] === Knack.hash_id){
        //service-id--flexadd-details-mobile2 service-id--flexadd-details2
          newUrl = newUrl + id+'/';
      }else{
          newUrl = newUrl + Knack.hash_parts[i] + '/'
          urlWithoutHashId = urlWithoutHashId + Knack.hash_parts[i] + '/'
      }
  }
  if(Knack.query_string){
        newUrl = newUrl+'?'+(Knack.query_string || "");
  }
  Knack.urlWithoutHashId = urlWithoutHashId;
  return newUrl;
}

function createFlexAddServiceNavigation(v_id){
 if( $('.previous-service-id').length === 0 ){
    $(`#${v_id} h2`).prepend(`<a href="#" class="previous-service-id"><i class="fa fa-chevron-circle-left"><i/></a>`)
 }
 if( $('.next-service-id').length === 0 ){
  $(`#${v_id} h2`).append(`<a href="#" class="next-service-id"><i class="fa fa-chevron-circle-right"><i/></a>`)
 }
  $(`#${v_id} h2`).css({
    "display": "flex",
    "justify-content": "space-between"
  });

  // Update the previous service ID arrow
  if (Knack.flex_previousServiceId) {
      $(".previous-service-id").attr("href", getUrlNextPrev(Knack.flex_previousServiceId));
  } else {
      $(".previous-service-id").addClass("flex-disabled");
  }

  // Update the next service ID arrow
  if (Knack.flex_nextServiceId) {
      $(".next-service-id").attr("href", getUrlNextPrev(Knack.flex_nextServiceId));
  } else {
      $(".next-service-id").addClass("flex-disabled");
  }
}

//view_5875 DEV ONLY - Submit and Proceed Btn
$(document).on('knack-view-render.view_5875', function(event, view, data) {
  var review_data = JSON.parse(sessionStorage.getItem("review_data")) || [];
  Knack.flexServices = review_data;
  for (var i = 0; i < review_data.length; i++) {
    if (review_data[i].id == Knack.hash_id) {
      if(review_data.length == 1+i){
        $('#view_5875 button').text('Submit Review & Go to Services Page')
        Knack.nextReviewId = 'X';
        Knack.flex_next_service_link = $('#sv-top-back').attr('href');
        break;
      }else{
        Knack.nextReviewId = review_data[i+1].id;
        Knack.flex_next_service_link = Knack.url_base+'#'+Knack.hash_parts[0]+'/service-id--flexadd-details2/'+review_data[i+1].id + '?'+(Knack.query_string || "");
        break;
      }
    }
  }

  if( review_data.length < 2 ){
    Knack.flex_justClose = true;
    $('#view_5875 button').text('Submit Review')
  }else{
     $('#view_5875').append('<a id="flex_just_close">or Just Submit and Close this Form</a></div>')
  }

  $('#flex_just_close').on('click', function(){
      flexQueue_loading()
      Knack.flex_justClose = true;
      $('#view_5874 form').submit();
  })

  $('#view_5875 button').on('click', function(){
      flexQueue_loading()
      Knack.flex_justClose = false;
      $('#view_5874 form').submit();
  })
});


// Service IDs Table/List > FlexAdd Records
function getMoreServiceIDs(v_id, i){
  var filters = Knack.views[v_id].model.view.filters;
  var currentScene = Knack.router.current_scene_key
  return $.ajax({
    type: 'GET',
    headers: asHeader,
    url: `https://api.sv.knack.com/v1/pages/${currentScene}/views/${v_id}/records?filters=${encodeURIComponent(JSON.stringify(filters))}&page=1&rows_per_page=99`,
    success: function(data) {
      $('#flex_loading_btn_test').html('DATA IS LOADED')
      var data = data.records;
      var newData = data;
      Knack.flexServices = data;
      Knack.service_review_data = newData;
      var activeFilters = Knack.views[v_id].model.view.filters.rules || [];
      var viewDataSource = Knack.views[v_id].model.view.source.criteria.rules;
      var serviceObjectAttr = Knack.objects.models.filter(item => item.id === "object_9")[0].attributes.fields;
      for (let i = 0; i < viewDataSource.length; i++) {
          var fieldName;
          if(!viewDataSource[i].field_name){
              fieldName = serviceObjectAttr.filter(item => item.key === viewDataSource[i].field)[0].name;
              viewDataSource[i].field_name = fieldName
          }
      }
      activeFilters = activeFilters.concat(viewDataSource);
      
      Knack.queue_service_views[v_id] = {
        "filters": activeFilters,
        "data": newData
      }
      if( data.length > 0 ){ 
        $($(`#${serviceIdsFlexAdd[i].v_id} .kn-records-nav .level`)[0]).append(`<div class="sv-flex-table-start-queue-btn"
        "><a class="sv-flex-table-start-queue-link" 
        href="#${Knack.home_slug}/service-id--flexadd-details-mobile2/${newData[0].id}/?${(Knack.query_string || "")}"
        >Start Service Queue</a></div>`)
      }else{
        $(`${v_id} .sv-flex-table-start-queue-link`).hide()
      }

      if( Knack.isMobile() ){
        $('.sv-flex-table-start-queue-btn').css({
            "text-align": "center",
            "margin-top": "1.2em",
            "margin-bottom": "1.5em"})
      }

      $(`#${v_id} .sv-flex-table-start-queue-link`).on('click', function(){
        Knack.current_view_queue = v_id;
        var viewData = Knack.queue_service_views[v_id].data;
        var viewFilter = Knack.queue_service_views[v_id].filters;
        var d = new Date();
        var localtime = d.toLocaleTimeString('en-US', { hour12: true });
        Knack.flexQueueStartAt = localtime;
        for (let i = 0; i < viewData.length; i++) {
          viewData[i].current_queue_isReviewed = false;
        }
        viewFilter = [viewFilter, {"view_id": v_id, "scene_id": currentScene}]
        sessionStorage.setItem("review_data", JSON.stringify(viewData));
        sessionStorage.setItem("review_data_active_filters", JSON.stringify(viewFilter));
        sessionStorage.setItem("flex_queue_started", JSON.stringify(localtime));
      })
    }
  });
}

var serviceIdsFlexAdd = [ //This array is used for Starting a Queue
    { 'v_id': 'view_5958' },
    { 'v_id': 'view_5966' },
    { 'v_id': 'view_5998' },//First Phase View
    { 'v_id': 'view_5999' },//First Phase View with DS
    { 'v_id': 'view_6000' },//QuickQueue List view https://builder.sv.knack.com/apps/trashdash/pages/scene_2079
    { 'v_id': 'view_6001' },//QuickQueue List view https://builder.sv.knack.com/apps/trashdash/pages/scene_2079
    { 'v_id': 'view_6002' },//QuickQueue List view https://builder.sv.knack.com/apps/trashdash/pages/scene_2079
    { 'v_id': 'view_6003' },//QuickQueue List view https://builder.sv.knack.com/apps/trashdash/pages/scene_2079
    { 'v_id': 'view_6019' },//Queue Pilot Test Page https://builder.sv.knack.com/apps/trashdash/pages/scene_2086
    { 'v_id': 'view_6016' },//Queue Pilot Test Page https://builder.sv.knack.com/apps/trashdash/pages/scene_2086
    { 'v_id': 'view_6020' },//Queue Pilot Test Page https://builder.sv.knack.com/apps/trashdash/pages/scene_2086
    { 'v_id': 'view_6021' },//Queue Pilot Test Page https://builder.sv.knack.com/apps/trashdash/pages/scene_2086
    { 'v_id': 'view_5850' },//Late Service > Flex Testing
]
for (let i = 0; i < serviceIdsFlexAdd.length; i++) {
  if(!Knack.queue_service_views){
    Knack.queue_service_views = []
  }
  $(document).on(`knack-view-render.${serviceIdsFlexAdd[i].v_id}`, function(event, view, data) {
      getMoreServiceIDs(serviceIdsFlexAdd[i].v_id, i);
  });
}

//views array
var servicesPerRole = [
  'view_5970', //Staff
  'view_5976', //TM
  'view_5977', //FOQM
  'view_5971', //AS
]

//getServiceData
function getServiceData(view_id, filter, title, btnId, id){
  return $.ajax({
    type: 'GET',
    headers: asHeader,
    url: `https://api.sv.knack.com/v1/pages/scene_2079/views/${view_id}/records?rows_per_page=99&filters=${encodeURIComponent(JSON.stringify(filter))}&sort_field=field_95&sort_order=desc`,
    success: function(data) {
      $(`#${btnId}`).prop('disabled', false)
      Knack[`${id}`] = data;
    }
  });
}

//End FlexAdd QuickQueue

//queues functions
function initQueues(){
  var review_data = [];
  sessionStorage.setItem("flexQueu_review_data", JSON.stringify(review_data))
  Knack.flexQueu_review_data = []
} //

function flexQueue_getQueuesData(){} //API

function flexQueue_getQueuesDataFromLocal(){} //Session Storage

function flexQueue_refreshQueues(){} //

function flexQueue_setSessionQueuesData(){} //

function flexQueue_createComponents(){}//

function flexQueue_removeQueueItem(id){
  var review_data = JSON.parse(sessionStorage.getItem("review_data"));
  var newData = $.grep(review_data, function(item) {
    return item.id !== id;
  });
  sessionStorage.setItem("review_data", JSON.stringify(newData));
}//

function flexQueue_countRecords(data){
  if(data.length > 0){
  var reviewedCount = 0;
  Knack.reviewedCount = 0;
  var viewingCount = 1;
  $.each(data, function(index, value) {
    if (value.field_1025 !== "") {
      reviewedCount++;
      Knack.reviewedCount = Knack.reviewedCount + 1;
    }
    if(value.id === Knack.hash_id){
      viewingCount = viewingCount + index;
    }
  });
  }
}

function flexQueue_updateComponent(className, data){
  $(`.${className}`).text(data)
  
}//

//queue-element
function flexQueue_loading(className, data){
  $(`.queue-element`).text('Loading...')
}//

function flexQueue_getCurrentActiveFilter(){
  var review_data_active_filters = JSON.parse(sessionStorage.getItem("review_data_active_filters")) || [];
  try{
    var filters = review_data_active_filters[0];
    if( filters.length > 0 ){
      var str = '';
      for (var i = 0; i < filters.length; i++) {
        var obj = filters[i];
          str += obj["field_name"] + ' ' + obj["operator"] + ' ' + obj["value"] + ', ';
          
      }
    }
  }
  catch(err){
  }
}
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
});

// $(document).on('knack-view-render.view_6035', function(event, view, data) {
//   // Create an object to hold the grouped scenes
//   var groupedScenes = {};
  
//   Knack.scenes.models.forEach(function(scene) {
//     // Extract scene properties
//     var id = scene.attributes.key;
//     var views = scene.attributes.views.map(view => view.key);
//     var slug = scene.attributes.slug;
//     var parentSlug = scene.attributes.parent || "PARENTS";
    
//     // Add scene information to appropriate grouping
//     if (!groupedScenes[parentSlug]) {
//       groupedScenes[parentSlug] = [];
//     }
//     groupedScenes[parentSlug].push({id, views, slug});
//   });
  
//   // Append the table to the container element
//   $('#view_6035').append(
//     `<table id="sceneViewIds" style="border-collapse: collapse; width: 100%;">
//       <thead>
//         <tr>
//           <th style="border: 1px solid black; padding: 8px; text-align: left;">Scene ID</th>
//           <th style="border: 1px solid black; padding: 8px; text-align: left;">View IDs</th>
//           <th style="border: 1px solid black; padding: 8px; text-align: left;">Slug</th>
//         </tr>
//       </thead>
//       <tbody>
//         ${Object.entries(groupedScenes).map(([parentSlug, scenes], index) => 
//           `<tr>
//             <td colspan="3" style="background-color: lightgray; border: 1px solid black; padding: 8px;"><strong>${parentSlug} - ${scenes[0].id}</strong></td>
//           </tr>
//           ${scenes.map(({id, views, slug}) => 
//             `<tr style="background-color: white;">
//                <td style="border: 1px solid black; padding: 8px;">${id}</td>
//                <td style="border: 1px solid black; padding: 8px;">${views.join(', ')}</td>
//                <td style="border: 1px solid black; padding: 8px;">${slug}</td>
//             </tr>`
//            ).join("")}
//          `
//         ).join("")}
//       </tbody>
//     </table>`
//   );  
// });

// $(document).on('knack-view-render.view_6035', function(event, view, data) {
//   // Create an object to hold the grouped scenes
//   var groupedScenes = {};

//   Knack.scenes.models.forEach(function(scene) {
//     // Extract scene properties
//     var id = scene.attributes.key;
//     var views = scene.attributes.views.map(view => view.key);
//     var slug = scene.attributes.slug;
//     var parentSlug = scene.attributes.parent || "PARENTS";

//     // Add scene information to appropriate grouping
//     if (!groupedScenes[parentSlug]) {
//       groupedScenes[parentSlug] = [];
//     }
//     groupedScenes[parentSlug].push({id, views, slug});
//   });

//   // Append the table to the container element
//   $('#view_6035').append(`
//     ${Object.entries(groupedScenes).map(([parentSlug, scenes], index) => `
//       <div style="margin-bottom: 20px;">
//         <button class="accordion" style="background-color: #f1f1f1; color: black; padding: 14px 20px; font-size: 16px; border: none; cursor: pointer; width: 100%; text-align: left; outline: none;">${parentSlug} - ${scenes[0].id}</button>
//         <div class="panel" style="padding: 0 18px; background-color: white; display: none; overflow: hidden;">
//           <table style="width: 100%;">
//             <thead>
//               <tr>
//                 <th style="text-align: left;">Scene ID</th>
//                 <th style="text-align: left;">Slug</th>
//                 <th style="text-align: left;">Subtable</th>
//               </tr>
//             </thead>
//             <tbody>
//               ${scenes.map(({id, views, slug}) => `
//                 <tr>
//                   <td style="text-align: left;">${id}</td>
//                   <td style="text-align: left;">${slug}</td>
//                   <td>
//                     <table style="width: 100%;">
//                       <thead>
//                         <tr>
//                           <th style="text-align: left; padding-right: 10px;">View ID</th>
//                           <th style="text-align: left;">In Script?</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         ${views.map(viewId => `
//                           <tr>
//                             <td style="text-align: left; padding-right: 10px;">${viewId}</td>
//                             <td></td> <!-- replace with your logic to determine if view is in script -->
//                           </tr>
//                         `).join('')}
//                       </tbody>
//                     </table>
//                   </td>
//                 </tr>
//               `).join('')}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     `).join('')}
//   `);

//   // Add accordion functionality
//   var acc = document.getElementsByClassName("accordion");
//   for (var i = 0; i < acc.length; i++) {
//     acc[i].addEventListener("click", function() {
//       this.classList.toggle("active");
//       var panel = this.nextElementSibling;
//       if (panel.style.display === "block") {
//         panel.style.display = "none";
//       } else {
//         panel.style.display = "block";
//       }
//     });
//   }
// });

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
    groupedScenes[parentSlug].push({id, views, slug});
  });

  // Append the table to the container element
  $('#view_6035').append(`
    ${Object.entries(groupedScenes).map(([parentSlug, scenes], index) => `
      <div style="margin-bottom: 20px;">
        <button class="accordion" style="background-color: #f1f1f1; color: black; padding: 14px 20px; font-size: 16px; border: none; cursor: pointer; width: 100%; text-align: left; outline: none;">${parentSlug} - ${scenes[0].id}</button>
        <div class="panel" style="padding: 0 18px; background-color: white; display: none; overflow: hidden;">
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
                <tr>
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
                          <tr>
                            <td style="text-align: left; padding-right: 10px;">${viewId}</td>
                            <td>${checkIfViewIdExists(viewId) ? 'Yes' : 'No'}</td>
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
    `).join('')}
  `);

  // Add accordion functionality
  var acc = document.getElementsByClassName("accordion");
  for (var i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
  }
});

var viewCache = {}; // Define a cache object to store the results of previous AJAX requests

function checkIfViewIdExists(viewId) {
  if (viewCache[viewId] !== undefined) { // Check if the result is already cached
    return viewCache[viewId];
  }
  
  // Replace "path/to/external/js/file.js" with the actual path to the external JavaScript file
  var result = $.ajax({
    url: "path/to/external/js/file.js",
    dataType: "script",
    async: false,
  }).done(function() {
    if ($(document).on(`knack-view-render.${viewId}`, function() {}).toString().includes(viewId)) {
      return true;
    } else {
      return false;
    }
  });
  
  viewCache[viewId] = result; // Cache the result for future use
  
  return result;
}


