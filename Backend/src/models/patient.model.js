import mongoose, { Schema } from "mongoose";

const emergencyContactSchema = new Schema(
  {
    name: { type: String, trim: true },
    phone: {
      type: String,
      trim: true,
      match: [/^\+?\d{7,15}$/, "Please enter a valid phone number"], 
    },
  },
  { _id: false } 
);

const patientSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Patient must be linked to a user"],
      index: true, 
    },
    fullName: { 
      type: String,
      trim: true,
    },
    age: {
      type: Number,
      required: [true, "Patient age is required"],
      min: [0, "Age cannot be negative"],
      max: [150, "Age seems invalid"],
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: [true, "Gender is required"],
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      uppercase: true,
      required: [true, "Blood group is required"],
    },
    phone: {
      type: String,
      trim: true,
      //match: [/^\+?\d{7,15}$/, "Please enter a valid phone number"],
      index: true, 
    },
    address: {
      type: String,
      trim: true,
    },
    emergencyContact:  {type: String,
      trim: true,

    },medicalHistory: /*{
      type: [
        {
          condition: String,
          notes: String,
          diagnosisDate: Date,
        },
      ],
      default: [],
      */
 {type: String,
      trim: true,

    },
    isActive: { 
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);


patientSchema.index({ user: 1, bloodGroup: 1 });

export const Patient = mongoose.model("Patient", patientSchema);
