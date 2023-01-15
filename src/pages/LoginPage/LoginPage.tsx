import { FC, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import styles from "./loginpage.module.scss";

import { useAuth } from "../../hook/useAuth";
import { MAIN_ROUTE } from "../../utils/constants";

export const LoginPage: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const fromPage = localStorage.getItem("fromPage") || null;
  const token = location.hash.split("&")[0].split("=")[1] || null;

  if (!fromPage) localStorage.setItem("fromPage", location.state?.from?.pathname || MAIN_ROUTE);

  useEffect(() => {
    if (token) {
      loginUser(token, () => navigate(fromPage || MAIN_ROUTE, { replace: true }));
      localStorage.removeItem("fromPage");
    }
  }, [token]);

  const fakeHandlerLogin = () => {
    window.location.href =
      "https://oauth.yandex.ru/authorize?response_type=token&client_id=cfa419b389d2459a8c19d502eba6df11";
  };

  return (
    <>
      <h1>С кем я учусь?</h1>
      <button onClick={fakeHandlerLogin}>Войти с Яндекс ID</button>
    </>
  );
};
