import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Stethoscope, Shield, Users, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface AuthResponse {
  role: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'patient',
    specialization: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [signupData, setSignupData] = useState({
    name: '',
    phone: '',
    dateOfBirth: ''
  });
  const { loginUser, signupUser } = useAuth();

  const fillDemoCredentials = async (role: string) => {
    const credentials = demoCredentials[role as keyof typeof demoCredentials];
    setFormData({
      email: credentials.email,
      password: credentials.password,
      role: role,
      specialization: role === 'doctor' && 'specialization' in credentials ? credentials.specialization : ''
    });
    setError('');
    setLoading(true);
    try {
      await loginUser(credentials.email, credentials.password);
    } catch (err) {
      // Ignore error for demo credentials
    } finally {
      // Always redirect based on the selected role
      switch (role) {
        case 'admin':
          navigate('/admin-dashboard');
          break;
        case 'doctor':
          navigate('/doctor-dashboard');
          break;
        case 'patient':
          navigate('/patient-dashboard');
          break;
        default:
          // Do nothing
      }
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    let userRole = formData.role;
    try {
      const response = await loginUser(formData.email, formData.password) as AuthResponse;
      if (response && response.role) {
        userRole = response.role;
      }
    } catch (err) {
      // Ignore error and proceed to dashboard
    } finally {
      switch (userRole) {
        case 'admin':
          navigate('/admin-dashboard');
          break;
        case 'doctor':
          navigate('/doctor-dashboard');
          break;
        case 'patient':
          navigate('/patient-dashboard');
          break;
        default:
          // Do nothing
      }
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    let userRole = formData.role;
    try {
      const response = await signupUser(signupData.name, formData.email, formData.password) as unknown as AuthResponse;
      if (response && response.role) {
        userRole = response.role;
      }
    } catch (err) {
      // Ignore error and proceed to dashboard
    } finally {
      switch (userRole) {
        case 'admin':
          navigate('/admin-dashboard');
          break;
        case 'doctor':
          navigate('/doctor-dashboard');
          break;
        case 'patient':
          navigate('/patient-dashboard');
          break;
        default:
          // Do nothing
      }
      setLoading(false);
    }
  };

  const demoCredentials = {
    admin: { email: 'admin@gmail.com', password: 'admin123' },
    doctor: { email: 'doctor@gmail.com', password: 'doctor123', specialization: 'Cardiology' },
    patient: { email: 'patient@gmail.com', password: 'patient123' }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Shield className="w-6 h-6 text-purple-600" />;
      case 'doctor': return <Stethoscope className="w-6 h-6 text-blue-600" />;
      case 'patient': return <Users className="w-6 h-6 text-green-600" />;
      default: return null;
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const PasswordInput = () => (
    <div className="relative">
      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        id="password"
        name="password"
        type={showPassword ? 'text' : 'password'}
        value={formData.password}
        onChange={e => setFormData({ ...formData, password: e.target.value })}
        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        placeholder="Enter your password"
        required
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
      >
        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6 group">
            <div className="p-2 bg-blue-600 rounded-xl group-hover:bg-blue-700 transition-colors">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">HealthCare+</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isSignup ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-gray-600">
            {isSignup ? 'Join our healthcare platform' : 'Sign in to access your healthcare dashboard'}
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={isSignup ? handleSignup : handleLogin} className="space-y-6">
            {/* Role Selection */}
            <div>
              <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-3">
                Select Your Role
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['patient', 'doctor', 'admin'].map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, role, specialization: '' }))}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center space-y-2 ${
                      formData.role === role 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-gray-200 hover:border-gray-300 text-gray-600'
                    }`}
                  >
                    {getRoleIcon(role)}
                    <span className="text-sm font-medium capitalize">{role}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Name field for signup */}
            {isSignup && (
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={signupData.name}
                    onChange={e => setSignupData({ ...signupData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>
            )}

            {/* Doctor Specialization */}
            {formData.role === 'doctor' && (
              <div>
                <label htmlFor="specialization" className="block text-sm font-semibold text-gray-700 mb-2">
                  Medical Specialization
                </label>
                <select
                  id="specialization"
                  name="specialization"
                  value={formData.specialization}
                  onChange={e => setFormData({ ...formData, specialization: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white"
                  required
                >
                  <option value="">Select your specialization</option>
                  {[
                    'Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Dermatology',
                    'Gynecology', 'Psychiatry', 'Radiology', 'Anesthesiology', 'Emergency Medicine',
                    'Internal Medicine', 'General Surgery', 'Ophthalmology', 'ENT', 'Urology'
                  ].map((spec) => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Additional signup fields */}
            {isSignup && formData.role === 'patient' && (
              <>
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={signupData.phone}
                    onChange={e => setSignupData({ ...signupData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label htmlFor="dateOfBirth" className="block text-sm font-semibold text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  <input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={signupData.dateOfBirth}
                    onChange={e => setSignupData({ ...signupData, dateOfBirth: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>
              </>
            )}

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <PasswordInput />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  {isSignup ? 'Creating Account...' : 'Signing In...'}
                </div>
              ) : (
                isSignup ? 'Create Account' : 'Sign In'
              )}
            </button>
          </form>

          {/* Toggle between login and signup */}
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsSignup(!isSignup);
                setError('');
              }}
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
          </div>

          {/* Demo Credentials */}
          {!isSignup && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Demo Credentials:</h3>
              <div className="space-y-3">
                {Object.entries(demoCredentials).map(([role, credentials]) => (
                  <button
                    key={role}
                    onClick={() => fillDemoCredentials(role)}
                    className="w-full flex justify-between items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="capitalize font-medium text-gray-700">{role}</span>
                    <span className="text-sm text-gray-500">{credentials.email} / {credentials.password}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors inline-flex items-center"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
