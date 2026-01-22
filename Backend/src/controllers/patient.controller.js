import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { Patient } from "../models/patient.model.js";

export const addPatient = asyncHandler(async (req, res) => {
  const { fullName, age, gender, bloodGroup, phone, address, emergencyContact, medicalHistory } = req.body;

  if (!age || !gender || !bloodGroup) {
    throw new ApiError(400, "Age, gender, and blood group are required");
  }

  const patient = await Patient.create({
    user: req.user._id, 
    fullName,
    age,
    gender,
    bloodGroup,
    phone,
    address,
    emergencyContact,
    medicalHistory,
  });

  res.status(201).json(new ApiResponse(201, patient, "Patient added successfully"));
});

export const getPatientsList = asyncHandler(async (_, res) => {
  const patients = await Patient.find().populate("user", "fullName email");
  res.status(200).json(new ApiResponse(200, patients, "Patients fetched successfully"));
});


export const getPatientById = asyncHandler(async (req, res) => {
  //const patient = await Patient.findById(req.params.id).populate("user", "fullName email");
  const patient = await Patient.findOne({ user: req.user._id })
      .populate("user", "fullName email");
  if (!patient) {
    throw new ApiError(404, "patient not found");
  }
  res.status(200).json(new ApiResponse(200, patient, "Patient fetched successfully"));
});

export const updatePatient = asyncHandler(async (req, res) => {
  const updatedData = req.body;

  const patient = await Patient.findByIdAndUpdate(req.params.id, updatedData, {
    new: true,
    runValidators: true,
  });

  if (!patient) {
    throw new ApiError(404, "Patient not found");
  }

  res.status(200).json(new ApiResponse(200, patient, "Patient updated successfully"));
});
export const deletePatient = asyncHandler(async (req, res) => {
  const patient = await Patient.findByIdAndDelete(req.params.id);
  if (!patient) {
    throw new ApiError(404, "Patient not found");
  }

  res.status(200).json(new ApiResponse(200, null, "Patient deleted successfully"));
});




