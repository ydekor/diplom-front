import style from "./NoteCreator.module.css"
import {ButtonComp} from "../button/ButtonComp";
import {IoCheckboxOutline} from "react-icons/io5";
import {useClickOutside} from "../../hooks/useClickOutside";
import {useRef, useState} from "react";
import {useApp} from "../../hooks/useApp";

export const NoteCreator = ({ setHeader, setText, header, text}) => {
    const {func} = useApp()
    const menuRef = useRef()
    const [open, setOpen] = useState(false)

    useClickOutside(menuRef, () => {
        if(header !== "" && text !== "") {
            func.createNewNote(header, text)
        }
        setOpen(false)
        setHeader("")
        setText("")
    })

    return <div className={style.wrapper}>
        <div className={style.inputWrapper} ref={menuRef}>
            {open && <input
                placeholder={"Input header"}
                onChange={(e) => setHeader(e.target.value)}
                value={header}
                className={style.input}
            />}
            <input
                className={style.input}
                value={text}
                onClick={() => setOpen(true)}
                onChange={(e) => setText(e.target.value)}
                placeholder={"Note..."}
            />
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
}