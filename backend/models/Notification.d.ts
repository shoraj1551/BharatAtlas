declare const _default: mongoose.Model<{
    type: "system" | "data_update" | "workspace_invite" | "new_feature" | "collaboration";
    message: string;
    title: string;
    created_at: NativeDate;
    read: boolean;
    user_id: mongoose.Types.ObjectId;
    link?: string | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    type: "system" | "data_update" | "workspace_invite" | "new_feature" | "collaboration";
    message: string;
    title: string;
    created_at: NativeDate;
    read: boolean;
    user_id: mongoose.Types.ObjectId;
    link?: string | null | undefined;
}, {}, mongoose.DefaultSchemaOptions> & {
    type: "system" | "data_update" | "workspace_invite" | "new_feature" | "collaboration";
    message: string;
    title: string;
    created_at: NativeDate;
    read: boolean;
    user_id: mongoose.Types.ObjectId;
    link?: string | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    type: "system" | "data_update" | "workspace_invite" | "new_feature" | "collaboration";
    message: string;
    title: string;
    created_at: NativeDate;
    read: boolean;
    user_id: mongoose.Types.ObjectId;
    link?: string | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    type: "system" | "data_update" | "workspace_invite" | "new_feature" | "collaboration";
    message: string;
    title: string;
    created_at: NativeDate;
    read: boolean;
    user_id: mongoose.Types.ObjectId;
    link?: string | null | undefined;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    type: "system" | "data_update" | "workspace_invite" | "new_feature" | "collaboration";
    message: string;
    title: string;
    created_at: NativeDate;
    read: boolean;
    user_id: mongoose.Types.ObjectId;
    link?: string | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
import mongoose from 'mongoose';
//# sourceMappingURL=Notification.d.ts.map