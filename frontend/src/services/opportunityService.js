// Opportunity Service
// API layer for opportunity generation and management

import { generateOpportunities } from '../utils/opportunityGenerator'
import { validateOpportunity } from '../models/Opportunity'

class OpportunityService {
    /**
     * Generate opportunities for a place
     * @param {Object} place - Place object
     * @returns {Promise<Array>} Array of approved opportunity objects
     */
    async generatePlaceOpportunities(place) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const opportunities = generateOpportunities(place)

                // CRITICAL: Filter out unapproved opportunities for public view
                // Only show opportunities that are approved_for_public
                const approvedOpportunities = opportunities.filter(opp =>
                    opp.approved_for_public === true
                )

                resolve(approvedOpportunities)
            }, 100) // Simulate async operation
        })
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
