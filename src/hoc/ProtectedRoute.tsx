import React from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";

import { useAuth } from "../hook/useAuth";

import { LOGIN_ROUTE } from "../utils/constants";

export const ProtectedRoute: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={LOGIN_ROUTE} state={{ from: location }} />;
  }

  return <Outlet />;
};
