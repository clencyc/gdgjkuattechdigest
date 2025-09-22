// src/components/admin/AdminRoute.jsx
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../../services';
import AdminLogin from './AdminLogin';

// Create Admin Context
const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};

// Admin Provider Component
export const AdminProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminToken, setAdminToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = () => {
      const isAdmin = authService.isAdmin();
      const token = authService.getAdminToken();
      
      if (isAdmin && token) {
        setIsAuthenticated(true);
        setAdminToken(token);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = (token) => {
    if (authService.login(token)) {
      setIsAuthenticated(true);
      setAdminToken(token);
      return true;
    }
    return false;
  };

  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setAdminToken(null);
  };

  const value = {
    isAuthenticated,
    adminToken,
    login,
    logout,
    loading
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

// Protected Admin Route Component
const AdminRoute = ({ children }) => {
  const { isAuthenticated, login, loading } = useAdmin();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={login} />;
  }

  return children;
};

export default AdminRoute;