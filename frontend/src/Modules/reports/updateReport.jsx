import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReportByIdApi, updateReportApi } from "./report.api";

const UpdateReport = () => {
  const { id } = useParams();
  const [form, setForm] = useState({ reportType:"", findings:"", status:"" });

  useEffect(() => { load(); }, []);

  const load = async () => {
    const r = (await getReportByIdApi(id)).data.data;
    setForm({ reportType:r.reportType, findings:r.findings, status:r.status });
  };

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await updateReportApi(id, form);
    alert("Updated");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="reportType" value={form.reportType} onChange={handleChange}/>
      <textarea name="findings" value={form.findings} onChange={handleChange}/>
      <select name="status" value={form.status} onChange={handleChange}>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
        <option value="delivered">Delivered</option>
      </select>
      <button>Update</button>
    </form>
  );
};

export default UpdateReport;
