import { Navigate } from "react-router-dom";
import { getRole } from "../utils/auth";

export default function UserRoute({ children }) {
  return getRole() === "Admin" ? children : <Navigate to="/login" replace />;
}
