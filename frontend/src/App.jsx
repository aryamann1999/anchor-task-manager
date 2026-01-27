import {useEffect, useRef, useState} from 'react'
import './App.css'
import Header from './Header'
import TaskInput from "./TaskInput.jsx";
import TaskList from "./TaskList.jsx";
function App() {
    const isFirstRender = useRef(true)
    const STORAGE_KEY = 'anchorTasks'
    //Loads TaskList from LocalStorage if exists returns array of tasks else returns empty array
    const loadTasksFromStorage = () => {
        try{
            if(localStorage.getItem(STORAGE_KEY) !== null){
                return JSON.parse(localStorage.getItem('anchorTasks'))
            }
            return []
        } catch(error){
            console.error('Error Loading Tasks: ',error)
            localStorage.removeItem(STORAGE_KEY)
            return []
        }
    }
    //useState calling loadTasksFromStorage and setting tasks during initial mount
    const [tasks, setTasks] = useState(() => {
        return loadTasksFromStorage()
    })
    //Saves Tasks to Storage
    const saveTasksToStorage = () => {
        try{
            localStorage.setItem(STORAGE_KEY,JSON.stringify(tasks))
        }catch(error){
            console.warn("Could not save to localStorage: ", error)
        }
    }
    //useEffect runs every render except first one to update localStorage with any changes in Tasks by calling saveTasksToStorage
    useEffect(()=>{
        if(isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        saveTasksToStorage()
    },[tasks])

    const addTask = (taskText) =>{
        const newTask = {
                id: crypto.randomUUID(),
                taskName: taskText,
                isComplete: false
        };
        setTasks([...tasks,newTask])
    }
    const toggleComplete = (taskId) =>{
        setTasks(tasks.map(task =>{
            if(task.id === taskId){
                return {...task, isComplete: !task.isComplete}
            }
            return task
        }))
    }
    const deleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId))
    }
    return (
          <div>
              <Header name = "Anchor V0"/>
              <TaskInput placeholder = "Enter Task" buttonText = "Add Task" addTaskFnc = {addTask}/>
              <TaskList tasks = {tasks} onToggle = {toggleComplete} onDelete = {deleteTask}/>
          </div>
        )
}

export default App
