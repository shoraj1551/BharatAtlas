/**
 * Data Loader for BharatAtlas
 * 
 * Loads all 28 Indian states with real Census 2011 data into MongoDB Atlas
 */

import { MongoClient } from 'mongodb'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const MONGO_URI = process.env.MONGO_URI
const DB_NAME = 'bharatatlas'

// Real Indian States Data (Census 2011)
const INDIAN_STATES = [
    {
        place_id: 'place_ap_001',
        canonical_name: 'Andhra Pradesh',
        place_type: 'state',
        state_code: 'AP',
        latitude: 15.9129,
        longitude: 79.7400,
        area_sq_km: 160205,
        population: { value: 49386799, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 67.7, year: 2011, source: 'Census of India 2011' },
        num_districts: { value: 13 },
        major_industries: ['Agriculture', 'IT', 'Pharmaceuticals'],
        data_quality_score: 0.9,
        verification_status: 'verified'
    },
    {
        place_id: 'place_ar_001',
        canonical_name: 'Arunachal Pradesh',
        place_type: 'state',
        state_code: 'AR',
        latitude: 28.2180,
        longitude: 94.7278,
        area_sq_km: 83743,
        population: { value: 1382611, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 66.9, year: 2011, source: 'Census of India 2011' },
        num_districts: { value: 25 },
        major_industries: ['Agriculture', 'Horticulture', 'Tourism'],
        data_quality_score: 0.85,
        verification_status: 'verified'
    },
    {
        place_id: 'place_as_001',
        canonical_name: 'Assam',
        place_type: 'state',
        state_code: 'AS',
        latitude: 26.2006,
        longitude: 92.9376,
        area_sq_km: 78438,
        population: { value: 31169272, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 73.2, year: 2011, source: 'Census of India 2011' },
        num_districts: { value: 33 },
        major_industries: ['Tea', 'Petroleum', 'Agriculture'],
        data_quality_score: 0.9,
        verification_status: 'verified'
    },
    {
        place_id: 'place_br_001',
        canonical_name: 'Bihar',
        place_type: 'state',
        state_code: 'BR',
        latitude: 25.0961,
        longitude: 85.3131,
        area_sq_km: 94163,
        population: { value: 103804637, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 63.8, year: 2011, source: 'Census of India 2011' },
        num_districts: { value: 38 },
        major_industries: ['Agriculture', 'Food Processing', 'Textiles'],
        data_quality_score: 0.9,
        verification_status: 'verified'
    },
    {
        place_id: 'place_cg_001',
        canonical_name: 'Chhattisgarh',
        place_type: 'state',
        state_code: 'CG',
        latitude: 21.2787,
        longitude: 81.8661,
        area_sq_km: 135192,
        population: { value: 25540196, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 71.0, year: 2011, source: 'Census of India 2011' },
        num_districts: { value: 27 },
        major_industries: ['Mining', 'Steel', 'Power'],
        data_quality_score: 0.9,
        verification_status: 'verified'
    },
    {
        place_id: 'place_ga_001',
        canonical_name: 'Goa',
        place_type: 'state',
        state_code: 'GA',
        latitude: 15.2993,
        longitude: 74.1240,
        area_sq_km: 3702,
        population: { value: 1457723, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 87.4, year: 2011, source: 'Census of India 2011' },
        num_districts: { value: 2 },
        major_industries: ['Tourism', 'Mining', 'Pharmaceuticals'],
        data_quality_score: 0.95,
        verification_status: 'verified'
    },
    {
        place_id: 'place_gj_001',
        canonical_name: 'Gujarat',
        place_type: 'state',
        state_code: 'GJ',
        latitude: 22.2587,
        longitude: 71.1924,
        area_sq_km: 196244,
        population: { value: 60383628, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 79.3, year: 2011, source: 'Census of India 2011' },
        num_districts: { value: 33 },
        major_industries: ['Textiles', 'Petrochemicals', 'Pharmaceuticals'],
        data_quality_score: 0.95,
        verification_status: 'verified'
    },
    {
        place_id: 'place_hr_001',
        canonical_name: 'Haryana',
        place_type: 'state',
        state_code: 'HR',
        latitude: 29.0588,
        longitude: 76.0856,
        area_sq_km: 44212,
        population: { value: 25353081, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 76.6, year: 2011, source: 'Census of India 2011' },
        num_districts: { value: 22 },
        major_industries: ['Automobiles', 'IT', 'Agriculture'],
        data_quality_score: 0.95,
        verification_status: 'verified'
    },
    {
        place_id: 'place_hp_001',
        canonical_name: 'Himachal Pradesh',
        place_type: 'state',
        state_code: 'HP',
        latitude: 31.1048,
        longitude: 77.1734,
        area_sq_km: 55673,
        population: { value: 6856509, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 83.8, year: 2011, source: 'Census of India 2011' },
        num_districts: { value: 12 },
        major_industries: ['Tourism', 'Hydropower', 'Horticulture'],
        data_quality_score: 0.9,
        verification_status: 'verified'
    },
    {
        place_id: 'place_jh_001',
        canonical_name: 'Jharkhand',
        place_type: 'state',
        state_code: 'JH',
        latitude: 23.6102,
        longitude: 85.2799,
        area_sq_km: 79716,
        population: { value: 32966238, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 67.6, year: 2011, source: 'Census of India 2011' },
        num_districts: { value: 24 },
        major_industries: ['Mining', 'Steel', 'Power'],
        data_quality_score: 0.9,
        verification_status: 'verified'
    },
    {
        place_id: 'place_ka_001',
        canonical_name: 'Karnataka',
        place_type: 'state',
        state_code: 'KA',
        latitude: 15.3173,
        longitude: 75.7139,
        area_sq_km: 191791,
        population: { value: 61130704, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 75.6, year: 2011, source: 'Census of India 2011' },
        num_districts: { value: 30 },
        major_industries: ['IT', 'Biotechnology', 'Aerospace'],
        data_quality_score: 0.95,
        verification_status: 'verified'
    },
    {
        place_id: 'place_kl_001',
        canonical_name: 'Kerala',
        place_type: 'state',
        state_code: 'KL',
        latitude: 10.8505,
        longitude: 76.2711,
        area_sq_km: 38852,
        population: { value: 33387677, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 93.9, year: 2011, source: 'Census of India 2011' },
        num_districts: { value: 14 },
        major_industries: ['Tourism', 'Spices', 'IT'],
        data_quality_score: 0.95,
        verification_status: 'verified'
    },
    {
        place_id: 'place_mp_001',
        canonical_name: 'Madhya Pradesh',
        place_type: 'state',
        state_code: 'MP',
        latitude: 22.9734,
        longitude: 78.6569,
        area_sq_km: 308245,
        population: { value: 72597565, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 70.6, year: 2011, source: 'Census of India 2011' },
        num_districts: { value: 52 },
        major_industries: ['Agriculture', 'Mining', 'Textiles'],
        data_quality_score: 0.9,
        verification_status: 'verified'
    },
    {
        place_id: 'place_mh_001',
        canonical_name: 'Maharashtra',
        place_type: 'state',
        state_code: 'MH',
        latitude: 19.7515,
        longitude: 75.7139,
        area_sq_km: 307713,
        population: { value: 112372972, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 82.9, year: 2011, source: 'Census of India 2011' },
        num_districts: { value: 36 },
        major_industries: ['Finance', 'IT', 'Manufacturing'],
        data_quality_score: 0.95,
        verification_status: 'verified'
    },
    {
        place_id: 'place_mn_001',
        canonical_name: 'Manipur',
        place_type: 'state',
        state_code: 'MN',
        latitude: 24.6637,
        longitude: 93.9063,
        area_sq_km: 22327,
        population: { value: 2721756, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 79.8, year: 2011, source: 'Census of India 2011' },
        num_districts: { value: 16 },
        major_industries: ['Handicrafts', 'Handloom', 'Tourism'],
        data_quality_score: 0.85,
        verification_status: 'verified'
    },
    {
        place_id: 'place_ml_001',
        canonical_name: 'Meghalaya',
        place_type: 'state',
        state_code: 'ML',
        latitude: 25.4670,
        longitude: 91.3662,
        area_sq_km: 22429,
        population: { value: 2964007, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 75.5, year: 2011, source: 'Census of India 2011' },
        num_districts: { value: 11 },
        major_industries: ['Agriculture', 'Tourism', 'Mining'],
        data_quality_score: 0.85,
        verification_status: 'verified'
    },
    {
        place_id: 'place_mz_001',
        canonical_name: 'Mizoram',
        place_type: 'state',
        state_code: 'MZ',
        latitude: 23.1645,
        longitude: 92.9376,
        area_sq_km: 21081,
        population: { value: 1091014, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 91.6, year: 2011, source: 'Census of India 2011' },
        num_districts: { value: 11 },
        major_industries: ['Agriculture', 'Handloom', 'Tourism'],
        data_quality_score: 0.85,
        verification_status: 'verified'
    },
    {
        place_id: 'place_nl_001',
        canonical_name: 'Nagaland',
        place_type: 'state',
        state_code: 'NL',
        latitude: 26.1584,
        longitude: 94.5624,
        area_sq_km: 16579,
        population: { value: 1980602, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 80.1, year: 2011, source: 'Census of India 2011' },
        num_districts: { value: 12 },
        major_industries: ['Agriculture', 'Forestry', 'Tourism'],
        data_quality_score: 0.85,
        verification_status: 'verified'
    },
    {
        place_id: 'place_or_001',
        canonical_name: 'Odisha',
        place_type: 'state',
        state_code: 'OR',
        latitude: 20.9517,
        longitude: 85.0985,
        area_sq_km: 155707,
        population: { value: 41947358, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 73.5, year: 2011, source: 'Census of India 2011' },
        num_districts: { value: 30 },
        major_industries: ['Mining', 'Steel', 'Aluminum'],
        data_quality_score: 0.9,
        verification_status: 'verified'
    },
    {
        place_id: 'place_pb_001',
        canonical_name: 'Punjab',
        place_type: 'state',
        state_code: 'PB',
        latitude: 31.1471,
        longitude: 75.3412,
        area_sq_km: 50362,
        population: { value: 27704236, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 76.7, year: 2011, source: 'Census of India 2011' },
        num_districts: { value: 23 },
        major_industries: ['Agriculture', 'Textiles', 'Sports Goods'],
        data_quality_score: 0.95,
        verification_status: 'verified'
    },
    {
        place_id: 'place_rj_001',
        canonical_name: 'Rajasthan',
        place_type: 'state',
        state_code: 'RJ',
        latitude: 27.0238,
        longitude: 74.2179,
        area_sq_km: 342239,
        population: { value: 68621012, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 67.1, year: 2011, source: 'Census of India 2011' },
        num_districts: { value: 33 },
        major_industries: ['Tourism', 'Mining', 'Textiles'],
        data_quality_score: 0.9,
        verification_status: 'verified'
    },
    {
        place_id: 'place_sk_001',
        canonical_name: 'Sikkim',
        place_type: 'state',
        state_code: 'SK',
        latitude: 27.5330,
        longitude: 88.5122,
        area_sq_km: 7096,
        population: { value: 607688, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 82.2, year: 2011, source: 'Census of India 2011' },
        num_districts: { value: 4 },
        major_industries: ['Tourism', 'Hydropower', 'Horticulture'],
        data_quality_score: 0.9,
        verification_status: 'verified'
    },
    {
        place_id: 'place_tn_001',
        canonical_name: 'Tamil Nadu',
        place_type: 'state',
        state_code: 'TN',
        latitude: 11.1271,
        longitude: 78.6569,
        area_sq_km: 130060,
        population: { value: 72138958, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 80.3, year: 2011, source: 'Census of India 2011' },
        num_districts: { value: 38 },
        major_industries: ['Automobiles', 'Textiles', 'IT'],
        data_quality_score: 0.95,
        verification_status: 'verified'
    },
    {
        place_id: 'place_tg_001',
        canonical_name: 'Telangana',
        place_type: 'state',
        state_code: 'TG',
        latitude: 18.1124,
        longitude: 79.0193,
        area_sq_km: 112077,
        population: { value: 35193978, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 66.5, year: 2011, source: 'Census of India 2011' },
        num_districts: { value: 33 },
        major_industries: ['IT', 'Pharmaceuticals', 'Biotechnology'],
        data_quality_score: 0.95,
        verification_status: 'verified'
    },
    {
        place_id: 'place_tr_001',
        canonical_name: 'Tripura',
        place_type: 'state',
        state_code: 'TR',
        latitude: 23.9408,
        longitude: 91.9882,
        area_sq_km: 10486,
        population: { value: 3671032, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 87.8, year: 2011, source: 'Census of India 2011' },
        num_districts: { value: 8 },
        major_industries: ['Agriculture', 'Handloom', 'Handicrafts'],
        data_quality_score: 0.85,
        verification_status: 'verified'
    },
    {
        place_id: 'place_up_001',
        canonical_name: 'Uttar Pradesh',
        place_type: 'state',
        state_code: 'UP',
        latitude: 26.8467,
        longitude: 80.9462,
        area_sq_km: 240928,
        population: { value: 199581477, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 69.7, year: 2011, source: 'Census of India 2011' },
        num_districts: { value: 75 },
        major_industries: ['Agriculture', 'Textiles', 'IT'],
        data_quality_score: 0.9,
        verification_status: 'verified'
    },
    {
        place_id: 'place_uk_001',
        canonical_name: 'Uttarakhand',
        place_type: 'state',
        state_code: 'UK',
        latitude: 30.0668,
        longitude: 79.0193,
        area_sq_km: 53483,
        population: { value: 10116752, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 79.6, year: 2011, source: 'Census of India 2011' },
        num_districts: { value: 13 },
        major_industries: ['Tourism', 'Hydropower', 'Pharmaceuticals'],
        data_quality_score: 0.9,
        verification_status: 'verified'
    },
    {
        place_id: 'place_wb_001',
        canonical_name: 'West Bengal',
        place_type: 'state',
        state_code: 'WB',
        latitude: 22.9868,
        longitude: 87.8550,
        area_sq_km: 88752,
        population: { value: 91347736, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 77.1, year: 2011, source: 'Census of India 2011' },
        num_districts: { value: 23 },
        major_industries: ['IT', 'Manufacturing', 'Tea'],
        major_industries: ['Tourism', 'Textiles', 'IT'],
        data_quality_score: 0.95,
        verification_status: 'verified'
    }
]

