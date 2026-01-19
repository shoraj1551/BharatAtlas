declare const _default: mongoose.Model<{
    name: string;
    key: string;
    permissions: ("read:places" | "read:geo" | "read:all")[];
    rate_limit: number;
    usage_count: number;
    is_active: boolean;
    last_used?: NativeDate | null | undefined;
    expires_at?: NativeDate | null | undefined;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    name: string;
    key: string;
    permissions: ("read:places" | "read:geo" | "read:all")[];
    rate_limit: number;
    usage_count: number;
    is_active: boolean;
    last_used?: NativeDate | null | undefined;
    expires_at?: NativeDate | null | undefined;
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    name: string;
    key: string;
    permissions: ("read:places" | "read:geo" | "read:all")[];
    rate_limit: number;
    usage_count: number;
    is_active: boolean;
    last_used?: NativeDate | null | undefined;
    expires_at?: NativeDate | null | undefined;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    name: string;
    key: string;
    permissions: ("read:places" | "read:geo" | "read:all")[];
    rate_limit: number;
    usage_count: number;
    is_active: boolean;
    last_used?: NativeDate | null | undefined;
    expires_at?: NativeDate | null | undefined;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    name: string;
    key: string;
    permissions: ("read:places" | "read:geo" | "read:all")[];
    rate_limit: number;
    usage_count: number;
    is_active: boolean;
    last_used?: NativeDate | null | undefined;
    expires_at?: NativeDate | null | undefined;
} & mongoose.DefaultTimestampProps>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    name: string;
    key: string;
    permissions: ("read:places" | "read:geo" | "read:all")[];
    rate_limit: number;
    usage_count: number;
    is_active: boolean;
    last_used?: NativeDate | null | undefined;
    expires_at?: NativeDate | null | undefined;
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
import mongoose from 'mongoose';
//# sourceMappingURL=ApiKey.d.ts.map