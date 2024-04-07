import style from "./Main.module.css"
import {Header} from "../header/Header";
import {SideMenu} from "../sideMenu/SideMenu";
import {useState} from "react";

export const Main = () => {
    const [menuVisible, setMenuVisible] = useState(true)

    return <div className={style.wrapper}>
        <Header setMenuVisible={setMenuVisible} menuVisible={menuVisible}/>
        <SideMenu setMenuVisible={setMenuVisible} menuVisible={menuVisible}/>
    </div>
}