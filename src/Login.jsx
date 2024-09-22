import React, { useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
const [userName, setUserName] = useState ("")
const [password, setPassword] = useState ("")
const [error, setError] = useState (false)
const navigate = useNavigate()
const [submitted, setSubmitted] = useState (false)


const handleUserName =(e) => {
    setUserName(e.target.value)
}

const handlePassword = (e) => {
    setPassword(e.target.value)
}


const handleSubmit = async (e) => {
    e.preventDefault ()

        const data = {
            username: userName,
            password: password
        }


    try {
        const response = await fetch(`${'https://chatify-api.up.railway.app/auth/token'
            
        }`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
          })
  
          if (response.ok) {
            const result = await response.json()
            const {token,username} = result
  
           localStorage.setItem ('authToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUxMCwidXNlciI6InN0b3JhQGhvdG1haWwuY29tIiwiZW1haWwiOiJzdG9yYUBob3RtYWlsLmNvbSIsImF2YXRhciI6Ii4vcGljL2F2YXRhci5wbmciLCJpbnZpdGUiOm51bGwsImlhdCI6MTcyNzAxMTY1MywiZXhwIjoxNzI3MDE1MjUzfQ.2D_MqtZto1nodmUsaIBLMUC0o7sAPRphyGhJbIv4WQI')
           localStorage.setItem ('username', username)

           setSubmitted (true)
           setError ("")  
           navigate('/Chat')

        } else {
          const errorData = await response.json();
          setError(errorData.message || 'Invalid credentials') 
          } 
  
        } catch (error) {
          console.error('Error:', error);
          setError('Login failed')
        }
      } 
      

return (

    <div className = "forms">
    <form onSubmit = {handleSubmit}>
<label className='UserNamelabel'> Username </label>

<br></br>
<br></br>

        <input
        onChange = {handleUserName}
        className = "input"
        value = {userName}
        type = "userName"
        placeholder = "Enter your username"
        />
<br></br>
<br/><br/>

<label className='Passwordlabel'>  Password </label>
<br></br>
<br></br>
        <input
        onChange = {handlePassword}
        className = "input"
        value = {password}
        type = "password"
        placeholder ="Enter your password"
        />

<br></br>
<br></br>
<br></br>
<button  className = "btn" type= "submit"> Login

</button>

<br></br>
</form>
    {error && (

    <h1 className="RegMsg"> {error} </h1>
)}


</div>
)
}

export default Login

