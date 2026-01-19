import { useState, useEffect } from 'react'
import { advancedSearch } from '../services/advancedSearchService'
import SearchFilterPanel from '../components/SearchFilterPanel'
import SearchResultsGrid from '../components/SearchResultsGrid'
import './AdvancedSearchPage.css'

export default function AdvancedSearchPage() {
    const [query, setQuery] = useState('')
    const [filters, setFilters] = useState({})
    const [sort, setSort] = useState('relevance')
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [pagination, setPagination] = useState(null)

    const performSearch = async () => {
        setLoading(true)
        try {
            const response = await advancedSearch({
                query,
                filters,
                sort,
                page: 1,
                limit: 20
            })

            setResults(response.data)
            setPagination(response.pagination)
        } catch (error) {
            console.error('Search failed:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        performSearch()
    }, [filters, sort])

    const handleSearch = (e) => {
        e.preventDefault()
        performSearch()
    }

    return (
        <div className="advanced-search-page">
            <div className="search-header">
                <h1>Advanced Search</h1>
                <form onSubmit={handleSearch} className="search-form">
                    <input
                        type="text"
                        placeholder="Search places..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="search-input"
                    />
                    <button type="submit" className="search-btn">Search</button>
                </form>

                <div className="sort-controls">
                    <label>Sort by:</label>
                    <select value={sort} onChange={(e) => setSort(e.target.value)}>
                        <option value="relevance">Relevance</option>
                        <option value="population_desc">Population (High to Low)</option>
                        <option value="population_asc">Population (Low to High)</option>
                        <option value="literacy_desc">Literacy (High to Low)</option>
                        <option value="readiness_desc">Readiness Score</option>
                        <option value="name">Name (A-Z)</option>
                    </select>
                </div>
            </div>

            <div className="search-content">
                <aside className="filters-sidebar">
                    <SearchFilterPanel
                        onFilterChange={setFilters}
                        onClear={() => setFilters({})}
                    />
                </aside>

                <main className="results-main">
                    {pagination && (
                        <div className="results-info">
                            Found {pagination.total} places
                        </div>
                    )}

                    <SearchResultsGrid results={results} loading={loading} />
                </main>
            </div>
        </div>
    )
}
