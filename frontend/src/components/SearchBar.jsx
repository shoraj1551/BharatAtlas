import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './SearchBar.css'
import placeService from '../services/placeService'

function SearchBar() {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const searchRef = useRef(null)
    const navigate = useNavigate()

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Debounced search with request cancellation
    useEffect(() => {
        if (query.length < 2) {
            setResults([])
            setIsOpen(false)
            return
        }

        setLoading(true)

        // Create AbortController for this request
        const abortController = new AbortController()

        const timeoutId = setTimeout(async () => {
            try {
                const searchResults = await placeService.searchPlaces(query)

                // Only update if request wasn't aborted
                if (!abortController.signal.aborted) {
                    setResults(searchResults.slice(0, 5)) // Max 5 results
                    setIsOpen(true) // Always show dropdown when searching
                    setLoading(false)
                }
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error('Search error:', error)
                    setLoading(false)
                }
            }
        }, 300) // 300ms debounce

        // Cleanup: cancel request and clear timeout
        return () => {
            clearTimeout(timeoutId)
            abortController.abort()
        }
    }, [query])

    const handleSelect = (place) => {
        navigate(`/place/${place.place_id}`)
        setQuery('')
        setIsOpen(false)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            setIsOpen(false)
        }
        if (e.key === 'Enter' && results.length > 0) {
            handleSelect(results[0]) // Select first result
        }
    }

    return (
        <div className="search-bar" ref={searchRef} role="search">
            <input
                type="text"
                className="search-input"
                placeholder="Search places..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => query.length >= 2 && setIsOpen(true)}
                aria-label="Search for places in India"
                aria-autocomplete="list"
                aria-controls="search-results"
                aria-expanded={isOpen}
            />

            {isOpen && (
                <div className="search-dropdown" id="search-results" role="listbox">
                    {loading ? (
                        <div className="search-loading" role="status" aria-live="polite">Searching...</div>
                    ) : results.length > 0 ? (
                        results.map((place) => (
                            <div
                                key={place.place_id}
                                className="search-result"
                                role="option"
                                aria-selected="false"
                            >
                                <div
                                    className="search-result-main"
                                    onClick={() => handleSelect(place)}
                                    tabIndex={0}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSelect(place)}
                                >
                                    <div className="search-result-name">{place.canonical_name}</div>
                                    <div className="search-result-type">{place.place_type.toUpperCase()}</div>
                                </div>
                                <button
                                    className="view-on-map-btn"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        navigate(`/map?place=${place.place_id}`)
                                        setQuery('')
                                        setIsOpen(false)
                                    }}
                                    title="View on map"
                                >
                                    📍 Map
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="search-empty" role="status">
                            No places found for "{query}"
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default SearchBar
