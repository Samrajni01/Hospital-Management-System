import api from "../../services/api";

export const addAppointmentApi = (data) => {
  return api.post("/api/v1/appointments", data);
};

export const getMyAppointmentsApi = () => {
  return api.get("/api/v1/appointments/me");
};

export const cancelAppointmentApi = (id) => {
  return api.patch(`/api/v1/appointments/cancel/${id}`);
};
