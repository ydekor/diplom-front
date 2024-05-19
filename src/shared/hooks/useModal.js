import {createContext, useContext, useState} from "react";

const ModalDataContext = createContext(null)

export const useModal = () => {
    return useContext(ModalDataContext)
}

export const ModalDataProvider = ({children}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [modalContent, setModalContent] = useState(null)
    const [containerStyle, setContainerStyle] = useState(null)

    const openModal = (content, style) => {
        setModalContent(content)
        setContainerStyle(style)
        setIsOpen(true)
    }

    const combinedData = {
        modal: {
            open: openModal,
            close: () => {setIsOpen(false)}
        },
        hidden: {
            open: isOpen,
            setIsOpen: setIsOpen,
            modalContent: modalContent,
            containerStyle: containerStyle,
        }
    }


    return <ModalDataContext.Provider value={combinedData}>{children}</ModalDataContext.Provider>
}