import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPatientByIdApi } from "./patient.api";

const PatientDetails = () => {
  const navigate = useNavigate();

  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await getPatientByIdApi(); // no id, like DoctorProfile
        setPatient(res.data.data);
      } catch (err) {
        setError("Failed to load patient profile");
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, []);

  if (loading) return <p>Loading patient profile...</p>;
  if (error) return <p>{error}</p>;
  if (!patient) return <p>Patient profile not found</p>;

  return (
    <div className="doctor-dashboard-page">
    <div className="doctor-dashboard-card">
      <h2 className="doctor-dashboard-title">Patient Profile</h2>
      <hr className="dashboard-divider" />

      <div className="profile-card">

      <p><strong>Name:</strong> {patient.user?.fullName}</p>
      <p><strong>Email:</strong> {patient.user?.email}</p>
      <p><strong>Age:</strong> {patient.age ?? "N/A"}</p>
      <p><strong>Gender:</strong> {patient.gender ?? "N/A"}</p>
      <p><strong>Blood Group:</strong> {patient.bloodGroup ?? "N/A"}</p>
      <p><strong>Phone:</strong> {patient.phone ?? "N/A"}</p>
      <p><strong>Address:</strong> {patient.address ?? "N/A"}</p>
      </div>
      <div className="profile-actions">

      <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
        <button className="dashboard-btn" onClick={() => navigate(`/my-profile/${patient._id}/edit`)}>
          Edit
        </button>

        <button className="dashboard-btn" onClick={() => navigate("/home")}>
          Back to Dashboard
        </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default PatientDetails;
