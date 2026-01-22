import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DoctorHome() {
  const navigate = useNavigate();
  const [patientId, setPatientId] = useState("");

  const handleReport = () => {
    if (!patientId) {
      alert("Please enter a patient ID");
      return;
    }
    navigate(`/reports/${patientId}`);
  };

  return (
     <div className="doctor-dashboard-page">
      <div className="doctor-dashboard-card">
         <h2 className="doctor-dashboard-title">
        Doctor Dashboard
      </h2>
       <hr className="dashboard-divider" />
       <div className="dashboard-actions">
      

      {/* My Profile */}
      <button className="dashboard-btn-outline" onClick={() => navigate("/doctor-profile")}>
        My Profile
      </button>
      <br />

      {/* My Appointments */}
      <button className="dashboard-btn-outline" onClick={() => navigate("/doctor/appointments")}>
        My Appointments
      </button>
       </div>
     
       <hr className="dashboard-divider" />

      {/* Reports */}
      <div className="dashboard-reports">
        
        <input
          type="text"
          placeholder="Enter Patient ID"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
        />
        <button className="dashboard-btn full-width" onClick={handleReport}>View Patient Reports</button>
      </div>
    </div>
    </div>
   
  );
}
