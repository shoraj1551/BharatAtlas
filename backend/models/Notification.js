/**
 * Notification Model
 * 
 * Stores user notifications for in-app delivery
 */

import mongoose from 'mongoose'

const NotificationSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    type: {
        type: String,
        enum: ['data_update', 'workspace_invite', 'new_feature', 'system', 'collaboration'],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    link: String,
    read: {
        type: Boolean,
        default: false
    },
    created_at: { type: Date, default: Date.now }
})

// Index for efficient queries
NotificationSchema.index({ user_id: 1, read: 1, created_at: -1 })

export default mongoose.model('Notification', NotificationSchema)
