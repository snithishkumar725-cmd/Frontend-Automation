import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const predefinedResponses = {
  'salary': 'You can view and download your salary slip from the Dashboard in the "Payment Slip" section.',
  'attendance': 'Your attendance is marked by the Admin. You can view your summary in the Dashboard.',
  'hello': 'Hello! How can I help you today?',
  'hi': 'Hi there! How can I assist you?',
  'help': 'I can answer questions about your salary, attendance, and portal usage. Try asking "How to download salary slip?"',
  'admin': 'If you are an admin, you can manage employees and their salaries in the Admin Portal.'
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your virtual assistant. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setInput('');

    // Simple rule-based response
    setTimeout(() => {
      let botResponse = "I'm sorry, I didn't understand that. Could you please rephrase or ask for 'help'?";
      
      const lowerInput = userMessage.toLowerCase();
      for (const [key, response] of Object.entries(predefinedResponses)) {
        if (lowerInput.includes(key)) {
          botResponse = response;
          break;
        }
      }

      setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
    }, 500);
  };

  if (!user) return null; // Only show when logged in

  return (
    <div className="chatbot-widget">
      <div className={`chatbot-window glass ${isOpen ? '' : 'hidden'}`}>
        <div className="chatbot-header">
          <span>Portal Assistant</span>
          <X 
            size={20} 
            style={{ cursor: 'pointer' }} 
            onClick={() => setIsOpen(false)} 
          />
        </div>
        
        <div className="chatbot-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`chat-message ${msg.isBot ? 'bot' : 'user'}`}>
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <form className="chatbot-input" onSubmit={handleSend}>
          <input 
            type="text" 
            placeholder="Type your message..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">
            <Send size={20} />
          </button>
        </form>
      </div>

      <div 
        className="chatbot-toggle" 
        onClick={() => setIsOpen(!isOpen)}
        style={{ display: isOpen ? 'none' : 'flex' }}
      >
        <MessageSquare size={28} />
      </div>
    </div>
  );
};

export default Chatbot;
