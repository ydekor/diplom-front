import style from "./Notes.module.css"
import {useEffect, useState} from "react";
import {NoteCreator} from "../../shared/ui/noteCreator/NoteCreator";
import {NoteWindow} from "../../shared/ui/note/NoteWindow";
import {useApp} from "../../shared/hooks/useApp";
import {useModal} from "../../shared/hooks/useModal";
import {NoteModal} from "../../shared/ui/note/NoteModal";

export const Notes = () => {
    const {modal} = useModal()
    const {noteData, func} = useApp()
    const [header, setHeader] = useState("")
    const [text, setText] = useState("")

    useEffect(() => {
        func.refreshData()
    }, [])

    return <div className={style.wrapper}>
        <NoteCreator
            setHeader={setHeader}
            setText={setText}
            text={text}
            header={header}
        />
        <div className={style.content}>
            {noteData.notes.sort((a, b) => {
                return a.id - b.id
            }).map((e) => (
                <NoteWindow
                    key={e.id}
                    note={e}
                    onClick={(id) => {
                        noteData.setCurrentNoteId(id)
                        modal.open(<NoteModal/>)
                    }}
                />
            ))}
        </div>
    </div>
}