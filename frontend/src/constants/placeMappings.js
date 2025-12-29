// State name to place_id mapping
// Used for map click navigation
export const STATE_NAME_TO_ID = {
    'Karnataka': 'place_ka_001',
    'Maharashtra': 'place_mh_001',
    'Tamil Nadu': 'place_tn_001'
}

// Place ID to state name mapping (reverse lookup)
export const PLACE_ID_TO_STATE_NAME = {
    'place_ka_001': 'Karnataka',
    'place_mh_001': 'Maharashtra',
    'place_tn_001': 'Tamil Nadu'
}

export default {
    STATE_NAME_TO_ID,
    PLACE_ID_TO_STATE_NAME
}
