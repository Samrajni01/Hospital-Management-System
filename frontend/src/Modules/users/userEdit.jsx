import { useEffect, useState } from "react";
import { getMe, updateMe } from "./user.api";
import { useNavigate } from "react-router-dom";

export default function UserEdit() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "",
  });

  const navigate = useNavigate();

  // Fetch current user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getMe();
        setForm({
          fullName: res.data.data.fullName || "",
          email: res.data.data.email || "",
          password: "", // leave empty for security
          phoneNumber: res.data.data.phoneNumber || "",
          role: res.data.data.role || "",
        });
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchUser();
  }, []);

  // Generic change handler
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateMe(form);
      alert("Profile updated successfully");
      navigate("/profile"); // redirect to UserProfile
    } catch (err) {
      alert(err?.response?.data?.message || "Update failed");
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        name="fullName"
        placeholder="Full Name"
        value={form.fullName}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />

      <input
        name="phoneNumber"
        placeholder="Phone Number"
        value={form.phoneNumber}
        onChange={handleChange}
      />

      <input
        name="role"
        placeholder="Role"
        value={form.role}
        onChange={handleChange}
      />

      <button type="submit">Update</button>
    </form>
  );
}
