import React, { useState } from 'react';
import { Calendar, Clock, User, MapPin, CheckCircle, ArrowRight, Heart } from 'lucide-react';

const AppointmentBookingPage = () => {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    specialty: '',
    doctor: '',
    date: '',
    time: '',
    type: 'in-person',
    reason: '',
    patientInfo: {
      name: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      insurance: ''
    }
  });

  const specialties = [
    'Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 
    'Ophthalmology', 'ENT', 'Internal Medicine', 'Emergency Care'
  ];

  const doctors = {
    'Cardiology': ['Dr. Sarah Johnson', 'Dr. David Kim'],
    'Neurology': ['Dr. Michael Chen'],
    'Pediatrics': ['Dr. Emily Davis'],
    'Orthopedics': ['Dr. James Wilson'],
    'Ophthalmology': ['Dr. Lisa Anderson'],
    'ENT': ['Dr. Robert Taylor'],
    'Internal Medicine': ['Dr. Amanda Foster'],
    'Emergency Care': ['Dr. Emergency Staff']
  };

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
  ];

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    // Handle appointment booking
    setStep(5); // Success step
  };

  const updateBookingData = (field: string, value: string) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  const updatePatientInfo = (field: string, value: string) => {
    setBookingData(prev => ({
      ...prev,
      patientInfo: { ...prev.patientInfo, [field]: value }
    }));
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Select Medical Specialty</h2>
              <p className="text-gray-600">Choose the type of care you need</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {specialties.map((specialty) => (
                <button
                  key={specialty}
                  onClick={() => updateBookingData('specialty', specialty)}
                  className={`p-6 rounded-xl border-2 transition-all text-left hover:shadow-md ${
                    bookingData.specialty === specialty
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <h3 className="font-semibold text-lg mb-2">{specialty}</h3>
                  <p className="text-sm text-gray-600">Expert care and treatment</p>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Doctor</h2>
              <p className="text-gray-600">Select from available {bookingData.specialty} specialists</p>
            </div>
            <div className="space-y-4">
              {doctors[bookingData.specialty as keyof typeof doctors]?.map((doctor) => (
                <button
                  key={doctor}
                  onClick={() => updateBookingData('doctor', doctor)}
                  className={`w-full p-6 rounded-xl border-2 transition-all text-left hover:shadow-md ${
                    bookingData.doctor === doctor
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{doctor}</h3>
                      <p className="text-gray-600">{bookingData.specialty} Specialist</p>
                      <p className="text-sm text-gray-500">Available for appointments</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Select Date & Time</h2>
              <p className="text-gray-600">Choose your preferred appointment slot</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={bookingData.date}
                  onChange={(e) => updateBookingData('date', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Appointment Type
                </label>
                <select
                  value={bookingData.type}
                  onChange={(e) => updateBookingData('type', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="in-person">In-Person Visit</option>
                  <option value="telemedicine">Telemedicine</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Available Time Slots
              </label>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => updateBookingData('time', time)}
                    className={`p-3 rounded-lg border transition-all ${
                      bookingData.time === time
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Reason for Visit
              </label>
              <textarea
                value={bookingData.reason}
                onChange={(e) => updateBookingData('reason', e.target.value)}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Please describe your symptoms or reason for the appointment..."
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Patient Information</h2>
              <p className="text-gray-600">Please provide your contact details</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={bookingData.patientInfo.name}
                  onChange={(e) => updatePatientInfo('name', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your full name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={bookingData.patientInfo.email}
                  onChange={(e) => updatePatientInfo('email', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={bookingData.patientInfo.phone}
                  onChange={(e) => updatePatientInfo('phone', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="(555) 123-4567"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  value={bookingData.patientInfo.dateOfBirth}
                  onChange={(e) => updatePatientInfo('dateOfBirth', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Insurance Provider
                </label>
                <input
                  type="text"
                  value={bookingData.patientInfo.insurance}
                  onChange={(e) => updatePatientInfo('insurance', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your insurance provider"
                />
              </div>
            </div>

            {/* Appointment Summary */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointment Summary</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Specialty:</span> {bookingData.specialty}</p>
                <p><span className="font-medium">Doctor:</span> {bookingData.doctor}</p>
                <p><span className="font-medium">Date:</span> {bookingData.date}</p>
                <p><span className="font-medium">Time:</span> {bookingData.time}</p>
                <p><span className="font-medium">Type:</span> {bookingData.type}</p>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Appointment Confirmed!</h2>
            <p className="text-gray-600 max-w-md mx-auto">
              Your appointment has been successfully booked. You will receive a confirmation email shortly.
            </p>
            
            <div className="bg-blue-50 p-6 rounded-xl max-w-md mx-auto">
              <h3 className="font-semibold text-blue-900 mb-3">Appointment Details</h3>
              <div className="space-y-2 text-sm text-blue-800">
                <p><span className="font-medium">Doctor:</span> {bookingData.doctor}</p>
                <p><span className="font-medium">Date:</span> {bookingData.date}</p>
                <p><span className="font-medium">Time:</span> {bookingData.time}</p>
                <p><span className="font-medium">Type:</span> {bookingData.type}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/dashboard"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Go to Dashboard
              </a>
              <a
                href="/"
                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Back to Home
              </a>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (step === 5) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {renderStepContent()}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-teal-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Book Your <span className="text-blue-600">Appointment</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Schedule your visit with our expert medical professionals in just a few simple steps
            </p>
          </div>
        </div>
      </section>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= stepNumber 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 4 && (
                  <div className={`w-16 h-1 mx-4 ${
                    step > stepNumber ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-sm">
            <span className={step >= 1 ? 'text-blue-600 font-medium' : 'text-gray-500'}>
              Select Specialty
            </span>
            <span className={step >= 2 ? 'text-blue-600 font-medium' : 'text-gray-500'}>
              Choose Doctor
            </span>
            <span className={step >= 3 ? 'text-blue-600 font-medium' : 'text-gray-500'}>
              Date & Time
            </span>
            <span className={step >= 4 ? 'text-blue-600 font-medium' : 'text-gray-500'}>
              Patient Info
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm p-8">
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handlePrevious}
                disabled={step === 1}
                className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              {step < 4 ? (
                <button
                  onClick={handleNext}
                  disabled={
                    (step === 1 && !bookingData.specialty) ||
                    (step === 2 && !bookingData.doctor) ||
                    (step === 3 && (!bookingData.date || !bookingData.time))
                  }
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={
                    !bookingData.patientInfo.name ||
                    !bookingData.patientInfo.email ||
                    !bookingData.patientInfo.phone ||
                    !bookingData.patientInfo.dateOfBirth
                  }
                  className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Confirm Appointment</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBookingPage;