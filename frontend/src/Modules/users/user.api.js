import api from "../../services/api";



export const loginUser = (data) => api.post("/api/v1/users/login", data);



export const updateMe = (data) => api.patch("/api/v1/users/me", data)
export const registerUser = (data) =>
  api.post("/api/v1/users/register", data);

export const getMe = () =>
  api.get("/api/v1/users/me")


