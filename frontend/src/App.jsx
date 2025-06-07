import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import { DashboardAccessProvider, ProtectedRoute } from './context/AuthContext';

function App() {
  return (
    <Router>
      <DashboardAccessProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route
            path='/dashboard'
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </DashboardAccessProvider>
    </Router>
  )
}

export default App;
