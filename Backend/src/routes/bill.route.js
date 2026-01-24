import { Router } from "express";
import {
  createBill,
  getBillById,
  getMyBills,
  deleteBill
} from "../controllers/bill.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";

const router = Router();


router.post("/", verifyJWT, isAdmin, createBill);


router.get("/my", verifyJWT, getMyBills);

router.get("/:billId", verifyJWT, getBillById);


router.delete("/:billId", verifyJWT, isAdmin, deleteBill);

export default router;
