import mongoose, { Schema } from "mongoose";

const doctorSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",     
      required: true
    },
    specialization: {
      type: String,
      required: true,
      trim: true
    },
    registrationNumber: {
      type: String,     
      unique: true,
      required: true,
      trim: true
    },
    experience: {
      type: Number,    
      default: 0
    },
    
    isActive: {
  type: Boolean,
  default: true
}
,
    availability: {
  type: [String],
  enum: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  default: []
}

  },
  { timestamps: true }
);

export const Doctor = mongoose.model("Doctor", doctorSchema);