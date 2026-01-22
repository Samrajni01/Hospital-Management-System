import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDoctorById, updateDoctor } from "./doctor.api.jsx";

const EditDoctor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    specialization: "",
    registrationNumber: "",
    experience: "",
    availability: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDoctorById(id).then((res) => {
      const d = res.data.data;
      setForm({
        specialization: d.specialization,
        registrationNumber: d.registrationNumber,
        experience: d.experience,
        availability: d.availability.join(", "),
      });
      setLoading(false);
    });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateDoctor(id, {
      ...form,
      availability: form.availability.split(",").map((d) => d.trim()),
    });
    alert("Edited successfully!");

    navigate("/doctor-profile");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Doctor</h2>

      <input
        name="specialization"
        value={form.specialization}
        onChange={handleChange}
        placeholder="Specialization"
      />

      <input
        name="registrationNumber"
        value={form.registrationNumber}
        onChange={handleChange}
        placeholder="Registration Number"
      />

      <input
        name="experience"
        type="number"
        value={form.experience}
        onChange={handleChange}
        placeholder="Experience"
      />

      <input
        name="availability"
        value={form.availability}
        onChange={handleChange}
        placeholder="Mon, Tue, Wed"
      />

      <button type="submit">Update Doctor</button>
    </form>
  );
};

export default EditDoctor;
