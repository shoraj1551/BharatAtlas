import { Ollama } from 'ollama';
import mongoPlaceService from './mongoPlaceService.js';
import Opportunity from '../../models/Opportunity.js';
import Contribution from '../../models/Contribution.js';
class AIService {
    constructor() {
        // Initialize Ollama
        this.ollama = new Ollama({
            host: 'http://localhost:11434'
        });
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

Provide a helpful, accurate response:`;
    }
    /**
     * Get relevant context from database
     */
    async getContext(query) {
        try {
            // Search for relevant places
            const places = await mongoPlaceService.searchPlaces(query, 5);
            if (places.length === 0) {
                return 'No specific places found in database.';
            }
            // Format context
            const context = places.map(p => `
${p.canonical_name} (${p.place_type}):
- Population: ${p.population?.value?.toLocaleString() || 'N/A'} (${p.population?.year || 'N/A'})
- Area: ${p.area_sq_km?.toLocaleString() || 'N/A'} sq km
- Literacy: ${p.literacy_rate?.value || 'N/A'}%
- Industries: ${p.major_industries?.join(', ') || 'N/A'}
            `).join('\n');
            return context;
        }
        catch (error) {
            console.error('Error getting context:', error);
            return 'Unable to fetch context from database.';
        }
    }
    /**
     * Answer a question
     */
    async ask(question) {
        try {
            // Get relevant context
            const context = await this.getContext(question);
            // Create prompt manually
            const formattedPrompt = this.systemPrompt
                .replace('{context}', context)
                .replace('{question}', question);
            // Get response from LLM using correct API
            const response = await this.ollama.generate({
                model: 'llama3.2:3b',
                prompt: formattedPrompt,
                stream: false
            });
            return {
                answer: response.response,
                context: context,
                model: 'llama3.2:3b'
            };
        }
        catch (error) {
            console.error('AI Service error:', error);
            // Check if Ollama is not running
            if (error.message?.includes('ECONNREFUSED') || error.message?.includes('fetch failed')) {
                throw new Error('Ollama is not running. Please start Ollama first.');
            }
            throw new Error('Failed to generate response: ' + error.message);
        }
    }
    /**
     * Suggest actions based on question
     */
    async suggestActions(question) {
        const actions = [];
        const lowerQ = question.toLowerCase();
        // Detect comparison intent
        if (lowerQ.includes('compare') || lowerQ.includes('vs') || lowerQ.includes('versus')) {
            actions.push({
                type: 'compare',
                label: 'Compare Places',
                icon: '📊'
            });
        }
        // Detect map intent
        if (lowerQ.includes('where') || lowerQ.includes('location') || lowerQ.includes('map')) {
            actions.push({
                type: 'map',
                label: 'View on Map',
                icon: '🗺️'
            });
        }
        // Detect explore intent
        if (lowerQ.includes('show') || lowerQ.includes('list') || lowerQ.includes('all')) {
            actions.push({
                type: 'explore',
                label: 'Explore Places',
                icon: '🔍'
            });
        }
        return actions;
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
            });
            return {
                available: true,
                model: 'llama3.2:3b',
                response: response.response
            };
        }
        catch (error) {
            return {
                available: false,
                error: error.message
            };
        }
    }
    /**
     * Analyze local text signals to identify business opportunities
     *
     * @param {string} placeId - ID of the place
     * @returns {Array} - List of structured Opportunity objects
     */
    async analyzeLocalSignals(placeId) {
        try {
            // 1. Fetch User Contributions (Issues/Complaints)
            const contributions = await Contribution.find({
                place_id: placeId,
                status: 'approved',
                type: 'issue'
            }).limit(50); // Analyze last 50 issues
            if (contributions.length === 0) {
                return [];
            }
            const complaintsText = contributions
                .map((c, i) => `${i + 1}. ${c.data.title}: ${c.data.body}`)
                .join('\n');
            // 2. Prompt for Clustering & Opportunity Conversion
            const prompt = `
You are an expert Business Strategy Consultant.
I have a list of citizen complaints from a specific location in India.

YOUR TASK:
1. Cluster related complaints (e.g., "No bus" + "Far school" = Transport Issue).
2. Convert each cluster into a specific "Business Opportunity".
3. Assign a confidence score (0-100) based on how many complaints imply this need.

COMPLAINTS LIST:
${complaintsText}

OUTPUT FORMAT (JSON ONLY):
[
  {
    "title": "Evening Public Transport Service",
    "description": "High demand for travel after 7 PM detected from multiple complaints regarding student and worker mobility.",
    "type": "Gap",
    "confidence_score": 85,
    "evidence_snippets": ["No bus after 7 PM", "Students travel 30km"]
  }
]
`;
            // 3. Generate Analysis
            const response = await this.ollama.generate({
                model: 'llama3.2:3b',
                prompt: prompt,
                stream: false,
                format: 'json'
            });
            const analysis = JSON.parse(response.response);
            // 4. Persistence: Save/Update Opportunities
            const savedOpportunities = [];
            for (const item of analysis) {
                // Upsert to avoid duplicates if running multiple times
                const opp = await Opportunity.findOneAndUpdate({
                    place_id: placeId,
                    'signal.title': item.title
                }, {
                    place_id: placeId,
                    sector: 'General', // LLM could infer this too, defaulting for now
                    signal: {
                        title: item.title,
                        description: item.description,
                        type: item.type,
                        confidence_score: item.confidence_score
                    },
                    evidence: item.evidence_snippets?.map(s => ({ snippet: s, source: "Community Signal" })),
                    recommended_business_models: ["Service Aggregator", "Local SME"],
                    created_at: new Date()
                }, { upsert: true, new: true });
                savedOpportunities.push(opp);
            }
            return savedOpportunities;
        }
        catch (error) {
            console.error("Signal Analysis Error:", error);
            return [];
        }
    }
    /**
     * Build rich context for the Consultant Profile
     * Aggregates Governance, Culture, Opportunities, and Verified Community Data
     */
    async getConsultantContext(placeId) {
        try {
            // 1. Fetch Core Place Data
            const place = await mongoPlaceService.getPlaceById(placeId);
            if (!place)
                throw new Error("Place not found");
            // 2. Fetch AI Opportunities
            const opportunities = await Opportunity.find({ place_id: placeId })
                .sort({ 'signal.confidence_score': -1 })
                .limit(5);
            // 3. Fetch Approved Community Insights (High Reputation only)
            const communityInsights = await Contribution.find({
                place_id: placeId,
                status: 'approved',
                type: { $in: ['issue', 'blog'] }
            }).limit(3);
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
            }, null, 2);
        }
        catch (error) {
            console.error("Context Build Error", error);
            return "{}";
        }
    }
    /**
     * Ask the AI Consultant a question
     * Returns structured JSON with citations and confidence
     */
    async askConsultant(placeId, question) {
        try {
            const contextJson = await this.getConsultantContext(placeId);
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
`;
            const response = await this.ollama.generate({
                model: 'llama3.2:3b',
                prompt: consultantPrompt,
                stream: false,
                format: 'json'
            });
            return JSON.parse(response.response);
        }
        catch (error) {
            console.error("Consultant Error:", error);
            // Fallback error structure
            return {
                answer: "I encountered an error analyzing the data. Please try again.",
                confidence_score: 0,
                data_layers_used: [],
                missing_data: []
            };
        }
    }
    /**
     * Generate One-Screen Place Intelligence Summary
     * Identity, People, Business Fit
     */
    async generateIntelligenceSummary(placeId) {
        try {
            // 1. Build Context 
            // We reuse getConsultantContext but focus it for summary generation
            const contextJson = await this.getConsultantContext(placeId);
            // 2. Specialized Prompt
            const prompt = `
You are an expert economic analyst for the Indian market.
Analyze the following place data and output a "Place Intelligence Summary".

DATA:
${contextJson}

INSTRUCTIONS:
Output a structured JSON summary with exactly these 3 sections.
Keep it concise, high-impact, and grounded in the data.

1. "identity": What kind of place is this? (e.g., "Agriculture-dominant tehsil with seasonal migration...")
2. "people": Who lives/works here? (e.g., "Young workforce with high literacy but looking for local jobs...")
3. "opportunity": What fits / doesn't fit? (e.g., "Cold storage matches perfectly; Luxury retail will fail due to...")

OUTPUT FORMAT (JSON ONLY):
{
  "identity": "...",
  "people": "...",
  "opportunity": "..."
}
`;
            const response = await this.ollama.generate({
                model: 'llama3.2:3b',
                prompt: prompt,
                stream: false,
                format: 'json'
            });
            return JSON.parse(response.response);
        }
        catch (error) {
            console.error("Intelligence Summary Error:", error);
            return {
                identity: "Data unavailable for identity analysis.",
                people: "Demographic data not currently accessible.",
                opportunity: "Cannot determine business fit at this time."
            };
        }
    }
    /**
     * Evaluate the viability of a specific business idea in a place
     *
     * @param {string} placeId
     * @param {string} businessType
     */
    async evaluateBusinessFit(placeId, businessType) {
        try {
            // reuse context builder
            const contextJson = await this.getConsultantContext(placeId);
            const prompt = `
You are a conservative Investment Risk Analyst for the Indian market.
A user wants to start a "${businessType}" in this location.
Evaluate its feasibility based strictly on the provided data.

DATA:
${contextJson}

INSTRUCTIONS:
1. FIT SCORE: 0-100 (0 = Terrible idea, 100 = Perfect match).
2. VERDICT: ONE sentence summary (e.g., "High potential due to lack of local competition and rising income.").
3. RISKS: List 3 specific risks based on the data (e.g., "Electricity supply is erratic").
4. VERIFICATION: List 3 things the user MUST check physically (e.g., "Check peak hour traffic at Main Bazaar").

OUTPUT FORMAT (JSON ONLY):
{
  "fit_score": 75,
  "verdict": "...",
  "reasoning": "...",
  "key_risks": ["Risk 1", "Risk 2", "Risk 3"],
  "on_ground_verification": ["Check 1", "Check 2", "Check 3"]
}
`;
            const response = await this.ollama.generate({
                model: 'llama3.2:3b',
                prompt: prompt,
                stream: false,
                format: 'json'
            });
            return JSON.parse(response.response);
        }
        catch (error) {
            console.error("Evaluation Error:", error);
            return {
                fit_score: 0,
                verdict: "Error analyzing business fit.",
                reasoning: "Please try again.",
                key_risks: [],
                on_ground_verification: []
            };
        }
    }
}
export default new AIService();
//# sourceMappingURL=aiService.js.map