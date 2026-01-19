/**
 * API Response Types
 *
 * Standard response formats for all API endpoints
 */
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: ErrorResponse;
}
export interface ErrorResponse {
    status: string;
    code?: string;
    message: string;
    stack?: string;
    details?: any;
}
export interface PaginatedResponse<T> {
    success: boolean;
    data: T[];
    pagination: PaginationMeta;
}
export interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
}
export interface HealthCheckResponse {
    status: 'ok' | 'error';
    timestamp: string;
    environment: string;
    uptime: number;
}
//# sourceMappingURL=api.types.d.ts.map