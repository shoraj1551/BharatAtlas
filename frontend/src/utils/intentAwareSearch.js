// Intent-Aware Search System
// Search that understands why, not just what (Stories 231-234, 236-238)

/**
 * Search Intent Types (Story 231)
 */
export const SearchIntent = {
    EXPLORE: 'explore',           // Browsing, learning
    FIND_SPECIFIC: 'find_specific', // Looking for exact place
    COMPARE: 'compare',           // Comparing places
    RESEARCH: 'research',         // Deep investigation
    NAVIGATE: 'navigate'          // Getting to known place
}

/**
 * Intent-Aware Search Engine (Story 231)
 */
export class IntentAwareSearch {
    /**
     * Search with intent inference (Story 231)
     */
    static search(query, explicitIntent = null) {
        const inferredIntent = explicitIntent || this.inferIntent(query)

        // Story 231: Keyword + inferred intent
        const results = this.executeSearch(query, inferredIntent)

        // Story 236: Show confidence scores
        const scoredResults = results.map(r => ({
            ...r,
            confidence: this.calculateConfidence(r, query),
            matchReason: this.explainMatch(r, query, inferredIntent) // Story 246
        }))

        // Story 237: Ensure diversity
        const diverseResults = this.diversifyResults(scoredResults)

        // Story 232: No "best" or "top" rankings
        return {
            query,
            intent: inferredIntent,
            results: diverseResults,
            orderBy: 'relevance_contextual', // Not "best" or "top"

            // Story 238: Show missing data
            dataGaps: this.identifyDataGaps(query),

            // Story 234: Disambiguation
            disambiguation: this.checkAmbiguity(query)
        }
    }

    /**
     * Infer search intent (Story 231)
     */
    static inferIntent(query) {
        const lowerQuery = query.toLowerCase()

        // Comparison indicators
        if (lowerQuery.includes('vs') || lowerQuery.includes('compare')) {
            return SearchIntent.COMPARE
        }

        // Exploration indicators
        if (lowerQuery.includes('explore') || lowerQuery.includes('discover')) {
            return SearchIntent.EXPLORE
        }

        // Research indicators
        if (lowerQuery.includes('history') || lowerQuery.includes('data')) {
            return SearchIntent.RESEARCH
        }

        // Specific place lookup
        if (lowerQuery.length < 20 && !lowerQuery.includes(' ')) {
            return SearchIntent.FIND_SPECIFIC
        }

        return SearchIntent.EXPLORE
    }

    /**
     * Execute search
     */
    static executeSearch(query, intent) {
        // Simplified - in production, use proper search engine
        return [
            { placeId: 'karnataka', name: 'Karnataka', type: 'state' },
            { placeId: 'bengaluru', name: 'Bengaluru', type: 'city' }
        ]
    }

    /**
     * Calculate confidence (Story 236)
     */
    static calculateConfidence(result, query) {
        // Simplified confidence calculation
        const nameMatch = result.name.toLowerCase().includes(query.toLowerCase())
        return nameMatch ? 0.85 : 0.60
    }

    /**
     * Explain match (Story 246: Search result explainability)
     */
    static explainMatch(result, query, intent) {
        const reasons = []

        if (result.name.toLowerCase().includes(query.toLowerCase())) {
            reasons.push('Name matches query')
        }

        if (intent === SearchIntent.EXPLORE) {
            reasons.push('Relevant for exploration')
        }

        return reasons.join(', ')
    }

    /**
     * Diversify results (Story 237)
     */
    static diversifyResults(results) {
        // Story 237: Prevent monoculture results
        const diverse = []
        const typesSeen = new Set()

        results.forEach(result => {
            if (!typesSeen.has(result.type) || diverse.length < 3) {
                diverse.push(result)
                typesSeen.add(result.type)
            }
        })

        return diverse
    }

    /**
     * Identify data gaps (Story 238)
     */
    static identifyDataGaps(query) {
        // Story 238: Never hide missing data
        return [
            { metric: 'population', status: 'available' },
            { metric: 'gdp', status: 'unavailable', reason: 'Data unavailable for this period' }
        ]
    }

    /**
     * Check for ambiguity (Story 234)
     */
    static checkAmbiguity(query) {
        // Story 234: Disambiguation is explicit
        const ambiguousTerms = {
            'ajmer': [
                { id: 'ajmer_city', label: 'Ajmer (city)' },
                { id: 'ajmer_district', label: 'Ajmer (district)' }
            ],
            'salem': [
                { id: 'salem_tn', label: 'Salem (Tamil Nadu)' },
                { id: 'salem_us', label: 'Salem (United States)' }
            ]
        }

        const matches = ambiguousTerms[query.toLowerCase()]

        if (matches) {
            return {
                ambiguous: true,
                message: 'Did you mean:',
                options: matches
            }
        }

        return { ambiguous: false }
    }
}

/**
 * Contextual Filters (Story 233)
 */
export class ContextualFilters {
    /**
     * Apply filters (Story 233)
     */
    static apply(results, filters) {
        let filtered = results

        // Temporal filter
        if (filters.era) {
            filtered = filtered.filter(r => r.era === filters.era)
        }

        // Regional filter
        if (filters.region) {
            filtered = filtered.filter(r => r.region === filters.region)
        }

        // Cultural filter
        if (filters.culturalContext) {
            filtered = filtered.filter(r =>
                r.culturalContexts?.includes(filters.culturalContext)
            )
        }

        return filtered
    }

    /**
     * Get available filters
     */
    static getAvailableFilters() {
        return {
            era: ['Ancient', 'Medieval', 'Mughal', 'Colonial', 'Modern'],
            region: ['North India', 'South India', 'East India', 'West India', 'Central India'],
            culturalContext: ['Hindu', 'Muslim', 'Buddhist', 'Sikh', 'Christian', 'Secular']
        }
    }
}

export default {
    SearchIntent,
    IntentAwareSearch,
    ContextualFilters
}
