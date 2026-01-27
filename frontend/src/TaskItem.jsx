import "./TaskItem.css"
function TaskItem(props){
    return(
        <li className = {props.task.isComplete?"task-item completed":"task-item"}>
            <span>{props.task.taskName}</span>
            <div className="button-grp">
                <button className= "complete-btn" onClick = {() => props.onToggle(props.task.id)}>Complete</button>
                <button className= "delete-btn" onClick = {() => props.onDelete(props.task.id)}>Delete</button>
            </div>
        </li>
    )
}
export default TaskItem