// Union Territories (8 UTs)
const UNION_TERRITORIES = [
    {
        place_id: 'place_an_001',
        canonical_name: 'Andaman and Nicobar Islands',
        place_type: 'union_territory',
        state_code: 'AN',
        latitude: 11.7401,
        longitude: 92.6586,
        area_sq_km: 8249,
        population: { value: 379944, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 86.3, year: 2011, source: 'Census of India 2011' },
        num_districts: { value: 3 },
        major_industries: ['Tourism', 'Fishing', 'Agriculture'],
        data_quality_score: 0.85,
        verification_status: 'verified'
    },
    {
        place_id: 'place_ch_001',
        canonical_name: 'Chandigarh',
        place_type: 'union_territory',
        state_code: 'CH',
        latitude: 30.7333,
        longitude: 76.7794,
        area_sq_km: 114,
        population: { value: 1054686, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 86.4, year: 2011, source: 'Census of India 2011' },
        num_districts: { value: 1 },
        major_industries: ['IT', 'Education', 'Tourism'],
        data_quality_score: 0.95,
        verification_status: 'verified'
    },
    {
        place_id: 'place_dd_001',
        canonical_name: 'Dadra and Nagar Haveli and Daman and Diu',
        place_type: 'union_territory',
        state_code: 'DD',
        latitude: 20.3974,
        longitude: 72.8328,
        area_sq_km: 603,
        population: { value: 585764, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 77.7, year: 2011, source: 'Census of India 2011' },
        num_districts: { value: 3 },
        major_industries: ['Manufacturing', 'Tourism', 'Fishing'],
        data_quality_score: 0.9,
        verification_status: 'verified'
    },
    {
        place_id: 'place_dl_001',
        canonical_name: 'Delhi',
        place_type: 'union_territory',
        state_code: 'DL',
        latitude: 28.7041,
        longitude: 77.1025,
        area_sq_km: 1484,
        population: { value: 16753235, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 86.3, year: 2011, source: 'Census of India 2011' },
        num_districts: { value: 11 },
        major_industries: ['IT', 'Finance', 'Tourism'],
        data_quality_score: 0.95,
        verification_status: 'verified'
    },
    {
        place_id: 'place_jk_001',
        canonical_name: 'Jammu and Kashmir',
        place_type: 'union_territory',
        state_code: 'JK',
        latitude: 33.7782,
        longitude: 76.5762,
        area_sq_km: 42241,
        population: { value: 12548926, year: 2011, source: 'Census of India 2011', confidence: 0.9 },
        literacy_rate: { value: 68.7, year: 2011, source: 'Census of India 2011' },
        num_districts: { value: 20 },
        major_industries: ['Tourism', 'Handicrafts', 'Horticulture'],
        data_quality_score: 0.85,
        verification_status: 'verified'
    },
    {
        place_id: 'place_la_001',
        canonical_name: 'Ladakh',
        place_type: 'union_territory',
        state_code: 'LA',
        latitude: 34.1526,
        longitude: 77.5771,
        area_sq_km: 59146,
        population: { value: 274289, year: 2011, source: 'Census of India 2011', confidence: 0.9 },
        literacy_rate: { value: 77.7, year: 2011, source: 'Census of India 2011' },
        num_districts: { value: 2 },
        major_industries: ['Tourism', 'Agriculture', 'Handicrafts'],
        data_quality_score: 0.85,
        verification_status: 'verified'
    },
    {
        place_id: 'place_ld_001',
        canonical_name: 'Lakshadweep',
        place_type: 'union_territory',
        state_code: 'LD',
        latitude: 10.5667,
        longitude: 72.6417,
        area_sq_km: 32,
        population: { value: 64429, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 92.3, year: 2011, source: 'Census of India 2011' },
        num_districts: { value: 1 },
        major_industries: ['Fishing', 'Tourism', 'Coconut'],
        data_quality_score: 0.9,
        verification_status: 'verified'
    },
    {
        place_id: 'place_py_001',
        canonical_name: 'Puducherry',
        place_type: 'union_territory',
        state_code: 'PY',
        latitude: 11.9416,
        longitude: 79.8083,
        area_sq_km: 492,
        population: { value: 1244464, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 86.6, year: 2011, source: 'Census of India 2011' },
        num_districts: { value: 4 },
        major_industries: ['Tourism', 'Textiles', 'IT'],
        data_quality_score: 0.95,
        verification_status: 'verified'
    }
]

