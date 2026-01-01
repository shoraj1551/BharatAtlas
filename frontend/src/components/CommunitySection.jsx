/**
 * CommunitySection - Citizen Knowledge Layer
 * 
 * Displays community contributions (images, blogs, issues) and allows submission.
 * "Citizen Layer" Design Standard.
 */

import React, { useState, useEffect } from 'react'
import './CommunitySection.css'

export default function CommunitySection({ place }) {
    const [view, setView] = useState('feed') // 'feed' | 'contribute'
    const [contributions, setContributions] = useState([])
    const [formData, setFormData] = useState({
        email: '',
        type: 'issue',
        title: '',
        body: ''
    })
    const [loading, setLoading] = useState(false)
    const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error'

    // Load feed on mount
    useEffect(() => {
        if (place && place.place_id) {
            fetchContributions()
        }
    }, [place])

    const fetchContributions = async () => {
        try {
            const res = await fetch(`http://localhost:3001/api/community/${place.place_id}`)
            const data = await res.json()
            if (data.success) {
                setContributions(data.data)
            }
        } catch (err) {
            console.error("Failed to load community feed", err)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const payload = {
                place_id: place.place_id,
                email: formData.email,
                type: formData.type,
                data: {
                    title: formData.title,
                    body: formData.body
                }
            }

            const res = await fetch('http://localhost:3001/api/community/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })

            const data = await res.json()
            if (data.success) {
                setSubmitStatus('success')
                setTimeout(() => {
                    setView('feed')
                    setSubmitStatus(null)
                    setFormData({ email: '', type: 'issue', title: '', body: '' })
                }, 2000)
            } else {
                setSubmitStatus('error')
            }
        } catch (err) {
            console.error(err)
            setSubmitStatus('error')
        } finally {
            setLoading(false)
        }
    }

    const formatDate = (date) => new Date(date).toLocaleDateString(undefined, {
        month: 'short', day: 'numeric', year: 'numeric'
    })

    if (!place) return null

    return (
        <div className="community-section">
            <header className="comm-header">
                <div>
                    <h2 className="section-title">🤝 Community Square</h2>
                    <p className="comm-subtitle">Local Knowledge & Citizen Reports</p>
                </div>
                <button
                    className={`comm-btn ${view === 'contribute' ? 'active' : ''}`}
                    onClick={() => setView(view === 'feed' ? 'contribute' : 'feed')}
                >
                    {view === 'feed' ? '➕ Contribute' : 'Back to Feed'}
                </button>
            </header>

            {/* VIEW A: CONTRIBUTION FEED */}
            {view === 'feed' && (
                <div className="comm-feed">
                    {contributions.length === 0 ? (
                        <div className="empty-feed">
                            <span className="feed-icon">🌱</span>
                            <p>No verified community reports yet.</p>
                            <button onClick={() => setView('contribute')}>Be the first to contribute</button>
                        </div>
                    ) : (
                        <div className="feed-grid">
                            {contributions.map((item) => (
                                <div key={item._id} className={`feed-card ${item.type}`}>
                                    <div className="card-badge">{item.type}</div>
                                    <h3 className="card-title">{item.data.title || 'Untitled'}</h3>
                                    <p className="card-body">{item.data.body}</p>

                                    <div className="card-footer">
                                        <div className="contributor-info">
                                            <span className="user-icon">👤</span>
                                            <div>
                                                <span className="username">{item.contributor_id?.username || 'Guest'}</span>
                                                <span className="level">{item.contributor_id?.level || 'Novice'}</span>
                                            </div>
                                        </div>
                                        <span className="date">{formatDate(item.created_at)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* VIEW B: CONTRIBUTION FORM */}
            {view === 'contribute' && (
                <div className="contribute-panel">
                    {submitStatus === 'success' ? (
                        <div className="success-message">
                            <span>✅</span>
                            <h3>Submitted for Review!</h3>
                            <p>Your contribution is now in the moderation queue. Thank you for helping build BharatAtlas.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="comm-form">
                            <h3>Share Local Knowledge</h3>

                            <div className="form-group">
                                <label>Contribution Type</label>
                                <div className="type-selector">
                                    {['issue', 'blog', 'image'].map(t => (
                                        <button
                                            key={t}
                                            type="button"
                                            className={formData.type === t ? 'selected' : ''}
                                            onClick={() => setFormData({ ...formData, type: t })}
                                        >
                                            {t.toUpperCase()}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Title</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Broken Bridge on NH-44"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label>Details</label>
                                <textarea
                                    required
                                    placeholder="Describe the issue or insight in detail..."
                                    rows="5"
                                    value={formData.body}
                                    onChange={e => setFormData({ ...formData, body: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label>Your Email (for verification)</label>
                                <input
                                    type="email"
                                    required
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                                <small>We verify contributors to maintain data quality. Your email is never shared.</small>
                            </div>

                            <button type="submit" className="submit-btn" disabled={loading}>
                                {loading ? 'Submitting...' : 'Submit for Moderation'}
                            </button>

                            {submitStatus === 'error' && (
                                <p className="error-msg">Submission failed. Please try again.</p>
                            )}
                        </form>
                    )}
                </div>
            )}
        </div>
    )
}
