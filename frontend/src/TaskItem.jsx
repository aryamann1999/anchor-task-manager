import "./TaskItem.css"
function TaskItem(props){
    return(
        <li className = {props.task.isComplete?"task-item completed":"task-item"}>
            <div className = 'task-content'>
                <span className = "task-name">{props.task.taskName}</span>
                <div className = 'task-badges'>
                    <span className = {`badge priority-${props.task.priority}`}>{props.task.priority}</span>
                    <span className = 'badge-due-date'>{props.task.dueDate}</span>
                </div>
            </div>
            <div className="button-grp">
                <button className= "complete-btn" onClick = {() => props.onToggle(props.task.id)}>Complete</button>
                <button className= "delete-btn" onClick = {() => props.onDelete(props.task.id)}>Delete</button>
            </div>
        </li>
    )
}
export default TaskItem