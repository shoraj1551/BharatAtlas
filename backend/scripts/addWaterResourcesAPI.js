/**
 * Add Water Resources Data via API
 * 
 * Uses the running backend API to add water resources data
 */

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

async function addWaterResourcesViaAPI() {
    const API_BASE = 'http://localhost:3001/api/places'

    console.log('🔄 Adding water resources data via API...\n')

    let updated = 0
    let failed = 0

    for (const [stateName, waterData] of Object.entries(waterResourcesData)) {
        try {
            // First, get all states
            const statesResponse = await fetch(`${API_BASE}/states`)
            const statesData = await statesResponse.json()
            const states = statesData.data || statesData

            // Find the state
            const state = states.find(s => s.canonical_name === stateName)

            if (!state) {
                console.log(`⚠️  Skipped ${stateName} (not found)`)
                failed++
                continue
            }

            // Update the state with water resources
            const updateResponse = await fetch(`${API_BASE}/${state.place_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    water_resources: waterData
                })
            })

            if (updateResponse.ok) {
                console.log(`✅ Updated ${stateName}`)
                updated++
            } else {
                console.log(`❌ Failed to update ${stateName}`)
                failed++
            }
        } catch (error) {
            console.log(`❌ Error updating ${stateName}:`, error.message)
            failed++
        }
    }

    console.log('\n📊 Summary:')
    console.log(`   ✅ Updated: ${updated} states`)
    console.log(`   ❌ Failed: ${failed} states`)
    console.log('\n✨ Done! Refresh your browser to see the changes.')
}

// Run the script
addWaterResourcesViaAPI().catch(console.error)
