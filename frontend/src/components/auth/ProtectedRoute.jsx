import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ allowedRole }) {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  if (!user || !token) return <Navigate to="/login" replace />;
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to={user.role === "Admin" ? "/admin" : "/dashboard"} replace />;
  }
  return <Outlet />;
}
