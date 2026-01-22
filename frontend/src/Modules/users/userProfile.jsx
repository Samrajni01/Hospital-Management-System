import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMe } from "./user.api";

export default function UserProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getMe();
        setUser(res.data.data); // adjust if your API returns differently
      } catch (err) {
        console.error("Failed to fetch user:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleClick = () => {
    alert("Please select your role");
  };

  if (loading) return <p>Loading user info...</p>;
  if (!user) return <p>User not found</p>;

  return (
    <div>
      {/* Welcome message */}
      <h2>Welcome, {user.fullName || user.username}</h2>

      {/* Buttons */}
      <button onClick={handleClick}>My Profile</button>
      <br />
      <button onClick={handleClick}>My Appointments</button>
      <br />
      <button onClick={handleClick}>Reports</button>
      <br />
      <button onClick={handleClick}>Bill</button>
      <br />

      {/* Bottom small text */}
      <p style={{ fontSize: "small", marginTop: "20px" }}>
        To process further, complete your profile:{" "}
        <button
          style={{
            fontSize: "small",
            color: "blue",
            textDecoration: "underline",
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
          onClick={() => navigate("/profile/edit")}
        >
          Edit Profile
        </button>
      </p>
    </div>
  );
}
