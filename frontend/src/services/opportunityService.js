// Opportunity Service
// API layer for opportunity generation and management

import { generateOpportunities } from '../utils/opportunityGenerator'
import { validateOpportunity } from '../models/Opportunity'

class OpportunityService {
    /**
     * Generate opportunities for a place
     * @param {Object} place - Place object
     */
    async generatePlaceOpportunities(place) {
        if (!place || !place.place_id) {
            return []
        }

        try {
            // Fetch AI-analyzed opportunities from backend
            const response = await fetch(`http://localhost:3001/api/opportunities/${place.place_id}`)
            if (response.ok) {
                const data = await response.json()
                if (data && data.length > 0) {
                    return data.map(opp => ({
                        title: opp.signal.title,
                        description: opp.signal.description,
                        sector: opp.sector,
                        confidence: opp.signal.confidence_score,
                        type: opp.signal.type
                    }))
                }
            }

            // If no data yet, trigger analysis (or just fallback to mock for now)
            // Ideally this trigger should be user-initiated or background job
            return []
        } catch (error) {
            console.error("Error fetching opportunities:", error)
            return []
        }
    }

    /**
     * Trigger fresh analysis based on community signals
     */
    async analyzeCommunitySignals(placeId) {
        try {
            const response = await fetch(`http://localhost:3001/api/opportunities/analyze/${placeId}`, {
                method: 'POST'
            })
            return await response.json()
        } catch (error) {
            console.error("Analysis Trigger Error:", error)
            throw error
        }
    }

    /**
     * Get all opportunities for admin (including unapproved)
     * @param {Object} place - Place object
     * @returns {Promise<Array>} All opportunities (admin only)
     */
    async getAllOpportunitiesForAdmin(place) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const opportunities = generateOpportunities(place)
                resolve(opportunities) // No filter - admin sees all
            }, 100)
        })
    }

    /**
     * Get opportunities for a place (future: from database)
     * @param {string} placeId - Place ID
     * @returns {Promise<Array>} Array of opportunities
     */
    async getOpportunities(placeId) {
        // TODO: Implement database retrieval
        return Promise.resolve([])
    }

    /**
     * Validate opportunity
     * @param {Object} opportunity - Opportunity object
     * @returns {Promise<Object>} Validation result
     */
    async validateOpportunity(opportunity) {
        return Promise.resolve(validateOpportunity(opportunity))
    }

    /**
     * Get opportunities by category
     * @param {string} placeId - Place ID
     * @param {string} category - Opportunity category
     * @returns {Promise<Array>} Filtered opportunities
     */
    async getOpportunitiesByCategory(placeId, category) {
        const opportunities = await this.getOpportunities(placeId)
        return opportunities.filter(opp => opp.category === category)
    }
}

export default new OpportunityService()
