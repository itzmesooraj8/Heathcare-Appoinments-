export interface User {
  id: number;
  email: string;
  full_name: string;
  phone?: string;
  role: 'admin' | 'doctor' | 'patient';
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
  updated_at?: string;
}

export interface Doctor {
  id: number;
  user_id: number;
  specialization: string;
  license_number: string;
  experience_years?: number;
  education?: string;
  bio?: string;
  consultation_fee?: number;
  rating: number;
  total_reviews: number;
  is_available: boolean;
  user: User;
}

export interface Patient {
  id: number;
  user_id: number;
  date_of_birth?: string;
  gender?: string;
  blood_group?: string;
  address?: string;
  emergency_contact?: string;
  medical_history?: string;
  allergies?: string;
  user: User;
}

export interface Appointment {
  id: number;
  patient_id: number;
  doctor_id: number;
  appointment_date: string;
  duration_minutes: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  reason?: string;
  notes?: string;
  consultation_fee?: number;
  is_paid: boolean;
  created_at: string;
  updated_at?: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}