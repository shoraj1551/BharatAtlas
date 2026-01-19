/**
 * Cache middleware for single place requests
 * GET /api/places/:id
 */
export function cachePlaceById(req: any, res: any, next: any): any;
/**
 * Cache middleware for place lists
 * GET /api/places/states, /search, etc.
 */
export function cachePlaceList(req: any, res: any, next: any): any;
/**
 * Invalidate cache for a specific place
 * Call this when place data is updated
 */
export function invalidatePlaceCache(placeId: any): void;
export function clearAllCache(): void;
export function getCacheStats(): NodeCache.Stats;
declare namespace _default {
    export { cachePlaceById };
    export { cachePlaceList };
    export { invalidatePlaceCache };
    export { clearAllCache };
    export { getCacheStats };
}
export default _default;
import NodeCache from 'node-cache';
//# sourceMappingURL=placeCache.d.ts.map