import {useModal} from "../../hooks/useModal";
import style from "./ModalWindow.module.css"
import React, {useEffect, useRef} from "react";

export const ModalWindow = () => {
    const {hidden} = useModal()
    const OUTSIDE_ID = "outside"
    const modalRef = useRef(null)

    useEffect(() => {
        if (hidden.open && modalRef.current) {
            modalRef.current.focus()
        }
    }, [hidden.open])

    const handleKeyDown = (e) => {
        if (e.key === "Escape") hidden.setIsOpen(false)
    }

    const onClickOutside = (e) => {
        if (e.target['id'] === OUTSIDE_ID) hidden.setIsOpen(false)
    }

    return hidden.open ? <div className={style.modal}
                              ref={modalRef}
                              id={OUTSIDE_ID}
                              onClick={onClickOutside}
                              onKeyDown={handleKeyDown}
                              tabIndex={0}
    >

        <div className={style.container + (!!hidden.containerStyle ? " " + hidden.containerStyle : "")}>{hidden.modalContent}</div>
    </div> : <div className={style.hidden}/>
}