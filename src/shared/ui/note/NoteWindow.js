import style from "./NoteWindow.module.css"
import {RiDeleteBin2Line} from "react-icons/ri";
import {SmallButtonComp} from "../button/SmallButtonComp";
import {useApp} from "../../hooks/useApp";
import {MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank, MdOutlineColorLens} from "react-icons/md";
import {useRef, useState} from "react";
import {TwitterPicker} from "react-color";
import {useClickOutside} from "../../hooks/useClickOutside";
import {IoPersonAddOutline} from "react-icons/io5";
import {useModal} from "../../hooks/useModal";
import {ShareModal} from "./ShareModal";
import {GoPencil} from "react-icons/go";
import {addTag} from "../../../parts/reminders/api/request";

export const NoteWindow = ({note, onClick}) => {
    const {func, labelData} = useApp()
    const {modal} = useModal()
    const [showColorPicker, setShowColorPicker] = useState(false)
    const [showLabels, setShowLabels] = useState(false)
    const colorPickerRef = useRef(null)
    const [isActive, setIsActive] = useState(false)

    const changeNoteColor = (color) => {
        note.backgroundColor = color
        func.updateCurrentNote(note)
    }

    useClickOutside(colorPickerRef, () => setShowColorPicker(false))

    return <div className={style.wrapper} style={{backgroundColor: note.backgroundColor}}>
        <div onClick={() => onClick(note.id)}>
            <div className={style.headerField}>{note.title}</div>
            <div className={style.textField}>{note.text}</div>
        </div>
        <div className={style.buttonWrapper}>
            <div className={style.button}>
                <SmallButtonComp
                    icon={<GoPencil className={style.icon}/>}
                    onClick={() => {
                        setShowLabels(!showLabels)
                    }}
                />
            </div>
            {showLabels &&
                <div className={style.labelMenu}>
                    <div className={style.labelsHeader}>Label note</div>
                    <div className={style.labelsWrapper}>
                        {labelData.labels && labelData.labels.sort((a, b) => {
                            return a.id - b.id
                        }).map((e) => (
                            <div key={e.id}
                                 className={style.labelWrapper}
                                 onClick={() => {
                                     setIsActive(!isActive)
                                     addTag(note.id, e.id)
                                 }}
                            >
                                <div className={style.label}>
                                    {isActive
                                        ?
                                        <MdOutlineCheckBoxOutlineBlank className={style.labelIcon}/>
                                        :
                                        <MdOutlineCheckBox className={style.labelIcon}/>
                                    }
                                    {e.tagName}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }
            <div className={style.button}>
                <SmallButtonComp
                    icon={<IoPersonAddOutline className={style.icon}/>}
                    onClick={() => {
                        modal.open(<ShareModal
                            note={note}
                        />)
                    }}
                    tooltipText={"share note"}
                />
            </div>
            <div className={style.button}>
                <SmallButtonComp
                    icon={<MdOutlineColorLens className={style.icon}/>}
                    onClick={() => {
                        setShowColorPicker(!showColorPicker)
                    }}
                    tooltipText={"background color"}
                />
                {showColorPicker &&
                    <div className={style.colorPickerContainer}>
                        <div className={style.colorPicker} ref={colorPickerRef}>
                            <TwitterPicker
                                color={note.backgroundColor}
                                onChange={(color) => changeNoteColor(color.hex)}
                            />
                        </div>
                    </div>
                }
            </div>
            <div className={style.button}>
                <SmallButtonComp
                    icon={<RiDeleteBin2Line className={style.icon}/>}
                    onClick={() => func.deleteCurrentNote(note.id)}
                    tooltipText={"delete note"}
                />
            </div>
        </div>
    </div>
}
