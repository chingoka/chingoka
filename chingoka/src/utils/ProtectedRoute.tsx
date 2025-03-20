// import { Navigate, Outlet } from "react-router-dom";

// export default function ProtectedRoute() {
//   const token = sessionStorage.getItem("token");

//   return token ? <Outlet /> : <Navigate to="/login" replace />;
// }

import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const token = sessionStorage.getItem("token");
  const userRole = sessionStorage.getItem("role");

  if (!token) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(userRole!)) {
    // Redirect to unauthorized page if role does not match
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
