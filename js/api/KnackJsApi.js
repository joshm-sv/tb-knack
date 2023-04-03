/*************
KNACK JS API
************/
var KNACK_API_BASE_URL = "https://api.sv.knack.com";
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