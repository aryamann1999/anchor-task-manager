import "./Dashboard.css"
import {useState} from "react";
import HabitItem from './HabitItem.jsx'
import TaskItem from './TaskItem.jsx'
import {getLocalDateString} from "./utils/dateUtils.js";
function Dashboard(props){
    const[todayView,setTodayView] = useState('habits')
    const todayDayIndex = new Date().getDay()
    const todayDateString = getLocalDateString()
    const todayHabits = props.habits.filter(habit => habit.habitSchedule.includes(todayDayIndex) && habit.isActive)
    const todayTasks = props.tasks.filter(task => task.dueDate === todayDateString)
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
                    <p>Keep Building!</p>
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