import React, {useState} from "react";
import Signup from "./Signup";
import Login from "./Login";
import './App.css'

const Authform= () => {

const [showSignup, setShowSignup] = useState (true)

return (

    <div className="AuthFormContainer">
        <div className="toggleBtn">
            <button 
            onClick={() => setShowSignup(true)} 
            className={showSignup ? 'active' : ' ' }
                >
            Sign up
            </button>
            <button onClick={() => setShowSignup(false)} className = {!showSignup ? 'active' : ' '}>
           Login
            </button>
        </div>
  {showSignup ? <Signup /> : <Login />}
  </div>
)
}



export default Authform