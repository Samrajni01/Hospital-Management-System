import { Router } from "express";
import {
  addReport,
  getReportById,
  updateReport,
  deleteReport,
  getMyReports
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
router.get("/my-reports", verifyJWT, getMyReports);


router.get("/:id", verifyJWT, isAdmin, getReportById);


router.patch("/:id", verifyJWT, updateReport);


router.delete("/:id", verifyJWT, isAdmin, deleteReport);

export default router;

