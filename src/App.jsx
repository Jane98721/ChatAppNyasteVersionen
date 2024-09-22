import React from 'react'
import './App.css'
import AuthForm from './AuthForm'
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Chat from './Chat'
import './Sidebar'
import Login from './Login'


const App = () => {

  return (
      
        <Router>
    
          <Routes>
            <Route path = "/" element = {<AuthForm />}/>
            <Route path = "/chat" element = {<Chat/>}/>
        
            <Route path = "*" element = {<Navigate to ="/"/>}/>
            
            </Routes>
        </Router>
      )
    }
      
export default App
