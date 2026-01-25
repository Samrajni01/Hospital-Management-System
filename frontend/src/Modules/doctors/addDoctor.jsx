import { useState } from "react";
import { addDoctor } from "./doctor.api.jsx";
import { useNavigate } from "react-router-dom";


export default function AddDoctor() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    specialization: "",
    registrationNumber: "",
    experience: "",
    availability: [],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (day) => {
    setForm((prev) => ({
      ...prev,
      availability: prev.availability.includes(day)
        ? prev.availability.filter((d) => d !== day)
        : [...prev.availability, day],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   





    try {
      const res=await addDoctor(form);
      const doctorId = res.data.data._id;

navigate("/doctor/home", {
  state: { doctorId }})

      
    } catch (err) {
      alert(err.response?.data?.message || "Failed to apply");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="form-title">
         Apply as Doctor
        </div>

    
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      

      <input
        name="specialization"
        placeholder="Specialization"
        onChange={handleChange}
        required
      />

      <input
        name="registrationNumber"
        placeholder="Registration Number"
        onChange={handleChange}
        required
      />

      <input
        name="experience"
        type="number"
        placeholder="Experience (years)"
        value={form.experience}
        onChange=//{handleChange}
        {(e)=>setForm({...form,experience:Number(e.target.value)})}
      />

      <div>
        {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((day) => (
          <label key={day}>
            <input
              type="checkbox"
              checked={form.availability.includes(day)}
              onChange={() => handleCheckbox(day)}
            />
            {day}
          </label>
        ))}
      </div>

      <button className="auth-button" type="submit">Submit Application</button>
    </form>

       </div>
    </div>
  );
}
