import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Calendar, Clock } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-600 rounded-xl">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">HealthCare+</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Providing comprehensive healthcare services with cutting-edge technology and compassionate care. Your health is our priority.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors transform hover:scale-110">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors transform hover:scale-110">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors transform hover:scale-110">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors transform hover:scale-110">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform inline-block">About Us</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform inline-block">Our Services</Link></li>
              <li><Link to="/doctors" className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform inline-block">Find a Doctor</Link></li>
              <li><Link to="/book-appointment" className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform inline-block">Book Appointment</Link></li>
              <li><Link to="/login" className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform inline-block">Patient Portal</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Medical Services</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform inline-block">Emergency Care</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform inline-block">Cardiology</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform inline-block">Neurology</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform inline-block">Pediatrics</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform inline-block">Orthopedics</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                <span className="text-gray-300">123 Healthcare Ave, Medical City, MC 12345</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span className="text-gray-300">+91 123456789</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span className="text-gray-300">info@healthcareplus.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span className="text-gray-300">Mon-Fri: 8AM-11:30PM</span>
              </div>
            </div>
            
            {/* Emergency Hotline */}
            <div className="bg-red-600 p-4 rounded-lg mt-4">
              <h4 className="font-semibold mb-2 flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                Emergency Hotline
              </h4>
              <p className="text-2xl font-bold">112</p>
              <p className="text-sm text-red-100">Available 24/7</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} HealthCare+. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">HIPAA Compliance</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Accessibility</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;