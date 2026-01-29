import './HabitItem.css'
function HabitItem(props){
    return(
        <li className = {props.habit.isComplete?"habit-item completed":"habit-item"}>
            <div className = 'habit-content'>
                <span className = 'habit-name'>{props.habit.habitName}</span>
                <span className = 'habit-badge-type'>{props.habit.habitType}</span>
            </div>
            <div className = 'button-grp'>
                <button className = 'complete-btn' onClick = {() => props.onToggle(props.habit.id)}>Complete</button>
                <button className = 'delete-btn' onClick = {() => props.onDelete(props.habit.id)}>Delete</button>
            </div>
        </li>
    )
}
export default HabitItem