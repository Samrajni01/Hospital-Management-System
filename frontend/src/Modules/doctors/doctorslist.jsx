import { useEffect, useState } from "react";
import { getDoctorsList } from "./doctor.api.jsx";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await getDoctorsList();

        // only active doctors
        const activeDoctors = res.data.data.filter(
          (doc) => doc.isActive === true
        );

        setDoctors(activeDoctors);
      } catch (err) {
        setError("Failed to load doctors");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) return <p>Loading doctors...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="doctor-dashboard-page">
      <div className="doctor-dashboard-card">
        
      <h2 className="doctor-dashboard-title">Doctors List</h2>
      <hr className="dashboard-divider" />

      {doctors.length === 0 ? (
        <p>No doctors available</p>
      ) : (
        
        <ul className="doctor-list">
          {doctors.map((doctor) => (
            <li key={doctor._id} className="doctor-item">
              <h4>{doctor.user?.fullName}</h4>
              <p>Email: {doctor.user?.email}</p>
              <p>Specialization: {doctor.specialization}</p>
              <p>Experience: {doctor.experience} years</p>
              <p>Available: {doctor.availability.join(", ")}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
  );
};

export default DoctorList;
