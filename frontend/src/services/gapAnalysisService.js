/**
 * Gap Analysis Service
 * 
 * Detects discrepancies between Official Data (Place Model) and 
 * Ground Reality (Community Contributions).
 * 
 * logic:
 * Checks specific high-value categories (Water, Roads, Power)
 * If official data looks "perfect" (100%, Good, Abundant)
 * AND community reports describe problems with keywords
 * THEN flags a "Reality Gap".
 */

class GapAnalysisService {

    analyze(place, contributions) {
        const gaps = []
        if (!place || !contributions || contributions.length === 0) return gaps

        const problems = contributions.filter(c => c.type === 'problem')
        if (problems.length === 0) return gaps

        // 1. POWER / ELECTRICITY GAP
        // Logic: If infra score is high (>80) or electricity access is high
        // BUT reports mention "power cut", "outage", "no electricity"
        const hasPowerStats = (place.infrastructure?.electricity_access > 90) ||
            (place.infrastructure?.infrastructure_score > 80)

        if (hasPowerStats) {
            const powerIssues = this.findIssues(problems, ['power', 'electricity', 'current', 'bijli', 'outage', 'blackout'])
            if (powerIssues.length >= 2) { // Threshold: 2 reports
                gaps.push({
                    category: 'Infrastructure',
                    metric: 'Electricity Access',
                    official: 'High Access Reported',
                    reality: `${powerIssues.length} reports of outages`,
                    explanation: `Official records indicate ~${place.infrastructure.electricity_access || 90}% electricity availability, but locals report frequent outages.`,
                    evidence: powerIssues
                })
            }
        }

        // 2. WATER GAP
        // Logic: If water resources say "Abundant" or "Good"
        // BUT reports mention "drought", "dry", "water supply", "tanker"
        const waterGood = place.water_resources?.groundwater_level === 'Abundant' ||
            place.water_resources?.water_quality === 'Excellent' ||
            place.water_resources?.water_quality === 'Good'

        if (waterGood) {
            const waterIssues = this.findIssues(problems, ['water', 'pani', 'drought', 'dry', 'tanker', 'contamination', 'dirty'])
            if (waterIssues.length >= 2) {
                gaps.push({
                    category: 'Resources',
                    metric: 'Water Availability',
                    official: 'Reported as Good/Abundant',
                    reality: `${waterIssues.length} reports of scarcity/quality issues`,
                    explanation: "Official data suggests abundant water, but recent community logs signal contamination or supply failure.",
                    evidence: waterIssues
                })
            }
        }

        // 3. ROAD/CONNECTIVITY GAP
        // Logic: If road density is high or connectivity is "Excellent"
        // BUT reports mention "pothole", "broken road", "traffic"
        const roadsGood = place.connectivity?.road_network?.quality_rating === 'Excellent' ||
            place.connectivity?.road_network?.quality_rating === 'Good'

        if (roadsGood) {
            const roadIssues = this.findIssues(problems, ['road', 'pothole', 'traffic', 'jam', 'highway', 'broken'])
            if (roadIssues.length >= 2) { // Threshold
                gaps.push({
                    category: 'Connectivity',
                    metric: 'Road Quality',
                    official: 'Rated Excellent/Good',
                    reality: `${roadIssues.length} reports of bad roads`,
                    explanation: "Government ratings class roads as Excellent, but ground reports indicate maintenance issues or congestion.",
                    evidence: roadIssues
                })
            }
        }

        return gaps
    }

    // Helper: Find problems containing hashtags or keywords
    findIssues(problems, keywords) {
        return problems.filter(p => {
            const text = (p.data.title + " " + p.data.body).toLowerCase()
            return keywords.some(k => text.includes(k))
        })
    }
}

export default new GapAnalysisService()
