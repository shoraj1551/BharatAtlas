import fetch from 'node-fetch';

const API_BASE = 'http://localhost:3001/api';

async function verifyBackend() {
    console.log("🔍 Verifying Backend Health...");

    try {
        // 1. Health Check
        const health = await fetch(`${API_BASE}/../health`).then(res => res.json());
        console.log(`✅ Health Check: ${JSON.stringify(health)}`);

        // 2. Fetch Places (States)
        const states = await fetch(`${API_BASE}/places/states`).then(res => res.json());
        console.log(`✅ States Endpoint: Found ${states.data?.length || 0} states/UTs`);

        if (states.data && states.data.length > 0) {
            const samplePlace = states.data[0];
            console.log(`   Sample: ${samplePlace.canonical_name} (${samplePlace.place_type})`);

            // 3. Check AI/Analysis Endpoints (Dry Run)
            // We just check if the endpoint is reachable (404 means missing, 400/200 means reachable)
            const oppCheck = await fetch(`${API_BASE}/opportunities/${samplePlace.place_id}`);
            console.log(`✅ Opportunities Endpoint status: ${oppCheck.status}`);
        } else {
            console.log("⚠️ No states found. Database might be empty.");
        }

        console.log("🚀 Backend Verification Complete.");

    } catch (error) {
        console.error("❌ Verification Failed:", error.message);
    }
}

verifyBackend();
