/*const deleteMessage = async (messageId) => {
    const token =localStorage.getItem('authToken')
    if (!token) {
      console.error('No token found')
      return
    }

    try {
      const response = await fetch (`https://chatify-api.up.railway.app/messages/${messageId}`, {
      
        method: 'DELETE',
        headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  

  if (response.ok) {
    setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== messageId))
  } else {
    console.error("Error", response.statusText)
  } 
} catch (error) {
  console.error ('error', error)
}
}

return (

     <div className= "chat-container">
      {messages.map((msg) => (
        <div key = {msg.id} className = {`chat-message ${isUserMessage (msg) ? 'chat-message-right' : 'chat-message-left'}`}>
      <div className = "message-content">
        <p>{msg.content} </p>
        <span> {msg.createdBy}</span>
      </div>
      <Button className = "myBtn"> Delete </Button>
     </div>
      ))}
      </div>
      </div>
)
)
    }*/




/*

const fetchMessages = async () => {
    const token = localStorage.getItem('authToken')
    if(!token) {
        console.error('No token found')
        navigate ('/login')
        return
    }

try {
    const response = await fetch ('https://chatify-api.up.railway.app/messages'), {
        method:'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
        }
    })

    if (response.ok) {
        const result = await response.json()
        setMessages(result)
    } else {
        console.error ('Error', response.statusText)
    }
    } catch (error) {
        console.error ('error', error)
    }
}
*/