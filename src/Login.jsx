import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const navigate = useNavigate()



  const handleUserName = (e) => {
    setUserName(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }


  const handleSubmit = async (e) => {
    e.preventDefault()

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
        const token = result.token
        const decodedToken = JSON.parse(atob(token.split('.')[1]));

        localStorage.setItem('authToken', token);
        localStorage.setItem('decodedToken', JSON.stringify(decodedToken));
        localStorage.setItem('avatar', decodedToken.avatar);
        localStorage.setItem('username', decodedToken.username);
        localStorage.setItem('userId', decodedToken.id);

        setSubmitted(true)
        setError("")
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

    <div className="forms">
      <h2> Login</h2>
      <form onSubmit={handleSubmit}>
        <label className='UserNamelabel'> Username </label>

        <br></br>
        <br></br>

        <input
          onChange={handleUserName}
          className="input"
          value={userName}
          type="userName"
          placeholder="Enter your username"
        />
        <br></br>
        <br /><br />

        <label className='Passwordlabel'>  Password </label>
        <br></br>
        <br></br>
        <input
          onChange={handlePassword}
          className="input"
          value={password}
          type="password"
          placeholder="Enter your password"
        />

        <br></br>
        <br></br>
        <br></br>
        <button className="btn" type="submit"> Login

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

