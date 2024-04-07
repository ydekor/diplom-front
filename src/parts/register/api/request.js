import {sendPostMsg} from "../../../shared/sendMsg";

export const RegisterUser = (name, password, email, successHandler, history) => {
    sendPostMsg('http://localhost:9000/user',
        {
            username: name,
            password: password,
            email: email,
        },

        (response) => {
            console.log(response)
            successHandler()
            history("/login")
        },
    )
}