import { FC } from "react";

import { Link } from "react-router-dom";

import styles from "./Header.module.scss";

import { useAuth } from "../../hook/useAuth";
import { useFetch } from "../../hook/useFetch";
import { AdminAvatar } from "../../icons/AdminAvatar/AdminAvatar";
import { Logo } from "../../icons/Logo/Logo";
import { getFullProfile } from "../../utils/api";

export const Header: FC = () => {
  const { user } = useAuth();
  const { url } = getFullProfile(user?.id);
  const { data } = useFetch(url);

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
                {/* <img className={styles["header__user-avatar"]} src={data.profile.photo} alt='аватар' /> */}
                <img
                  className={styles["header__user-avatar"]}
                  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAd3CMwyQAR1BSCjlfllXzvrg6a4oolAe8qg&usqp=CAU'
                  alt='аватар'
                />
                <p className={styles["header__user-name"]}>{data.profile.name}</p>
              </div>
              <ul className={styles.header__nav}>
                <li>
                  <Link className={styles["header__nav-link"]} to={"./profile"}>
                    Профиль
                  </Link>
                </li>
                <li>
                  <button className={styles["header__nav-link"]}>Выйти</button>
                </li>
              </ul>
            </>
          ) : (
            <div className={styles.header__user}>
              <AdminAvatar className={styles["header__user-avatar"]} />
              <p className={styles["header__user-name"]}>{data.email}</p>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
