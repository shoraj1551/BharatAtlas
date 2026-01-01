import { Ollama } from 'ollama'
import mongoPlaceService from './mongoPlaceService.js'
import { Ollama } from 'ollama'
import mongoPlaceService from './mongoPlaceService.js'
import Opportunity from '../../models/Opportunity.js'
import Contribution from '../../models/Contribution.js'

class AIService {
    constructor() {
        // Initialize Ollama
        this.ollama = new Ollama({
            host: 'http://localhost:11434'
        })

        // System prompt template
        this.systemPrompt = `You are BharatAtlas AI, an expert assistant for Indian geographic and demographic data.

Your knowledge base includes:
- 28 Indian States
- 8 Union Territories  
- 45 major districts
- Census 2011 data (population, literacy, area)
- Economic data (major industries)

Guidelines:
1. Be concise and action-oriented
2. Provide specific data when available
3. Suggest comparisons when relevant
4. Always cite data sources (Census 2011)
5. If you don't have data, say so clearly
6. Format numbers with commas for readability

Current context:
{context}

User question: {question}

Provide a helpful, accurate response:`
    }

    /**
     * Get relevant context from database
     */
    async getContext(query) {
        try {
            // Search for relevant places
            const places = await mongoPlaceService.searchPlaces(query, 5)

            if (places.length === 0) {
                return 'No specific places found in database.'
            }

            // Format context
            const context = places.map(p => `
${p.canonical_name} (${p.place_type}):
- Population: ${p.population?.value?.toLocaleString() || 'N/A'} (${p.population?.year || 'N/A'})
- Area: ${p.area_sq_km?.toLocaleString() || 'N/A'} sq km
- Literacy: ${p.literacy_rate?.value || 'N/A'}%
- Industries: ${p.major_industries?.join(', ') || 'N/A'}
            `).join('\n')

            return context
        } catch (error) {
            console.error('Error getting context:', error)
            return 'Unable to fetch context from database.'
        }
    }

    /**
     * Answer a question
     */
    async ask(question) {
        try {
            // Get relevant context
            const context = await this.getContext(question)

            // Create prompt manually
            const formattedPrompt = this.systemPrompt
                .replace('{context}', context)
                .replace('{question}', question)

            // Get response from LLM using correct API
            const response = await this.ollama.generate({
                model: 'llama3.2:3b',
                prompt: formattedPrompt,
                stream: false
            })

            return {
                answer: response.response,
                context: context,
                model: 'llama3.2:3b'
            }
        } catch (error) {
            console.error('AI Service error:', error)

            // Check if Ollama is not running
            if (error.message?.includes('ECONNREFUSED') || error.message?.includes('fetch failed')) {
                throw new Error('Ollama is not running. Please start Ollama first.')
            }

            throw new Error('Failed to generate response: ' + error.message)
        }
    }

    /**
     * Suggest actions based on question
     */
    async suggestActions(question) {
        const actions = []
        const lowerQ = question.toLowerCase()

        // Detect comparison intent
        if (lowerQ.includes('compare') || lowerQ.includes('vs') || lowerQ.includes('versus')) {
            actions.push({
                type: 'compare',
                label: 'Compare Places',
                icon: '📊'
            })
        }

        // Detect map intent
        if (lowerQ.includes('where') || lowerQ.includes('location') || lowerQ.includes('map')) {
            actions.push({
                type: 'map',
                label: 'View on Map',
                icon: '🗺️'
            })
        }

        // Detect explore intent
        if (lowerQ.includes('show') || lowerQ.includes('list') || lowerQ.includes('all')) {
            actions.push({
                type: 'explore',
                label: 'Explore Places',
                icon: '🔍'
            })
        }

        return actions
    }

    /**
     * Check if Ollama is available
     */
    async checkHealth() {
        try {
            const response = await this.ollama.generate({
                model: 'llama3.2:3b',
                prompt: 'Hello',
                stream: false
            })
            return {
                available: true,
                model: 'llama3.2:3b',
                response: response.response
            }
        } catch (error) {
            return {
                available: false,
                error: error.message
            }
        }
    }

    /**
     * Analyze local text signals to identify business opportunities
     * 
     * @param {string} placeName - Name of the location
     * @param {Array<string>} inputs - Raw text inputs (blogs, reports, complaints)
     * @returns {Array} - List of structured Opportunity objects
     */
    async analyzeLocalSignals(placeName, inputs) {
        // ... (existing implementation) ...
    }

    /**
     * Build rich context for the Consultant Profile
     * Aggregates Governance, Culture, Opportunities, and Verified Community Data
     */
    async getConsultantContext(placeId) {
        try {
            // 1. Fetch Core Place Data
            const place = await mongoPlaceService.getPlaceById(placeId)
            if (!place) throw new Error("Place not found")

            // 2. Fetch AI Opportunities
            const opportunities = await Opportunity.find({ place_id: placeId })
                .sort({ 'signal.confidence_score': -1 })
                .limit(5)

            // 3. Fetch Approved Community Insights (High Reputation only)
            const communityInsights = await Contribution.find({
                place_id: placeId,
                status: 'approved',
                type: { $in: ['issue', 'blog'] }
            }).limit(3)

            // Serialize Context
            return JSON.stringify({
                profile: {
                    name: place.canonical_name,
                    type: place.place_type,
                    population: place.population?.value,
                    literacy: place.literacy_rate?.value,
                    economy: place.major_industries
                },
                governance: place.governance ? {
                    type: place.governance.administration?.type,
                    schemes: place.governance.government_schemes
                } : 'N/A',
                culture: place.culture_society ? {
                    norms: place.culture_society.social_norms,
                    tips: place.culture_society.market_adaptation_tips
                } : 'N/A',
                opportunities: opportunities.map(o => ({
                    title: o.signal.title,
                    type: o.signal.type,
                    confidence: o.signal.confidence_score
                })),
                community_voices: communityInsights.map(c => c.data.title)
            }, null, 2)

        } catch (error) {
            console.error("Context Build Error", error)
            return "{}"
        }
    }

    /**
     * Ask the AI Consultant a question
     * Returns structured JSON with citations and confidence
     */
    async askConsultant(placeId, question) {
        try {
            const contextJson = await this.getConsultantContext(placeId)

            const consultantPrompt = `
You are the "BharatAtlas Decision Support Agent". 
Your goal is to answer entrepreneurial questions using ONLY the provided data.

CONTEXT DATA:
${contextJson}

USER QUESTION: 
"${question}"

RULES:
1. CITATIONS: You must cite the specific data layer used (e.g., [Governance], [Culture], [Opportunity: "Gap Title"]).
2. CONFIDENCE: Assign a score (0-100) based on how much the data ACTUALLY supports the answer.
3. MISSING DATA: If the answer requires data not in the context (like "real estate prices"), list it in "missing_data".
4. TONE: Professional, objective, risk-aware.

OUTPUT FORMAT (JSON ONLY):
{
  "answer": "Your detailed answer here with embedded citations like [Culture].",
  "confidence_score": 85,
  "data_layers_used": ["Culture", "Demographics"],
  "missing_data": ["Rental Costs", "Footfall"]
}
`
            const response = await this.ollama.generate({
                model: 'llama3.2:3b',
                prompt: consultantPrompt,
                stream: false,
                format: 'json'
            })

            return JSON.parse(response.response)

        } catch (error) {
            console.error("Consultant Error:", error)
            // Fallback error structure
            return {
                answer: "I encountered an error analyzing the data. Please try again.",
                confidence_score: 0,
                data_layers_used: [],
                missing_data: []
            }
        }
    }
}

export default new AIService()
