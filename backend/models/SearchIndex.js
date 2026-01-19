/**
 * Search Index Model
 * 
 * Optimized collection for advanced search with filters
 */

import mongoose from 'mongoose'

const SearchIndexSchema = new mongoose.Schema({
    place_id: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    canonical_name: {
        type: String,
        required: true
    },
    place_type: {
        type: String,
        enum: ['state', 'district', 'city', 'union territory'],
        index: true
    },
    search_vector: {
        type: String,
        index: 'text'  // Full-text search
    },
    filters: {
        population: {
            value: Number,
            range: String  // e.g., "1M-5M"
        },
        literacy_rate: {
            value: Number,
            range: String  // e.g., "70-80"
        },
        industries: [String],
        climate_type: String,
        infrastructure_score: Number,
        area_sq_km: Number,
        population_density: Number
    },
    readiness_score: {
        total: Number,
        label: String
    },
    last_indexed: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
})

// Compound indexes for common filter combinations
SearchIndexSchema.index({
    'filters.population.value': 1,
    'filters.literacy_rate.value': 1
})
SearchIndexSchema.index({
    'filters.infrastructure_score': 1,
    'readiness_score.total': 1
})

export default mongoose.model('SearchIndex', SearchIndexSchema)
