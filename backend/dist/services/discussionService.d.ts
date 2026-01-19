/**
 * Create a new discussion
 */
export function createDiscussion(userId: any, discussionData: any): Promise<import("mongoose").Document<unknown, {}, {
    place_id: string;
    created_at: NativeDate;
    updated_at: NativeDate;
    tags: string[];
    user_id: import("mongoose").Types.ObjectId;
    content: string;
    topic: string;
    replies: import("mongoose").Types.DocumentArray<{
        created_at: NativeDate;
        user_id: import("mongoose").Types.ObjectId;
        content: string;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        created_at: NativeDate;
        user_id: import("mongoose").Types.ObjectId;
        content: string;
    }> & {
        created_at: NativeDate;
        user_id: import("mongoose").Types.ObjectId;
        content: string;
    }>;
    views: number;
}, {}, import("mongoose").DefaultSchemaOptions> & {
    place_id: string;
    created_at: NativeDate;
    updated_at: NativeDate;
    tags: string[];
    user_id: import("mongoose").Types.ObjectId;
    content: string;
    topic: string;
    replies: import("mongoose").Types.DocumentArray<{
        created_at: NativeDate;
        user_id: import("mongoose").Types.ObjectId;
        content: string;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        created_at: NativeDate;
        user_id: import("mongoose").Types.ObjectId;
        content: string;
    }> & {
        created_at: NativeDate;
        user_id: import("mongoose").Types.ObjectId;
        content: string;
    }>;
    views: number;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
/**
 * Get discussions for a place
 */
export function getDiscussions(placeId: any, page?: number, limit?: number): Promise<{
    discussions: (import("mongoose").FlattenMaps<{
        place_id: string;
        created_at: NativeDate;
        updated_at: NativeDate;
        tags: string[];
        user_id: import("mongoose").Types.ObjectId;
        content: string;
        topic: string;
        replies: import("mongoose").Types.DocumentArray<{
            created_at: NativeDate;
            user_id: import("mongoose").Types.ObjectId;
            content: string;
        } | {
            created_at: NativeDate;
            user_id: string;
            content: string;
            _id: string;
            __v: number;
        }, import("mongoose").Types.Subdocument<string | import("bson").ObjectId, any, {
            created_at: NativeDate;
            user_id: import("mongoose").Types.ObjectId;
            content: string;
        } | {
            created_at: NativeDate;
            user_id: string;
            content: string;
            _id: string;
            __v: number;
        }> & ({
            created_at: NativeDate;
            user_id: import("mongoose").Types.ObjectId;
            content: string;
        } | {
            created_at: NativeDate;
            user_id: string;
            content: string;
            _id: string;
            __v: number;
        })>;
        views: number;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[];
    total: number;
    page: number;
    pages: number;
}>;
/**
 * Add a reply to a discussion
 */
export function addReply(discussionId: any, userId: any, content: any): Promise<import("mongoose").Document<unknown, {}, {
    place_id: string;
    created_at: NativeDate;
    updated_at: NativeDate;
    tags: string[];
    user_id: import("mongoose").Types.ObjectId;
    content: string;
    topic: string;
    replies: import("mongoose").Types.DocumentArray<{
        created_at: NativeDate;
        user_id: import("mongoose").Types.ObjectId;
        content: string;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        created_at: NativeDate;
        user_id: import("mongoose").Types.ObjectId;
        content: string;
    }> & {
        created_at: NativeDate;
        user_id: import("mongoose").Types.ObjectId;
        content: string;
    }>;
    views: number;
}, {}, import("mongoose").DefaultSchemaOptions> & {
    place_id: string;
    created_at: NativeDate;
    updated_at: NativeDate;
    tags: string[];
    user_id: import("mongoose").Types.ObjectId;
    content: string;
    topic: string;
    replies: import("mongoose").Types.DocumentArray<{
        created_at: NativeDate;
        user_id: import("mongoose").Types.ObjectId;
        content: string;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        created_at: NativeDate;
        user_id: import("mongoose").Types.ObjectId;
        content: string;
    }> & {
        created_at: NativeDate;
        user_id: import("mongoose").Types.ObjectId;
        content: string;
    }>;
    views: number;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
/**
 * Delete discussion
 */
export function deleteDiscussion(discussionId: any, userId: any): Promise<import("mongoose").Document<unknown, {}, {
    place_id: string;
    created_at: NativeDate;
    updated_at: NativeDate;
    tags: string[];
    user_id: import("mongoose").Types.ObjectId;
    content: string;
    topic: string;
    replies: import("mongoose").Types.DocumentArray<{
        created_at: NativeDate;
        user_id: import("mongoose").Types.ObjectId;
        content: string;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        created_at: NativeDate;
        user_id: import("mongoose").Types.ObjectId;
        content: string;
    }> & {
        created_at: NativeDate;
        user_id: import("mongoose").Types.ObjectId;
        content: string;
    }>;
    views: number;
}, {}, import("mongoose").DefaultSchemaOptions> & {
    place_id: string;
    created_at: NativeDate;
    updated_at: NativeDate;
    tags: string[];
    user_id: import("mongoose").Types.ObjectId;
    content: string;
    topic: string;
    replies: import("mongoose").Types.DocumentArray<{
        created_at: NativeDate;
        user_id: import("mongoose").Types.ObjectId;
        content: string;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        created_at: NativeDate;
        user_id: import("mongoose").Types.ObjectId;
        content: string;
    }> & {
        created_at: NativeDate;
        user_id: import("mongoose").Types.ObjectId;
        content: string;
    }>;
    views: number;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=discussionService.d.ts.map