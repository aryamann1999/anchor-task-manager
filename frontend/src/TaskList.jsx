import './TaskList.css'
function TaskList(props){

    return(
        <ul className = 'task-list'>
            <li>{props.task}</li>
        </ul>
    )
}
export default TaskList