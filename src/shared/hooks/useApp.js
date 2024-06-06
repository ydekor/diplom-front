import {createContext, useContext, useEffect, useState} from "react";
import {createNote, deleteNote, getNotes, getTag, shareNote, updateNote} from "../../parts/reminders/api/request";

const AppDataContext = createContext(null)

export const useApp = () => {
    return useContext(AppDataContext)
}

export const AppDataProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [userData, setUserData] = useState({})
    const [notes, setNotes] = useState([])
    const [currentNoteId, setCurrentNoteId] = useState(null)
    const [labels, setLabels] = useState("")

    const refreshLabelsData = () => {
        getTag(setLabels)
    }

    useEffect(() => {
        refreshLabelsData()
    }, [])

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

    const combinedData = {
        data: {
            isAuthenticated: isAuthenticated,
            setIsAuthenticated: setIsAuthenticated,
            userData: userData,
            setUserData: setUserData,
        },
        noteData: {
            notes: notes,
            setNotes: setNotes,
            setCurrentNoteId: setCurrentNoteId,
            currentNoteId: currentNoteId,
        },
        labelData: {
            refreshLabelsData: refreshLabelsData,
            labels: labels,
            setLabels: setLabels,
        },
        func: {
            shareSelectedNote: shareSelectedNote,
            createNewNote: createNewNote,
            refreshData: refreshData,
            updateCurrentNote: updateCurrentNote,
            deleteCurrentNote: deleteCurrentNote,
        }
    }

    return <AppDataContext.Provider value={combinedData}>{children}</AppDataContext.Provider>
}