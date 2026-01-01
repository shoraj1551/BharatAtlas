/**
 * Verify MongoDB Migration
 * 
 * Check if enhanced data exists in places collection
 */

import { connectMongo, getMongoDb } from '../src/services/mongoService.js'
import dotenv from 'dotenv'

dotenv.config()

async function verifyMigration() {
    try {
        await connectMongo()
        const db = getMongoDb()

        console.log('🔍 Verifying MongoDB Migration...\n')

        // Get one sample place
        const samplePlace = await db.collection('places').findOne({ place_type: 'state' })

        if (!samplePlace) {
            console.log('❌ No places found in database')
            process.exit(1)
        }

        console.log(`📍 Sample Place: ${samplePlace.canonical_name}`)
        console.log(`   Type: ${samplePlace.place_type}`)
        console.log(`   ID: ${samplePlace.place_id}\n`)

        // Check for enhanced fields
        const checks = {
            'Economic Data': !!samplePlace.economic_data,
            'Infrastructure': !!samplePlace.infrastructure,
            'Health & Education': !!samplePlace.health_education,
            'Climate & Environment': !!samplePlace.climate_environment
        }

        console.log('✅ Enhanced Fields Check:')
        for (const [field, exists] of Object.entries(checks)) {
            console.log(`   ${exists ? '✅' : '❌'} ${field}`)
        }

        // Show sample data
        if (samplePlace.economic_data) {
            console.log('\n💰 Sample Economic Data:')
            console.log(`   GDP: ₹${samplePlace.economic_data.gdp?.toLocaleString()} Cr`)
            console.log(`   Per Capita Income: ₹${samplePlace.economic_data.per_capita_income?.toLocaleString()}`)
            console.log(`   Unemployment: ${samplePlace.economic_data.unemployment_rate}%`)
        }

        if (samplePlace.infrastructure) {
            console.log('\n🏗️ Sample Infrastructure:')
            console.log(`   Score: ${samplePlace.infrastructure.infrastructure_score}/100`)
            console.log(`   Internet: ${samplePlace.infrastructure.internet_penetration}%`)
        }

        // Count total places
        const totalPlaces = await db.collection('places').countDocuments()
        const withEconomic = await db.collection('places').countDocuments({ economic_data: { $exists: true } })

        console.log(`\n📊 Migration Statistics:`)
        console.log(`   Total Places: ${totalPlaces}`)
        console.log(`   With Enhanced Data: ${withEconomic}`)
        console.log(`   Migration Success: ${withEconomic === totalPlaces ? '✅ 100%' : '⚠️ Partial'}`)

        process.exit(0)
    } catch (error) {
        console.error('❌ Verification failed:', error)
        process.exit(1)
    }
}

verifyMigration()
