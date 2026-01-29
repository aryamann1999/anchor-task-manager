import './TaskInput.css'
import {useEffect, useState} from "react";
function TaskInput(props){
    const[inputValue,setInputValue] = useState("")
    const[taskPriority,setTaskPriority] = useState ("medium")
    const[taskDueDate,setTaskDueDate] = useState("")
    const handleClick= () => {
        handleSubmit()
    }
    const handleKeyDown = (event) =>{

        if(event.key === "Enter"){
            handleSubmit()
        }
    }
    const handleSubmit = () =>{
        if(inputValue.trim().length ===0){
            setInputValue("")
            return
        }
        if(taskDueDate === ""){
            return
        }
        props.addTaskFnc(inputValue.trim(),taskPriority,taskDueDate)
        setInputValue("")
        setTaskPriority("medium")
        setTaskDueDate("")
    }
    return(
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
                   onChange={event => setTaskDueDate((event.target.value))}
            />
            <button onClick= {handleClick}>
                {props.buttonText}
            </button>
        </div>
    )
}
export default TaskInput