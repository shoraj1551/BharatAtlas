declare const _default: mongoose.Model<{
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
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
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
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
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
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
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
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
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
} & mongoose.DefaultTimestampProps>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
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
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
import mongoose from 'mongoose';
//# sourceMappingURL=SearchIndex.d.ts.map