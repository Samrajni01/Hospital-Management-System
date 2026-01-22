import { Bill } from "../models/Bill.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

/**
 * Create Bill
 */
const createBill = asyncHandler(async (req, res) => {
  const {
    patient,
    appointment,
    doctor,
    services,
    totalAmount,
    paymentMethod,
  } = req.body;

  if (
    [patient, appointment, doctor, totalAmount].some(
      (field) => !field
    ) ||
    !Array.isArray(services) ||
    services.length === 0
  ) {
    throw new ApiError(400, "All required fields must be provided");
  }

  const bill = await Bill.create({
    patient,
    appointment,
    doctor,
    services,
    totalAmount,
    paymentMethod,
  });

  res.status(201).json(
    new ApiResponse(201, bill, "Bill created successfully")
  );
});

/**
 * Get Bill by ID
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

  res.status(200).json(
    new ApiResponse(200, bill, "Bill fetched successfully")
  );
});

/**
 * Get Bills by Patient
 */
const getBillsByPatient = asyncHandler(async (req, res) => {
  const { patientId } = req.params;

  const bills = await Bill.find({ patient: patientId })
    .populate("doctor")
    .populate("appointment");

  res.status(200).json(
    new ApiResponse(200, bills, "Patient bills fetched successfully")
  );
});

/**
 * Update Payment Status
 */
const markBillAsPaid = asyncHandler(async (req, res) => {
  const { billId } = req.params;

  const bill = await Bill.findByIdAndUpdate(
    billId,
    { paid: true },
    { new: true }
  );

  if (!bill) {
    throw new ApiError(404, "Bill not found");
  }

  res.status(200).json(
    new ApiResponse(200, bill, "Bill marked as paid")
  );
});

/**
 * Delete Bill
 */
const deleteBill = asyncHandler(async (req, res) => {
  const { billId } = req.params;

  const bill = await Bill.findByIdAndDelete(billId);

  if (!bill) {
    throw new ApiError(404, "Bill not found");
  }

  res.status(200).json(
    new ApiResponse(200, null, "Bill deleted successfully")
  );
});

export {
  createBill,
  getBillById,
  getBillsByPatient,
  markBillAsPaid,
  deleteBill,
};
