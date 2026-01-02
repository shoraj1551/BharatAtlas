import { useState, useRef, useEffect } from 'react'
import workspaceService from '../services/workspaceService'
import './AIChat.css'

export default function AIChat() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSend = async () => {
        if (!input.trim() || loading) return

        const userMessage = {
            role: 'user',
            content: input,
            timestamp: new Date()
        }

        setMessages(prev => [...prev, userMessage])
        setInput('')
        setLoading(true)

        try {
            const response = await fetch('/api/ai/ask', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question: input })
            })

            if (!response.ok) {
                throw new Error('AI service unavailable')
            }

            const data = await response.json()

            const aiMessage = {
                role: 'assistant',
                content: data.answer,
                actions: data.actions,
                timestamp: new Date()
            }

            setMessages(prev => [...prev, aiMessage])
        } catch (error) {
            console.error('AI error:', error)
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'Sorry, I encountered an error. Please make sure Ollama is running and try again.',
                timestamp: new Date()
            }])
        } finally {
            setLoading(false)
        }
    }

    const handleSuggestion = (suggestion) => {
        setInput(suggestion)
    }

    return (
        <>
            {/* Floating Button */}
            <button
                className="ai-chat-toggle"
                onClick={() => setIsOpen(!isOpen)}
                title="AI Assistant"
                aria-label="Toggle AI Assistant"
            >
                🤖
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="ai-chat-window">
                    <div className="ai-chat-header">
                        <h3>🤖 BharatAtlas AI</h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            aria-label="Close chat"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="ai-chat-messages">
                        {messages.length === 0 && (
                            <div className="ai-welcome">
                                <p>👋 Hi! I'm your BharatAtlas assistant.</p>
                                <p>Ask me anything about Indian states, districts, or demographics!</p>
                                <div className="ai-suggestions">
                                    <button onClick={() => handleSuggestion('What is the population of Karnataka?')}>
                                        Population of Karnataka?
                                    </button>
                                    <button onClick={() => handleSuggestion('Compare Maharashtra and Tamil Nadu')}>
                                        Compare states
                                    </button>
                                    <button onClick={() => handleSuggestion('Which state has highest literacy?')}>
                                        Highest literacy?
                                    </button>
                                </div>
                            </div>
                        )}

                        {messages.map((msg, idx) => (
                            <div key={idx} className={`ai-message ${msg.role}`}>
                                <div className="message-content">
                                    {msg.content}
                                </div>
                                {msg.actions && msg.actions.length > 0 && (
                                    <div className="message-actions">
                                        {msg.actions.map((action, i) => (
                                            <button key={i} className="action-btn">
                                                {action.icon} {action.label}
                                            </button>
                                        ))}
                                        {/* Save to Workspace Action */}
                                        <button
                                            className="action-btn save-btn"
                                            onClick={() => workspaceService.saveInsight('consultant_chat', 'AI Conversation', msg.content, null)}
                                            style={{ marginLeft: 'auto', background: '#f0f9ff', color: '#0369a1', borderColor: '#bae6fd' }}
                                        >
                                            💾 Save
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}

                        {loading && (
                            <div className="ai-message assistant">
                                <div className="message-content typing">
                                    <span></span><span></span><span></span>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    <div className="ai-chat-input">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask about Indian geography..."
                            disabled={loading}
                            aria-label="Chat input"
                        />
                        <button
                            onClick={handleSend}
                            disabled={loading || !input.trim()}
                            aria-label="Send message"
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}
