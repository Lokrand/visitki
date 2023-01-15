import { FC, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import styles from "./loginpage.module.scss";

import { Button } from "../../components/UI/Button";
import { Title } from "../../components/UI/Title";
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

  const handlerLogin = () => {
    window.location.href =
      "https://oauth.yandex.ru/authorize?response_type=token&client_id=cfa419b389d2459a8c19d502eba6df11";
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <Title size='xl'>С кем я учусь?</Title>
      </div>
      <Button size='l' handlerClick={handlerLogin}>
        Войти с Яндекс ID
      </Button>
    </div>
  );
};
