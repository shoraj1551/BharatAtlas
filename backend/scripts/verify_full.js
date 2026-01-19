/**
 * Full Backend Verification Script
 * Checks Health, Places, Historical Data, Social Data, and Analytics
 */

const API_BASE = 'http://localhost:3001/api'
const API_V1 = 'http://localhost:3001/api/v1'

async function verifyAll() {
    console.log("🔍 Starting Full Verification...")

    try {
        // 1. Health
        const health = await fetch(`${API_BASE}/../health`).then(res => res.json())
        console.log(`✅ Health: ${health.status}`)

        // 2. Places
        const states = await fetch(`${API_BASE}/places/states`).then(res => res.json())
        console.log(`✅ Places: Found ${states.data?.length} states`)

        // 3. Historical Data (Feature 3.2)
        const historical = await fetch(`${API_V1}/historical/place_mp_001`).then(res => res.json())
        if (historical.data && historical.data.population) {
            console.log(`✅ Historical Data: Found population history for MP`)
        } else {
            console.error(`❌ Historical Data Missing or Invalid format`)
        }

        // 4. Social Data (Feature 3.3)
        const reviews = await fetch(`${API_V1}/community/reviews/place_mp_001`).then(res => res.json())
        if (reviews.data && reviews.data.reviews && reviews.data.reviews.length > 0) {
            console.log(`✅ Social Data: Found ${reviews.data.reviews.length} reviews for MP`)
        } else {
            console.error(`❌ Social Data Missing (Reviews)`)
        }

        // 5. Analytics (Feature 3.1)
        const trends = await fetch(`${API_V1}/analytics/trends?metric=population`).then(res => res.json())
        if (trends.success) {
            console.log(`✅ Analytics: Trends endpoint working`)
        } else {
            console.error(`❌ Analytics endpoint failed`)
        }

        console.log("\n🚀 Verification Complete!")

    } catch (error) {
        console.error("❌ Verification Failed:", error)
    }
}

verifyAll()
