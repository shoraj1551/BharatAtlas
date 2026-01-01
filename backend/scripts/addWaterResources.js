/**
 * Migration Script: Add Water Resources Data
 * 
 * Adds sample water resources data to existing places
 */

import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Place from '../models/Place.js'

dotenv.config()

// Sample water resources data for different states
const waterResourcesData = {
    'Maharashtra': {
        annual_rainfall_mm: 1200,
        groundwater_level: 'Moderate',
        major_water_bodies: ['Arabian Sea', 'Godavari River', 'Krishna River'],
        irrigation_coverage_percent: 45,
        water_quality: 'Good'
    },
    'Kerala': {
        annual_rainfall_mm: 3000,
        groundwater_level: 'Abundant',
        major_water_bodies: ['Arabian Sea', 'Periyar River', 'Pamba River'],
        irrigation_coverage_percent: 65,
        water_quality: 'Excellent'
    },
    'Rajasthan': {
        annual_rainfall_mm: 550,
        groundwater_level: 'Scarce',
        major_water_bodies: ['Indira Gandhi Canal', 'Chambal River'],
        irrigation_coverage_percent: 35,
        water_quality: 'Fair'
    },
    'Punjab': {
        annual_rainfall_mm: 650,
        groundwater_level: 'Moderate',
        major_water_bodies: ['Sutlej River', 'Beas River', 'Ravi River'],
        irrigation_coverage_percent: 98,
        water_quality: 'Good'
    },
    'West Bengal': {
        annual_rainfall_mm: 1750,
        groundwater_level: 'Abundant',
        major_water_bodies: ['Bay of Bengal', 'Ganges River', 'Hooghly River'],
        irrigation_coverage_percent: 55,
        water_quality: 'Good'
    },
    'Tamil Nadu': {
        annual_rainfall_mm: 950,
        groundwater_level: 'Moderate',
        major_water_bodies: ['Bay of Bengal', 'Cauvery River', 'Vaigai River'],
        irrigation_coverage_percent: 50,
        water_quality: 'Fair'
    },
    'Karnataka': {
        annual_rainfall_mm: 1100,
        groundwater_level: 'Moderate',
        major_water_bodies: ['Arabian Sea', 'Cauvery River', 'Krishna River'],
        irrigation_coverage_percent: 42,
        water_quality: 'Good'
    },
    'Gujarat': {
        annual_rainfall_mm: 800,
        groundwater_level: 'Moderate',
        major_water_bodies: ['Arabian Sea', 'Narmada River', 'Sabarmati River'],
        irrigation_coverage_percent: 48,
        water_quality: 'Good'
    },
    'Uttar Pradesh': {
        annual_rainfall_mm: 1000,
        groundwater_level: 'Abundant',
        major_water_bodies: ['Ganges River', 'Yamuna River', 'Gomti River'],
        irrigation_coverage_percent: 75,
        water_quality: 'Fair'
    },
    'Madhya Pradesh': {
        annual_rainfall_mm: 1150,
        groundwater_level: 'Moderate',
        major_water_bodies: ['Narmada River', 'Chambal River', 'Betwa River'],
        irrigation_coverage_percent: 40,
        water_quality: 'Good'
    }
}

async function migrateWaterResources() {
    try {
        console.log('🔄 Connecting to MongoDB...')
        await mongoose.connect(process.env.MONGODB_ATLAS_URI)
        console.log('✅ Connected to MongoDB')

        let updated = 0
        let skipped = 0

        for (const [stateName, waterData] of Object.entries(waterResourcesData)) {
            const place = await Place.findOne({
                canonical_name: stateName,
                place_type: 'state'
            })

            if (place) {
                place.water_resources = waterData
                await place.save()
                console.log(`✅ Updated ${stateName}`)
                updated++
            } else {
                console.log(`⚠️  Skipped ${stateName} (not found)`)
                skipped++
            }
        }

        console.log('\n📊 Migration Summary:')
        console.log(`   ✅ Updated: ${updated} places`)
        console.log(`   ⚠️  Skipped: ${skipped} places`)
        console.log('\n✨ Migration complete!')

    } catch (error) {
        console.error('❌ Migration failed:', error)
    } finally {
        await mongoose.disconnect()
        console.log('👋 Disconnected from MongoDB')
        process.exit(0)
    }
}

// Run migration
migrateWaterResources()
