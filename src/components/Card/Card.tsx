import React, { FC, useState } from "react";

import styles from "./Card.module.scss";

import { Chat } from "../UI/Chat/Chat";

interface ICard {
  name: string;
  city: string;
  img: string;
}

export const Card: FC<ICard> = ({ name, city, img }) => {
  const [modalActive, setModalActive] = useState(false);
  const handleChatClick = () => {
    setModalActive(!modalActive);
  };
  return (
    <div className={styles.card}>
      <img src={img} alt='Фотография студента' className={styles.card__image} />
      <h2 className={styles.card__name}>{name}</h2>
      <p className={styles.card__city}>{city}</p>
      <Chat forImage={true} counter={53} onClick={handleChatClick} />
    </div>
  );
};
