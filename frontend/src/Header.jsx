import './Header.css'
function Header (props){
    return(
        <div className = "header">
            <h1>{props.name}</h1>
            {props.action}
        </div>
    )
}
export default Header