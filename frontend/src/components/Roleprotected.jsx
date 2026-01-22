/*import { Navigate } from "react-router-dom";
import { useAuth } from "../Modules/auth/authstore";

export default function RoleProtected({ children, allowedRoles }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}*/
