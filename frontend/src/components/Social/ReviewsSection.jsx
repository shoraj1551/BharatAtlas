import { useState, useEffect } from 'react'
import { getReviews } from '../../services/socialService'
import useAuthStore from '../../store/authStore'
import ReviewCard from './ReviewCard'
import WriteReviewModal from './WriteReviewModal'
import './Social.css'

export default function ReviewsSection({ placeId }) {
    const { isAuthenticated } = useAuthStore()
    const [reviews, setReviews] = useState([])
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [sort, setSort] = useState('newest')

    const fetchReviews = async () => {
        setLoading(true)
        try {
            const res = await getReviews(placeId, 1, sort)
            setReviews(res.data.reviews)
            setStats(res.data.stats)
        } catch (error) {
            console.error('Error fetching reviews:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchReviews()
    }, [placeId, sort])

    const handleReviewAdded = (newReview) => {
        setReviews([newReview, ...reviews])
        fetchReviews() // Refresh stats
    }

    return (
        <div className="reviews-section">
            <div className="reviews-header">
                <div className="rating-summary">
                    {stats && (
                        <>
                            <div className="average-rating">
                                <span className="score">{stats.average}</span>
                                <div className="stars">
                                    {'★'.repeat(Math.round(stats.average))}
                                    <span className="gray">{'★'.repeat(5 - Math.round(stats.average))}</span>
                                </div>
                                <span className="count">({stats.count} reviews)</span>
                            </div>

                            <div className="rating-bars">
                                {[5, 4, 3, 2, 1].map(star => (
                                    <div key={star} className="rating-bar-row">
                                        <span>{star} ★</span>
                                        <div className="bar-bg">
                                            <div
                                                className="bar-fill"
                                                style={{ width: `${stats.count ? (stats.breakdown[star] / stats.count) * 100 : 0}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                <div className="reviews-actions">
                    {isAuthenticated ? (
                        <button className="write-review-btn" onClick={() => setShowModal(true)}>
                            Write a Review
                        </button>
                    ) : (
                        <div className="login-prompt">Log in to write a review</div>
                    )}

                    <select value={sort} onChange={(e) => setSort(e.target.value)} className="sort-select">
                        <option value="newest">Newest</option>
                        <option value="highest">Highest Rated</option>
                        <option value="lowest">Lowest Rated</option>
                        <option value="helpful">Most Helpful</option>
                    </select>
                </div>
            </div>

            <div className="reviews-list">
                {loading ? (
                    <div>Loading reviews...</div>
                ) : reviews.length === 0 ? (
                    <div className="no-reviews">No reviews yet. Be the first to review!</div>
                ) : (
                    reviews.map(review => (
                        <ReviewCard
                            key={review._id}
                            review={review}
                            onDelete={(id) => setReviews(reviews.filter(r => r._id !== id))}
                        />
                    ))
                )}
            </div>

            {showModal && (
                <WriteReviewModal
                    placeId={placeId}
                    onClose={() => setShowModal(false)}
                    onReviewAdded={handleReviewAdded}
                />
            )}
        </div>
    )
}
