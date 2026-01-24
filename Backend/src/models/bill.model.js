import mongoose, { Schema } from "mongoose";

const billSchema = new Schema(
  {
    patient: {
      type: Schema.Types.ObjectId,
  ref: "Patient",
  required: true
    },
    appointment: {
      type: Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    // charges
    services: [
      {
        name: { type: String, required: true },
        amount: { type: Number, required: true },
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },

    paidAmount: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["pending", "partially_paid", "paid"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Bill = mongoose.model("Bill", billSchema);
