import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import SideBar from './Sidebar';

const Chat = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]); 
  const [decodedToken] = useState(JSON.parse(localStorage.getItem('decodedToken')) || '');
 

  const [fakeChat] = useState([{
    "text": "Tja tja, hur mår du?",
    "avatar": "https://i.pravatar.cc/100?img=14",
    "username": "Johnny",
    "conversationId": null
  },
  {
    "text": "Hallå!! Svara då!!",
    "avatar": "https://i.pravatar.cc/100?img=14",
    "username": "Johnny",
    "conversationId": null
  },
  {
    "text": "Sover du eller?! 😴",
    "avatar": "https://i.pravatar.cc/100?img=14",
    "username": "Johnny",
    "conversationId": null
  }
]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('https://chatify-api.up.railway.app/messages', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            'Accept': 'application/json',
          },
        });

        if (response.ok) {
          const result = await response.json();
          setMessages(result);
        } else {
          console.error('Error fetching messages:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchMessages()

    const intervalId = setInterval (fetchMessages, 1000)

    return () => clearInterval (intervalId)
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!message.trim()) {
      return;
    }

    try {
      const avatar = 'https://i.pravatar.cc/150?img=3'; 
      
      
      console.log('Skickar meddelande till API:', {
      text: message,
      username: decodedToken.username,
      avatar: avatar,
    });

      const response = await fetch('https://chatify-api.up.railway.app/messages', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: message,
          username: decodedToken.username,
          avatar: avatar,
      }),
    })
      if (response.ok) {
        const result = await response.json();
        console.log('Svar från API:', result);
        setMessages((prevMessages) => [...prevMessages, result]);
       
      } else {
        console.error('Error posting message:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }

    setMessage(''); 
   
  };

  const deleteMessage = async (messageId) => {
    const token =localStorage.getItem('authToken')
    if (!token) {
      console.error('No token found')
      return
    }

    try {

      console.log('Försöker radera meddelande med id:', messageId);

      const response = await fetch (`https://chatify-api.up.railway.app/messages/${messageId}`, {
      
        method: 'DELETE',
        headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  

  if (response.ok) {

    console.log('Meddelande raderat från API:', messageId);

    setMessages((messages) => messages.filter((msg) => msg.id !== messageId))
  } else {
    console.error("Error", response.statusText)
  } 
} catch (error) {
  console.error ('error', error)
}
}


  return (
    <div>
      <SideBar />
      <div className="Container">
      <div className="info">
        <img src= {localStorage.getItem('avatar') || "./pic/avatar.png"}  alt="Avatar" className="avatar" />
          <h2>Welcome, {decodedToken.user}</h2> 
        </div>
        <div className="user-info">
        <br />
      </div>

              
      <div className="chat-container">

      {fakeChat.map((msg, index) => (
          <div key={index} className="chat-message chat-message-left">
            <img src={msg.avatar} alt="avatar" className="avatar" />
            <div className="message-fake">
              <p>{msg.username}: </p>
               <p>{msg.text}</p>
            </div>
          </div>
        ))}

        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.username === decodedToken.username ? 'chat-message-right' : 'chat-message-left'}`}>
           <img src= {msg.avatar || 'https://i.pravatar.cc/150?img=50'} alt="avatar" className="avatar-chat" />
           <p className="user-name"> {msg.user=== decodedToken.user? decodedToken.user : decodedToken.user}</p>
              <div className ="message-content">
               <p>{msg.text} </p>
              {msg.username === decodedToken.username && (
                  <Button className="delete-btn" onClick={() => deleteMessage(msg.id)}>Delete</Button>
              )}
        </div>
        </div>
        ))}
          
          <form onSubmit={handleSubmit}>
          <TextField
            className="myText"
            label="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <br />
          <Button type="submit">Send message</Button>
        </form> 
        
      </div>
    </div>
    </div>
  );
};

export default Chat;
