import style from "./Header.module.css"
import {ButtonComp} from "../../shared/ui/button/ButtonComp";
import {BiLogIn, BiNotepad} from "react-icons/bi";
import {PiList} from "react-icons/pi";
import {BsFillCloudMoonFill, BsFillCloudSunFill} from "react-icons/bs";
import {useContext} from "react";
import {ThemeContext} from "../../providers/ThemeProvider";
import {setLocalStorageValue} from "../../shared/hooks/LocalStorage";
import {AUTH} from "../../shared/const/Structures";
import {useApp} from "../../shared/hooks/useApp";

export const Header = ({
                           menuVisible,
                           setMenuVisible
                       }) => {
    const [theme, setTheme] = useContext(ThemeContext)
    const {data} = useApp()

    const changeTheme = () => {
        setTheme(theme === "light" ? "dark" : "light")
    }

    const logout = () => {
        data.setIsAuthenticated(false)
        setLocalStorageValue(AUTH.TOKEN, "", true)
        setLocalStorageValue(AUTH.TOKEN_REFRESH, "", true)
        data.setUserData({})
    }

    return <div className={style.wrapper}>
        <div className={style.buttonWrapper}>
            <div className={style.leftSide}>
                <div className={style.button}>
                    <ButtonComp
                        icon={<PiList className={style.icon}/>}
                        tooltipText={"Main menu"}
                        onClick={() => setMenuVisible(!menuVisible)}
                    />
                </div>
                <div className={style.Logo}>
                    <BiNotepad className={style.logoIcon}/>
                    <h1 className={style.logoText}>Note</h1>
                </div>
            </div>

            <div className={style.button}>
                <ButtonComp
                    icon={theme === "light" ? <BsFillCloudMoonFill className={style.icon}/> : <BsFillCloudSunFill className={style.icon}/>}
                    tooltipText={theme === "light" ? "Dark theme" : "Light theme"}
                    onClick={changeTheme}
                />
            </div>

            <div className={style.button}>
                <ButtonComp
                    icon={<BiLogIn className={style.icon}/>}
                    tooltipText={"Logout"}
                    onClick={logout}
                />
            </div>
        </div>
    </div>
}