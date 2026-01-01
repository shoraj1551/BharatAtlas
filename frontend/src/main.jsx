import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import { registerServiceWorker, setupInstallPrompt } from './utils/pwaUtils'
import './utils/performanceMonitor' // Auto-init performance monitoring

// Register service worker for PWA
registerServiceWorker()
setupInstallPrompt()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
