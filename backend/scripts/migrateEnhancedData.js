/**
 * Migration Script: Enhance Places with Sample Data
 * 
 * Adds economic, infrastructure, health/education, and climate data to existing places
 */

import dotenv from 'dotenv'
import { connectMongo, getMongoDb } from '../src/services/mongoService.js'

dotenv.config()

/**
 * Generate economic data
 */
function generateEconomicData(place) {
    const baseGDP = place.population?.value ? (place.population.value / 1000000) * 50000 : 100000
    const baseIncome = place.literacy_rate?.value ? place.literacy_rate.value * 2000 : 120000

    return {
        gdp: Math.round(baseGDP),
        per_capita_income: Math.round(baseIncome),
        unemployment_rate: Math.round((100 - (place.literacy_rate?.value || 70)) / 10 * 10) / 10,
        growth_rate: Math.round((5 + Math.random() * 5) * 10) / 10,
        industry_breakdown: {
            agriculture: Math.round(10 + Math.random() * 20),
            manufacturing: Math.round(20 + Math.random() * 30),
            services: Math.round(40 + Math.random() * 30)
        },
        last_updated: new Date()
    }
}

/**
 * Generate infrastructure data
 */
function generateInfrastructureData(place) {
    const density = place.population_density || 300
    const urbanization = Math.min(100, density / 50)

    const data = {
        road_density: Math.round(50 + urbanization),
        railway_stations: Math.round((place.population?.value || 1000000) / 100000),
        airports: place.population?.value > 5000000 ? Math.floor(Math.random() * 5) + 1 : Math.floor(Math.random() * 2),
        internet_penetration: Math.round(40 + (place.literacy_rate?.value || 70) / 2),
        electricity_access: Math.round(85 + Math.random() * 10),
        last_updated: new Date()
    }

    // Calculate infrastructure score
    const normalized = {
        road_density: Math.min(100, data.road_density / 2),
        railway_stations: Math.min(100, data.railway_stations * 2),
        airports: Math.min(100, data.airports * 20),
        internet_penetration: data.internet_penetration,
        electricity_access: data.electricity_access
    }

    data.infrastructure_score = Math.round(
        normalized.road_density * 0.2 +
        normalized.railway_stations * 0.15 +
        normalized.airports * 0.15 +
        normalized.internet_penetration * 0.3 +
        normalized.electricity_access * 0.2
    )

    return data
}

/**
 * Generate health & education data
 */
function generateHealthEducationData(place) {
    const literacy = place.literacy_rate?.value || 70
    const urbanization = Math.min(100, (place.population_density || 300) / 50)

    const data = {
        hospitals_per_100k: Math.round(5 + urbanization / 10),
        doctors_per_100k: Math.round(50 + literacy),
        hospital_beds_per_100k: Math.round(100 + urbanization),
        schools_per_100k: Math.round(30 + literacy / 3),
        teachers_per_100k: Math.round(200 + literacy * 2),
        student_teacher_ratio: Math.round(35 - literacy / 5),
        last_updated: new Date()
    }

    // Calculate health index
    data.health_index = Math.min(100, Math.round(
        (data.hospitals_per_100k / 20) * 30 +
        (data.doctors_per_100k / 200) * 40 +
        (data.hospital_beds_per_100k / 300) * 30
    ))

    // Calculate education index
    data.education_index = Math.min(100, Math.round(
        (literacy / 100) * 50 +
        (data.schools_per_100k / 100) * 25 +
        (Math.max(0, 50 - data.student_teacher_ratio) / 50) * 25
    ))

    return data
}

/**
 * Generate climate & environment data
 */
function generateClimateData(place) {
    const tempVariation = Math.random() * 10 - 5

    const data = {
        avg_temperature: Math.round(25 + tempVariation),
        annual_rainfall: Math.round(500 + Math.random() * 2500),
        forest_cover_percent: Math.round(5 + Math.random() * 30),
        air_quality_index: Math.round(50 + Math.random() * 200),
        last_updated: new Date()
    }

    // Calculate environmental score
    data.environmental_score = Math.min(100, Math.round(
        (data.forest_cover_percent / 35) * 40 +
        (Math.max(0, 300 - data.air_quality_index) / 300) * 60
    ))

    return data
}

/**
 * Main migration function
 */
async function migratePlaces() {
    try {
        console.log('🚀 Starting migration...')

        // Connect to MongoDB
        await connectMongo()
        const db = getMongoDb()

        // Get all places
        const places = await db.collection('places').find({}).toArray()
        console.log(`📊 Found ${places.length} places to migrate`)

        let updated = 0

        for (const place of places) {
            // Generate enhanced data
            const economicData = generateEconomicData(place)
            const infrastructure = generateInfrastructureData(place)
            const healthEducation = generateHealthEducationData(place)
            const climate = generateClimateData(place)

            // Update place
            await db.collection('places').updateOne(
                { _id: place._id },
                {
                    $set: {
                        economic_data: economicData,
                        infrastructure: infrastructure,
                        health_education: healthEducation,
                        climate_environment: climate,
                        data_quality: 'sample',
                        updated_at: new Date()
                    }
                }
            )

            updated++
            if (updated % 10 === 0) {
                console.log(`✅ Updated ${updated}/${places.length} places`)
            }
        }

        console.log(`\n🎉 Migration complete! Updated ${updated} places`)
        console.log('\n📋 Summary:')
        console.log(`   - Economic data: ✅`)
        console.log(`   - Infrastructure: ✅`)
        console.log(`   - Health & Education: ✅`)
        console.log(`   - Climate & Environment: ✅`)

        process.exit(0)
    } catch (error) {
        console.error('❌ Migration failed:', error)
        process.exit(1)
    }
}

// Run migration
migratePlaces()
