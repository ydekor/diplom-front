import style from "./SideMenu.module.css"
import {ButtonComp} from "../../shared/ui/button/ButtonComp";
import {AiOutlineBulb} from "react-icons/ai";
import {LuBellRing} from "react-icons/lu";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {Notes} from "../notes/Notes";
import {useNavigate, useParams} from "react-router-dom";
import {Reminders} from "../reminders/Reminders";
import {GoPencil} from "react-icons/go";
import {useModal} from "../../shared/hooks/useModal";
import {Labels} from "../labels/Labels";

export const SideMenu = ({menuVisible, setMenuVisible}) => {
    const history = useNavigate()
    const {modal} = useModal()
    const {tab} = useParams()

    const toggleMenuVisibility = () => {
        setMenuVisible(!menuVisible)
    }

    return <div className={style.wrapper}>
        {menuVisible &&
            <div className={style.sideMenu}
                 style={{width: menuVisible ? '250px' : '0', visibility: menuVisible ? 'visible' : 'hidden'}}>
                <div className={style.buttonWrapper}>
                    <div className={style.button}>
                        <ButtonComp
                            icon={<AiOutlineBulb className={style.icon}/>}
                            text={"Notes"}
                            onClick={() => history("/notes")}
                        />
                    </div>
                    <div className={style.button}>
                        <ButtonComp
                            icon={<LuBellRing className={style.icon}/>}
                            text={"Reminders"}
                            onClick={() => history("/reminders")}
                        />
                    </div>
                    <div className={style.button}>
                        <ButtonComp
                            icon={<GoPencil className={style.icon}/>}
                            text={"Edit labels"}
                            onClick={() => modal.open(<Labels/>)}
                        />
                    </div>
                </div>
            </div>
        }
        <div className={style.hideButtonWrapper}>
            <div className={style.hideButton} onClick={toggleMenuVisibility}>{
                menuVisible
                    ?
                    <IoIosArrowBack className={style.hideIcon}/>
                    :
                    <IoIosArrowForward className={style.hideIcon}/>}</div>
        </div>
        {tab === "notes" && <Notes/>}
        {tab === "reminders" && <Reminders/>}
    </div>
}