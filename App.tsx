import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import DoctorsPage from './pages/DoctorsPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import AppointmentBookingPage from './pages/AppointmentBookingPage';
import AdminDashboard from './components/dashboards/AdminDashboard';
import DoctorDashboard from './components/dashboards/DoctorDashboard';
import PatientDashboard from './components/dashboards/PatientDashboard';
import NotificationsPage from './pages/NotificationsPage';

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

function App() {
  return (
    <Router>
      <AuthProvider>
        <NotificationProvider>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/doctors" element={<DoctorsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/book-appointment" element={<AppointmentBookingPage />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
                <Route path="/patient-dashboard" element={<PatientDashboard />} />
                <Route path="/notifications" element={<NotificationsPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </NotificationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;