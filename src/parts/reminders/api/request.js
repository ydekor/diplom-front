import {sendDeleteMsg, sendGetMsg, sendPostMsg, sendPutMsg} from "../../../shared/sendMsg";

export const createNote = (header, text, successHandler) => {
    sendPostMsg("http://localhost:9000/note",
        {
            "title": header,
            "noteType": "TEXT",
            "text": text,
            "backgroundColor": "fff"
        },
        successHandler
    )
}

export const getNotes = (successHandler) => {
    sendGetMsg("http://localhost:9000/note",
        {},
        successHandler
    )
}

export const deleteNote = (id, successHandler) => {
    sendDeleteMsg("http://localhost:9000/note" + "/" + id,
        {},
        successHandler
    )
}

export const shareNote = (id, userEmail, successHandler) => {
    sendPutMsg("http://localhost:9000/note/share",
        {
            noteId: id,
            userEmail: userEmail
        },
        successHandler
    )
}

export const updateNote = (newNote, successHandler) => {
    sendPutMsg("http://localhost:9000/note",
        newNote,
        successHandler
    )
}

export const getOneNoteById = (id, successHandler) => {
    sendGetMsg("http://localhost:9000/note/" + id,
        {},
        successHandler
    )
}