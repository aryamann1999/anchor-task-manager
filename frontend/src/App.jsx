import { useState } from 'react'
import './App.css'
import Header from './Header'
import TaskInput from "./TaskInput.jsx";
import TaskList from "./TaskList.jsx";
function App() {
    const [tasks, setTasks] = useState([])

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
