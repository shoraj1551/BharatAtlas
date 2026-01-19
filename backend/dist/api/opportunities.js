import express from 'express';
import aiService from '../services/aiService.js';
import Opportunity from '../../models/Opportunity.js';
const router = express.Router();
// Get Opportunities for a Place
router.get('/:placeId', async (req, res) => {
    try {
        const opportunities = await Opportunity.find({ place_id: req.params.placeId })
            .sort({ 'signal.confidence_score': -1 });
        res.json(opportunities);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Trigger AI Analysis (Problem -> Opportunity)
router.post('/analyze/:placeId', async (req, res) => {
    try {
        const { placeId } = req.params;
        // In a real app, this would be an async background job
        // For demo, we await it
        const newOpportunities = await aiService.analyzeLocalSignals(placeId);
        res.json({
            success: true,
            count: newOpportunities.length,
            opportunities: newOpportunities
        });
    }
    catch (error) {
        console.error("Analysis Error:", error);
        res.status(500).json({ error: "Failed to generate opportunities via AI" });
    }
});
/**
 * POST /api/places/:placeId/opportunities/evaluate
 * Evaluate a specific user business idea
 */
router.post('/evaluate/:placeId', async (req, res, next) => {
    try {
        const { placeId } = req.params;
        const { businessType } = req.body;
        if (!businessType) {
            return res.status(400).json({ success: false, error: "Business Type is required" });
        }
        const evaluation = await aiService.evaluateBusinessFit(placeId, businessType);
        res.json({ success: true, data: evaluation });
    }
    catch (error) {
        next(error);
    }
});
export default router;
//# sourceMappingURL=opportunities.js.map