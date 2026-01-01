/**
 * Search Integration with Map
 * 
 * Connects search functionality to map highlighting
 */

import { highlightSearchResult, clearSearchHighlight } from '../map/searchHighlight'

/**
 * Handle search result selection
 */
export function handleSearchResultClick(place, mapRef) {
    if (mapRef && mapRef.current) {
        highlightSearchResult(mapRef.current, place)
    }
}

/**
 * Clear search on new query
 */
export function handleSearchClear(mapRef) {
    if (mapRef && mapRef.current) {
        clearSearchHighlight(mapRef.current)
    }
}
