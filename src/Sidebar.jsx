import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, AppBar, Toolbar, Typography } from '@mui/material'


const SideBar = () => {
    const navigate = useNavigate()

const handleLogout = () => {
    localStorage.removeItem ('authToken')
    localStorage.removeItem ('username')
    navigate ('/Signup')
}

    return (
        <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My App
        </Typography>
        <Button color="inherit" onClick={handleLogout}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
}

export default SideBar