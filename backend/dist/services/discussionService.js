import Discussion from '../../models/Discussion.js';
import { createLogger } from '../utils/logger.js';
const logger = createLogger('DiscussionService');
/**
 * Create a new discussion
 */
export async function createDiscussion(userId, discussionData) {
    try {
        const discussion = await Discussion.create({
            user_id: userId,
            ...discussionData
        });
        logger.info(`Discussion created by ${userId} for place ${discussionData.place_id}`);
        return discussion;
    }
    catch (error) {
        logger.error('Error creating discussion:', error);
        throw error;
    }
}
/**
 * Get discussions for a place
 */
export async function getDiscussions(placeId, page = 1, limit = 10) {
    try {
        const skip = (page - 1) * limit;
        const discussions = await Discussion.find({ place_id: placeId })
            .sort({ created_at: -1 })
            .skip(skip)
            .limit(limit)
            .populate('user_id', 'name avatar_url')
            .populate('replies.user_id', 'name avatar_url')
            .lean();
        const total = await Discussion.countDocuments({ place_id: placeId });
        return {
            discussions,
            total,
            page,
            pages: Math.ceil(total / limit)
        };
    }
    catch (error) {
        logger.error('Error getting discussions:', error);
        throw error;
    }
}
/**
 * Add a reply to a discussion
 */
export async function addReply(discussionId, userId, content) {
    try {
        const discussion = await Discussion.findByIdAndUpdate(discussionId, {
            $push: {
                replies: {
                    user_id: userId,
                    content,
                    created_at: new Date()
                }
            },
            $set: { updated_at: new Date() }
        }, { new: true }).populate('replies.user_id', 'name avatar_url');
        if (!discussion)
            throw new Error('Discussion not found');
        return discussion;
    }
    catch (error) {
        logger.error('Error adding reply:', error);
        throw error;
    }
}
/**
 * Delete discussion
 */
export async function deleteDiscussion(discussionId, userId) {
    try {
        const discussion = await Discussion.findOneAndDelete({ _id: discussionId, user_id: userId });
        if (!discussion)
            throw new Error('Discussion not found or unauthorized');
        return discussion;
    }
    catch (error) {
        logger.error('Error deleting discussion:', error);
        throw error;
    }
}
//# sourceMappingURL=discussionService.js.map