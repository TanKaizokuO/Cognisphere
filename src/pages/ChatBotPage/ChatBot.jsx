import React, { useState, useRef, useEffect } from 'react';
import './ChatBot.css';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // API URL - uses environment variable for deployment
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage = {
      text: input,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);
    const currentInput = input;
    setInput('');
    setLoading(true);

    try {
      const endpoint = `${API_BASE_URL}/api/chat`;
      let requestBody = { message: currentInput };

      console.log(`Sending request to ${endpoint}`, requestBody);

      const response = await fetch(`${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'text/plain',
        },
        body: JSON.stringify(requestBody),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        console.error('Response error:', response.statusText);
        throw new Error(`Server responded with status: ${response.status}`);
      }

      // Initial bot message placeholder
      const botMessage = {
        text: '',
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSearch: false
      };

      setMessages(prevMessages => [...prevMessages, botMessage]);

      // Handle streaming response
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let botResponse = '';

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        botResponse += chunk;

        // Update the last message with the new chunk
        setMessages(prevMessages => {
          const newMessages = [...prevMessages];
          const lastMessage = newMessages[newMessages.length - 1];
          lastMessage.text = botResponse;
          return newMessages;
        });
      }

    } catch (error) {
      console.error('Error details:', error);

      // Display a helpful error message based on the error
      let errorMsg = 'Sorry, there was an error processing your request.';

      if (error.message.includes('Failed to fetch') || error.message.includes('Network Error')) {
        errorMsg = 'Unable to connect to the server. Please check if your backend server is running.';
      } else if (error.message.includes('status: 404')) {
        errorMsg = 'API endpoint not found. Please check your server routes.';
      } else if (error.message.includes('status: 500')) {
        errorMsg = 'Server error occurred. Check your backend logs for details.';
      }

      const errorMessage = {
        text: errorMsg,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h2>CogniChat AI</h2>
      </div>

      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="welcome-message">
            <h3>Welcome to CogniChat!</h3>
            <p>I'm your AI wellness and learning assistant. How can I help you today?</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <MessageItem key={index} message={message} />
          ))
        )}
        {loading && messages.length > 0 && messages[messages.length - 1].text === '' && (
          <div className="message bot-message">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-container">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question..."
          rows="1"
          disabled={loading}
        />
        <button
          className="send-button"
          onClick={handleSend}
          disabled={loading || input.trim() === ''}
        >
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </div>
  );
};

// Component to render different message types
const MessageItem = ({ message }) => {
  const { text, sender, timestamp } = message;

  return (
    <div className={`message ${sender === 'user' ? 'user-message' : 'bot-message'}`}>
      <div className="message-content">
        <p style={{ whiteSpace: 'pre-wrap' }}>{text}</p>
        <div className="message-timestamp">{timestamp}</div>
      </div>
    </div>
  );
};

export default ChatBot;