import {useEffect, useState} from 'react'
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
    validateDueDate,
    validateHabitName,
    validateHabitSchedule,
    validatePriority,
    validateTaskName
} from "./utils/validation.js";
import api from "./utils/api.js";
import Avatar from "./Avatar.jsx";
import {useNavigate} from "react-router-dom";

function App() {
    const navigate = useNavigate()
    //UseStates
    const [tasks, setTasks] = useState([])
    const [habits,setHabits] = useState([])
    const [activeTab, setActiveTab] = useState('dashboard')

    //UseEffect to load habits and tasks on Mount
    useEffect(()=>{
        const fetchData = async () => {
            try {
                const habitsResponse = await api.get('/api/habits')
                const habitsData = await habitsResponse.json()
                setHabits(habitsData.habits)

                const tasksResponse = await api.get('/api/tasks')
                const tasksData = await tasksResponse.json()
                setTasks(tasksData.tasks)
            }catch(error){
                console.error('Failed to fetch data:',error)
            }
        }
        fetchData()
    },[])


    //Handle Logout from dropdown Avatar
    const handleLogout = () =>{
        localStorage.removeItem('token')
        navigate('/')
    }
    //Add Habit
    const addHabit = async (habitText,habitSchedule) =>{
        if(!validateHabitName(habitText).isValid) return;
        if(!validateHabitSchedule(habitSchedule).isValid) return;

        try{
            const response = await api.post('/api/habits',{
                habitName:habitText,
                habitSchedule:habitSchedule
            })
            const data = await response.json()
            if(response.ok){
                setHabits(prev => [...prev,data.habit])
            }else{
                return{error:data.error}
            }
        }catch(error){
            console.error('Failed to add habit: ',error)
        }
    }

    //Add Task
    const addTask = async (taskText,taskPriority,taskDueDate) =>{
        if(!validateTaskName(taskText).isValid) return;
        if(!validatePriority(taskPriority).isValid) return;
        if(!validateDueDate(taskDueDate).isValid) return;

        try{
            const response = await api.post('/api/tasks',{
                taskName:taskText,
                priority:taskPriority,
                dueDate:taskDueDate
            })
            const data = await response.json()
            if(response.ok){
                setTasks(prev => [...prev,data.task])
            }else{
                return{error:data.error}
            }
        }catch(error){
            console.error('Failed to add task: ',error)
        }
    }

    //Delete Habit
    const habitDelete = async (habitId) =>{
        try{
            const response = await api.delete(`/api/habits/${habitId}`)
            const data = await response.json()
            if(response.ok){
                setHabits(prev => prev.filter(habit => habit.id !== data.deletedHabit.id))
            }else{
                return{error:data.error}
            }
        }catch(error){
            console.error('Failed to delete habit: ',error)
        }
    }

    //Delete Task
    const taskDelete = async (taskId) =>{
        try{
            const response = await api.delete(`/api/tasks/${taskId}`)
            const data = await response.json()
            if(response.ok){
                setTasks(prev => prev.filter(task => task.id !== data.deletedTask.id))
            }else{
                return{error:data.error}
            }
        }catch(error){
            console.error('Failed to delete task: ',error)
        }
    }

    //Toggle Activation of Habit
    const habitToggleActive = async (habitId) =>{
        try{
            const response = await api.patch(`/api/habits/${habitId}/active`)
            const data = await response.json()
            if(response.ok){
                setHabits(prev => prev.map(habit =>{
                    if(habit.id === data.updatedHabit.id){
                        return data.updatedHabit
                    }
                    return habit
                }))
            }else{
                return{error:data.error}
            }
        }catch(error){
            console.error('Failed to toggle active field habit: ',error)
        }
    }

    //Toggle Completion of Habit
    const habitToggleComplete = async(habitId) =>{
        try{
            const response = await api.patch(`/api/habits/${habitId}/completeToggle`)
            const data = await response.json()
            if(response.ok){
                setHabits(prev => prev.map(habit =>{
                    if(habit.id === data.updatedHabit.habitId){
                        if(data.action === 'completed'){
                            return {...habit,completions:[...habit.completions,data.updatedHabit]}
                        }
                        if(data.action === 'uncompleted'){
                            return{...habit,completions:habit.completions.filter(entry =>entry.id !==data.updatedHabit.id)}
                        }
                    }
                    return habit
                }))
            }else{
                return{error:data.error}
            }
        }catch(error){
            console.error('Failed to toggle complete field habit: ',error)
        }
    }

    //ToggleCompletion of Task
    const taskToggleComplete = async (taskId) =>{
        try{
            const response = await api.patch(`/api/tasks/${taskId}/completeToggle`)
            const data = await response.json()
            if(response.ok){
                setTasks(prev => prev.map(task =>{
                    if(task.id === data.updatedTask.id){
                        return data.updatedTask
                    }
                    return task
                }))
            }else{
                return {error:data.error}
            }
        }catch(error){
            console.error('Failed to toggle complete field task: ',error)
        }
    }
    const isHabitCompletedToday = (habit) => {
        const today = getLocalDateString()
        return habit.completions.some(entry => entry.date === today)
    }


    return (
          <div className = "app-layout">
              <Header name = "Anchor V0" avatar ={<Avatar onLogout = {handleLogout}/>}/>
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
