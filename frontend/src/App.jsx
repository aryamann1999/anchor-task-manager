import {useEffect, useRef, useState} from 'react'
import './App.css'
import Header from './Header'
import TaskInput from "./TaskInput.jsx";
import HabitInput from "./HabitInput.jsx";
import TaskList from "./TaskList.jsx";
import Sidebar from "./Sidebar.jsx"
import Dashboard from "./Dashboard.jsx"
import Footer from "./Footer.jsx"
import HabitList from "./HabitList.jsx";
import {getLocalDateString} from './utils/dateUtils.js'
import {
    isValidHabit,
    isValidTask,
    validateDueDate,
    validateHabitName,
    validateHabitSchedule,
    validatePriority,
    validateTaskName
} from "./utils/validation.js";
function App() {
    const isFirstRender = useRef(true)
    const STORAGE_TASK_KEY = 'anchorTasks'
    const STORAGE_HABIT_KEY = 'anchorHabits'
    //Loads TaskList from LocalStorage if exists returns array of tasks else returns empty array
    const loadTasksFromStorage = () => {
        try{
            const loadedData = localStorage.getItem(STORAGE_TASK_KEY)
            if( loadedData!== null){
                const data = JSON.parse(loadedData)
                return data.filter(task => isValidTask(task))
            }
            return []
        } catch(error){
            console.error('Error Loading Tasks: ',error)
            localStorage.removeItem(STORAGE_TASK_KEY)
            return []
        }
    }
    const loadHabitsFromStorage = () => {
        try{
            const loadedData = localStorage.getItem(STORAGE_HABIT_KEY)
            if(loadedData !== null){
                const data = JSON.parse(loadedData)
                return data.filter(habit => isValidHabit(habit))
            }
            return []
        }catch(error){
            console.error('Error Loading Habits: ',error)
            localStorage.removeItem(STORAGE_HABIT_KEY)
            return []
        }
    }
    const [activeTab, setActiveTab] = useState('dashboard')
    //useState calling loadTasksFromStorage and setting tasks during initial mount
    const [tasks, setTasks] = useState(() => {
        return loadTasksFromStorage()
    })
    const [habits,setHabits] = useState(()=>{
        return loadHabitsFromStorage()
    })

    //Saves Tasks to Storage
    const saveTasksToStorage = () => {
        try{
            localStorage.setItem(STORAGE_TASK_KEY,JSON.stringify(tasks))
        }catch(error){
            console.warn("Could not save to localStorage: ", error)
        }
    }
    const saveHabitsToStorage = () =>{
        try{
            localStorage.setItem(STORAGE_HABIT_KEY,JSON.stringify(habits))
        }catch(error){
            console.warn("Could not save to localStorage: ",error)
        }
    }
    //useEffect runs every render except first one to update localStorage with any changes in Tasks by calling saveTasksToStorage
    useEffect(()=>{
        if(isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        saveTasksToStorage()
        saveHabitsToStorage()
    },[tasks,habits])
    const addTask = (taskText,taskPriority,taskDueDate) =>{
        //Defensive Validation
        if(!validateTaskName(taskText).isValid) return;
        if(!validateDueDate(taskDueDate).isValid) return;
        if(!validatePriority(taskPriority).isValid) return;
        if(tasks.some(task => task.taskName === taskText)){
            return {error: `Task "${taskText}" already exists`}
        }
        const newTask = {
            id: crypto.randomUUID(),
            taskName: taskText,
            isComplete: false,
            priority: taskPriority,
            dueDate: taskDueDate,
            createdDate: new Date().toISOString()
        };
        setTasks(prev => [...prev,newTask])
    }
    const addHabit = (habitText,habitSchedule) =>{
        //Defensive Validation
        if(!validateHabitName(habitText).isValid) return;
        if(!validateHabitSchedule(habitSchedule).isValid) return;
        if(habits.some(habit => habit.habitName === habitText)){
            return {error: `Habit "${habitText}" already exists`}
        }
        const newHabit = {
            id: crypto.randomUUID(),
            habitName: habitText,
            habitSchedule: habitSchedule,
            habitCompletionHistory: [],
            createdDate: new Date().toISOString(),
            isActive: true
        }
        setHabits(prev =>[...prev,newHabit])
    }
    const habitToggleActive = (habitId) =>{
        setHabits(prev => prev.map(habit =>{
            if(habit.id === habitId){
                return {...habit,isActive: !habit.isActive}
            }
            return habit
        }))
    }
    const taskToggleComplete = (taskId) =>{
        setTasks(prev => prev.map(task =>{
            if(task.id === taskId){
                return {...task, isComplete: !task.isComplete}
            }
            return task
        }))
    }
    const habitToggleComplete = (habitId) => {
        let today = getLocalDateString();
        setHabits(prev => prev.map(habit => {
            if (habit.id === habitId) {
                const todayExists = habit.habitCompletionHistory.some(entry => entry.date === today)
                if (todayExists) {
                    return {
                        ...habit,
                        habitCompletionHistory: habit.habitCompletionHistory.filter(entry => entry.date !== today)
                    }
                } else {
                    return {...habit, habitCompletionHistory: [...habit.habitCompletionHistory, {date: today}]}
                }

            }
            return habit
        }));
    }
    const isHabitCompletedToday = (habit) => {
        const today = getLocalDateString()
        return habit.habitCompletionHistory.some(entry => entry.date === today)
    }

    const taskDelete = (taskId) => {
        setTasks(prev => prev.filter(task => task.id !== taskId))
    }
    const habitDelete = (habitId) => {
        setHabits(prev => prev.filter(habit => habit.id !== habitId))
    }
    return (
          <div className = "app-layout">
              <Header name = "Anchor V0"/>
              <Sidebar activeTab = {activeTab} onTabChange = {setActiveTab}/>
              <main className = "main-content">
                  {activeTab === 'dashboard' && (
                      <Dashboard habits = {habits} habitToggleComplete = {habitToggleComplete} tasks = {tasks} taskToggleComplete = {taskToggleComplete} isHabitCompletedToday = {isHabitCompletedToday}/>
                  )}
                  {activeTab === 'habits' && (
                      <>
                          <HabitInput placeholder = "Enter Habit" addHabitFnc = {addHabit} buttonText = "add Habit"/>
                          <HabitList habits = {habits} onToggle = {habitToggleComplete} onDelete = {habitDelete} isCompletedToday = {isHabitCompletedToday} habitActiveToggle = {habitToggleActive}/>
                      </>
                  )}
                  {activeTab === 'tasks' && (
                      <>
                          <TaskInput placeholder = "Enter Task" buttonText = "Add Task" addTaskFnc = {addTask}/>
                          <TaskList tasks = {tasks} onToggle = {taskToggleComplete} onDelete = {taskDelete}/>
                      </>
                  )}
              </main>
              <Footer/>
          </div>
        )
}

export default App
