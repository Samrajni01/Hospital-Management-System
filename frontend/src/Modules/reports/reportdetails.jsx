import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReportByIdApi } from "./report.api";

const ReportDetails = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getReportByIdApi(id);
    setReport(res.data.data);
  };

  if (!report) return <p>Loading...</p>;

  return (
    <div>
      <h3>{report.reportType}</h3>
      <p>{report.findings}</p>
      <p>Status: {report.status}</p>
      <a href={report.fileUrl} target="_blank">Open File</a>
    </div>
  );
};

export default ReportDetails;
