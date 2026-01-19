import { useState } from 'react'
import useAuthStore from '../../store/authStore'
import { toggleHelpful, deleteReview } from '../../services/socialService'
import './Social.css'

export default function ReviewCard({ review, onDelete }) {
    const { user } = useAuthStore()
    const [helpfulCount, setHelpfulCount] = useState(review.helpful_count)
    const [isHelpful, setIsHelpful] = useState(review.helpful?.includes(user?._id))

    const handleHelpful = async () => {
        if (!user) return alert('Please login to vote')
        try {
            const res = await toggleHelpful(review._id)
            setHelpfulCount(res.data.helpful_count)
            setIsHelpful(res.data.is_helpful === false) // API returns is_helpful as false if removed? Wait, logic check.
            // Actually my backend returns is_helpful: index === -1 (which means added? No, index === -1 means it WAS NOT there, so we added it. So is_helpful is true)
            // Wait, toggleHelpful backend: if index === -1 (not found), push (add). Return is_helpful: true.
            // if index !== -1 (found), splice (remove). Return is_helpful: false.
            // So frontned should update based on return.
            // Let's assume backend returns { helpful_count, is_helpful }

            // Let's re-verify backend logic in step 875:
            // return { helpful_count: review.helpful.length, is_helpful: index === -1 }
            // Yes, if index === -1 (added), is_helpful is true.
            setIsHelpful(!isHelpful) // Optimistic update or use response
        } catch (error) {
            console.error('Error toggling helpful:', error)
        }
    }

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this review?')) return
        try {
            await deleteReview(review._id)
            onDelete(review._id)
        } catch (error) {
            console.error('Error deleting review:', error)
        }
    }

    return (
        <div className="review-card">
            <div className="review-header">
                <div className="reviewer-info">
                    <div className="reviewer-avatar">
                        {review.user_id?.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                        <div className="reviewer-name">{review.user_id?.name || 'Anonymous'}</div>
                        <div className="review-date">{new Date(review.created_at).toLocaleDateString()}</div>
                    </div>
                </div>
                <div className="review-rating">
                    {'★'.repeat(review.rating)}
                    <span className="rating-gray">{'★'.repeat(5 - review.rating)}</span>
                </div>
            </div>

            <h4 className="review-title">{review.title}</h4>
            <p className="review-content">{review.content}</p>

            <div className="review-footer">
                <button
                    className={`helpful-btn ${isHelpful ? 'active' : ''}`}
                    onClick={handleHelpful}
                >
                    👍 Helpful ({helpfulCount})
                </button>

                {user?._id === review.user_id?._id && (
                    <button className="delete-btn" onClick={handleDelete}>Delete</button>
                )}
            </div>
        </div>
    )
}
