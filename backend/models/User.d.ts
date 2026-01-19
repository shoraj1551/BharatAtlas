declare const _default: mongoose.Model<{
    name: string;
    email: string;
    password_hash: string;
    avatar_url?: string | null | undefined;
    last_login?: NativeDate | null | undefined;
    preferences?: {
        language: string;
        theme: string;
        notifications_enabled: boolean;
    } | null | undefined;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    name: string;
    email: string;
    password_hash: string;
    avatar_url?: string | null | undefined;
    last_login?: NativeDate | null | undefined;
    preferences?: {
        language: string;
        theme: string;
        notifications_enabled: boolean;
    } | null | undefined;
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    name: string;
    email: string;
    password_hash: string;
    avatar_url?: string | null | undefined;
    last_login?: NativeDate | null | undefined;
    preferences?: {
        language: string;
        theme: string;
        notifications_enabled: boolean;
    } | null | undefined;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    name: string;
    email: string;
    password_hash: string;
    avatar_url?: string | null | undefined;
    last_login?: NativeDate | null | undefined;
    preferences?: {
        language: string;
        theme: string;
        notifications_enabled: boolean;
    } | null | undefined;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    name: string;
    email: string;
    password_hash: string;
    avatar_url?: string | null | undefined;
    last_login?: NativeDate | null | undefined;
    preferences?: {
        language: string;
        theme: string;
        notifications_enabled: boolean;
    } | null | undefined;
} & mongoose.DefaultTimestampProps>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    name: string;
    email: string;
    password_hash: string;
    avatar_url?: string | null | undefined;
    last_login?: NativeDate | null | undefined;
    preferences?: {
        language: string;
        theme: string;
        notifications_enabled: boolean;
    } | null | undefined;
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
import mongoose from 'mongoose';
//# sourceMappingURL=User.d.ts.map