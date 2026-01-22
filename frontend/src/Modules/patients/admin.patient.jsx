import  { useEffect, useState } from "react";
import { getPatientsListApi, deletePatientApi } from "./patient.api";

const PatientList = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    const res = await getPatientsListApi();
    setPatients(res.data.data);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete patient?")) return;
    await deletePatientApi(id);
    fetchPatients();
  };

  return (
    <div>
      <h2>Patients (Admin)</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th><th>Age</th><th>Gender</th><th>Blood</th><th>Phone</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(p => (
            <tr key={p._id}>
              <td>{p.fullName || p.user?.fullName}</td>
              <td>{p.age}</td>
              <td>{p.gender}</td>
              <td>{p.bloodGroup}</td>
              <td>{p.phone}</td>
              <td>
                <button onClick={() => handleDelete(p._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;
