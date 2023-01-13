import React from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";

import { LOGIN_ROUTE } from "../utils/constants";

interface IProtectedRouteProps {
  user: boolean; //Временно (пока не знаю какого типа будет объект)
}

export const ProtectedRoute: React.FC<IProtectedRouteProps> = ({ user }) => {
  const location = useLocation();

  if (!user) {
    return <Navigate to={LOGIN_ROUTE} state={{ from: location }} />;
  }

  return <Outlet />;
};
