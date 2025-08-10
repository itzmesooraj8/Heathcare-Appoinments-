import React, { useEffect, useState } from "react";
import axios from "axios";

function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState({ sender_id: "", receiver_id: "", content: "" });

  useEffect(() => {
    if (form.sender_id) {
      axios.get(`/api/v1/messages/?user_id=${form.sender_id}`).then(res => setMessages(res.data));
    }
  }, [form.sender_id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post("/api/v1/messages/", form);
    const res = await axios.get(`/api/v1/messages/?user_id=${form.sender_id}`);
    setMessages(res.data);
  };

  return (
    <div>
      <h2>Messages</h2>
      <form onSubmit={handleSubmit}>
        <input name="sender_id" placeholder="Your ID" onChange={handleChange} required />
        <input name="receiver_id" placeholder="To ID" onChange={handleChange} required />
        <input name="content" placeholder="Message" onChange={handleChange} required />
        <button type="submit">Send</button>
      </form>
      <ul>
        {messages.map((msg: any, idx) => (
          <li key={idx}>
            {msg.sender_id} to {msg.receiver_id}: {msg.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MessagesPage;
