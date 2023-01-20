import { FC, useEffect } from "react";

import { useParams } from "react-router-dom";

import styles from "./detailpage.module.scss";

import { Chat } from "../../components/UI/Chat/Chat";
import { Post } from "../../components/UI/Post";
import { SocialLink } from "../../components/UI/SocialLink";
import { Text } from "../../components/UI/Text";
import { Title } from "../../components/UI/Title";
import { useFetch } from "../../hook/useFetch";
import { useTheme } from "../../hook/useTheme";
import { Marks } from "../../icons/Marks/Marks";
import { getFullProfile } from "../../utils/api";

export const DetailPage: FC = () => {
  const { idUser } = useParams<string>();
  const { url, method } = getFullProfile(idUser);
  const { data, error, loading } = useFetch(url, method);
  useTheme(data?.profile.template || "romantic");

  if (loading) return <h1>Идет загрузка данных...</h1>;
  if (error) return <h1>Пользователь не найден</h1>;

  const openModal = () => {
    console.log("Модальное окно открыто");
  };

  return (
    <section className={styles.container}>
      <div className={styles["main-wrapper"]}>
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
            <div className={styles["photo-conteiner"]}>
              <img
                className={styles.photo}
                src={data?.profile.photo}
                alt={`Фотография пользователя ${data?.profile.name}`}
              />
              <div className={styles.counter}>
                <Chat forImage={false} counter={data?.reactions || 0} onClick={openModal} />
              </div>
            </div>
            {data?.profile.quote === "" && (
              <p className={styles.quote}>
                <Marks />
                <span>Делай, что должно и будь, что будет.</span>
                {/* <span>{data?.profile.quote}</span> */}
              </p>
            )}
          </div>
        </div>
        <ul className={styles["post-list"]}>
          <li>
            <Post
              title='Увлечения'
              text={data?.info.hobby.text || ""}
              imgUrl={data?.info.hobby.image}
              reactions={data?.info.hobby.reactions || 0}
            />
          </li>
          <li>
            <Post
              title='Семья'
              text={data?.info.status.text || ""}
              imgUrl={data?.info.status.image}
              reactions={data?.info.status.reactions || 0}
            />
          </li>
          <li>
            <Post
              title='Cфера'
              text={data?.info.job.text || ""}
              imgUrl={data?.info.job.image}
              reactions={data?.info.job.reactions || 0}
            />
          </li>
          <li>
            <Post
              title='Учеба'
              text={data?.info.edu.text || ""}
              imgUrl={data?.info.edu.image}
              reactions={data?.info.edu.reactions || 0}
            />
          </li>
        </ul>
      </div>
    </section>
  );
};
