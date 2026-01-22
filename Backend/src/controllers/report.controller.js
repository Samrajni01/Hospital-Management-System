import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Report } from "../models/report.model.js";
import { Patient } from "../models/patient.model.js";




export const addReport = asyncHandler(async (req, res) => {
  const { patient, doctor, appointment, reportType, findings } = req.body;

  if (!patient || !reportType) {
    throw new ApiError(400, "Patient and reportType are required");
  }

  if (!req.file?.path) {
    throw new ApiError(400, "Report file is required");
  }

  
  const uploadedFile = await uploadOnCloudinary(req.file.path);

  if (!uploadedFile?.url) {
    throw new ApiError(500, "File upload failed");
  }

  
  const report = await Report.create({
    patient,
    doctor,
    appointment,
    reportType,
    findings,
    fileUrl: uploadedFile.url,
    status:"pending",
  });

  res.status(201).json(
    new ApiResponse(201, report, "Report created successfully")
  );
});


export const getReportById = asyncHandler(async (req, res) => {
  const report = await Report.findById(req.params.id)
    .populate("patient")
    .populate("doctor")
    .populate("appointment");

  if (!report) {
    throw new ApiError(404, "Report not found");
  }

  // Admin can see all
  if (req.user.role !== "admin") {
    // Patient can see only own
    const patient = await Patient.findOne({ user: req.user._id });

    if (!patient || report.patient._id.toString() !== patient._id.toString()) {
      throw new ApiError(403, "Not allowed");
    }
  }

  res.status(200).json(
    new ApiResponse(200, report, "Report fetched successfully")
  );
});

export const updateReport = asyncHandler(async (req, res) => {
  const report = await Report.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!report) {
    throw new ApiError(404, "Report not found");
  }

  res.status(200).json(
    new ApiResponse(200, report, "Report updated successfully")
  );
});


export const deleteReport = asyncHandler(async (req, res) => {
  const report = await Report.findById(req.params.id);

  if (!report) {
    throw new ApiError(404, "Report not found");
  }

  await report.deleteOne();

  res.status(200).json(
    new ApiResponse(200, null, "Report deleted successfully")
  );
});
export const getMyReports = asyncHandler(async (req, res) => {
  // 1. Find the patient profile associated with the logged-in user
  const patient = await Patient.findOne({ user: req.user._id });

  if (!patient) {
    throw new ApiError(404, "Patient profile not found for this user");
  }

  // 2. Fetch all reports for this patient
  // Inside report.controller.js
const reports = await Report.find({ patient: patient._id })
  .populate({
    path: "doctor",
    populate: {
      path: "user",
      select: "fullName phoneNumber email" // These come from User model
    }
  })
  .sort({ createdAt: -1 });

  res.status(200).json(
    new ApiResponse(200, reports, "Reports retrieved successfully")
  );
});
