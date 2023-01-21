import { FC, useState, useEffect } from "react";

import styles from "./Post.module.scss";

import { ModalComments } from "../../ModalComments/ModalComments";
import { Chat } from "../Chat/Chat";
import { Text } from "../Text";
import { Title } from "../Title";

interface IPostProps {
  id: string;
  modalFor: string;
  title: string;
  imgUrl?: string;
  text: string;
  reactions: number;
}

export const Post: FC<IPostProps> = ({ id, modalFor, title, imgUrl, text, reactions }) => {
  const [modalActive, setModalActive] = useState(false);
  const openModal = () => {
    setModalActive(!modalActive);
  };
  const closeModal = () => {
    setModalActive(false);
  };

  useEffect(() => {
    function closeByEscape(evt: KeyboardEvent) {
      if (evt.key === "Escape") {
        closeModal();
      }
    }
    if (modalActive) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [modalActive, closeModal]);
  return (
    <article className={styles.post} onMouseLeave={closeModal}>
      <div className={styles["post__border-top"]}></div>
      <div className={styles.post__counter}>
        <Chat forImage={false} counter={reactions} onClick={openModal} />
      </div>
      <ModalComments id={id} active={modalActive} modalFor={modalFor} />
      <Title size='m'>{title}</Title>
      {imgUrl && <img className={styles.post__img} src={imgUrl} alt={title} />}
      <Text>{text}</Text>
    </article>
  );
};
