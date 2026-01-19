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
import { useLanguage } from '../context/LanguageContext'
import './TabNavigation.css'

export default function TabNavigation({ activeTab = 'overview', onTabChange }) {
    const { t } = useLanguage()

    const tabs = [
        { id: 'overview', label: t('Overview'), icon: '📊' },
        { id: 'timeline', label: t('Timeline'), icon: '📈' }, // Feature 3.2
        { id: 'geography', label: t('Geography'), icon: '🗺️' },
        { id: 'demographics', label: t('Demographics'), icon: '👥' },
        { id: 'economy', label: t('Economy'), icon: '💰' },
        { id: 'infrastructure', label: t('Infrastructure'), icon: '🏗️' },
        { id: 'governance', label: t('Governance'), icon: '🏛️' },
        { id: 'opportunity', label: t('Opportunity'), icon: '🚀' },
        { id: 'culture', label: t('Culture'), icon: '🎭' },
        { id: 'reviews', label: t('Reviews'), icon: '⭐' }, // Feature 3.3
        { id: 'discussions', label: t('Discussions'), icon: '💬' }, // Feature 3.3
        { id: 'community', label: t('Community'), icon: '🏙️' },
        { id: 'risks', label: t('Risks'), icon: '⚠️' }
    ]

    // Internal state for uncontrolled usage, but we prefer controlled
    const [searchParams, setSearchParams] = useSearchParams()

    // Determine current tab: Prop > URL > Default
    const urlTab = searchParams.get('tab')
    // If we are functioning as a controlled component (via PlacePage deep linking), 
    // we prefer the prop 'activeTab'. 
    // If 'activeTab' is passed, we use it. 
    const currentTab = activeTab || urlTab || 'overview'

    const handleTabClick = (tabId) => {
        if (onTabChange) {
            onTabChange(tabId)
        }
    }

    // The rest of the TabNavigation component's JSX would go here.
    // For example, rendering the tabs and their content.
    // This example assumes the TabNavigation component is not fully provided
    // and focuses on the TabPanel definition.
    return (
        <nav className="tab-navigation">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    className={`tab-button ${currentTab === tab.id ? 'active' : ''}`}
                    onClick={() => handleTabClick(tab.id)}
                    aria-selected={currentTab === tab.id}
                    role="tab"
                    id={`tab-${tab.id}`}
                >
                    <span className="tab-icon">{tab.icon}</span>
                    <span className="tab-label">{tab.label}</span>
                </button>
            ))}
        </nav>
    )
}

export function TabPanel({ id, activeTab, children }) {
    if (activeTab !== id) return null

    return (
        <div
            id={`panel-${id}`}
            role="tabpanel"
            aria-labelledby={`tab-${id}`}
            className="tab-panel"
        >
            {children}
        </div>
    )
}
