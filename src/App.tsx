import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SignedIn, SignedOut } from '@clerk/clerk-react'

// Pages
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import LegalQuery from './pages/LegalQuery'
import StateComparison from './pages/StateComparison'
import EvidenceGuide from './pages/EvidenceGuide'
import ProcedureGuide from './pages/ProcedureGuide'
import Settings from './pages/Settings'

// Components
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/legal-query" element={<LegalQuery />} />
              <Route path="/compare-states" element={<StateComparison />} />
              <Route path="/evidence" element={<EvidenceGuide />} />
              <Route path="/procedures" element={<ProcedureGuide />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
