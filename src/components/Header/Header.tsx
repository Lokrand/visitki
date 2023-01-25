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
  console.log(user?.id);
  console.log(data);
  return (
    <header className={styles.header}>
      <Link to='/'>
        <Logo className={styles.header__logo} />
      </Link>
      {data !== null && (
        <div className={styles.user}>
          {user?.role === "student" ? (
            <Link to={`profile/${user?.id}`} className={styles.link}>
              <img className={styles.user__avatar} src={data.profile.photo} alt='аватар' />
              <p className={styles.user__name}>{data.profile.name}</p>
            </Link>
          ) : (
            <Link to={"/admin"} className={styles.link}>
              <AdminAvatar className={styles.user__avatar} />
              <p className={styles.user__name}>{data.email}</p>
            </Link>
          )}
        </div>
      )}
    </header>
  );
};
