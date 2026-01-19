declare const _default: mongoose.Model<{
    place_id: string;
    title: string;
    created_at: NativeDate;
    updated_at: NativeDate;
    user_id: mongoose.Types.ObjectId;
    rating: number;
    content: string;
    photos: string[];
    helpful: mongoose.Types.ObjectId[];
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    place_id: string;
    title: string;
    created_at: NativeDate;
    updated_at: NativeDate;
    user_id: mongoose.Types.ObjectId;
    rating: number;
    content: string;
    photos: string[];
    helpful: mongoose.Types.ObjectId[];
}, {}, mongoose.DefaultSchemaOptions> & {
    place_id: string;
    title: string;
    created_at: NativeDate;
    updated_at: NativeDate;
    user_id: mongoose.Types.ObjectId;
    rating: number;
    content: string;
    photos: string[];
    helpful: mongoose.Types.ObjectId[];
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    place_id: string;
    title: string;
    created_at: NativeDate;
    updated_at: NativeDate;
    user_id: mongoose.Types.ObjectId;
    rating: number;
    content: string;
    photos: string[];
    helpful: mongoose.Types.ObjectId[];
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    place_id: string;
    title: string;
    created_at: NativeDate;
    updated_at: NativeDate;
    user_id: mongoose.Types.ObjectId;
    rating: number;
    content: string;
    photos: string[];
    helpful: mongoose.Types.ObjectId[];
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    place_id: string;
    title: string;
    created_at: NativeDate;
    updated_at: NativeDate;
    user_id: mongoose.Types.ObjectId;
    rating: number;
    content: string;
    photos: string[];
    helpful: mongoose.Types.ObjectId[];
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
import mongoose from 'mongoose';
//# sourceMappingURL=Review.d.ts.map