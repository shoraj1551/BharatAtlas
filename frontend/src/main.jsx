import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import { registerServiceWorker, setupInstallPrompt } from './utils/pwaUtils'
import './utils/performanceMonitor' // Auto-init performance monitoring

// Register service worker for PWA
console.log("🚀 [MAIN] Script loaded, starting initialization...");
try {
  console.log("🚀 [MAIN] Registering service worker...");
  registerServiceWorker()
  setupInstallPrompt()
  console.log("✅ [MAIN] PWA setup complete");
} catch (e) {
  console.error("❌ [MAIN] PWA Setup Failed", e);
}

console.log("🚀 [MAIN] Getting root element...");
const rootElement = document.getElementById('root')
console.log("🚀 [MAIN] Root element:", rootElement);

if (!rootElement) {
  console.error("❌ [MAIN] Root element not found!");
} else {
  console.log("🚀 [MAIN] Creating React root...");
  try {
    const root = createRoot(rootElement)
    console.log("✅ [MAIN] React root created successfully");

    console.log("🚀 [MAIN] Rendering App...");
    root.render(
      <StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </StrictMode>
    )
    console.log("✅ [MAIN] App rendered successfully");
  } catch (e) {
    console.error("❌ [MAIN] Error during render:", e);
  }
}

