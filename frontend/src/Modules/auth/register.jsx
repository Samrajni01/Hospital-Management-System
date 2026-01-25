import { useState } from "react";
import { registerUser } from "../users/user.api.js";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.clear()
    try {

      
      await registerUser(form);
      alert("Registered successfully");

      // redirect based on role
      if (form.role.toLowerCase() === "doctor") {
        navigate("/doctor/apply");
      } else if (form.role.toLowerCase() === "patient") {
        navigate("/patient/add");
      } else {
        navigate("/user-profile");
      }
    } catch (err) {
      alert(err?.response?.data?.message || "Register failed");
    }
  };

  return (
    
    <div className="auth-page">
      <div className="auth-container">
        <div className="form-title">
          Create ClinicOS Account
        </div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input name="fullName" placeholder="Full Name" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} />
        <input name="phoneNumber" placeholder="Phone Number" onChange={handleChange} />
        <input name="role" placeholder="Role (admin/doctor/patient)" onChange={handleChange} />

        <button type="submit" className="auth-button">Register</button>
      </form>

      {/* Small text + Login button */}
      <div>
        </div>
        <small>Already have an account?</small>
        <br />
        <button className="auth-button"onClick={() => navigate("/login")}>Login</button>
      </div>
    </div>
    
  );
}
