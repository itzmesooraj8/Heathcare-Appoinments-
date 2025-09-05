import React from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, Star, MapPin, Phone, Mail, Award, Clock } from 'lucide-react';

const DoctorProfilePage = () => {
  const { id } = useParams();

  // Mock doctor data - in real app, fetch based on ID
  const doctor = {
    id: id || '1',
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    experience: "15+ years",
    rating: 4.9,
    reviews: 234,
    location: "Main Campus",
    image: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=400",
    education: "Harvard Medical School",
    languages: ["English", "Spanish"],
    about: "Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience in interventional cardiology. She specializes in complex cardiac procedures and has performed over 2,000 successful surgeries.",
    availability: "Mon-Fri: 9AM-5PM",
    phone: "+1 (555) 123-4567",
    email: "s.johnson@healthcareplus.com",
    certifications: [
      "Board Certified in Cardiology",
      "Fellow of American College of Cardiology",
      "Advanced Cardiac Life Support (ACLS)"
    ],
    achievements: [
      "Top Doctor Award 2023",
      "Excellence in Patient Care 2022",
      "Research Publication in Cardiology Journal"
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-32 h-32 rounded-xl object-cover shadow-lg"
                />
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{doctor.name}</h1>
                  <p className="text-xl text-blue-600 font-semibold mb-2">{doctor.specialty}</p>
                  <p className="text-gray-600 mb-4">{doctor.experience} experience</p>
                  
                  <div className="flex items-center space-x-6 mb-4">
                    <div className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="font-semibold">{doctor.rating}</span>
                      <span className="text-gray-600">({doctor.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600">{doctor.location}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {doctor.languages.map((language, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Book Appointment</h3>
              <div className="space-y-4">
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Schedule Consultation</span>
                </button>
                <div className="text-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 inline mr-1" />
                  {doctor.availability}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About Dr. {doctor.name.split(' ')[1]}</h2>
                <p className="text-gray-700 leading-relaxed">{doctor.about}</p>
              </div>

              {/* Education & Certifications */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Education & Certifications</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Education</h3>
                    <p className="text-gray-700">{doctor.education}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Certifications</h3>
                    <ul className="space-y-2">
                      {doctor.certifications.map((cert, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <Award className="w-4 h-4 text-blue-600" />
                          <span className="text-gray-700">{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Achievements & Awards</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {doctor.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-3 p-4 bg-yellow-50 rounded-lg">
                      <Award className="w-6 h-6 text-yellow-600" />
                      <span className="text-gray-800 font-medium">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Information */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700">{doctor.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700">{doctor.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700">{doctor.location}</span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Experience</span>
                    <span className="font-semibold text-gray-900">{doctor.experience}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rating</span>
                    <span className="font-semibold text-gray-900">{doctor.rating}/5.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Reviews</span>
                    <span className="font-semibold text-gray-900">{doctor.reviews}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Patients</span>
                    <span className="font-semibold text-gray-900">500+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DoctorProfilePage;