import mongoose, { Schema } from "mongoose";

const reportSchema = new Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: false   
    },
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: false
    },
    reportType: {
      type: String,
      required: true,
      trim: true
      
    },
    findings: {
      type: String,
      trim: true
      
    },
    fileUrl: {
      type: String,
      required: true,
      trim: true 
      
    },
    issuedDate: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ["pending", "completed", "delivered"],
      default: "completed"
    }
  },
  { timestamps: true }
);

export const Report = mongoose.model("Report", reportSchema);