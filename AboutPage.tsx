import React from 'react';
import { Heart, Users, Award, Shield, Target, Eye } from 'lucide-react';

const AboutPage = () => {
  const values = [
    {
      icon: <Heart className="w-8 h-8 text-blue-600" />,
      title: "Compassionate Care",
      description: "We treat every patient with empathy, respect, and genuine concern for their wellbeing."
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Safety First",
      description: "Patient safety is our top priority in everything we do, from treatment to data protection."
    },
    {
      icon: <Award className="w-8 h-8 text-blue-600" />,
      title: "Excellence",
      description: "We strive for excellence in medical care, technology, and patient experience."
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Collaboration",
      description: "We work together as a team to provide comprehensive, coordinated care."
    }
  ];

  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Medical Officer",
      specialization: "Cardiology",
      image: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=300",
      description: "25+ years of experience in cardiovascular medicine"
    },
    {
      name: "Dr. Michael Chen",
      role: "Head of Neurology",
      specialization: "Neurology",
      image: "https://images.pexels.com/photos/6129967/pexels-photo-6129967.jpeg?auto=compress&cs=tinysrgb&w=300",
      description: "Leading expert in neurological disorders and brain surgery"
    },
    {
      name: "Dr. Emily Davis",
      role: "Pediatrics Director",
      specialization: "Pediatrics",
      image: "https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=300",
      description: "Specialized in child healthcare and development"
    },
    {
      name: "Dr. James Wilson",
      role: "Emergency Medicine Chief",
      specialization: "Emergency Medicine",
      image: "https://images.pexels.com/photos/6129020/pexels-photo-6129020.jpeg?auto=compress&cs=tinysrgb&w=300",
      description: "Expert in critical care and emergency medical procedures"
    }
  ];

  const milestones = [
    { year: "1995", event: "HealthCare+ founded with a vision to revolutionize healthcare" },
    { year: "2005", event: "Expanded to 5 locations with 100+ medical professionals" },
    { year: "2015", event: "Launched digital health platform and telemedicine services" },
    { year: "2020", event: "Served over 50,000 patients during the global pandemic" },
    { year: "2024", event: "Leading healthcare provider with 200+ doctors and 15 specialties" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-teal-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                About <span className="text-blue-600">HealthCare+</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                For over 25 years, HealthCare+ has been at the forefront of medical innovation, 
                providing exceptional healthcare services with a commitment to excellence, 
                compassion, and cutting-edge technology.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <p className="text-3xl font-bold text-blue-600">25+</p>
                  <p className="text-gray-600">Years of Excellence</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <p className="text-3xl font-bold text-blue-600">50,000+</p>
                  <p className="text-gray-600">Lives Touched</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Healthcare Team"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Target className="w-8 h-8 text-blue-600" />
                <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                To provide accessible, high-quality healthcare services that improve the lives of our patients 
                and communities. We are committed to delivering personalized care through innovative technology, 
                expert medical professionals, and a patient-centered approach.
              </p>
            </div>
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Eye className="w-8 h-8 text-blue-600" />
                <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                To be the leading healthcare provider that sets the standard for medical excellence, 
                innovation, and patient satisfaction. We envision a future where quality healthcare 
                is accessible to all, powered by technology and delivered with compassion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These values guide everything we do and shape our commitment to exceptional healthcare
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Leadership Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Meet the experienced medical professionals leading our organization
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-4 overflow-hidden rounded-xl">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-blue-600 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-1">{member.role}</p>
                <p className="text-gray-600 text-sm mb-2">{member.specialization}</p>
                <p className="text-gray-500 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Key milestones in our commitment to advancing healthcare
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                      <h3 className="text-2xl font-bold text-blue-600 mb-2">{milestone.year}</h3>
                      <p className="text-gray-700">{milestone.event}</p>
                    </div>
                  </div>
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Join Our Healthcare Family</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Experience the difference that compassionate, expert care can make in your health journey
          </p>
          <a
            href="/book-appointment"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
          >
            <span>Start Your Journey</span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;