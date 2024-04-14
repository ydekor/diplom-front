import {useNavigate} from "react-router-dom";
import {useState} from "react";
import style from "../login/LoginComp.module.css";
import {RegisterUser} from "./api/request";

export const RegisterComp = () => {
    const history = useNavigate()
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const clearField = () => {
        setLogin("")
        setEmail("")
        setPassword("")
    }

    return <div className={style.wrapper}>
        <div className={style.window}>
            <div className={style.title}><h2>New user</h2></div>

            <div className={style.box}>
                <input
                    className={style.input}
                    placeholder="Login"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                />
            </div>
            <div className={style.box}>
                <input
                    className={style.input}
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className={style.box}>
                <input
                    className={style.input}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className={style.panel}>
                <button onClick={() => {
                    RegisterUser(login, password, email, clearField, history)
                    // history("/login")
                }}>Register
                </button>
            </div>
        </div>

        <div className={style.links}>
            <div className={style.link} onClick={() => history("/login")}>I have account</div>
        </div>
    </div>
}