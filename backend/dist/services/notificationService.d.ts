/**
 * Create a new notification
 */
export function createNotification(userId: any, type: any, title: any, message: any, link?: null): Promise<import("mongoose").Document<unknown, {}, {
    type: "system" | "data_update" | "workspace_invite" | "new_feature" | "collaboration";
    message: string;
    title: string;
    created_at: NativeDate;
    read: boolean;
    user_id: import("mongoose").Types.ObjectId;
    link?: string | null | undefined;
}, {}, import("mongoose").DefaultSchemaOptions> & {
    type: "system" | "data_update" | "workspace_invite" | "new_feature" | "collaboration";
    message: string;
    title: string;
    created_at: NativeDate;
    read: boolean;
    user_id: import("mongoose").Types.ObjectId;
    link?: string | null | undefined;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
/**
 * Get user notifications
 */
export function getUserNotifications(userId: any, unreadOnly?: boolean, limit?: number): Promise<(import("mongoose").FlattenMaps<{
    type: "system" | "data_update" | "workspace_invite" | "new_feature" | "collaboration";
    message: string;
    title: string;
    created_at: NativeDate;
    read: boolean;
    user_id: import("mongoose").Types.ObjectId;
    link?: string | null | undefined;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
})[]>;
/**
 * Mark notification as read
 */
export function markAsRead(notificationId: any, userId: any): Promise<import("mongoose").Document<unknown, {}, {
    type: "system" | "data_update" | "workspace_invite" | "new_feature" | "collaboration";
    message: string;
    title: string;
    created_at: NativeDate;
    read: boolean;
    user_id: import("mongoose").Types.ObjectId;
    link?: string | null | undefined;
}, {}, import("mongoose").DefaultSchemaOptions> & {
    type: "system" | "data_update" | "workspace_invite" | "new_feature" | "collaboration";
    message: string;
    title: string;
    created_at: NativeDate;
    read: boolean;
    user_id: import("mongoose").Types.ObjectId;
    link?: string | null | undefined;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
/**
 * Mark all notifications as read
 */
export function markAllAsRead(userId: any): Promise<import("mongoose").UpdateWriteOpResult>;
/**
 * Delete notification
 */
export function deleteNotification(notificationId: any, userId: any): Promise<import("mongoose").Document<unknown, {}, {
    type: "system" | "data_update" | "workspace_invite" | "new_feature" | "collaboration";
    message: string;
    title: string;
    created_at: NativeDate;
    read: boolean;
    user_id: import("mongoose").Types.ObjectId;
    link?: string | null | undefined;
}, {}, import("mongoose").DefaultSchemaOptions> & {
    type: "system" | "data_update" | "workspace_invite" | "new_feature" | "collaboration";
    message: string;
    title: string;
    created_at: NativeDate;
    read: boolean;
    user_id: import("mongoose").Types.ObjectId;
    link?: string | null | undefined;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
/**
 * Get unread count
 */
export function getUnreadCount(userId: any): Promise<number>;
/**
 * Notify user of workspace invite
 */
export function notifyWorkspaceInvite(userId: any, workspaceName: any, inviterName: any): Promise<import("mongoose").Document<unknown, {}, {
    type: "system" | "data_update" | "workspace_invite" | "new_feature" | "collaboration";
    message: string;
    title: string;
    created_at: NativeDate;
    read: boolean;
    user_id: import("mongoose").Types.ObjectId;
    link?: string | null | undefined;
}, {}, import("mongoose").DefaultSchemaOptions> & {
    type: "system" | "data_update" | "workspace_invite" | "new_feature" | "collaboration";
    message: string;
    title: string;
    created_at: NativeDate;
    read: boolean;
    user_id: import("mongoose").Types.ObjectId;
    link?: string | null | undefined;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
/**
 * Notify user of data update
 */
export function notifyDataUpdate(userId: any, placeName: any): Promise<import("mongoose").Document<unknown, {}, {
    type: "system" | "data_update" | "workspace_invite" | "new_feature" | "collaboration";
    message: string;
    title: string;
    created_at: NativeDate;
    read: boolean;
    user_id: import("mongoose").Types.ObjectId;
    link?: string | null | undefined;
}, {}, import("mongoose").DefaultSchemaOptions> & {
    type: "system" | "data_update" | "workspace_invite" | "new_feature" | "collaboration";
    message: string;
    title: string;
    created_at: NativeDate;
    read: boolean;
    user_id: import("mongoose").Types.ObjectId;
    link?: string | null | undefined;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=notificationService.d.ts.map