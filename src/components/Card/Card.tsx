import React, { FC, useEffect } from "react";

import styles from "./Card.module.scss";

import { Chat } from "../UI/Chat/Chat";

interface ICard {
  name: string;
  city: string;
  img: string;
}

export const Card: FC<ICard> = ({ name, city, img }) => {
  // useEffect(() => {
  //   fetch("https://visitki.practicum-team.ru/api/profiles", {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json" },
  //   }).then((res) => console.log(res))
  // }, [])
  return (
    <div className={styles.card}>
      <img src={img} alt='Фотография студента' className={styles.card__image} />
      <h2 className={styles.card__name}>{name}</h2>
      <p className={styles.card__city}>{city}</p>
      <Chat forImage={true} counter={53} />
    </div>
  );
};
