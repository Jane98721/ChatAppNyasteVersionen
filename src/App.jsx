import React from 'react'
import './App.css'
import Authform from './Authform'
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Chat from './Chat'
import './Sidebar'
import Login from './Login'


const App = () => {

  return (
      
        <Router>
    
          <Routes>
            <Route path = "/" element = {<Authform />}/>
            <Route path = "/Login" element = {<Login/>}/>
            <Route path = "/chat" element = {<Chat/>}/>
            <Route path = "*" element = {<Navigate to ="/"/>}/>
  
            </Routes>
        </Router>
      )
    }
      
export default App