import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import SideBar from './Sidebar';

const Chat = () => {
  const [conversations, setConversations] = useState([]);
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  // här tar vi ut decodedToken, som i sin tur är extraherad i Login förfarandet
  const [decodedToken] = useState(JSON.parse(localStorage.getItem('decodedToken')) || '');

  useEffect(() => {
    const fetchConversations = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('No token found');
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('https://chatify-api.up.railway.app/conversations', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });

        if (response.ok) {
          const result = await response.json();
          setConversations(result);
        } else {
          console.error('Error fetching conversations:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const fetchMessages = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('No token found');
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('https://chatify-api.up.railway.app/messages', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
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

    fetchConversations();
    fetchMessages();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      return;
    }

    const newMessage = {
      text: message,
      createdBy: decodedToken.user
    };

    try {
      const response = await fetch('https://chatify-api.up.railway.app/messages', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMessage),
      });

      if (response.ok) {
        const result = await response.json();
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
    <div>
      <SideBar />
      <div className="info">
        <div className="user-info">
          <img src="./pic/avatar.png" alt="Avatar" className="avatar" />
          {/* Welcome, {username} kommer inte funka, username är alltid undefined */}
          <h2>Welcome, {decodedToken.user}</h2>
        </div>
        <br />
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
      <div className="chat-container">
        {/* username är undefined, du måste titta i decodedToken för user (så du får användarnamnet) */}
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.createdBy === decodedToken.user ? 'chat-message-right' : 'chat-message-left'}`}>
            <div className="message-content">
              <p>{msg.text}</p> {/* msg.content är ej korrekt property, msg.text är det */}
              <Button className="myBtn" onClick={() => deleteMessage(msg.id)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;
