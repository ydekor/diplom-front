import style from "./Notes.module.css"
import {useEffect, useState} from "react";
import {NoteCreator} from "../../shared/ui/noteCreator/NoteCreator";
import {NoteWindow} from "../../shared/ui/note/NoteWindow";
import {useApp} from "../../shared/hooks/useApp";

export const Notes = () => {
    const {noteData, func} = useApp()
    const [header, setHeader] = useState("")
    const [text, setText] = useState("")

    useEffect(() => {
        func.refreshData()
    }, []);

    return <div className={style.wrapper}>
        <NoteCreator
            setHeader={setHeader}
            setText={setText}
            text={text}
            header={header}
        />
        <div className={style.content}>
            {noteData.notes.map((e) => (
                <NoteWindow
                    key={e.id}
                    note={e}
                />
            ))}
        </div>
    </div>
}