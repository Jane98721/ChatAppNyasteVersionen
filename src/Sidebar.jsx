import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, AppBar, Toolbar, Typography } from '@mui/material'


const SideBar = () => {
    const navigate = useNavigate()

    const [isOpen, setIsOpen] = useState(false);


const handleLogout = () => {
    localStorage.removeItem ('authToken')
    localStorage.removeItem ('username')
    navigate ('/Signup')
  
}

const toggleSideNav = () => {
  setIsOpen(!isOpen); 
};


    return (
      <div>
        <AppBar position="static">
      <Toolbar className="Bar">
        <Typography variant="h6"  component="div" sx={{ flexGrow: 1 }}>
          Welcome to my Chat app
        </Typography>

        <button className="toggle-btn" onClick={toggleSideNav}>
                {isOpen ? 'Close' : 'Account'}
            </button>
        
        
      </Toolbar>
    </AppBar>

    <div className = {`sidebar ${isOpen ? 'open' : 'closed'}`}>
    <h2> Account </h2>
    <ul>
      <Button color="inherit" onClick={handleLogout}>Logout</Button>
    </ul>
</div>
  
</div>  
  
) 
  }
export default SideBar
