import {useState,useEffect, useRef} from "react";
import './Avatar.css'

function Avatar(props){
    //UseStates
    const [showDropDown,setShowDropDown] = useState(false)
    const ref = useRef(null)

    useEffect(() =>{
        const handleClickOutside = (e) =>{
            if(ref.current && !ref.current.contains(e.target)){
                setShowDropDown(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return() => document.removeEventListener('mousedown', handleClickOutside)
    },[])

    return(
        <div ref = {ref} style = {{position:'relative'}}>
            <div className = 'avatar' onClick = {() => setShowDropDown(prev => !prev)}>
                R
            </div>
            <div className = {`profile-dropdown ${showDropDown ? 'open' : ''}`}>
                <button onClick = {props.onLogout}>Logout</button>
            </div>
        </div>
    )
}
export default Avatar