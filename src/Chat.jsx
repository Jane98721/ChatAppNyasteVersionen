import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import SideBar from './Sidebar';

const Chat = () => {
  const [conversations, setConversations] = useState([]);
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

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
      content: message,
      createdBy: username,
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

  return (
    <div>
      <SideBar/>
      <div className="info">
        <div className="user-info">
          <img src="./pic/avatar.png" alt="Avatar" className="avatar" />
          <h2>Welcome, {username}</h2>
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
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.createdBy === username ? 'chat-message-right' : 'chat-message-left'}`}>
            <div className="message-content">
              <p>{msg.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;
