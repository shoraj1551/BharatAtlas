export default Workspace;
declare const Workspace: mongoose.Model<{
    created_at: NativeDate;
    workspace_id: string;
    bookmarks: mongoose.Types.DocumentArray<{
        saved_at: NativeDate;
        place_id?: string | null | undefined;
        notes?: string | null | undefined;
        place_name?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
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
    saved_insights: mongoose.Types.DocumentArray<{
        type: "observation" | "opportunity" | "consultant_chat" | "business_sim";
        saved_at: NativeDate;
        title?: string | null | undefined;
        content?: any;
        source_place_id?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
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
    saved_comparisons: mongoose.Types.DocumentArray<{
        saved_at: NativeDate;
        place_ids: string[];
        title?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        saved_at: NativeDate;
        place_ids: string[];
        title?: string | null | undefined;
    }> & {
        saved_at: NativeDate;
        place_ids: string[];
        title?: string | null | undefined;
    }>;
    collaborators: mongoose.Types.DocumentArray<{
        role: "owner" | "editor" | "viewer";
        user_id: mongoose.Types.ObjectId;
        added_at: NativeDate;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        role: "owner" | "editor" | "viewer";
        user_id: mongoose.Types.ObjectId;
        added_at: NativeDate;
    }> & {
        role: "owner" | "editor" | "viewer";
        user_id: mongoose.Types.ObjectId;
        added_at: NativeDate;
    }>;
    visibility: "private" | "team" | "public";
    activity_log: mongoose.Types.DocumentArray<{
        timestamp: NativeDate;
        action?: string | null | undefined;
        user_id?: mongoose.Types.ObjectId | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        timestamp: NativeDate;
        action?: string | null | undefined;
        user_id?: mongoose.Types.ObjectId | null | undefined;
    }> & {
        timestamp: NativeDate;
        action?: string | null | undefined;
        user_id?: mongoose.Types.ObjectId | null | undefined;
    }>;
    last_active: NativeDate;
    email?: string | null | undefined;
    owner_id?: mongoose.Types.ObjectId | null | undefined;
    shared_link?: string | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    created_at: NativeDate;
    workspace_id: string;
    bookmarks: mongoose.Types.DocumentArray<{
        saved_at: NativeDate;
        place_id?: string | null | undefined;
        notes?: string | null | undefined;
        place_name?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
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
    saved_insights: mongoose.Types.DocumentArray<{
        type: "observation" | "opportunity" | "consultant_chat" | "business_sim";
        saved_at: NativeDate;
        title?: string | null | undefined;
        content?: any;
        source_place_id?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
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
    saved_comparisons: mongoose.Types.DocumentArray<{
        saved_at: NativeDate;
        place_ids: string[];
        title?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        saved_at: NativeDate;
        place_ids: string[];
        title?: string | null | undefined;
    }> & {
        saved_at: NativeDate;
        place_ids: string[];
        title?: string | null | undefined;
    }>;
    collaborators: mongoose.Types.DocumentArray<{
        role: "owner" | "editor" | "viewer";
        user_id: mongoose.Types.ObjectId;
        added_at: NativeDate;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        role: "owner" | "editor" | "viewer";
        user_id: mongoose.Types.ObjectId;
        added_at: NativeDate;
    }> & {
        role: "owner" | "editor" | "viewer";
        user_id: mongoose.Types.ObjectId;
        added_at: NativeDate;
    }>;
    visibility: "private" | "team" | "public";
    activity_log: mongoose.Types.DocumentArray<{
        timestamp: NativeDate;
        action?: string | null | undefined;
        user_id?: mongoose.Types.ObjectId | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        timestamp: NativeDate;
        action?: string | null | undefined;
        user_id?: mongoose.Types.ObjectId | null | undefined;
    }> & {
        timestamp: NativeDate;
        action?: string | null | undefined;
        user_id?: mongoose.Types.ObjectId | null | undefined;
    }>;
    last_active: NativeDate;
    email?: string | null | undefined;
    owner_id?: mongoose.Types.ObjectId | null | undefined;
    shared_link?: string | null | undefined;
}, {}, mongoose.DefaultSchemaOptions> & {
    created_at: NativeDate;
    workspace_id: string;
    bookmarks: mongoose.Types.DocumentArray<{
        saved_at: NativeDate;
        place_id?: string | null | undefined;
        notes?: string | null | undefined;
        place_name?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
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
    saved_insights: mongoose.Types.DocumentArray<{
        type: "observation" | "opportunity" | "consultant_chat" | "business_sim";
        saved_at: NativeDate;
        title?: string | null | undefined;
        content?: any;
        source_place_id?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
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
    saved_comparisons: mongoose.Types.DocumentArray<{
        saved_at: NativeDate;
        place_ids: string[];
        title?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        saved_at: NativeDate;
        place_ids: string[];
        title?: string | null | undefined;
    }> & {
        saved_at: NativeDate;
        place_ids: string[];
        title?: string | null | undefined;
    }>;
    collaborators: mongoose.Types.DocumentArray<{
        role: "owner" | "editor" | "viewer";
        user_id: mongoose.Types.ObjectId;
        added_at: NativeDate;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        role: "owner" | "editor" | "viewer";
        user_id: mongoose.Types.ObjectId;
        added_at: NativeDate;
    }> & {
        role: "owner" | "editor" | "viewer";
        user_id: mongoose.Types.ObjectId;
        added_at: NativeDate;
    }>;
    visibility: "private" | "team" | "public";
    activity_log: mongoose.Types.DocumentArray<{
        timestamp: NativeDate;
        action?: string | null | undefined;
        user_id?: mongoose.Types.ObjectId | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        timestamp: NativeDate;
        action?: string | null | undefined;
        user_id?: mongoose.Types.ObjectId | null | undefined;
    }> & {
        timestamp: NativeDate;
        action?: string | null | undefined;
        user_id?: mongoose.Types.ObjectId | null | undefined;
    }>;
    last_active: NativeDate;
    email?: string | null | undefined;
    owner_id?: mongoose.Types.ObjectId | null | undefined;
    shared_link?: string | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    created_at: NativeDate;
    workspace_id: string;
    bookmarks: mongoose.Types.DocumentArray<{
        saved_at: NativeDate;
        place_id?: string | null | undefined;
        notes?: string | null | undefined;
        place_name?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
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
    saved_insights: mongoose.Types.DocumentArray<{
        type: "observation" | "opportunity" | "consultant_chat" | "business_sim";
        saved_at: NativeDate;
        title?: string | null | undefined;
        content?: any;
        source_place_id?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
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
    saved_comparisons: mongoose.Types.DocumentArray<{
        saved_at: NativeDate;
        place_ids: string[];
        title?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        saved_at: NativeDate;
        place_ids: string[];
        title?: string | null | undefined;
    }> & {
        saved_at: NativeDate;
        place_ids: string[];
        title?: string | null | undefined;
    }>;
    collaborators: mongoose.Types.DocumentArray<{
        role: "owner" | "editor" | "viewer";
        user_id: mongoose.Types.ObjectId;
        added_at: NativeDate;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        role: "owner" | "editor" | "viewer";
        user_id: mongoose.Types.ObjectId;
        added_at: NativeDate;
    }> & {
        role: "owner" | "editor" | "viewer";
        user_id: mongoose.Types.ObjectId;
        added_at: NativeDate;
    }>;
    visibility: "private" | "team" | "public";
    activity_log: mongoose.Types.DocumentArray<{
        timestamp: NativeDate;
        action?: string | null | undefined;
        user_id?: mongoose.Types.ObjectId | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        timestamp: NativeDate;
        action?: string | null | undefined;
        user_id?: mongoose.Types.ObjectId | null | undefined;
    }> & {
        timestamp: NativeDate;
        action?: string | null | undefined;
        user_id?: mongoose.Types.ObjectId | null | undefined;
    }>;
    last_active: NativeDate;
    email?: string | null | undefined;
    owner_id?: mongoose.Types.ObjectId | null | undefined;
    shared_link?: string | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    created_at: NativeDate;
    workspace_id: string;
    bookmarks: mongoose.Types.DocumentArray<{
        saved_at: NativeDate;
        place_id?: string | null | undefined;
        notes?: string | null | undefined;
        place_name?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
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
    saved_insights: mongoose.Types.DocumentArray<{
        type: "observation" | "opportunity" | "consultant_chat" | "business_sim";
        saved_at: NativeDate;
        title?: string | null | undefined;
        content?: any;
        source_place_id?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
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
    saved_comparisons: mongoose.Types.DocumentArray<{
        saved_at: NativeDate;
        place_ids: string[];
        title?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        saved_at: NativeDate;
        place_ids: string[];
        title?: string | null | undefined;
    }> & {
        saved_at: NativeDate;
        place_ids: string[];
        title?: string | null | undefined;
    }>;
    collaborators: mongoose.Types.DocumentArray<{
        role: "owner" | "editor" | "viewer";
        user_id: mongoose.Types.ObjectId;
        added_at: NativeDate;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        role: "owner" | "editor" | "viewer";
        user_id: mongoose.Types.ObjectId;
        added_at: NativeDate;
    }> & {
        role: "owner" | "editor" | "viewer";
        user_id: mongoose.Types.ObjectId;
        added_at: NativeDate;
    }>;
    visibility: "private" | "team" | "public";
    activity_log: mongoose.Types.DocumentArray<{
        timestamp: NativeDate;
        action?: string | null | undefined;
        user_id?: mongoose.Types.ObjectId | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        timestamp: NativeDate;
        action?: string | null | undefined;
        user_id?: mongoose.Types.ObjectId | null | undefined;
    }> & {
        timestamp: NativeDate;
        action?: string | null | undefined;
        user_id?: mongoose.Types.ObjectId | null | undefined;
    }>;
    last_active: NativeDate;
    email?: string | null | undefined;
    owner_id?: mongoose.Types.ObjectId | null | undefined;
    shared_link?: string | null | undefined;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    created_at: NativeDate;
    workspace_id: string;
    bookmarks: mongoose.Types.DocumentArray<{
        saved_at: NativeDate;
        place_id?: string | null | undefined;
        notes?: string | null | undefined;
        place_name?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
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
    saved_insights: mongoose.Types.DocumentArray<{
        type: "observation" | "opportunity" | "consultant_chat" | "business_sim";
        saved_at: NativeDate;
        title?: string | null | undefined;
        content?: any;
        source_place_id?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
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
    saved_comparisons: mongoose.Types.DocumentArray<{
        saved_at: NativeDate;
        place_ids: string[];
        title?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        saved_at: NativeDate;
        place_ids: string[];
        title?: string | null | undefined;
    }> & {
        saved_at: NativeDate;
        place_ids: string[];
        title?: string | null | undefined;
    }>;
    collaborators: mongoose.Types.DocumentArray<{
        role: "owner" | "editor" | "viewer";
        user_id: mongoose.Types.ObjectId;
        added_at: NativeDate;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        role: "owner" | "editor" | "viewer";
        user_id: mongoose.Types.ObjectId;
        added_at: NativeDate;
    }> & {
        role: "owner" | "editor" | "viewer";
        user_id: mongoose.Types.ObjectId;
        added_at: NativeDate;
    }>;
    visibility: "private" | "team" | "public";
    activity_log: mongoose.Types.DocumentArray<{
        timestamp: NativeDate;
        action?: string | null | undefined;
        user_id?: mongoose.Types.ObjectId | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        timestamp: NativeDate;
        action?: string | null | undefined;
        user_id?: mongoose.Types.ObjectId | null | undefined;
    }> & {
        timestamp: NativeDate;
        action?: string | null | undefined;
        user_id?: mongoose.Types.ObjectId | null | undefined;
    }>;
    last_active: NativeDate;
    email?: string | null | undefined;
    owner_id?: mongoose.Types.ObjectId | null | undefined;
    shared_link?: string | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
import mongoose from 'mongoose';
//# sourceMappingURL=Workspace.d.ts.map