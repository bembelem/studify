import { useReducer, useState, useRef, useEffect } from 'react'
import { 
    TimetableWeekState,
    TimetableWeekAction,
    TimetableTodayState, 
    TimetableTodayAction,
    EventInfoFull, 
    DataWeek,
    Weekdays
} from '@/app/types'
import { getStartDate } from '@/app/lib/date'
import { weekdaysOrderMap, initTimetableWeek, initTimetableWeekState, initTimetableTodayState, initEventInfoState } from '@/app/initData'
import { Timetable } from '@/entities/Timetable'
import { EventInfo } from '@/widgets/EventInfo'


const getformattedTimetableWeekState = function(
    shift: number, 
    timetableWeekState: TimetableWeekState, 
    action: TimetableWeekAction
) {
    const startDate = getStartDate(shift)
    const newTimetableWeekState = {...timetableWeekState, timetable: {...action.timetable!}}

    for (let weekday in newTimetableWeekState.timetable) {
        for (let i = 1; i < 9; i++) {
            if (newTimetableWeekState.timetable[weekday as Weekdays][String(i)]) {
                const weekdayDate = new Date(startDate.getTime())
                weekdayDate.setDate(weekdayDate.getDate() + weekdaysOrderMap[weekday as Weekdays])
                const date = weekdayDate.toLocaleDateString('zh-Hans-CN').replace(/[^apm\d]+/gi, '-')
                newTimetableWeekState.timetable[weekday as Weekdays][String(i)].date = date
            }
        }
    }

    return newTimetableWeekState
} 


const timetableWeekReducer = function(timetableWeekState: TimetableWeekState, action: TimetableWeekAction) {
    if (action.type === 'delete_event') {
        const day = action.eventInfo!.day
        const order = action.eventInfo!.order
        const newTimetableWeekState = {...timetableWeekState}

        delete newTimetableWeekState.timetable[day][order]

        return newTimetableWeekState
    } else if (action.type === 'save_event') {
        const day = action.eventInfo!.day
        const order = action.eventInfo!.order
        const newTimetableWeekState = {...timetableWeekState}

        newTimetableWeekState.timetable[day][order] = {...action.eventInfo!}

        return newTimetableWeekState
    } else if (action.type === 'apply_template') {
        const newTimetableWeekState = getformattedTimetableWeekState(timetableWeekState.shift, timetableWeekState, action)

        return newTimetableWeekState
    } else if (action.type === 'clear_timetable') {
        return {...timetableWeekState, timetable: {...initTimetableWeek}}
    } else if (action.type === 'switch_week') {
        return {...timetableWeekState, shift: timetableWeekState.shift + action.shift!}
    } else if (action.type === 'switch_week_today') {
        return {...timetableWeekState, shift: 0}
    } else if (action.type === 'fetch_timetable') {
        return {...timetableWeekState, isLoading: true}
    } else if (action.type === 'apply_timetable') {
        return {...timetableWeekState,
            timetable: {...action.timetable!},
            isLoading: false,
        }
    } else {
        throw Error(`Uknown action: ${action.type}`)
    }
}


const timetableTodayReducer = function(timetableTodayState: TimetableTodayState, action: TimetableTodayAction) {
    if (action.type === 'delete_event') {
        const newTimetableTodayState = {...timetableTodayState}
        
        delete newTimetableTodayState.timetable[action.eventInfo!.order]

        return newTimetableTodayState
    } else if (action.type === 'save_event') {
        const newTimetableTodayState = {...timetableTodayState}

        newTimetableTodayState.timetable[action.eventInfo!.order] = {...action.eventInfo!}

        return newTimetableTodayState
    } else if (action.type === 'apply_timetable') {
        return {...timetableTodayState, 
            timetable: {...action.timetable!},
            isLoading: false,
        }
    } else {
        throw Error(`Uknown action: ${action.type}`)
    }
}


export function HomePage() {
    const [timetableWeekState, timetableWeekDispatch] = useReducer(timetableWeekReducer, initTimetableWeekState)
    const [timetableTodayState, timetableTodayDispatch] = useReducer(timetableTodayReducer, initTimetableTodayState)
    const [eventInfoState, setEventInfoState] = useState(initEventInfoState)
    const eventWeekInfoRef = useRef<HTMLDialogElement>(null)

    const openEventInfo = function(eventInfo: EventInfoFull, eventType: 'event' | 'event_today') {
        if (eventType === 'event') {
            setEventInfoState({
                ...eventInfoState, 
                eventInfo: eventInfo,
                impactObjectName: 'event',
                impactObjectDispatch: timetableWeekDispatch,
            })
        } else if (eventType === 'event_today') {
            setEventInfoState({
                ...eventInfoState, 
                eventInfo: eventInfo,
                impactObjectName: 'event_today',
                impactObjectDispatch: timetableTodayDispatch,
            })
        }
        
        eventWeekInfoRef.current?.show()
    }

    const closeEventInfo = function() {
        eventWeekInfoRef.current?.close()
    }

    const changeEventInfo = function(eventInfo: EventInfoFull) {
        setEventInfoState({...eventInfoState, eventInfo: eventInfo})
    }

    useEffect(() => {
        let ignore = false
        timetableWeekDispatch({type: 'fetch_timetable'})
        fetch(`http://localhost:8000/api/events/week?shift=${timetableWeekState.shift}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((data: DataWeek) => {
                if (!ignore) {
                    timetableWeekDispatch({type: 'apply_timetable', timetable: data.data.week})
                }
            })
            .catch((error) => {console.log('Ошибка получения расписания на неделю', error)})

        return () => {
            ignore = true
        }
    }, [timetableWeekState.shift])


    useEffect(() => {
        fetch('http://localhost:8000/api/events/week?shift=0', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((data: DataWeek) => {
                let todayDay = new Date().toLocaleDateString('en-US', {weekday: 'long'})
                todayDay = todayDay.slice(0, 1).toLowerCase() + todayDay.slice(1)
                timetableTodayDispatch({type: 'apply_timetable', timetable: data.data.week[todayDay as Weekdays]})
            })
            .catch((error) => {console.log('Ошибка получения расписания на сегодня', error)})
    }, [])

    return (
        <>
            <Timetable 
            timetableWeekState={timetableWeekState}
            timetableTodayState={timetableTodayState}
            timetableWeekDispatch={timetableWeekDispatch} 
            openEventInfo={openEventInfo} />
            <EventInfo 
            eventInfoRef={eventWeekInfoRef} 
            eventInfoState={eventInfoState}
            changeEventInfo={changeEventInfo}
            closeEventInfo={closeEventInfo} />
        </>
    )
}