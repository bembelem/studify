export const getStartDate = function(shift: number) {
    const currentDate = new Date()
    const currentWeek = new Date()
    
    currentWeek.setDate(currentDate.getDate() + 7 * shift)
    const startDate = new Date(currentWeek.getTime())
    startDate.setDate(startDate.getDate() + 1 - currentDate.getDay())

    return startDate
}