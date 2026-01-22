import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDoctorById } from "./doctor.api.jsx";

const DoctorProfile = () => {
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await getDoctorById();
        setDoctor(res.data.data);
      } catch (err) {
        setError("Failed to load doctor profile");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, []);

  if (loading) return <p>Loading doctor profile...</p>;
  if (error) return <p>{error}</p>;
  if (!doctor) return <p>Doctor profile not found</p>;

  return (
     <div className="doctor-dashboard-page">
    <div className="doctor-dashboard-card">
      <h2 className="doctor-dashboard-title">Doctor Profile</h2>
      <hr className="dashboard-divider" />

      <div className="profile-card">
      
      <p>
        <strong>Name:</strong> {doctor.user?.fullName}
      </p>

      <p>
        <strong>Email:</strong> {doctor.user?.email}
      </p>

      <p>
        <strong>Specialization:</strong> {doctor.specialization}
      </p>

      <p>
        <strong>Experience:</strong>{" "}
        {doctor.experience ?? "N/A"} years
      </p>

      <p>
        <strong>Availability:</strong>{" "}
        {Array.isArray(doctor.availability) && doctor.availability.length > 0
          ? doctor.availability.join(", ")
          : "Not available"}
      </p>

      <p>
        <strong>Status:</strong>{" "}
        {doctor.isActive ? "Approved" : "Pending Approval"}
      </p>
      </div>
      <div className="profile-actions">


      <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
  <button className="dashboard-btn" onClick={() => navigate(`/admin/doctors/${doctor._id}/edit`)}>
    Edit
  </button>
  <button className="dashboard-btn" onClick={() => navigate("/doctor/home")}>
    Back to Dashboard
  </button>
</div>
    </div>
    </div>
    </div>
  );
};

export default DoctorProfile;
