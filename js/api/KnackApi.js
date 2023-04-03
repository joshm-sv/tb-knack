//A simple Knack REST API interface that handles the 10 request/sec
//limitation of the KNACK REST API.
var KNACK_API_BASE_URL = "https://api.sv.knack.com";
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