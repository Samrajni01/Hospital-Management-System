import React from "react";
import { cancelAppointmentApi } from "./appoint.api";

const CancelAppointment = ({ appointmentId, onSuccess }) => {
  const handleCancel = async () => {
    if (!window.confirm("Are you sure you want to cancel this appointment?"))
      return;

    try {
      await cancelAppointmentApi(appointmentId);
      alert("Appointment cancelled");
      if (onSuccess) onSuccess();
    } catch (error) {
      alert(error.response?.data?.message || "Cancel failed");
    }
  };

  return <button onClick={handleCancel}>Cancel</button>;
};

export default CancelAppointment;
