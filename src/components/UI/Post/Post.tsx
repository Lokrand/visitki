import { FC, useState } from "react";

import styles from "./Post.module.scss";

import { Modal } from "../../Modal/Modal";
import { ModalComments } from "../../ModalComments/ModalComments";
import { Chat } from "../Chat/Chat";
import { Text } from "../Text";
import { Title } from "../Title";

interface IPostProps {
  closeModal: any;
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

  return (
    <article className={styles.post} onMouseLeave={closeModal}>
      <div className={styles["post__border-top"]}></div>
      <div className={styles.post__counter}>
        <Chat forImage={false} counter={reactions} onClick={openModal} />
      </div>
      <ModalComments
        modalActive={modalActive}
        closeModal={closeModal}
        id={id}
        active={modalActive}
        modalFor={modalFor}
      />
      <Title size='m'>{title}</Title>
      {imgUrl && <img className={styles.post__img} src={imgUrl} alt={title} />}
      <Text>{text}</Text>
    </article>
  );
};
