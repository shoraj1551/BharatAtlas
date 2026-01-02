const API_URL = 'http://localhost:3001/api/community'

class CommunityService {
    async getContributions(placeId) {
        try {
            const res = await fetch(`${API_URL}/${placeId}`)
            const data = await res.json()
            if (data.success) {
                return data.data
            }
            return []
        } catch (err) {
            console.error("Failed to fetch contributions", err)
            return []
        }
    }

    async submitContribution(payload) {
        try {
            const res = await fetch(`${API_URL}/submit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })
            return await res.json()
        } catch (err) {
            console.error("Failed to submit contribution", err)
            throw err
        }
    }
}

export default new CommunityService()
