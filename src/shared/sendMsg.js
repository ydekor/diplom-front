const sendRequest = (destination, method, bodyObj, successHandler, contentType = 'application/json') => {
    const requestOptions = {
        method,
        headers: {},
        body: null,
    }

    if (contentType === 'application/json') {
        requestOptions.headers['Content-Type'] = 'application/json';
        requestOptions.body = JSON.stringify(bodyObj);
    }

    if (contentType === 'multipart/form-data') {
        requestOptions.body = bodyObj
    }

    fetch(destination, requestOptions)
        .then(response => {
            console.log(response, "ananas")
            if(!response.ok) {
                throw new Error(`${response.status}`)
            }
            if(contentType === 'application/json') {
                return response.json()
            } else {
                return response
            }
        })
        .then(data => {
            if (successHandler && typeof successHandler === 'function') {
                successHandler(data)
            }
        })
        .catch(error => {
            console.error('Error:', error)
        })
}

export const sendPostMsg = (destination, bodyObj, successHandler, contentType) => {
    sendRequest(destination, 'POST', bodyObj, successHandler, contentType)
}

export const sendDeleteMsg = (destination, bodyObj, successHandler, contentType) => {
    sendRequest(destination, 'DELETE', bodyObj, successHandler, contentType)
}

export const sendPutMsg = (destination, bodyObj, successHandler, contentType) => {
    sendRequest(destination, 'PUT', bodyObj, successHandler, contentType)
}

export const sendGetMsg = (destination, bodyObj, successHandler, contentType) => {
    sendRequest(destination, 'GET', bodyObj, successHandler, contentType)
}