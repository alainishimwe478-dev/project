import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function AdminRoute({ children }) {
  const { isAdmin } = useAuth();
  return isAdmin ? children : <Navigate to="/" />;
}
