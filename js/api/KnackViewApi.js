/******KNACK VIEW BASED API */
const KNACK_API_BASE_URL = "https://api.sv.knack.com";
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