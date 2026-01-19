export function createApiKey(name: any, permissions?: string[]): Promise<import("mongoose").Document<unknown, {}, {
    name: string;
    key: string;
    permissions: ("read:places" | "read:geo" | "read:all")[];
    rate_limit: number;
    usage_count: number;
    is_active: boolean;
    last_used?: NativeDate | null | undefined;
    expires_at?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps, {}, {
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
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export function validateApiKey(key: any): Promise<(import("mongoose").Document<unknown, {}, {
    name: string;
    key: string;
    permissions: ("read:places" | "read:geo" | "read:all")[];
    rate_limit: number;
    usage_count: number;
    is_active: boolean;
    last_used?: NativeDate | null | undefined;
    expires_at?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps, {}, {
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
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}) | null>;
export function listApiKeys(): Promise<(import("mongoose").Document<unknown, {}, {
    name: string;
    key: string;
    permissions: ("read:places" | "read:geo" | "read:all")[];
    rate_limit: number;
    usage_count: number;
    is_active: boolean;
    last_used?: NativeDate | null | undefined;
    expires_at?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps, {}, {
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
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
})[]>;
export function revokeApiKey(id: any): Promise<(import("mongoose").Document<unknown, {}, {
    name: string;
    key: string;
    permissions: ("read:places" | "read:geo" | "read:all")[];
    rate_limit: number;
    usage_count: number;
    is_active: boolean;
    last_used?: NativeDate | null | undefined;
    expires_at?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps, {}, {
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
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}) | null>;
//# sourceMappingURL=apiKeyService.d.ts.map