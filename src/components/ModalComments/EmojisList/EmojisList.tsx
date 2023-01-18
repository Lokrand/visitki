import React, { FC } from "react";

import styles from "./EmojisList.module.scss";

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

interface IEmojisList {
  counter: number;
}

export const EmojisList: FC<IEmojisList> = ({ counter }) => {
  console.log(counter);
  return (
    <div className={styles.emojis}>
      <img src={like} alt='Лайк' />
      <img src={dislike} alt='Дизлайк' />
      <img src={hello} alt='Привет' />
      <img src={smile} alt='Улыбка' />
      <img src={sad} alt='Грусть' />
      <img src={laugh} alt='Смех' />
      <img src={irritation} alt='Раздражение' />
      <img src={shock} alt='Удивление' />
      <img src={love} alt='Любовь' />
      <img src={blackHeart} alt='Чёрное сердце' />
    </div>
  );
};
