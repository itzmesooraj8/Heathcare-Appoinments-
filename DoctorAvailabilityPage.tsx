import React, { useEffect, useState } from "react";
import axios from "axios";

function DoctorAvailabilityPage() {
  const [availability, setAvailability] = useState([]);
  const [form, setForm] = useState({
    doctor_id: "",
    day_of_week: "",
    start_time: "",
    end_time: "",
    max_patients_per_day: "",
  });

  useEffect(() => {
    if (form.doctor_id) {
      axios.get(`/api/v1/availability/${form.doctor_id}`).then((res) => setAvailability(res.data));
    }
  }, [form.doctor_id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/v1/availability", form);
    const res = await axios.get(`/api/v1/availability/${form.doctor_id}`);
    setAvailability(res.data);
  };

  return (
    <div>
      <h2>Doctor Availability</h2>
      <form onSubmit={handleSubmit}>
        <input name="doctor_id" placeholder="Doctor ID" onChange={handleChange} required />
        <input name="day_of_week" placeholder="Day of Week" onChange={handleChange} required />
        <input name="start_time" type="time" placeholder="Start Time" onChange={handleChange} required />
        <input name="end_time" type="time" placeholder="End Time" onChange={handleChange} required />
        <input
          name="max_patients_per_day"
          type="number"
          placeholder="Max Patients Per Day"
          onChange={handleChange}
          required
        />
        <button type="submit">Add Availability</button>
      </form>
      <ul>
        {availability.map((slot, idx) => (
          <li key={idx}>
            {slot.day_of_week}: {slot.start_time} - {slot.end_time} (Max: {slot.max_patients_per_day})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DoctorAvailabilityPage;
