import style from "./Labels.module.css"
import {SmallButtonComp} from "../../shared/ui/button/SmallButtonComp";
import {IoMdCheckmark} from "react-icons/io";
import {RxCross2} from "react-icons/rx";
import {useState} from "react";
import {LuPlus} from "react-icons/lu";
import {useModal} from "../../shared/hooks/useModal";
import {createTag, deleteTag, updateTag} from "../reminders/api/request";
import {FiDelete} from "react-icons/fi";
import {GoPencil} from "react-icons/go";
import {useApp} from "../../shared/hooks/useApp";

export const Labels = () => {
    const {labelData} = useApp()
    const {modal} = useModal()
    const [showCreateMark, setShowCreateMark] = useState(true)
    const [label, setLabel] = useState("")

    return <div className={style.wrapper}>
        <div className={style.contentWrapper}>
            <div className={style.header}>Edit labels</div>
            <div className={style.createTag}>
                <SmallButtonComp
                    icon={showCreateMark ? <RxCross2 className={style.icon}/> : <LuPlus  className={style.icon}/>}
                    tooltipText={showCreateMark ? "Cancel" : "Create label"}
                    onClick={() => setShowCreateMark(!showCreateMark)}
                />
                <input
                    className={style.input}
                    onClick={() => setShowCreateMark(true)}
                    placeholder={"Create new label"}
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                />
                {showCreateMark &&
                    <SmallButtonComp
                        icon={<IoMdCheckmark  className={style.icon}/>}
                        tooltipText={"Create label"}
                        onClick={() => {
                            createTag(label, labelData.refreshLabelsData)
                            setLabel("")
                        }}
                    />
                }
            </div>
            {labelData.labels && labelData.labels.sort((a, b) => {
                return a.id - b.id
            }).map((e) => (
                <div key={e.id} className={style.createTag}>
                    <SmallButtonComp
                        icon={<FiDelete className={style.icon}/>}
                        tooltipText={"Delete label"}
                        onClick={() => deleteTag(e.id, labelData.refreshLabelsData)}
                    />
                    <input
                        className={style.input}
                        onClick={() => setShowCreateMark(false)}
                        value={e.tagName}
                        onChange={(event) => {
                            const updatedLabel = {...e, tagName: event.target.value}
                            labelData.setLabels((prevLabels) =>
                                prevLabels.map(label =>
                                    label.id === e.id ? updatedLabel : label
                                )
                            )
                        }}
                    />
                    <SmallButtonComp
                        icon={<GoPencil className={style.icon}/>}
                        tooltipText={"Rename label"}
                        onClick={() => updateTag(e, labelData.refreshLabelsData)}
                    />
                </div>
            ))}
        </div>
        <div className={style.buttonWrapper}>
            <button className={style.button} onClick={() => modal.close()}>Done</button>
        </div>
    </div>
}