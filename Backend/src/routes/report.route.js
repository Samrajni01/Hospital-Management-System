import { Router } from "express";
import {
  addReport,
  getReportById,
  updateReport,
  deleteReport
} from "../controllers/report.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();


router.post(
  "/",
  verifyJWT,isAdmin,
  upload.single("fileUrl"),
  addReport
);


router.get("/:id", verifyJWT, getReportById);


router.patch("/:id", verifyJWT, updateReport);


router.delete("/:id", verifyJWT, isAdmin, deleteReport);

export default router;

