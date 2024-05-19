import style from "./ShareModal.module.css"
import {useApp} from "../../hooks/useApp";
import {useModal} from "../../hooks/useModal";
import {useState} from "react";

export const ShareModal = ({note}) => {
    const {func} = useApp()
    const {modal} = useModal()
    const [email, setEmail] = useState("")

    return <div className={style.wrapper}>
        <div className={style.shareContent}>
            <div className={style.topText}>Collaborators</div>
            <input placeholder={"Enter email"} className={style.input} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className={style.buttonWrapper}>
            <button
                className={style.shareButton}
                onClick={() => modal.close()}
            >cancel
            </button>
            <button
                className={style.shareButton}
                onClick={() => {
                    func.shareSelectedNote(note.id, email)
                }
                }
            >save
            </button>
        </div>
    </div>
}