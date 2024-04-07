import {createContext, useEffect} from "react";
import {UseLocalStorage} from "../shared/hooks/useLocalStorage";
import style from "../app/App.module.css"

export const ThemeContext = createContext()

export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = UseLocalStorage("theme", "light")

    useEffect(() => {
        if(theme === "dark") document.body.classList.add("dark")
        else document.body.classList.remove("dark")

    }, [theme]);

    return <div className={style.wrapper}>
        <ThemeContext.Provider value={[theme, setTheme]}>{children}</ThemeContext.Provider>
    </div>
}