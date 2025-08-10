import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

interface Appointment {
  id: number;
  patient_id: string;
  doctor_id: string;
  appointment_date: string;
  start_time: string;
  end_time: string;
  notes: string;
  status: string;
}

function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [form, setForm] = useState({
    patient_id: "",
    doctor_id: "",
    appointment_date: "",
    start_time: "",
    end_time: "",
    notes: ""
  });

  useEffect(() => {
    if (form.patient_id) {
      axios.get(`/api/v1/appointments?patient_id=${form.patient_id}`).then(res => setAppointments(res.data));
    }
  }, [form.patient_id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios.post("/api/v1/appointments", form);
    const res = await axios.get(`/api/v1/appointments?patient_id=${form.patient_id}`);
    setAppointments(res.data);
  };

  return (
    <div>
      <h2>Appointments</h2>
      <form onSubmit={handleSubmit}>
        <input name="patient_id" placeholder="Patient ID" onChange={handleChange} required />
        <input name="doctor_id" placeholder="Doctor ID" onChange={handleChange} required />
        <input name="appointment_date" type="date" placeholder="Date" onChange={handleChange} required />
        <input name="start_time" type="time" placeholder="Start Time" onChange={handleChange} required />
        <input name="end_time" type="time" placeholder="End Time" onChange={handleChange} required />
        <textarea name="notes" placeholder="Notes" onChange={handleChange} />
        <button type="submit">Book Appointment</button>
      </form>
      <ul>
        {appointments.map((appt: Appointment, idx) => (
          <li key={idx}>
            Doctor: {appt.doctor_id} | Date: {appt.appointment_date} | Time: {appt.start_time} - {appt.end_time}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AppointmentsPage;
