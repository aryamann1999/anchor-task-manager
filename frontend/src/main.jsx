import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import App from './App.jsx'
import LandingPage from "./LandingPage.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";



createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LandingPage/>}/>
                <Route
                    path='/app'
                    element={
                        <ProtectedRoute>
                            <App/>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    </StrictMode>
)

