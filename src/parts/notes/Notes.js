import style from "./Notes.module.css"

export const Notes = () => {

    return <div className={style.wrapper}>
        <div className={style.inputField}>
            <div className={style.wrapper}>
                <input className={style.input} placeholder={"Note..."}/>
            </div>
        </div>
    </div>
}