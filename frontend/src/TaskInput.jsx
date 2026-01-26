import './TaskInput.css'
function TaskInput(props){
    return(
        <div className = "task-input-container">
            <input type = "text" placeholder = {props.placeholder} autoFocus/>
            <button>{props.buttonText}</button>
        </div>
    )
}
export default TaskInput