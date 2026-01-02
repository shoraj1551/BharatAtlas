import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { LanguageProvider, useLanguage } from './context/LanguageContext'
import './App.css'
import './styles/mobile.css'
import PlacePage from './pages/PlacePage'
import ExplorePage from './pages/ExplorePage'
import HealthPage from './pages/HealthPage'
import ComparePage from './pages/ComparePage'
import WorkspacePage from './pages/WorkspacePage' // Changed from BookmarksPage
import GovernancePage from './pages/GovernancePage'
import SearchBar from './components/SearchBar'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorBoundary from './components/ErrorBoundary'
import ComparisonFloatingButton from './components/ComparisonFloatingButton'
import NotificationCenter from './components/NotificationCenter'
import AIChat from './components/AIChat'
import { logScaleReadiness } from './utils/scaleReadiness'

// Log scale readiness on app load (development only)
if (import.meta.env.DEV) {
  logScaleReadiness()
}

// Lazy load heavy components
const MapPage = lazy(() => import('./pages/MapPage'))
const AdminPage = lazy(() => import('./pages/AdminPage'))

// Navigation component
function Navigation() {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }

  return (
    <nav className="main-nav">
      <Link
        to="/explore"
        className={`nav-link ${isActive('/explore') ? 'active' : ''}`}
      >
        Explore
      </Link>
      <Link
        to="/map"
        className={`nav-link ${isActive('/map') ? 'active' : ''}`}
      >
        Map
      </Link>
      <Link
        to="/compare"
        className={`nav-link ${isActive('/compare') ? 'active' : ''}`}
      >
        Compare
      </Link>
      <Link
        to="/workspace"
        className={`nav-link ${isActive('/workspace') ? 'active' : ''}`}
      >
        Workspace
      </Link>
    </nav>
  )
}

// Language Switcher Component
function LanguageSwitcher() {
  const { language, switchLanguage } = useLanguage()
  return (
    <div className="lang-switcher" style={{ marginLeft: '1rem', display: 'flex', gap: '5px' }}>
      <button
        onClick={() => switchLanguage('en')}
        style={{ fontWeight: language === 'en' ? 'bold' : 'normal', opacity: language === 'en' ? 1 : 0.6 }}
      >
        EN
      </button>
      <span>|</span>
      <button
        onClick={() => switchLanguage('hi')}
        style={{ fontWeight: language === 'hi' ? 'bold' : 'normal', opacity: language === 'hi' ? 1 : 0.6 }}
      >
        HI
      </button>
    </div>
  )
}

import { ConnectivityProvider } from './context/ConnectivityProvider' // Bypass locked file

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <ConnectivityProvider> {/* Added Provider */}
          <BrowserRouter>
            <div className="app">
              <header className="identity-header">
                <div className="header-content">
                  <div className="identity">
                    <h1 className="platform-name">BharatAtlas</h1>
                    <p className="platform-purpose">Digital Intelligence for India</p>
                  </div>
                  <Navigation />
                  <SearchBar />
                  <LanguageSwitcher /> {/* Added Switcher */}
                  <NotificationCenter />
                  <div className="system-info">
                    <span className="status-indicator">●</span>
                    <span className="status-text">Operational</span>
                  </div>
                </div>
              </header>

              <Suspense fallback={<LoadingSpinner message="Loading..." />}>
                <Routes>
                  <Route path="/health" element={<HealthPage />} />
                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="/explore" element={<ExplorePage />} />

                  {/* Map Routes - Hierarchical */}
                  <Route path="/map" element={<MapPage />} />
                  <Route path="/map/state/:state" element={<MapPage />} />
                  <Route path="/map/state/:state/district/:district" element={<MapPage />} />
                  <Route path="/map/state/:state/district/:district/tehsil/:tehsil" element={<MapPage />} />

                  <Route path="/compare" element={<ComparePage />} />
                  <Route path="/place/:placeId/:layer?" element={<PlacePage />} />
                  <Route path="/workspace" element={<WorkspacePage />} /> { /* NEW WORKSPACE ROUTE */}
                  <Route path="/bookmarks" element={<Navigate to="/workspace" replace />} /> {/* Redirect old bookmarks */}
                  <Route path="/governance" element={<GovernancePage />} />

                  {/* Placeholders for Governance links to prevent 404s */}
                  <Route path="/curators" element={<div style={{ padding: '4rem', textAlign: 'center' }}><h2>Curator Profiles</h2><p>Coming Soon</p></div>} />
                  <Route path="/governance/logs" element={<div style={{ padding: '4rem', textAlign: 'center' }}><h2>Governance Logs</h2><p>Coming Soon</p></div>} />
                  <Route path="/governance/charter" element={<div style={{ padding: '4rem', textAlign: 'center' }}><h2>Full Charter</h2><p>Coming Soon</p></div>} />

                  <Route path="/" element={<Navigate to="/explore" replace />} />
                </Routes>
              </Suspense>

              <ComparisonFloatingButton />
              <AIChat />
            </div>
          </BrowserRouter>
        </ConnectivityProvider>
      </LanguageProvider>
    </ErrorBoundary>
  )
}

export default App
