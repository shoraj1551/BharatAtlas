import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import { registerServiceWorker, setupInstallPrompt } from './utils/pwaUtils'
import './utils/performanceMonitor' // Auto-init performance monitoring

// Register service worker for PWA
console.log("🚀 Mounting React App...");
try {
  registerServiceWorker()
  setupInstallPrompt()
} catch (e) {
  console.error("PWA Setup Failed", e);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
