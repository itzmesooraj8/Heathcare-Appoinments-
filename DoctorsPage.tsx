import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Star, 
  Calendar, 
  Filter,
  Heart,
  Brain,
  Baby,
  Bone,
  Eye,
  Ear,
  Activity,
  Stethoscope
} from 'lucide-react';

const DoctorsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');

  const specialties = [
    { name: 'All', icon: <Stethoscope className="w-5 h-5" /> },
    { name: 'Cardiology', icon: <Heart className="w-5 h-5" /> },
    { name: 'Neurology', icon: <Brain className="w-5 h-5" /> },
    { name: 'Pediatrics', icon: <Baby className="w-5 h-5" /> },
    { name: 'Orthopedics', icon: <Bone className="w-5 h-5" /> },
    { name: 'Ophthalmology', icon: <Eye className="w-5 h-5" /> },
    { name: 'ENT', icon: <Ear className="w-5 h-5" /> },
    { name: 'Internal Medicine', icon: <Activity className="w-5 h-5" /> }
  ];

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      experience: "15+ years",
      rating: 4.9,
      reviews: 234,
      location: "Main Campus",
      image: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=300",
      education: "Harvard Medical School",
      languages: ["English"],
      about: "Specialized in interventional cardiology with expertise in complex cardiac procedures.",
      availability: "Mon-Fri: 9AM-5PM"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Neurology",
      experience: "12+ years",
      rating: 4.8,
      reviews: 189,
      location: "Neuroscience Center",
      image: "https://images.pexels.com/photos/6129967/pexels-photo-6129967.jpeg?auto=compress&cs=tinysrgb&w=300",
      education: "Johns Hopkins University",
      languages: ["English"],
      about: "Leading expert in neurological disorders and minimally invasive brain surgery.",
      availability: "Tue-Sat: 8AM-4PM"
    },
    {
      id: 3,
      name: "Dr. Emily Davis",
      specialty: "Pediatrics",
      experience: "10+ years",
      rating: 4.9,
      reviews: 312,
      location: "Children's Wing",
      image: "https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=300",
      education: "Stanford Medical School",
      languages: ["English"],
      about: "Dedicated to providing comprehensive care for children from infancy through adolescence.",
      availability: "Mon-Fri: 8AM-6PM"
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      specialty: "Orthopedics",
      experience: "18+ years",
      rating: 4.7,
      reviews: 156,
      location: "Sports Medicine Center",
      image: "https://images.pexels.com/photos/6129020/pexels-photo-6129020.jpeg?auto=compress&cs=tinysrgb&w=300",
      education: "Mayo Clinic",
      languages: ["English"],
      about: "Specializes in sports medicine and joint replacement surgery.",
      availability: "Mon-Thu: 7AM-3PM"
    },
    {
      id: 5,
      name: "Dr. Lisa Anderson",
      specialty: "Ophthalmology",
      experience: "14+ years",
      rating: 4.8,
      reviews: 203,
      location: "Eye Care Center",
      image: "https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=300",
      education: "UCLA Medical School",
      languages: ["English"],
      about: "Expert in retinal diseases and advanced cataract surgery techniques.",
      availability: "Wed-Sun: 9AM-5PM"
    },
    {
      id: 6,
      name: "Dr. Robert Taylor",
      specialty: "ENT",
      experience: "16+ years",
      rating: 4.6,
      reviews: 178,
      location: "ENT Clinic",
      image: "https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=300",
      education: "University of Pennsylvania",
      languages: ["English"],
      about: "Specializes in sinus surgery and hearing restoration procedures.",
      availability: "Mon-Fri: 10AM-6PM"
    },
    {
      id: 7,
      name: "Dr. Amanda Foster",
      specialty: "Internal Medicine",
      experience: "11+ years",
      rating: 4.9,
      reviews: 267,
      location: "Primary Care Center",
      image: "https://images.pexels.com/photos/5327647/pexels-photo-5327647.jpeg?auto=compress&cs=tinysrgb&w=300",
      education: "Columbia University",
      languages: ["English"],
      about: "Focuses on preventive care and management of chronic diseases.",
      availability: "Mon-Fri: 8AM-5PM"
    },
    {
      id: 8,
      name: "Dr. David Kim",
      specialty: "Cardiology",
      experience: "13+ years",
      rating: 4.7,
      reviews: 145,
      location: "Cardiac Center",
      image: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=300",
      education: "Duke University",
      languages: ["English",],
      about: "Specializes in preventive cardiology and heart failure management.",
      availability: "Tue-Sat: 9AM-4PM"
    }
  ];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'All' || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-teal-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              Find Your <span className="text-blue-600">Doctor</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Connect with our experienced medical professionals across various specialties. 
              Book appointments with board-certified doctors who are committed to your health and wellbeing.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search doctors by name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Specialty Filter */}
            <div className="flex flex-wrap gap-2">
              {specialties.map((specialty) => (
                <button
                  key={specialty.name}
                  onClick={() => setSelectedSpecialty(specialty.name)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedSpecialty === specialty.name
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {specialty.icon}
                  <span>{specialty.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-gray-600">
              Showing {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''} 
              {selectedSpecialty !== 'All' && ` in ${selectedSpecialty}`}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doctor) => (
              <div key={doctor.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden group">
                <div className="relative">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{doctor.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{doctor.name}</h3>
                    <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                    <p className="text-gray-600 text-sm">{doctor.experience} experience</p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{doctor.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Star className="w-4 h-4" />
                      <span>{doctor.rating} ({doctor.reviews} reviews)</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-700 text-sm line-clamp-2">{doctor.about}</p>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-1">Languages:</p>
                    <div className="flex flex-wrap gap-1">
                      {doctor.languages.map((language, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm text-gray-600 mb-1">Availability:</p>
                    <p className="text-sm text-gray-800">{doctor.availability}</p>
                  </div>

                  <div className="flex space-x-3">
                    <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Book Appointment</span>
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredDoctors.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No doctors found matching your criteria.</p>
              <p className="text-gray-400 mt-2">Try adjusting your search or filter options.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Can't Find the Right Doctor?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Our patient coordinators are here to help you find the perfect healthcare provider for your needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </a>
            <a
              href="tel:+1-800-HEALTH"
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Call: +91 123456789
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DoctorsPage;