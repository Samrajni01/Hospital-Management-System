import { useEffect, useState } from "react";
import { getMyReportsApi } from "./report.api";

const MyReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await getMyReportsApi();
        setReports(response.data?.data || []);
      } catch (err) {
        console.error("Error fetching reports:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  if (loading)
    return (
      <div className="p-10 text-center text-gray-500 font-medium">Loading...</div>
    );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Medical History</h1>

      {reports.length === 0 ? (
        <p className="text-gray-500">No reports found for your profile.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {reports.map((report) => (
            <div
              key={report._id}
              className="border p-5 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-xl text-blue-800">
                    {report.reportType}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Doctor: {report.doctor?.user?.fullName || "Not Assigned"}
                  </p>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(report.createdAt).toLocaleDateString()}
                </span>
              </div>

              <p className="text-gray-700 mb-4">
                <strong>Findings:</strong> {report.findings}
              </p>

              {report.fileUrl && (
                <div className="mt-2">
                  <img
                   src={`http://localhost:9000/reports/${report.fileName}`} 
  alt="Report" 
  style={{ maxWidth: '400px', maxHeight: '500px' }} 
                  />
                  <div className="mt-2 text-center">
                    <a
                      href={report.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline text-sm font-medium"
                    >
                      View Original File
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReports;
