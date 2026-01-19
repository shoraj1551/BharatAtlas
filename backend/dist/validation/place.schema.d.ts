/**
 * Zod Validation Schemas
 *
 * Runtime validation for API requests
 */
import { z } from 'zod';
export declare const PlaceTypeSchema: z.ZodEnum<{
    state: "state";
    district: "district";
    city: "city";
    "union territory": "union territory";
}>;
export declare const PlaceQuerySchema: z.ZodObject<{
    place_type: z.ZodOptional<z.ZodEnum<{
        state: "state";
        district: "district";
        city: "city";
        "union territory": "union territory";
    }>>;
    limit: z.ZodDefault<z.ZodNumber>;
    offset: z.ZodDefault<z.ZodNumber>;
    page: z.ZodOptional<z.ZodNumber>;
    fields: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
export declare const PlaceSearchSchema: z.ZodObject<{
    q: z.ZodString;
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
}, z.core.$strip>;
export declare const PlaceIdSchema: z.ZodObject<{
    placeId: z.ZodString;
}, z.core.$strip>;
export declare const PaginationSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
}, z.core.$strip>;
export type PlaceQueryInput = z.infer<typeof PlaceQuerySchema>;
export type PlaceSearchInput = z.infer<typeof PlaceSearchSchema>;
export type PlaceIdInput = z.infer<typeof PlaceIdSchema>;
export type PaginationInput = z.infer<typeof PaginationSchema>;
//# sourceMappingURL=place.schema.d.ts.map