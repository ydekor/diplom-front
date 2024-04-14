import style from "./Main.module.css"
import {Header} from "../header/Header";
import {SideMenu} from "../sideMenu/SideMenu";
import {useEffect, useState} from "react";
import {useApp} from "../../shared/hooks/useApp";
import {useNavigate} from "react-router-dom";

export const Main = () => {
    const {data} = useApp()
    const [menuVisible, setMenuVisible] = useState(true)
    const history = useNavigate()

    useEffect(() => {
        if (data.isAuthenticated === false) {
            history("/login");
        }
    }, [data.isAuthenticated, history])

    return <div className={style.wrapper}>
        <Header
            setMenuVisible={setMenuVisible}
            menuVisible={menuVisible}
        />
        <SideMenu setMenuVisible={setMenuVisible} menuVisible={menuVisible}/>
    </div>
}