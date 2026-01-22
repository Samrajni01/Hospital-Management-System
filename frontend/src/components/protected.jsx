/*import { Navigate } from "react-router-dom";
import { useAuth } from "../Modules/auth/authstore";

export default function Protected({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" replace />;

  return children;
}*/
