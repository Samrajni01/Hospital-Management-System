import { Router } from "express";
import {
  addAppointment,
  getAllAppointments,
  getAppointmentsByDoctorId,
  getMyAppointments,
  updateAppointment,
  cancelAppointment
} from "../controllers/appointment.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";

const router = Router();


router.post("/", verifyJWT, addAppointment);


router.get("/", verifyJWT, isAdmin, getAllAppointments);


router.get("/doctor/:doctorId", verifyJWT,  getAppointmentsByDoctorId);


router.get("/me", verifyJWT, getMyAppointments);


router.patch("/:id", verifyJWT, updateAppointment);


router.patch("/cancel/:id", verifyJWT, cancelAppointment);

export default router;
