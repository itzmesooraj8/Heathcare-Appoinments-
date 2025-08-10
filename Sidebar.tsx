import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  FileText, 
  Settings, 
  Heart,
  TrendingUp,
  UserCheck,
  Clock,
  MessageSquare,
  CreditCard,
  Bell
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const location = useLocation();

  const getMenuItems = () => {
    if (user?.role === 'admin') {
      return [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', color: 'text-blue-600' },
        { icon: TrendingUp, label: 'Revenue Analytics', path: '/revenue', color: 'text-green-600' },
        { icon: UserCheck, label: 'Doctor Management', path: '/doctors', color: 'text-purple-600' },
        { icon: Users, label: 'Patient Management', path: '/patients', color: 'text-teal-600' },
        { icon: FileText, label: 'Reports', path: '/reports', color: 'text-orange-600' },
        { icon: Settings, label: 'System Settings', path: '/settings', color: 'text-gray-600' }
      ];
    } else if (user?.role === 'doctor') {
      return [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', color: 'text-blue-600' },
        { icon: Calendar, label: 'Calendar', path: '/calendar', color: 'text-green-600' },
        { icon: Users, label: 'Patients', path: '/patients', color: 'text-teal-600' },
        { icon: Clock, label: 'Availability', path: '/availability', color: 'text-purple-600' },
        { icon: FileText, label: 'Prescriptions', path: '/prescriptions', color: 'text-orange-600' },
        { icon: CreditCard, label: 'Payments', path: '/payments', color: 'text-indigo-600' },
        { icon: Settings, label: 'Settings', path: '/settings', color: 'text-gray-600' }
      ];
    } else {
      return [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', color: 'text-blue-600' },
        { icon: Calendar, label: 'Appointments', path: '/appointments', color: 'text-green-600' },
        { icon: FileText, label: 'Medical Records', path: '/records', color: 'text-purple-600' },
        { icon: MessageSquare, label: 'Messages', path: '/messages', color: 'text-teal-600' },
        { icon: FileText, label: 'E-Prescriptions', path: '/prescriptions', color: 'text-orange-600' },
        { icon: CreditCard, label: 'Payments', path: '/payments', color: 'text-indigo-600' },
        { icon: Bell, label: 'Notifications', path: '/notifications', color: 'text-yellow-600' },
        { icon: Settings, label: 'Profile Settings', path: '/settings', color: 'text-gray-600' }
      ];
    }
  };

  const menuItems = getMenuItems();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-center h-16 border-b border-gray-200">
          <Heart className="w-8 h-8 text-blue-600" />
          <span className="ml-2 text-xl font-bold text-gray-900">HealthCare+</span>
        </div>
        
        <nav className="mt-8">
          <div className="px-4 space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path || 
                             (item.path === '/dashboard' && location.pathname === '/');
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`
                    flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200
                    ${isActive 
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <item.icon className={`w-5 h-5 mr-3 ${isActive ? 'text-blue-600' : item.color}`} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;