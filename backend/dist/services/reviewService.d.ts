/**
 * Create a new review
 */
export function createReview(userId: any, reviewData: any): Promise<import("mongoose").Document<unknown, {}, {
    place_id: string;
    title: string;
    created_at: NativeDate;
    updated_at: NativeDate;
    user_id: import("mongoose").Types.ObjectId;
    rating: number;
    content: string;
    photos: string[];
    helpful: import("mongoose").Types.ObjectId[];
}, {}, import("mongoose").DefaultSchemaOptions> & {
    place_id: string;
    title: string;
    created_at: NativeDate;
    updated_at: NativeDate;
    user_id: import("mongoose").Types.ObjectId;
    rating: number;
    content: string;
    photos: string[];
    helpful: import("mongoose").Types.ObjectId[];
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
/**
 * Get reviews for a place
 */
export function getReviews(placeId: any, page?: number, limit?: number, sort?: string): Promise<{
    reviews: {
        helpful_count: number;
        place_id: string;
        title: string;
        created_at: NativeDate;
        updated_at: NativeDate;
        user_id: import("mongoose").Types.ObjectId;
        rating: number;
        content: string;
        photos: string[];
        helpful: import("mongoose").Types.ObjectId[];
        _id: import("mongoose").Types.ObjectId;
        __v: number;
    }[];
    total: number;
    page: number;
    pages: number;
    stats: {
        average: number;
        count: any;
        breakdown: any;
    };
}>;
/**
 * Get rating statistics for a place
 */
export function getRatingStats(placeId: any): Promise<{
    average: number;
    count: any;
    breakdown: any;
}>;
/**
 * Mark review as helpful
 */
export function toggleHelpful(reviewId: any, userId: any): Promise<{
    helpful_count: number;
    is_helpful: boolean;
}>;
/**
 * Delete review
 */
export function deleteReview(reviewId: any, userId: any): Promise<import("mongoose").Document<unknown, {}, {
    place_id: string;
    title: string;
    created_at: NativeDate;
    updated_at: NativeDate;
    user_id: import("mongoose").Types.ObjectId;
    rating: number;
    content: string;
    photos: string[];
    helpful: import("mongoose").Types.ObjectId[];
}, {}, import("mongoose").DefaultSchemaOptions> & {
    place_id: string;
    title: string;
    created_at: NativeDate;
    updated_at: NativeDate;
    user_id: import("mongoose").Types.ObjectId;
    rating: number;
    content: string;
    photos: string[];
    helpful: import("mongoose").Types.ObjectId[];
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=reviewService.d.ts.map