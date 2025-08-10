import React, { useEffect, useState } from "react";
import axios from "axios";

function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [userId, setUserId] = useState("");
  const [form, setForm] = useState<any>({});

  useEffect(() => {
    if (userId) {
      axios.get(`/api/v1/profile/${userId}`).then(res => {
        setProfile(res.data);
        setForm(res.data);
      });
    }
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios.put(`/api/v1/profile/${userId}`, form);
    const res = await axios.get(`/api/v1/profile/${userId}`);
    setProfile(res.data);
  };

  return (
    <div>
      <h2>Profile</h2>
      <input
        placeholder="User ID"
        value={userId}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserId(e.target.value)}
      />
      {profile && (
        <form onSubmit={handleSubmit}>
          <input name="full_name" value={form.full_name || ""} onChange={handleChange} placeholder="Full Name" />
          <input name="phone" value={form.phone || ""} onChange={handleChange} placeholder="Phone" />
          <button type="submit">Update</button>
        </form>
      )}
    </div>
  );
}

export default ProfilePage;
