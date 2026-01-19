export default PlaceHistory;
declare const PlaceHistory: mongoose.Model<{
    place_id: string;
    action: "create" | "update" | "verify" | "correction";
    changes: mongoose.Types.DocumentArray<{
        field?: string | null | undefined;
        old_value?: any;
        new_value?: any;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        field?: string | null | undefined;
        old_value?: any;
        new_value?: any;
    }> & {
        field?: string | null | undefined;
        old_value?: any;
        new_value?: any;
    }>;
    timestamp: NativeDate;
    actor?: {
        name: string;
        role: "admin" | "system" | "moderator" | "contributor";
        verification_level: string;
    } | null | undefined;
    metadata?: {
        source_citation?: string | null | undefined;
        source_url?: string | null | undefined;
        verification_method?: string | null | undefined;
        notes?: string | null | undefined;
    } | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    place_id: string;
    action: "create" | "update" | "verify" | "correction";
    changes: mongoose.Types.DocumentArray<{
        field?: string | null | undefined;
        old_value?: any;
        new_value?: any;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        field?: string | null | undefined;
        old_value?: any;
        new_value?: any;
    }> & {
        field?: string | null | undefined;
        old_value?: any;
        new_value?: any;
    }>;
    timestamp: NativeDate;
    actor?: {
        name: string;
        role: "admin" | "system" | "moderator" | "contributor";
        verification_level: string;
    } | null | undefined;
    metadata?: {
        source_citation?: string | null | undefined;
        source_url?: string | null | undefined;
        verification_method?: string | null | undefined;
        notes?: string | null | undefined;
    } | null | undefined;
}, {}, mongoose.DefaultSchemaOptions> & {
    place_id: string;
    action: "create" | "update" | "verify" | "correction";
    changes: mongoose.Types.DocumentArray<{
        field?: string | null | undefined;
        old_value?: any;
        new_value?: any;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        field?: string | null | undefined;
        old_value?: any;
        new_value?: any;
    }> & {
        field?: string | null | undefined;
        old_value?: any;
        new_value?: any;
    }>;
    timestamp: NativeDate;
    actor?: {
        name: string;
        role: "admin" | "system" | "moderator" | "contributor";
        verification_level: string;
    } | null | undefined;
    metadata?: {
        source_citation?: string | null | undefined;
        source_url?: string | null | undefined;
        verification_method?: string | null | undefined;
        notes?: string | null | undefined;
    } | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    place_id: string;
    action: "create" | "update" | "verify" | "correction";
    changes: mongoose.Types.DocumentArray<{
        field?: string | null | undefined;
        old_value?: any;
        new_value?: any;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        field?: string | null | undefined;
        old_value?: any;
        new_value?: any;
    }> & {
        field?: string | null | undefined;
        old_value?: any;
        new_value?: any;
    }>;
    timestamp: NativeDate;
    actor?: {
        name: string;
        role: "admin" | "system" | "moderator" | "contributor";
        verification_level: string;
    } | null | undefined;
    metadata?: {
        source_citation?: string | null | undefined;
        source_url?: string | null | undefined;
        verification_method?: string | null | undefined;
        notes?: string | null | undefined;
    } | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    place_id: string;
    action: "create" | "update" | "verify" | "correction";
    changes: mongoose.Types.DocumentArray<{
        field?: string | null | undefined;
        old_value?: any;
        new_value?: any;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        field?: string | null | undefined;
        old_value?: any;
        new_value?: any;
    }> & {
        field?: string | null | undefined;
        old_value?: any;
        new_value?: any;
    }>;
    timestamp: NativeDate;
    actor?: {
        name: string;
        role: "admin" | "system" | "moderator" | "contributor";
        verification_level: string;
    } | null | undefined;
    metadata?: {
        source_citation?: string | null | undefined;
        source_url?: string | null | undefined;
        verification_method?: string | null | undefined;
        notes?: string | null | undefined;
    } | null | undefined;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    place_id: string;
    action: "create" | "update" | "verify" | "correction";
    changes: mongoose.Types.DocumentArray<{
        field?: string | null | undefined;
        old_value?: any;
        new_value?: any;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        field?: string | null | undefined;
        old_value?: any;
        new_value?: any;
    }> & {
        field?: string | null | undefined;
        old_value?: any;
        new_value?: any;
    }>;
    timestamp: NativeDate;
    actor?: {
        name: string;
        role: "admin" | "system" | "moderator" | "contributor";
        verification_level: string;
    } | null | undefined;
    metadata?: {
        source_citation?: string | null | undefined;
        source_url?: string | null | undefined;
        verification_method?: string | null | undefined;
        notes?: string | null | undefined;
    } | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
import mongoose from 'mongoose';
//# sourceMappingURL=PlaceHistory.d.ts.map