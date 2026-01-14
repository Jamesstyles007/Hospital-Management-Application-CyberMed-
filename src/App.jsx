import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HospitalProvider, useHospitalData } from './context/HospitalContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Doctors from './pages/Doctors';
import Appointments from './pages/Appointments';
import Login from './pages/Login';
import Register from './pages/Register';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useHospitalData();
  
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black text-cyan-600 dark:text-cyan-500">Loading...</div>;
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  // Wrap in Layout only if authenticated
  return <Layout>{children}</Layout>;
};

function App() {
  return (
    <Router>
      <HospitalProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/patients" element={
            <ProtectedRoute>
              <Patients />
            </ProtectedRoute>
          } />
          <Route path="/doctors" element={
            <ProtectedRoute>
              <Doctors />
            </ProtectedRoute>
          } />
          <Route path="/appointments" element={
            <ProtectedRoute>
              <Appointments />
            </ProtectedRoute>
          } />
        </Routes>
      </HospitalProvider>
    </Router>
  );
}

export default App;