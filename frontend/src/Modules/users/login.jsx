import { useState } from "react";
import { loginUser } from "./user.api";
import { useNavigate } from "react-router-dom";
import { getPatientByIdApi } from "../patients/patient.api";
import { getDoctorById  } from "../doctors/doctor.api.jsx";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    

    try {
      const response = await loginUser(form);
      const { user, accessToken } = response.data.data;

      if (!user) throw new Error("User data missing");
      
      // 2. Save fresh token
      localStorage.setItem("accessToken", accessToken);
      alert("Login successful");
      localStorage.setItem("userRole",user.role.toLowerCase())

      if (user.role.toLowerCase() === "patient") {
        try {
          // Force a small delay or pass the token directly if your API supports it
          await getPatientByIdApi(); 
          navigate("/home");
        } catch (err) {
          navigate("/patient/add");
        }
      } else if (user.role.toLowerCase() === "doctor") {
        try {
          // If this still fails, your backend is likely seeing the OLD 
          // cookie instead of this NEW token.
          await getDoctorById(); 
          navigate("/doctor/home");
        } catch (err) {
          console.error("Doctor profile not found", err);
          navigate("/doctor/apply");
      
      
      // ... rest of logic
        }
      } else {
        navigate("/user-profile");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed: " + err.message);
    }
  };

  return (
     <div className="auth-page">
      <div className="auth-container">
<div className="form-title">
          Sign in to ClinicOS
        </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button type="submit" className="auth-button">Login</button>
      </form>

      
        <small>Don't have an account?</small>
        <br />
        <button className="auth-button" onClick={() => navigate("/register")}>Register</button>
      </div>
    </div>
    
  );
}
