export default Contribution;
declare const Contribution: mongoose.Model<{
    type: "evidence" | "problem" | "observation";
    place_id: string;
    created_at: NativeDate;
    contributor_id: mongoose.Types.ObjectId;
    status: "pending" | "approved" | "rejected";
    upvotes: number;
    flags: number;
    data?: {
        tags: string[];
        title?: string | null | undefined;
        location?: {
            lat?: number | null | undefined;
            lng?: number | null | undefined;
        } | null | undefined;
        body?: string | null | undefined;
        media_url?: string | null | undefined;
    } | null | undefined;
    moderation_details?: {
        message?: string | null | undefined;
        moderated_by?: string | null | undefined;
        moderated_at?: NativeDate | null | undefined;
    } | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    type: "evidence" | "problem" | "observation";
    place_id: string;
    created_at: NativeDate;
    contributor_id: mongoose.Types.ObjectId;
    status: "pending" | "approved" | "rejected";
    upvotes: number;
    flags: number;
    data?: {
        tags: string[];
        title?: string | null | undefined;
        location?: {
            lat?: number | null | undefined;
            lng?: number | null | undefined;
        } | null | undefined;
        body?: string | null | undefined;
        media_url?: string | null | undefined;
    } | null | undefined;
    moderation_details?: {
        message?: string | null | undefined;
        moderated_by?: string | null | undefined;
        moderated_at?: NativeDate | null | undefined;
    } | null | undefined;
}, {}, mongoose.DefaultSchemaOptions> & {
    type: "evidence" | "problem" | "observation";
    place_id: string;
    created_at: NativeDate;
    contributor_id: mongoose.Types.ObjectId;
    status: "pending" | "approved" | "rejected";
    upvotes: number;
    flags: number;
    data?: {
        tags: string[];
        title?: string | null | undefined;
        location?: {
            lat?: number | null | undefined;
            lng?: number | null | undefined;
        } | null | undefined;
        body?: string | null | undefined;
        media_url?: string | null | undefined;
    } | null | undefined;
    moderation_details?: {
        message?: string | null | undefined;
        moderated_by?: string | null | undefined;
        moderated_at?: NativeDate | null | undefined;
    } | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    type: "evidence" | "problem" | "observation";
    place_id: string;
    created_at: NativeDate;
    contributor_id: mongoose.Types.ObjectId;
    status: "pending" | "approved" | "rejected";
    upvotes: number;
    flags: number;
    data?: {
        tags: string[];
        title?: string | null | undefined;
        location?: {
            lat?: number | null | undefined;
            lng?: number | null | undefined;
        } | null | undefined;
        body?: string | null | undefined;
        media_url?: string | null | undefined;
    } | null | undefined;
    moderation_details?: {
        message?: string | null | undefined;
        moderated_by?: string | null | undefined;
        moderated_at?: NativeDate | null | undefined;
    } | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    type: "evidence" | "problem" | "observation";
    place_id: string;
    created_at: NativeDate;
    contributor_id: mongoose.Types.ObjectId;
    status: "pending" | "approved" | "rejected";
    upvotes: number;
    flags: number;
    data?: {
        tags: string[];
        title?: string | null | undefined;
        location?: {
            lat?: number | null | undefined;
            lng?: number | null | undefined;
        } | null | undefined;
        body?: string | null | undefined;
        media_url?: string | null | undefined;
    } | null | undefined;
    moderation_details?: {
        message?: string | null | undefined;
        moderated_by?: string | null | undefined;
        moderated_at?: NativeDate | null | undefined;
    } | null | undefined;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    type: "evidence" | "problem" | "observation";
    place_id: string;
    created_at: NativeDate;
    contributor_id: mongoose.Types.ObjectId;
    status: "pending" | "approved" | "rejected";
    upvotes: number;
    flags: number;
    data?: {
        tags: string[];
        title?: string | null | undefined;
        location?: {
            lat?: number | null | undefined;
            lng?: number | null | undefined;
        } | null | undefined;
        body?: string | null | undefined;
        media_url?: string | null | undefined;
    } | null | undefined;
    moderation_details?: {
        message?: string | null | undefined;
        moderated_by?: string | null | undefined;
        moderated_at?: NativeDate | null | undefined;
    } | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
import mongoose from 'mongoose';
//# sourceMappingURL=Contribution.d.ts.map