import { useState } from 'react';
import { CheckCircle, AlertCircle, Trash2, Edit } from 'lucide-react';

const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    const id = Date.now() + Math.random();
    const newNotification = {
      id,
      ...notification,
      timestamp: new Date(),
    };
    
    setNotifications(prev => [...prev, newNotification]);

    // Auto-remove after duration
    setTimeout(() => {
      removeNotification(id);
    }, notification.duration || 5000);

    return id;
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const showSuccess = (title, message, options = {}) => {
    return addNotification({
      type: 'success',
      title,
      message,
      icon: CheckCircle,
      ...options
    });
  };

  const showError = (title, message, options = {}) => {
    return addNotification({
      type: 'error',
      title,
      message,
      icon: AlertCircle,
      duration: 7000,
      ...options
    });
  };

  const showDelete = (title, message, options = {}) => {
    return addNotification({
      type: 'delete',
      title,
      message,
      icon: Trash2,
      ...options
    });
  };

  const showEdit = (title, message, options = {}) => {
    return addNotification({
      type: 'edit',
      title,
      message,
      icon: Edit,
      ...options
    });
  };

  return {
    notifications,
    addNotification,
    removeNotification,
    showSuccess,
    showError,
    showDelete,
    showEdit
  };
};

export default useNotifications;