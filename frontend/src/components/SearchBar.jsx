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

    // Debounced search
    useEffect(() => {
        if (query.length < 2) {
            setResults([])
            setIsOpen(false)
            return
        }

        setLoading(true)
        const timeoutId = setTimeout(async () => {
            try {
                const searchResults = await placeService.searchPlaces(query)
                setResults(searchResults.slice(0, 5)) // Max 5 results
                setIsOpen(true) // Always show dropdown when searching
                setLoading(false)
            } catch (error) {
                console.error('Search error:', error)
                setLoading(false)
            }
        }, 300) // 300ms debounce

        return () => clearTimeout(timeoutId)
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
        <div className="search-bar" ref={searchRef}>
            <input
                type="text"
                className="search-input"
                placeholder="Search places..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => query.length >= 2 && setIsOpen(true)}
            />

            {isOpen && (
                <div className="search-dropdown">
                    {loading ? (
                        <div className="search-loading">Searching...</div>
                    ) : results.length > 0 ? (
                        results.map((place) => (
                            <div
                                key={place.place_id}
                                className="search-result"
                                onClick={() => handleSelect(place)}
                            >
                                <div className="search-result-name">{place.canonical_name}</div>
                                <div className="search-result-type">{place.place_type}</div>
                            </div>
                        ))
                    ) : (
                        <div className="search-empty">
                            No places found for "{query}"
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default SearchBar
