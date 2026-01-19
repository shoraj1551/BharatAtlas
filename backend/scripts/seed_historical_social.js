/**
 * Seeding Script: Historical Data & Social Features
 * 
 * Populates MongoDB with:
 * 1. Historical Census Data (2001, 2011) for key states
 * 2. Sample User Reviews & Ratings
 * 3. Sample Discussions & Threads
 */

import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { connectMongo, closeMongo } from '../src/services/mongoService.js'
import HistoricalData from '../models/HistoricalData.js'
import Review from '../models/Review.js'
import User from '../models/User.js'

dotenv.config()

// Sample Data Generators

const SAMPLE_PLACES = [
    'place_maharashtra',
    'place_up',
    'place_kerala',
    'place_mp_001',
    'place_gj_001'
]

async function seedHistoricalData() {
    console.log('⏳ Seeding Historical Data...')

    const historicalEntries = []

    // For MP (Madhya Pradesh) - Sample Data
    const mpId = 'place_mp_001'

    // Population Growth
    historicalEntries.push(
        { place_id: mpId, metric: 'population', value: 60348023, year: 2001, source: 'Census 2001' },
        { place_id: mpId, metric: 'population', value: 72626809, year: 2011, source: 'Census 2011' },
        // Projected
        { place_id: mpId, metric: 'population', value: 85000000, year: 2021, source: 'Projected' }
    )

    // Literacy Rate
    historicalEntries.push(
        { place_id: mpId, metric: 'literacy_rate', value: 63.7, year: 2001, source: 'Census 2001' },
        { place_id: mpId, metric: 'literacy_rate', value: 69.3, year: 2011, source: 'Census 2011' }
    )

    // Sex Ratio
    historicalEntries.push(
        { place_id: mpId, metric: 'sex_ratio', value: 919, year: 2001, source: 'Census 2001' },
        { place_id: mpId, metric: 'sex_ratio', value: 931, year: 2011, source: 'Census 2011' }
    )

    // Clear existing & Insert
    await HistoricalData.deleteMany({ place_id: mpId })
    await HistoricalData.insertMany(historicalEntries)

    console.log(`✅ Seeded ${historicalEntries.length} historical records for MP`)
}

async function seedSocialData() {
    console.log('⏳ Seeding Social Data (Reviews)...')

    // Find or Create a Dummy User
    let user = await User.findOne({ email: 'test@bharatatlas.com' })
    if (!user) {
        user = await User.create({
            name: 'Test Explorer',
            email: 'test@bharatatlas.com',
            password_hash: '$2b$10$YourHashedPasswordHere...', // mock hash
            role: 'user'
        })
        console.log('👤 Created test user')
    }

    const reviews = [
        // Madhya Pradesh
        {
            place_id: 'place_mp_001',
            user_id: user._id,
            rating: 5,
            title: 'Heart of India!',
            content: 'Madhya Pradesh is truly the heart of India. Amazing forests, tigers, and history.',
            helpful: [user._id]
        },
        // Gujarat
        {
            place_id: 'place_gj_001',
            user_id: user._id,
            rating: 4,
            title: 'Great infrastructure',
            content: 'Roads are excellent and business environment is great.',
            helpful: []
        },
        // Kerala
        {
            place_id: 'place_kl_001',
            user_id: user._id,
            rating: 5,
            title: 'Gods Own Country',
            content: 'The backwaters and greenery are unmatched. Literacy rates really show in the quality of life.',
            helpful: [user._id]
        },
        // Uttar Pradesh
        {
            place_id: 'place_up_001',
            user_id: user._id,
            rating: 3,
            title: 'Rich Culture but Chaotic',
            content: 'Incredible history in Varanasi and Agra, but infrastructure needs work in rural areas.',
            helpful: []
        },
        // Rajasthan
        {
            place_id: 'place_rj_001',
            user_id: user._id,
            rating: 5,
            title: 'Royal Heritage',
            content: 'The forts and palaces are majestic. Tourism is very well managed here.',
            helpful: [user._id]
        }
    ]

    // Clear existing for these places
    await Review.deleteMany({ place_id: { $in: ['place_mp_001', 'place_gj_001', 'place_kl_001', 'place_up_001', 'place_rj_001'] } })

    // Insert
    await Review.insertMany(reviews)
    console.log(`✅ Seeded ${reviews.length} reviews`)
}

import Discussion from '../models/Discussion.js'

async function seedDiscussionData() {
    console.log('⏳ Seeding Discussion Data...')

    const user = await User.findOne({ email: 'test@bharatatlas.com' })
    if (!user) return

    const discussions = [
        {
            place_id: 'place_mp_001',
            user_id: user._id,
            topic: 'Best time to visit Kanha National Park?',
            content: 'Planning a trip in May, is it too hot for tigers?',
            tags: ['tourism', 'wildlife'],
            replies: []
        },
        {
            place_id: 'place_kl_001',
            user_id: user._id,
            topic: 'Monsoon Tourism in Kerala',
            content: 'Is it safe to visit backwaters during heavy rains in July?',
            tags: ['tourism', 'monsoon', 'safety'],
            replies: [
                {
                    user_id: user._id,
                    content: 'It is beautiful but houseboats might be restricted. Check weather alerts.',
                    created_at: new Date()
                }
            ]
        }
    ]

    // Clear existing
    await Discussion.deleteMany({ place_id: { $in: ['place_mp_001', 'place_kl_001'] } })

    // Insert
    await Discussion.insertMany(discussions)
    console.log(`✅ Seeded ${discussions.length} discussions`)
}

async function runSeed() {
    try {
        await connectMongo()

        await seedHistoricalData()
        await seedSocialData() // requires User model working
        await seedDiscussionData()

        console.log('🎉 Seeding Complete!')
        process.exit(0)
    } catch (error) {
        console.error('❌ Seeding Failed:', error)
        process.exit(1)
    }
}

runSeed()
