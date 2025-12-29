// Exploration & Discovery System
// Wandering without target, thematic discovery (Stories 235, 239-240, 242, 245, 247-249)

/**
 * Exploration Mode (Story 235)
 */
export class ExplorationMode {
    /**
     * Get random place for exploration (Story 235)
     */
    static getRandomPlace(filters = {}) {
        // Story 235: Allow wandering without a search query
        const places = this.getAllPlaces()

        let filtered = places
        if (filters.type) {
            filtered = filtered.filter(p => p.place_type === filters.type)
        }
        if (filters.region) {
            filtered = filtered.filter(p => p.region === filters.region)
        }

        const random = filtered[Math.floor(Math.random() * filtered.length)]

        return {
            place: random,
            explorationContext: {
                mode: 'random',
                appliedFilters: filters,
                suggestion: 'Explore this place or discover another'
            }
        }
    }

    /**
     * Get all places (simplified)
     */
    static getAllPlaces() {
        return [
            { place_id: 'karnataka', canonical_name: 'Karnataka', place_type: 'state', region: 'South India' },
            { place_id: 'rajasthan', canonical_name: 'Rajasthan', place_type: 'state', region: 'North India' }
        ]
    }

    /**
     * Get exploration suggestions
     */
    static getSuggestions(currentPlace) {
        return {
            nearby: this.getNearbyPlaces(currentPlace),
            similar: this.getSimilarPlaces(currentPlace),
            contrasting: this.getContrastingPlaces(currentPlace)
        }
    }

    static getNearbyPlaces(place) {
        return []
    }

    static getSimilarPlaces(place) {
        return []
    }

    static getContrastingPlaces(place) {
        return []
    }
}

/**
 * Progressive Disclosure Navigator (Story 239)
 */
export class ProgressiveDisclosureNavigator {
    /**
     * Expand content level (Story 239: Avoid information overload)
     */
    static expandLevel(content, level = 1) {
        const levels = {
            1: {
                title: content.title,
                summary: content.summary,
                nextPrompt: 'Learn more →'
            },
            2: {
                ...content.level1,
                details: content.details,
                keyFacts: content.keyFacts,
                nextPrompt: 'See full details →'
            },
            3: {
                ...content.level2,
                fullContent: content.fullContent,
                sources: content.sources,
                relatedTopics: content.relatedTopics
            }
        }

        return levels[level] || levels[1]
    }
}

/**
 * Semantic Breadcrumbs (Story 240)
 */
export class SemanticBreadcrumbs {
    /**
     * Generate breadcrumbs (Story 240: Carry meaning, not just clicks)
     */
    static generate(path) {
        // Story 240: Navigation shows conceptual path
        return path.map((item, index) => ({
            label: item.label,
            url: item.url,
            semantic: item.semantic, // e.g., 'geographic', 'thematic', 'temporal'
            isLast: index === path.length - 1
        }))
    }

    /**
     * Example: India > Rajasthan > Ajmer > History
     */
    static createGeographicPath(place) {
        const path = []

        path.push({
            label: 'India',
            url: '/place/india',
            semantic: 'geographic_root'
        })

        if (place.state) {
            path.push({
                label: place.state,
                url: `/place/${place.state_id}`,
                semantic: 'geographic_state'
            })
        }

        if (place.district) {
            path.push({
                label: place.district,
                url: `/place/${place.district_id}`,
                semantic: 'geographic_district'
            })
        }

        path.push({
            label: place.canonical_name,
            url: `/place/${place.place_id}`,
            semantic: 'geographic_current'
        })

        return this.generate(path)
    }
}

/**
 * Saved Trails (Story 242)
 */
export class SavedTrails {
    constructor() {
        this.trails = new Map()
    }

