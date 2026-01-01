/**
 * Quick Data Update Script
 * Adds water resources data directly to MongoDB
 */

import mongoose from 'mongoose'

// MongoDB Atlas connection string (from your running server)
const MONGODB_URI = 'mongodb+srv://shorajtomer:Shoraj%401551@cluster0.mongodb.net/bharatatlas?retryWrites=true&w=majority&appName=Cluster0'

const waterData = {
    'Maharashtra': {
        water_resources: {
            annual_rainfall_mm: 1200,
            groundwater_level: 'Moderate',
            major_water_bodies: ['Arabian Sea', 'Godavari River', 'Krishna River'],
            irrigation_coverage_percent: 45,
            water_quality: 'Good'
        }
    },
    'Kerala': {
        water_resources: {
            annual_rainfall_mm: 3000,
            groundwater_level: 'Abundant',
            major_water_bodies: ['Arabian Sea', 'Periyar River', 'Pamba River'],
            irrigation_coverage_percent: 65,
            water_quality: 'Excellent'
        }
    },
    'Rajasthan': {
        water_resources: {
            annual_rainfall_mm: 550,
            groundwater_level: 'Scarce',
            major_water_bodies: ['Indira Gandhi Canal', 'Chambal River'],
            irrigation_coverage_percent: 35,
            water_quality: 'Fair'
        }
    },
    'Punjab': {
        water_resources: {
            annual_rainfall_mm: 650,
            groundwater_level: 'Moderate',
            major_water_bodies: ['Sutlej River', 'Beas River', 'Ravi River'],
            irrigation_coverage_percent: 98,
            water_quality: 'Good'
        }
    },
    'West Bengal': {
        water_resources: {
            annual_rainfall_mm: 1750,
            groundwater_level: 'Abundant',
            major_water_bodies: ['Bay of Bengal', 'Ganges River', 'Hooghly River'],
            irrigation_coverage_percent: 55,
            water_quality: 'Good'
        }
    }
}

async function updateData() {
    try {
        console.log('🔄 Connecting to MongoDB Atlas...')
        await mongoose.connect(MONGODB_URI)
        console.log('✅ Connected!\n')

        const db = mongoose.connection.db
        const collection = db.collection('places')

        let updated = 0

        for (const [stateName, data] of Object.entries(waterData)) {
            const result = await collection.updateOne(
                { canonical_name: stateName, place_type: 'state' },
                { $set: data }
            )

            if (result.modifiedCount > 0) {
                console.log(`✅ Updated ${stateName}`)
                updated++
            } else {
                console.log(`⚠️  ${stateName} not found or already updated`)
            }
        }

        console.log(`\n📊 Updated ${updated} states`)
        console.log('✨ Done! Refresh your browser to see the changes.')

    } catch (error) {
        console.error('❌ Error:', error.message)
    } finally {
        await mongoose.disconnect()
        process.exit(0)
    }
}

updateData()
