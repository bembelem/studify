import { useState, Dispatch } from 'react'
import { TemplateInfoFull, TimetableWeekAction, StatesWindow } from '@/app/types'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import styles from '@/app/styles/styles_widgets/TemplateCard.module.css'


const getTemplateCardStyle = function(windowState: StatesWindow) {
    if (windowState === 'close') {
        return {
            icon: styles.icon_close,
            name: styles.container_name_close,
            window: styles.container_description_close,
        }
    } else {
        return {
            icon: styles.icon_show,
            name: styles.container_name_show,
            window: styles.container_description_show,
        }
    }
}


export function TemplateCard(props: {
    templateInfo: TemplateInfoFull,
    dispatch: Dispatch<TimetableWeekAction>,
}) {
    const [windowState, setWindowState] = useState<StatesWindow>('close')
    
    const templateCardClick = function() {
        if (windowState === 'close') {
            setWindowState('show')
        } else {
            setWindowState('close')
        }
    }

    const templateCardApplyClick = function() {
        props.dispatch({type: 'apply_template', timetable: props.templateInfo.timetable})
    }

    const templateCardStyle = getTemplateCardStyle(windowState)
    
    return (
        <li className={styles.container}>
            <div className={templateCardStyle.name}>
                {props.templateInfo.description
                ?
                <span className={styles.description_button} onClick={templateCardClick}>
                    <span className={styles.name}>{props.templateInfo.name}</span>
                    <ArrowDropDownIcon className={templateCardStyle.icon} />
                </span>
                :
                <span className={styles.description_button_disabled}>
                    <span className={styles.name}>{props.templateInfo.name}</span>
                    <ArrowDropDownIcon className={styles.icon_disabled} />
                </span>
                }
                <button className={styles.button} onClick={templateCardApplyClick}>Применить</button>
            </div>
            <div className={templateCardStyle.window}>
                {props.templateInfo.description ?? ''}
            </div>
        </li>
    )
}