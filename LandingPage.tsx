import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Calendar, Users, Shield, Stethoscope, UserCheck } from 'lucide-react';

const LandingPage = () => {
  const features = [
    {
      icon: <Calendar className="w-8 h-8 text-blue-600" />,
      title: "Easy Appointment Booking",
      description: "Schedule appointments with your preferred doctors at your convenience"
    },
    {
      icon: <Stethoscope className="w-8 h-8 text-blue-600" />,
      title: "Expert Medical Care",
      description: "Access to qualified healthcare professionals across various specializations"
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Patient-Doctor Communication",
      description: "Secure messaging and video consultations for better healthcare delivery"
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Secure & Private",
      description: "Your medical data is protected with enterprise-grade security measures"
    }
  ];

  const userTypes = [
    {
      icon: <UserCheck className="w-12 h-12 text-green-600" />,
      title: "For Patients",
      description: "Book appointments, access medical records, and communicate with doctors",
      color: "bg-green-50 border-green-200"
    },
    {
      icon: <Stethoscope className="w-12 h-12 text-blue-600" />,
      title: "For Doctors",
      description: "Manage appointments, patient records, and provide quality healthcare",
      color: "bg-blue-50 border-blue-200"
    },
    {
      icon: <Shield className="w-12 h-12 text-purple-600" />,
      title: "For Administrators",
      description: "Oversee operations, manage users, and analyze healthcare metrics",
      color: "bg-purple-50 border-purple-200"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Heart className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">HealthCare+</span>
            </div>
            <Link
              to="/login"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Health, <span className="text-blue-600">Our Priority</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Experience seamless healthcare management with our comprehensive appointment system. 
            Connect with doctors, manage your health records, and receive quality care from anywhere.
          </p>
          <Link
            to="/login"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors duration-200 inline-flex items-center space-x-2"
          >
            <span>Get Started Today</span>
            <Calendar className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose HealthCare+?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive healthcare solutions designed for modern medical practice
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Built for Everyone</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform serves patients, healthcare providers, and administrators with tailored experiences
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {userTypes.map((type, index) => (
              <div key={index} className={`p-8 rounded-xl border-2 ${type.color} hover:shadow-lg transition-shadow duration-200`}>
                <div className="flex justify-center mb-6">{type.icon}</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">{type.title}</h3>
                <p className="text-gray-600 text-center">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Transform Your Healthcare Experience?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of patients and healthcare providers who trust HealthCare+ for their medical needs
          </p>
          <Link
            to="/login"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
          >
            Start Your Journey
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-2 mb-8">
            <Heart className="w-8 h-8 text-blue-400" />
            <span className="text-2xl font-bold">HealthCare+</span>
          </div>
          <div className="text-center text-gray-400">
            <p>&copy; 2025 HealthCare+. All rights reserved. Your health, our commitment.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;