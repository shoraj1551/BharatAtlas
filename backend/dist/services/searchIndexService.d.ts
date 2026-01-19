/**
 * Index a single place
 */
export function indexPlace(place: any): Promise<void>;
/**
 * Rebuild entire search index
 */
export function rebuildSearchIndex(): Promise<{
    indexed: number;
    total: number;
}>;
/**
 * Advanced search with filters
 */
export function advancedSearch(query: any, filters?: {}, options?: {}): Promise<{
    results: (import("mongoose").FlattenMaps<{
        place_id: string;
        canonical_name: string;
        last_indexed: NativeDate;
        place_type?: "state" | "district" | "city" | "union territory" | null | undefined;
        search_vector?: string | null | undefined;
        filters?: {
            industries: string[];
            area_sq_km?: number | null | undefined;
            population_density?: number | null | undefined;
            population?: {
                value?: number | null | undefined;
                range?: string | null | undefined;
            } | null | undefined;
            literacy_rate?: {
                value?: number | null | undefined;
                range?: string | null | undefined;
            } | null | undefined;
            infrastructure_score?: number | null | undefined;
            climate_type?: string | null | undefined;
        } | null | undefined;
        readiness_score?: {
            total?: number | null | undefined;
            label?: string | null | undefined;
        } | null | undefined;
        createdAt: NativeDate;
        updatedAt: NativeDate;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[];
    total: number;
    page: number;
    limit: any;
    hasMore: boolean;
}>;
//# sourceMappingURL=searchIndexService.d.ts.map