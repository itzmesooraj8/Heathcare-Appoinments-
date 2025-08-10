import React, { useState } from "react";
import { signup } from "../api/auth";
import "./DoctorSignupPage.css"; // Add custom styles here

function DoctorSignupPage() {
  const [form, setForm] = useState({
    fullName: "",
    specialization: "",
    email: "",
    password: "",
    role: "doctor",
    licenseFile: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, licenseFile: e.target.files ? e.target.files[0] : null });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        formData.append(key, form[key as keyof typeof form] as string);
      });
      await signup(form.email, form.password, form.role);
      alert("Account created successfully!");
    } catch (error) {
      alert("Error: " + error);
    }
  };

  return (
    <div className="signup-page">
      <h1>Welcome Back</h1>
      <p>Sign in to access your healthcare dashboard</p>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="role-selection">
          <label>Select your role</label>
          <div className="roles">
            <button type="button" className="role doctor active">
              Doctor
            </button>
          </div>
        </div>
        <input
          type="text"
          name="fullName"
          placeholder="Enter your full name"
          onChange={handleChange}
          required
        />
        <select
          name="specialization"
          onChange={handleChange}
          required
        >
          <option value="">Select your specialization</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Neurology">Neurology</option>
          <option value="Orthopedics">Orthopedics</option>
        </select>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          onChange={handleChange}
          required
        />
        <div className="file-upload">
          <label>Upload your license and details</label>
          <input
            type="file"
            name="licenseFile"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Create Account
        </button>
      </form>
      <p>Already have an account? <a href="/login">Sign in</a></p>
    </div>
  );
}

export default DoctorSignupPage;