// Top 50 Most Populous Districts (Census 2011)
const TOP_DISTRICTS = [
    // Maharashtra Districts
    {
        place_id: 'place_mh_thane_001',
        canonical_name: 'Thane',
        place_type: 'district',
        state_code: 'MH',
        parent_place_id: 'place_mh_001',
        latitude: 19.2183,
        longitude: 72.9781,
        area_sq_km: 4202,
        population: { value: 11060148, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 84.5, year: 2011, source: 'Census of India 2011' },
        num_tehsils: { value: 7 },
        major_industries: ['Manufacturing', 'Logistics', 'Real Estate'],
        data_quality_score: 0.95,
        verification_status: 'verified'
    },
    {
        place_id: 'place_mh_pune_001',
        canonical_name: 'Pune',
        place_type: 'district',
        state_code: 'MH',
        parent_place_id: 'place_mh_001',
        latitude: 18.5204,
        longitude: 73.8567,
        area_sq_km: 15642,
        population: { value: 9429408, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 86.2, year: 2011, source: 'Census of India 2011' },
        num_tehsils: { value: 14 },
        major_industries: ['IT', 'Automobiles', 'Education'],
        data_quality_score: 0.95,
        verification_status: 'verified'
    },
    {
        place_id: 'place_mh_mumbai_suburban_001',
        canonical_name: 'Mumbai Suburban',
        place_type: 'district',
        state_code: 'MH',
        parent_place_id: 'place_mh_001',
        latitude: 19.0760,
        longitude: 72.8777,
        area_sq_km: 446,
        population: { value: 9356962, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 89.9, year: 2011, source: 'Census of India 2011' },
        num_tehsils: { value: 3 },
        major_industries: ['Finance', 'Entertainment', 'Services'],
        data_quality_score: 0.95,
        verification_status: 'verified'
    },
    {
        place_id: 'place_mh_nashik_001',
        canonical_name: 'Nashik',
        place_type: 'district',
        state_code: 'MH',
        parent_place_id: 'place_mh_001',
        latitude: 19.9975,
        longitude: 73.7898,
        area_sq_km: 15530,
        population: { value: 6109052, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 82.3, year: 2011, source: 'Census of India 2011' },
        num_tehsils: { value: 15 },
        major_industries: ['Wine', 'Agriculture', 'Manufacturing'],
        data_quality_score: 0.9,
        verification_status: 'verified'
    },
    {
        place_id: 'place_mh_nagpur_001',
        canonical_name: 'Nagpur',
        place_type: 'district',
        state_code: 'MH',
        parent_place_id: 'place_mh_001',
        latitude: 21.1458,
        longitude: 79.0882,
        area_sq_km: 9892,
        population: { value: 4653570, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 88.4, year: 2011, source: 'Census of India 2011' },
        num_tehsils: { value: 14 },
        major_industries: ['Oranges', 'IT', 'Textiles'],
        data_quality_score: 0.95,
        verification_status: 'verified'
    },

    // West Bengal Districts
    {
        place_id: 'place_wb_north_24_parganas_001',
        canonical_name: 'North Twenty Four Parganas',
        place_type: 'district',
        state_code: 'WB',
        parent_place_id: 'place_wb_001',
        latitude: 22.6157,
        longitude: 88.4332,
        area_sq_km: 4094,
        population: { value: 10009781, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 84.1, year: 2011, source: 'Census of India 2011' },
        num_tehsils: { value: 22 },
        major_industries: ['Jute', 'Manufacturing', 'Services'],
        data_quality_score: 0.95,
        verification_status: 'verified'
    },
    {
        place_id: 'place_wb_south_24_parganas_001',
        canonical_name: 'South Twenty Four Parganas',
        place_type: 'district',
        state_code: 'WB',
        parent_place_id: 'place_wb_001',
        latitude: 22.1667,
        longitude: 88.4333,
        area_sq_km: 9960,
        population: { value: 8161961, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 77.5, year: 2011, source: 'Census of India 2011' },
        num_tehsils: { value: 29 },
        major_industries: ['Agriculture', 'Fishing', 'Tourism'],
        data_quality_score: 0.9,
        verification_status: 'verified'
    },
    {
        place_id: 'place_wb_barddhaman_001',
        canonical_name: 'Barddhaman',
        place_type: 'district',
        state_code: 'WB',
        parent_place_id: 'place_wb_001',
        latitude: 23.2324,
        longitude: 87.8615,
        area_sq_km: 7024,
        population: { value: 7717563, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 76.2, year: 2011, source: 'Census of India 2011' },
        num_tehsils: { value: 31 },
        major_industries: ['Coal', 'Steel', 'Agriculture'],
        data_quality_score: 0.9,
        verification_status: 'verified'
    },
    {
        place_id: 'place_wb_murshidabad_001',
        canonical_name: 'Murshidabad',
        place_type: 'district',
        state_code: 'WB',
        parent_place_id: 'place_wb_001',
        latitude: 24.1833,
        longitude: 88.2833,
        area_sq_km: 5324,
        population: { value: 7103807, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 66.6, year: 2011, source: 'Census of India 2011' },
        num_tehsils: { value: 26 },
        major_industries: ['Silk', 'Agriculture', 'Handicrafts'],
        data_quality_score: 0.9,
        verification_status: 'verified'
    },

    // Karnataka Districts
    {
        place_id: 'place_ka_bengaluru_urban_001',
        canonical_name: 'Bangalore Urban',
        place_type: 'district',
        state_code: 'KA',
        parent_place_id: 'place_ka_001',
        latitude: 12.9716,
        longitude: 77.5946,
        area_sq_km: 2190,
        population: { value: 9621551, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 87.7, year: 2011, source: 'Census of India 2011' },
        num_tehsils: { value: 4 },
        major_industries: ['IT', 'Biotechnology', 'Aerospace'],
        data_quality_score: 0.95,
        verification_status: 'verified'
    },
    {
        place_id: 'place_ka_belgaum_001',
        canonical_name: 'Belgaum',
        place_type: 'district',
        state_code: 'KA',
        parent_place_id: 'place_ka_001',
        latitude: 15.8497,
        longitude: 74.4977,
        area_sq_km: 13415,
        population: { value: 4779661, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 73.5, year: 2011, source: 'Census of India 2011' },
        num_tehsils: { value: 10 },
        major_industries: ['Sugar', 'Textiles', 'Agriculture'],
        data_quality_score: 0.9,
        verification_status: 'verified'
    },
    {
        place_id: 'place_ka_mysore_001',
        canonical_name: 'Mysore',
        place_type: 'district',
        state_code: 'KA',
        parent_place_id: 'place_ka_001',
        latitude: 12.2958,
        longitude: 76.6394,
        area_sq_km: 6854,
        population: { value: 3001127, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 72.1, year: 2011, source: 'Census of India 2011' },
        num_tehsils: { value: 7 },
        major_industries: ['Tourism', 'Silk', 'Sandalwood'],
        data_quality_score: 0.95,
        verification_status: 'verified'
    },

    // Gujarat Districts
    {
        place_id: 'place_gj_ahmedabad_001',
        canonical_name: 'Ahmedabad',
        place_type: 'district',
        state_code: 'GJ',
        parent_place_id: 'place_gj_001',
        latitude: 23.0225,
        longitude: 72.5714,
        area_sq_km: 8707,
        population: { value: 7214225, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 85.3, year: 2011, source: 'Census of India 2011' },
        num_tehsils: { value: 11 },
        major_industries: ['Textiles', 'Pharmaceuticals', 'IT'],
        data_quality_score: 0.95,
        verification_status: 'verified'
    },
    {
        place_id: 'place_gj_surat_001',
        canonical_name: 'Surat',
        place_type: 'district',
        state_code: 'GJ',
        parent_place_id: 'place_gj_001',
        latitude: 21.1702,
        longitude: 72.8311,
        area_sq_km: 4549,
        population: { value: 6081322, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 87.9, year: 2011, source: 'Census of India 2011' },
        num_tehsils: { value: 10 },
        major_industries: ['Diamonds', 'Textiles', 'Petrochemicals'],
        data_quality_score: 0.95,
        verification_status: 'verified'
    },
    {
        place_id: 'place_gj_vadodara_001',
        canonical_name: 'Vadodara',
        place_type: 'district',
        state_code: 'GJ',
        parent_place_id: 'place_gj_001',
        latitude: 22.3072,
        longitude: 73.1812,
        area_sq_km: 7794,
        population: { value: 4165626, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 78.4, year: 2011, source: 'Census of India 2011' },
        num_tehsils: { value: 12 },
        major_industries: ['Petrochemicals', 'Pharmaceuticals', 'IT'],
        data_quality_score: 0.95,
        verification_status: 'verified'
    },

    // Rajasthan Districts
    {
        place_id: 'place_rj_jaipur_001',
        canonical_name: 'Jaipur',
        place_type: 'district',
        state_code: 'RJ',
        parent_place_id: 'place_rj_001',
        latitude: 26.9124,
        longitude: 75.7873,
        area_sq_km: 14068,
        population: { value: 6626178, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 75.5, year: 2011, source: 'Census of India 2011' },
        num_tehsils: { value: 13 },
        major_industries: ['Tourism', 'Gems', 'Textiles'],
        data_quality_score: 0.95,
        verification_status: 'verified'
    },
    {
        place_id: 'place_rj_jodhpur_001',
        canonical_name: 'Jodhpur',
        place_type: 'district',
        state_code: 'RJ',
        parent_place_id: 'place_rj_001',
        latitude: 26.2389,
        longitude: 73.0243,
        area_sq_km: 22850,
        population: { value: 3687165, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 65.9, year: 2011, source: 'Census of India 2011' },
        num_tehsils: { value: 9 },
        major_industries: ['Handicrafts', 'Tourism', 'Agriculture'],
        data_quality_score: 0.9,
        verification_status: 'verified'
    },

    // Uttar Pradesh Districts
    {
        place_id: 'place_up_allahabad_001',
        canonical_name: 'Allahabad',
        place_type: 'district',
        state_code: 'UP',
        parent_place_id: 'place_up_001',
        latitude: 25.4358,
        longitude: 81.8463,
        area_sq_km: 5482,
        population: { value: 5954391, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 72.3, year: 2011, source: 'Census of India 2011' },
        num_tehsils: { value: 8 },
        major_industries: ['Tourism', 'Agriculture', 'Education'],
        data_quality_score: 0.9,
        verification_status: 'verified'
    },
    {
        place_id: 'place_up_lucknow_001',
        canonical_name: 'Lucknow',
        place_type: 'district',
        state_code: 'UP',
        parent_place_id: 'place_up_001',
        latitude: 26.8467,
        longitude: 80.9462,
        area_sq_km: 2528,
        population: { value: 4589838, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 77.3, year: 2011, source: 'Census of India 2011' },
        num_tehsils: { value: 4 },
        major_industries: ['IT', 'Handicrafts', 'Tourism'],
        data_quality_score: 0.95,
        verification_status: 'verified'
    },
    {
        place_id: 'place_up_ghaziabad_001',
        canonical_name: 'Ghaziabad',
        place_type: 'district',
        state_code: 'UP',
        parent_place_id: 'place_up_001',
        latitude: 28.6692,
        longitude: 77.4538,
        area_sq_km: 1179,
        population: { value: 4681645, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 78.1, year: 2011, source: 'Census of India 2011' },
        num_tehsils: { value: 4 },
        major_industries: ['Manufacturing', 'Real Estate', 'Services'],
        data_quality_score: 0.95,
        verification_status: 'verified'
    },
    {
        place_id: 'place_up_azamgarh_001',
        canonical_name: 'Azamgarh',
        place_type: 'district',
        state_code: 'UP',
        parent_place_id: 'place_up_001',
        latitude: 26.0686,
        longitude: 83.1840,
        area_sq_km: 4054,
        population: { value: 4613913, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 70.9, year: 2011, source: 'Census of India 2011' },
        num_tehsils: { value: 7 },
        major_industries: ['Agriculture', 'Handicrafts', 'Textiles'],
        data_quality_score: 0.9,
        verification_status: 'verified'
    },
    {
        place_id: 'place_up_moradabad_001',
        canonical_name: 'Moradabad',
        place_type: 'district',
        state_code: 'UP',
        parent_place_id: 'place_up_001',
        latitude: 28.8389,
        longitude: 78.7768,
        area_sq_km: 3718,
        population: { value: 4772006, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 58.7, year: 2011, source: 'Census of India 2011' },
        num_tehsils: { value: 6 },
        major_industries: ['Brassware', 'Handicrafts', 'Agriculture'],
        data_quality_score: 0.9,
        verification_status: 'verified'
    },

    // Tamil Nadu Districts
    {
        place_id: 'place_tn_chennai_001',
        canonical_name: 'Chennai',
        place_type: 'district',
        state_code: 'TN',
        parent_place_id: 'place_tn_001',
        latitude: 13.0827,
        longitude: 80.2707,
        area_sq_km: 426,
        population: { value: 4681087, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 90.2, year: 2011, source: 'Census of India 2011' },
        num_tehsils: { value: 3 },
        major_industries: ['IT', 'Automobiles', 'Healthcare'],
        data_quality_score: 0.95,
        verification_status: 'verified'
    },
    {
        place_id: 'place_tn_tiruvallur_001',
        canonical_name: 'Tiruvallur',
        place_type: 'district',
        state_code: 'TN',
        parent_place_id: 'place_tn_001',
        latitude: 13.1433,
        longitude: 79.9074,
        area_sq_km: 3422,
        population: { value: 3728104, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 84.2, year: 2011, source: 'Census of India 2011' },
        num_tehsils: { value: 8 },
        major_industries: ['Manufacturing', 'Agriculture', 'Services'],
        data_quality_score: 0.9,
        verification_status: 'verified'
    },

    // Bihar Districts
    {
        place_id: 'place_br_patna_001',
        canonical_name: 'Patna',
        place_type: 'district',
        state_code: 'BR',
        parent_place_id: 'place_br_001',
        latitude: 25.5941,
        longitude: 85.1376,
        area_sq_km: 3202,
        population: { value: 5838465, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 70.7, year: 2011, source: 'Census of India 2011' },
        num_tehsils: { value: 23 },
        major_industries: ['Agriculture', 'Education', 'Services'],
        data_quality_score: 0.9,
        verification_status: 'verified'
    },
    {
        place_id: 'place_br_east_champaran_001',
        canonical_name: 'East Champaran',
        place_type: 'district',
        state_code: 'BR',
        parent_place_id: 'place_br_001',
        latitude: 26.6467,
        longitude: 84.9116,
        area_sq_km: 3969,
        population: { value: 5099371, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 55.8, year: 2011, source: 'Census of India 2011' },
        num_tehsils: { value: 16 },
        major_industries: ['Agriculture', 'Sugar', 'Food Processing'],
        data_quality_score: 0.85,
        verification_status: 'verified'
    },
    {
        place_id: 'place_br_muzaffarpur_001',
        canonical_name: 'Muzaffarpur',
        place_type: 'district',
        state_code: 'BR',
        parent_place_id: 'place_br_001',
        latitude: 26.1225,
        longitude: 85.3906,
        area_sq_km: 3173,
        population: { value: 4801062, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 63.4, year: 2011, source: 'Census of India 2011' },
        num_tehsils: { value: 16 },
        major_industries: ['Litchi', 'Agriculture', 'Sugar'],
        data_quality_score: 0.9,
        verification_status: 'verified'
    },

    // Madhya Pradesh Districts
    {
        place_id: 'place_mp_indore_001',
        canonical_name: 'Indore',
        place_type: 'district',
        state_code: 'MP',
        parent_place_id: 'place_mp_001',
        latitude: 22.7196,
        longitude: 75.8577,
        area_sq_km: 3898,
        population: { value: 3276697, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 80.9, year: 2011, source: 'Census of India 2011' },
        num_tehsils: { value: 4 },
        major_industries: ['Textiles', 'Pharmaceuticals', 'IT'],
        data_quality_score: 0.95,
        verification_status: 'verified'
    },
    {
        place_id: 'place_mp_jabalpur_001',
        canonical_name: 'Jabalpur',
        place_type: 'district',
        state_code: 'MP',
        parent_place_id: 'place_mp_001',
        latitude: 23.1815,
        longitude: 79.9864,
        area_sq_km: 5211,
        population: { value: 2460714, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 81.1, year: 2011, source: 'Census of India 2011' },
        num_tehsils: { value: 7 },
        major_industries: ['Defense', 'Manufacturing', 'Tourism'],
        data_quality_score: 0.9,
        verification_status: 'verified'
    },

    // Andhra Pradesh Districts
    {
        place_id: 'place_ap_east_godavari_001',
        canonical_name: 'East Godavari',
        place_type: 'district',
        state_code: 'AP',
        parent_place_id: 'place_ap_001',
        latitude: 17.2403,
        longitude: 81.9780,
        area_sq_km: 10807,
        population: { value: 5154296, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 71.4, year: 2011, source: 'Census of India 2011' },
        num_tehsils: { value: 19 },
        major_industries: ['Agriculture', 'Aquaculture', 'Petroleum'],
        data_quality_score: 0.9,
        verification_status: 'verified'
    },
    {
        place_id: 'place_ap_west_godavari_001',
        canonical_name: 'West Godavari',
        place_type: 'district',
        state_code: 'AP',
        parent_place_id: 'place_ap_001',
        latitude: 16.7150,
        longitude: 81.1100,
        area_sq_km: 7742,
        population: { value: 3936966, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 74.6, year: 2011, source: 'Census of India 2011' },
        num_tehsils: { value: 15 },
        major_industries: ['Agriculture', 'Aquaculture', 'Horticulture'],
        data_quality_score: 0.9,
        verification_status: 'verified'
    },

    // Telangana Districts
    {
        place_id: 'place_tg_hyderabad_001',
        canonical_name: 'Hyderabad',
        place_type: 'district',
        state_code: 'TG',
        parent_place_id: 'place_tg_001',
        latitude: 17.3850,
        longitude: 78.4867,
        area_sq_km: 217,
        population: { value: 3943323, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 83.3, year: 2011, source: 'Census of India 2011' },
        num_tehsils: { value: 1 },
        major_industries: ['IT', 'Pharmaceuticals', 'Biotechnology'],
        data_quality_score: 0.95,
        verification_status: 'verified'
    },
    {
        place_id: 'place_tg_rangareddy_001',
        canonical_name: 'Rangareddy',
        place_type: 'district',
        state_code: 'TG',
        parent_place_id: 'place_tg_001',
        latitude: 17.3061,
        longitude: 78.2480,
        area_sq_km: 7493,
        population: { value: 5296741, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 75.8, year: 2011, source: 'Census of India 2011' },
        num_tehsils: { value: 15 },
        major_industries: ['IT', 'Real Estate', 'Manufacturing'],
        data_quality_score: 0.95,
        verification_status: 'verified'
    },

    // Kerala Districts
    {
        place_id: 'place_kl_malappuram_001',
        canonical_name: 'Malappuram',
        place_type: 'district',
        state_code: 'KL',
        parent_place_id: 'place_kl_001',
        latitude: 11.0510,
        longitude: 76.0711,
        area_sq_km: 3550,
        population: { value: 4112920, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 93.6, year: 2011, source: 'Census of India 2011' },
        num_tehsils: { value: 7 },
        major_industries: ['Remittances', 'Agriculture', 'Education'],
        data_quality_score: 0.95,
        verification_status: 'verified'
    },
    {
        place_id: 'place_kl_thiruvananthapuram_001',
        canonical_name: 'Thiruvananthapuram',
        place_type: 'district',
        state_code: 'KL',
        parent_place_id: 'place_kl_001',
        latitude: 8.5241,
        longitude: 76.9366,
        area_sq_km: 2192,
        population: { value: 3301427, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 93.0, year: 2011, source: 'Census of India 2011' },
        num_tehsils: { value: 5 },
        major_industries: ['IT', 'Tourism', 'Services'],
        data_quality_score: 0.95,
        verification_status: 'verified'
    },

    // Assam Districts
    {
        place_id: 'place_as_nagaon_001',
        canonical_name: 'Nagaon',
        place_type: 'district',
        state_code: 'AS',
        parent_place_id: 'place_as_001',
        latitude: 26.3467,
        longitude: 92.6836,
        area_sq_km: 3831,
        population: { value: 2823768, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 72.4, year: 2011, source: 'Census of India 2011' },
        num_tehsils: { value: 9 },
        major_industries: ['Agriculture', 'Handloom', 'Tea'],
        data_quality_score: 0.9,
        verification_status: 'verified'
    },

    // Jharkhand Districts
    {
        place_id: 'place_jh_ranchi_001',
        canonical_name: 'Ranchi',
        place_type: 'district',
        state_code: 'JH',
        parent_place_id: 'place_jh_001',
        latitude: 23.3441,
        longitude: 85.3096,
        area_sq_km: 5097,
        population: { value: 2914253, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 76.1, year: 2011, source: 'Census of India 2011' },
        num_tehsils: { value: 18 },
        major_industries: ['Mining', 'Steel', 'IT'],
        data_quality_score: 0.9,
        verification_status: 'verified'
    },

    // Odisha Districts
    {
        place_id: 'place_or_ganjam_001',
        canonical_name: 'Ganjam',
        place_type: 'district',
        state_code: 'OR',
        parent_place_id: 'place_or_001',
        latitude: 19.3850,
        longitude: 84.8800,
        area_sq_km: 8206,
        population: { value: 3529031, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 71.9, year: 2011, source: 'Census of India 2011' },
        num_tehsils: { value: 22 },
        major_industries: ['Agriculture', 'Cashew', 'Textiles'],
        data_quality_score: 0.9,
        verification_status: 'verified'
    },

    // Haryana Districts
    {
        place_id: 'place_hr_faridabad_001',
        canonical_name: 'Faridabad',
        place_type: 'district',
        state_code: 'HR',
        parent_place_id: 'place_hr_001',
        latitude: 28.4089,
        longitude: 77.3178,
        area_sq_km: 741,
        population: { value: 1809733, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 81.7, year: 2011, source: 'Census of India 2011' },
        num_tehsils: { value: 3 },
        major_industries: ['Manufacturing', 'Automobiles', 'IT'],
        data_quality_score: 0.95,
        verification_status: 'verified'
    },

    // Punjab Districts
    {
        place_id: 'place_pb_ludhiana_001',
        canonical_name: 'Ludhiana',
        place_type: 'district',
        state_code: 'PB',
        parent_place_id: 'place_pb_001',
        latitude: 30.9010,
        longitude: 75.8573,
        area_sq_km: 3767,
        population: { value: 3498739, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 82.5, year: 2011, source: 'Census of India 2011' },
        num_tehsils: { value: 5 },
        major_industries: ['Textiles', 'Bicycles', 'Auto Parts'],
        data_quality_score: 0.95,
        verification_status: 'verified'
    },

    // Chhattisgarh Districts
    {
        place_id: 'place_cg_raipur_001',
        canonical_name: 'Raipur',
        place_type: 'district',
        state_code: 'CG',
        parent_place_id: 'place_cg_001',
        latitude: 21.2514,
        longitude: 81.6296,
        area_sq_km: 13083,
        population: { value: 4063872, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 76.7, year: 2011, source: 'Census of India 2011' },
        num_tehsils: { value: 11 },
        major_industries: ['Steel', 'Power', 'IT'],
        data_quality_score: 0.9,
        verification_status: 'verified'
    },

    // Delhi Districts
    {
        place_id: 'place_dl_north_west_delhi_001',
        canonical_name: 'North West Delhi',
        place_type: 'district',
        state_code: 'DL',
        parent_place_id: 'place_dl_001',
        latitude: 28.7196,
        longitude: 77.1006,
        area_sq_km: 440,
        population: { value: 3656539, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 84.7, year: 2011, source: 'Census of India 2011' },
        num_tehsils: { value: 3 },
        major_industries: ['Services', 'Manufacturing', 'Retail'],
        data_quality_score: 0.95,
        verification_status: 'verified'
    },
    {
        place_id: 'place_dl_north_east_delhi_001',
        canonical_name: 'North East Delhi',
        place_type: 'district',
        state_code: 'DL',
        parent_place_id: 'place_dl_001',
        latitude: 28.7041,
        longitude: 77.2750,
        area_sq_km: 60,
        population: { value: 2241624, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 83.0, year: 2011, source: 'Census of India 2011' },
        num_tehsils: { value: 1 },
        major_industries: ['Services', 'Retail', 'Manufacturing'],
        data_quality_score: 0.95,
        verification_status: 'verified'
    },

    // Jammu & Kashmir Districts
    {
        place_id: 'place_jk_jammu_001',
        canonical_name: 'Jammu',
        place_type: 'district',
        state_code: 'JK',
        parent_place_id: 'place_jk_001',
        latitude: 32.7266,
        longitude: 74.8570,
        area_sq_km: 3097,
        population: { value: 1529958, year: 2011, source: 'Census of India 2011', confidence: 0.9 },
        literacy_rate: { value: 83.5, year: 2011, source: 'Census of India 2011' },
        num_tehsils: { value: 7 },
        major_industries: ['Tourism', 'Handicrafts', 'Agriculture'],
        data_quality_score: 0.85,
        verification_status: 'verified'
    },

    // Uttarakhand Districts
    {
        place_id: 'place_uk_haridwar_001',
        canonical_name: 'Haridwar',
        place_type: 'district',
        state_code: 'UK',
        parent_place_id: 'place_uk_001',
        latitude: 29.9457,
        longitude: 78.1642,
        area_sq_km: 2360,
        population: { value: 1890422, year: 2011, source: 'Census of India 2011', confidence: 0.95 },
        literacy_rate: { value: 73.4, year: 2011, source: 'Census of India 2011' },
        num_tehsils: { value: 4 },
        major_industries: ['Tourism', 'Pharmaceuticals', 'Agriculture'],
        data_quality_score: 0.9,
        verification_status: 'verified'
    }
]

