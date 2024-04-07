import {useEffect} from "react";

export const useClickOutside = (ref, handleClickOutside) => {
    useEffect(() => {
        let handler = (e) => {
            if(!ref.current.contains(e.target)) {
                handleClickOutside()
            }
        }

        document.addEventListener("mousedown", handler)

        return () => {
            document.removeEventListener("mousedown", handler)
        }
    })
}