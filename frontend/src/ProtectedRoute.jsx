import {Navigate} from "react-router-dom";

function ProtectedRoute(props){
    const token = localStorage.getItem('token')
    if(token){
        return props.children
    }else{
        return<Navigate to ='/'/>
    }
}

export default ProtectedRoute