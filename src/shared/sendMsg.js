import {getLocalStorageValue, setLocalStorageValue} from "./hooks/LocalStorage";
import {AUTH} from "./const/Structures";

const MSG_DESCRIPTION = "description"

const sendMsg = (
    method,
    destination,
    bodyObj,
    successHandler = () => {},
    errorHandler = () => {},
    isResending = false,
    useRefreshToken = false,
) => {
    let isBodyJson = bodyObj === null || (typeof bodyObj === 'object' && bodyObj.constructor === Object)

    // prepare headers
    const token = getLocalStorageValue(useRefreshToken ? AUTH.TOKEN_REFRESH : AUTH.TOKEN)
    const headers = {}
    if (!!token) headers["Authorization"] = token
    if (isBodyJson) headers["Content-Type"] = "application/json"

    // result status reactions
    const statusActions = new Map()
    statusActions.set(200, (rs) => {successHandler(rs)})
    statusActions.set(400, (rs) => {errorHandler(rs[MSG_DESCRIPTION])})
    statusActions.set(401, (rs) => {
        if (rs[MSG_DESCRIPTION].startsWith("The Token has expired") && !isResending) {
            sendPostMsg("http://localhost:9000/user/update-token",
                {},
                (response) => {
                    setLocalStorageValue(AUTH.TOKEN, response[AUTH.TOKEN])
                    setLocalStorageValue(AUTH.TOKEN_REFRESH, response[AUTH.TOKEN_REFRESH])

                    sendMsg(method, destination, bodyObj, successHandler, errorHandler, true)
                },
                (msg) => {
                    setLocalStorageValue(AUTH.TOKEN, null, true)
                    setLocalStorageValue(AUTH.TOKEN_REFRESH, null, true)
                    errorHandler("Resending error - " + msg)
                },
                true,
                true,
            )
        } else {
            errorHandler(rs[MSG_DESCRIPTION])
        }
    })
    statusActions.set(403, () => {errorHandler("Forbidden")})

    const answerIsJson = (rs) => {
        console.log("<< Response JSON (" + rsStatus + ")", rs)
        try {
            statusActions.get(rsStatus)(rs)
        } catch (err) {
            console.error("Error while execute Response Handler for status: " + rsStatus, err)
        }
    }

    const answerIsText = (text) => {
        if (rsStatus === 200) console.log("<< Response TEXT (" + rsStatus + ")", text)
        else console.error("<< Response TEXT (" + rsStatus + ")", text)

        statusActions.get(rsStatus)(text)
    }

    let rsStatus = 0;
    let rsContentType = "";

    fetch(destination,
        method === "GET"
            ? { method: method, headers: headers }
            : { method: method,
                headers: headers,
                body: isBodyJson ? JSON.stringify(bodyObj) : bodyObj}
    )
        .then((response) => {
            rsStatus = response.status
            rsContentType = response.headers.get("Content-Type")
            if (rsContentType === "application/json") {
                return response.json()
            }
            if (rsContentType === "application/octet-stream") {
                return response.blob()
            }
            return response.text()})
        .then((response) => {
            switch (rsContentType) {
                case "application/json":
                    answerIsJson(response)
                    break;
                default:
                    answerIsText(response)
            }
        }).catch( e => {
        errorHandler("<< ERROR" + e)
    });
}





export function sendPostMsg(destination, bodyObj, successHandler, errorHandler, isResending, useRefreshToken) {
    sendMsg("POST", destination, bodyObj, successHandler, errorHandler, isResending, useRefreshToken) }
export function sendGetMsg(destination, bodyObj, successHandler, errorHandler, isResending, useRefreshToken) {
    sendMsg("GET", destination, bodyObj, successHandler, errorHandler, isResending, useRefreshToken) }
export function sendPutMsg(destination, bodyObj, successHandler, errorHandler, isResending, useRefreshToken) {
    sendMsg("PUT", destination, bodyObj, successHandler, errorHandler, isResending, useRefreshToken) }
export function sendDeleteMsg(destination, bodyObj, successHandler, errorHandler, isResending, useRefreshToken) {
    sendMsg("DELETE", destination, bodyObj, successHandler, errorHandler, isResending, useRefreshToken) }