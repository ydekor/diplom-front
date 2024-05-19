import {createContext, useContext, useState} from "react";
import {createNote, deleteNote, getNotes, shareNote, updateNote} from "../../parts/reminders/api/request";

const AppDataContext = createContext(null)

export const useApp = () => {
    return useContext(AppDataContext)
}

export const AppDataProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [userData, setUserData] = useState({})
    const [notes, setNotes] = useState([])
    // const [note, setNote] = useState([])
    const [currentNoteId, setCurrentNoteId] = useState(null)

    const refreshData = () => {
        getNotes(setNotes)
    }

    const createNewNote = (header, text) => {
        createNote(header, text, refreshData)
    }

    const deleteCurrentNote = (id) => {
        deleteNote(id, refreshData)
    }

    const updateCurrentNote = (newNote) => {
        updateNote(newNote, refreshData)
    }

    const shareSelectedNote = (id, userEmail) => {
        shareNote(id, userEmail, refreshData)
    }

    // const getOneNote = (id) => {
    //     getOneNoteById(id, setNote)
    // }

    const combinedData = {
        data: {
            isAuthenticated: isAuthenticated,
            setIsAuthenticated: setIsAuthenticated,
            userData: userData,
            setUserData: setUserData,
        },
        noteData: {
            // setNote: setNote,
            // note: note,
            notes: notes,
            setNotes: setNotes,
            setCurrentNoteId: setCurrentNoteId,
            currentNoteId: currentNoteId,
        },
        func: {
            shareSelectedNote: shareSelectedNote,
            // getOneNote: getOneNote,
            createNewNote: createNewNote,
            refreshData: refreshData,
            updateCurrentNote: updateCurrentNote,
            deleteCurrentNote: deleteCurrentNote,
        }
    }

    return <AppDataContext.Provider value={combinedData}>{children}</AppDataContext.Provider>
}