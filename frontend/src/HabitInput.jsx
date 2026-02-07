import {useState} from "react";
import './HabitInput.css'
import {validateHabitName, validateHabitSchedule} from "./utils/validation.js";

function HabitInput(props){
    const[habitInputValue, setHabitInputValue] = useState("")
    const[habitSelectedDays,setHabitSelectedDays] = useState([])
    const[error,setError] = useState("")
    const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

    const toggleDay = (dayIndex) =>{
        if(habitSelectedDays.includes(dayIndex)){
            setHabitSelectedDays(habitSelectedDays.filter(d => d !== dayIndex))
        }else{
            setHabitSelectedDays([...habitSelectedDays, dayIndex])
        }
    }
    const handleClick = () =>{
        handleSubmit();
    }

    const toggleEveryday = (dayIndex) => {
        if(habitSelectedDays.length === 7){
            setHabitSelectedDays([])
        }else{
            setHabitSelectedDays([0,1,2,3,4,5,6])
        }
    }
    const handleSubmit = () => {
        const habitName = validateHabitName(habitInputValue)
        if(!habitName.isValid){
            setError(habitName.error)
            setHabitInputValue("")
            return
        }
        const scheduleResult = validateHabitSchedule(habitSelectedDays)
        if(!scheduleResult.isValid){
            setError(scheduleResult.error)
            return
        }
        const result = props.addHabitFnc(habitInputValue.trim(),habitSelectedDays)
        if(result?.error){
            setError(result.error)
            return
        }
        setError("")
        setHabitInputValue("")
        setHabitSelectedDays([])
    }
    const handleKeyDown = (event) => {
        if(event.key === "Enter"){
            handleSubmit()
        }
    }
    return(
        <div>
            {error && <p className = "error-message">{error}</p>}
            <div className = "habit-input-container">
                <input type = 'text'
                       placeholder = {props.placeholder}
                       autoFocus
                       value = {habitInputValue}
                       onChange={event => setHabitInputValue(event.target.value)}
                       onKeyDown = {handleKeyDown}
                />
                <div className = "habit-schedule-pills">
                    {days.map((day, index) =>(
                        <button
                            key = {day}
                            className = {`day-pill ${habitSelectedDays.includes(index) ? 'selected' : ''}`}
                            onClick = {() => toggleDay(index)}
                        >
                            {day}
                        </button>
                    ))}
                </div>
                <label className = "everyday-checkbox">
                    <input
                        type = "checkbox"
                        checked = {habitSelectedDays.length === 7}
                        onChange = {toggleEveryday}
                    />
                    Everyday
                </label>
                <button onClick = {handleClick}>
                    {props.buttonText}
                </button>
            </div>
        </div>
    )

}
export default HabitInput