import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import { PerformanceMonitor } from './components/PerformanceMonitor'
import { AccessibilityChecker } from './components/AccessibilityChecker'
import { LanguageProvider } from './context/LanguageContext'
import AppRoutes from './routes/AppRoutes'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        {/* <ErrorBoundary> */}
          <PerformanceMonitor />
          <AccessibilityChecker />
          <AppRoutes />
        {/* </ErrorBoundary> */}
      </LanguageProvider>
    </BrowserRouter>
  )
}

export default App
