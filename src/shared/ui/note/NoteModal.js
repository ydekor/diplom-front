import {useApp} from "../../hooks/useApp";
import {useEffect, useRef, useState} from "react";
import style from "./NoteModal.module.css"
import {getOneNoteById} from "../../../parts/reminders/api/request";
import {MdOutlineColorLens} from "react-icons/md";
import {SmallButtonComp} from "../button/SmallButtonComp";
import {RiDeleteBin2Line} from "react-icons/ri";
import {TwitterPicker} from "react-color";
import {useClickOutside} from "../../hooks/useClickOutside";

export const NoteModal = () => {
    const { noteData, func } = useApp()
    const [note, setNote] = useState({ title: '', text: '' })
    const [showColorPicker, setShowColorPicker] = useState(false)
    const colorPickerRef = useRef(null)

    useEffect(() => {
        getOneNoteById(noteData.currentNoteId, setNote)
    }, [])

    const handleTitleChange = (e) => {
        const newNote = { ...note, title: e.target.value }
        setNote(newNote)
        func.updateCurrentNote(newNote)
    }

    const handleTextChange = (e) => {
        const newNote = { ...note, text: e.target.value }
        setNote(newNote)
        func.updateCurrentNote(newNote)
    }

    const changeNoteColor = (color) => {
        note.backgroundColor = color
        func.updateCurrentNote(note)
    }

    useClickOutside(colorPickerRef, () => setShowColorPicker(false))

    return <div className={style.wrapper} style={{backgroundColor: note.backgroundColor}}>
        <input
            value={note.title}
            onChange={handleTitleChange}
            placeholder="Title"
            className={style.inputTitle}
            style={{backgroundColor: note.backgroundColor}}
        />
        <input
            value={note.text}
            onChange={handleTextChange}
            placeholder="Text"
            className={style.inputText}
            style={{backgroundColor: note.backgroundColor}}
        />
        <div className={style.buttonWrapper}>
            <div className={style.button} ref={colorPickerRef}>
                <SmallButtonComp
                    icon={<MdOutlineColorLens className={style.icon}/>}
                    onClick={() => setShowColorPicker(!showColorPicker)}
                    tooltipText={"backgroundColor"}
                />
                {showColorPicker &&
                    <div className={style.colorPickerContainer} >
                        <div className={style.colorPicker}>
                            <TwitterPicker
                                color={note.backgroundColor}
                                onChange={(color) => changeNoteColor(color.hex)}
                            />
                        </div>
                    </div>
                }
            </div>
            <div className={style.button}>
                <SmallButtonComp
                    icon={<RiDeleteBin2Line className={style.icon}/>}
                    onClick={() => func.deleteCurrentNote(note.id)}
                />
            </div>
        </div>
    </div>
}