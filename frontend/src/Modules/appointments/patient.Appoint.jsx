import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyAppointmentsApi } from "./appoint.api";

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await getMyAppointmentsApi();
      setAppointments(res.data.data); // get appointments from ApiResponse
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading appointments...</p>;

  return (
     <div className="doctor-dashboard-page">
      <div className="doctor-dashboard-card">
      <h2 className="doctor-dashboard-title">My Appointments</h2>
       <hr className="dashboard-divider" />

      {appointments.length === 0 ? (
        <p>No appointments found</p>
      ) : (
        <table className="appointments-table" border="1">
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Specialization</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((appt) => (
              <tr key={appt._id}>
                <td>{appt.doctor?.user?.fullName || "-"}</td>
                <td>{appt.doctor?.specialization || "-"}</td>
                <td>{new Date(appt.appointmentDate).toDateString()}</td>
                <td>{appt.appointmentTime}</td>
                <td>{appt.status}</td>
                <td>
                  {appt.status === "scheduled" ? (
                    <button onClick={() => navigate(`/cancel/${appt._id}`)}>
                      Cancel
                    </button>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </div>
  );
};

export default PatientAppointments;
