import { Bill } from "../models/Bill.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Patient } from "../models/patient.model.js";


/**
 * CREATE BILL (ADMIN ONLY)
 */
const createBill = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    throw new ApiError(403, "Only admin can create bill");
  }

  const { patient, appointment, doctor, services } = req.body;

  if (
    !patient ||
    !appointment ||
    !doctor ||
    !Array.isArray(services) ||
    services.length === 0
  ) {
    throw new ApiError(400, "All required fields must be provided");
  }

  const totalAmount = services.reduce(
    (sum, s) => sum + s.amount,
    0
  );

  const bill = await Bill.create({
    patient,
    appointment,
    doctor,
    services,
    totalAmount,
  });

  res
    .status(201)
    .json(new ApiResponse(201, bill, "Bill created"));
});

/**
 * GET BILL BY ID (ADMIN or OWNER PATIENT)
 */
const getBillById = asyncHandler(async (req, res) => {
  const { billId } = req.params;

  const bill = await Bill.findById(billId)
    .populate("patient")
    .populate("doctor")
    .populate("appointment");

  if (!bill) {
    throw new ApiError(404, "Bill not found");
  }

  if (
    req.user.role !== "admin" &&
    bill.patient._id.toString() !== req.user._id.toString()
  ) {
    throw new ApiError(403, "Access denied");
  }

  res
    .status(200)
    .json(new ApiResponse(200, bill, "Bill fetched"));
});

/**
 * GET LOGGED-IN PATIENT BILLS
 */
const getMyBills = asyncHandler(async (req, res) => {
  if (req.user.role !== "patient") {
    throw new ApiError(403, "Only patients can access this");
  }

  // find patient profile linked to logged-in user
  const patient = await Patient.findOne({ user: req.user._id });

  if (!patient) {
    throw new ApiError(404, "Patient profile not found");
  }

  const bills = await Bill.find({ patient: patient._id })
   .populate({
    path: "doctor",
    populate: {
      path: "user",
      select: "fullName"
    }
  })
  .populate("appointment");

  // if no bills yet
  if (!bills || bills.length === 0) {
    throw new ApiError(404, "No bills found. Nothing to pay 🎉");
  }

  res.status(200).json(
    new ApiResponse(200, bills, "My bills fetched")
  );
});
/**
 * DELETE BILL (ADMIN ONLY)
 */
const deleteBill = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    throw new ApiError(403, "Only admin can delete bill");
  }

  const { billId } = req.params;

  const bill = await Bill.findByIdAndDelete(billId);

  if (!bill) {
    throw new ApiError(404, "Bill not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, null, "Bill deleted"));
});

export {
  createBill,
  getBillById,
  getMyBills,
  deleteBill,
};
