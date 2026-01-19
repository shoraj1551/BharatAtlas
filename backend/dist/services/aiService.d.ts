declare const _default: AIService;
export default _default;
declare class AIService {
    ollama: Ollama;
    systemPrompt: string;
    /**
     * Get relevant context from database
     */
    getContext(query: any): Promise<any>;
    /**
     * Answer a question
     */
    ask(question: any): Promise<{
        answer: string;
        context: any;
        model: string;
    }>;
    /**
     * Suggest actions based on question
     */
    suggestActions(question: any): Promise<{
        type: string;
        label: string;
        icon: string;
    }[]>;
    /**
     * Check if Ollama is available
     */
    checkHealth(): Promise<{
        available: boolean;
        model: string;
        response: string;
        error?: undefined;
    } | {
        available: boolean;
        error: any;
        model?: undefined;
        response?: undefined;
    }>;
    /**
     * Analyze local text signals to identify business opportunities
     *
     * @param {string} placeId - ID of the place
     * @returns {Array} - List of structured Opportunity objects
     */
    analyzeLocalSignals(placeId: string): any[];
    /**
     * Build rich context for the Consultant Profile
     * Aggregates Governance, Culture, Opportunities, and Verified Community Data
     */
    getConsultantContext(placeId: any): Promise<string>;
    /**
     * Ask the AI Consultant a question
     * Returns structured JSON with citations and confidence
     */
    askConsultant(placeId: any, question: any): Promise<any>;
    /**
     * Generate One-Screen Place Intelligence Summary
     * Identity, People, Business Fit
     */
    generateIntelligenceSummary(placeId: any): Promise<any>;
    /**
     * Evaluate the viability of a specific business idea in a place
     *
     * @param {string} placeId
     * @param {string} businessType
     */
    evaluateBusinessFit(placeId: string, businessType: string): Promise<any>;
}
import { Ollama } from 'ollama';
//# sourceMappingURL=aiService.d.ts.map