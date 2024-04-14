import {sendPostMsg} from "../../shared/sendMsg";
import {setLocalStorageValue} from "../../shared/hooks/LocalStorage";
import {AUTH} from "../../shared/const/Structures";

export function getUserInfo(token, setIsAuthenticated, setUserData) {
    sendPostMsg("http://localhost:9000/user/update-token",
        {},
        (response) => {
            setLocalStorageValue(AUTH.TOKEN, response[AUTH.TOKEN])
            setLocalStorageValue(AUTH.TOKEN_REFRESH, response[AUTH.TOKEN_REFRESH])
            setIsAuthenticated(true)
            setUserData(response[AUTH.USER_DATA])
        }
    )
}