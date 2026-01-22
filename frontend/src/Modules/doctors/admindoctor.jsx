import { useEffect, useState } from "react";
import { approveDoctor } from "./doctor.api.jsx";
import api from "../../services/api";
import { Link } from "react-router-dom";

export default function AdminDoctorList() {
  const [doctors, setDoctors] = useState([]);

  const loadDoctors = async () => {
    const res = await api.get("/api/v1/doctors");
    setDoctors(res.data.data);
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  const handleApprove = async (id) => {
    await approveDoctor(id);
    loadDoctors();
  };

  return (
    <div>
      <h2>Doctor Applications</h2>

      {doctors.map((doc) => (
        <div key={doc._id}>
          <p>{doc.user?.email}</p>
          <p>{doc.specialization}</p>

          {!doc.isActive && (
            <button onClick={() => handleApprove(doc._id)}>
              Approve
            </button>
          )}

          {/* ✅ FIXED */}
          <Link to={`/admin/doctors/${doc._id}/edit`}>
            Edit
          </Link>
        </div>
      ))}
    </div>
  );
}
