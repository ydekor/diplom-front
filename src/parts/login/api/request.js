import {sendPostMsg} from "../../../shared/sendMsg";

export const loginUser = (username, password, history) => {
    const formData = new FormData()
    formData.append('username', username)
    formData.append('password', password)

    sendPostMsg('http://localhost:9000/api/auth/login',
        formData,
        (response) => {
            if(response.ok) {
                history('/')
            }
        },
        'multipart/form-data'
    )
}