/**
 * Dashboard Model
 * 
 * Stores user-created custom dashboards with widget layouts
 */

import mongoose from 'mongoose'

const DashboardSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    name: {
        type: String,
        required: true
    },
    description: String,
    layout: [{
        widget_id: {
            type: String,
            required: true
        },
        widget_type: {
            type: String,
            enum: ['trend_chart', 'comparison', 'insight_card', 'map_view', 'top_places', 'readiness_gauge', 'industry_pie', 'growth_delta'],
            required: true
        },
        position: {
            x: { type: Number, required: true },
            y: { type: Number, required: true },
            w: { type: Number, required: true },
            h: { type: Number, required: true }
        },
        config: {
            metric: String,
            filters: mongoose.Schema.Types.Mixed,
            timeRange: String,
            placeIds: [String],
            title: String
        }
    }],
    is_public: {
        type: Boolean,
        default: false
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
})

DashboardSchema.pre('save', function (next) {
    this.updated_at = new Date()
    next()
})

export default mongoose.model('Dashboard', DashboardSchema)
