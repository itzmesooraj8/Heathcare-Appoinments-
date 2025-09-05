import React, { useState } from 'react';
import { 
  Calendar, 
  Users, 
  Clock, 
  FileText, 
  Activity,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  DollarSign,
  Plus,
  Eye,
  Edit
} from 'lucide-react';

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      title: "Today's Appointments",
      value: '12',
      change: '+2 from yesterday',
      icon: Calendar,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Patients',
      value: '156',
      change: '+8 this week',
      icon: Users,
      color: 'bg-green-500'
    },
    {
      title: 'Prescriptions Written',
      value: '28',
      change: '+5 today',
      icon: FileText,
      color: 'bg-purple-500'
    },
    {
      title: 'Revenue This Month',
      value: '$12,450',
      change: '+15% from last month',
      icon: DollarSign,
      color: 'bg-orange-500'
    }
  ];

  const todayAppointments = [
    { 
      time: '09:00 AM', 
      patient: 'John Smith', 
      type: 'Consultation', 
      status: 'completed',
      duration: '30 min',
      notes: 'Follow-up for blood pressure medication'
    },
    { 
      time: '10:30 AM', 
      patient: 'Sarah Johnson', 
      type: 'Follow-up', 
      status: 'completed',
      duration: '20 min',
      notes: 'Diabetes management review'
    },
    { 
      time: '11:00 AM', 
      patient: 'Michael Chen', 
      type: 'Check-up', 
      status: 'in-progress',
      duration: '45 min',
      notes: 'Annual physical examination'
    },
    { 
      time: '02:00 PM', 
      patient: 'Emily Davis', 
      type: 'Consultation', 
      status: 'upcoming',
      duration: '30 min',
      notes: 'New patient consultation'
    },
    { 
      time: '03:30 PM', 
      patient: 'James Wilson', 
      type: 'Treatment', 
      status: 'upcoming',
      duration: '60 min',
      notes: 'Treatment planning session'
    },
  ];

  const availability = {
    monday: { start: '09:00', end: '17:00', available: true },
    tuesday: { start: '09:00', end: '17:00', available: true },
    wednesday: { start: '09:00', end: '17:00', available: true },
    thursday: { start: '09:00', end: '17:00', available: true },
    friday: { start: '09:00', end: '15:00', available: true },
    saturday: { start: '10:00', end: '14:00', available: false },
    sunday: { start: '', end: '', available: false }
  };

  const recentPatients = [
    { 
      name: 'Alice Brown', 
      lastVisit: '2024-01-15', 
      condition: 'Hypertension', 
      status: 'Stable',
      nextAppointment: '2024-02-15',
      id: 'P001'
    },
    { 
      name: 'Robert Taylor', 
      lastVisit: '2024-01-14', 
      condition: 'Diabetes', 
      status: 'Improving',
      nextAppointment: '2024-01-28',
      id: 'P002'
    },
    { 
      name: 'Lisa Anderson', 
      lastVisit: '2024-01-13', 
      condition: 'Asthma', 
      status: 'Stable',
      nextAppointment: '2024-03-13',
      id: 'P003'
    },
    { 
      name: 'David Lee', 
      lastVisit: '2024-01-12', 
      condition: 'Back Pain', 
      status: 'Recovering',
      nextAppointment: '2024-01-26',
      id: 'P004'
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'in-progress':
        return <Activity className="w-4 h-4 text-blue-600" />;
      case 'upcoming':
        return <Clock className="w-4 h-4 text-orange-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const toggleAvailability = (day: string) => {
    console.log(`Toggle availability for ${day}`);
  };

  const renderOverview = () => (
    <>
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
        {/* Today's Schedule */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Today's Schedule</h2>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-600">12 appointments</span>
            </div>
          </div>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {todayAppointments.map((appointment, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-4">
                  {getStatusIcon(appointment.status)}
                  <div>
                    <p className="font-medium text-gray-900">{appointment.patient}</p>
                    <p className="text-sm text-gray-600">{appointment.type} • {appointment.duration}</p>
                    <p className="text-xs text-gray-500">{appointment.notes}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{appointment.time}</p>
                  <p className={`text-sm capitalize ${
                    appointment.status === 'completed' ? 'text-green-600' :
                    appointment.status === 'in-progress' ? 'text-blue-600' :
                    'text-orange-600'
                  }`}>
                    {appointment.status.replace('-', ' ')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Patient Summary */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Patients</h2>
            <Users className="w-5 h-5 text-green-600" />
          </div>
          <div className="space-y-4">
            {recentPatients.map((patient, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {patient.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{patient.name}</p>
                    <p className="text-sm text-gray-600">{patient.condition}</p>
                    <p className="text-xs text-gray-500">ID: {patient.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">{patient.lastVisit}</p>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    patient.status === 'Stable' ? 'bg-green-100 text-green-800' :
                    patient.status === 'Improving' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {patient.status}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">Next: {patient.nextAppointment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button 
            onClick={() => setActiveTab('prescriptions')}
            className="p-6 text-left rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <FileText className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-semibold text-gray-900">Write Prescription</h3>
            <p className="text-sm text-gray-600 mt-1">Create new prescriptions for patients</p>
          </button>
          <button className="p-6 text-left rounded-lg border-2 border-dashed border-gray-300 hover:border-green-500 hover:bg-green-50 transition-colors">
            <Calendar className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="font-semibold text-gray-900">Schedule Appointment</h3>
            <p className="text-sm text-gray-600 mt-1">Book new appointments with patients</p>
          </button>
          <button 
            onClick={() => setActiveTab('availability')}
            className="p-6 text-left rounded-lg border-2 border-dashed border-gray-300 hover:border-purple-500 hover:bg-purple-50 transition-colors"
          >
            <Clock className="w-8 h-8 text-purple-600 mb-3" />
            <h3 className="font-semibold text-gray-900">Set Availability</h3>
            <p className="text-sm text-gray-600 mt-1">Manage your working hours</p>
          </button>
          <button className="p-6 text-left rounded-lg border-2 border-dashed border-gray-300 hover:border-orange-500 hover:bg-orange-50 transition-colors">
            <TrendingUp className="w-8 h-8 text-orange-600 mb-3" />
            <h3 className="font-semibold text-gray-900">View Analytics</h3>
            <p className="text-sm text-gray-600 mt-1">Review patient outcomes and trends</p>
          </button>
        </div>
      </div>
    </>
  );

  const renderAvailability = () => (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Doctor Availability Settings</h2>
      <div className="space-y-4">
        {Object.entries(availability).map(([day, schedule]) => (
          <div key={day} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-24">
                <p className="font-medium text-gray-900 capitalize">{day}</p>
              </div>
              <div className="flex items-center space-x-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={schedule.available}
                    onChange={() => toggleAvailability(day)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
                <span className="text-sm text-gray-600">
                  {schedule.available ? 'Available' : 'Unavailable'}
                </span>
              </div>
            </div>
            {schedule.available && (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="time"
                    value={schedule.start}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <span className="text-gray-500">to</span>
                  <input
                    type="time"
                    value={schedule.end}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button className="text-blue-600 hover:text-blue-800">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-end">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Doctor Dashboard</h1>
              <p className="text-gray-600 mt-2">Good morning, Dr. Johnson! You have 12 appointments today.</p>
            </div>
            <div className="flex space-x-1 bg-gray-200 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'overview'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('prescriptions')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'prescriptions'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Prescriptions
              </button>
              <button
                onClick={() => setActiveTab('availability')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'availability'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Availability
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'prescriptions' && (
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Prescription Management</h2>
            <p className="text-gray-600">Prescription management system coming soon...</p>
          </div>
        )}
        {activeTab === 'availability' && renderAvailability()}
      </div>
    </div>
  );
};

export default DoctorDashboard;