import { Router } from "express";
import {
  createBill,
  getBillById,
  getBillsByPatient,
  markBillAsPaid,
  deleteBill,
} from "../controllers/bill.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();


router.use(verifyJWT);


router.route("/").post(createBill);


router.route("/:billId").get(getBillById);


router.route("/patient/:patientId").get(getBillsByPatient);


router.route("/:billId/pay").patch(markBillAsPaid);


router.route("/:billId").delete(deleteBill);

export default router;
