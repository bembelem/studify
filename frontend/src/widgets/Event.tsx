import { EventInfoFull, FiltersInfo, ImpactObjectNames } from '@/app/types'
import { nameMap, orderTimeMap } from '@/app/initData'
import styles from '@/app/styles/styles_widgets/Event.module.css'


const eventStyleMap: {[filterKey: string]: string} = {
    'practice': styles.container_practice_checked,
    'lecture': styles.container_lecture_checked,
    'test': styles.container_test_checked,
    'project': styles.container_project_checked,
    'colloquium': styles.container_colloquium_checked,
    'homework': styles.container_homework_checked,
}


const getEventBorderStyle = function(eventInfo: EventInfoFull, currentFilters: FiltersInfo) {
    for (let filter in currentFilters) {
        if (filter !== 'practice' && filter !== 'lecture') {
            if (eventInfo[filter as keyof EventInfoFull] && currentFilters[filter as keyof FiltersInfo]) {
                return eventStyleMap[filter]
            }
        }
    }

    return styles.container
}


const getEventTypeStyle = function(eventInfo: EventInfoFull, currentFilters: FiltersInfo) {
    if (currentFilters.practice && 'practice' === eventInfo.type) {
        return styles.type_practice_checked
    } else if (currentFilters.lecture && 'lecture' === eventInfo.type) {
        return styles.type_lecture_checked
    }

    return styles.type
}


export function Event(props: {
    eventInfo: EventInfoFull,
    currentFilters: FiltersInfo,
    eventType: ImpactObjectNames,
    openEventInfo: (eventInfo: EventInfoFull, eventType: ImpactObjectNames) => void
}) {
    const eventClick = function() {
        props.openEventInfo(props.eventInfo, props.eventType)
    }

    const eventBorderStyle = getEventBorderStyle(props.eventInfo, props.currentFilters)
    const eventTypeStyle = getEventTypeStyle(props.eventInfo, props.currentFilters)
    const eventType = nameMap[props.eventInfo.type]

    return (
        <div className={eventBorderStyle} onClick={eventClick}>
            <div>
                <span className={styles.room_type}>
                    {props.eventInfo.room}
                </span>
                <span className={eventTypeStyle}>{eventType}</span>
            </div>
            <div className={styles.subject}>
                <h3>{props.eventInfo.subject}</h3>
            </div>
            <h4 className={styles.time}>{orderTimeMap[props.eventInfo.order]}</h4>
        </div>
    )
}