import { Dispatch } from 'react'
import { 
    TimetableTodayState, 
    TimetableWeekAction, 
    FiltersInfo, 
    EventInfoFull, 
    Weekdays 
} from '@/app/types'
import { DayInfo } from '@/shared/DayInfo'
import { Event } from '@/widgets/Event'
import { EventClear } from '@/widgets/EventClear'
import { Loader } from '@/shared/Loader'
import styles from '@/app/styles/styles_widgets/TodayTimetable.module.css'


export function TodayTimetable(props: {
    timetableTodayState: TimetableTodayState,
    dispatch: Dispatch<TimetableWeekAction>,
    currentFilters: FiltersInfo,
    openEventInfo: (eventInfo: EventInfoFull, eventType: 'event' | 'event_today') => void
}) {
    const todayDate = new Date()
    const numberLessons = Object.keys(props.timetableTodayState.timetable).length

    const todayClick = function() {
        props.dispatch({type: 'switch_week_today'})
    }

    const getEventList = function() {
        const eventList = []
        for (let i = 1; i < 9; i++) {
            const eventKey = crypto.randomUUID()
            if (props.timetableTodayState.timetable[String(i)]) {
                eventList.push(
                    <Event 
                    key={eventKey} 
                    eventInfo={props.timetableTodayState.timetable[String(i)]}
                    currentFilters={props.currentFilters}
                    eventType={'event_today'} 
                    openEventInfo={props.openEventInfo} />
                )
            } else {
                const todayDay = todayDate.toLocaleDateString('en-US', {weekday: 'long'}) as Weekdays
                const date = todayDate.toLocaleDateString('zh-Hans-CN').replace(/[^apm\d]+/gi, '-')
                eventList.push(
                    <EventClear 
                    key={eventKey} 
                    eventInfo={{day: todayDay, order: String(i), date: date}} 
                    eventType={'event_today'}
                    openEventInfo={props.openEventInfo} />
                )
            }
        }

        return eventList
    }

    const eventList = getEventList()

    return (
        <section className={styles.container}>
            <header className={styles.container_dayinfo}>
                <h2 className={styles.today} onClick={todayClick}>Сегодня</h2>
                <DayInfo date={todayDate} numberLessons={numberLessons} />
            </header>
            <div className={styles.container_events}>
                {props.timetableTodayState.isLoading
                ?
                <div className={styles.container_loader}>
                    <Loader />
                </div>
                :
                eventList
                }
            </div>
        </section>
    )
}