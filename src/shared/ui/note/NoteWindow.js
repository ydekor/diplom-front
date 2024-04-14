import style from "./NoteWindow.module.css"
import {RiDeleteBin2Line} from "react-icons/ri";
import {SmallButtonComp} from "../button/SmallButtonComp";
import {useApp} from "../../hooks/useApp";
import { MdOutlineColorLens } from "react-icons/md";
import {useState} from "react";

export const NoteWindow = ({note}) => {
    const {func} = useApp()
    const [showColorPicker, setShowColorPicker] = useState(false)

    return <div className={style.wrapper}>
        <div className={style.headerField}>{note.title}</div>
        <div className={style.textField}>{note.text}</div>
        <div className={style.buttonWrapper}>
            <div className={style.button}>
                <SmallButtonComp
                    icon={<MdOutlineColorLens className={style.icon}/>}
                    onClick={() => {
                        setShowColorPicker(!showColorPicker)
                        // note.backgroundColor = "blue"
                        // func.updateCurrentNote(note)
                    }}
                    tooltipText={"backgroundColor"}
                />
            </div>
            <div className={style.button}>
                <SmallButtonComp
                    icon={<RiDeleteBin2Line className={style.icon}/>}
                    onClick={() => func.deleteCurrentNote(note.id)}
                    tooltipText={"delete note"}
                />
            </div>
        </div>
        {showColorPicker &&
            <div className={style.colorPickerContainer}>
                <div className={style.colorPicker}>

                </div>
            </div>
        }
    </div>
}