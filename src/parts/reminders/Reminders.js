import style from "./Reminders.module.css"
import {ButtonComp} from "../../shared/ui/button/ButtonComp";
import { IoCheckboxOutline } from "react-icons/io5";
import {useRef, useState} from "react";
import {useClickOutside} from "../../shared/hooks/useClickOutside";

export const Reminders = () => {
    const [open, setOpen] = useState(false)
    const menuRef = useRef()
    const [header, setHeader] = useState("")
    const [note, setNote] = useState("")

    useClickOutside(menuRef, () => {
        setOpen(false)
        setHeader("")
        setNote("")
    })

    return <div className={style.wrapper}>
        <div className={style.testWrapper}>
            <div className={style.content}>
                <div ref={menuRef}>
                    {open && <input
                        placeholder={"Input header"}
                        onChange={(e) => setHeader(e.target.value)}
                        value={header}
                        className={style.input}
                    />}
                    <input
                        className={style.input}
                        value={note}
                        onClick={() => setOpen(true)}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder={"Note..."}
                    />
                </div>
            </div>
            {!open &&
                <div className={style.buttonGroup}>
                    <ButtonComp
                        icon={<IoCheckboxOutline className={style.icon}/>}
                        tooltipText={"Create list"}
                    />
                </div>
            }
        </div>
    </div>
}