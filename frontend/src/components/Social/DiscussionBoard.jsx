import { useState, useEffect } from 'react'
import { getDiscussions, createDiscussion, replyToDiscussion } from '../../services/socialService'
import useAuthStore from '../../store/authStore'
import './Social.css'

export default function DiscussionBoard({ placeId }) {
    const { isAuthenticated, user } = useAuthStore()
    const [discussions, setDiscussions] = useState([])
    const [activeThread, setActiveThread] = useState(null)
    const [showNewModal, setShowNewModal] = useState(false)
    const [loading, setLoading] = useState(true)

    // New discussion form
    const [topic, setTopic] = useState('')
    const [content, setContent] = useState('')

    // Reply form
    const [replyContent, setReplyContent] = useState('')

    useEffect(() => {
        fetchDiscussions()
    }, [placeId])

    const fetchDiscussions = async () => {
        setLoading(true)
        try {
            const res = await getDiscussions(placeId)
            setDiscussions(res.data.discussions)
        } catch (error) {
            console.error('Error fetching discussions:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleCreateDiscussion = async (e) => {
        e.preventDefault()
        try {
            await createDiscussion({ place_id: placeId, topic, content })
            setShowNewModal(false)
            setTopic('')
            setContent('')
            fetchDiscussions()
        } catch (error) {
            alert('Failed to create discussion')
        }
    }

    const handleReply = async (e) => {
        e.preventDefault()
        if (!replyContent.trim()) return

        try {
            const res = await replyToDiscussion(activeThread._id, replyContent)
            setActiveThread(res.data) // Update active thread with new reply
            setReplyContent('')

            // Update list as well
            setDiscussions(discussions.map(d => d._id === res.data._id ? res.data : d))
        } catch (error) {
            alert('Failed to post reply')
        }
    }

    if (activeThread) {
        return (
            <div className="discussion-board thread-view">
                <button className="back-btn" onClick={() => setActiveThread(null)}>
                    ← Back to Discussions
                </button>

                <div className="original-post">
                    <h2 className="discussion-topic">{activeThread.topic}</h2>
                    <div className="discussion-meta">
                        <span>Posted by {activeThread.user_id?.name || 'User'}</span>
                        <span>• {new Date(activeThread.created_at).toLocaleDateString()}</span>
                    </div>
                    <p className="review-content">{activeThread.content}</p>
                </div>

                <h3>Replies ({activeThread.replies?.length || 0})</h3>
                <div className="reply-list">
                    {activeThread.replies?.map((reply, i) => (
                        <div key={i} className="reply-item">
                            <div className="reviewer-info">
                                <div className="reviewer-avatar small" style={{ width: 30, height: 30, fontSize: '0.8rem' }}>
                                    {reply.user_id?.name?.charAt(0) || 'U'}
                                </div>
                                <div>
                                    <div className="reviewer-name">{reply.user_id?.name}</div>
                                    <div className="review-date">{new Date(reply.created_at).toLocaleDateString()}</div>
                                </div>
                            </div>
                            <p className="review-content" style={{ marginTop: '0.5rem' }}>{reply.content}</p>
                        </div>
                    ))}
                </div>

                {isAuthenticated ? (
                    <form className="reply-form" onSubmit={handleReply}>
                        <textarea
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            placeholder="Add a reply..."
                            rows={3}
                            required
                        />
                        <button type="submit" className="primary-btn">Post Reply</button>
                    </form>
                ) : (
                    <div className="login-prompt">Log in to reply</div>
                )}
            </div>
        )
    }

    return (
        <div className="discussion-board">
            <div className="discussion-header">
                <h3>Community Discussions</h3>
                {isAuthenticated && (
                    <button className="primary-btn" onClick={() => setShowNewModal(true)}>
                        Start Discussion
                    </button>
                )}
            </div>

            {loading ? (
                <div>Loading discussions...</div>
            ) : discussions.length === 0 ? (
                <div className="no-reviews">No discussions yet. Start one!</div>
            ) : (
                <div className="discussion-list">
                    {discussions.map(discussion => (
                        <div
                            key={discussion._id}
                            className="discussion-item"
                            onClick={() => setActiveThread(discussion)}
                        >
                            <h4 className="discussion-topic">{discussion.topic}</h4>
                            <p className="review-content" style={{ maxHeight: '60px', overflow: 'hidden' }}>
                                {discussion.content.substring(0, 150)}...
                            </p>
                            <div className="discussion-meta">
                                <span>{discussion.replies?.length || 0} replies</span>
                                <span>Last active: {new Date(discussion.updated_at).toLocaleDateString()}</span>
                                <span>By {discussion.user_id?.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showNewModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="modal-close" onClick={() => setShowNewModal(false)}>×</button>
                        <h3>Start a Discussion</h3>
                        <form onSubmit={handleCreateDiscussion}>
                            <div className="form-group">
                                <label>Topic</label>
                                <input
                                    type="text"
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    required
                                    maxLength={100}
                                />
                            </div>
                            <div className="form-group">
                                <label>Content</label>
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    required
                                    rows={5}
                                />
                            </div>
                            <div className="modal-actions">
                                <button type="button" onClick={() => setShowNewModal(false)}>Cancel</button>
                                <button type="submit" className="primary-btn">Post</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
