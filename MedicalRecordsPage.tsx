import React, { useEffect, useState } from "react";
import axios from "axios";

function MedicalRecordsPage() {
  const [records, setRecords] = useState([]);
  const [file, setFile] = useState<File | null>(null);
  const [patientId, setPatientId] = useState("");

  useEffect(() => {
    axios.get("/api/v1/medical-records/").then(res => setRecords(res.data));
  }, []);

  const handleFileChange = e => setFile(e.target.files[0]);
  const handlePatientChange = e => setPatientId(e.target.value);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!file) return;
    const data = new FormData();
    data.append("file", file);
    data.append("patient_id", patientId);
    await axios.post("/api/v1/medical-records/upload", data);
    const res = await axios.get("/api/v1/medical-records/");
    setRecords(res.data);
  };

  return (
    <div>
      <h2>Medical Records</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Patient ID" value={patientId} onChange={handlePatientChange} required />
        <input type="file" onChange={handleFileChange} required />
        <button type="submit">Upload</button>
      </form>
      <ul>
        {records.map((rec: any) => (
          <li key={rec.id}>
            {rec.title} - <a href={rec.file_url} target="_blank" rel="noopener noreferrer">Download</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MedicalRecordsPage;
