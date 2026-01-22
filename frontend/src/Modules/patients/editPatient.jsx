import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPatientByIdApi, updatePatientApi }  from "./patient.api";

const EditPatient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    age: "",
    gender: "",
    bloodGroup: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    fetchPatient();
  }, []);

  const fetchPatient = async () => {
    const res = await getPatientByIdApi(id);
    const p = res.data.data;
    setForm({
      fullName: p.fullName || "",
      age: p.age || "",
      gender: p.gender || "",
      bloodGroup: p.bloodGroup || "",
      phone: p.phone || "",
      address: p.address || "",
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updatePatientApi(id, form);
    alert("Profile Updated");
    navigate(`/patient-profile/${id}`);
  };

  return (
    <div>
      <h2>Edit Patient</h2>
      <form onSubmit={handleSubmit}>
        <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Name" />
        <input name="age" value={form.age} onChange={handleChange} type="number" placeholder="Age" />
        
        <select name="gender" value={form.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <input name="bloodGroup" value={form.bloodGroup} onChange={handleChange} placeholder="Blood Group" />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />
        <input name="address" value={form.address} onChange={handleChange} placeholder="Address" />

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditPatient;
