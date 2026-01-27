import './TaskInput.css'
import {useEffect, useState} from "react";
function TaskInput(props){
    const[inputValue,setInputValue] = useState("")
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
        props.addTaskFnc(inputValue.trim())
        setInputValue("")
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
            <button onClick= {handleClick}>
                {props.buttonText}
            </button>
        </div>
    )
}
export default TaskInput