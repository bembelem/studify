import { Dispatch } from 'react'
import { TimetableWeekState, TimetableWeekAction, FiltersInfo, EventInfoFull } from '@/app/types'
import { WeekNavigator } from '@/features/WeekNavigator'
import { WeekTimetableInfo } from '@/features/WeekTimetableInfo'
import styles from '@/app/styles/styles_widgets/WeekTimetable.module.css'


export function WeekTimetable(props: {
    timetableWeekState: TimetableWeekState,
    dispatch: Dispatch<TimetableWeekAction>,
    currentFilters: FiltersInfo
    changeFilters: (filters: FiltersInfo) => void,
    openEventInfo: (eventInfo: EventInfoFull, eventType: 'event' | 'event_today') => void
}) {
    const switchWeek = function(shift: number) {
        props.dispatch({type: 'switch_week', shift: shift})
    }
    
    return (
        <section className={styles.container}>
            <WeekNavigator 
            timetableWeekState={props.timetableWeekState} 
            dispatch={props.dispatch}
            currentFilters={props.currentFilters}
            switchWeek={switchWeek}
            changeFilters={props.changeFilters} />
            <WeekTimetableInfo 
            shift={props.timetableWeekState.shift}
            isLoading={props.timetableWeekState.isLoading}
            currentTimetable={props.timetableWeekState.timetable}
            currentFilters={props.currentFilters} 
            openEventInfo={props.openEventInfo} />
        </section>
    )
}