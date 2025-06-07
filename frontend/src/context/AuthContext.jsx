import { useState, createContext, useContext, useCallback } from 'react';
import { Navigate } from "react-router-dom";

/**
 * MÓDULO: Contexto de control de acceso al dashboard
 * Crea el contexto React para manejar permisos de navegación
 */

const DashboardAccessContext = createContext();

/**
 * COMPONENTE: DashboardAccessProvider - Proveedor del contexto de autenticación
 * 
 * Responsabilidades:
 * - Mantener el estado global de acceso al dashboard
 * - Proveer funciones para otorgar/revocar permisos
 * - Manejar navegación con control de acceso
 * 
 * Props:
 * - children: Componentes hijos que tendrán acceso al contexto
 */

export const DashboardAccessProvider = ({ children }) => {

  /**
   * MÓDULO: Estado principal de autorización
   * Controla si el usuario puede acceder al dashboard
   */
  const [canAccessDashboard, setCanAccessDashboard] = useState(false);
  
  /**
   * MÓDULO: Función para otorgar acceso
   * useCallback evita re-renders innecesarios al memorizar la función
   */
  const allowDashboardAccess = useCallback(() => {
    setCanAccessDashboard(true);
  }, []); // Sin dependencias = función estable
  
   /**
   * MÓDULO: Función para revocar acceso
   * useCallback para optimización de rendimiento
   */
  const revokeDashboardAccess = useCallback(() => {
    setCanAccessDashboard(false);
  }, []); // Sin dependencias = función estable

  /**
   * MÓDULO: Navegación con autorización automática
   * Combina otorgamiento de permisos con navegación programática
   * 
   * Parámetros:
   * - navigate: Función de navegación de React Router
   * - path: Ruta de destino
   */
  
  const navigateWithAccess = useCallback((navigate, path) => {
    setCanAccessDashboard(true); // Otorgar acceso inmediatamente
    // requestAnimationFrame: Asegura que el estado se actualice completamente
    // antes de ejecutar la navegación (más confiable que setTimeout)
    requestAnimationFrame(() => {
      navigate(path);
    });
  }, []); // Sin dependencias = función estable
  
  /**
   * MÓDULO: Provisión del contexto
   * Expone todas las funciones y estado a los componentes hijos
   */

  return (
    <DashboardAccessContext.Provider value={{
      canAccessDashboard, // Estado actual de autorización
      allowDashboardAccess, // Función para otorgar acceso
      revokeDashboardAccess, // Función para revocar acceso
      navigateWithAccess // Función de navegación con autorización
    }}>
      {children}
    </DashboardAccessContext.Provider>
  );
}

/**
 * HOOK PERSONALIZADO: useDashboardAccess
 * 
 * Funcionalidades:
 * - Proporciona acceso al contexto de autenticación
 * - Incluye validación de uso correcto del contexto
 * - Simplifica el consumo del contexto en componentes
 */

export const useDashboardAccess = () => {
  const context = useContext(DashboardAccessContext);

  /**
   * MÓDULO: Validación de contexto
   * Asegura que el hook se use dentro del provider correspondiente
   */
  if (!context) {
    throw new Error('useDashboardAccess debe ser usado dentro de DashboardAccessProvider');
  }
  return context;
};

/**
 * COMPONENTE: ProtectedRoute - Ruta protegida con control de acceso
 * 
 * Funcionalidades:
 * - Verifica permisos antes de renderizar contenido
 * - Redirige automáticamente si no hay autorización
 * - Implementa el patrón de "guard route"
 * 
 * Props:
 * - children: Componentes que se renderizarán si hay acceso autorizado
 */

export const ProtectedRoute = ({ children }) => {
  const { canAccessDashboard } = useDashboardAccess();

  /**
   * MÓDULO: Renderizado condicional con redirección
   * - Si hay acceso: renderiza los children
   * - Si no hay acceso: redirige a la página principal
   * - replace=true: reemplaza la entrada en el historial (evita loops)
   */
  
  return canAccessDashboard ? children : <Navigate to="/" replace />;
}