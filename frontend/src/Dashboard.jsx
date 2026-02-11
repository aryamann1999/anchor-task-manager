import "./Dashboard.css"
import {useState} from "react";
import HabitItem from './HabitItem.jsx'
import TaskItem from './TaskItem.jsx'
import {calculateCurrentStreak, calculateLongestStreak, getLocalDateString} from "./utils/dateUtils.js";
function Dashboard(props){
    const[todayView,setTodayView] = useState('habits')
    const todayDayIndex = new Date().getDay()
    const todayDateString = getLocalDateString()
    const todayHabits = props.habits.filter(habit => habit.habitSchedule.includes(todayDayIndex) && habit.isActive)
    const todayTasks = props.tasks.filter(task => task.dueDate === todayDateString)

    function bestCurrentStreak (habits){
        return (habits.reduce((best, currentHabit) =>{
            let currentHabitStreak = calculateCurrentStreak(currentHabit)
            if(currentHabitStreak === best.streak && best.streak>0){
                return {name:best.name,streak:best.streak,count:best.count+1}
            }
            if(currentHabitStreak> best.streak){
                return {name: currentHabit.habitName, streak: currentHabitStreak,count:1}
            }
            return best
        },{name:'',streak:0,count:0}))
    }
    function longestStreakEver (habits){
        return(habits.reduce((best,currentHabit) =>{
            let currentStreak = calculateLongestStreak(currentHabit)
            if(currentStreak===best.streak && best.streak > 0){
                return {name:best.name,streak: best.streak,count:best.count+1}
            }
            if(currentStreak > best.streak){
                return {name:currentHabit.habitName,streak: currentStreak,count:1}
            }
            return best
        },{name:'',streak:0,count:0}))
    }
    const topCurrentStreak = bestCurrentStreak(props.habits)
    const longestStreak = longestStreakEver(props.habits)
    return(
        <div className = "dashboard">
            <h1 className = "welcome-message">Welcome back, Ray!</h1>
            <div className = "dashboard-grid">
                <DashboardCard title = "Today" className = "today-card">
                    <button
                        className = {todayView === 'habits' ? 'today-pill active':'today-pill'}
                        onClick = {() =>setTodayView('habits')}
                    >
                        Habits
                    </button>
                    <button
                        className = {todayView === 'tasks' ? 'today-pill active':'today-pill'}
                        onClick = {() =>setTodayView('tasks')}
                    >
                        Tasks
                    </button>
                    {todayView === 'habits' && (
                        <ul>
                            {todayHabits.length === 0 ?
                                <p>No habits scheduled for today</p>
                                :todayHabits.map(habit =>
                                <HabitItem key = {habit.id} habit = {habit} mode = 'simple' onToggle = {props.habitToggleComplete} isCompletedToday = {props.isHabitCompletedToday}></HabitItem>)}
                        </ul>
                    )}
                    {todayView ==='tasks' && (
                        <ul>
                            {todayTasks.length === 0 ?
                                <p>No tasks scheduled for today</p>
                                :todayTasks.map(task =>
                                <TaskItem key = {task.id} task = {task} mode = 'simple' onToggle = {props.taskToggleComplete}/>)}
                        </ul>
                    )}
                </DashboardCard>
                <DashboardCard title = "Momentum" className = "momentum-card">
                    <p>Best Active Streak: {topCurrentStreak.count > 0 ? `${topCurrentStreak.count>1 ? `${topCurrentStreak.count} habits`: topCurrentStreak.name}  🔥${topCurrentStreak.streak}`:"None yet"}</p>
                    <p>Longest Streak: {longestStreak.count>0 ? `${longestStreak.count>1 ? `${longestStreak.count} habits`:longestStreak.name}  🔥${longestStreak.streak}`:"None yet"}</p>
                </DashboardCard>
                <DashboardCard title = "Character" className = 'character-card'>
                    <p>Coming Soon</p>
                </DashboardCard>
                <DashboardCard title = "Stats" className = 'character-stats-card'>
                    <p>User Stat Wheel Here</p>
                </DashboardCard>
            </div>
        </div>
    )
}
function DashboardCard(props){
    return(
        <div className = {`dashboard-card ${props.className}`}>
            <h3 className = "card-title">{props.title}</h3>
            <div className = "card-content">{props.children}</div>
        </div>
    )
}
export default Dashboard