import styles from '@/app/styles/styles_shared/DayInfo.module.css'


const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
}


const getFormattedTodayDate = function(date: Date) {
    const formattedDate = date.toLocaleDateString('ru-RU', options)
    const todayDate = formattedDate[0].toUpperCase() + formattedDate.slice(1)

    return todayDate
}


const getNumberLessonsMessage = function(numberLessons: number) {
    if (numberLessons === 1) {
        return `${numberLessons} пара`
    } else if (numberLessons === 0 || numberLessons > 4) {
        return `${numberLessons} пар`
    } else {
        return `${numberLessons} пары`
    }
}


export function DayInfo(props: {date: Date | string, numberLessons: number}) {
    const dayInfoDate = typeof props.date === 'string' ? props.date : getFormattedTodayDate(props.date)
    const numberLessonsMessage = getNumberLessonsMessage(props.numberLessons)

    return (
        <>
            <p>{dayInfoDate}</p>
            <p className={styles.lessons}>{numberLessonsMessage}</p>
        </>
    )
}