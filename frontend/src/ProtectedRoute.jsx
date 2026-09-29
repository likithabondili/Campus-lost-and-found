import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, adminOnly = false }) {
  const userId = localStorage.getItem("userId");
  const userRole = localStorage.getItem("userRole");

  if (!userId) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && userRole !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;