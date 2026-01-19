declare const _default: mongoose.Model<{
    place_id: string;
    created_at: NativeDate;
    updated_at: NativeDate;
    tags: string[];
    user_id: mongoose.Types.ObjectId;
    content: string;
    topic: string;
    replies: mongoose.Types.DocumentArray<{
        created_at: NativeDate;
        user_id: mongoose.Types.ObjectId;
        content: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        created_at: NativeDate;
        user_id: mongoose.Types.ObjectId;
        content: string;
    }> & {
        created_at: NativeDate;
        user_id: mongoose.Types.ObjectId;
        content: string;
    }>;
    views: number;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    place_id: string;
    created_at: NativeDate;
    updated_at: NativeDate;
    tags: string[];
    user_id: mongoose.Types.ObjectId;
    content: string;
    topic: string;
    replies: mongoose.Types.DocumentArray<{
        created_at: NativeDate;
        user_id: mongoose.Types.ObjectId;
        content: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        created_at: NativeDate;
        user_id: mongoose.Types.ObjectId;
        content: string;
    }> & {
        created_at: NativeDate;
        user_id: mongoose.Types.ObjectId;
        content: string;
    }>;
    views: number;
}, {}, mongoose.DefaultSchemaOptions> & {
    place_id: string;
    created_at: NativeDate;
    updated_at: NativeDate;
    tags: string[];
    user_id: mongoose.Types.ObjectId;
    content: string;
    topic: string;
    replies: mongoose.Types.DocumentArray<{
        created_at: NativeDate;
        user_id: mongoose.Types.ObjectId;
        content: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        created_at: NativeDate;
        user_id: mongoose.Types.ObjectId;
        content: string;
    }> & {
        created_at: NativeDate;
        user_id: mongoose.Types.ObjectId;
        content: string;
    }>;
    views: number;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    place_id: string;
    created_at: NativeDate;
    updated_at: NativeDate;
    tags: string[];
    user_id: mongoose.Types.ObjectId;
    content: string;
    topic: string;
    replies: mongoose.Types.DocumentArray<{
        created_at: NativeDate;
        user_id: mongoose.Types.ObjectId;
        content: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        created_at: NativeDate;
        user_id: mongoose.Types.ObjectId;
        content: string;
    }> & {
        created_at: NativeDate;
        user_id: mongoose.Types.ObjectId;
        content: string;
    }>;
    views: number;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    place_id: string;
    created_at: NativeDate;
    updated_at: NativeDate;
    tags: string[];
    user_id: mongoose.Types.ObjectId;
    content: string;
    topic: string;
    replies: mongoose.Types.DocumentArray<{
        created_at: NativeDate;
        user_id: mongoose.Types.ObjectId;
        content: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        created_at: NativeDate;
        user_id: mongoose.Types.ObjectId;
        content: string;
    }> & {
        created_at: NativeDate;
        user_id: mongoose.Types.ObjectId;
        content: string;
    }>;
    views: number;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    place_id: string;
    created_at: NativeDate;
    updated_at: NativeDate;
    tags: string[];
    user_id: mongoose.Types.ObjectId;
    content: string;
    topic: string;
    replies: mongoose.Types.DocumentArray<{
        created_at: NativeDate;
        user_id: mongoose.Types.ObjectId;
        content: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        created_at: NativeDate;
        user_id: mongoose.Types.ObjectId;
        content: string;
    }> & {
        created_at: NativeDate;
        user_id: mongoose.Types.ObjectId;
        content: string;
    }>;
    views: number;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
import mongoose from 'mongoose';
//# sourceMappingURL=Discussion.d.ts.map