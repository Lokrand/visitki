import { FC } from "react";

import styles from "./Header.module.scss";

import { useAuth } from "../../hook/useAuth";
import { useFetch } from "../../hook/useFetch";
import { Logo } from "../../icons/Logo/Logo";
import { getFullProfile } from "../../utils/api";

export const Header: FC = () => {
  const { user } = useAuth();
  const { url, method } = getFullProfile(user?.id);
  const { data } = useFetch(url, method);

  return (
    <header className={styles.header}>
      <Logo className={styles.header__logo} />
      {data !== null && (
        <div className={styles.user}>
          <img className={styles.user__avatar} src={data.profile.photo} alt='аватар' />
          <p className={styles.user__name}>{data.profile.name}</p>
        </div>
      )}
    </header>
  );
};
