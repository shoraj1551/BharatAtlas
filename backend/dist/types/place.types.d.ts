/**
 * Place Data Types
 *
 * Type definitions for place-related data structures
 */
export type PlaceType = 'state' | 'district' | 'city' | 'union territory';
export interface Place {
    place_id: string;
    canonical_name: string;
    place_type: PlaceType;
    local_names?: {
        hi?: string;
        ta?: string;
        bn?: string;
        [key: string]: string | undefined;
    };
    population?: {
        value: number;
        year: number;
        source: string;
    };
    area_sq_km?: number;
    population_density?: number;
    literacy_rate?: {
        value: number;
        year: number;
    };
    major_industries?: string[];
    governance?: {
        administration?: {
            type: string;
        };
        administrative_head?: string;
        government_schemes?: any[];
    };
    culture_society?: {
        market_adaptation_tips?: string[];
        social_norms?: any;
    };
    data_quality?: string;
    data_quality_score?: number;
    readiness?: {
        total_score: number;
        label: string;
        breakdown: {
            workforce: number;
            infrastructure: number;
            governance: number;
            social_fit: number;
            data_reliability: number;
        };
    };
    parent_place_id?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface PlaceQuery {
    place_type?: PlaceType;
    limit?: number;
    offset?: number;
    page?: number;
    fields?: string[];
}
export interface PlaceSearchQuery {
    q: string;
    page?: number;
    limit?: number;
}
//# sourceMappingURL=place.types.d.ts.map