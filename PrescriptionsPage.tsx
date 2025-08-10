import React, { useEffect, useState } from "react";
import axios from "axios";

function PrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    axios.get("/api/v1/prescriptions/").then(res => setPrescriptions(res.data));
  }, []);

  return (
    <div>
      <h2>Prescriptions</h2>
      <ul>
        {prescriptions.map((p: any) => (
          <li key={p.id}>
            {p.medications} - <a href={`/api/v1/prescriptions/${p.id}/download`} target="_blank" rel="noopener noreferrer">Download PDF</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PrescriptionsPage;
