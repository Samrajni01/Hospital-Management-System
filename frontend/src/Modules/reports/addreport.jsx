import React, { useState } from "react";
import { addReportApi } from "./report.api";

const AddReport = () => {
  const [form, setForm] = useState({
    patient: "",
    appointment: "",
    reportType: "",
    findings: "",
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.keys(form).forEach(k => fd.append(k, form[k]));
    fd.append("report", file);

    await addReportApi(fd);
    alert("Report Uploaded");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Medical Report</h2>

      <input name="patient" placeholder="Patient ID" onChange={handleChange} />
      <input name="appointment" placeholder="Appointment ID" onChange={handleChange} />
      <input name="reportType" placeholder="Report Type" onChange={handleChange} />
      <textarea name="findings" placeholder="Findings" onChange={handleChange} />

      <input type="file" onChange={e => setFile(e.target.files[0])} />

      <button>Upload</button>
    </form>
  );
};

export default AddReport;
