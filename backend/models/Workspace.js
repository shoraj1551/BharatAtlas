/**
 * Workspace Model
 * 
 * Stores user-specific research data: bookmarks, notes, saved insights, and comparisons.
 * Currently linked via `workspace_id` (UUID from frontend) or `email`.
 */

import mongoose from 'mongoose'

const WorkspaceSchema = new mongoose.Schema({
    // Identity
    workspace_id: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    email: {
        type: String,
        sparse: true, // Optional, but unique if present
        lowercase: true,
        trim: true
    },

    // 1. Bookmarks (Saved Places)
    bookmarks: [{
        place_id: String,
        place_name: String, // Cached for UI
        notes: String,
        saved_at: { type: Date, default: Date.now }
    }],

    // 2. Saved Insights (AI Answers / Manual Observations)
    saved_insights: [{
        type: {
            type: String,
            enum: ['opportunity', 'consultant_chat', 'business_sim', 'observation'],
            required: true
        },
        title: String, // Short header
        content: mongoose.Schema.Types.Mixed, // Flexible payload (text or JSON)
        source_place_id: String,
        saved_at: { type: Date, default: Date.now }
    }],

    // 3. Comparisons
    saved_comparisons: [{
        title: String, // e.g., "Shamli vs Muzaffarnagar"
        place_ids: [String],
        saved_at: { type: Date, default: Date.now }
    }],

    // 4. Collaboration Features (NEW - Feature 2.2)
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        sparse: true // Optional for backward compatibility
    },
    collaborators: [{
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        role: {
            type: String,
            enum: ['owner', 'editor', 'viewer'],
            default: 'viewer'
        },
        added_at: { type: Date, default: Date.now }
    }],
    visibility: {
        type: String,
        enum: ['private', 'team', 'public'],
        default: 'private'
    },
    shared_link: {
        type: String,
        unique: true,
        sparse: true
    },
    activity_log: [{
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        action: String,
        timestamp: { type: Date, default: Date.now }
    }],

    // Metadata
    created_at: { type: Date, default: Date.now },
    last_active: { type: Date, default: Date.now }
})

const Workspace = mongoose.model('Workspace', WorkspaceSchema)

export default Workspace
