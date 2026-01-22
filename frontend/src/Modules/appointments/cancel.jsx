// Cancel.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMyAppointmentsApi, cancelAppointmentApi } from "./appoint.api";

const CancelAppointmentPage = () => {
  const { id } = useParams(); // appointment _id from route
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch the appointment details
  const fetchAppointment = async () => {
    try {
      setLoading(true);
      const { data } = await getMyAppointmentsApi(id);
      setAppointment(data);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to load appointment");
      navigate(-1); // go back if error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointment();
  }, [id]);

  const handleCancel = async () => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;

    try {
      await cancelAppointmentApi(id);
      alert("Appointment cancelled successfully");
      navigate("/appointments/my"); // redirect to appointment list
    } catch (error) {
      alert(error.response?.data?.message || "Cancel failed");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!appointment) return <p>No appointment found.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Cancel Appointment</h2>
      

      <button
        onClick={handleCancel}
        style={{
          padding: "8px 16px",
          backgroundColor: "#ff4d4f",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        Confirm Cancel
      </button>
    </div>
  );
};

export default CancelAppointmentPage;
