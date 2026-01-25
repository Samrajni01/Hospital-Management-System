import api from "../../services/api";

export const addDoctor = (data) =>
  api.post("/api/v1/doctors/", data);

export const getDoctorsList = () => api.get("/api/v1/doctors");
export const getDoctorById = () =>
  api.get(`/api/v1/doctors/myProfile`);
export const approveDoctor = (id) =>
  api.patch(`/api/v1/doctors/approve/${id}`);

export const updateDoctor = (id, data) =>
  api.patch(`/api/v1/doctors/${id}`, data);

