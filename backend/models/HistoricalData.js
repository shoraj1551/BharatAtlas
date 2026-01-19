/**
 * Historical Data Model
 * 
 * Stores time-series data for places across census years
 */

import mongoose from 'mongoose'

const HistoricalDataSchema = new mongoose.Schema({
    place_id: {
        type: String,
        required: true,
        index: true
    },
    metric: {
        type: String,
        required: true,
        enum: ['population', 'literacy_rate', 'sex_ratio', 'urban_population', 'rural_population', 'decadal_growth']
    },
    value: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true,
        index: true
    },
    source: {
        type: String,
        required: true
    },
    created_at: { type: Date, default: Date.now }
})

// Compound index for efficient queries
HistoricalDataSchema.index({ place_id: 1, metric: 1, year: 1 })

export default mongoose.model('HistoricalData', HistoricalDataSchema)
