import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import Chatbot from './components/Chatbot';
import './index.css';

const ProtectedRoute = ({ children, roleRequired }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="app-container"><div className="glass card" style={{margin: 'auto', padding: '2rem'}}>Loading...</div></div>;
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roleRequired && user.role !== roleRequired) {
    return <Navigate to={`/${user.role}-dashboard`} replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/admin-dashboard/*" 
              element={
                <ProtectedRoute roleRequired="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/employee-dashboard/*" 
              element={
                <ProtectedRoute roleRequired="employee">
                  <EmployeeDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
          <Chatbot />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
