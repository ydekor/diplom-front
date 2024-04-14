import style from "./Reminders.module.css"
import {useState} from "react";
import {NoteCreator} from "../../shared/ui/noteCreator/NoteCreator";

export const Reminders = () => {
    const [header, setHeader] = useState("")
    const [text, setText] = useState("")

    return <div className={style.wrapper}>
        <NoteCreator
            setHeader={setHeader}
            setText={setText}
            text={text}
            header={header}
        />
    </div>
}