import './TaskInput.css'
import {useEffect, useState} from "react";
import {validateTaskName, validateDueDate} from './utils/validation.js'
import {getLocalDateString} from "./utils/dateUtils.js";
function TaskInput(props){
    const[inputValue,setInputValue] = useState("")
    const[taskPriority,setTaskPriority] = useState ("medium")
    const[taskDueDate,setTaskDueDate] = useState("")
    const[error, setError] = useState("")
    const handleClick= () => {
        handleSubmit()
    }
    const handleKeyDown = (event) =>{

        if(event.key === "Enter"){
            handleSubmit()
        }
    }
    const handleSubmit = () =>{
        const taskName = validateTaskName(inputValue)
        if(!taskName.isValid){
            setError(taskName.error)
            setInputValue("")
            return
        }
        const dueDate = validateDueDate(taskDueDate)
        if(!dueDate.isValid){
            setError(dueDate.error)
            return
        }
        const result = props.addTaskFnc(inputValue.trim(),taskPriority,taskDueDate)
        if(result?.error){
            setError(result.error)
            return
        }
        setError("")
        setInputValue("")
        setTaskPriority("medium")
        setTaskDueDate("")
    }
    return(
        <div>
            {error && <p className = "error-message">{error}</p>}
            <div className = "task-input-container">
                <input type = "text"
                       placeholder = {props.placeholder}
                       autoFocus
                       value = {inputValue}
                       onChange={event => setInputValue(event.target.value)}
                       onKeyDown={handleKeyDown}
                />
                <select value = {taskPriority} onChange={(e) => setTaskPriority(e.target.value)}>
                    <option value = "low">Low</option>
                    <option value = "medium">Medium</option>
                    <option value = "high">High</option>
                </select>
                <input type = "date"
                       value = {taskDueDate}
                       min = {getLocalDateString()}
                       onChange={event => setTaskDueDate((event.target.value))}
                />
                <button onClick= {handleClick}>
                    {props.buttonText}
                </button>
            </div>
        </div>
    )
}
export default TaskInput