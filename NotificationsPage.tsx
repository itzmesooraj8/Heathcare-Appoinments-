import { useEffect, useState } from "react";
import axios from "axios";
import { translateError } from "../utils/errorHandler";

function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [form, setForm] = useState({
    user_id: "",
    message: "",
    type: "email", // Default to email
  });

  useEffect(() => {
    if (form.user_id) {
      axios.get(`/api/v1/notifications/${form.user_id}`).then((res) => setNotifications(res.data));
    }
  }, [form.user_id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/v1/notifications", form);
      const res = await axios.get(`/api/v1/notifications/${form.user_id}`);
      setNotifications(res.data);
    } catch (error) {
      alert(translateError(error.message));
    }
  };

  return (
    <div>
      <h2>Notifications</h2>
      <form onSubmit={handleSubmit}>
        <input name="user_id" placeholder="User ID" onChange={handleChange} required />
        <textarea name="message" placeholder="Message" onChange={handleChange} required />
        <select name="type" onChange={handleChange} required>
          <option value="email">Email</option>
          <option value="sms">SMS</option>
          <option value="push">Push Notification</option>
        </select>
        <button type="submit">Send Notification</button>
      </form>
      <ul>
        {notifications.map((notif, idx) => (
          <li key={idx}>
            {notif.type.toUpperCase()}: {notif.message} (Status: {notif.status})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotificationsPage;
