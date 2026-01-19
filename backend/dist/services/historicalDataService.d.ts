/**
 * Get historical data for a specific metric
 */
export function getHistoricalData(placeId: any, metric: any): Promise<(import("mongoose").FlattenMaps<{
    value: number;
    place_id: string;
    year: number;
    source: string;
    created_at: NativeDate;
    metric: "population" | "literacy_rate" | "sex_ratio" | "urban_population" | "rural_population" | "decadal_growth";
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
})[]>;
/**
 * Get all historical data for a place
 */
export function getAllHistoricalData(placeId: any): Promise<{}>;
/**
 * Import census data (bulk insert)
 */
export function importCensusData(year: any, censusData: any): Promise<import("mongoose").MergeType<import("mongoose").Document<unknown, {}, {
    value: number;
    place_id: string;
    year: number;
    source: string;
    created_at: NativeDate;
    metric: "population" | "literacy_rate" | "sex_ratio" | "urban_population" | "rural_population" | "decadal_growth";
}, {}, import("mongoose").DefaultSchemaOptions> & {
    value: number;
    place_id: string;
    year: number;
    source: string;
    created_at: NativeDate;
    metric: "population" | "literacy_rate" | "sex_ratio" | "urban_population" | "rural_population" | "decadal_growth";
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Omit<any, "_id">>[]>;
/**
 * Get available years for a place
 */
export function getAvailableYears(placeId: any): Promise<number[]>;
/**
 * Get available metrics for a place
 */
export function getAvailableMetrics(placeId: any): Promise<NonNullable<"population" | "literacy_rate" | "sex_ratio" | "urban_population" | "rural_population" | "decadal_growth">[]>;
//# sourceMappingURL=historicalDataService.d.ts.map