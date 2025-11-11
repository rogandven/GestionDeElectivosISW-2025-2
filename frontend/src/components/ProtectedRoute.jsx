

import { useAuth } from "@context/AuthContext";
import { Navigate } from "react-router-dom";


const normalizeRole = (role) => {
  if (!role) return null;
  return role.toUpperCase();
};

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const userRole = normalizeRole(user?.rol);

  if (
    allowedRoles &&
    !allowedRoles.map((r) => r.toUpperCase()).includes(userRole)
  ) {
    return <Navigate to="/home" />;
  }
  return children;
};

export default ProtectedRoute;
