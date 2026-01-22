import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { Appointment } from "../models/appointment.model.js";
import { Patient } from "../models/patient.model.js";
import { Doctor } from "../models/doctors.model.js";
export const addAppointment = asyncHandler(async (req, res) => {
  const { doctor, appointmentDate, appointmentTime, reason } = req.body;

  if (!doctor || !appointmentDate || !appointmentTime) {
    throw new ApiError(400, "Doctor, date and time are required");
  }
  const patient = await Patient.findOne({ user: req.user._id });

  if (!patient) {
    throw new ApiError(404, "Patient profile not found");
  }

  const appointment = await Appointment.create({
    patient:patient._id, 
    doctor,
    appointmentDate,
    appointmentTime,
    reason,
  });
  res.status(201).json(new ApiResponse(201, appointment, "Appointment scheduled"));
});
export const getAllAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find()
    .populate("patient", "user fullName")
    .populate("doctor", "user specialization");

  res.status(200).json(new ApiResponse(200, appointments, "All appointments fetched"));
});
export const getAppointmentsByDoctorId = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({ doctor: req.params.doctorId })
    .populate("patient", "user fullName")
    .populate("doctor", "user specialization");

  res.status(200).json(new ApiResponse(200, appointments, "Appointments for this doctor"));
});

export const getMyAppointments = asyncHandler(async (req, res) => {
  let filter = {};

  // PATIENT
  if (req.user.role === "patient") {
    const patient = await Patient.findOne({ user: req.user._id }).populate("user", "fullName email");

    if (!patient) {
      return res
        .status(200)
        .json(new ApiResponse(200, patient, "Patient profile not found"));
    }

    filter.patient = patient._id;
  }

  // DOCTOR
  if (req.user.role === "doctor") {
    const doctor = await Doctor.findOne({ user: req.user._id }) .populate("user", "fullName email");

    if (!doctor) {
      return res
        .status(200)
        .json(new ApiResponse(200, [], "Doctor profile not found"));
    }

    filter.doctor = doctor._id;
  }

  /*const appointments = await Appointment.find(filter)
    .populate("patient", "fullName")
    .populate("doctor", "specialization");
    */
   const appointments = await Appointment.find(filter)
  .populate({
    path: "patient",
    populate: {
      path: "user",
      select: "fullName email"
    }
  })
  .populate({
    path: "doctor",
    populate: {
      path: "user",
      select: "fullName email"
    },
    select: "specialization"
  });


  res
    .status(200)
    .json(new ApiResponse(200, appointments, "My appointments"));
});

export const updateAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!appointment) {
    throw new ApiError(404, "Appointment not found");
  }

  res.status(200).json(new ApiResponse(200, appointment, "Appointment updated"));
});
export const cancelAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    throw new ApiError(404, "Appointment not found");
  }

  appointment.status = "cancelled";
  await appointment.save();

  res.status(200).json(new ApiResponse(200, appointment, "Appointment cancelled"));
});





