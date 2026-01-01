/**
 * AIConsultant - Decision Support Interface
 * 
 * A specialized chat interface for entrepreneurial queries.
 * Renders structured AI responses with citations and confidence scores.
 */

import React, { useState } from 'react'
import './AIConsultant.css'

export default function AIConsultant({ place }) {
    const [isOpen, setIsOpen] = useState(false)
    const [question, setQuestion] = useState('')
    const [history, setHistory] = useState([]) // Array of { type: 'user'|'ai', content }
    const [loading, setLoading] = useState(false)

    const handleAsk = async (e) => {
        e.preventDefault()
        if (!question.trim()) return

        const userMsg = { type: 'user', content: question }
        setHistory(prev => [...prev, userMsg])
        setLoading(true)
        setQuestion('')

        try {
            const res = await fetch('http://localhost:3001/api/ai/consult', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    placeId: place.place_id,
                    question: userMsg.content
                })
            })

            const data = await res.json()

            if (data.success) {
                setHistory(prev => [...prev, { type: 'ai', content: data.data }])
            } else {
                setHistory(prev => [...prev, { type: 'error', content: "Consultant unavailable." }])
            }

        } catch (err) {
            setHistory(prev => [...prev, { type: 'error', content: "Network Error" }])
        } finally {
            setLoading(false)
        }
    }

    // Parser to turn [Governance] into <span class="badge">Governance</span>
    const renderAnswer = (text) => {
        if (!text) return null
        const parts = text.split(/(\[.*?\])/g)
        return parts.map((part, i) => {
            if (part.startsWith('[') && part.endsWith(']')) {
                const layer = part.slice(1, -1)
                return <span key={i} className="citation-badge">{layer}</span>
            }
            return part
        })
    }

    if (!isOpen) {
        return (
            <button className="ai-fab" onClick={() => setIsOpen(true)}>
                ✨ Ask Consultant
            </button>
        )
    }

    return (
        <div className="ai-consultant-panel">
            <header className="ai-header">
                <h3>🤖 Decision Support Agent</h3>
                <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>
            </header>

            <div className="chat-window">
                {history.length === 0 && (
                    <div className="ai-welcome">
                        <p>I am your local business consultant.</p>
                        <p>I analyze <strong>Governance</strong>, <strong>Culture</strong>, and <strong>Opportunity Signals</strong> to answer your questions.</p>
                        <div className="suggestions">
                            <button onClick={() => setQuestion("Is this a good place for a tech startup?")}>Is this a good place for a tech startup?</button>
                            <button onClick={() => setQuestion("What are the risks for retail here?")}>What are the risks for retail?</button>
                        </div>
                    </div>
                )}

                {history.map((msg, idx) => (
                    <div key={idx} className={`chat-msg ${msg.type}`}>
                        {msg.type === 'user' ? (
                            <p>{msg.content}</p>
                        ) : msg.type === 'error' ? (
                            <p className="error-text">{msg.content}</p>
                        ) : (
                            <div className="ai-response">
                                <p className="ai-text">{renderAnswer(msg.content.answer)}</p>

                                <div className="ai-meta">
                                    <div className="confidence">
                                        <span>Confidence: {msg.content.confidence_score}%</span>
                                        <div className="meter">
                                            <div style={{ width: `${msg.content.confidence_score}%` }}></div>
                                        </div>
                                    </div>
                                    {msg.content.missing_data?.length > 0 && (
                                        <div className="missing">
                                            Missing: {msg.content.missing_data.join(', ')}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {loading && <div className="chat-msg ai loading">Thinking...</div>}
            </div>

            <form onSubmit={handleAsk} className="ai-input-area">
                <input
                    type="text"
                    placeholder="Ask a strategic question..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    disabled={loading}
                    autoFocus
                />
                <button type="submit" disabled={loading || !question}>➤</button>
            </form>
        </div>
    )
}
