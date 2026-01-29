import {useState} from "react";
import './HabitInput.css'
function HabitInput(props){
    const[habitInputValue, setHabitInputValue] = useState("")
    const[habitType,setHabitType] = useState("daily")
    const handleClick = () =>{
        handleSubmit();
    }
    const handleSubmit = () => {
        if(habitInputValue.trim().length === 0){
            setHabitInputValue("")
            return
        }
        props.addHabitFnc(habitInputValue.trim(),habitType)
        setHabitInputValue("")
        setHabitType("daily")
    }
    const handleKeyDown = (event) => {
        if(event.key === "Enter"){
            handleSubmit()
        }
    }
    return(
        <div className = "habit-input-container">
            <input type = 'text'
                   placeholder = {props.placeholder}
                   autoFocus
                   value = {habitInputValue}
                   onChange={event => setHabitInputValue(event.target.value)}
                   onKeyDown = {handleKeyDown}
            />
            <select value = {habitType} onChange={(e) => setHabitType(e.target.value)}>
                <option value = "daily">Daily</option>
                <option value ="weekly">Weekly</option>
            </select>
            <button onClick = {handleClick}>
                {props.buttonText}
            </button>
        </div>
    )

}
export default HabitInput