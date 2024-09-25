import React, { useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

const Signup = () => {
const [username, setUserName] = useState ("")
const [email, setEmail] = useState ("")
const [password, setPassword] = useState ("")
const [CSRFToken, setCSRF] = useState ("")
const [submitted, setSubmitted] = useState (false)
const [error, setError] = useState (false)
const [msg, setMsg] = useState("")

const navigate = useNavigate ()


useEffect(() => {
    const fetchData = async () => {
        await getCSRFToken();
    };
    fetchData();
},[])

const handleUserName = (e) => {
    setUserName(e.target.value)
}


const handleEmail = (e) => {
    setEmail(e.target.value)
}

const handlePassword = (e) => {
    setPassword(e.target.value)
}

const getCSRFToken = async () => {
    try {
        const response = await fetch(`${'https://chatify-api.up.railway.app/csrf'
        }`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          }
        });
  
        if (!response.ok) { 
          throw new Error ('Error')
         
        }
  
        const result = await response.json();
        setCSRF(result.csrfToken)
      } catch (error) {
        console.error('Error:', error);
      }
}

const register = async (data) => {
    try {
        const response = await fetch(`${ 'https://chatify-api.up.railway.app/auth/register'}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': CSRFToken,
         }, 
         body: JSON.stringify(data),
        });
  
        if (response.ok) {
          setSubmitted(true)
          setError("")
          setMsg('Registration succeeded')
          setTimeout(() => {
            navigate('/login');
        }, 3000);

        } else {
  
        const errorData = await response.json();
        setError(errorData.message || 'Username or email already exists') 
        } 

      } catch (error) {
        console.error('Error:', error);
        setError('Registration failed')
      }
}

const handleSubmit = (e) => {
    e.preventDefault ()

        const data = {
            username: username,
            email: email,
            password: password,
            avatar: "./pic/avatar.png"
            
        }
        register(data)
    }
  
return (

    <div className = "Formstyle">
      <h1>Welcome</h1>
    <form onSubmit = {handleSubmit}>
        <label className='UserNamelabel'> Username </label>
        <br></br>
        <br></br>
        <input
        onChange = {handleUserName}
        className = "input"
        value = {username}
        type = "text"
        placeholder = "Enter your Username"
        />

<br></br>
<br></br>

<label className='Emaillabel'> Email </label>
<br></br>
<br></br>
        <input
        onChange = {handleEmail}
        className = "input"
        value = {email}
        type = "email"
        placeholder = "Enter your email"
        />
<br></br>
<br></br>

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
<button  className = "btn" type= "submit"> Register
</button>

<br></br>
{msg && <p>{msg}</p>}
{submitted && !error && (
        <h1 className="RegMsg"></h1>
    )}
    {error && ( 
        <h1 className="RegMsg"> {error}</h1>
    )}
</form>



</div>
)
}



export default Signup



