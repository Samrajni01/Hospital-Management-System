import api from "../../services/api";

// Get logged-in patient's bills
export const getMyBillsApi = () =>
  api.get("/api/v1/bill/my");

export const getPaymentOptionsApi = () =>
  api.get("/api/v1/patients/options");

export const createRazorpayOrderApi = (amount, paymentType) =>
  api.post("api/v1//patients/razorpay", {
    amount,
    paymentType,
  });
