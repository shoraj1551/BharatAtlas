export function registerUser(name: any, email: any, password: any): Promise<{
    _id: import("mongoose").Types.ObjectId;
    name: string;
    email: string;
    avatar_url: string | null | undefined;
    token: string;
}>;
export function loginUser(email: any, password: any): Promise<{
    _id: import("mongoose").Types.ObjectId;
    name: string;
    email: string;
    avatar_url: string | null | undefined;
    preferences: {
        language: string;
        theme: string;
        notifications_enabled: boolean;
    } | null | undefined;
    token: string;
}>;
export function getUserProfile(userId: any): Promise<import("mongoose").Document<unknown, {}, {
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
} & import("mongoose").DefaultTimestampProps, {}, {
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
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export function updateUserProfile(userId: any, data: any): Promise<{
    _id: import("mongoose").Types.ObjectId;
    name: string;
    email: string;
    avatar_url: string | null | undefined;
    preferences: {
        language: string;
        theme: string;
        notifications_enabled: boolean;
    } | null | undefined;
    token: string;
}>;
//# sourceMappingURL=authService.d.ts.map