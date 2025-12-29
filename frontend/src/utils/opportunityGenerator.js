// Deterministic Opportunity Generator
// Generates opportunities from observable signals using rule-based logic
// No AI dependency - purely data-driven

import {
    createOpportunity,
    OpportunityCategory,
    OpportunityConfidence,
    ReasoningType
} from '../models/Opportunity'

/**
 * Generate infrastructure opportunities based on observable signals
 */
const generateInfrastructureOpportunities = (place) => {
    const opportunities = []

    // Signal: High population + Low infrastructure (inferred from rural classification)
    if (place.population?.value > 5000000 && place.area_classification === 'rural') {
        opportunities.push(createOpportunity({
            id: `opp_${place.place_id}_infra_001`,
            place_id: place.place_id,
            title: 'Urban Infrastructure Development',
            category: OpportunityCategory.INFRASTRUCTURE,
            description: `${place.canonical_name} has a population of ${place.population.value.toLocaleString()} with rural area classification, indicating potential demand for urban infrastructure development including roads, public transport, and utilities.`,
            reasoning: {
                type: ReasoningType.GAP_ANALYSIS,
                explanation: `The combination of high population density (${place.population.value.toLocaleString()} people) and rural classification suggests an infrastructure gap. Urban areas typically require developed infrastructure to support population needs. The gap between population size and current classification indicates opportunity for infrastructure investment.`,
                data_points: [
                    `Population: ${place.population.value.toLocaleString()}`,
                    `Area classification: ${place.area_classification}`,
                    `Area: ${place.area_sq_km.toLocaleString()} sq km`
                ],
                sources: [
                    place.population.source_detail || 'Census data',
                    'Area classification data'
                ]
            },
            confidence: OpportunityConfidence.MEDIUM,
            estimated_investment: null,
            estimated_timeline: '5-10 years',
            target_sectors: ['Construction', 'Urban Planning', 'Public Works']
        }))
    }

    return opportunities
}

/**
 * Generate education opportunities based on observable signals
 */
const generateEducationOpportunities = (place) => {
    const opportunities = []

    // Signal: Literacy rate below national average (assuming 74% national average)
    if (place.literacy_rate?.value < 74) {
        opportunities.push(createOpportunity({
            id: `opp_${place.place_id}_edu_001`,
            place_id: place.place_id,
            title: 'Educational Infrastructure Enhancement',
            category: OpportunityCategory.EDUCATION,
            description: `${place.canonical_name} has a literacy rate of ${place.literacy_rate.value}%, below the national average, indicating potential for educational infrastructure investment including schools, training centers, and adult education programs.`,
            reasoning: {
                type: ReasoningType.DATA_DRIVEN,
                explanation: `Literacy rate of ${place.literacy_rate.value}% is below the national average of approximately 74%. Lower literacy rates correlate with educational infrastructure gaps. Investment in educational facilities and programs can address this gap and improve human capital development.`,
                data_points: [
                    `Literacy rate: ${place.literacy_rate.value}%`,
                    `National average: ~74%`,
                    `Population: ${place.population.value.toLocaleString()}`
                ],
                sources: [
                    place.literacy_rate.source_detail || 'Census data',
                    'National literacy statistics'
                ]
            },
            confidence: OpportunityConfidence.HIGH,
            estimated_investment: null,
            estimated_timeline: '3-7 years',
            target_sectors: ['Education', 'Skill Development', 'EdTech']
        }))
    }

    return opportunities
}

/**
 * Generate technology opportunities based on observable signals
 */
const generateTechnologyOpportunities = (place) => {
    const opportunities = []

    // Signal: IT industry present + high literacy
    if (place.major_industries?.includes('Information Technology') &&
        place.literacy_rate?.value > 75) {
        opportunities.push(createOpportunity({
            id: `opp_${place.place_id}_tech_001`,
            place_id: place.place_id,
            title: 'Technology Sector Expansion',
            category: OpportunityCategory.TECHNOLOGY,
            description: `${place.canonical_name} has an established IT industry and literacy rate of ${place.literacy_rate.value}%, creating favorable conditions for technology sector expansion including software development, IT services, and digital innovation.`,
            reasoning: {
                type: ReasoningType.TREND_ANALYSIS,
                explanation: `Presence of Information Technology in major industries combined with high literacy rate (${place.literacy_rate.value}%) indicates existing tech ecosystem and skilled workforce. These factors create favorable conditions for technology sector growth and attract further investment in tech infrastructure and startups.`,
                data_points: [
                    `IT industry present: Yes`,
                    `Literacy rate: ${place.literacy_rate.value}%`,
                    `Major industries: ${place.major_industries.join(', ')}`
                ],
                sources: [
                    'Industry classification data',
                    place.literacy_rate.source_detail || 'Census data'
                ]
            },
            confidence: OpportunityConfidence.HIGH,
            estimated_investment: null,
            estimated_timeline: '2-5 years',
            target_sectors: ['Software', 'IT Services', 'Startups', 'Digital Innovation']
        }))
    }

    return opportunities
}

/**
 * Generate agriculture opportunities based on observable signals
 */
const generateAgricultureOpportunities = (place) => {
    const opportunities = []

    // Signal: Large area + rural classification
    if (place.area_sq_km > 100000 && place.area_classification === 'rural') {
        opportunities.push(createOpportunity({
            id: `opp_${place.place_id}_agri_001`,
            place_id: place.place_id,
            title: 'Agricultural Modernization',
            category: OpportunityCategory.AGRICULTURE,
            description: `${place.canonical_name} covers ${place.area_sq_km.toLocaleString()} sq km with rural classification, indicating potential for agricultural modernization including mechanization, irrigation systems, and agri-tech solutions.`,
            reasoning: {
                type: ReasoningType.GAP_ANALYSIS,
                explanation: `Large land area (${place.area_sq_km.toLocaleString()} sq km) combined with rural classification suggests significant agricultural activity. Rural areas typically have opportunities for agricultural modernization through technology adoption, improved irrigation, and supply chain optimization.`,
                data_points: [
                    `Area: ${place.area_sq_km.toLocaleString()} sq km`,
                    `Classification: ${place.area_classification}`,
                    `Population density: ${(place.population.value / place.area_sq_km).toFixed(2)} per sq km`
                ],
                sources: [
                    'Geographic data',
                    'Area classification data'
                ]
            },
            confidence: OpportunityConfidence.MEDIUM,
            estimated_investment: null,
            estimated_timeline: '3-8 years',
            target_sectors: ['Agriculture', 'AgriTech', 'Irrigation', 'Supply Chain']
        }))
    }

    return opportunities
}

/**
 * Generate all opportunities for a place
 * @param {Object} place - Place object
 * @returns {Array} Array of opportunity objects (max 3)
 */
export const generateOpportunities = (place) => {
    const opportunities = []

    // Generate opportunities from different signal categories
    opportunities.push(...generateInfrastructureOpportunities(place))
    opportunities.push(...generateEducationOpportunities(place))
    opportunities.push(...generateTechnologyOpportunities(place))
    opportunities.push(...generateAgricultureOpportunities(place))

    // Enforce hard limit: max 3 opportunities per place
    // Sort by confidence (HIGH > MEDIUM > LOW) and take top 3
    const confidenceOrder = { 'high': 3, 'medium': 2, 'low': 1 }
    const sorted = opportunities.sort((a, b) =>
        confidenceOrder[b.confidence.toLowerCase()] - confidenceOrder[a.confidence.toLowerCase()]
    )

    return sorted.slice(0, 3) // Hard limit: max 3
}

export default {
    generateOpportunities
}
