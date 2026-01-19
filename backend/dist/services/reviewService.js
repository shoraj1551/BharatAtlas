import Review from '../../models/Review.js';
import { createLogger } from '../utils/logger.js';
const logger = createLogger('ReviewService');
/**
 * Create a new review
 */
export async function createReview(userId, reviewData) {
    try {
        const review = await Review.create({
            user_id: userId,
            ...reviewData
        });
        logger.info(`Review created by ${userId} for place ${reviewData.place_id}`);
        return review;
    }
    catch (error) {
        logger.error('Error creating review:', error);
        throw error;
    }
}
/**
 * Get reviews for a place
 */
export async function getReviews(placeId, page = 1, limit = 10, sort = 'newest') {
    try {
        const skip = (page - 1) * limit;
        let sortOption = { created_at: -1 };
        if (sort === 'oldest')
            sortOption = { created_at: 1 };
        if (sort === 'highest')
            sortOption = { rating: -1 };
        if (sort === 'lowest')
            sortOption = { rating: 1 };
        if (sort === 'helpful')
            sortOption = { 'helpful.length': -1 };
        const reviews = await Review.find({ place_id: placeId })
            .sort(sortOption)
            .skip(skip)
            .limit(limit)
            .populate('user_id', 'name avatar_url')
            .lean();
        const total = await Review.countDocuments({ place_id: placeId });
        // Add helpful count
        const processedReviews = reviews.map(r => ({
            ...r,
            helpful_count: r.helpful ? r.helpful.length : 0
        }));
        // Calculate rating stats
        const stats = await getRatingStats(placeId);
        return {
            reviews: processedReviews,
            total,
            page,
            pages: Math.ceil(total / limit),
            stats
        };
    }
    catch (error) {
        logger.error('Error getting reviews:', error);
        throw error;
    }
}
/**
 * Get rating statistics for a place
 */
export async function getRatingStats(placeId) {
    try {
        const stats = await Review.aggregate([
            { $match: { place_id: placeId } },
            {
                $group: {
                    _id: null,
                    average: { $avg: '$rating' },
                    count: { $sum: 1 },
                    breakdown: {
                        $push: '$rating'
                    }
                }
            }
        ]);
        if (stats.length === 0) {
            return { average: 0, count: 0, breakdown: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } };
        }
        const { average, count, breakdown } = stats[0];
        const counts = breakdown.reduce((acc, rating) => {
            acc[rating] = (acc[rating] || 0) + 1;
            return acc;
        }, { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
        return {
            average: parseFloat(average.toFixed(1)),
            count,
            breakdown: counts
        };
    }
    catch (error) {
        logger.error('Error getting rating stats:', error);
        throw error;
    }
}
/**
 * Mark review as helpful
 */
export async function toggleHelpful(reviewId, userId) {
    try {
        const review = await Review.findById(reviewId);
        if (!review)
            throw new Error('Review not found');
        const index = review.helpful.indexOf(userId);
        if (index === -1) {
            review.helpful.push(userId);
        }
        else {
            review.helpful.splice(index, 1);
        }
        await review.save();
        return { helpful_count: review.helpful.length, is_helpful: index === -1 };
    }
    catch (error) {
        logger.error('Error toggling helpful:', error);
        throw error;
    }
}
/**
 * Delete review
 */
export async function deleteReview(reviewId, userId) {
    try {
        const review = await Review.findOneAndDelete({ _id: reviewId, user_id: userId });
        if (!review)
            throw new Error('Review not found or unauthorized');
        return review;
    }
    catch (error) {
        logger.error('Error deleting review:', error);
        throw error;
    }
}
//# sourceMappingURL=reviewService.js.map