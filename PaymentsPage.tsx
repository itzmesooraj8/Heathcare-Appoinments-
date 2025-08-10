import React, { useEffect, useState } from "react";
import axios from "axios";

function PaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [form, setForm] = useState({ user_id: "", amount: "" });

  useEffect(() => {
    if (form.user_id) {
      axios.get(`/api/v1/payments/?user_id=${form.user_id}`).then(res => setPayments(res.data));
    }
  }, [form.user_id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post("/api/v1/payments/", form);
    const res = await axios.get(`/api/v1/payments/?user_id=${form.user_id}`);
    setPayments(res.data);
  };

  return (
    <div>
      <h2>Payments</h2>
      <form onSubmit={handleSubmit}>
        <input name="user_id" placeholder="User ID" onChange={handleChange} required />
        <input name="amount" type="number" placeholder="Amount" onChange={handleChange} required />
        <button type="submit">Pay</button>
      </form>
      <ul>
        {payments.map((p: any, idx) => (
          <li key={idx}>
            User: {p.user_id} | Amount: {p.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PaymentsPage;
