import { Ollama } from 'ollama'
import mongoPlaceService from './mongoPlaceService.js'

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
}

export default new AIService()
