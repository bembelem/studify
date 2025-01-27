import { RefObject, ChangeEvent } from 'react'
import { EventInfoFull, EventInfoState } from '@/app/types'
import { orderTimeMap } from '@/app/initData'
import ClearIcon from '@mui/icons-material/Clear'
import { EventInfoInput } from '@/shared/EventInfoInput'
import { EventInfoRadio } from '@/shared/EventInfoRadio'
import { EventInfoTextBlock } from './EventInfoTextBlock'
import { EventInfoCheckbox } from '@/shared/EventInfoCheckbox'
import { ConfirmButtonsBlockEvent } from './ConfirmButtonsBlockEvent'
import styles from '@/app/styles/styles_widgets/EventInfo.module.css'


const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
}


const getEventInfoStatus = function(eventInfo: EventInfoFull) {
    if (eventInfo.room && eventInfo.subject && eventInfo.type) {
        return 'fulfilled'
    } else {
        return 'clear'
    }
}


const getFormattedDate = function(date: string) {
    if (date.includes('-')) {
        const parsedDate = new Date(Date.parse(date.replace(/-/g, '/')))
        const formattedDate = parsedDate.toLocaleDateString('ru-RU', options)

        return formattedDate.slice(0, 1).toUpperCase() + formattedDate.slice(1)
    } else {
        return date.slice(0, 1).toUpperCase() + date.slice(1)
    }
}


export function EventInfo(props: {
    eventInfoRef: RefObject<HTMLDialogElement>,
    eventInfoState: EventInfoState,
    changeEventInfo: (eventInfo: EventInfoFull) => void,
    closeEventInfo: () => void
}) {
    getFormattedDate(props.eventInfoState.eventInfo.date)
    const handleInputChange = function(event: ChangeEvent<HTMLInputElement>) {
        const {name, value, type, checked} = event.target
        if (type === 'text') {
            props.changeEventInfo({...props.eventInfoState.eventInfo, [name]: value})
        } else if (type === 'radio') {
            props.changeEventInfo({...props.eventInfoState.eventInfo, [name]: value})
        } else if (type === 'checkbox') {
            props.changeEventInfo({...props.eventInfoState.eventInfo, [name]: checked})
        }
    }

    const handleTextareaChange = function(event: ChangeEvent<HTMLTextAreaElement>) {
        props.changeEventInfo({...props.eventInfoState.eventInfo, [event.target.name]: event.target.value})
    }

    return (
        <dialog className={styles.container} ref={props.eventInfoRef}>
                <ClearIcon className={styles.button} onClick={props.closeEventInfo} />
                <form className={styles.container_form}>
                    <EventInfoInput 
                    htmlAttrs={{
                        name: 'room',
                        placeholder: 'Номер аудитории*', 
                        value: props.eventInfoState.eventInfo.room,
                    }}
                    handleChange={handleInputChange} />
                    <EventInfoInput 
                    htmlAttrs={{
                        name: 'subject',
                        placeholder: 'Название предмета*', 
                        value: props.eventInfoState.eventInfo.subject,
                    }}
                    handleChange={handleInputChange} />

                    <div className={styles.container_buttons}>
                        <EventInfoRadio 
                        checkedRadio={props.eventInfoState.eventInfo.type} 
                        value={'practice'} 
                        handleChange={handleInputChange} />
                        <EventInfoRadio 
                        checkedRadio={props.eventInfoState.eventInfo.type} 
                        value={'lecture'} 
                        handleChange={handleInputChange} />
                    </div>

                    <div className={styles.container_info}>
                        <h3>{orderTimeMap[props.eventInfoState.eventInfo.order]} ({props.eventInfoState.eventInfo.order} пара)</h3>
                        <p>{getFormattedDate(props.eventInfoState.eventInfo.date)}</p>
                    </div>

                    <EventInfoInput
                    htmlAttrs={{
                        name: 'teacher',
                        placeholder: 'Имя преподавателя', 
                        value: (props.eventInfoState.eventInfo.teacher ?? '')
                    }} 
                    handleChange={handleInputChange} />
                    <EventInfoTextBlock
                    values={{
                        homework: (props.eventInfoState.eventInfo.homework ?? ''),
                        notes: (props.eventInfoState.eventInfo.notes ?? '')
                    }} 
                    handleChange={handleTextareaChange} />

                    <div className={styles.container_buttons} >
                        <EventInfoCheckbox 
                        name='test' 
                        checked={props.eventInfoState.eventInfo['test'] ?? false}
                        handleChange={handleInputChange} />
                        <EventInfoCheckbox 
                        name='project' 
                        checked={props.eventInfoState.eventInfo['project'] ?? false}
                        handleChange={handleInputChange} />
                        <EventInfoCheckbox 
                        name='colloquium' 
                        checked={props.eventInfoState.eventInfo['colloquium'] ?? false}
                        handleChange={handleInputChange} />
                    </div>
                    <ConfirmButtonsBlockEvent
                    formStatus={getEventInfoStatus(props.eventInfoState.eventInfo)}
                    eventInfoState={props.eventInfoState} />
                </form>
        </dialog>
    )
}