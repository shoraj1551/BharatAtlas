/**
 * Contribution Model
 * 
 * Stores user-generated content (Blogs, Issues, Images) with strict moderation state.
 */

import mongoose from 'mongoose'

const ContributionSchema = new mongoose.Schema({
    place_id: {
        type: String,
        required: true,
        index: true
    },

    contributor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contributor',
        required: true
    },

    type: {
        type: String,
        enum: ['problem', 'evidence', 'observation'], // Strict types: No blogs/opinions
        required: true
    },

    // Flexible payload based on type
    data: {
        title: { type: String, trim: true },
        body: String,
        media_url: String, // Link to image/video
        tags: [String],
        location: { // Optional precise geotag
            lat: Number,
            lng: Number
        }
    },

    // THE FIREWALL
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
        index: true
    },

    moderation_details: {
        moderated_by: String,
        message: String,
        moderated_at: Date
    },

    // Community Feedback
    upvotes: { type: Number, default: 0 },
    flags: { type: Number, default: 0 },

    created_at: {
        type: Date,
        default: Date.now
    }
})

// Index for fetching approved content quickly
ContributionSchema.index({ place_id: 1, status: 1, created_at: -1 })

const Contribution = mongoose.model('Contribution', ContributionSchema)

export default Contribution
