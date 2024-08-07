import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/auth";

function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Redirect to login or any other route if not authenticated
    return (
      <Navigate
        to=''
        replace
      />
    );
  }

  return <Outlet />; // Render the child routes if authenticated
}

export default ProtectedRoute;
