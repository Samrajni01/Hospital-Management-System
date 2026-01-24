import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./home.jsx";
import { useLocation } from "react-router-dom";

function HomeWrapper() {
  const location = useLocation();
  const userId = location.state?.userId || "unknown"; // fallback
  return <Home userId={userId} />;
}
import DoctorHome from "./Doctorhome.jsx";


function DoctorHomeWrapper() {
  const location = useLocation();
  const doctorId = location.state?.doctorId || "unknown"; // fallback if not passed
  return <DoctorHome doctorId={doctorId} />;
}
















import Login from "../Modules/users/login.jsx";
import Register from "../Modules/auth/register.jsx";



import UserProfile from "../Modules/users/userProfile.jsx";
import UserEdit from "../Modules/users/userEdit.jsx";

import DoctorList from "../Modules/doctors/doctorslist.jsx";
import DoctorProfile from "../Modules/doctors/doctorsProfile.jsx";
import AddDoctor from "../Modules/doctors/addDoctor.jsx";

import AdminDoctorList from "../Modules/doctors/admindoctor.jsx";
import EditDoctor from "../Modules/doctors/updateDoctor.jsx";

import AddAppointment from "../Modules/appointments/addAppoint.jsx";
import DoctorAppointments from "../Modules/appointments/doctor.appoint.jsx";
import PatientAppointments from "../Modules/appointments/patient.Appoint.jsx";
import AddPatient from "../Modules/patients/addpatient.jsx";
import PatientList from "../Modules/patients/admin.patient.jsx";
import PatientDetails from "../Modules/patients/searchPatient.jsx";
import EditPatient from "../Modules/patients/editPatient.jsx";

import AddReport from "../Modules/reports/addreport.jsx";
import ReportDetails from "../Modules/reports/reportdetails.jsx";
import UpdateReport from "../Modules/reports/updateReport.jsx";
import CancelAppointmentPage  from "../Modules/appointments/cancel.jsx";
import MyReports from "../Modules/reports/MyReports.jsx";

import HaveBill from "../Modules/bills/billList.jsx";











function App() {
  return (
    <Routes>
      {/* default */}
      <Route path="/" element={<Navigate to="/register" />} />

      {/* public */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/doctors" element={<DoctorList />} />
      <Route path="/doctor-profile" element={<DoctorProfile />} />
      <Route path="/appointments/add" element={<AddAppointment />} />
      <Route path="/doctor/appointments" element={<DoctorAppointments />} />
<Route path="/appointments/my" element={<PatientAppointments />} />
<Route path="/patient/add" element={<AddPatient />} />
<Route path="/admin/patients" element={<PatientList />} />
<Route path="/patient-profile/:id" element={<PatientDetails />} />
<Route path="/my-profile/:id/edit" element={<EditPatient />} />

<Route path="/reports/add" element={<AddReport />} />
<Route path="/reports/:id" element={<ReportDetails />} />
<Route path="/reports/:id/edit" element={<UpdateReport />} />
<Route path="/cancel/:id/" element={<CancelAppointmentPage  />} />

<Route path="/doctor/home" element={<DoctorHomeWrapper />}/>
<Route path="/my-reports"  element={<MyReports />}/>
<Route path="/mybill" element={<HaveBill/>}/>



<Route path="/home" element={<HomeWrapper />} />

      {/* logged-in users */}
      <Route
        path="/user-profile"
        element={
          
            <UserProfile />
          
        }
      />

      <Route
        path="/profile/edit"
        element={
         // <Protected>
            <UserEdit />
          //</Protected>
        }
      />

      {/* DOCTOR only */}
      <Route
        path="/doctor/apply"
        element={
          
            <AddDoctor />
        
        }
      />

      {/* ADMIN only */}
      <Route
        path="/admin/doctors"
        element={
         // <RoleProtected allowedRoles={["admin"]}>
            <AdminDoctorList />
          //</RoleProtected>
        }
      />

      <Route
        path="/admin/doctors/:id/edit"
        element={
          
            <EditDoctor />
        
        }
      />
    </Routes>
  );
}

export default App;
