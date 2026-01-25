import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { Doctor } from "../models/doctors.model.js";


 const addDoctor = asyncHandler(async (req, res) => {
  const { specialization, registrationNumber, experience, availability } = req.body;

  if (!specialization || !registrationNumber) {
    throw new ApiError(400, "Specialization and registrationNumber are required");
  }

  const doctor = await Doctor.create({
    user:req.user._id, 
    specialization,
    registrationNumber,
    experience:Number(experience),
    availability,
    isActive:true,
  });
  res.status(201).json(new ApiResponse(201, doctor, "Doctor application successfully,awaiting approval"));
});

 const getDoctorsList = asyncHandler(async (_, res) => {
  const doctors = await Doctor.find({isActive:true}).populate("user", "fullName email");
  res.status(200).json(new ApiResponse(200, doctors, "Doctors fetched successfully"));
});

 const getDoctorById = asyncHandler(async (req, res) => {
  /*const doctor = await Doctor.findById(req.params.id).populate("user", "fullName email");*/
  const doctor = await Doctor.findOne({ user: req.user._id })
    .populate("user", "fullName email");


  if (!doctor) {
    throw new ApiError(404, "Doctor not found");
  }
  res.status(200).json(new ApiResponse(200, doctor, "Doctor fetched successfully"));
});

 const updateDoctor = asyncHandler(async (req, res) => {
  const { specialization, registrationNumber, experience, availability } = req.body

  
  const updatedData = {
    ...(specialization && { specialization }),
    ...(registrationNumber && { registrationNumber }),
    ...(experience !== undefined && { experience }),
    ...(availability && { availability }),
  }

  const doctor = await Doctor.findByIdAndUpdate(
    req.params.id,
    updatedData,
    { new: true, runValidators: true }
  ).populate("user", "username email") 

  if (!doctor) {
    throw new ApiError(404, "Doctor not found")
  }

  res.status(200).json(new ApiResponse(200, doctor, "Doctor updated successfully"))
})

 const deleteDoctor = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findByIdAndDelete(req.params.id);
  if (!doctor) {
    throw new ApiError(404, "Doctor not found");
  }
  res.status(200).json(new ApiResponse(200, null, "Doctor deleted successfully"));
});
// controllers/doctor.controller.js
const approveDoctor = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findByIdAndUpdate(
    req.params.id,
    { isActive: true },
    { new: true }
  );

  if (!doctor) {
    throw new ApiError(404, "Doctor not found");
  }

  res.status(200).json(
    new ApiResponse(200, doctor, "Doctor approved successfully")
  );
});


export {addDoctor,getDoctorsList,getDoctorById,updateDoctor,deleteDoctor,approveDoctor }
