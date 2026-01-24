import { useEffect, useState } from "react";
import { getMyBillsApi, createRazorpayOrderApi, getPaymentOptionsApi } from "./bill.api";

const HaveBill = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [paymentOptions, setPaymentOptions] = useState([]);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const res = await getMyBillsApi();
        setBills(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "No bills to be paid");
      } finally {
        setLoading(false);
      }
    };

    const fetchPaymentOptions = async () => {
      try {
        const res = await getPaymentOptionsApi();
        setPaymentOptions(res.data.data);
      } catch (err) {
        console.error("Failed to fetch payment options", err);
      }
    };

    fetchBills();
    fetchPaymentOptions();
  }, []);

  // Razorpay payment handler
  const handlePayment = async (bill, paymentType) => {
    try {
      // For COD, just show alert
      if (paymentType === "COD") {
        alert("Cash on Delivery selected. Admin will update status once paid.");
        return;
      }

      // Call backend to create Razorpay order
      const res = await createRazorpayOrderApi(bill.totalAmount - bill.paidAmount, paymentType);
      const order = res.data.data;

      // Open Razorpay checkout
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY, // your key in .env
        amount: order.amount,
        currency: order.currency,
        name: "Hospital Payment",
        description: `Bill Payment - ${bill._id}`,
        order_id: order.id,
        handler: function (response) {
          alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
          // Optionally refresh bills or update state
        },
        prefill: {
          name: bill.patient?.user?.fullName || "",
          email: bill.patient?.user?.email || "",
        },
        theme: { color: "#4f46e5" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Razorpay integration is currently under construction. Please try later.");
    }
  };

  if (loading) return <div className="p-6">Loading bills...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
     <div className="doctor-dashboard-page">
      <div className="doctor-dashboard-card">
        <h2 className="doctor-dashboard-title">My Bills</h2>
       <hr className="dashboard-divider" />
    <div className="p-6">
      

      {bills.map((bill) => {
        const remainingAmount = bill.totalAmount - bill.paidAmount;

        return (
            <div className="profile-card">
          <div key={bill._id} className="border rounded-lg p-4 mb-4 shadow">
            <p><b>Doctor:</b> {bill.doctor?.user?.fullName || "N/A"}</p>
            <p>
              <b>Appointment:</b>{" "}
              {bill.appointment?.appointmentDate
                ? new Date(bill.appointment.appointmentDate).toDateString()
                : "N/A"}
            </p>

            <div className="mt-2">
              <b>Services:</b>
              <ul className="list-disc ml-5">
                {bill.services.map((s, i) => (
                  <li key={i}>
                    {s.name} – ₹{s.amount}
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-2"><b>Total Amount:</b> ₹{bill.totalAmount}</p>
            <p><b>Paid Amount:</b> ₹{bill.paidAmount}</p>
            <p className={`font-semibold ${bill.status === "paid" ? "text-green-600" : "text-yellow-600"}`}>
              Status: {bill.status}
            </p>
            </div>

            {/* Payment buttons */}
            {bill.status !== "paid" && remainingAmount > 0 && (
              <div className="mt-4">
                <b>Pay via:</b>
                <div className="flex gap-2 mt-2">
                  {paymentOptions.map((option) => (
                    <button 
                      key={option.type}
                      className={`appointments-table button ${
                        option.type === "COD"
                          ? "bg-gray-500"
                          : option.type === "GPay"
                          ? "bg-green-600"
                          : "bg-blue-600"
                      }`}
                      onClick={() => handlePayment(bill, option.type)}
                    >
                      {option.description}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
        );
      })}
    </div>
    </div>
    </div>
  );
};

export default HaveBill;
