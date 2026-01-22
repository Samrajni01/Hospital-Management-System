import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addPatientApi } from "./patient.api";

const AddPatient = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    age: "",
    gender: "",
    bloodGroup: "",
    phone: "",
    address: "",
    emergencyContact: "",
    medicalHistory: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addPatientApi(form);
      const patientId = response.data.data._id;
      alert("Patient profile created");
      navigate("/home", { state: { userId: patientId } });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create patient");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="form-title">
       Patient Profile
        </div>




    <form className="auth-form"  onSubmit={handleSubmit}>
      

      <input
        name="fullName"
        placeholder="Full Name"
        value={form.fullName}
        onChange={handleChange}
      />

      <input
        name="age"
        type="number"
        placeholder="Age"
        value={form.age}
        onChange={handleChange}
      />

      <select name="gender" value={form.gender} onChange={handleChange}>
        <option value="">Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>

      <select name="bloodGroup" value={form.bloodGroup} onChange={handleChange}>
        <option value="">Blood Group</option>
        <option value="A+">A+</option><option value="A-">A-</option>
        <option value="B+">B+</option><option value="B-">B-</option>
        <option value="AB+">AB+</option><option value="AB-">AB-</option>
        <option value="O+">O+</option><option value="O-">O-</option>
      </select>

      <input
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
      />

      <input
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={handleChange}
      />

      <input
        name="emergencyContact"
        placeholder="Emergency Contact"
        value={form.emergencyContact}
        onChange={handleChange}
      />

      <textarea
        name="medicalHistory"
        placeholder="Medical History"
        value={form.medicalHistory}
        onChange={handleChange}
      />

      <button className="auth-button"  type="submit">Save</button>
    </form>
    </div>
    </div>
  );
};

export default AddPatient;
