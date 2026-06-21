import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// Pages
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import ReferralDetails from './pages/ReferralDetails/ReferralDetails';
import NotFound from './pages/NotFound/NotFound';

// Route Guards
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

// Route guard for authenticated users accessing login page
const PublicOnlyRoute = ({ children }) => {
  const token = Cookies.get('jwt_token');
  if (token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public auth route (redirects to / if token cookie exists) */}
        <Route 
          path="/login" 
          element={
            <PublicOnlyRoute>
              <Login />
            </PublicOnlyRoute>
          } 
        />

        {/* Protected dashboard and details routes */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/referral/:id" 
          element={
            <ProtectedRoute>
              <ReferralDetails />
            </ProtectedRoute>
          } 
        />

        {/* Redirect route as specified */}
        <Route path="/dashboard/referrals" element={<Navigate to="/" replace />} />

        {/* Fallback public 404 route - NOT wrapped in ProtectedRoute */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
