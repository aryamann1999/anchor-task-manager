export const getLocalDateString = (date = new Date()) =>{
    return `${date.getFullYear()}-${String(date.getMonth() +1).padStart(2,'0')}-${String(date.getDate()).padStart(2, '0')}`

}

export const calculateCurrentStreak = (habit) => {
    const date = new Date()
    let streak = 0
    if(!habit.habitCompletionHistory.some(entry => entry.date ===getLocalDateString(date))){
        date.setDate(date.getDate()-1)
    }
    const createdDate = getLocalDateString(new Date(habit.createdDate))
    while(getLocalDateString(date) >= createdDate){
        console.log(date.getDay(),",",habit.habitSchedule,",",habit.habitCompletionHistory)
        if(habit.habitSchedule.includes(date.getDay())){
            if(habit.habitCompletionHistory.some(entry => entry.date ===getLocalDateString(date))){
                streak += 1
                date.setDate(date.getDate() - 1)
            }else{
                return streak
            }
        }else{
            date.setDate(date.getDate()-1)
        }
    }
    return streak
}

export const calculateLongestStreak = (habit) =>{
    const today = new Date()
    const todayStr = getLocalDateString(today)
    let currentStreak = 0
    let longestStreak = 0
    const date = new Date(habit.createdDate)
    while(getLocalDateString(date)<= todayStr){
        if(habit.habitSchedule.includes(date.getDay())){
            if(habit.habitCompletionHistory.some(entry => entry.date === getLocalDateString(date))){
                currentStreak += 1
            }else{
                longestStreak = Math.max(longestStreak,currentStreak)
                currentStreak = 0
            }
        }
        date.setDate(date.getDate()+1)
    }
    longestStreak = Math.max(longestStreak, currentStreak)
    return longestStreak

}