import React, { useEffect, useState } from "react";
import { getDoctorsList } from "../doctors/doctor.api"; 
import { addAppointmentApi } from "./appoint.api"; 

const BookAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await getDoctorsList();
        // Ensure we are setting an array even if the API returns something unexpected
        setDoctors(res.data?.data || []); 
      } catch (err) {
        console.error("Error fetching doctors:", err);
        setDoctors([]); // Fallback to empty array on error
      }
    };
    fetchDoctors();
  }, []);

  // FIXED: Safer filtering with optional chaining to prevent crashes
  const filteredDoctors = doctors.filter((doc) => {
    const name = doc?.user?.fullName?.toLowerCase() ?? "";
    const specialty = doc?.specialization?.toLowerCase() ?? "";
    const search = searchTerm.toLowerCase();
    
    return name.includes(search) || specialty.includes(search);
  });

  const handleDoctorClick = (doc) => {
    setSelectedDoctor(doc);
    setSearchTerm(doc?.user?.fullName || "Unknown Doctor");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDoctor || !appointmentDate || !appointmentTime) {
      alert("Please select a doctor, date, and time!");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        doctor: selectedDoctor._id,
        appointmentDate,
        appointmentTime,
        reason,
      };
      await addAppointmentApi(payload);
      alert("Appointment booked successfully!");

      // Reset form
      setSelectedDoctor(null);
      setSearchTerm("");
      setAppointmentDate("");
      setAppointmentTime("");
      setReason("");
    } catch (err) {
      console.error("Error booking appointment:", err);
      alert("Failed to book appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="doctor-dashboard-page">
      <div className="doctor-dashboard-card">
      <h2 className="doctor-dashboard-title">Book Appointment</h2>

      <form onSubmit={handleSubmit} className="auth-form">
        <div>
          <input
            type="text"
            placeholder="Search Doctor by Name or Specialty..."
            className="w-full border px-3 py-2 rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && !selectedDoctor && (
            <ul className="border mt-1 rounded max-h-40 overflow-y-auto bg-white absolute z-10 w-[calc(100%-3rem)] shadow-lg">
              {filteredDoctors.map((doc) => (
                <li
                  key={doc._id}
                  className="px-3 py-2 hover:bg-blue-50 cursor-pointer border-b last:border-none"
                  onClick={() => handleDoctorClick(doc)}
                >
                  <div className="font-medium">{doc?.user?.fullName}</div>
                  <div className="text-xs text-gray-500">{doc?.specialization}</div>
                </li>
              ))}
              {filteredDoctors.length === 0 && (
                <li className="px-3 py-2 text-gray-500 italic">No doctors found</li>
              )}
            </ul>
          )}
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Select Date</label>
          <input
            type="date"
            className="w-full border px-3 py-2 rounded"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]} // Prevent past dates
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Select Time</label>
          <input
            type="time"
            className="w-full border px-3 py-2 rounded"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Reason (optional)</label>
          <textarea
            className="w-full border px-3 py-2 rounded h-20"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter reason for appointment"
          />
        </div>
        

        <button
          type="submit"
          className="auth-button"
        >
          Book Appointment
        </button>
      </form>

      {selectedDoctor && (
        <div className="mt-4 p-3 border rounded bg-blue-50 border-blue-200">
          <p className="text-sm">
            Selected: <span className="font-bold">{selectedDoctor?.user?.fullName}</span> ({selectedDoctor?.specialization})
          </p>
          <button 
            onClick={() => {setSelectedDoctor(null); setSearchTerm("");}} 
            className="text-xs text-red-500 underline mt-1"
          >
            Change Doctor
          </button>
        </div>
        
      )}
    </div>
    </div>
  );
};

export default BookAppointment;