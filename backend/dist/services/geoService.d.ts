/**
 * Get all states
 */
export function getStates(): Promise<any>;
/**
 * Get districts for a specific state
 */
export function getDistrictsForState(stateName: any): Promise<any>;
/**
 * Get tehsils for a specific district
 * TODO: Implement when tehsil data is available
 */
export function getTehsilsForDistrict(districtName: any): Promise<{
    type: string;
    features: never[];
}>;
/**
 * Get thanas for a specific tehsil
 * TODO: Implement when thana data is available
 */
export function getThanasForTehsil(tehsilName: any): Promise<{
    type: string;
    features: never[];
}>;
/**
 * Get villages for a specific thana (paginated, points only)
 * TODO: Implement when village data is available
 */
export function getVillagesForThana(thanaName: any, limit?: number): Promise<{
    type: string;
    features: never[];
}>;
//# sourceMappingURL=geoService.d.ts.map