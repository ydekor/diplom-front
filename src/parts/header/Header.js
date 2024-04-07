import style from "./Header.module.css"
import {ButtonComp} from "../../shared/ui/button/ButtonComp";
import {BiLogIn, BiNotepad} from "react-icons/bi";
import {PiList} from "react-icons/pi";
import {BsFillCloudMoonFill, BsFillCloudSunFill} from "react-icons/bs";
import {useContext} from "react";
import {ThemeContext} from "../../providers/ThemeProvider";
import {useNavigate} from "react-router-dom";

export const Header = ({setMenuVisible, menuVisible}) => {
    const history = useNavigate()
    const [theme, setTheme] = useContext(ThemeContext)

    const changeTheme = () => {
        setTheme(theme === "light" ? "dark" : "light")
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
                    tooltipText={"login"}
                    onClick={() => history("/login")}
                />
            </div>
        </div>
    </div>
}