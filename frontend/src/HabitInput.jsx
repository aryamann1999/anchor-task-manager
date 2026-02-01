import {useState} from "react";
import './HabitInput.css'
function HabitInput(props){
    const[habitInputValue, setHabitInputValue] = useState("")
    const[habitSelectedDays,setHabitSelectedDays] = useState([])
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
        if(habitInputValue.trim().length === 0){
            setHabitInputValue("")
            return
        }
        props.addHabitFnc(habitInputValue.trim(),habitSelectedDays)
        setHabitInputValue("")
        setHabitSelectedDays([])
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
    )

}
export default HabitInput