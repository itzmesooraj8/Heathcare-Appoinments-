import React from 'react';
import { 
  Heart, 
  Brain, 
  Baby, 
  Bone, 
  Eye, 
  Ear, 
  Zap, 
  Activity,
  Clock,
  Shield,
  Users,
  Award,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const ServicesPage = () => {
  const services = [
    {
      icon: <Zap className="w-12 h-12 text-red-600" />,
      title: "Emergency Care",
      description: "24/7 emergency medical services with rapid response times and state-of-the-art trauma care.",
      features: ["24/7 Availability", "Rapid Response", "Advanced Life Support", "Trauma Center"],
      image: "https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=500"
    },
    {
      icon: <Heart className="w-12 h-12 text-red-600" />,
      title: "Cardiology",
      description: "Comprehensive heart care with advanced diagnostic tools and minimally invasive procedures.",
      features: ["Heart Surgery", "Cardiac Catheterization", "Echocardiography", "Preventive Care"],
      image: "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=500"
    },
    {
      icon: <Brain className="w-12 h-12 text-purple-600" />,
      title: "Neurology",
      description: "Expert treatment for neurological conditions and disorders affecting the brain and nervous system.",
      features: ["Brain Surgery", "Stroke Care", "Epilepsy Treatment", "Neuroimaging"],
      image: "https://images.pexels.com/photos/4386465/pexels-photo-4386465.jpeg?auto=compress&cs=tinysrgb&w=500"
    },
    {
      icon: <Baby className="w-12 h-12 text-pink-600" />,
      title: "Pediatrics",
      description: "Specialized care for infants, children, and adolescents with child-friendly facilities.",
      features: ["Well-Child Visits", "Immunizations", "Developmental Care", "Pediatric Surgery"],
      image: "https://images.pexels.com/photos/4386476/pexels-photo-4386476.jpeg?auto=compress&cs=tinysrgb&w=500"
    },
    {
      icon: <Bone className="w-12 h-12 text-blue-600" />,
      title: "Orthopedics",
      description: "Advanced treatment for bone, joint, and muscle conditions with rehabilitation services.",
      features: ["Joint Replacement", "Sports Medicine", "Spine Surgery", "Physical Therapy"],
      image: "https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=500"
    },
    {
      icon: <Eye className="w-12 h-12 text-green-600" />,
      title: "Ophthalmology",
      description: "Complete eye care services from routine exams to complex surgical procedures.",
      features: ["Cataract Surgery", "Retinal Care", "LASIK", "Glaucoma Treatment"],
      image: "https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=500"
    },
    {
      icon: <Ear className="w-12 h-12 text-orange-600" />,
      title: "ENT (Otolaryngology)",
      description: "Treatment for ear, nose, and throat conditions with advanced surgical techniques.",
      features: ["Hearing Tests", "Sinus Surgery", "Throat Surgery", "Allergy Treatment"],
      image: "https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=500"
    },
    {
      icon: <Activity className="w-12 h-12 text-teal-600" />,
      title: "Internal Medicine",
      description: "Comprehensive primary care for adults with focus on prevention and wellness.",
      features: ["Annual Physicals", "Chronic Disease Management", "Preventive Care", "Health Screenings"],
      image: "https://images.pexels.com/photos/4386464/pexels-photo-4386464.jpeg?auto=compress&cs=tinysrgb&w=500"
    }
  ];

  const features = [
    {
      icon: <Clock className="w-8 h-8 text-blue-600" />,
      title: "24/7 Emergency Care",
      description: "Round-the-clock emergency services with immediate response"
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Advanced Technology",
      description: "State-of-the-art medical equipment and diagnostic tools"
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Expert Team",
      description: "Board-certified physicians and experienced medical staff"
    },
    {
      icon: <Award className="w-8 h-8 text-blue-600" />,
      title: "Quality Care",
      description: "Accredited facilities with highest safety standards"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-teal-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              Our Medical <span className="text-blue-600">Services</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive healthcare services delivered by expert medical professionals 
              using the latest technology and evidence-based practices.
            </p>
            <div className="flex justify-center">
              <a
                href="/book-appointment"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
              >
                <span>Book Appointment</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Specialized Medical Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our comprehensive range of medical specialties ensures you receive expert care for all your health needs
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden group">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <div className="relative h-48 md:h-full overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
                    </div>
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      {service.icon}
                      <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                    <div className="space-y-2 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <a
                      href="/book-appointment"
                      className="text-blue-600 font-semibold hover:text-blue-700 inline-flex items-center space-x-1 group"
                    >
                      <span>Book Consultation</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How We Deliver Care</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our streamlined process ensures you receive the best possible care from consultation to recovery
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Book Appointment</h3>
              <p className="text-gray-600">Schedule your consultation online or by phone at your convenience</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Consultation</h3>
              <p className="text-gray-600">Meet with our expert physicians for comprehensive evaluation</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Treatment Plan</h3>
              <p className="text-gray-600">Receive personalized treatment plan tailored to your needs</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">4</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Follow-up Care</h3>
              <p className="text-gray-600">Ongoing support and monitoring for optimal health outcomes</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Experience Quality Healthcare?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Take the first step towards better health with our comprehensive medical services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/book-appointment"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Book Appointment
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;