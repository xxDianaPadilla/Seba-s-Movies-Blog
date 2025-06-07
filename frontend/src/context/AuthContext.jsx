import { useState, createContext, useContext, useCallback } from 'react';
import { Navigate } from "react-router-dom";

const DashboardAccessContext = createContext();

export const DashboardAccessProvider = ({ children }) => {
  const [canAccessDashboard, setCanAccessDashboard] = useState(false);
  
  const allowDashboardAccess = useCallback(() => {
    setCanAccessDashboard(true);
  }, []);
  
  const revokeDashboardAccess = useCallback(() => {
    setCanAccessDashboard(false);
  }, []);
  
  const navigateWithAccess = useCallback((navigate, path) => {
    setCanAccessDashboard(true);
    // Usar requestAnimationFrame para asegurar que el estado se actualice
    requestAnimationFrame(() => {
      navigate(path);
    });
  }, []);
  
  return (
    <DashboardAccessContext.Provider value={{
      canAccessDashboard,
      allowDashboardAccess,
      revokeDashboardAccess,
      navigateWithAccess
    }}>
      {children}
    </DashboardAccessContext.Provider>
  );
}

export const useDashboardAccess = () => {
  const context = useContext(DashboardAccessContext);
  if (!context) {
    throw new Error('useDashboardAccess debe ser usado dentro de DashboardAccessProvider');
  }
  return context;
};

export const ProtectedRoute = ({ children }) => {
  const { canAccessDashboard } = useDashboardAccess();
  
  return canAccessDashboard ? children : <Navigate to="/" replace />;
}