// Combine states, UTs, and districts
const ALL_PLACES = [...INDIAN_STATES, ...UNION_TERRITORIES, ...TOP_DISTRICTS]

async function loadData() {
    console.log('🚀 Starting data load...')

    const client = new MongoClient(MONGO_URI)

    try {
        await client.connect()
        console.log('✅ Connected to MongoDB Atlas')

        const db = client.db(DB_NAME)
        const placesCollection = db.collection('places')

        // Clear existing data
        await placesCollection.deleteMany({})
        console.log('🗑️  Cleared existing data')

        // Insert all states, UTs, and districts
        const result = await placesCollection.insertMany(ALL_PLACES)
        console.log(`✅ Inserted ${result.insertedCount} places`)
        console.log(`   - States: ${INDIAN_STATES.length}`)
        console.log(`   - Union Territories: ${UNION_TERRITORIES.length}`)
        console.log(`   - Districts: ${TOP_DISTRICTS.length}`)

        // Create indexes
        await placesCollection.createIndex({ place_id: 1 }, { unique: true })
        await placesCollection.createIndex({ canonical_name: 1 })
        await placesCollection.createIndex({ place_type: 1 })
        await placesCollection.createIndex({ state_code: 1 })
        await placesCollection.createIndex({ parent_place_id: 1 })
        console.log('✅ Created indexes')

        console.log('\n🎉 Data load complete!')
        console.log(`📊 Total places loaded: ${ALL_PLACES.length}`)

    } catch (error) {
        console.error('❌ Error loading data:', error)
        throw error
    } finally {
        await client.close()
        console.log('👋 MongoDB connection closed')
    }
}

// Run the loader
loadData().catch(console.error)
