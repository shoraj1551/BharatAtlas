import { Parser } from 'json2csv';
import Place from '../../models/Place.js';
export async function exportPlaces(placeIds, format = 'json') {
    // If no placeIds provided (empty array or undefined), export a limit of 100 places for demo
    const query = (placeIds && placeIds.length > 0)
        ? { place_id: { $in: placeIds } }
        : {};
    const places = await Place.find(query).limit(100).lean();
    if (format === 'csv') {
        const fields = [
            'place_id',
            'canonical_name',
            'place_type',
            'population.value',
            'literacy_rate.value',
            'readiness.total_score',
            'readiness.label',
            'area_sq_km',
            'climate_type'
        ];
        // Flatten nested objects for CSV
        const flattenedPlaces = places.map(p => ({
            ...p,
            'population.value': p.population?.value,
            'literacy_rate.value': p.literacy_rate?.value,
            'readiness.total_score': p.readiness?.total_score,
            'readiness.label': p.readiness?.label
        }));
        const parser = new Parser({ fields });
        return {
            data: parser.parse(flattenedPlaces),
            contentType: 'text/csv',
            extension: 'csv'
        };
    }
    return {
        data: JSON.stringify(places, null, 2),
        contentType: 'application/json',
        extension: 'json'
    };
}
//# sourceMappingURL=exportService.js.map