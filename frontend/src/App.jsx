import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import './App.css'
import './styles/mobile.css'
import PlacePage from './pages/PlacePage'
import ExplorePage from './pages/ExplorePage'
import HealthPage from './pages/HealthPage'
import ComparePage from './pages/ComparePage'
import BookmarksPage from './pages/BookmarksPage'
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
    </nav>
  )
}

function App() {
  return (
    <ErrorBoundary>
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
              <Route path="/map" element={<MapPage />} />
              <Route path="/compare" element={<ComparePage />} />
              <Route path="/place/:placeId" element={<PlacePage />} />
              <Route path="/" element={<Navigate to="/explore" replace />} />
            </Routes>
          </Suspense>

          <ComparisonFloatingButton />
          <AIChat />
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App

