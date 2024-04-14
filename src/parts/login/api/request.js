import {sendPostMsg} from "../../../shared/sendMsg";
import {setLocalStorageValue} from "../../../shared/hooks/LocalStorage";
import {AUTH} from "../../../shared/const/Structures";

export const loginUser = (username, password, setIsAuthenticated, setUserData, history) => {
    setLocalStorageValue(AUTH.TOKEN, null, true)
    setLocalStorageValue(AUTH.TOKEN_REFRESH, null, true)

    sendPostMsg("http://localhost:9000/user/login",
        {
            "login": username,
            "password": password
        },
        (response) => {
            setLocalStorageValue(AUTH.TOKEN, response[AUTH.TOKEN])
            setLocalStorageValue(AUTH.TOKEN_REFRESH, response[AUTH.TOKEN_REFRESH])
            setIsAuthenticated(true)
            setUserData(response[AUTH.USER_DATA])
            history("/")
        }
    )
}