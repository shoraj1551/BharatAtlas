/**
 * Sample Enhanced Data Generator
 * 
 * Generates realistic sample data for demonstration
 * Can be replaced with real data later
 */

/**
 * Generate economic data for a place
 */
export function generateEconomicData(place) {
    const baseGDP = place.population?.value ? (place.population.value / 1000000) * 50000 : 100000
    const baseIncome = place.literacy_rate?.value ? place.literacy_rate.value * 2000 : 120000

    return {
        gdp: Math.round(baseGDP), // in crores
        per_capita_income: Math.round(baseIncome),
        unemployment_rate: Math.round((100 - (place.literacy_rate?.value || 70)) / 10 * 10) / 10,
        growth_rate: Math.round((5 + Math.random() * 5) * 10) / 10,
        industry_breakdown: {
            agriculture: Math.round(10 + Math.random() * 20),
            manufacturing: Math.round(20 + Math.random() * 30),
            services: Math.round(40 + Math.random() * 30)
        }
    }
}

/**
 * Generate infrastructure data
 */
export function generateInfrastructureData(place) {
    const density = place.population_density || 300
    const urbanization = Math.min(100, density / 50)

    return {
        road_density: Math.round(50 + urbanization),
        railway_stations: Math.round((place.population?.value || 1000000) / 100000),
        airports: place.population?.value > 5000000 ? Math.floor(Math.random() * 5) + 1 : Math.floor(Math.random() * 2),
        internet_penetration: Math.round(40 + (place.literacy_rate?.value || 70) / 2),
        electricity_access: Math.round(85 + Math.random() * 10),
        infrastructure_score: 0 // calculated below
    }
}

/**
 * Calculate infrastructure score
 */
export function calculateInfrastructureScore(infrastructure) {
    const weights = {
        road_density: 0.2,
        railway_stations: 0.15,
        airports: 0.15,
        internet_penetration: 0.3,
        electricity_access: 0.2
    }

    const normalized = {
        road_density: Math.min(100, infrastructure.road_density / 2),
        railway_stations: Math.min(100, infrastructure.railway_stations * 2),
        airports: Math.min(100, infrastructure.airports * 20),
        internet_penetration: infrastructure.internet_penetration,
        electricity_access: infrastructure.electricity_access
    }

    let score = 0
    for (let key in weights) {
        score += normalized[key] * weights[key]
    }

    return Math.round(score)
}

/**
 * Generate health & education data
 */
export function generateHealthEducationData(place) {
    const literacy = place.literacy_rate?.value || 70
    const urbanization = Math.min(100, (place.population_density || 300) / 50)

    return {
        hospitals_per_100k: Math.round(5 + urbanization / 10),
        doctors_per_100k: Math.round(50 + literacy),
        hospital_beds_per_100k: Math.round(100 + urbanization),
        schools_per_100k: Math.round(30 + literacy / 3),
        teachers_per_100k: Math.round(200 + literacy * 2),
        student_teacher_ratio: Math.round(35 - literacy / 5),
        health_index: 0, // calculated below
        education_index: 0 // calculated below
    }
}

/**
 * Calculate health index
 */
export function calculateHealthIndex(healthData) {
    const score = (
        (healthData.hospitals_per_100k / 20) * 30 +
        (healthData.doctors_per_100k / 200) * 40 +
        (healthData.hospital_beds_per_100k / 300) * 30
    )
    return Math.min(100, Math.round(score))
}

/**
 * Calculate education index
 */
export function calculateEducationIndex(eduData, literacy) {
    const score = (
        (literacy / 100) * 50 +
        (eduData.schools_per_100k / 100) * 25 +
        (Math.max(0, 50 - eduData.student_teacher_ratio) / 50) * 25
    )
    return Math.min(100, Math.round(score))
}

/**
 * Generate climate & environment data
 */
export function generateClimateData(place) {
    // Rough approximation based on location (would need actual lat/long)
    const baseLat = 20 // Central India approximation
    const tempVariation = Math.random() * 10 - 5

    return {
        avg_temperature: Math.round(25 + tempVariation),
        annual_rainfall: Math.round(500 + Math.random() * 2500),
        forest_cover_percent: Math.round(5 + Math.random() * 30),
        air_quality_index: Math.round(50 + Math.random() * 200),
        environmental_score: 0 // calculated below
    }
}

/**
 * Calculate environmental score
 */
export function calculateEnvironmentalScore(climateData) {
    const score = (
        (climateData.forest_cover_percent / 35) * 40 +
        (Math.max(0, 300 - climateData.air_quality_index) / 300) * 60
    )
    return Math.min(100, Math.round(score))
}

/**
 * Generate all enhanced data for a place
 */
export function generateEnhancedData(place) {
    const economic = generateEconomicData(place)
    const infrastructure = generateInfrastructureData(place)
    infrastructure.infrastructure_score = calculateInfrastructureScore(infrastructure)

    const healthEducation = generateHealthEducationData(place)
    healthEducation.health_index = calculateHealthIndex(healthEducation)
    healthEducation.education_index = calculateEducationIndex(healthEducation, place.literacy_rate?.value || 70)

    const climate = generateClimateData(place)
    climate.environmental_score = calculateEnvironmentalScore(climate)

    return {
        economic_data: economic,
        infrastructure,
        health_education: healthEducation,
        climate_environment: climate
    }
}
