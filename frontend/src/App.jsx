import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SimulatorProvider } from './context/SimulatorContext';

// Original pages (for backward compatibility)
import Landing from './pages/Landing';
import Setup from './pages/Setup';
import Simulation from './pages/Simulation';
import Result from './pages/Result';
import Instructions from './pages/Instructions';

// Dashboard layout and pages
import DashboardLayout from './components/DashboardLayout';
import Overview from './pages/dashboard/Overview';
import Settings from './pages/dashboard/Settings';
import AdvancedSettings from './pages/dashboard/AdvancedSettings';
import AlgorithmMap from './pages/dashboard/AlgorithmMap';
import DashboardSimulation from './pages/dashboard/DashboardSimulation';
import SimulationHistory from './pages/dashboard/SimulationHistory';
import Results from './pages/dashboard/Results';
import DashboardInstructions from './pages/dashboard/Instructions';

/**
 * Main App Component
 * Handles routing for all pages including new dashboard
 */
function App() {
  return (
    <SimulatorProvider>
      <Router>
        <Routes>
          {/* Original routes (legacy - redirect to dashboard) */}
          <Route path="/" element={<Landing />} />
          <Route path="/setup" element={<Setup />} />
          <Route path="/simulation" element={<Simulation />} />
          <Route path="/result" element={<Result />} />
          <Route path="/instructions" element={<Instructions />} />

          {/* Dashboard routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/dashboard/overview" replace />} />
            <Route path="overview" element={<Overview />} />
            <Route path="settings" element={<Settings />} />
            <Route path="advanced" element={<AdvancedSettings />} />
            <Route path="algorithm" element={<AlgorithmMap />} />
            <Route path="simulation" element={<DashboardSimulation />} />
            <Route path="history" element={<SimulationHistory />} />
            <Route path="results" element={<Results />} />
            <Route path="instructions" element={<DashboardInstructions />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </SimulatorProvider>
  );
}

export default App;
