/**
 * Enhanced Place Model for MongoDB
 * 
 * Comprehensive schema supporting all BharatAtlas features
 */

import mongoose from 'mongoose'

const PlaceSchema = new mongoose.Schema({
    // Basic Information
    place_id: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    canonical_name: {
        type: String,
        required: true,
        index: true
    },
    place_type: {
        type: String,
        required: true,
        enum: ['state', 'district', 'city'],
        index: true
    },

    // Geographic Data
    area_sq_km: Number,
    population_density: Number,

    // Demographics (Census 2011)
    population: {
        value: Number,
        year: { type: Number, default: 2011 },
        source: { type: String, default: 'Census 2011' }
    },
    literacy_rate: {
        value: Number,
        male: Number,
        female: Number,
        year: { type: Number, default: 2011 },
        source: { type: String, default: 'Census 2011' }
    },

    // Historical Census Data
    historical_data: {
        census_2001: {
            population: Number,
            literacy_rate: Number
        },
        census_1991: {
            population: Number,
            literacy_rate: Number
        }
    },

    // Economic Indicators
    economic_data: {
        gdp: Number, // in crores
        per_capita_income: Number, // in rupees
        unemployment_rate: Number, // percentage
        growth_rate: Number, // percentage
        industry_breakdown: {
            agriculture: Number, // percentage
            manufacturing: Number, // percentage
            services: Number // percentage
        },
        last_updated: Date
    },

    // Infrastructure Metrics
    infrastructure: {
        road_density: Number, // km per 100 sq km
        railway_stations: Number,
        airports: Number,
        internet_penetration: Number, // percentage
        electricity_access: Number, // percentage
        infrastructure_score: Number, // 0-100
        last_updated: Date
    },

    // Health & Education
    health_education: {
        // Health metrics
        hospitals_per_100k: Number,
        doctors_per_100k: Number,
        hospital_beds_per_100k: Number,
        health_index: Number, // 0-100

        // Education metrics
        schools_per_100k: Number,
        teachers_per_100k: Number,
        student_teacher_ratio: Number,
        education_index: Number, // 0-100

        last_updated: Date
    },

    // Climate & Environment
    climate_environment: {
        avg_temperature: Number, // celsius
        annual_rainfall: Number, // mm
        forest_cover_percent: Number,
        air_quality_index: Number, // 0-500
        environmental_score: Number, // 0-100
        last_updated: Date
    },

    // Water Resources (NEW)
    water_resources: {
        annual_rainfall_mm: Number,
        groundwater_level: String, // 'Abundant', 'Moderate', 'Scarce'
        major_water_bodies: [String],
        irrigation_coverage_percent: Number,
        water_quality: String // 'Excellent', 'Good', 'Fair', 'Poor'
    },

    // Industries
    major_industries: [String],

    // Governance & Administration (Civic Intelligence)
    governance: {
        // 1. Administration (The Offices)
        administration: {
            district_magistrate: {
                name: String,
                office_address: String,
                contact: String
            },
            police_superintendent: {
                name: String,
                office_address: String,
                contact: String
            }
        },

        // 2. Elected Representatives (The People)
        representatives: {
            mp: {
                name: String,
                constituency: String,
                party: String,
                term_end: Date
            },
            mla: {
                name: String,
                constituency: String,
                party: String,
                term_end: Date
            },
            local_body_head: {
                title: String,
                name: String
            }
        },

        // 3. Public Institutions (The Locations)
        public_offices: [{
            name: String,
            type: {
                type: String,
                enum: ['judiciary', 'police', 'administrative', 'medical', 'other']
            },
            address: String,
            location: {
                lat: Number,
                lng: Number
            }
        }],

        // Legacy Compatibility
        administrative_head: String,
        lok_sabha_seats: Number,
        vidhan_sabha_seats: Number,
        local_bodies: [String],
        government_schemes: [String],

        // Metadata
        last_updated: Date,
        data_source: String
    },

    // Cultural & Social Context (Market Intelligence)
    culture_society: {
        // 1. Communication (The Market Voice)
        languages: {
            official: [String],
            spoken: [String],
            business_preferred: String
        },

        // 2. Consumption Habits (The Palate)
        cuisine: {
            staple_diet: String,
            dietary_restrictions: String, // e.g., "Vegetarian prevalent"
            famous_dishes: [String]
        },

        // 3. Social Rhythm (The Business Calendar)
        festivals: [{
            name: String,
            significance: String,
            business_impact: String, // e.g., "High retail volume"
            month: String
        }],

        // 4. Social Norms (Etiquette)
        social_norms: {
            greetings: String,
            business_etiquette: String,
            taboos: [String]
        },

        // 5. Entrepreneurial Guide
        market_adaptation_tips: [String],

        // Legacy Compatibility
        heritage_sites: [{
            name: String,
            type: String,
            description: String
        }],
        traditional_arts: [String]
    },

    // Hierarchy
    parent_id: {
        type: String,
        index: true
    },
    children_ids: [String],

    // Metadata
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    data_quality: {
        type: String,
        enum: ['sample', 'verified', 'official'],
        default: 'sample'
    }
}, {
    timestamps: true,
    collection: 'places'
})

// Indexes for performance
PlaceSchema.index({ place_type: 1, canonical_name: 1 })
PlaceSchema.index({ parent_id: 1 })
PlaceSchema.index({ 'population.value': -1 })
PlaceSchema.index({ 'literacy_rate.value': -1 })

// Virtual for full hierarchy path
PlaceSchema.virtual('hierarchy_path').get(function () {
    return `${this.place_type}/${this.canonical_name}`
})

// Method to update timestamp
PlaceSchema.pre('save', function (next) {
    this.updated_at = new Date()
    next()
})

// Export model
const Place = mongoose.model('Place', PlaceSchema)

export default Place
