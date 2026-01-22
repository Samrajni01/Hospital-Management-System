import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReportByIdApi } from "./report.api";

const GetReportById = () => {
  const { id } = useParams(); // report ID
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await getReportByIdApi(id);
        setReport(res.data.data); // adjust based on your API response
      } catch (err) {
        console.error(err.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  if (loading) return <p>Loading report...</p>;
  if (!report) return <p>Report not found</p>;

  return (
    <div>
      <h2>Report Details</h2>
      <p><b>Report ID:</b> {report._id}</p>
      <p><b>Patient:</b> {report.patient?.fullName || "N/A"}</p>
      <p><b>Doctor:</b> {report.doctor?.fullName || "N/A"}</p>
      <p><b>Description:</b> {report.description}</p>
      <p><b>Date:</b> {new Date(report.createdAt).toDateString()}</p>
    </div>
  );
};

export default GetReportById;
