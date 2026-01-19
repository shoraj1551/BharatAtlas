export default Opportunity;
declare const Opportunity: mongoose.Model<{
    place_id: string;
    created_at: NativeDate;
    sector: string;
    evidence: mongoose.Types.DocumentArray<{
        date: NativeDate;
        source?: string | null | undefined;
        snippet?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        date: NativeDate;
        source?: string | null | undefined;
        snippet?: string | null | undefined;
    }> & {
        date: NativeDate;
        source?: string | null | undefined;
        snippet?: string | null | undefined;
    }>;
    recommended_business_models: string[];
    signal?: {
        type: "Gap" | "Trend" | "Pain Point" | "Underserved Market";
        title: string;
        description: string;
        confidence_score: number;
    } | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    place_id: string;
    created_at: NativeDate;
    sector: string;
    evidence: mongoose.Types.DocumentArray<{
        date: NativeDate;
        source?: string | null | undefined;
        snippet?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        date: NativeDate;
        source?: string | null | undefined;
        snippet?: string | null | undefined;
    }> & {
        date: NativeDate;
        source?: string | null | undefined;
        snippet?: string | null | undefined;
    }>;
    recommended_business_models: string[];
    signal?: {
        type: "Gap" | "Trend" | "Pain Point" | "Underserved Market";
        title: string;
        description: string;
        confidence_score: number;
    } | null | undefined;
}, {}, mongoose.DefaultSchemaOptions> & {
    place_id: string;
    created_at: NativeDate;
    sector: string;
    evidence: mongoose.Types.DocumentArray<{
        date: NativeDate;
        source?: string | null | undefined;
        snippet?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        date: NativeDate;
        source?: string | null | undefined;
        snippet?: string | null | undefined;
    }> & {
        date: NativeDate;
        source?: string | null | undefined;
        snippet?: string | null | undefined;
    }>;
    recommended_business_models: string[];
    signal?: {
        type: "Gap" | "Trend" | "Pain Point" | "Underserved Market";
        title: string;
        description: string;
        confidence_score: number;
    } | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    place_id: string;
    created_at: NativeDate;
    sector: string;
    evidence: mongoose.Types.DocumentArray<{
        date: NativeDate;
        source?: string | null | undefined;
        snippet?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        date: NativeDate;
        source?: string | null | undefined;
        snippet?: string | null | undefined;
    }> & {
        date: NativeDate;
        source?: string | null | undefined;
        snippet?: string | null | undefined;
    }>;
    recommended_business_models: string[];
    signal?: {
        type: "Gap" | "Trend" | "Pain Point" | "Underserved Market";
        title: string;
        description: string;
        confidence_score: number;
    } | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    place_id: string;
    created_at: NativeDate;
    sector: string;
    evidence: mongoose.Types.DocumentArray<{
        date: NativeDate;
        source?: string | null | undefined;
        snippet?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        date: NativeDate;
        source?: string | null | undefined;
        snippet?: string | null | undefined;
    }> & {
        date: NativeDate;
        source?: string | null | undefined;
        snippet?: string | null | undefined;
    }>;
    recommended_business_models: string[];
    signal?: {
        type: "Gap" | "Trend" | "Pain Point" | "Underserved Market";
        title: string;
        description: string;
        confidence_score: number;
    } | null | undefined;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    place_id: string;
    created_at: NativeDate;
    sector: string;
    evidence: mongoose.Types.DocumentArray<{
        date: NativeDate;
        source?: string | null | undefined;
        snippet?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        date: NativeDate;
        source?: string | null | undefined;
        snippet?: string | null | undefined;
    }> & {
        date: NativeDate;
        source?: string | null | undefined;
        snippet?: string | null | undefined;
    }>;
    recommended_business_models: string[];
    signal?: {
        type: "Gap" | "Trend" | "Pain Point" | "Underserved Market";
        title: string;
        description: string;
        confidence_score: number;
    } | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
import mongoose from 'mongoose';
//# sourceMappingURL=Opportunity.d.ts.map