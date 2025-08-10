import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X, Bell, User, Calendar, Phone, ChevronDown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showServicesMenu, setShowServicesMenu] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { 
      name: 'Services', 
      href: '/services',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Emergency Care', href: '/services#emergency' },
        { name: 'Cardiology', href: '/services#cardiology' },
        { name: 'Neurology', href: '/services#neurology' },
        { name: 'Pediatrics', href: '/services#pediatrics' },
        { name: 'Orthopedics', href: '/services#orthopedics' },
      ]
    },
    { name: 'Doctors', href: '/doctors' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
      {/* Top Bar */}
      <div className="bg-blue-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>Emergency: +91 123456789 </span>
              </div>
              <div className="hidden md:block">
                <span>24/7 Healthcare Services Available</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {!user ? (
                <Link
                  to="/login"
                  className="hover:text-blue-200 transition-colors flex items-center space-x-1"
                >
                  <User className="w-4 h-4" />
                  <span>Login/Sign-Up </span>
                </Link>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 hover:text-blue-200 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span>{user.name}</span>
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        {user.role === 'admin' ? 'Admin Dashboard' : 
                         user.role === 'doctor' ? 'Doctor Dashboard' : 
                         'Patient Dashboard'}
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setShowUserMenu(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-blue-600 rounded-xl group-hover:bg-blue-700 transition-colors">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">HealthCare+</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  to={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${
                    isActive(item.href)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                  onMouseEnter={() => item.hasDropdown && setShowServicesMenu(true)}
                  onMouseLeave={() => item.hasDropdown && setShowServicesMenu(false)}
                >
                  <span>{item.name}</span>
                  {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                </Link>
                
                {/* Dropdown Menu */}
                {item.hasDropdown && showServicesMenu && (
                  <div 
                    className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                    onMouseEnter={() => setShowServicesMenu(true)}
                    onMouseLeave={() => setShowServicesMenu(false)}
                  >
                    {item.dropdownItems?.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.name}
                        to={dropdownItem.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        {dropdownItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/book-appointment"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-all duration-300 flex items-center space-x-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <div key={item.name}>
                <Link
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {item.name}
                </Link>
                {/* Mobile Dropdown Items */}
                {item.hasDropdown && item.dropdownItems?.map((dropdownItem) => (
                  <Link
                    key={dropdownItem.name}
                    to={dropdownItem.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-6 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    {dropdownItem.name}
                  </Link>
                ))}
              </div>
            ))}
            <Link
              to="/book-appointment"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-blue-600 text-white px-3 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors mt-4"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;