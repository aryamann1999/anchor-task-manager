import './Header.css'
function Header (props){
    return(
        <div className = "header">
            <h1>{props.name}</h1>
            {props.avatar}
        </div>
    )
}
export default Header