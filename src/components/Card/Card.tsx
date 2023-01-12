import React, { FC } from "react";
import styles from "./Card.module.scss";

interface ICard {
  name: string;
  city: string;
  img: string;
}

export const Card: FC<ICard> = ({ name, city, img }) => {
  return (
    <div className={styles.card}>
      <img src={img} alt='' className={styles.card__image} />
      <h2>{name}</h2>
      <p>{city}</p>
    </div>
  );
};
