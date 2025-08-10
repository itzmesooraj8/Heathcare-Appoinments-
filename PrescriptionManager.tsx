import React, { useState } from 'react';
import { FileText, Download, Plus, Search, Calendar, User, Pill } from 'lucide-react';

interface Prescription {
  id: string;
  patientName: string;
  patientId: string;
  date: string;
  medications: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions: string;
  }[];
  diagnosis: string;
  doctorNotes: string;
  doctorName: string;
  status: 'active' | 'completed' | 'expired';
}

const PrescriptionManager: React.FC = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([
    {
      id: '1',
      patientName: 'John Doe',
      patientId: 'P001',
      date: '2024-01-15',
      medications: [
        {
          name: 'Lisinopril',
          dosage: '10mg',
          frequency: 'Once daily',
          duration: '30 days',
          instructions: 'Take with food in the morning'
        },
        {
          name: 'Metformin',
          dosage: '500mg',
          frequency: 'Twice daily',
          duration: '30 days',
          instructions: 'Take with meals'
        }
      ],
      diagnosis: 'Hypertension and Type 2 Diabetes',
      doctorNotes: 'Patient responding well to treatment. Continue current medications and follow up in 4 weeks.',
      doctorName: 'Dr. Sarah Johnson',
      status: 'active'
    },
    {
      id: '2',
      patientName: 'Jane Smith',
      patientId: 'P002',
      date: '2024-01-14',
      medications: [
        {
          name: 'Amoxicillin',
          dosage: '500mg',
          frequency: 'Three times daily',
          duration: '7 days',
          instructions: 'Take with water, complete full course'
        }
      ],
      diagnosis: 'Bacterial Infection',
      doctorNotes: 'Bacterial infection, complete antibiotic course as prescribed.',
      doctorName: 'Dr. Sarah Johnson',
      status: 'completed'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const filteredPrescriptions = prescriptions.filter(prescription =>
    prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prescription.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownload = (prescription: Prescription) => {
    // Create a simple prescription document
    const prescriptionData = `
PRESCRIPTION

Patient: ${prescription.patientName}
Patient ID: ${prescription.patientId}
Date: ${prescription.date}
Doctor: ${prescription.doctorName}

Diagnosis: ${prescription.diagnosis}

Medications:
${prescription.medications.map(med => `
• ${med.name} ${med.dosage}
  ${med.frequency} for ${med.duration}
  Instructions: ${med.instructions}
`).join('')}

Doctor's Notes:
${prescription.doctorNotes}

Status: ${prescription.status.toUpperCase()}
    `;

    const blob = new Blob([prescriptionData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prescription_${prescription.patientName.replace(' ', '_')}_${prescription.date}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Prescription Management</h2>
          <p className="text-gray-600 mt-1">Manage and track patient prescriptions</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>New Prescription</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search prescriptions by patient name or diagnosis..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Prescriptions List */}
      <div className="grid gap-6">
        {filteredPrescriptions.map((prescription) => (
          <div key={prescription.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{prescription.patientName}</h3>
                  <p className="text-sm text-gray-600">ID: {prescription.patientId}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(prescription.status)}`}>
                  {prescription.status}
                </span>
                <button
                  onClick={() => handleDownload(prescription)}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Download Prescription"
                >
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Date & Diagnosis
                  </h4>
                  <p className="text-sm text-gray-600 mb-1">Date: {prescription.date}</p>
                  <p className="text-sm text-gray-900">{prescription.diagnosis}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Doctor
                  </h4>
                  <p className="text-sm text-gray-900">{prescription.doctorName}</p>
                </div>
              </div>

              {/* Right Column */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Pill className="w-4 h-4 mr-2" />
                  Medications
                </h4>
                <div className="space-y-3">
                  {prescription.medications.map((med, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-gray-900">{med.name}</span>
                        <span className="text-sm text-gray-600">{med.dosage}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{med.frequency} for {med.duration}</p>
                      <p className="text-xs text-gray-500">{med.instructions}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Doctor Notes */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2">Doctor's Notes</h4>
              <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">{prescription.doctorNotes}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrescriptionManager;