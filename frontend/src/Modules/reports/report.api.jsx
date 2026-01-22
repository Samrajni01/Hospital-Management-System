import api from "../../services/api";

export const addReportApi = (formData) =>
  api.post("/api/v1/reports", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });

export const getReportByIdApi = (id) =>
  api.get(`/api/v1/reports/${id}`);

export const updateReportApi = (id, data) =>
  api.patch(`/api/v1/reports/${id}`, data);

export const deleteReportApi = (id) =>
  api.delete(`/api/v1/reports/${id}`);
