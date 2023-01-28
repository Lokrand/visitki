import { FC, useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import styles from "./DetailPageStyles.module.scss";

import { ModalComments } from "../../components/ModalComments/ModalComments";
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
  const { url } = getFullProfile(idUser);
  const { data, error, isloading } = useFetch(url);
  const [modalActive, setModalActive] = useState(false);
  useTheme(data?.profile.template || "romantic");

  const openModal = () => {
    setModalActive(!modalActive);
  };

  const closeModal = () => {
    setModalActive(false);
  };

  if (isloading) return <h1>Идет загрузка данных...</h1>;
  if (error) return <h1>Пользователь не найден</h1>;

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
            <div className={styles["photo-conteiner"]} onMouseLeave={closeModal}>
              <img
                className={styles.photo}
                src={data?.profile.photo}
                alt={`Фотография пользователя ${data?.profile.name}`}
              />
              <div className={styles.counter}>
                <Chat forImage={false} counter={data?.reactions || 0} onClick={openModal} />
              </div>
              <ModalComments
                modalActive={modalActive}
                closeModal={closeModal}
                active={modalActive}
                id={data?._id}
                modalFor='DetailsImage'
              />
            </div>
            {data?.profile.quote === "" && (
              <p className={styles.quote}>
                <Marks />
                <span>Делай, что должно и будь, что будет.</span>
              </p>
            )}
          </div>
        </div>
        <ul className={styles["post-list"]}>
          <li>
            <Post
              closeModal={closeModal}
              id={data?._id}
              modalFor='hobby'
              title='Увлечения'
              text={data?.info.hobby.text || ""}
              imgUrl={data?.info.hobby.image}
              reactions={data?.info.hobby.reactions || 0}
            />
          </li>
          <li>
            <Post
              closeModal={closeModal}
              id={data?._id}
              modalFor='status'
              title='Семья'
              text={data?.info.status.text || ""}
              imgUrl={data?.info.status.image}
              reactions={data?.info.status.reactions || 0}
            />
          </li>
          <li>
            <Post
              closeModal={closeModal}
              id={data?._id}
              modalFor='job'
              title='Cфера'
              text={data?.info.job.text || ""}
              imgUrl={data?.info.job.image}
              reactions={data?.info.job.reactions || 0}
            />
          </li>
          <li>
            <Post
              closeModal={closeModal}
              id={data?._id}
              modalFor='edu'
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
