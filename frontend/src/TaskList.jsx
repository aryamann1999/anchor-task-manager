import './TaskList.css'
import TaskItem from "./TaskItem.jsx";
function TaskList(props){
    return(
        <ul className = 'task-list'>
            {props.tasks.map(task => (
                <TaskItem key = {task.id} task = {task} onToggle = {props.onToggle} onDelete = {props.onDelete}/>
            ))}

        </ul>
    )
}
export default TaskList