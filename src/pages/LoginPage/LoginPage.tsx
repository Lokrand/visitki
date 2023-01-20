import { FC, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import styles from "./loginpage.module.scss";

import { Button } from "../../components/UI/Button";
import { Title } from "../../components/UI/Title";
import { useAuth } from "../../hook/useAuth";
import { useLocalStorage } from "../../hook/useLocalStorage";
import { ADMIN_ROUTE, MAIN_ROUTE } from "../../utils/constants";
import { TInitialUserData } from "../../utils/types";

export const LoginPage: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loginUser } = useAuth();
  const fromPath: string = location.state?.from?.pathname || MAIN_ROUTE;
  const [fromPage] = useLocalStorage(fromPath, "from");

  const token = location.hash.split("&")[0].split("=")[1] || null;
  const initialUserData: TInitialUserData = {
    isLogin: false,
    id: "e638ad9bce6d7efd1b5b035b",
    role: "student",
    token: null,
  };

  useEffect(() => {
    if (user?.isLogin) navigate(user.role === "student" ? MAIN_ROUTE : ADMIN_ROUTE, { replace: true });

    if (token) {
      initialUserData.isLogin = true;
      initialUserData.token = token;
      loginUser(initialUserData, () =>
        navigate(fromPage || user?.role === "student" ? MAIN_ROUTE : ADMIN_ROUTE, { replace: true }),
      );
      localStorage.removeItem("from");
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
