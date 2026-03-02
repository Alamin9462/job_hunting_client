import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

const AdminProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const role = useAppSelector((state) => state.auth.role);

  if (role !== "admin") {
    // not allowed, send to home or login
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;
