import React, { useState, useEffect, useRef } from 'react';
import './HeroSection.css';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const HeroSection: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isElevenLabsLoaded, setIsElevenLabsLoaded] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const elevenLabsWidgetRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  // Load ElevenLabs widget script
  useEffect(() => {
    if (isChatOpen && !isElevenLabsLoaded) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
      script.async = true;
      script.type = 'text/javascript';
      script.onload = () => setIsElevenLabsLoaded(true);
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [isChatOpen, isElevenLabsLoaded]);

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // NOTE: Replace with your actual API endpoint
      // This is where you would integrate with OpenAI API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMessage,
          // API key should be handled server-side, not exposed in frontend
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');
      
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
      
      // If ElevenLabs widget is loaded, trigger TTS
      // NOTE: This would be handled by the ElevenLabs widget integration
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'I apologize, but I encountered an error. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    if (!isChatOpen) {
      setIsDropdownOpen(false);
    }
  };

  return (
    <section className="hero-section">
      {/* Info Dropdown */}
      <div className="info-dropdown-container" ref={dropdownRef}>
        <button
          className="info-button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          aria-label="Contact information"
          aria-expanded={isDropdownOpen}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 16V12M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className={`dropdown-panel ${isDropdownOpen ? 'open' : ''}`}>
          <div className="dropdown-content">
            <a href="mailto:contact@appvantix.com" className="contact-item">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 5.5L10 10L17.5 5.5M2.5 5.5V14.5H17.5V5.5M2.5 5.5H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              contact@appvantix.com
            </a>
            <a href="tel:+16155578189" className="contact-item">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 3.5C2 2.67 2.67 2 3.5 2H6.3C6.83 2 7.29 2.35 7.43 2.86L8.24 5.68C8.35 6.08 8.22 6.51 7.9 6.78L6.1 8.28C7.24 10.51 9.49 12.76 11.72 13.9L13.22 12.1C13.49 11.78 13.92 11.65 14.32 11.76L17.14 12.57C17.65 12.71 18 13.17 18 13.7V16.5C18 17.33 17.33 18 16.5 18C8.49 18 2 11.51 2 3.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              +1 (615) 557-8189
            </a>
            <div className="social-links">
              <a href="https://www.linkedin.com/in/camdenburkedev" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.98 3.5C4.98 4.33 4.31 5 3.48 5C2.65 5 1.98 4.33 1.98 3.5C1.98 2.67 2.65 2 3.48 2C4.31 2 4.98 2.67 4.98 3.5ZM5 6.5H2V18H5V6.5ZM10.98 6.5H7.99V18H10.99V11.93C10.99 9.17 14.48 8.92 14.48 11.93V18H17.5V10.83C17.5 6.23 12.21 6.41 10.98 8.62V6.5H10.98Z"/>
                </svg>
              </a>
              <a href="https://github.com/camdenburke" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 0C4.477 0 0 4.477 0 10C0 14.42 2.865 18.17 6.839 19.489C7.339 19.579 7.521 19.27 7.521 19.007C7.521 18.771 7.513 18.14 7.508 17.306C4.726 17.908 4.139 15.964 4.139 15.964C3.685 14.81 3.029 14.502 3.029 14.502C2.121 13.88 3.098 13.893 3.098 13.893C4.101 13.963 4.629 14.922 4.629 14.922C5.521 16.454 6.97 16.011 7.539 15.756C7.631 15.111 7.889 14.67 8.175 14.421C5.955 14.17 3.62 13.315 3.62 9.478C3.62 8.386 4.009 7.494 4.649 6.794C4.546 6.541 4.203 5.524 4.747 4.148C4.747 4.148 5.587 3.88 7.497 5.172C8.31 4.95 9.18 4.839 10.05 4.834C10.92 4.839 11.79 4.95 12.603 5.172C14.513 3.88 15.353 4.148 15.353 4.148C15.897 5.524 15.554 6.541 15.451 6.794C16.091 7.494 16.48 8.386 16.48 9.478C16.48 13.326 14.14 14.167 11.91 14.412C12.27 14.72 12.594 15.33 12.594 16.264C12.594 17.6 12.582 18.676 12.582 19.007C12.582 19.273 12.762 19.584 13.271 19.488C17.241 18.166 20.1 14.418 20.1 10C20.1 4.477 15.623 0 10 0Z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Card */}
      <div className="hero-card">
        <h1 className="hero-name">Camden Burke</h1>
        <h2 className="hero-title">Founder & AI Integration Consultant</h2>
        <p className="hero-company">AppVantix LLC</p>

        {/* Agent Orb */}
        <button
          className="agent-orb"
          onClick={toggleChat}
          aria-label="Open AI assistant chat"
          aria-expanded={isChatOpen}
        >
          <div className="orb-pulse"></div>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 2C8.268 2 2 8.268 2 16C2 23.732 8.268 30 16 30C23.732 30 30 23.732 30 16C30 8.268 23.732 2 16 2ZM16 7C16.828 7 17.5 7.672 17.5 8.5C17.5 9.328 16.828 10 16 10C15.172 10 14.5 9.328 14.5 8.5C14.5 7.672 15.172 7 16 7ZM16 25C11.582 25 8 21.418 8 17H10C10 20.314 12.686 23 16 23C19.314 23 22 20.314 22 17H24C24 21.418 20.418 25 16 25Z" fill="currentColor"/>
          </svg>
        </button>
      </div>

      {/* Chat UI Overlay */}
      {isChatOpen && (
        <div className="chat-overlay" ref={chatRef}>
          <div className="chat-container">
            <div className="chat-header">
              <h3>AI Assistant</h3>
              <button
                className="chat-close"
                onClick={() => setIsChatOpen(false)}
                aria-label="Close chat"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* ElevenLabs Widget Container */}
            <div className="elevenlabs-widget-container" ref={elevenLabsWidgetRef}>
              {isElevenLabsLoaded && (
                <elevenlabs-convai agent-id="agent_01k0g4z5r8fcn9v7gxwqg1nn3n"></elevenlabs-convai>
              )}
            </div>

            {/* Fallback Chat Interface */}
            <div className="chat-fallback">
              <div className="chat-messages">
                {messages.map((message, index) => (
                  <div key={index} className={`message message-${message.role}`}>
                    <span className="message-content">{message.content}</span>
                  </div>
                ))}
                {isLoading && (
                  <div className="message message-assistant">
                    <span className="message-loading">Thinking...</span>
                  </div>
                )}
              </div>

              <form onSubmit={handleChatSubmit} className="chat-input-form">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="chat-input"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className="chat-submit"
                  disabled={isLoading || !inputValue.trim()}
                  aria-label="Send message"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
