/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useEffect } from "react";

import styles from "./EmojisList.module.scss";

import { useFetch } from "../../../hook/useFetch";
import blackHeart from "../../../images/blackHeart.svg";
import dislike from "../../../images/dislike.svg";
import hello from "../../../images/hello.svg";
import irritation from "../../../images/irritation.svg";
import laugh from "../../../images/laugh.svg";
import like from "../../../images/like.svg";
import love from "../../../images/love.svg";
import sad from "../../../images/sad.svg";
import shock from "../../../images/shock.svg";
import smile from "../../../images/smile.svg";
import { getFullProfile } from "../../../utils/api";
import { splitEmojis } from "../../../utils/splitEmojis";

interface IEmojisList {
  id: string;
  modalFor: string;
}

export const EmojisList: FC<IEmojisList> = ({ id, modalFor }) => {
  const { url, method } = getFullProfile(id);
  const { data, loading, error } = useFetch(url, method);
  let counter;
  if (data) {
    if (modalFor === "main") {
      counter = data.reactions;
    } else if (modalFor === "hobby") {
      counter = data.info.hobby.reactions;
    } else if (modalFor === "edu") {
      counter = data.info.edu.reactions;
    } else if (modalFor === "status") {
      counter = data.info.status.reactions;
    } else if (modalFor === "job") {
      counter = data.info.job.reactions;
    }
  }
  let countArr: number[] = [];

  if (counter > 10) {
    countArr = splitEmojis(counter);
  }

  return (
    <div className={styles.emojis}>
      <div
        className={
          counter || countArr[0] > 0 ? `${styles.emojis__like} ${styles.emojis__like_active}` : styles.emojis__like
        }
      >
        <img src={like} alt='Лайк' />
        {counter || countArr[0] > 0 ? (
          <p className={styles.emojis__counter}>{counter < 10 ? counter : countArr[0]}</p>
        ) : null}
      </div>
      <div className={countArr[1] ? `${styles.emojis__like} ${styles.emojis__like_active}` : styles.emojis__like}>
        <img src={dislike} alt='Дизлайк' />
        <p className={styles.emojis__counter}>{countArr[1]}</p>
      </div>
      <div className={countArr[2] ? `${styles.emojis__like} ${styles.emojis__like_active}` : styles.emojis__like}>
        <img src={hello} alt='Привет' />
        <p className={styles.emojis__counter}>{countArr[2]}</p>
      </div>
      <div className={countArr[3] ? `${styles.emojis__like} ${styles.emojis__like_active}` : styles.emojis__like}>
        <img src={smile} alt='Улыбка' />
        <p className={styles.emojis__counter}>{countArr[3]}</p>
      </div>
      <div className={countArr[4] ? `${styles.emojis__like} ${styles.emojis__like_active}` : styles.emojis__like}>
        <img src={sad} alt='Грусть' />
        <p className={styles.emojis__counter}>{countArr[4]}</p>
      </div>
      <div className={countArr[5] ? `${styles.emojis__like} ${styles.emojis__like_active}` : styles.emojis__like}>
        <img src={laugh} alt='Смех' />
        <p className={styles.emojis__counter}>{countArr[5]}</p>
      </div>
      <div className={countArr[6] ? `${styles.emojis__like} ${styles.emojis__like_active}` : styles.emojis__like}>
        <img src={irritation} alt='Раздражение' />
        <p className={styles.emojis__counter}>{countArr[6]}</p>
      </div>
      <div className={countArr[7] ? `${styles.emojis__like} ${styles.emojis__like_active}` : styles.emojis__like}>
        <img src={shock} alt='Удивление' />
        <p className={styles.emojis__counter}>{countArr[7]}</p>
      </div>
      <div className={countArr[8] ? `${styles.emojis__like} ${styles.emojis__like_active}` : styles.emojis__like}>
        <img src={love} alt='Любовь' />
        <p className={styles.emojis__counter}>{countArr[8]}</p>
      </div>
      <div className={countArr[9] ? `${styles.emojis__like} ${styles.emojis__like_active}` : styles.emojis__like}>
        <img src={blackHeart} alt='Чёрное сердце' />
        <p className={styles.emojis__counter}>{countArr[9]}</p>
      </div>
    </div>
  );
};
