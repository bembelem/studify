import { Dispatch, useState } from 'react'
import { 
    TimetableWeekState,
    TimetableTodayState, 
    TimetableWeekAction, 
    EventInfoFull, 
    FiltersInfo 
} from '@/app/types'
import { initEventCategories } from '@/app/initData'
import { TodayTimetable } from '@/widgets/TodayTimetable'
import { WeekTimetable } from '@/widgets/WeekTimetable'
import styles from '@/app/styles/styles_entities/Timetable.module.css'


export function Timetable(props: {
    timetableWeekState: TimetableWeekState,
    timetableTodayState: TimetableTodayState,
    timetableWeekDispatch: Dispatch<TimetableWeekAction>,
    openEventInfo: (eventInfo: EventInfoFull, eventType: 'event' | 'event_today') => void
}) {
    const [filtersState, setFiltersState] = useState<FiltersInfo>(initEventCategories)

    const changeFilters = function(filters: FiltersInfo) {
        setFiltersState(filters)
    }

    return (
        <main className={styles.container}>
            <TodayTimetable
            timetableTodayState={props.timetableTodayState}
            dispatch={props.timetableWeekDispatch}
            currentFilters={filtersState}
            openEventInfo={props.openEventInfo} />
            <WeekTimetable
            timetableWeekState={props.timetableWeekState}
            dispatch={props.timetableWeekDispatch}
            currentFilters={filtersState}
            changeFilters={changeFilters}
            openEventInfo={props.openEventInfo} />
        </main>
    )
}