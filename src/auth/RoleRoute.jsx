import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function RoleRoute({ permission, children }) {
	const { hasPermission } = useAuth();
	if (!permission) return children;
	return hasPermission(permission) ? children : <Navigate to="/" />;
}
