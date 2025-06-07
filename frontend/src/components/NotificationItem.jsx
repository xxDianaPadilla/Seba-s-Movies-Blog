import React, { useState, useEffect } from 'react';
import { X, Film } from 'lucide-react';

/**
 * COMPONENTE: NotificationItem - Elemento individual de notificación
 * 
 * Props:
 * - notification: Objeto con datos de la notificación (id, type, title, message, timestamp, icon)
 * - onRemove: Función callback para eliminar la notificación
 */

const NotificationItem = ({ notification, onRemove }) => {

  // Estados para control de animaciones
  const [isVisible, setIsVisible] = useState(false); // Control de animación de entrada
  const [isLeaving, setIsLeaving] = useState(false); // Control de animación de salida

  /**
   * MÓDULO: Animación de entrada automática
   * Ejecuta la animación de entrada con un pequeño delay para suavidad
   */

  useEffect(() => {
    // Delay de 50ms para permitir que el DOM se actualice antes de animar
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer); // Cleanup del timer
  }, []);

  /**
   * MÓDULO: Manejo de eliminación con animación
   * Coordina la animación de salida antes de eliminar la notificación
   */

  const handleRemove = () => {
    setIsLeaving(true); // Activar animación de salida
     // Esperar 300ms para que termine la animación antes
    setTimeout(() => onRemove(notification.id), 300);
  };

  /**
   * MÓDULO: Sistema de estilos por tipo de notificación
   * Retorna clases CSS específicas según el tipo de notificación
   */

  const getNotificationStyles = () => {
    const baseStyles = "relative overflow-hidden backdrop-blur-sm border shadow-lg";
    
    switch (notification.type) {
      case 'success':
        return `${baseStyles} bg-green-50/90 border-green-200 text-green-800`;
      case 'error':
        return `${baseStyles} bg-red-50/90 border-red-200 text-red-800`;
      case 'delete':
        return `${baseStyles} bg-orange-50/90 border-orange-200 text-orange-800`;
      case 'edit':
        return `${baseStyles} bg-blue-50/90 border-blue-200 text-blue-800`;
      default:
        return `${baseStyles} bg-gray-50/90 border-gray-200 text-gray-800`;
    }
  };

  /**
   * MÓDULO: Colores de iconos por tipo
   * Asigna colores específicos a los iconos según el tipo de notificación
   */

  const getIconColor = () => {
    switch (notification.type) {
      case 'success':
        return 'text-green-500';
      case 'error':
        return 'text-red-500';
      case 'delete':
        return 'text-orange-500';
      case 'edit':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };

  /**
   * MÓDULO: Colores de barra de progreso por tipo
   * Define el color de la barra de progreso animada según el tipo
   */

  const getProgressBarColor = () => {
    switch (notification.type) {
      case 'success':
        return 'bg-green-400';
      case 'error':
        return 'bg-red-400';
      case 'delete':
        return 'bg-orange-400';
      case 'edit':
        return 'bg-blue-400';
      default:
        return 'bg-gray-400';
    }
  };

  // Componente de icono dinámico basado en la notificación
  const IconComponent = notification.icon;

  return (
    <div
      className={`
        transform transition-all duration-300 ease-in-out rounded-xl p-4 mb-3 min-w-[320px] max-w-[400px]
        ${getNotificationStyles()}
        ${isVisible && !isLeaving 
          ? 'translate-x-0 opacity-100 scale-100' 
          : 'translate-x-full opacity-0 scale-95'
        }
        ${isLeaving ? 'translate-x-full opacity-0 scale-95' : ''}
      `}
    >
      {/* Progress bar animada */}
      <div className={`absolute bottom-0 left-0 h-1 ${getProgressBarColor()} rounded-b-xl animate-pulse`}></div>
      
      <div className="flex items-start space-x-3">
        <div className={`flex-shrink-0 ${getIconColor()}`}>
          <IconComponent className="w-6 h-6" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-semibold text-sm leading-tight">
                {notification.title}
              </h4>
              {notification.message && (
                <p className="mt-1 text-sm opacity-90 leading-tight">
                  {notification.message}
                </p>
              )}
              <div className="mt-2 text-xs opacity-70">
                {notification.timestamp.toLocaleTimeString()}
              </div>
            </div>
            
            <button
              onClick={handleRemove}
              className="flex-shrink-0 ml-2 p-1 rounded-full hover:bg-black/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Elemento decorativo */}
      <div className="absolute top-2 right-12 opacity-10">
        <Film className="w-8 h-8" />
      </div>
    </div>
  );
};

// Contenedor principal de notificaciones
const NotificationContainer = ({ notifications, onRemove }) => {
  return (
    <div className="fixed top-4 right-4 z-50 pointer-events-none">
      <div className="space-y-2 pointer-events-auto">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onRemove={onRemove}
          />
        ))}
      </div>
    </div>
  );
};

export default NotificationContainer;