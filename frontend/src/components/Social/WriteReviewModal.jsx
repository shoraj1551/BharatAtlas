import { useState } from 'react'
import { createReview } from '../../services/socialService'
import './Social.css'

export default function WriteReviewModal({ placeId, onClose, onReviewAdded }) {
    const [rating, setRating] = useState(0)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (rating === 0) return setError('Please select a rating')

        setLoading(true)
        setError(null)

        try {
            const res = await createReview({
                place_id: placeId,
                rating,
                title,
                content
            })
            onReviewAdded(res.data)
            onClose()
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content review-modal">
                <button className="modal-close" onClick={onClose}>×</button>
                <h3>Write a Review</h3>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Rating</label>
                        <div className="rating-selector">
                            {[1, 2, 3, 4, 5].map(star => (
                                <span
                                    key={star}
                                    className={`star ${star <= rating ? 'active' : ''}`}
                                    onClick={() => setRating(star)}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Summarize your experience"
                            required
                            maxLength={100}
                        />
                    </div>

                    <div className="form-group">
                        <label>Review</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Share details of your own experience at this place"
                            required
                            maxLength={2000}
                            rows={5}
                        />
                    </div>

                    <div className="modal-actions">
                        <button type="button" onClick={onClose} disabled={loading}>Cancel</button>
                        <button type="submit" className="primary-btn" disabled={loading}>
                            {loading ? 'Submitting...' : 'Submit Review'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
