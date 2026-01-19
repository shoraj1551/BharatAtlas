/**
 * Review Model
 * 
 * Stores user reviews and ratings for places
 */

import mongoose from 'mongoose'

const ReviewSchema = new mongoose.Schema({
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
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100
    },
    content: {
        type: String,
        required: true,
        trim: true,
        maxLength: 2000
    },
    photos: [String],
    helpful: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
})

// Compound index for unique user review per place
ReviewSchema.index({ place_id: 1, user_id: 1 }, { unique: true })

export default mongoose.model('Review', ReviewSchema)
