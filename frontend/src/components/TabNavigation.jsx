/**
 * TabNavigation Component
 * 
 * Tabbed interface for Place Intelligence Profile
 * - 7 tabs: Overview, Geography, Demographics, Economy, Governance, Culture, Risks
 * - URL-based state
 * - Sticky navigation
 * - Icons per tab
 */

import { useSearchParams } from 'react-router-dom'
import './TabNavigation.css'

const TABS = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'geography', label: 'Geography', icon: '🗺️' },
    { id: 'demographics', label: 'Demographics', icon: '👥' },
    { id: 'economy', label: 'Economy', icon: '💰' },
    { id: 'governance', label: 'Governance', icon: '🏛️' },
    { id: 'culture', label: 'Culture', icon: '🎭' },
    { id: 'community', label: 'Community', icon: '🤝' },
    { id: 'risks', label: 'Risks', icon: '⚠️' }
]

export default function TabNavigation({ activeTab, onTabChange }) {
    const [searchParams, setSearchParams] = useSearchParams()

    const handleTabClick = (tabId) => {
        // Update URL
        setSearchParams({ tab: tabId })

        // Notify parent
        if (onTabChange) {
            onTabChange(tabId)
        }
    }

    // Get active tab from URL or prop
    const currentTab = searchParams.get('tab') || activeTab || 'overview'

    return (
        <nav className="tab-navigation" role="tablist" aria-label="Place information tabs">
            <div className="tab-list">
                {TABS.map(tab => (
                    <button
                        key={tab.id}
                        role="tab"
                        aria-selected={currentTab === tab.id}
                        aria-controls={`tab-panel-${tab.id}`}
                        className={`tab-button ${currentTab === tab.id ? 'active' : ''}`}
                        onClick={() => handleTabClick(tab.id)}
                    >
                        <span className="tab-icon">{tab.icon}</span>
                        <span className="tab-label">{tab.label}</span>
                    </button>
                ))}
            </div>
        </nav>
    )
}

/**
 * TabPanel Component
 * 
 * Container for tab content
 */
export function TabPanel({ id, activeTab, children }) {
    const [searchParams] = useSearchParams()
    const currentTab = searchParams.get('tab') || activeTab || 'overview'

    if (currentTab !== id) return null

    return (
        <div
            id={`tab-panel-${id}`}
            role="tabpanel"
            aria-labelledby={`tab-${id}`}
            className="tab-panel"
        >
            {children}
        </div>
    )
}
