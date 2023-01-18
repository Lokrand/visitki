import { FC, useEffect } from "react";

import headerStyles from "./Header.module.scss";

import { useFetch } from "../../hook/useFetch";
import { Logo } from "../../icons/Logo/Logo";
import { getFullProfile } from "../../utils/api";
export const Header: FC = () => {
  useEffect(() => {
    localStorage.setItem("userId", "abfccdaa23e0bd1c4448d2f3");
  }, []);
  const userId = localStorage.getItem("userId");
  console.log(userId);
  const { url, method } = getFullProfile(userId);
  const { data, error, loading } = useFetch(url, method);

  return (
    <section className={headerStyles.header}>
      <Logo className={headerStyles.header__logo} />
      {data !== null && (
        <div className={headerStyles.user}>
          <img src={data.profile.photo} alt='аватар' className={headerStyles.user__avatar} />
          <p className={headerStyles.user__name}>{data.profile.name}</p>
        </div>
      )}
    </section>
  );
};
