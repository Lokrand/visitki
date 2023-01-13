import React from "react";
import { useLocation } from "react-router-dom";

import classes from "./loginpage.module.scss";

import { MAIN_ROUTE } from "../../utils/constants";

export const LoginPage: React.FC = () => {
  const location = useLocation();

  const fromPage = location.state?.from?.pathname || MAIN_ROUTE;

  return <h1>Login Page: {fromPage}</h1>;
};
