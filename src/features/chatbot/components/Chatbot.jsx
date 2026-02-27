import React, { useState, useEffect, useRef } from 'react';
import '../assets/Chatbot.css';
import { FaPaperPlane, FaRobot, FaTimes } from 'react-icons/fa';
import { getApiUrl } from '../../../config/api';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { type: 'ai', text: "Hello! I'm XploitSim Assistant. How can I help you explore web security today?" }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId] = useState(() => Math.random().toString(36).substring(7));
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMsg = input;
        setInput('');
        setMessages(prev => [...prev, { type: 'user', text: userMsg }]);
        setIsLoading(true);

        try {
            const response = await fetch(getApiUrl(5700, '/api/chat'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMsg, sessionId })
            });

            if (!response.ok) throw new Error('Chat failed');

            const data = await response.json();
            setMessages(prev => [...prev, { type: 'ai', text: data.reply }]);
        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, { type: 'ai', text: "I'm sorry, I'm having trouble connecting right now. Please try again later." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="chatbot-wrapper">
            <button
                className={`chatbot-toggle ${isOpen ? 'active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <FaTimes /> : <FaRobot />}
                {!isOpen && <div className="chat-badge"></div>}
            </button>

            {isOpen && (
                <div className="chatbot-window">
                    <div className="chat-header">
                        <div className="header-info">
                            <h3>XploitSim AI</h3>
                            <div className="status">Highly Active</div>
                        </div>
                    </div>

                    <div className="chat-messages">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`message ${msg.type}`}>
                                {msg.text}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="typing-indicator">
                                <span className="dot"></span>
                                <span className="dot"></span>
                                <span className="dot"></span>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <form className="chat-input" onSubmit={handleSend}>
                        <div className="input-container">
                            <input
                                type="text"
                                placeholder="Ask about OWASP vulnerabilities..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>
                        <button type="submit" disabled={isLoading || !input.trim()}>
                            <FaPaperPlane />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
