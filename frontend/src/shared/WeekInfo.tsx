import styles from '@/app/styles/styles_shared/WeekInfo.module.css'


const getWeeklyBoundaries = function(shift: number) {
    const currentDate = new Date()
    const currentWeek = new Date()
    
    currentWeek.setDate(currentDate.getDate() + 7 * shift)

    const startDate = new Date(currentWeek.getTime())
    const endDate = new Date(currentWeek.getTime())

    startDate.setDate(startDate.getDate() + 1 - currentDate.getDay()) // получаем дату начала недели
    endDate.setDate(endDate.getDate() + 6 - currentDate.getDay()) // получаем дату конца недели

    return {
        startDate: startDate,
        endDate: endDate,
    }
}


const formatWeeklyBoundaries = function(weeklyBoundaries: {startDate: Date, endDate: Date}) {
    const startDateMonth = weeklyBoundaries.startDate.getMonth()
    const endDateMonth = weeklyBoundaries.endDate.getMonth()
    const startDateDay = weeklyBoundaries.startDate.getDate()
    const endDateDay = weeklyBoundaries.endDate.getDate()

    if (startDateMonth === endDateMonth) {
        const month = weeklyBoundaries.startDate.toLocaleDateString('ru-RU', {month: 'short'})

        return `${startDateDay}-${endDateDay} ${month}`
    }

    const startMonth = weeklyBoundaries.startDate.toLocaleDateString('ru-RU', {month: 'short'})
    const endMonth = weeklyBoundaries.endDate.toLocaleDateString('ru-RU', {month: 'short'})

    return `${startDateDay} ${startMonth}-${endDateDay} ${endMonth}`
}


export function WeekInfo(props: {shift: number}) {
    const weeklyBoundaries = getWeeklyBoundaries(props.shift)
    const formattedDate = formatWeeklyBoundaries(weeklyBoundaries)
    
    return (
        <div className={styles.container}>
            <h1>{formattedDate}</h1>
            <p className={styles.parity}>неделя</p>
        </div> 
    )
}