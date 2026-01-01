/**
 * Opportunity Model
 * 
 * Represents an AI-identified entrepreneurial opportunity derived from 
 * clustered local signals (complaints, discussions, reports).
 */

import mongoose from 'mongoose'

const OpportunitySchema = new mongoose.Schema({
    place_id: {
        type: String,
        required: true,
        index: true
    },

    // Sector classification (e.g., "Agri-Tech", "Logistics", "Retail")
    sector: {
        type: String,
        required: true,
        index: true
    },

    // The Insight
    signal: {
        title: { type: String, required: true },
        description: { type: String, required: true },
        type: {
            type: String,
            enum: ['Gap', 'Trend', 'Pain Point', 'Underserved Market'],
            required: true
        },
        confidence_score: {
            type: Number,
            min: 0,
            max: 100,
            default: 0
        }
    },

    // Evidence Traceability (Crucial for trust)
    evidence: [{
        snippet: String, // The raw text match
        source: String,  // e.g., "Local Farmer Forum"
        date: { type: Date, default: Date.now }
    }],

    // AI Recommendations
    recommended_business_models: [String],

    created_at: {
        type: Date,
        default: Date.now
    }
})

// Index for efficient retrieval by place
OpportunitySchema.index({ place_id: 1, 'signal.confidence_score': -1 })

const Opportunity = mongoose.model('Opportunity', OpportunitySchema)

export default Opportunity
