import api from "../../services/api";

// Add Patient
export const addPatientApi = (data) =>
  api.post("/api/v1/patients", data);

// Get All Patients (Admin)
export const getPatientsListApi = () =>
  api.get("/api/v1/patients");

// Get Patient By ID
export const getPatientByIdApi = () =>
  api.get(`/api/v1/patients/me`);

// Update Patient
export const updatePatientApi = (id, data) =>
  api.patch(`/api/v1/patients/${id}`, data);

// Delete Patient (Admin)
export const deletePatientApi = (id) =>
  api.delete(`/api/v1/patients/${id}`);
