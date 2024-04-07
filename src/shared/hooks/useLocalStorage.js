import {useEffect, useState} from "react";

export const UseLocalStorage = (key, defData) => {
    const [state, setState] = useState(() => {
        const localData = localStorage.getItem(key)
        return localData || defData
    })
    useEffect(() => {
        localStorage.setItem(key, state)
    }, [key, state]);
    return [state, setState]
}