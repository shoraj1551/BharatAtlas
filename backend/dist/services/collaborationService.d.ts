/**
 * Share workspace with a user
 */
export function shareWorkspace(workspaceId: any, userEmail: any, role: string | undefined, requestingUserId: any): Promise<import("mongoose").Document<unknown, {}, {
    created_at: NativeDate;
    workspace_id: string;
    bookmarks: import("mongoose").Types.DocumentArray<{
        saved_at: NativeDate;
        place_id?: string | null | undefined;
        notes?: string | null | undefined;
        place_name?: string | null | undefined;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        saved_at: NativeDate;
        place_id?: string | null | undefined;
        notes?: string | null | undefined;
        place_name?: string | null | undefined;
    }> & {
        saved_at: NativeDate;
        place_id?: string | null | undefined;
        notes?: string | null | undefined;
        place_name?: string | null | undefined;
    }>;
    saved_insights: import("mongoose").Types.DocumentArray<{
        type: "observation" | "opportunity" | "consultant_chat" | "business_sim";
        saved_at: NativeDate;
        title?: string | null | undefined;
        content?: any;
        source_place_id?: string | null | undefined;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        type: "observation" | "opportunity" | "consultant_chat" | "business_sim";
        saved_at: NativeDate;
        title?: string | null | undefined;
        content?: any;
        source_place_id?: string | null | undefined;
    }> & {
        type: "observation" | "opportunity" | "consultant_chat" | "business_sim";
        saved_at: NativeDate;
        title?: string | null | undefined;
        content?: any;
        source_place_id?: string | null | undefined;
    }>;
    saved_comparisons: import("mongoose").Types.DocumentArray<{
        saved_at: NativeDate;
        place_ids: string[];
        title?: string | null | undefined;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        saved_at: NativeDate;
        place_ids: string[];
        title?: string | null | undefined;
    }> & {
        saved_at: NativeDate;
        place_ids: string[];
        title?: string | null | undefined;
    }>;
    collaborators: import("mongoose").Types.DocumentArray<{
        role: "owner" | "editor" | "viewer";
        user_id: import("mongoose").Types.ObjectId;
        added_at: NativeDate;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        role: "owner" | "editor" | "viewer";
        user_id: import("mongoose").Types.ObjectId;
        added_at: NativeDate;
    }> & {
        role: "owner" | "editor" | "viewer";
        user_id: import("mongoose").Types.ObjectId;
        added_at: NativeDate;
    }>;
    visibility: "private" | "team" | "public";
    activity_log: import("mongoose").Types.DocumentArray<{
        timestamp: NativeDate;
        action?: string | null | undefined;
        user_id?: import("mongoose").Types.ObjectId | null | undefined;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        timestamp: NativeDate;
        action?: string | null | undefined;
        user_id?: import("mongoose").Types.ObjectId | null | undefined;
    }> & {
        timestamp: NativeDate;
        action?: string | null | undefined;
        user_id?: import("mongoose").Types.ObjectId | null | undefined;
    }>;
    last_active: NativeDate;
    email?: string | null | undefined;
    owner_id?: import("mongoose").Types.ObjectId | null | undefined;
    shared_link?: string | null | undefined;
}, {}, import("mongoose").DefaultSchemaOptions> & {
    created_at: NativeDate;
    workspace_id: string;
    bookmarks: import("mongoose").Types.DocumentArray<{
        saved_at: NativeDate;
        place_id?: string | null | undefined;
        notes?: string | null | undefined;
        place_name?: string | null | undefined;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        saved_at: NativeDate;
        place_id?: string | null | undefined;
        notes?: string | null | undefined;
        place_name?: string | null | undefined;
    }> & {
        saved_at: NativeDate;
        place_id?: string | null | undefined;
        notes?: string | null | undefined;
        place_name?: string | null | undefined;
    }>;
    saved_insights: import("mongoose").Types.DocumentArray<{
        type: "observation" | "opportunity" | "consultant_chat" | "business_sim";
        saved_at: NativeDate;
        title?: string | null | undefined;
        content?: any;
        source_place_id?: string | null | undefined;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        type: "observation" | "opportunity" | "consultant_chat" | "business_sim";
        saved_at: NativeDate;
        title?: string | null | undefined;
        content?: any;
        source_place_id?: string | null | undefined;
    }> & {
        type: "observation" | "opportunity" | "consultant_chat" | "business_sim";
        saved_at: NativeDate;
        title?: string | null | undefined;
        content?: any;
        source_place_id?: string | null | undefined;
    }>;
    saved_comparisons: import("mongoose").Types.DocumentArray<{
        saved_at: NativeDate;
        place_ids: string[];
        title?: string | null | undefined;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        saved_at: NativeDate;
        place_ids: string[];
        title?: string | null | undefined;
    }> & {
        saved_at: NativeDate;
        place_ids: string[];
        title?: string | null | undefined;
    }>;
    collaborators: import("mongoose").Types.DocumentArray<{
        role: "owner" | "editor" | "viewer";
        user_id: import("mongoose").Types.ObjectId;
        added_at: NativeDate;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        role: "owner" | "editor" | "viewer";
        user_id: import("mongoose").Types.ObjectId;
        added_at: NativeDate;
    }> & {
        role: "owner" | "editor" | "viewer";
        user_id: import("mongoose").Types.ObjectId;
        added_at: NativeDate;
    }>;
    visibility: "private" | "team" | "public";
    activity_log: import("mongoose").Types.DocumentArray<{
        timestamp: NativeDate;
        action?: string | null | undefined;
        user_id?: import("mongoose").Types.ObjectId | null | undefined;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        timestamp: NativeDate;
        action?: string | null | undefined;
        user_id?: import("mongoose").Types.ObjectId | null | undefined;
    }> & {
        timestamp: NativeDate;
        action?: string | null | undefined;
        user_id?: import("mongoose").Types.ObjectId | null | undefined;
    }>;
    last_active: NativeDate;
    email?: string | null | undefined;
    owner_id?: import("mongoose").Types.ObjectId | null | undefined;
    shared_link?: string | null | undefined;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
/**
 * Remove collaborator from workspace
 */
export function removeCollaborator(workspaceId: any, userId: any, requestingUserId: any): Promise<import("mongoose").Document<unknown, {}, {
    created_at: NativeDate;
    workspace_id: string;
    bookmarks: import("mongoose").Types.DocumentArray<{
        saved_at: NativeDate;
        place_id?: string | null | undefined;
        notes?: string | null | undefined;
        place_name?: string | null | undefined;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        saved_at: NativeDate;
        place_id?: string | null | undefined;
        notes?: string | null | undefined;
        place_name?: string | null | undefined;
    }> & {
        saved_at: NativeDate;
        place_id?: string | null | undefined;
        notes?: string | null | undefined;
        place_name?: string | null | undefined;
    }>;
    saved_insights: import("mongoose").Types.DocumentArray<{
        type: "observation" | "opportunity" | "consultant_chat" | "business_sim";
        saved_at: NativeDate;
        title?: string | null | undefined;
        content?: any;
        source_place_id?: string | null | undefined;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        type: "observation" | "opportunity" | "consultant_chat" | "business_sim";
        saved_at: NativeDate;
        title?: string | null | undefined;
        content?: any;
        source_place_id?: string | null | undefined;
    }> & {
        type: "observation" | "opportunity" | "consultant_chat" | "business_sim";
        saved_at: NativeDate;
        title?: string | null | undefined;
        content?: any;
        source_place_id?: string | null | undefined;
    }>;
    saved_comparisons: import("mongoose").Types.DocumentArray<{
        saved_at: NativeDate;
        place_ids: string[];
        title?: string | null | undefined;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        saved_at: NativeDate;
        place_ids: string[];
        title?: string | null | undefined;
    }> & {
        saved_at: NativeDate;
        place_ids: string[];
        title?: string | null | undefined;
    }>;
    collaborators: import("mongoose").Types.DocumentArray<{
        role: "owner" | "editor" | "viewer";
        user_id: import("mongoose").Types.ObjectId;
        added_at: NativeDate;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        role: "owner" | "editor" | "viewer";
        user_id: import("mongoose").Types.ObjectId;
        added_at: NativeDate;
    }> & {
        role: "owner" | "editor" | "viewer";
        user_id: import("mongoose").Types.ObjectId;
        added_at: NativeDate;
    }>;
    visibility: "private" | "team" | "public";
    activity_log: import("mongoose").Types.DocumentArray<{
        timestamp: NativeDate;
        action?: string | null | undefined;
        user_id?: import("mongoose").Types.ObjectId | null | undefined;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        timestamp: NativeDate;
        action?: string | null | undefined;
        user_id?: import("mongoose").Types.ObjectId | null | undefined;
    }> & {
        timestamp: NativeDate;
        action?: string | null | undefined;
        user_id?: import("mongoose").Types.ObjectId | null | undefined;
    }>;
    last_active: NativeDate;
    email?: string | null | undefined;
    owner_id?: import("mongoose").Types.ObjectId | null | undefined;
    shared_link?: string | null | undefined;
}, {}, import("mongoose").DefaultSchemaOptions> & {
    created_at: NativeDate;
    workspace_id: string;
    bookmarks: import("mongoose").Types.DocumentArray<{
        saved_at: NativeDate;
        place_id?: string | null | undefined;
        notes?: string | null | undefined;
        place_name?: string | null | undefined;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        saved_at: NativeDate;
        place_id?: string | null | undefined;
        notes?: string | null | undefined;
        place_name?: string | null | undefined;
    }> & {
        saved_at: NativeDate;
        place_id?: string | null | undefined;
        notes?: string | null | undefined;
        place_name?: string | null | undefined;
    }>;
    saved_insights: import("mongoose").Types.DocumentArray<{
        type: "observation" | "opportunity" | "consultant_chat" | "business_sim";
        saved_at: NativeDate;
        title?: string | null | undefined;
        content?: any;
        source_place_id?: string | null | undefined;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        type: "observation" | "opportunity" | "consultant_chat" | "business_sim";
        saved_at: NativeDate;
        title?: string | null | undefined;
        content?: any;
        source_place_id?: string | null | undefined;
    }> & {
        type: "observation" | "opportunity" | "consultant_chat" | "business_sim";
        saved_at: NativeDate;
        title?: string | null | undefined;
        content?: any;
        source_place_id?: string | null | undefined;
    }>;
    saved_comparisons: import("mongoose").Types.DocumentArray<{
        saved_at: NativeDate;
        place_ids: string[];
        title?: string | null | undefined;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        saved_at: NativeDate;
        place_ids: string[];
        title?: string | null | undefined;
    }> & {
        saved_at: NativeDate;
        place_ids: string[];
        title?: string | null | undefined;
    }>;
    collaborators: import("mongoose").Types.DocumentArray<{
        role: "owner" | "editor" | "viewer";
        user_id: import("mongoose").Types.ObjectId;
        added_at: NativeDate;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        role: "owner" | "editor" | "viewer";
        user_id: import("mongoose").Types.ObjectId;
        added_at: NativeDate;
    }> & {
        role: "owner" | "editor" | "viewer";
        user_id: import("mongoose").Types.ObjectId;
        added_at: NativeDate;
    }>;
    visibility: "private" | "team" | "public";
    activity_log: import("mongoose").Types.DocumentArray<{
        timestamp: NativeDate;
        action?: string | null | undefined;
        user_id?: import("mongoose").Types.ObjectId | null | undefined;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        timestamp: NativeDate;
        action?: string | null | undefined;
        user_id?: import("mongoose").Types.ObjectId | null | undefined;
    }> & {
        timestamp: NativeDate;
        action?: string | null | undefined;
        user_id?: import("mongoose").Types.ObjectId | null | undefined;
    }>;
    last_active: NativeDate;
    email?: string | null | undefined;
    owner_id?: import("mongoose").Types.ObjectId | null | undefined;
    shared_link?: string | null | undefined;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
/**
 * Update collaborator permissions
 */
export function updatePermissions(workspaceId: any, userId: any, newRole: any, requestingUserId: any): Promise<import("mongoose").Document<unknown, {}, {
    created_at: NativeDate;
    workspace_id: string;
    bookmarks: import("mongoose").Types.DocumentArray<{
        saved_at: NativeDate;
        place_id?: string | null | undefined;
        notes?: string | null | undefined;
        place_name?: string | null | undefined;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        saved_at: NativeDate;
        place_id?: string | null | undefined;
        notes?: string | null | undefined;
        place_name?: string | null | undefined;
    }> & {
        saved_at: NativeDate;
        place_id?: string | null | undefined;
        notes?: string | null | undefined;
        place_name?: string | null | undefined;
    }>;
    saved_insights: import("mongoose").Types.DocumentArray<{
        type: "observation" | "opportunity" | "consultant_chat" | "business_sim";
        saved_at: NativeDate;
        title?: string | null | undefined;
        content?: any;
        source_place_id?: string | null | undefined;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        type: "observation" | "opportunity" | "consultant_chat" | "business_sim";
        saved_at: NativeDate;
        title?: string | null | undefined;
        content?: any;
        source_place_id?: string | null | undefined;
    }> & {
        type: "observation" | "opportunity" | "consultant_chat" | "business_sim";
        saved_at: NativeDate;
        title?: string | null | undefined;
        content?: any;
        source_place_id?: string | null | undefined;
    }>;
    saved_comparisons: import("mongoose").Types.DocumentArray<{
        saved_at: NativeDate;
        place_ids: string[];
        title?: string | null | undefined;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        saved_at: NativeDate;
        place_ids: string[];
        title?: string | null | undefined;
    }> & {
        saved_at: NativeDate;
        place_ids: string[];
        title?: string | null | undefined;
    }>;
    collaborators: import("mongoose").Types.DocumentArray<{
        role: "owner" | "editor" | "viewer";
        user_id: import("mongoose").Types.ObjectId;
        added_at: NativeDate;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        role: "owner" | "editor" | "viewer";
        user_id: import("mongoose").Types.ObjectId;
        added_at: NativeDate;
    }> & {
        role: "owner" | "editor" | "viewer";
        user_id: import("mongoose").Types.ObjectId;
        added_at: NativeDate;
    }>;
    visibility: "private" | "team" | "public";
    activity_log: import("mongoose").Types.DocumentArray<{
        timestamp: NativeDate;
        action?: string | null | undefined;
        user_id?: import("mongoose").Types.ObjectId | null | undefined;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        timestamp: NativeDate;
        action?: string | null | undefined;
        user_id?: import("mongoose").Types.ObjectId | null | undefined;
    }> & {
        timestamp: NativeDate;
        action?: string | null | undefined;
        user_id?: import("mongoose").Types.ObjectId | null | undefined;
    }>;
    last_active: NativeDate;
    email?: string | null | undefined;
    owner_id?: import("mongoose").Types.ObjectId | null | undefined;
    shared_link?: string | null | undefined;
}, {}, import("mongoose").DefaultSchemaOptions> & {
    created_at: NativeDate;
    workspace_id: string;
    bookmarks: import("mongoose").Types.DocumentArray<{
        saved_at: NativeDate;
        place_id?: string | null | undefined;
        notes?: string | null | undefined;
        place_name?: string | null | undefined;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        saved_at: NativeDate;
        place_id?: string | null | undefined;
        notes?: string | null | undefined;
        place_name?: string | null | undefined;
    }> & {
        saved_at: NativeDate;
        place_id?: string | null | undefined;
        notes?: string | null | undefined;
        place_name?: string | null | undefined;
    }>;
    saved_insights: import("mongoose").Types.DocumentArray<{
        type: "observation" | "opportunity" | "consultant_chat" | "business_sim";
        saved_at: NativeDate;
        title?: string | null | undefined;
        content?: any;
        source_place_id?: string | null | undefined;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        type: "observation" | "opportunity" | "consultant_chat" | "business_sim";
        saved_at: NativeDate;
        title?: string | null | undefined;
        content?: any;
        source_place_id?: string | null | undefined;
    }> & {
        type: "observation" | "opportunity" | "consultant_chat" | "business_sim";
        saved_at: NativeDate;
        title?: string | null | undefined;
        content?: any;
        source_place_id?: string | null | undefined;
    }>;
    saved_comparisons: import("mongoose").Types.DocumentArray<{
        saved_at: NativeDate;
        place_ids: string[];
        title?: string | null | undefined;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        saved_at: NativeDate;
        place_ids: string[];
        title?: string | null | undefined;
    }> & {
        saved_at: NativeDate;
        place_ids: string[];
        title?: string | null | undefined;
    }>;
    collaborators: import("mongoose").Types.DocumentArray<{
        role: "owner" | "editor" | "viewer";
        user_id: import("mongoose").Types.ObjectId;
        added_at: NativeDate;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        role: "owner" | "editor" | "viewer";
        user_id: import("mongoose").Types.ObjectId;
        added_at: NativeDate;
    }> & {
        role: "owner" | "editor" | "viewer";
        user_id: import("mongoose").Types.ObjectId;
        added_at: NativeDate;
    }>;
    visibility: "private" | "team" | "public";
    activity_log: import("mongoose").Types.DocumentArray<{
        timestamp: NativeDate;
        action?: string | null | undefined;
        user_id?: import("mongoose").Types.ObjectId | null | undefined;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        timestamp: NativeDate;
        action?: string | null | undefined;
        user_id?: import("mongoose").Types.ObjectId | null | undefined;
    }> & {
        timestamp: NativeDate;
        action?: string | null | undefined;
        user_id?: import("mongoose").Types.ObjectId | null | undefined;
    }>;
    last_active: NativeDate;
    email?: string | null | undefined;
    owner_id?: import("mongoose").Types.ObjectId | null | undefined;
    shared_link?: string | null | undefined;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
/**
 * Get workspaces shared with a user
 */
export function getSharedWorkspaces(userId: any): Promise<(import("mongoose").Document<unknown, {}, {
    created_at: NativeDate;
    workspace_id: string;
    bookmarks: import("mongoose").Types.DocumentArray<{
        saved_at: NativeDate;
        place_id?: string | null | undefined;
        notes?: string | null | undefined;
        place_name?: string | null | undefined;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        saved_at: NativeDate;
        place_id?: string | null | undefined;
        notes?: string | null | undefined;
        place_name?: string | null | undefined;
    }> & {
        saved_at: NativeDate;
        place_id?: string | null | undefined;
        notes?: string | null | undefined;
        place_name?: string | null | undefined;
    }>;
    saved_insights: import("mongoose").Types.DocumentArray<{
        type: "observation" | "opportunity" | "consultant_chat" | "business_sim";
        saved_at: NativeDate;
        title?: string | null | undefined;
        content?: any;
        source_place_id?: string | null | undefined;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        type: "observation" | "opportunity" | "consultant_chat" | "business_sim";
        saved_at: NativeDate;
        title?: string | null | undefined;
        content?: any;
        source_place_id?: string | null | undefined;
    }> & {
        type: "observation" | "opportunity" | "consultant_chat" | "business_sim";
        saved_at: NativeDate;
        title?: string | null | undefined;
        content?: any;
        source_place_id?: string | null | undefined;
    }>;
    saved_comparisons: import("mongoose").Types.DocumentArray<{
        saved_at: NativeDate;
        place_ids: string[];
        title?: string | null | undefined;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        saved_at: NativeDate;
        place_ids: string[];
        title?: string | null | undefined;
    }> & {
        saved_at: NativeDate;
        place_ids: string[];
        title?: string | null | undefined;
    }>;
    collaborators: import("mongoose").Types.DocumentArray<{
        role: "owner" | "editor" | "viewer";
        user_id: import("mongoose").Types.ObjectId;
        added_at: NativeDate;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        role: "owner" | "editor" | "viewer";
        user_id: import("mongoose").Types.ObjectId;
        added_at: NativeDate;
    }> & {
        role: "owner" | "editor" | "viewer";
        user_id: import("mongoose").Types.ObjectId;
        added_at: NativeDate;
    }>;
    visibility: "private" | "team" | "public";
    activity_log: import("mongoose").Types.DocumentArray<{
        timestamp: NativeDate;
        action?: string | null | undefined;
        user_id?: import("mongoose").Types.ObjectId | null | undefined;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        timestamp: NativeDate;
        action?: string | null | undefined;
        user_id?: import("mongoose").Types.ObjectId | null | undefined;
    }> & {
        timestamp: NativeDate;
        action?: string | null | undefined;
        user_id?: import("mongoose").Types.ObjectId | null | undefined;
    }>;
    last_active: NativeDate;
    email?: string | null | undefined;
    owner_id?: import("mongoose").Types.ObjectId | null | undefined;
    shared_link?: string | null | undefined;
}, {}, import("mongoose").DefaultSchemaOptions> & {
    created_at: NativeDate;
    workspace_id: string;
    bookmarks: import("mongoose").Types.DocumentArray<{
        saved_at: NativeDate;
        place_id?: string | null | undefined;
        notes?: string | null | undefined;
        place_name?: string | null | undefined;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        saved_at: NativeDate;
        place_id?: string | null | undefined;
        notes?: string | null | undefined;
        place_name?: string | null | undefined;
    }> & {
        saved_at: NativeDate;
        place_id?: string | null | undefined;
        notes?: string | null | undefined;
        place_name?: string | null | undefined;
    }>;
    saved_insights: import("mongoose").Types.DocumentArray<{
        type: "observation" | "opportunity" | "consultant_chat" | "business_sim";
        saved_at: NativeDate;
        title?: string | null | undefined;
        content?: any;
        source_place_id?: string | null | undefined;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        type: "observation" | "opportunity" | "consultant_chat" | "business_sim";
        saved_at: NativeDate;
        title?: string | null | undefined;
        content?: any;
        source_place_id?: string | null | undefined;
    }> & {
        type: "observation" | "opportunity" | "consultant_chat" | "business_sim";
        saved_at: NativeDate;
        title?: string | null | undefined;
        content?: any;
        source_place_id?: string | null | undefined;
    }>;
    saved_comparisons: import("mongoose").Types.DocumentArray<{
        saved_at: NativeDate;
        place_ids: string[];
        title?: string | null | undefined;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        saved_at: NativeDate;
        place_ids: string[];
        title?: string | null | undefined;
    }> & {
        saved_at: NativeDate;
        place_ids: string[];
        title?: string | null | undefined;
    }>;
    collaborators: import("mongoose").Types.DocumentArray<{
        role: "owner" | "editor" | "viewer";
        user_id: import("mongoose").Types.ObjectId;
        added_at: NativeDate;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        role: "owner" | "editor" | "viewer";
        user_id: import("mongoose").Types.ObjectId;
        added_at: NativeDate;
    }> & {
        role: "owner" | "editor" | "viewer";
        user_id: import("mongoose").Types.ObjectId;
        added_at: NativeDate;
    }>;
    visibility: "private" | "team" | "public";
    activity_log: import("mongoose").Types.DocumentArray<{
        timestamp: NativeDate;
        action?: string | null | undefined;
        user_id?: import("mongoose").Types.ObjectId | null | undefined;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        timestamp: NativeDate;
        action?: string | null | undefined;
        user_id?: import("mongoose").Types.ObjectId | null | undefined;
    }> & {
        timestamp: NativeDate;
        action?: string | null | undefined;
        user_id?: import("mongoose").Types.ObjectId | null | undefined;
    }>;
    last_active: NativeDate;
    email?: string | null | undefined;
    owner_id?: import("mongoose").Types.ObjectId | null | undefined;
    shared_link?: string | null | undefined;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
})[]>;
/**
 * Generate shareable link for workspace
 */
export function generateShareLink(workspaceId: any, requestingUserId: any): Promise<string>;
/**
 * Log activity in workspace
 */
export function logActivity(workspaceId: any, userId: any, action: any): Promise<void>;
/**
 * Check if user has access to workspace
 */
export function checkAccess(workspaceId: any, userId: any): Promise<{
    hasAccess: boolean;
    role: null;
} | {
    hasAccess: boolean;
    role: string;
}>;
//# sourceMappingURL=collaborationService.d.ts.map