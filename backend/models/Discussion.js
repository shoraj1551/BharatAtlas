/**
 * Discussion Model
 * 
 * Stores community discussions and threads
 */

import mongoose from 'mongoose'

const ReplySchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true,
        trim: true,
        maxLength: 1000
    },
    created_at: { type: Date, default: Date.now }
})

const DiscussionSchema = new mongoose.Schema({
    place_id: {
        type: String,
        required: true,
        index: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    topic: {
        type: String,
        required: true,
        trim: true,
        maxLength: 200
    },
    content: {
        type: String,
        required: true,
        trim: true,
        maxLength: 2000
    },
    replies: [ReplySchema],
    tags: [String],
    views: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
})

export default mongoose.model('Discussion', DiscussionSchema)
