import { FiltersInfo, EventInfoFull, TimetableWeek } from '@/app/types'
import { getStartDate } from '@/app/lib/date'
import { weekdaysList, weekdaysMap } from '@/app/initData'
import { DayInfo } from '@/shared/DayInfo'
import { Event } from '@/widgets/Event'
import { EventClear } from '@/widgets/EventClear'
import { Loader } from '@/shared/Loader'
import styles from '@/app/styles/styles_features/WeekTimetableInfo.module.css'


export function WeekTimetableInfo(props: {
    shift?: number,
    isLoading: boolean,
    currentTimetable: TimetableWeek,
    currentFilters: FiltersInfo,
    openEventInfo: (eventInfo: EventInfoFull, eventType: 'event' | 'event_today') => void
}) {
    const getEventOrderList = function() {
        const eventOrder = []
        for (let i = 1; i < 9; i++) {
            const key = crypto.randomUUID()
            eventOrder.push(
                <div key={key} className={styles.container_eventorder}>
                    {i}
                </div>
            )
        }

        return eventOrder
    }

    const getDayInfoList = function() {
        const dayInfoFullList = weekdaysList.map((weekday, index) => {
            const dayInfoKey = crypto.randomUUID()
            const numberLessons = Object.keys(props.currentTimetable[weekday]).length
            if (props.shift !== undefined) {
                const startDate = getStartDate(props.shift)
                const dayInfoDate = new Date(startDate.getTime())
                dayInfoDate.setDate(dayInfoDate.getDate() + index)
                return (
                    <div key={dayInfoKey} className={styles.container_dayinfo}>
                        <DayInfo date={dayInfoDate} numberLessons={numberLessons} />
                    </div> 
                )
            } else {
                const dayInfoDate = weekdaysMap[weekday]
                return (
                    <div key={dayInfoKey} className={styles.container_dayinfo}>
                        <DayInfo date={dayInfoDate} numberLessons={numberLessons} />
                    </div>
                )
            }
        })
        
        return dayInfoFullList
    }

    const getEventList = function() {
        const eventList = []
        for (let i = 0; i < weekdaysList.length; i++) {
            const weekday = weekdaysList[i]
            for (let j = 1; j < 9; j++) {
                const eventKey = crypto.randomUUID()
                if (props.currentTimetable[weekday][String(j)]) {
                    eventList.push(
                        <div key={eventKey} className={styles.container_event}>
                            <Event 
                            eventInfo={props.currentTimetable[weekday][String(j)]}
                            currentFilters={props.currentFilters} 
                            eventType={'event'}
                            openEventInfo={props.openEventInfo} />
                        </div>
                    )
                } else {
                    const startDate = getStartDate(props.shift !== undefined ? props.shift : 0)
                    const eventDate = new Date(startDate.getTime())
                    eventDate.setDate(startDate.getDate() + i)
                    const date = props.shift !== undefined
                                ? eventDate.toLocaleDateString('zh-Hans-CN').replace(/[^apm\d]+/gi, '-')
                                : eventDate.toLocaleDateString('ru-RU', {weekday: 'long'})
                    eventList.push(
                        <div key={eventKey} className={styles.container_event}>
                            <EventClear 
                            eventInfo={{day: weekday, order: String(j), date: date}} 
                            eventType={'event'}
                            openEventInfo={props.openEventInfo} />
                        </div>
                    )
                }
            }
        }

        return eventList
    }

    const eventOrderList = getEventOrderList()
    const dayInfoList = getDayInfoList()
    const eventList = getEventList()
    
    return (
        <div className={styles.container}>
            <div className={styles.timetable_dayinfo}>
                {dayInfoList}   
            </div>
            {props.isLoading
            ?
            <div className={styles.container_loader}>
                <Loader />
            </div>
            :
            <div className={styles.timetable_event}>
                {eventOrderList}
                {eventList}
            </div>
            }
        </div>
    )
}