import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Setup from './pages/Setup';
import Simulation from './pages/Simulation';
import Result from './pages/Result';
import Instructions from './pages/Instructions';

/**
 * Main App Component
 * Handles routing for all pages
 */
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/simulation" element={<Simulation />} />
        <Route path="/result" element={<Result />} />
        <Route path="/instructions" element={<Instructions />} />
      </Routes>
    </Router>
  );
}

export default App;
