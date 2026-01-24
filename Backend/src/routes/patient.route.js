import { Router } from "express";
import {
  addPatient,
  getPatientsList,
  getPatientById,
  updatePatient,
  deletePatient,
  paymentOptions, createRazorpayOrder
} from "../controllers/patient.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";

const router = Router();


router.post("/", verifyJWT, addPatient);


router.get("/", verifyJWT,isAdmin, getPatientsList); 



router.get("/me", verifyJWT, getPatientById);


router.patch("/:id", verifyJWT,  updatePatient);


router.delete("/:id", verifyJWT, isAdmin, deletePatient);
router.get("/options", verifyJWT, paymentOptions);      
router.post("/razorpay", verifyJWT, createRazorpayOrder);

export default router;
