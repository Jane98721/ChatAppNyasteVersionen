import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Button} from '@mui/material'


const SideBar = () => {
    const navigate = useNavigate()

const handleLogout = () => {
    localStorage.removeItem ('authToken')
    localStorage.removeItem ('username')
    navigate ('/login')
}

    return (
       
            <nav className="navbar">
                <Button onClick={handleLogout}>Logout</Button>
            </nav>
        );
    
    
}

export default SideBar