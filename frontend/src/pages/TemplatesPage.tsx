import { useReducer, useState, useRef, useEffect } from 'react'
import { TemplatesState, TemplatesAction, EventInfoState, EventInfoFull, TemplateInfoFull, DataTemplates } from '@/app/types'
import { initTemplatesState, initTimetableWeek, initEventInfo } from '@/app/initData'
import { Templates } from '@/entities/Templates'
import { TemplateInfo } from '@/widgets/TemplateInfo'
import { EventInfo } from '@/widgets/EventInfo'


const templatesReducer = function(templatesState: TemplatesState, action: TemplatesAction) {
    if (action.type === 'delete_template') {
        const newTemplatesState = {...templatesState}

        delete newTemplatesState.templates[action.templateInfo!.id!]

        return newTemplatesState
    } else if (action.type === 'save_template') {
        const newTemplatesState = {...templatesState}

        newTemplatesState.templates[action.templateInfo!.id!] = {...action.templateInfo!}
        newTemplatesState.templateInfo = {...action.templateInfo!}

        return newTemplatesState
    } else if (action.type === 'delete_event') {
        const day = action.eventInfo!.day
        const order = action.eventInfo!.order
        const newTemplatesState = {...templatesState}

        delete newTemplatesState.templateInfo.timetable[day][order]

        return newTemplatesState
    } else if (action.type === 'save_event') {
        const day = action.eventInfo!.day
        const order = action.eventInfo!.order
        const newTemplatesState = {...templatesState}

        newTemplatesState.templateInfo.timetable[day][order] = {...action.eventInfo!}

        return newTemplatesState
    } else if (action.type === 'change_template') {
        return {...templatesState, templateInfo: {...action.templateInfo!}}
    } else if (action.type === 'change_event') {
        return {...templatesState, eventInfo: {...action.eventInfo!}}
    } else if (action.type === 'clear_timetable') {
        const newTemplatesState = {...templatesState}

        newTemplatesState.templateInfo.timetable = {...initTimetableWeek}

        return newTemplatesState
    } else if (action.type === 'apply_templates') {
        return {...templatesState, 
            templates: {...action.templates!},
            isLoading: false,
        }
    } else {
        throw Error(`Uknown action: ${action.type}`)
    }
}


export function TemplatesPage() {
    const [templatesState, dispatch] = useReducer(templatesReducer, initTemplatesState)
    const [eventInfoState, setEventInfoState] = useState<EventInfoState>({
        eventInfo: initEventInfo,
        impactObjectName: 'event',
        impactObjectDispatch: dispatch,
    })
    
    const templateInfoRef = useRef<HTMLDialogElement>(null)
    const eventInfoRef = useRef<HTMLDialogElement>(null)

    const changeEventInfo = function(eventInfo: EventInfoFull) {
        setEventInfoState({...eventInfoState, eventInfo: eventInfo})
    }

    const openTemplateInfo = function(templateInfo: TemplateInfoFull) {
        dispatch({type: 'change_template', templateInfo: templateInfo})
        templateInfoRef.current?.show()
    }

    const closeTemplateInfo = function() {
        templateInfoRef.current?.close()
    }

    const openEventInfo = function(eventInfo: EventInfoFull) {
        setEventInfoState({...eventInfoState, eventInfo: eventInfo})
        eventInfoRef.current?.show()
    }

    const closeEventInfo = function() {
        eventInfoRef.current?.close()
    }

    useEffect(() => {
        fetch('http://localhost:8000/api/week-templates', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((data: DataTemplates) => {
                dispatch({type: 'apply_templates', templates: data.data})
            })
            .catch((error) => {console.log('Ошибка получения шаблонов', error)})
    }, [])

    return (
        <>
            <Templates
            templatesState={templatesState} 
            dispatch={dispatch}
            openTemplateInfo={openTemplateInfo} 
            openEventInfo={openEventInfo}/>
            <TemplateInfo
            templateInfoRef={templateInfoRef}
            templateInfo={templatesState.templateInfo}
            dispatch={dispatch}
            closeTemplateInfo={closeTemplateInfo} />
            <EventInfo
            eventInfoRef={eventInfoRef}
            eventInfoState={eventInfoState}
            changeEventInfo={changeEventInfo}
            closeEventInfo={closeEventInfo} />
        </>
    )
}