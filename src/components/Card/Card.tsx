import React, { FC, useState } from "react";

import styles from "./Card.module.scss";

import { ModalComments } from "../ModalComments/ModalComments";
import { Chat } from "../UI/Chat/Chat";

interface ICard {
  name: string;
  city: string;
  img: string;
}

export const Card: FC<ICard> = ({ name, city, img }) => {
  const [modalCommentsActive, setModalCommentsActive] = useState(false);
  const [hoverActive, setHoverActive] = useState(false);
  const handleChatClick = () => {
    setModalCommentsActive(!modalCommentsActive);
  };

  const handleMouseEnter = () => {
    setHoverActive(true);
  };

  const handleMouseLeave = () => {
    setHoverActive(false);
    setModalCommentsActive(false);
  };
  return (
    <>
      <div className={styles.card} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <img
          src={img}
          alt='Фотография студента'
          className={hoverActive ? `${styles.card__image} ${styles.card__image_active}` : styles.card__image}
        />
        <h2 className={hoverActive ? `${styles.card__name} ${styles.card__name_active}` : styles.card__name}>{name}</h2>
        <p className={styles.card__city}>{city}</p>
        {hoverActive && <Chat forImage={true} counter={53} onClick={handleChatClick} />}
        <ModalComments active={modalCommentsActive} />
      </div>
    </>
  );
};
