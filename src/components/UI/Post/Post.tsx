import { FC, useState } from "react";

import styles from "./Post.module.scss";

import { Chat } from "../Chat/Chat";
import { Text } from "../Text";
import { Title } from "../Title";

interface IPostProps {
  title: string;
  imgUrl?: string;
  text: string;
  reactions: number;
}

export const Post: FC<IPostProps> = ({ title, imgUrl, text, reactions }) => {
  const openModal = () => {
    console.log("Модальное окно открыто!");
  };

  return (
    <article className={styles.post}>
      <div className={styles["post__border-top"]}></div>
      <div className={styles.post__counter}>
        <Chat forImage={false} counter={reactions} onClick={openModal} />
      </div>
      <Title size='m'>{title}</Title>
      {imgUrl && <img className={styles.post__img} src={imgUrl} alt={title} />}
      <Text>{text}</Text>
    </article>
  );
};
