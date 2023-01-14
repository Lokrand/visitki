import React, { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import styles from "./loginpage.module.scss";

import { useAuth } from "../../hook/useAuth";
import { MAIN_ROUTE } from "../../utils/constants";

export const LoginPage: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const fromPage = location.state?.from?.pathname || MAIN_ROUTE;

  const fakeUser = { name: "Igor", email: "test@yandex.ru" };

  const fakeHandlerLogin = () => {
    loginUser(fakeUser, () => navigate(fromPage, { replace: true }));
  };

  return (
    <>
      <h1>С кем я учусь?</h1>
      <button onClick={fakeHandlerLogin}>Войти с Яндекс ID</button>
    </>
  );
};
