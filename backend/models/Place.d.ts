export default Place;
declare const Place: mongoose.Model<{
    place_type: "state" | "district" | "city";
    place_id: string;
    canonical_name: string;
    major_industries: string[];
    children_ids: string[];
    created_at: NativeDate;
    updated_at: NativeDate;
    data_quality: "official" | "sample" | "verified";
    area_sq_km?: number | null | undefined;
    population_density?: number | null | undefined;
    local_names?: {
        hi?: string | null | undefined;
        ta?: string | null | undefined;
        bn?: string | null | undefined;
        te?: string | null | undefined;
        mr?: string | null | undefined;
        kn?: string | null | undefined;
        gu?: string | null | undefined;
        ml?: string | null | undefined;
        pa?: string | null | undefined;
    } | null | undefined;
    population?: {
        year: number;
        source: string;
        value?: number | null | undefined;
    } | null | undefined;
    literacy_rate?: {
        year: number;
        source: string;
        value?: number | null | undefined;
        male?: number | null | undefined;
        female?: number | null | undefined;
    } | null | undefined;
    historical_data?: {
        census_2001?: {
            population?: number | null | undefined;
            literacy_rate?: number | null | undefined;
        } | null | undefined;
        census_1991?: {
            population?: number | null | undefined;
            literacy_rate?: number | null | undefined;
        } | null | undefined;
    } | null | undefined;
    economic_data?: {
        gdp?: number | null | undefined;
        per_capita_income?: number | null | undefined;
        unemployment_rate?: number | null | undefined;
        growth_rate?: number | null | undefined;
        last_updated?: NativeDate | null | undefined;
        industry_breakdown?: {
            agriculture?: number | null | undefined;
            manufacturing?: number | null | undefined;
            services?: number | null | undefined;
        } | null | undefined;
    } | null | undefined;
    infrastructure?: {
        last_updated?: NativeDate | null | undefined;
        road_density?: number | null | undefined;
        railway_stations?: number | null | undefined;
        airports?: number | null | undefined;
        internet_penetration?: number | null | undefined;
        electricity_access?: number | null | undefined;
        infrastructure_score?: number | null | undefined;
    } | null | undefined;
    health_education?: {
        last_updated?: NativeDate | null | undefined;
        hospitals_per_100k?: number | null | undefined;
        doctors_per_100k?: number | null | undefined;
        hospital_beds_per_100k?: number | null | undefined;
        health_index?: number | null | undefined;
        schools_per_100k?: number | null | undefined;
        teachers_per_100k?: number | null | undefined;
        student_teacher_ratio?: number | null | undefined;
        education_index?: number | null | undefined;
    } | null | undefined;
    climate_environment?: {
        last_updated?: NativeDate | null | undefined;
        avg_temperature?: number | null | undefined;
        annual_rainfall?: number | null | undefined;
        forest_cover_percent?: number | null | undefined;
        air_quality_index?: number | null | undefined;
        environmental_score?: number | null | undefined;
    } | null | undefined;
    water_resources?: {
        major_water_bodies: string[];
        annual_rainfall_mm?: number | null | undefined;
        groundwater_level?: string | null | undefined;
        irrigation_coverage_percent?: number | null | undefined;
        water_quality?: string | null | undefined;
    } | null | undefined;
    governance?: {
        public_offices: mongoose.Types.DocumentArray<{
            type?: "judiciary" | "police" | "administrative" | "medical" | "other" | null | undefined;
            name?: string | null | undefined;
            address?: string | null | undefined;
            location?: {
                lat?: number | null | undefined;
                lng?: number | null | undefined;
            } | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            type?: "judiciary" | "police" | "administrative" | "medical" | "other" | null | undefined;
            name?: string | null | undefined;
            address?: string | null | undefined;
            location?: {
                lat?: number | null | undefined;
                lng?: number | null | undefined;
            } | null | undefined;
        }> & {
            type?: "judiciary" | "police" | "administrative" | "medical" | "other" | null | undefined;
            name?: string | null | undefined;
            address?: string | null | undefined;
            location?: {
                lat?: number | null | undefined;
                lng?: number | null | undefined;
            } | null | undefined;
        }>;
        local_processes: mongoose.Types.DocumentArray<{
            name?: string | null | undefined;
            responsible_office?: string | null | undefined;
            approval_timeline_days?: number | null | undefined;
            verification_required?: boolean | null | undefined;
            level?: "state" | "district" | "tehsil" | "village" | "block" | null | undefined;
            risk_level?: "Low" | "Medium" | "High" | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            name?: string | null | undefined;
            responsible_office?: string | null | undefined;
            approval_timeline_days?: number | null | undefined;
            verification_required?: boolean | null | undefined;
            level?: "state" | "district" | "tehsil" | "village" | "block" | null | undefined;
            risk_level?: "Low" | "Medium" | "High" | null | undefined;
        }> & {
            name?: string | null | undefined;
            responsible_office?: string | null | undefined;
            approval_timeline_days?: number | null | undefined;
            verification_required?: boolean | null | undefined;
            level?: "state" | "district" | "tehsil" | "village" | "block" | null | undefined;
            risk_level?: "Low" | "Medium" | "High" | null | undefined;
        }>;
        local_bodies: string[];
        government_schemes: string[];
        last_updated?: NativeDate | null | undefined;
        administrative_head?: string | null | undefined;
        lok_sabha_seats?: number | null | undefined;
        vidhan_sabha_seats?: number | null | undefined;
        data_source?: string | null | undefined;
        administration?: {
            district_magistrate?: {
                name?: string | null | undefined;
                office_address?: string | null | undefined;
                contact?: string | null | undefined;
            } | null | undefined;
            police_superintendent?: {
                name?: string | null | undefined;
                office_address?: string | null | undefined;
                contact?: string | null | undefined;
            } | null | undefined;
        } | null | undefined;
        representatives?: {
            mp?: {
                name?: string | null | undefined;
                constituency?: string | null | undefined;
                party?: string | null | undefined;
                term_end?: NativeDate | null | undefined;
            } | null | undefined;
            mla?: {
                name?: string | null | undefined;
                constituency?: string | null | undefined;
                party?: string | null | undefined;
                term_end?: NativeDate | null | undefined;
            } | null | undefined;
            local_body_head?: {
                name?: string | null | undefined;
                title?: string | null | undefined;
            } | null | undefined;
        } | null | undefined;
    } | null | undefined;
    culture_society?: {
        festivals: mongoose.Types.DocumentArray<{
            name?: string | null | undefined;
            significance?: string | null | undefined;
            business_impact?: string | null | undefined;
            month?: string | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            name?: string | null | undefined;
            significance?: string | null | undefined;
            business_impact?: string | null | undefined;
            month?: string | null | undefined;
        }> & {
            name?: string | null | undefined;
            significance?: string | null | undefined;
            business_impact?: string | null | undefined;
            month?: string | null | undefined;
        }>;
        market_adaptation_tips: string[];
        heritage_sites: string[];
        traditional_arts: string[];
        languages?: {
            official: string[];
            spoken: string[];
            business_preferred?: string | null | undefined;
        } | null | undefined;
        cuisine?: {
            famous_dishes: string[];
            staple_diet?: string | null | undefined;
            dietary_restrictions?: string | null | undefined;
        } | null | undefined;
        social_norms?: {
            taboos: string[];
            greetings?: string | null | undefined;
            business_etiquette?: string | null | undefined;
        } | null | undefined;
    } | null | undefined;
    parent_id?: string | null | undefined;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    place_type: "state" | "district" | "city";
    place_id: string;
    canonical_name: string;
    major_industries: string[];
    children_ids: string[];
    created_at: NativeDate;
    updated_at: NativeDate;
    data_quality: "official" | "sample" | "verified";
    area_sq_km?: number | null | undefined;
    population_density?: number | null | undefined;
    local_names?: {
        hi?: string | null | undefined;
        ta?: string | null | undefined;
        bn?: string | null | undefined;
        te?: string | null | undefined;
        mr?: string | null | undefined;
        kn?: string | null | undefined;
        gu?: string | null | undefined;
        ml?: string | null | undefined;
        pa?: string | null | undefined;
    } | null | undefined;
    population?: {
        year: number;
        source: string;
        value?: number | null | undefined;
    } | null | undefined;
    literacy_rate?: {
        year: number;
        source: string;
        value?: number | null | undefined;
        male?: number | null | undefined;
        female?: number | null | undefined;
    } | null | undefined;
    historical_data?: {
        census_2001?: {
            population?: number | null | undefined;
            literacy_rate?: number | null | undefined;
        } | null | undefined;
        census_1991?: {
            population?: number | null | undefined;
            literacy_rate?: number | null | undefined;
        } | null | undefined;
    } | null | undefined;
    economic_data?: {
        gdp?: number | null | undefined;
        per_capita_income?: number | null | undefined;
        unemployment_rate?: number | null | undefined;
        growth_rate?: number | null | undefined;
        last_updated?: NativeDate | null | undefined;
        industry_breakdown?: {
            agriculture?: number | null | undefined;
            manufacturing?: number | null | undefined;
            services?: number | null | undefined;
        } | null | undefined;
    } | null | undefined;
    infrastructure?: {
        last_updated?: NativeDate | null | undefined;
        road_density?: number | null | undefined;
        railway_stations?: number | null | undefined;
        airports?: number | null | undefined;
        internet_penetration?: number | null | undefined;
        electricity_access?: number | null | undefined;
        infrastructure_score?: number | null | undefined;
    } | null | undefined;
    health_education?: {
        last_updated?: NativeDate | null | undefined;
        hospitals_per_100k?: number | null | undefined;
        doctors_per_100k?: number | null | undefined;
        hospital_beds_per_100k?: number | null | undefined;
        health_index?: number | null | undefined;
        schools_per_100k?: number | null | undefined;
        teachers_per_100k?: number | null | undefined;
        student_teacher_ratio?: number | null | undefined;
        education_index?: number | null | undefined;
    } | null | undefined;
    climate_environment?: {
        last_updated?: NativeDate | null | undefined;
        avg_temperature?: number | null | undefined;
        annual_rainfall?: number | null | undefined;
        forest_cover_percent?: number | null | undefined;
        air_quality_index?: number | null | undefined;
        environmental_score?: number | null | undefined;
    } | null | undefined;
    water_resources?: {
        major_water_bodies: string[];
        annual_rainfall_mm?: number | null | undefined;
        groundwater_level?: string | null | undefined;
        irrigation_coverage_percent?: number | null | undefined;
        water_quality?: string | null | undefined;
    } | null | undefined;
    governance?: {
        public_offices: mongoose.Types.DocumentArray<{
            type?: "judiciary" | "police" | "administrative" | "medical" | "other" | null | undefined;
            name?: string | null | undefined;
            address?: string | null | undefined;
            location?: {
                lat?: number | null | undefined;
                lng?: number | null | undefined;
            } | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            type?: "judiciary" | "police" | "administrative" | "medical" | "other" | null | undefined;
            name?: string | null | undefined;
            address?: string | null | undefined;
            location?: {
                lat?: number | null | undefined;
                lng?: number | null | undefined;
            } | null | undefined;
        }> & {
            type?: "judiciary" | "police" | "administrative" | "medical" | "other" | null | undefined;
            name?: string | null | undefined;
            address?: string | null | undefined;
            location?: {
                lat?: number | null | undefined;
                lng?: number | null | undefined;
            } | null | undefined;
        }>;
        local_processes: mongoose.Types.DocumentArray<{
            name?: string | null | undefined;
            responsible_office?: string | null | undefined;
            approval_timeline_days?: number | null | undefined;
            verification_required?: boolean | null | undefined;
            level?: "state" | "district" | "tehsil" | "village" | "block" | null | undefined;
            risk_level?: "Low" | "Medium" | "High" | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            name?: string | null | undefined;
            responsible_office?: string | null | undefined;
            approval_timeline_days?: number | null | undefined;
            verification_required?: boolean | null | undefined;
            level?: "state" | "district" | "tehsil" | "village" | "block" | null | undefined;
            risk_level?: "Low" | "Medium" | "High" | null | undefined;
        }> & {
            name?: string | null | undefined;
            responsible_office?: string | null | undefined;
            approval_timeline_days?: number | null | undefined;
            verification_required?: boolean | null | undefined;
            level?: "state" | "district" | "tehsil" | "village" | "block" | null | undefined;
            risk_level?: "Low" | "Medium" | "High" | null | undefined;
        }>;
        local_bodies: string[];
        government_schemes: string[];
        last_updated?: NativeDate | null | undefined;
        administrative_head?: string | null | undefined;
        lok_sabha_seats?: number | null | undefined;
        vidhan_sabha_seats?: number | null | undefined;
        data_source?: string | null | undefined;
        administration?: {
            district_magistrate?: {
                name?: string | null | undefined;
                office_address?: string | null | undefined;
                contact?: string | null | undefined;
            } | null | undefined;
            police_superintendent?: {
                name?: string | null | undefined;
                office_address?: string | null | undefined;
                contact?: string | null | undefined;
            } | null | undefined;
        } | null | undefined;
        representatives?: {
            mp?: {
                name?: string | null | undefined;
                constituency?: string | null | undefined;
                party?: string | null | undefined;
                term_end?: NativeDate | null | undefined;
            } | null | undefined;
            mla?: {
                name?: string | null | undefined;
                constituency?: string | null | undefined;
                party?: string | null | undefined;
                term_end?: NativeDate | null | undefined;
            } | null | undefined;
            local_body_head?: {
                name?: string | null | undefined;
                title?: string | null | undefined;
            } | null | undefined;
        } | null | undefined;
    } | null | undefined;
    culture_society?: {
        festivals: mongoose.Types.DocumentArray<{
            name?: string | null | undefined;
            significance?: string | null | undefined;
            business_impact?: string | null | undefined;
            month?: string | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            name?: string | null | undefined;
            significance?: string | null | undefined;
            business_impact?: string | null | undefined;
            month?: string | null | undefined;
        }> & {
            name?: string | null | undefined;
            significance?: string | null | undefined;
            business_impact?: string | null | undefined;
            month?: string | null | undefined;
        }>;
        market_adaptation_tips: string[];
        heritage_sites: string[];
        traditional_arts: string[];
        languages?: {
            official: string[];
            spoken: string[];
            business_preferred?: string | null | undefined;
        } | null | undefined;
        cuisine?: {
            famous_dishes: string[];
            staple_diet?: string | null | undefined;
            dietary_restrictions?: string | null | undefined;
        } | null | undefined;
        social_norms?: {
            taboos: string[];
            greetings?: string | null | undefined;
            business_etiquette?: string | null | undefined;
        } | null | undefined;
    } | null | undefined;
    parent_id?: string | null | undefined;
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
    collection: string;
}> & {
    place_type: "state" | "district" | "city";
    place_id: string;
    canonical_name: string;
    major_industries: string[];
    children_ids: string[];
    created_at: NativeDate;
    updated_at: NativeDate;
    data_quality: "official" | "sample" | "verified";
    area_sq_km?: number | null | undefined;
    population_density?: number | null | undefined;
    local_names?: {
        hi?: string | null | undefined;
        ta?: string | null | undefined;
        bn?: string | null | undefined;
        te?: string | null | undefined;
        mr?: string | null | undefined;
        kn?: string | null | undefined;
        gu?: string | null | undefined;
        ml?: string | null | undefined;
        pa?: string | null | undefined;
    } | null | undefined;
    population?: {
        year: number;
        source: string;
        value?: number | null | undefined;
    } | null | undefined;
    literacy_rate?: {
        year: number;
        source: string;
        value?: number | null | undefined;
        male?: number | null | undefined;
        female?: number | null | undefined;
    } | null | undefined;
    historical_data?: {
        census_2001?: {
            population?: number | null | undefined;
            literacy_rate?: number | null | undefined;
        } | null | undefined;
        census_1991?: {
            population?: number | null | undefined;
            literacy_rate?: number | null | undefined;
        } | null | undefined;
    } | null | undefined;
    economic_data?: {
        gdp?: number | null | undefined;
        per_capita_income?: number | null | undefined;
        unemployment_rate?: number | null | undefined;
        growth_rate?: number | null | undefined;
        last_updated?: NativeDate | null | undefined;
        industry_breakdown?: {
            agriculture?: number | null | undefined;
            manufacturing?: number | null | undefined;
            services?: number | null | undefined;
        } | null | undefined;
    } | null | undefined;
    infrastructure?: {
        last_updated?: NativeDate | null | undefined;
        road_density?: number | null | undefined;
        railway_stations?: number | null | undefined;
        airports?: number | null | undefined;
        internet_penetration?: number | null | undefined;
        electricity_access?: number | null | undefined;
        infrastructure_score?: number | null | undefined;
    } | null | undefined;
    health_education?: {
        last_updated?: NativeDate | null | undefined;
        hospitals_per_100k?: number | null | undefined;
        doctors_per_100k?: number | null | undefined;
        hospital_beds_per_100k?: number | null | undefined;
        health_index?: number | null | undefined;
        schools_per_100k?: number | null | undefined;
        teachers_per_100k?: number | null | undefined;
        student_teacher_ratio?: number | null | undefined;
        education_index?: number | null | undefined;
    } | null | undefined;
    climate_environment?: {
        last_updated?: NativeDate | null | undefined;
        avg_temperature?: number | null | undefined;
        annual_rainfall?: number | null | undefined;
        forest_cover_percent?: number | null | undefined;
        air_quality_index?: number | null | undefined;
        environmental_score?: number | null | undefined;
    } | null | undefined;
    water_resources?: {
        major_water_bodies: string[];
        annual_rainfall_mm?: number | null | undefined;
        groundwater_level?: string | null | undefined;
        irrigation_coverage_percent?: number | null | undefined;
        water_quality?: string | null | undefined;
    } | null | undefined;
    governance?: {
        public_offices: mongoose.Types.DocumentArray<{
            type?: "judiciary" | "police" | "administrative" | "medical" | "other" | null | undefined;
            name?: string | null | undefined;
            address?: string | null | undefined;
            location?: {
                lat?: number | null | undefined;
                lng?: number | null | undefined;
            } | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            type?: "judiciary" | "police" | "administrative" | "medical" | "other" | null | undefined;
            name?: string | null | undefined;
            address?: string | null | undefined;
            location?: {
                lat?: number | null | undefined;
                lng?: number | null | undefined;
            } | null | undefined;
        }> & {
            type?: "judiciary" | "police" | "administrative" | "medical" | "other" | null | undefined;
            name?: string | null | undefined;
            address?: string | null | undefined;
            location?: {
                lat?: number | null | undefined;
                lng?: number | null | undefined;
            } | null | undefined;
        }>;
        local_processes: mongoose.Types.DocumentArray<{
            name?: string | null | undefined;
            responsible_office?: string | null | undefined;
            approval_timeline_days?: number | null | undefined;
            verification_required?: boolean | null | undefined;
            level?: "state" | "district" | "tehsil" | "village" | "block" | null | undefined;
            risk_level?: "Low" | "Medium" | "High" | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            name?: string | null | undefined;
            responsible_office?: string | null | undefined;
            approval_timeline_days?: number | null | undefined;
            verification_required?: boolean | null | undefined;
            level?: "state" | "district" | "tehsil" | "village" | "block" | null | undefined;
            risk_level?: "Low" | "Medium" | "High" | null | undefined;
        }> & {
            name?: string | null | undefined;
            responsible_office?: string | null | undefined;
            approval_timeline_days?: number | null | undefined;
            verification_required?: boolean | null | undefined;
            level?: "state" | "district" | "tehsil" | "village" | "block" | null | undefined;
            risk_level?: "Low" | "Medium" | "High" | null | undefined;
        }>;
        local_bodies: string[];
        government_schemes: string[];
        last_updated?: NativeDate | null | undefined;
        administrative_head?: string | null | undefined;
        lok_sabha_seats?: number | null | undefined;
        vidhan_sabha_seats?: number | null | undefined;
        data_source?: string | null | undefined;
        administration?: {
            district_magistrate?: {
                name?: string | null | undefined;
                office_address?: string | null | undefined;
                contact?: string | null | undefined;
            } | null | undefined;
            police_superintendent?: {
                name?: string | null | undefined;
                office_address?: string | null | undefined;
                contact?: string | null | undefined;
            } | null | undefined;
        } | null | undefined;
        representatives?: {
            mp?: {
                name?: string | null | undefined;
                constituency?: string | null | undefined;
                party?: string | null | undefined;
                term_end?: NativeDate | null | undefined;
            } | null | undefined;
            mla?: {
                name?: string | null | undefined;
                constituency?: string | null | undefined;
                party?: string | null | undefined;
                term_end?: NativeDate | null | undefined;
            } | null | undefined;
            local_body_head?: {
                name?: string | null | undefined;
                title?: string | null | undefined;
            } | null | undefined;
        } | null | undefined;
    } | null | undefined;
    culture_society?: {
        festivals: mongoose.Types.DocumentArray<{
            name?: string | null | undefined;
            significance?: string | null | undefined;
            business_impact?: string | null | undefined;
            month?: string | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            name?: string | null | undefined;
            significance?: string | null | undefined;
            business_impact?: string | null | undefined;
            month?: string | null | undefined;
        }> & {
            name?: string | null | undefined;
            significance?: string | null | undefined;
            business_impact?: string | null | undefined;
            month?: string | null | undefined;
        }>;
        market_adaptation_tips: string[];
        heritage_sites: string[];
        traditional_arts: string[];
        languages?: {
            official: string[];
            spoken: string[];
            business_preferred?: string | null | undefined;
        } | null | undefined;
        cuisine?: {
            famous_dishes: string[];
            staple_diet?: string | null | undefined;
            dietary_restrictions?: string | null | undefined;
        } | null | undefined;
        social_norms?: {
            taboos: string[];
            greetings?: string | null | undefined;
            business_etiquette?: string | null | undefined;
        } | null | undefined;
    } | null | undefined;
    parent_id?: string | null | undefined;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
    collection: string;
}, {
    place_type: "state" | "district" | "city";
    place_id: string;
    canonical_name: string;
    major_industries: string[];
    children_ids: string[];
    created_at: NativeDate;
    updated_at: NativeDate;
    data_quality: "official" | "sample" | "verified";
    area_sq_km?: number | null | undefined;
    population_density?: number | null | undefined;
    local_names?: {
        hi?: string | null | undefined;
        ta?: string | null | undefined;
        bn?: string | null | undefined;
        te?: string | null | undefined;
        mr?: string | null | undefined;
        kn?: string | null | undefined;
        gu?: string | null | undefined;
        ml?: string | null | undefined;
        pa?: string | null | undefined;
    } | null | undefined;
    population?: {
        year: number;
        source: string;
        value?: number | null | undefined;
    } | null | undefined;
    literacy_rate?: {
        year: number;
        source: string;
        value?: number | null | undefined;
        male?: number | null | undefined;
        female?: number | null | undefined;
    } | null | undefined;
    historical_data?: {
        census_2001?: {
            population?: number | null | undefined;
            literacy_rate?: number | null | undefined;
        } | null | undefined;
        census_1991?: {
            population?: number | null | undefined;
            literacy_rate?: number | null | undefined;
        } | null | undefined;
    } | null | undefined;
    economic_data?: {
        gdp?: number | null | undefined;
        per_capita_income?: number | null | undefined;
        unemployment_rate?: number | null | undefined;
        growth_rate?: number | null | undefined;
        last_updated?: NativeDate | null | undefined;
        industry_breakdown?: {
            agriculture?: number | null | undefined;
            manufacturing?: number | null | undefined;
            services?: number | null | undefined;
        } | null | undefined;
    } | null | undefined;
    infrastructure?: {
        last_updated?: NativeDate | null | undefined;
        road_density?: number | null | undefined;
        railway_stations?: number | null | undefined;
        airports?: number | null | undefined;
        internet_penetration?: number | null | undefined;
        electricity_access?: number | null | undefined;
        infrastructure_score?: number | null | undefined;
    } | null | undefined;
    health_education?: {
        last_updated?: NativeDate | null | undefined;
        hospitals_per_100k?: number | null | undefined;
        doctors_per_100k?: number | null | undefined;
        hospital_beds_per_100k?: number | null | undefined;
        health_index?: number | null | undefined;
        schools_per_100k?: number | null | undefined;
        teachers_per_100k?: number | null | undefined;
        student_teacher_ratio?: number | null | undefined;
        education_index?: number | null | undefined;
    } | null | undefined;
    climate_environment?: {
        last_updated?: NativeDate | null | undefined;
        avg_temperature?: number | null | undefined;
        annual_rainfall?: number | null | undefined;
        forest_cover_percent?: number | null | undefined;
        air_quality_index?: number | null | undefined;
        environmental_score?: number | null | undefined;
    } | null | undefined;
    water_resources?: {
        major_water_bodies: string[];
        annual_rainfall_mm?: number | null | undefined;
        groundwater_level?: string | null | undefined;
        irrigation_coverage_percent?: number | null | undefined;
        water_quality?: string | null | undefined;
    } | null | undefined;
    governance?: {
        public_offices: mongoose.Types.DocumentArray<{
            type?: "judiciary" | "police" | "administrative" | "medical" | "other" | null | undefined;
            name?: string | null | undefined;
            address?: string | null | undefined;
            location?: {
                lat?: number | null | undefined;
                lng?: number | null | undefined;
            } | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            type?: "judiciary" | "police" | "administrative" | "medical" | "other" | null | undefined;
            name?: string | null | undefined;
            address?: string | null | undefined;
            location?: {
                lat?: number | null | undefined;
                lng?: number | null | undefined;
            } | null | undefined;
        }> & {
            type?: "judiciary" | "police" | "administrative" | "medical" | "other" | null | undefined;
            name?: string | null | undefined;
            address?: string | null | undefined;
            location?: {
                lat?: number | null | undefined;
                lng?: number | null | undefined;
            } | null | undefined;
        }>;
        local_processes: mongoose.Types.DocumentArray<{
            name?: string | null | undefined;
            responsible_office?: string | null | undefined;
            approval_timeline_days?: number | null | undefined;
            verification_required?: boolean | null | undefined;
            level?: "state" | "district" | "tehsil" | "village" | "block" | null | undefined;
            risk_level?: "Low" | "Medium" | "High" | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            name?: string | null | undefined;
            responsible_office?: string | null | undefined;
            approval_timeline_days?: number | null | undefined;
            verification_required?: boolean | null | undefined;
            level?: "state" | "district" | "tehsil" | "village" | "block" | null | undefined;
            risk_level?: "Low" | "Medium" | "High" | null | undefined;
        }> & {
            name?: string | null | undefined;
            responsible_office?: string | null | undefined;
            approval_timeline_days?: number | null | undefined;
            verification_required?: boolean | null | undefined;
            level?: "state" | "district" | "tehsil" | "village" | "block" | null | undefined;
            risk_level?: "Low" | "Medium" | "High" | null | undefined;
        }>;
        local_bodies: string[];
        government_schemes: string[];
        last_updated?: NativeDate | null | undefined;
        administrative_head?: string | null | undefined;
        lok_sabha_seats?: number | null | undefined;
        vidhan_sabha_seats?: number | null | undefined;
        data_source?: string | null | undefined;
        administration?: {
            district_magistrate?: {
                name?: string | null | undefined;
                office_address?: string | null | undefined;
                contact?: string | null | undefined;
            } | null | undefined;
            police_superintendent?: {
                name?: string | null | undefined;
                office_address?: string | null | undefined;
                contact?: string | null | undefined;
            } | null | undefined;
        } | null | undefined;
        representatives?: {
            mp?: {
                name?: string | null | undefined;
                constituency?: string | null | undefined;
                party?: string | null | undefined;
                term_end?: NativeDate | null | undefined;
            } | null | undefined;
            mla?: {
                name?: string | null | undefined;
                constituency?: string | null | undefined;
                party?: string | null | undefined;
                term_end?: NativeDate | null | undefined;
            } | null | undefined;
            local_body_head?: {
                name?: string | null | undefined;
                title?: string | null | undefined;
            } | null | undefined;
        } | null | undefined;
    } | null | undefined;
    culture_society?: {
        festivals: mongoose.Types.DocumentArray<{
            name?: string | null | undefined;
            significance?: string | null | undefined;
            business_impact?: string | null | undefined;
            month?: string | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            name?: string | null | undefined;
            significance?: string | null | undefined;
            business_impact?: string | null | undefined;
            month?: string | null | undefined;
        }> & {
            name?: string | null | undefined;
            significance?: string | null | undefined;
            business_impact?: string | null | undefined;
            month?: string | null | undefined;
        }>;
        market_adaptation_tips: string[];
        heritage_sites: string[];
        traditional_arts: string[];
        languages?: {
            official: string[];
            spoken: string[];
            business_preferred?: string | null | undefined;
        } | null | undefined;
        cuisine?: {
            famous_dishes: string[];
            staple_diet?: string | null | undefined;
            dietary_restrictions?: string | null | undefined;
        } | null | undefined;
        social_norms?: {
            taboos: string[];
            greetings?: string | null | undefined;
            business_etiquette?: string | null | undefined;
        } | null | undefined;
    } | null | undefined;
    parent_id?: string | null | undefined;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    place_type: "state" | "district" | "city";
    place_id: string;
    canonical_name: string;
    major_industries: string[];
    children_ids: string[];
    created_at: NativeDate;
    updated_at: NativeDate;
    data_quality: "official" | "sample" | "verified";
    area_sq_km?: number | null | undefined;
    population_density?: number | null | undefined;
    local_names?: {
        hi?: string | null | undefined;
        ta?: string | null | undefined;
        bn?: string | null | undefined;
        te?: string | null | undefined;
        mr?: string | null | undefined;
        kn?: string | null | undefined;
        gu?: string | null | undefined;
        ml?: string | null | undefined;
        pa?: string | null | undefined;
    } | null | undefined;
    population?: {
        year: number;
        source: string;
        value?: number | null | undefined;
    } | null | undefined;
    literacy_rate?: {
        year: number;
        source: string;
        value?: number | null | undefined;
        male?: number | null | undefined;
        female?: number | null | undefined;
    } | null | undefined;
    historical_data?: {
        census_2001?: {
            population?: number | null | undefined;
            literacy_rate?: number | null | undefined;
        } | null | undefined;
        census_1991?: {
            population?: number | null | undefined;
            literacy_rate?: number | null | undefined;
        } | null | undefined;
    } | null | undefined;
    economic_data?: {
        gdp?: number | null | undefined;
        per_capita_income?: number | null | undefined;
        unemployment_rate?: number | null | undefined;
        growth_rate?: number | null | undefined;
        last_updated?: NativeDate | null | undefined;
        industry_breakdown?: {
            agriculture?: number | null | undefined;
            manufacturing?: number | null | undefined;
            services?: number | null | undefined;
        } | null | undefined;
    } | null | undefined;
    infrastructure?: {
        last_updated?: NativeDate | null | undefined;
        road_density?: number | null | undefined;
        railway_stations?: number | null | undefined;
        airports?: number | null | undefined;
        internet_penetration?: number | null | undefined;
        electricity_access?: number | null | undefined;
        infrastructure_score?: number | null | undefined;
    } | null | undefined;
    health_education?: {
        last_updated?: NativeDate | null | undefined;
        hospitals_per_100k?: number | null | undefined;
        doctors_per_100k?: number | null | undefined;
        hospital_beds_per_100k?: number | null | undefined;
        health_index?: number | null | undefined;
        schools_per_100k?: number | null | undefined;
        teachers_per_100k?: number | null | undefined;
        student_teacher_ratio?: number | null | undefined;
        education_index?: number | null | undefined;
    } | null | undefined;
    climate_environment?: {
        last_updated?: NativeDate | null | undefined;
        avg_temperature?: number | null | undefined;
        annual_rainfall?: number | null | undefined;
        forest_cover_percent?: number | null | undefined;
        air_quality_index?: number | null | undefined;
        environmental_score?: number | null | undefined;
    } | null | undefined;
    water_resources?: {
        major_water_bodies: string[];
        annual_rainfall_mm?: number | null | undefined;
        groundwater_level?: string | null | undefined;
        irrigation_coverage_percent?: number | null | undefined;
        water_quality?: string | null | undefined;
    } | null | undefined;
    governance?: {
        public_offices: mongoose.Types.DocumentArray<{
            type?: "judiciary" | "police" | "administrative" | "medical" | "other" | null | undefined;
            name?: string | null | undefined;
            address?: string | null | undefined;
            location?: {
                lat?: number | null | undefined;
                lng?: number | null | undefined;
            } | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            type?: "judiciary" | "police" | "administrative" | "medical" | "other" | null | undefined;
            name?: string | null | undefined;
            address?: string | null | undefined;
            location?: {
                lat?: number | null | undefined;
                lng?: number | null | undefined;
            } | null | undefined;
        }> & {
            type?: "judiciary" | "police" | "administrative" | "medical" | "other" | null | undefined;
            name?: string | null | undefined;
            address?: string | null | undefined;
            location?: {
                lat?: number | null | undefined;
                lng?: number | null | undefined;
            } | null | undefined;
        }>;
        local_processes: mongoose.Types.DocumentArray<{
            name?: string | null | undefined;
            responsible_office?: string | null | undefined;
            approval_timeline_days?: number | null | undefined;
            verification_required?: boolean | null | undefined;
            level?: "state" | "district" | "tehsil" | "village" | "block" | null | undefined;
            risk_level?: "Low" | "Medium" | "High" | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            name?: string | null | undefined;
            responsible_office?: string | null | undefined;
            approval_timeline_days?: number | null | undefined;
            verification_required?: boolean | null | undefined;
            level?: "state" | "district" | "tehsil" | "village" | "block" | null | undefined;
            risk_level?: "Low" | "Medium" | "High" | null | undefined;
        }> & {
            name?: string | null | undefined;
            responsible_office?: string | null | undefined;
            approval_timeline_days?: number | null | undefined;
            verification_required?: boolean | null | undefined;
            level?: "state" | "district" | "tehsil" | "village" | "block" | null | undefined;
            risk_level?: "Low" | "Medium" | "High" | null | undefined;
        }>;
        local_bodies: string[];
        government_schemes: string[];
        last_updated?: NativeDate | null | undefined;
        administrative_head?: string | null | undefined;
        lok_sabha_seats?: number | null | undefined;
        vidhan_sabha_seats?: number | null | undefined;
        data_source?: string | null | undefined;
        administration?: {
            district_magistrate?: {
                name?: string | null | undefined;
                office_address?: string | null | undefined;
                contact?: string | null | undefined;
            } | null | undefined;
            police_superintendent?: {
                name?: string | null | undefined;
                office_address?: string | null | undefined;
                contact?: string | null | undefined;
            } | null | undefined;
        } | null | undefined;
        representatives?: {
            mp?: {
                name?: string | null | undefined;
                constituency?: string | null | undefined;
                party?: string | null | undefined;
                term_end?: NativeDate | null | undefined;
            } | null | undefined;
            mla?: {
                name?: string | null | undefined;
                constituency?: string | null | undefined;
                party?: string | null | undefined;
                term_end?: NativeDate | null | undefined;
            } | null | undefined;
            local_body_head?: {
                name?: string | null | undefined;
                title?: string | null | undefined;
            } | null | undefined;
        } | null | undefined;
    } | null | undefined;
    culture_society?: {
        festivals: mongoose.Types.DocumentArray<{
            name?: string | null | undefined;
            significance?: string | null | undefined;
            business_impact?: string | null | undefined;
            month?: string | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            name?: string | null | undefined;
            significance?: string | null | undefined;
            business_impact?: string | null | undefined;
            month?: string | null | undefined;
        }> & {
            name?: string | null | undefined;
            significance?: string | null | undefined;
            business_impact?: string | null | undefined;
            month?: string | null | undefined;
        }>;
        market_adaptation_tips: string[];
        heritage_sites: string[];
        traditional_arts: string[];
        languages?: {
            official: string[];
            spoken: string[];
            business_preferred?: string | null | undefined;
        } | null | undefined;
        cuisine?: {
            famous_dishes: string[];
            staple_diet?: string | null | undefined;
            dietary_restrictions?: string | null | undefined;
        } | null | undefined;
        social_norms?: {
            taboos: string[];
            greetings?: string | null | undefined;
            business_etiquette?: string | null | undefined;
        } | null | undefined;
    } | null | undefined;
    parent_id?: string | null | undefined;
} & mongoose.DefaultTimestampProps>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
    collection: string;
}>> & mongoose.FlatRecord<{
    place_type: "state" | "district" | "city";
    place_id: string;
    canonical_name: string;
    major_industries: string[];
    children_ids: string[];
    created_at: NativeDate;
    updated_at: NativeDate;
    data_quality: "official" | "sample" | "verified";
    area_sq_km?: number | null | undefined;
    population_density?: number | null | undefined;
    local_names?: {
        hi?: string | null | undefined;
        ta?: string | null | undefined;
        bn?: string | null | undefined;
        te?: string | null | undefined;
        mr?: string | null | undefined;
        kn?: string | null | undefined;
        gu?: string | null | undefined;
        ml?: string | null | undefined;
        pa?: string | null | undefined;
    } | null | undefined;
    population?: {
        year: number;
        source: string;
        value?: number | null | undefined;
    } | null | undefined;
    literacy_rate?: {
        year: number;
        source: string;
        value?: number | null | undefined;
        male?: number | null | undefined;
        female?: number | null | undefined;
    } | null | undefined;
    historical_data?: {
        census_2001?: {
            population?: number | null | undefined;
            literacy_rate?: number | null | undefined;
        } | null | undefined;
        census_1991?: {
            population?: number | null | undefined;
            literacy_rate?: number | null | undefined;
        } | null | undefined;
    } | null | undefined;
    economic_data?: {
        gdp?: number | null | undefined;
        per_capita_income?: number | null | undefined;
        unemployment_rate?: number | null | undefined;
        growth_rate?: number | null | undefined;
        last_updated?: NativeDate | null | undefined;
        industry_breakdown?: {
            agriculture?: number | null | undefined;
            manufacturing?: number | null | undefined;
            services?: number | null | undefined;
        } | null | undefined;
    } | null | undefined;
    infrastructure?: {
        last_updated?: NativeDate | null | undefined;
        road_density?: number | null | undefined;
        railway_stations?: number | null | undefined;
        airports?: number | null | undefined;
        internet_penetration?: number | null | undefined;
        electricity_access?: number | null | undefined;
        infrastructure_score?: number | null | undefined;
    } | null | undefined;
    health_education?: {
        last_updated?: NativeDate | null | undefined;
        hospitals_per_100k?: number | null | undefined;
        doctors_per_100k?: number | null | undefined;
        hospital_beds_per_100k?: number | null | undefined;
        health_index?: number | null | undefined;
        schools_per_100k?: number | null | undefined;
        teachers_per_100k?: number | null | undefined;
        student_teacher_ratio?: number | null | undefined;
        education_index?: number | null | undefined;
    } | null | undefined;
    climate_environment?: {
        last_updated?: NativeDate | null | undefined;
        avg_temperature?: number | null | undefined;
        annual_rainfall?: number | null | undefined;
        forest_cover_percent?: number | null | undefined;
        air_quality_index?: number | null | undefined;
        environmental_score?: number | null | undefined;
    } | null | undefined;
    water_resources?: {
        major_water_bodies: string[];
        annual_rainfall_mm?: number | null | undefined;
        groundwater_level?: string | null | undefined;
        irrigation_coverage_percent?: number | null | undefined;
        water_quality?: string | null | undefined;
    } | null | undefined;
    governance?: {
        public_offices: mongoose.Types.DocumentArray<{
            type?: "judiciary" | "police" | "administrative" | "medical" | "other" | null | undefined;
            name?: string | null | undefined;
            address?: string | null | undefined;
            location?: {
                lat?: number | null | undefined;
                lng?: number | null | undefined;
            } | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            type?: "judiciary" | "police" | "administrative" | "medical" | "other" | null | undefined;
            name?: string | null | undefined;
            address?: string | null | undefined;
            location?: {
                lat?: number | null | undefined;
                lng?: number | null | undefined;
            } | null | undefined;
        }> & {
            type?: "judiciary" | "police" | "administrative" | "medical" | "other" | null | undefined;
            name?: string | null | undefined;
            address?: string | null | undefined;
            location?: {
                lat?: number | null | undefined;
                lng?: number | null | undefined;
            } | null | undefined;
        }>;
        local_processes: mongoose.Types.DocumentArray<{
            name?: string | null | undefined;
            responsible_office?: string | null | undefined;
            approval_timeline_days?: number | null | undefined;
            verification_required?: boolean | null | undefined;
            level?: "state" | "district" | "tehsil" | "village" | "block" | null | undefined;
            risk_level?: "Low" | "Medium" | "High" | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            name?: string | null | undefined;
            responsible_office?: string | null | undefined;
            approval_timeline_days?: number | null | undefined;
            verification_required?: boolean | null | undefined;
            level?: "state" | "district" | "tehsil" | "village" | "block" | null | undefined;
            risk_level?: "Low" | "Medium" | "High" | null | undefined;
        }> & {
            name?: string | null | undefined;
            responsible_office?: string | null | undefined;
            approval_timeline_days?: number | null | undefined;
            verification_required?: boolean | null | undefined;
            level?: "state" | "district" | "tehsil" | "village" | "block" | null | undefined;
            risk_level?: "Low" | "Medium" | "High" | null | undefined;
        }>;
        local_bodies: string[];
        government_schemes: string[];
        last_updated?: NativeDate | null | undefined;
        administrative_head?: string | null | undefined;
        lok_sabha_seats?: number | null | undefined;
        vidhan_sabha_seats?: number | null | undefined;
        data_source?: string | null | undefined;
        administration?: {
            district_magistrate?: {
                name?: string | null | undefined;
                office_address?: string | null | undefined;
                contact?: string | null | undefined;
            } | null | undefined;
            police_superintendent?: {
                name?: string | null | undefined;
                office_address?: string | null | undefined;
                contact?: string | null | undefined;
            } | null | undefined;
        } | null | undefined;
        representatives?: {
            mp?: {
                name?: string | null | undefined;
                constituency?: string | null | undefined;
                party?: string | null | undefined;
                term_end?: NativeDate | null | undefined;
            } | null | undefined;
            mla?: {
                name?: string | null | undefined;
                constituency?: string | null | undefined;
                party?: string | null | undefined;
                term_end?: NativeDate | null | undefined;
            } | null | undefined;
            local_body_head?: {
                name?: string | null | undefined;
                title?: string | null | undefined;
            } | null | undefined;
        } | null | undefined;
    } | null | undefined;
    culture_society?: {
        festivals: mongoose.Types.DocumentArray<{
            name?: string | null | undefined;
            significance?: string | null | undefined;
            business_impact?: string | null | undefined;
            month?: string | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            name?: string | null | undefined;
            significance?: string | null | undefined;
            business_impact?: string | null | undefined;
            month?: string | null | undefined;
        }> & {
            name?: string | null | undefined;
            significance?: string | null | undefined;
            business_impact?: string | null | undefined;
            month?: string | null | undefined;
        }>;
        market_adaptation_tips: string[];
        heritage_sites: string[];
        traditional_arts: string[];
        languages?: {
            official: string[];
            spoken: string[];
            business_preferred?: string | null | undefined;
        } | null | undefined;
        cuisine?: {
            famous_dishes: string[];
            staple_diet?: string | null | undefined;
            dietary_restrictions?: string | null | undefined;
        } | null | undefined;
        social_norms?: {
            taboos: string[];
            greetings?: string | null | undefined;
            business_etiquette?: string | null | undefined;
        } | null | undefined;
    } | null | undefined;
    parent_id?: string | null | undefined;
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
import mongoose from 'mongoose';
//# sourceMappingURL=Place.d.ts.map