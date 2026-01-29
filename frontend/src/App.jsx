import {useEffect, useRef, useState} from 'react'
import './App.css'
import Header from './Header'
import TaskInput from "./TaskInput.jsx";
import HabitInput from "./HabitInput.jsx";
import TaskList from "./TaskList.jsx";
import TabNavigation from "./TabNavigation.jsx"
import HabitList from "./HabitList.jsx";
function App() {
    const isFirstRender = useRef(true)
    const STORAGE_TASK_KEY = 'anchorTasks'
    const STORAGE_HABIT_KEY = 'anchorHabits'
    //Loads TaskList from LocalStorage if exists returns array of tasks else returns empty array
    const loadTasksFromStorage = () => {
        try{
            if(localStorage.getItem(STORAGE_TASK_KEY) !== null){
                return JSON.parse(localStorage.getItem(STORAGE_TASK_KEY))
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
            if(localStorage.getItem(STORAGE_HABIT_KEY) !== null){
                return JSON.parse(localStorage.getItem(STORAGE_HABIT_KEY))
            }
            return []
        }catch(error){
            console.error('Error Loading Habits: ',error)
            localStorage.removeItem(STORAGE_HABIT_KEY)
            return []
        }
    }
    const [activeTab, setActiveTab] = useState('habits')
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
            console.warn("Cound not save to localStorage: ",error)
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
        const newTask = {
            id: crypto.randomUUID(),
            taskName: taskText,
            isComplete: false,
            priority: taskPriority,
            dueDate: taskDueDate,
            createdDate: new Date().toISOString()
        };
        setTasks([...tasks,newTask])
    }
    const addHabit = (habitText,habitType) =>{
        const newHabit = {
            id: crypto.randomUUID(),
            habitName: habitText,
            habitType: habitType,
            isComplete: false,
            createdDate: new Date().toISOString()
        }
        setHabits([...habits,newHabit])
    }
    const taskToggleComplete = (taskId) =>{
        setTasks(tasks.map(task =>{
            if(task.id === taskId){
                return {...task, isComplete: !task.isComplete}
            }
            return task
        }))
    }
    const habitToggleComplete = (habitId) =>{
        setHabits(habits.map(habit =>{
            if(habit.id === habitId){
                return{...habit,isComplete: !habit.isComplete}
            }
            return habit
        }))
    }
    const taskDelete = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId))
    }
    const habitDelete = (habitId) => {
        setHabits(habits.filter(habit => habit.id !== habitId))
    }
    return (
          <div>
              <Header name = "Anchor V0"/>
              <TabNavigation activeTab = {activeTab} onTabChange = {setActiveTab}/>
              {activeTab === 'habits' ? (
                  <>
                      <HabitInput placeholder = "Enter Habit" addHabitFnc = {addHabit} buttonText = "Add Habit"/>
                      <HabitList habits = {habits} onToggle = {habitToggleComplete} onDelete = {habitDelete}/>
                  </>
              ):(
                  <>
                      <TaskInput placeholder = "Enter Task" buttonText = "Add Task" addTaskFnc = {addTask}/>
                      <TaskList tasks = {tasks} onToggle = {taskToggleComplete} onDelete = {taskDelete}/>
                  </>

              )}

          </div>
        )
}

export default App
