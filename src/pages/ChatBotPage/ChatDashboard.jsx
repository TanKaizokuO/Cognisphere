import React from 'react';
import Streamlit from '../../components/streamlit/Streamlit';
import './styles/ChatDashboard.css';

const ChatDashboard = () => {
  return (
    <div className="chatbot-page">
      <Streamlit
        page="Wellness_Chatbot"
        title="Wellness Chatbot"
      />
    </div>
  );
};

export default ChatDashboard;
