import style from "./LoginComp.module.css"
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {loginUser} from "./api/request";
import {useApp} from "../../shared/hooks/useApp";

export const LoginComp = () => {
    const {data} = useApp()
    const history = useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return <div className={style.wrapper}>
        <div className={style.window}>
            <div className={style.title}><h2>Sign in</h2></div>

            <div className={style.box}>
                <input
                    className={style.input}
                    type="text"
                    id="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className={style.box}>
                <input
                    className={style.input}
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className={style.panel}>
                <button onClick={() => {
                    if (username === "" && password === "") {
                        console.log("netak ebanat")
                    } else {
                        loginUser(username, password, data.setIsAuthenticated, data.setUserData, history)
                    }
                }}>Login</button>
            </div>

            <div>
                <button onClick={() => {
                    fetch("http://localhost:9000/user/whoareme", {
                        method: "GET",
                    }).then(r => {
                        console.log(r.status, "status")
                        return r.text()
                    })
                        .then((r) => console.log(r))
                        .catch((error) => console.error(error, "anmanas"))
                }}>
                    whoareme
                </button>
            </div>
        </div>

        <div className={style.links}>
            <div className={style.link} onClick={() => history("/register")}>I have not account</div>
        </div>
    </div>
}