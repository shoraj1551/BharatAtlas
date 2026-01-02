// Narrative Service
// API layer for narrative generation - abstracts generator implementation

import { generateNarrative, generateSummary } from '../utils/narrativeGenerator'

class NarrativeService {
    constructor() {
        this.ready = true // Readiness flag for debugging
        this.generatorVersion = '1.0.0-mock'
    }

    /**
     * Check if narrative service is ready
     * @returns {Object} Readiness status
     */
    getReadinessStatus() {
        return {
            ready: this.ready,
            generator: this.generatorVersion,
            mode: 'mock', // 'mock' | 'ai' | 'hybrid'
            timestamp: new Date().toISOString()
        }
    }

    /**
     * Generate narrative for a place
     * @param {Object} place - Place object
     * @returns {Promise<Object>} Complete narrative following NarrativeModel
     */
    async generatePlaceNarrative(place) {
        if (!this.ready) {
            return Promise.reject(new Error('Narrative service not ready'))
        }

        // NEUTRALITY SAFEGUARD (THE SWITZERLAND PROTOCOL)
        // 1. Role > Person: Focus on the office, not the individual.
        // 2. No Sentiment: Do not analyse sentiment of political figures.
        // 3. Facts Only: Governance section must be purely factual.

        const safePlace = this.applyNeutralityFilters(place)

        // Simulate async operation (future: will call AI API)
        return new Promise((resolve) => {
            setTimeout(() => {
                const narrative = generateNarrative(safePlace)
                resolve(narrative)
            }, 100) // Small delay to simulate API call
        })
    }

    /**
     * Apply Neutrality Filters (The Switzerland Protocol)
     * Removes potential bias triggers before analysis
     */
    applyNeutralityFilters(place) {
        if (!place) return place
        const clean = JSON.parse(JSON.stringify(place)) // Deep clone

        // Redact Politician Biographies or Opinions if present
        if (clean.governance && clean.governance.representatives) {
            ['mp', 'mla'].forEach(role => {
                if (clean.governance.representatives[role]) {
                    // Keep Name, Party, Term (Facts)
                    // Remove any 'bio', 'sentiment', 'controversies' fields if they ever exist
                    delete clean.governance.representatives[role].bio
                    delete clean.governance.representatives[role].sentiment_score
                    delete clean.governance.representatives[role].recent_news
                }
            })
        }
        return clean
    }

    async generatePlaceSummary(placeId) {
        if (!placeId) return Promise.reject(new Error('Place ID required'))

        try {
            const response = await fetch('http://localhost:3001/api/ai/summary', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ placeId })
            })
            return await response.json()
        } catch (error) {
            console.error("Summary Fetch Error", error)
            // Fallback mock
            return {
                identity: "Unable to generate AI summary.",
                people: "Data access interrupted.",
                opportunity: "Please try again later."
            }
        }
    }

    /**
     * Get narrative for a place (future: from cache/database)
     * @param {string} placeId - Place ID
     * @returns {Promise<Object|null>} Cached narrative or null
     */
    async getNarrative(placeId) {
        // TODO: Implement narrative caching/retrieval
        return Promise.resolve(null)
    }

    /**
     * Validate narrative against schema
     * @param {Object} narrative - Narrative object
     * @returns {Promise<Object>} Validation result
     */
    async validateNarrative(narrative) {
        // TODO: Implement comprehensive validation
        return Promise.resolve({
            valid: true,
            errors: []
        })
    }
}

export default new NarrativeService()
