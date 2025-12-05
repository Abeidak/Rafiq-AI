import React, { useState, useRef, useEffect } from 'react';

const ChatInterface = () => {
    const [messages, setMessages] = useState([
        { sender: 'bot', text: "Bonjour! Je suis Rafiq-AI. Posez-moi une question sur l'événement." }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMsg.text })
            });

            const data = await response.json();
            const botMsg = {
                sender: 'bot',
                text: data.answer,
                chunks: data.used_chunks
            };
            setMessages(prev => [...prev, botMsg]);
        } catch (error) {
            setMessages(prev => [...prev, { sender: 'bot', text: "Désolé, une erreur est survenue." }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <div className="chat-panel glass-panel">
            <div className="chat-header">
                <h2>Rafiq-AI Chat</h2>
                <span className="live-indicator">● Online</span>
            </div>

            <div className="messages-area">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`message-row ${msg.sender}`}>
                        <div className={`message-bubble ${msg.sender}`}>
                            {msg.text}
                            {msg.chunks && msg.chunks.length > 0 && (
                                <div className="evidence-tag">
                                    Based on {msg.chunks.length} sources
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="message-row bot">
                        <div className="message-bubble bot typing">...</div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="input-area">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask a question..."
                />
                <button className="btn-send" onClick={handleSend}>➤</button>
            </div>
        </div>
    );
};

export default ChatInterface;
