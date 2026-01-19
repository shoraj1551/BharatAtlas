import HistoricalData from '../../models/HistoricalData.js';
import { createLogger } from '../utils/logger.js';
const logger = createLogger('HistoricalDataService');
/**
 * Get historical data for a specific metric
 */
export async function getHistoricalData(placeId, metric) {
    try {
        const data = await HistoricalData.find({ place_id: placeId, metric })
            .sort({ year: 1 })
            .lean();
        return data;
    }
    catch (error) {
        logger.error('Error getting historical data:', error);
        throw error;
    }
}
/**
 * Get all historical data for a place
 */
export async function getAllHistoricalData(placeId) {
    try {
        const data = await HistoricalData.find({ place_id: placeId })
            .sort({ metric: 1, year: 1 })
            .lean();
        // Group by metric
        const grouped = data.reduce((acc, item) => {
            if (!acc[item.metric]) {
                acc[item.metric] = [];
            }
            acc[item.metric].push({
                year: item.year,
                value: item.value,
                source: item.source
            });
            return acc;
        }, {});
        return grouped;
    }
    catch (error) {
        logger.error('Error getting all historical data:', error);
        throw error;
    }
}
/**
 * Import census data (bulk insert)
 */
export async function importCensusData(year, censusData) {
    try {
        const records = censusData.map(item => ({
            place_id: item.place_id,
            metric: item.metric,
            value: item.value,
            year,
            source: `Census ${year}`
        }));
        const result = await HistoricalData.insertMany(records, { ordered: false });
        logger.info(`Imported ${result.length} historical records for year ${year}`);
        return result;
    }
    catch (error) {
        logger.error('Error importing census data:', error);
        throw error;
    }
}
/**
 * Get available years for a place
 */
export async function getAvailableYears(placeId) {
    try {
        const years = await HistoricalData.distinct('year', { place_id: placeId });
        return years.sort((a, b) => a - b);
    }
    catch (error) {
        logger.error('Error getting available years:', error);
        throw error;
    }
}
/**
 * Get available metrics for a place
 */
export async function getAvailableMetrics(placeId) {
    try {
        const metrics = await HistoricalData.distinct('metric', { place_id: placeId });
        return metrics;
    }
    catch (error) {
        logger.error('Error getting available metrics:', error);
        throw error;
    }
}
//# sourceMappingURL=historicalDataService.js.map