import HabitItem from "./HabitItem.jsx";
import './HabitList.css'
function HabitList(props){
    return(
        <ul className = 'habit-list'>
            {props.habits.map(habit =>(
                <HabitItem key = {habit.id} habit = {habit} onToggle = {props.onToggle} onDelete = {props.onDelete}/>
            ))}
        </ul>
    )
}
export default HabitList