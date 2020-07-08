let baseUrl = 'https://remotedatalast.firebaseio.com/';

function makeHeaders(httpMethod, data) {
    const headers = {
        method: httpMethod,
        headers: {
            'Content-type': 'application/json'
        }
    }

    if (httpMethod === "POST" || httpMethod === "PUT") {
        headers.body = JSON.stringify(data);
    }

    return headers;
}

function handleError(e) {
    alert(`New error occurred: ${e.message}`)
}

function statusCheck(e) {
    if (!e.ok) {
        throw new Error('Couldn\'t fetch. Please check your url!');
    }

    return e;
}

function toJSON(e) {
    return e.json();
}

export function get(endpoint) {
    let getHeaders = makeHeaders("GET");
    return fetchData(endpoint, getHeaders)
}

export function post(endpoint, dataObj) {
    let getHeaders = makeHeaders("POST", dataObj);
    return fetchData(endpoint, getHeaders)
}

export function put(endpoint, dataObj) {
    let getHeaders = makeHeaders("PUT", dataObj);
    return fetchData(endpoint, getHeaders)
}

export function del(endpoint) {
    let getHeaders = makeHeaders("DELETE");
    return fetchData(endpoint, getHeaders)
}

async function fetchData(endpoint, headers) {
    let url = `${baseUrl}${endpoint}`;
    return fetch(url, headers)
        .then(statusCheck)
        .then(toJSON)
        .catch(handleError)
}