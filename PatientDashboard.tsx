import React, { useState } from 'react';
import { 
  Calendar, 
  FileText, 
  MessageSquare, 
  Heart, 
  Clock,
  CheckCircle,
  AlertCircle,
  CreditCard,
  Download,
  User,
  Edit,
  Bell,
  BellOff,
  Plus,
  Eye
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const PatientDashboard = () => {
  const [notifications, setNotifications] = useState(true);
  const { user } = useAuth();

  const stats = [
    {
      title: 'Upcoming Appointments',
      value: '3',
      change: 'Next: Tomorrow 2:00 PM',
      icon: Calendar,
      color: 'bg-blue-500'
    },
    {
      title: 'Health Score',
      value: '85%',
      change: '+5% from last month',
      icon: Heart,
      color: 'bg-green-500'
    },
    {
      title: 'Active Prescriptions',
      value: '4',
      change: '2 refills needed',
      icon: FileText,
      color: 'bg-purple-500'
    },
    {
      title: 'Unread Messages',
      value: '2',
      change: '1 from Dr. Johnson',
      icon: MessageSquare,
      color: 'bg-orange-500'
    }
  ];

  const upcomingAppointments = [
    { 
      date: '2024-01-16', 
      time: '2:00 PM', 
      doctor: 'Dr. Sarah Johnson', 
      specialty: 'Cardiology', 
      type: 'Follow-up',
      status: 'confirmed',
      location: 'Room 204'
    },
    { 
      date: '2024-01-20', 
      time: '10:30 AM', 
      doctor: 'Dr. Michael Chen', 
      specialty: 'Neurology', 
      type: 'Consultation',
      status: 'confirmed',
      location: 'Room 315'
    },
    { 
      date: '2024-01-25', 
      time: '3:00 PM', 
      doctor: 'Dr. Emily Davis', 
      specialty: 'Pediatrics', 
      type: 'Check-up',
      status: 'pending',
      location: 'Room 102'
    }
  ];

  const medicalHistory = [
    {
      date: '2024-01-10',
      type: 'Lab Results',
      description: 'Blood Work - Complete Blood Count',
      doctor: 'Dr. Sarah Johnson',
      status: 'Normal',
      downloadable: true
    },
    {
      date: '2024-01-05',
      type: 'Prescription',
      description: 'Lisinopril 10mg - Blood Pressure',
      doctor: 'Dr. Sarah Johnson',
      status: 'Active',
      downloadable: true
    },
    {
      date: '2023-12-20',
      type: 'Imaging',
      description: 'Chest X-Ray - Routine Check',
      doctor: 'Dr. Robert Taylor',
      status: 'Normal',
      downloadable: true
    }
  ];

  const prescriptions = [
    { 
      medication: 'Lisinopril 10mg', 
      prescribedBy: 'Dr. Sarah Johnson', 
      date: '2024-01-10',
      instructions: 'Take once daily with food in the morning',
      status: 'active',
      refillsLeft: 2,
      nextRefill: '2024-02-10'
    },
    { 
      medication: 'Metformin 500mg', 
      prescribedBy: 'Dr. Robert Taylor', 
      date: '2024-01-05',
      instructions: 'Take twice daily with meals',
      status: 'active',
      refillsLeft: 1,
      nextRefill: '2024-02-05'
    }
  ];

  const pendingBills = [
    {
      id: '1',
      description: 'Cardiology Consultation - Dr. Johnson',
      amount: 150,
      date: '2024-01-10',
      dueDate: '2024-02-10'
    },
    {
      id: '2',
      description: 'Lab Tests - Blood Work',
      amount: 85,
      date: '2024-01-12',
      dueDate: '2024-02-12'
    }
  ];

  const toggleNotifications = () => {
    setNotifications(!notifications);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
              <p className="text-gray-600 mt-2">Here's your health overview and upcoming appointments.</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleNotifications}
                className={`p-3 rounded-lg transition-colors ${
                  notifications 
                    ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                    : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                }`}
                title={notifications ? 'Notifications On' : 'Notifications Off'}
              >
                {notifications ? <Bell className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <Plus className="w-5 h-5" />
                <span>Book Appointment</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-2">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Upcoming Appointments */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Upcoming Appointments</h2>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment, index) => (
                <div key={index} className="p-4 rounded-lg bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">{appointment.doctor}</p>
                      <p className="text-sm text-gray-600">{appointment.specialty} • {appointment.type}</p>
                      <p className="text-sm text-blue-600 mt-1">
                        {appointment.date} at {appointment.time}
                      </p>
                      <p className="text-xs text-gray-500">{appointment.location}</p>
                    </div>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* E-Prescriptions */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Active Prescriptions</h2>
              <FileText className="w-5 h-5 text-purple-600" />
            </div>
            <div className="space-y-4">
              {prescriptions.map((prescription, index) => (
                <div key={index} className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-gray-900">{prescription.medication}</p>
                    <button className="p-1 text-purple-600 hover:text-purple-800">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">Prescribed by {prescription.prescribedBy}</p>
                  <p className="text-sm text-gray-700 mt-1">{prescription.instructions}</p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xs text-gray-500">Refills left: {prescription.refillsLeft}</p>
                    <p className="text-xs text-gray-500">Next refill: {prescription.nextRefill}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Medical History */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Medical History</h2>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {medicalHistory.map((record, index) => (
                <div key={index} className="p-4 rounded-lg bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-semibold text-gray-900">{record.type}</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          record.status === 'Normal' ? 'bg-green-100 text-green-800' : 
                          record.status === 'Active' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {record.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{record.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{record.doctor} • {record.date}</p>
                    </div>
                    {record.downloadable && (
                      <div className="flex space-x-2">
                        <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Bills */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Pending Bills</h2>
              <CreditCard className="w-5 h-5 text-orange-600" />
            </div>
            <div className="space-y-4">
              {pendingBills.map((bill) => (
                <div key={bill.id} className="p-4 rounded-lg bg-orange-50 border border-orange-200">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-gray-900">{bill.description}</p>
                      <p className="text-sm text-gray-600">Date: {bill.date}</p>
                      <p className="text-sm text-gray-600">Due: {bill.dueDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900">${bill.amount}</p>
                      <button className="mt-2 bg-blue-600 text-white px-4 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                        Pay Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Profile Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
            <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <Edit className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <p className="mt-1 text-gray-900">{user?.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-gray-900">{user?.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <p className="mt-1 text-gray-900">{user?.phone || 'Not provided'}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <p className="mt-1 text-gray-900">{user?.dateOfBirth || 'Not provided'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <p className="mt-1 text-gray-900">{user?.address || 'Not provided'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Emergency Contact</label>
                <p className="mt-1 text-gray-900">Not provided</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;