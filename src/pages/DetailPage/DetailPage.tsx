import { FC } from "react";

import { useParams } from "react-router-dom";

import styles from "./DetailPage.module.scss";

import { SocialLink } from "../../components/UI/SocialLink";
import { Text } from "../../components/UI/Text";
import { Title } from "../../components/UI/Title";
import { useFetch } from "../../hook/useFetch";
import { Marks } from "../../icons/Marks/Marks";
import { getFullProfile } from "../../utils/api";

export const DetailPage: FC = () => {
  const { idUser } = useParams<string>();
  const { url, method } = getFullProfile(idUser);
  const { data, error, loading } = useFetch(url, method);

  if (loading) return <h1>Идет загрузка данных...</h1>;
  if (error) return <h1>Пользователь не найден</h1>;
  return (
    <section className={styles.container}>
      <div className={styles["top-wrapper"]}>
        <div className={styles["social-wrapper"]}>
          <Title size='xl'>{data?.profile.name}</Title>
          <div className={styles.city}>
            <Text>{data?.profile.city.name}</Text>
          </div>
          <ul className={styles["social-list"]}>
            <li>
              <SocialLink nameSocialNetwork='telegram' userName={data?.profile.telegram} />
            </li>
            <li>
              <SocialLink nameSocialNetwork='github' userName={data?.profile.github} />
            </li>
          </ul>
        </div>
        <div className={styles["photo-wrapper"]}>
          <img
            className={styles.photo}
            src={data?.profile.photo}
            alt={`Фотография пользователя ${data?.profile.name}`}
          />
          {data?.profile.quote === "" && (
            <p className={styles.quote}>
              <Marks />
              <span>Делай, что должнои будь, что будет.</span>
              {/* <span>{data?.profile.quote}</span> */}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