    /**
     * Save exploration trail (Story 242: User-curated trails)
     */
    saveTrail(userId, trail) {
        const trailId = `trail_${Date.now()}`

        const savedTrail = {
            id: trailId,
            userId,
            name: trail.name || 'Untitled Trail',
            description: trail.description || '',
            path: trail.path, // [placeA, placeB, themeC]
            createdAt: new Date().toISOString(),
            isPublic: trail.isPublic || false
        }

        if (!this.trails.has(userId)) {
            this.trails.set(userId, [])
        }

        this.trails.get(userId).push(savedTrail)

        return trailId
    }

    /**
     * Get user trails
     */
    getUserTrails(userId) {
        return this.trails.get(userId) || []
    }

    /**
     * Get public trails
     */
    getPublicTrails() {
        const allTrails = Array.from(this.trails.values()).flat()
        return allTrails.filter(t => t.isPublic)
    }
}

/**
 * Thematic Discovery (Story 245)
 */
export class ThematicDiscovery {
    /**
     * Explore by theme (Story 245)
     */
    static exploreTheme(theme) {
        const themes = {
            'river-civilizations': {
                title: 'River Civilizations',
                description: 'Places shaped by rivers',
                places: ['varanasi', 'haridwar', 'allahabad'],
                relatedThemes: ['water-management', 'ancient-trade']
            },
            'mountain-cultures': {
                title: 'Mountain Cultures',
                description: 'Life in the highlands',
                places: ['shimla', 'darjeeling', 'leh'],
                relatedThemes: ['biodiversity', 'tribal-heritage']
            },
            'coastal-trade': {
                title: 'Coastal Trade',
                description: 'Maritime commerce hubs',
                places: ['mumbai', 'kochi', 'visakhapatnam'],
                relatedThemes: ['colonialism', 'globalization']
            }
        }

        return themes[theme] || null
    }

    /**
     * Get all themes
     */
    static getAllThemes() {
        return [
            { id: 'river-civilizations', name: 'River Civilizations' },
            { id: 'mountain-cultures', name: 'Mountain Cultures' },
            { id: 'coastal-trade', name: 'Coastal Trade' },
            { id: 'desert-adaptation', name: 'Desert Adaptation' },
            { id: 'forest-communities', name: 'Forest Communities' }
        ]
    }
}

/**
 * Graceful Zero Results (Story 247)
 */
export class ZeroResultsHandler {
    /**
     * Handle zero results (Story 247: Guide, not dead-end)
     */
    static handle(query) {
        return {
            message: 'No exact matches found',
            suggestions: [
                {
                    type: 'related_regions',
                    text: 'Try related regions',
                    options: this.getRelatedRegions(query)
                },
                {
                    type: 'broader_search',
                    text: 'Broaden your search',
                    suggestion: this.getBroaderTerm(query)
                },
                {
                    type: 'explore',
                    text: 'Explore randomly',
                    action: '/explore/random'
                }
            ],
            helpText: 'Not finding what you need? Try exploring by theme or region.'
        }
    }

    static getRelatedRegions(query) {
        return ['Karnataka', 'Tamil Nadu', 'Kerala']
    }

    static getBroaderTerm(query) {
        return query.split(' ')[0]
    }
}

/**
 * Search Complexity Bounds (Story 249)
 */
export class SearchComplexityBounds {
    /**
     * Bound search complexity (Story 249: Predictable load)
     */
    static enforceComplexity(searchParams) {
        const maxDepth = 3
        const maxResults = 100
        const maxFilters = 5

        if (searchParams.depth > maxDepth) {
            searchParams.depth = maxDepth
        }

        if (searchParams.limit > maxResults) {
            searchParams.limit = maxResults
        }

        if (searchParams.filters && Object.keys(searchParams.filters).length > maxFilters) {
            throw new Error('Too many filters - maximum 5 allowed')
        }

        return searchParams
    }
}

export default {
    ExplorationMode,
    ProgressiveDisclosureNavigator,
    SemanticBreadcrumbs,
    SavedTrails,
    ThematicDiscovery,
    ZeroResultsHandler,
    SearchComplexityBounds
}
