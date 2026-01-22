import { useEffect, useState } from "react";
import { getReportByIdApi } from "./report.api";

const MyReportsbyid = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res =  getReportByIdApi; // fetch reports for logged-in patient
        setReports(res.data.data);
      } catch (err) {
        console.error(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  if (loading) return <p>Loading reports...</p>;
  if (reports.length === 0) return <p>No reports found</p>;

  return (
    <div>
      <h2>My Reports</h2>
      {reports.map((report) => (
        <div key={report._id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
          <p><b>Report ID:</b> {report._id}</p>
          <p><b>Doctor:</b> {report.doctor?.fullName || "N/A"}</p>
          <p><b>Description:</b> {report.findings || report.description}</p>
          <p><b>Date:</b> {new Date(report.createdAt).toDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default MyReportsbyid;
