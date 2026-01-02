/**
 * PlaceHistory Model
 * 
 * Immutable audit log for all changes to Place data.
 * Enables the "Glass Box" philosophy of transparency.
 */

import mongoose from 'mongoose'

const PlaceHistorySchema = new mongoose.Schema({
    place_id: {
        type: String,
        required: true,
        index: true
    },

    // ACTION: What happened?
    action: {
        type: String,
        enum: ['create', 'update', 'verify', 'correction'],
        required: true
    },

    // ACTOR: Who did it?
    actor: {
        name: { type: String, required: true }, // e.g. "System Auto-Update" or "Amit Kumar"
        role: {
            type: String,
            enum: ['system', 'admin', 'moderator', 'contributor'],
            default: 'system'
        },
        verification_level: { type: String, default: 'Official' } // "Gold", "Silver", "Official"
    },

    // CHANGES: specific field deltas (optional for high-volume updates)
    changes: [{
        field: String, // e.g., "population.value"
        old_value: mongoose.Schema.Types.Mixed,
        new_value: mongoose.Schema.Types.Mixed
    }],

    // PROVENANCE: Why should we trust this?
    metadata: {
        source_citation: String, // e.g., "Census 2011, Table A-1"
        source_url: String,
        verification_method: String, // "Automated Cross-Check", "Manual Review"
        notes: String
    },

    timestamp: {
        type: Date,
        default: Date.now,
        index: -1 // Most recent first
    }
})

const PlaceHistory = mongoose.model('PlaceHistory', PlaceHistorySchema)

export default PlaceHistory
