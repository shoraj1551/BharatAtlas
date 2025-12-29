// Mock Narrative Generator
// Deterministic, programmatic narrative generation without AI dependency
// Generates safe, structured narratives from place data

import {
    NarrativeSectionType,
    ConfidenceLevel,
    NarrativeTone,
    SourceType,
    createNarrativeSection
} from '../models/Narrative'

/**
 * Generate geographic context section
 */
const generateGeographicContext = (place) => {
    const parts = []

    // Location description
    parts.push(`${place.canonical_name} is a ${place.place_type} in India`)

    // Area information
    if (place.area_sq_km) {
        parts.push(`covering an area of ${place.area_sq_km.toLocaleString()} square kilometers`)
    }

    // Climate if available
    if (place.climate_zone) {
        parts.push(`The region experiences a ${place.climate_zone} climate`)
    }

    const content = parts.join('. ') + '.'

    return createNarrativeSection(
        NarrativeSectionType.GEOGRAPHIC_CONTEXT,
        content,
        {
            confidence: ConfidenceLevel.VERIFIED,
            tone: NarrativeTone.FACTUAL,
            source: SourceType.VERIFIED_DATABASE,
            source_detail: 'Place data model'
        }
    )
}

/**
 * Generate demographic overview section
 */
const generateDemographicOverview = (place) => {
    const parts = []

    // Population
    if (place.population) {
        parts.push(`The population is ${place.population.value.toLocaleString()}`)
        parts.push(`as recorded in ${place.population.source_detail}`)
    }

    // Literacy rate
    if (place.literacy_rate) {
        parts.push(`The literacy rate stands at ${place.literacy_rate.value}%`)
    }

    // Primary language
    if (place.primary_language) {
        parts.push(`${place.primary_language} is the primary language`)
    }

    const content = parts.join('. ') + '.'

    return createNarrativeSection(
        NarrativeSectionType.DEMOGRAPHIC_OVERVIEW,
        content,
        {
            confidence: place.population?.confidence === 1.0 ? ConfidenceLevel.VERIFIED : ConfidenceLevel.HIGH,
            tone: NarrativeTone.FACTUAL,
            source: place.population?.source || SourceType.VERIFIED_DATABASE,
            source_detail: place.population?.source_detail
        }
    )
}

/**
 * Generate economic profile section
 */
const generateEconomicProfile = (place) => {
    const parts = []

    // Area classification
    if (place.area_classification) {
        parts.push(`The area is classified as ${place.area_classification}`)
    }

    // Major industries
    if (place.major_industries && place.major_industries.length > 0) {
        const industries = place.major_industries.slice(0, 3).join(', ')
        parts.push(`Key economic sectors include ${industries}`)
    }

    const content = parts.length > 0 ? parts.join('. ') + '.' : null

    if (!content) return null

    return createNarrativeSection(
        NarrativeSectionType.ECONOMIC_PROFILE,
        content,
        {
            confidence: ConfidenceLevel.HIGH,
            tone: NarrativeTone.DESCRIPTIVE,
            source: SourceType.VERIFIED_DATABASE,
            source_detail: 'Economic data'
        }
    )
}

/**
 * Generate infrastructure section
 */
const generateInfrastructure = (place) => {
    const parts = []

    // Districts (for states)
    if (place.num_districts && place.place_type === 'state') {
        parts.push(`The state comprises ${place.num_districts.value} districts`)
    }

    const content = parts.length > 0 ? parts.join('. ') + '.' : null

    if (!content) return null

    return createNarrativeSection(
        NarrativeSectionType.INFRASTRUCTURE,
        content,
        {
            confidence: ConfidenceLevel.VERIFIED,
            tone: NarrativeTone.FACTUAL,
            source: SourceType.GOVERNMENT_REPORT,
            source_detail: place.num_districts?.source_detail
        }
    )
}

/**
 * Generate complete narrative for a place
 * @param {Object} place - Place object
 * @returns {Object} Complete narrative following NarrativeModel
 */
export const generateNarrative = (place) => {
    const sections = {}

    // Generate each section
    const geographicContext = generateGeographicContext(place)
    if (geographicContext) sections.geographic_context = geographicContext

    const demographicOverview = generateDemographicOverview(place)
    if (demographicOverview) sections.demographic_overview = demographicOverview

    const economicProfile = generateEconomicProfile(place)
    if (economicProfile) sections.economic_profile = economicProfile

    const infrastructure = generateInfrastructure(place)
    if (infrastructure) sections.infrastructure = infrastructure

    // Calculate overall confidence
    const confidenceLevels = Object.values(sections)
        .map(s => s.confidence)
        .filter(Boolean)

    const overallConfidence = confidenceLevels.includes(ConfidenceLevel.VERIFIED)
        ? ConfidenceLevel.VERIFIED
        : ConfidenceLevel.HIGH

    return {
        place_id: place.place_id,
        narrative_version: 1,
        created_at: new Date().toISOString(),
        last_updated: new Date().toISOString(),
        sections,
        overall_confidence: overallConfidence,
        human_reviewed: false,
        review_date: null,
        reviewer_id: null,
        contains_sensitive_content: false,
        policy_flags: [],
        approved_for_public: true
    }
}

/**
 * Generate simple summary (for backward compatibility)
 * @param {Object} place - Place object
 * @returns {string} Summary text
 */
export const generateSummary = (place) => {
    const narrative = generateNarrative(place)
    const sections = Object.values(narrative.sections)
    return sections.map(s => s.content).join(' ')
}

export default {
    generateNarrative,
    generateSummary
}
