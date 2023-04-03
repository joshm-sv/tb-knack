KnackApi = {};
KnackApi.callCount = 0;

KnackApi.knackCall = async function(type, urlParams, obj = null) {
    if (!type) return null;

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

        obj = obj || {};

        const headers = {
            'X-Knack-Application-Id': Knack.application_id,
            'X-Knack-REST-API-KEY': "bf7f051c-6bc6-49f8-a9da-0fef499088a4"
        };

        if (type === 'put' || type === 'post') {
            headers.Authorization = Knack.getUserToken();
            headers['Content-Type'] = 'application/json';
        }

        const response = await fetch(`${KNACK_API_BASE_URL}/v1/objects/${urlParams}`, {
            method: type,
            headers: headers,
            body: JSON.stringify(obj)
        });

        const data = await response.json();
        KnackApi.callCount--;

        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
};

KnackApi.knackGetAllObjects = async function(objects) {
    const promises = objects.map(object => {
        const url = `object_${object.id}/records`;
        return KnackApi.knackCall('get', url);
    });

    const responses = await Promise.all(promises);

    const records = responses.flatMap(response => response.records);

    return records;
};

KnackViewApi = {};
KnackViewApi.callCount = 0;

KnackViewApi.knackCall = async function(type, urlParams, obj = null) {
    if (!type) return null;

    try {
        await new Promise((resolve, reject) => {
            const waitInt = setInterval(() => {
                if (KnackViewApi.callCount < 5) {
                    KnackViewApi.callCount++;
                    clearInterval(waitInt);
                    resolve();
                }
            }, 100);
        });

        obj = obj || {};

        const headers = {
            'X-Knack-View-Id': Knack.view,
            'X-Knack-REST-API-KEY': "bf7f051c-6bc6-49f8-a9da-0fef499088a4"
        };

        if (type === 'put' || type === 'post') {
            headers.Authorization = Knack.getUserToken();
            headers['Content-Type'] = 'application/json';
        }

        const response = await fetch(`${KNACK_API_BASE_URL}/v1/scenes/scene_${Knack.scene_id}/views/view_${Knack.view_id}/${urlParams}`, {
            method: type,
            headers: headers,
            body: JSON.stringify(obj)
        });

        const data = await response.json();
        KnackViewApi.callCount--;

        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
};