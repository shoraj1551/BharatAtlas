/**
 * Zod Validation Schemas
 *
 * Runtime validation for API requests
 */
import { z } from 'zod';
// Place Type Enum
export const PlaceTypeSchema = z.enum(['state', 'district', 'city', 'union territory']);
// Place Query Schema
export const PlaceQuerySchema = z.object({
    place_type: PlaceTypeSchema.optional(),
    limit: z.number().int().min(1).max(100).default(10),
    offset: z.number().int().min(0).default(0),
    page: z.number().int().min(1).optional(),
    fields: z.array(z.string()).optional()
});
// Place Search Schema
export const PlaceSearchSchema = z.object({
    q: z.string().min(1, 'Search query is required'),
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(100).default(10)
});
// Place ID Param Schema
export const PlaceIdSchema = z.object({
    placeId: z.string().min(1, 'Place ID is required')
});
// Pagination Schema
export const PaginationSchema = z.object({
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(100).default(10)
});
//# sourceMappingURL=place.schema.js.map