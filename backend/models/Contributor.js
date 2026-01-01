/**
 * Contributor Model
 * 
 * Tracks the credibility and reputation of community members who submit local knowledge.
 */

import mongoose from 'mongoose'

const ContributorSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },

    // Simple identifier for now (can be expanded to auth ID later)
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    // Credibility Metrics
    reputation_score: {
        type: Number,
        default: 0
    },

    level: {
        type: String,
        enum: ['Novice', 'Local Guide', 'Guardian', 'Admin'],
        default: 'Novice'
    },

    badges: [String], // e.g., ["Foodie", "Historian", "Photographer"]

    total_contributions: {
        type: Number,
        default: 0
    },

    joined_at: {
        type: Date,
        default: Date.now
    }
})

// Index for ranking
ContributorSchema.index({ reputation_score: -1 })

const Contributor = mongoose.model('Contributor', ContributorSchema)

export default Contributor
