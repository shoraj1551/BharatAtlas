declare const _default: mongoose.Model<{
    name: string;
    created_at: NativeDate;
    updated_at: NativeDate;
    user_id: mongoose.Types.ObjectId;
    layout: mongoose.Types.DocumentArray<{
        widget_id: string;
        widget_type: "comparison" | "trend_chart" | "insight_card" | "map_view" | "top_places" | "readiness_gauge" | "industry_pie" | "growth_delta";
        position?: {
            y: number;
            w: number;
            h: number;
            x: number;
        } | null | undefined;
        config?: {
            placeIds: string[];
            title?: string | null | undefined;
            filters?: any;
            metric?: string | null | undefined;
            timeRange?: string | null | undefined;
        } | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        widget_id: string;
        widget_type: "comparison" | "trend_chart" | "insight_card" | "map_view" | "top_places" | "readiness_gauge" | "industry_pie" | "growth_delta";
        position?: {
            y: number;
            w: number;
            h: number;
            x: number;
        } | null | undefined;
        config?: {
            placeIds: string[];
            title?: string | null | undefined;
            filters?: any;
            metric?: string | null | undefined;
            timeRange?: string | null | undefined;
        } | null | undefined;
    }> & {
        widget_id: string;
        widget_type: "comparison" | "trend_chart" | "insight_card" | "map_view" | "top_places" | "readiness_gauge" | "industry_pie" | "growth_delta";
        position?: {
            y: number;
            w: number;
            h: number;
            x: number;
        } | null | undefined;
        config?: {
            placeIds: string[];
            title?: string | null | undefined;
            filters?: any;
            metric?: string | null | undefined;
            timeRange?: string | null | undefined;
        } | null | undefined;
    }>;
    is_public: boolean;
    description?: string | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    name: string;
    created_at: NativeDate;
    updated_at: NativeDate;
    user_id: mongoose.Types.ObjectId;
    layout: mongoose.Types.DocumentArray<{
        widget_id: string;
        widget_type: "comparison" | "trend_chart" | "insight_card" | "map_view" | "top_places" | "readiness_gauge" | "industry_pie" | "growth_delta";
        position?: {
            y: number;
            w: number;
            h: number;
            x: number;
        } | null | undefined;
        config?: {
            placeIds: string[];
            title?: string | null | undefined;
            filters?: any;
            metric?: string | null | undefined;
            timeRange?: string | null | undefined;
        } | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        widget_id: string;
        widget_type: "comparison" | "trend_chart" | "insight_card" | "map_view" | "top_places" | "readiness_gauge" | "industry_pie" | "growth_delta";
        position?: {
            y: number;
            w: number;
            h: number;
            x: number;
        } | null | undefined;
        config?: {
            placeIds: string[];
            title?: string | null | undefined;
            filters?: any;
            metric?: string | null | undefined;
            timeRange?: string | null | undefined;
        } | null | undefined;
    }> & {
        widget_id: string;
        widget_type: "comparison" | "trend_chart" | "insight_card" | "map_view" | "top_places" | "readiness_gauge" | "industry_pie" | "growth_delta";
        position?: {
            y: number;
            w: number;
            h: number;
            x: number;
        } | null | undefined;
        config?: {
            placeIds: string[];
            title?: string | null | undefined;
            filters?: any;
            metric?: string | null | undefined;
            timeRange?: string | null | undefined;
        } | null | undefined;
    }>;
    is_public: boolean;
    description?: string | null | undefined;
}, {}, mongoose.DefaultSchemaOptions> & {
    name: string;
    created_at: NativeDate;
    updated_at: NativeDate;
    user_id: mongoose.Types.ObjectId;
    layout: mongoose.Types.DocumentArray<{
        widget_id: string;
        widget_type: "comparison" | "trend_chart" | "insight_card" | "map_view" | "top_places" | "readiness_gauge" | "industry_pie" | "growth_delta";
        position?: {
            y: number;
            w: number;
            h: number;
            x: number;
        } | null | undefined;
        config?: {
            placeIds: string[];
            title?: string | null | undefined;
            filters?: any;
            metric?: string | null | undefined;
            timeRange?: string | null | undefined;
        } | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        widget_id: string;
        widget_type: "comparison" | "trend_chart" | "insight_card" | "map_view" | "top_places" | "readiness_gauge" | "industry_pie" | "growth_delta";
        position?: {
            y: number;
            w: number;
            h: number;
            x: number;
        } | null | undefined;
        config?: {
            placeIds: string[];
            title?: string | null | undefined;
            filters?: any;
            metric?: string | null | undefined;
            timeRange?: string | null | undefined;
        } | null | undefined;
    }> & {
        widget_id: string;
        widget_type: "comparison" | "trend_chart" | "insight_card" | "map_view" | "top_places" | "readiness_gauge" | "industry_pie" | "growth_delta";
        position?: {
            y: number;
            w: number;
            h: number;
            x: number;
        } | null | undefined;
        config?: {
            placeIds: string[];
            title?: string | null | undefined;
            filters?: any;
            metric?: string | null | undefined;
            timeRange?: string | null | undefined;
        } | null | undefined;
    }>;
    is_public: boolean;
    description?: string | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    name: string;
    created_at: NativeDate;
    updated_at: NativeDate;
    user_id: mongoose.Types.ObjectId;
    layout: mongoose.Types.DocumentArray<{
        widget_id: string;
        widget_type: "comparison" | "trend_chart" | "insight_card" | "map_view" | "top_places" | "readiness_gauge" | "industry_pie" | "growth_delta";
        position?: {
            y: number;
            w: number;
            h: number;
            x: number;
        } | null | undefined;
        config?: {
            placeIds: string[];
            title?: string | null | undefined;
            filters?: any;
            metric?: string | null | undefined;
            timeRange?: string | null | undefined;
        } | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        widget_id: string;
        widget_type: "comparison" | "trend_chart" | "insight_card" | "map_view" | "top_places" | "readiness_gauge" | "industry_pie" | "growth_delta";
        position?: {
            y: number;
            w: number;
            h: number;
            x: number;
        } | null | undefined;
        config?: {
            placeIds: string[];
            title?: string | null | undefined;
            filters?: any;
            metric?: string | null | undefined;
            timeRange?: string | null | undefined;
        } | null | undefined;
    }> & {
        widget_id: string;
        widget_type: "comparison" | "trend_chart" | "insight_card" | "map_view" | "top_places" | "readiness_gauge" | "industry_pie" | "growth_delta";
        position?: {
            y: number;
            w: number;
            h: number;
            x: number;
        } | null | undefined;
        config?: {
            placeIds: string[];
            title?: string | null | undefined;
            filters?: any;
            metric?: string | null | undefined;
            timeRange?: string | null | undefined;
        } | null | undefined;
    }>;
    is_public: boolean;
    description?: string | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    name: string;
    created_at: NativeDate;
    updated_at: NativeDate;
    user_id: mongoose.Types.ObjectId;
    layout: mongoose.Types.DocumentArray<{
        widget_id: string;
        widget_type: "comparison" | "trend_chart" | "insight_card" | "map_view" | "top_places" | "readiness_gauge" | "industry_pie" | "growth_delta";
        position?: {
            y: number;
            w: number;
            h: number;
            x: number;
        } | null | undefined;
        config?: {
            placeIds: string[];
            title?: string | null | undefined;
            filters?: any;
            metric?: string | null | undefined;
            timeRange?: string | null | undefined;
        } | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        widget_id: string;
        widget_type: "comparison" | "trend_chart" | "insight_card" | "map_view" | "top_places" | "readiness_gauge" | "industry_pie" | "growth_delta";
        position?: {
            y: number;
            w: number;
            h: number;
            x: number;
        } | null | undefined;
        config?: {
            placeIds: string[];
            title?: string | null | undefined;
            filters?: any;
            metric?: string | null | undefined;
            timeRange?: string | null | undefined;
        } | null | undefined;
    }> & {
        widget_id: string;
        widget_type: "comparison" | "trend_chart" | "insight_card" | "map_view" | "top_places" | "readiness_gauge" | "industry_pie" | "growth_delta";
        position?: {
            y: number;
            w: number;
            h: number;
            x: number;
        } | null | undefined;
        config?: {
            placeIds: string[];
            title?: string | null | undefined;
            filters?: any;
            metric?: string | null | undefined;
            timeRange?: string | null | undefined;
        } | null | undefined;
    }>;
    is_public: boolean;
    description?: string | null | undefined;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    name: string;
    created_at: NativeDate;
    updated_at: NativeDate;
    user_id: mongoose.Types.ObjectId;
    layout: mongoose.Types.DocumentArray<{
        widget_id: string;
        widget_type: "comparison" | "trend_chart" | "insight_card" | "map_view" | "top_places" | "readiness_gauge" | "industry_pie" | "growth_delta";
        position?: {
            y: number;
            w: number;
            h: number;
            x: number;
        } | null | undefined;
        config?: {
            placeIds: string[];
            title?: string | null | undefined;
            filters?: any;
            metric?: string | null | undefined;
            timeRange?: string | null | undefined;
        } | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        widget_id: string;
        widget_type: "comparison" | "trend_chart" | "insight_card" | "map_view" | "top_places" | "readiness_gauge" | "industry_pie" | "growth_delta";
        position?: {
            y: number;
            w: number;
            h: number;
            x: number;
        } | null | undefined;
        config?: {
            placeIds: string[];
            title?: string | null | undefined;
            filters?: any;
            metric?: string | null | undefined;
            timeRange?: string | null | undefined;
        } | null | undefined;
    }> & {
        widget_id: string;
        widget_type: "comparison" | "trend_chart" | "insight_card" | "map_view" | "top_places" | "readiness_gauge" | "industry_pie" | "growth_delta";
        position?: {
            y: number;
            w: number;
            h: number;
            x: number;
        } | null | undefined;
        config?: {
            placeIds: string[];
            title?: string | null | undefined;
            filters?: any;
            metric?: string | null | undefined;
            timeRange?: string | null | undefined;
        } | null | undefined;
    }>;
    is_public: boolean;
    description?: string | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
import mongoose from 'mongoose';
//# sourceMappingURL=Dashboard.d.ts.map