import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import CandidateLayout from './components/CandidateLayout';
import AdminLayout from './components/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import AdminProtectedRoute from './components/AdminProtectedRoute';

// Public/Candidate Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CandidateDashboard from './pages/CandidateDashboard';
import CandidateProfile from './pages/CandidateProfile';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import Applications from './pages/Applications';
import Placements from './pages/Placements';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminRegister from './pages/admin/AdminRegister';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminJobs from './pages/admin/AdminJobs';
import AdminAddJob from './pages/admin/AdminAddJob';
import AdminCandidates from './pages/admin/AdminCandidates';
import AdminApplications from './pages/admin/AdminApplications';
import AdminPlacements from './pages/admin/AdminPlacements';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Admin Auth (No Layout) */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />

          {/* Admin Routes with Sidebar Layout */}
          <Route path="/admin" element={<AdminProtectedRoute><AdminLayout /></AdminProtectedRoute>}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="jobs" element={<AdminJobs />} />
            <Route path="jobs/add" element={<AdminAddJob />} />
            <Route path="candidates" element={<AdminCandidates />} />
            <Route path="applications" element={<AdminApplications />} />
            <Route path="placements" element={<AdminPlacements />} />
          </Route>

          {/* Candidate Routes with Navbar Layout */}
          <Route element={<CandidateLayout />}>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetails />} />

            {/* Protected Candidate Routes */}
            <Route path="/dashboard" element={<ProtectedRoute><CandidateDashboard /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><CandidateProfile /></ProtectedRoute>} />
            <Route path="/applications" element={<ProtectedRoute><Applications /></ProtectedRoute>} />
            <Route path="/placements" element={<ProtectedRoute><Placements /></ProtectedRoute>} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
