import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import './LandingPage.css'
import {useEffect, useState} from "react";
import api from "./utils/api.js";
import {useNavigate} from "react-router-dom";

function LandingPage(){
    const [authFormState,setAuthFormState] = useState("create-account-form")
    const [emailInputValue,setEmailInputValue] = useState('')
    const [passwordInputValue,setPasswordInputValue] = useState('')
    const [error,setError] = useState('')
    const navigate = useNavigate()

    //Guarding against already logged in users
    useEffect(() =>{
        if(localStorage.getItem('token')){
            navigate('/app')
        }
    },[])

    const handleSignUp = async () =>{
        const response = await api.post('/api/auth/signup',{email:emailInputValue,password:passwordInputValue})
        const data = await response.json()
        if(response.ok){
            localStorage.setItem('token',data.token)
            navigate('/app')
        }else{
            setError(data.error)
        }
    }

    const handleLogIn = async () =>{
        const response = await api.post('/api/auth/login',{email:emailInputValue,password:passwordInputValue})
        const data = await response.json()
        if(response.ok){
            localStorage.setItem('token',data.token)
            navigate('/app')
        }else{
            setError(data.error)
        }
    }
    return (
        <div className = 'landing-page'>
            <Header name = 'Anchor V0'/>
            <main className = 'landing-main'>
                <div className='landing-left'>
                    <h2 className = 'tagline'>You don't need a perfect system... You need an <span>Anchor!</span></h2>
                    <ul className = 'sub-tagline'>
                        <li>Track Habits</li>
                        <li>Finish what matters</li>
                        <li>See real progress</li>
                    </ul>
                </div>
                <div className = 'landing-right'>
                    <form>
                        <div className = 'tab-container'>
                            <button
                                type = 'button'
                                className = {authFormState ==='login-form'?'tab active':'tab'}
                                onClick = {() => {
                                    setAuthFormState('login-form');
                                    setError('')
                                }}
                            >
                                Sign In
                            </button>
                            <button
                                type = 'button'
                                className = {authFormState ==='create-account-form'?'tab active':'tab'}
                                onClick = {() => {
                                    setAuthFormState('create-account-form')
                                    setError('')
                                }}
                            >
                                Create Account
                            </button>
                        </div>
                        <input
                            type = 'email'
                            placeholder='Email'
                            value = {emailInputValue}
                            onChange = {event => setEmailInputValue(event.target.value)}
                        />
                        <input
                            type = 'password'
                            placeholder='Password'
                            value = {passwordInputValue}
                            onChange = {event => setPasswordInputValue(event.target.value)}
                        />
                        {error && <p className = 'auth-error'>{error}</p>}
                        {authFormState === 'login-form'?(
                            <>
                                <button
                                    type = 'button'
                                    onClick = {handleLogIn}
                                    className = 'auth-form-btn'>Sign In</button>
                            </>
                        ):
                        (
                            <>
                                <button
                                    type = 'button'
                                    onClick = {handleSignUp}
                                    className = 'auth-form-btn'>Sign Up</button>
                            </>
                        )}

                    </form>
                </div>
            </main>
            <Footer/>
        </div>
    )
}
export default LandingPage