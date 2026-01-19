/**
 * Get all states with pagination and field projection
 */
export function getAllStates(page?: number, limit?: number, fields?: any[]): Promise<{
    data: any;
    pagination: {
        page: number;
        limit: number;
        total: any;
        totalPages: number;
        hasMore: boolean;
    };
}>;
/**
 * Get place by ID with optional field projection
 */
export function getPlaceById(placeId: any, fields?: any[]): Promise<any>;
/**
 * Get place by name
 */
export function getPlaceByName(name: any): Promise<any>;
/**
 * Search places with pagination
 */
export function searchPlaces(query: any, page?: number, limit?: number): Promise<{
    data: any;
    pagination: {
        page: number;
        limit: number;
        total: any;
        totalPages: number;
        hasMore: boolean;
    };
}>;
/**
 * Get places by type with pagination
 */
export function getPlacesByType(placeType: any, page?: number, limit?: number): Promise<{
    data: any;
    pagination: {
        page: number;
        limit: number;
        total: any;
        totalPages: number;
        hasMore: boolean;
    };
}>;
/**
 * Get children of a place
 */
export function getChildren(placeId: any, options?: {}): Promise<{
    data: any;
    total: any;
    limit: any;
    offset: any;
}>;
declare namespace _default {
    export { getAllStates };
    export { getPlaceById };
    export { getPlaceByName };
    export { searchPlaces };
    export { getPlacesByType };
    export { getChildren };
}
export default _default;
//# sourceMappingURL=mongoPlaceService.d.ts.map