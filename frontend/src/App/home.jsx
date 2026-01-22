import { useNavigate } from "react-router-dom";

export default function Home({ userId }) {
  const navigate = useNavigate();

  return (
    <div className="doctor-dashboard-page">
       <div className="doctor-dashboard-card">
       <h2 className="doctor-dashboard-title">
        Patient Dashboard
      </h2>
      <hr className="dashboard-divider" />
      {/* Button to see my profile */}
       <div className="dashboard-actions">
      <button className="dashboard-btn-outline" onClick={() => navigate(`/patient-profile/${userId}`)}>
        My Profile
      </button>
      

      {/* Button to see doctor list */}
      <button  className="dashboard-btn-outline" onClick={() => navigate("/doctors")}>
        Doctor Lists
      </button>
      

      <button className="dashboard-btn-outline" onClick={() => navigate("/appointments/add")}>
        Book your Appointment
      </button>
      

      {/* Button to see my appointments */}
      <button className="dashboard-btn-outline" onClick={() => navigate("/appointments/my")}>
        My Appointments
      </button>
      </div>
      <hr className="dashboard-divider" />

      {/* Button to see my reports */}
      <div className="dashboard-reports">
      <button className="dashboard-btn full-width"  onClick={() => navigate(`/reports/${userId}`)}>
        My Reports
      </button>
      

      {/* Button for bill (page not created yet) */}
      <button className="dashboard-btn full-width" onClick={() => alert("Bill page not implemented yet")}>
        My Bill
      </button>
    </div>
    </div>
    </div>
  );
}
