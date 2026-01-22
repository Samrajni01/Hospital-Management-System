import { Router } from "express";
import {
  addDoctor,
  getDoctorsList,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
  approveDoctor
  
} from "../controllers/doctor.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";

const router = Router();
router.post("/",verifyJWT, addDoctor);
router.get("/", getDoctorsList);
router.get("/myProfile",verifyJWT, getDoctorById);
router.patch("/:id", verifyJWT,  updateDoctor);
router.delete("/:id",verifyJWT , isAdmin, deleteDoctor);
router.patch(
  "/approve/:id",
  verifyJWT,
  isAdmin,
  approveDoctor
);

export default router;



