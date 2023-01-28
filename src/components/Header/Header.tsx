import { FC } from "react";

import { Link, useNavigate } from "react-router-dom";

import styles from "./Header.module.scss";

import { useAuth } from "../../hook/useAuth";
import { useFetch } from "../../hook/useFetch";
import { AdminAvatar } from "../../icons/AdminAvatar/AdminAvatar";
import { Logo } from "../../icons/Logo/Logo";
import { getFullProfile } from "../../utils/api";
import { ADMIN_ROUTE, LOGIN_ROUTE } from "../../utils/constants";

export const Header: FC = () => {
  const navigate = useNavigate();
  const { user, logoutUser } = useAuth();
  const { url } = getFullProfile(user?.id);
  const { data } = useFetch(url);

  const logout = () => {
    logoutUser(() => navigate(LOGIN_ROUTE, { replace: true }));
  };

  return (
    <header className={styles.header}>
      <Link to='/'>
        <Logo className={styles.header__logo} />
      </Link>
      {data && user?.id && (
        <div className={styles["header__nav-wrapper"]}>
          {user?.role === "student" ? (
            <>
              <div className={styles.header__user}>
                <img className={styles["header__user-avatar"]} src={data.profile.photo} alt='аватар' />
                <p className={styles["header__user-name"]}>{data.profile.name}</p>
              </div>
              <ul className={styles.header__nav}>
                <li>
                  <Link className={styles["header__nav-link"]} to={`profile/${user.id}`}>
                    Профиль
                  </Link>
                </li>
                <li>
                  <button className={styles["header__nav-link"]} onClick={logout}>
                    Выйти
                  </button>
                </li>
              </ul>
            </>
          ) : (
            <>
              <div className={styles.header__user}>
                <AdminAvatar className={styles["header__user-avatar"]} />
                <p className={styles["header__user-name"]}>{data.email}</p>
              </div>
              <ul className={styles.header__nav}>
                <li>
                  <Link className={styles["header__nav-link"]} to={ADMIN_ROUTE}>
                    Админка
                  </Link>
                </li>
                <li>
                  <button className={styles["header__nav-link"]} onClick={logout}>
                    Выйти
                  </button>
                </li>
              </ul>
            </>
          )}
        </div>
      )}
    </header>
  );
};
