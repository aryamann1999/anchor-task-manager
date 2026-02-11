import './HabitItem.css'
import {calculateCurrentStreak} from "./utils/dateUtils.js";
function HabitItem(props){
    const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
    const isSimple = props.mode === 'simple'
    const streak = calculateCurrentStreak(props.habit)
    const formatSchedule = (schedule) => {
        if(!schedule || schedule.length === 0){
            return 'No days'
        }
        if(schedule.length === 7){
            return 'Everyday'
        }
        return schedule.sort((a,b) => a-b).map(dayIndex => days[dayIndex]).join(', ')
    }
    return(
        <li className =
            {`${props.isCompletedToday(props.habit) ? "completed":""}
            ${!props.habit.isActive ? "inactive":""} habit-item`}
        >
            <div className = 'habit-content'>
                <span className = 'habit-name'>{props.habit.habitName}</span>
                {streak> 0 && (<span className = 'habit-streak'>🔥{streak}</span>)}
                {!isSimple && (<span className = 'habit-badge-type'>{formatSchedule(props.habit.habitSchedule)}</span>)}
            </div>
            <div className = 'button-grp'>
                <button
                    className = 'complete-btn'
                    onClick = {() => props.onToggle(props.habit.id)}
                    disabled = {!props.habit.isActive}
                >
                    {props.isCompletedToday(props.habit) ? "Undo":"Done"}
                </button>
                {!isSimple && (
                    <>
                        <button
                            className = 'delete-btn'
                            onClick = {() => props.onDelete(props.habit.id)}
                            disabled = {!props.habit.isActive}
                        >
                            Delete
                        </button>
                        <button
                            className = 'active-btn'
                            onClick = {() => props.activeToggle(props.habit.id)}
                        >
                            {props.habit.isActive ? 'Pause':'Resume'}
                        </button>
                    </>)}
            </div>
        </li>
    )
}
export default HabitItem