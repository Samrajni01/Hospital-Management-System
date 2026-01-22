import  { useEffect, useState } from "react";

import { getMyAppointmentsApi } from "./appoint.api";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await getMyAppointmentsApi();
      setAppointments(res.data.data);
    } catch (error) {
      console.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading appointments...</p>;

  return (
    <div className="doctor-dashboard-page">
    <div className="doctor-dashboard-card">
      <h2 className="doctor-dashboard-title">My Patient Appointments</h2>
      <hr className="dashboard-divider" />
      

      {appointments.length === 0 ? (
        <p>No appointments found</p>
      ) : (
        <table className="appointments-table"  border="1">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Date</th>
              <th>Time</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((appt) => (
              <tr key={appt._id}>
                <td>{appt.patient?.user?.fullName}</td>
                <td>{new Date(appt.appointmentDate).toDateString()}</td>
                <td>{appt.appointmentTime}</td>
                <td>{appt.reason || "-"}</td>
                <td>{appt.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </div>
  );
};

export default DoctorAppointments;
