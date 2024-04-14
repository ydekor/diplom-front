import {useId} from "react";
import style from "./SmallButtonComp.module.css";
import {Tooltip} from "react-tooltip";

export const SmallButtonComp = ({
                               icon,
                               tooltipText,
                               onClick,
                           }) => {
    const id = useId()

    return <div data-tooltip-id={id} className={style.wrapper}>
        <div className={style.contentContainer} onClick={onClick}>
            {icon}
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