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
      const { user,accessToken } = response.data.data;

      if (!user) throw new Error("User data missing");
      localStorage.setItem("accessToken", accessToken);
      alert("Login successful");

      if (user.role.toLowerCase() === "patient") {
        try {
          // Fetch patient profile by userId
         // const patientRes = 
          await getPatientByIdApi();
          //const patientId = patientRes.data.data._id;

          // Navigate to patient dashboard (/home)
          navigate("/home");
        } catch (err) {
          console.error("Patient profile not found", err);
          navigate("/patient/add");
        }
      } else if (user.role.toLowerCase() === "doctor") {
        try {
          //const doctorRes = 
          await getDoctorById(); // backend uses logged-in user
          //const doctorId = doctorRes.data.data._id;

          // Navigate to doctor dashboard (/doctor/home)
          navigate("/doctor/home");
        } catch (err) {
          console.error("Doctor profile not found", err);
          navigate("/doctor/apply");
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
