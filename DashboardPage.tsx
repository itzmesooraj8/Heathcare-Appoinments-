import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AdminDashboard from '../components/dashboards/AdminDashboard';
import DoctorDashboard from '../components/dashboards/DoctorDashboard';
import PatientDashboard from '../components/dashboards/PatientDashboard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useNotifications } from '../contexts/NotificationContext';

const DashboardPage = () => {
  const { user, loading } = useAuth();
  const { addNotification } = useNotifications();
  const location = useLocation();

  // Show welcome notification for new users
  React.useEffect(() => {
    if (user && location.state?.isNewUser) {
      addNotification({
        title: 'Welcome to HealthCare+!',
        message: `Welcome ${user.name}! Your ${user.role} dashboard is ready.`,
        type: 'success'
      });
    }
  }, [user, location.state, addNotification]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  switch (user.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'doctor':
      return <DoctorDashboard />;
    case 'patient':
      return <PatientDashboard />;
    default:
      return <Navigate to="/login" />;
  }
};

export default DashboardPage;