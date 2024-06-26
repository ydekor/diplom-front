import {useId} from "react";
import style from "./ButtonComp.module.css"
import {Tooltip} from "react-tooltip";

export const ButtonComp = ({
                               icon,
                               text,
                               tooltipText,
                               onClick,
                           }) => {
    const id = useId()

    return <div data-tooltip-id={id} className={style.wrapper}>
        <div className={style.contentContainer} onClick={onClick}>
            <div className={style.iconElementWrapper}>
                {icon && <div className={style.iconElement}>{icon}</div>}
            </div>
            {text && <div className={style.textElement}>{text}</div>}
        </div>
        {<Tooltip
            style={{zIndex: 5}}
            place={"bottom"}
            content={tooltipText}
            id={id}
            delayShow={500}
        />}
    </div>
}