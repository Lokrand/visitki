/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useEffect, useState } from "react";

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
  const { url } = getFullProfile(id);
  const { data } = useFetch(url);
  let counter: number = 0;
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
    } else if (modalFor === "DetailsImage") {
      counter = data.reactions;
    }
  }
  let countArr: number[] = [];

  const [likeCount, setLikeCount] = useState(0);
  const [likeActive, setLikeActive] = useState(false);
  const [disLikeCount, setDisLikeCount] = useState(0);
  const [disLikeActive, setDisLikeActive] = useState(false);
  const [helloCount, setHelloCount] = useState(0);
  const [helloActive, setHelloActive] = useState(false);
  const [smileCount, setSmileCount] = useState(0);
  const [smileActive, setSmileActive] = useState(false);
  const [sadCount, setSadCount] = useState(0);
  const [sadActive, setSadActive] = useState(false);
  const [laughCount, setLaughCount] = useState(0);
  const [laughActive, setLaughActive] = useState(false);
  const [irritationCount, setIrritationCount] = useState(0);
  const [irritationActive, setIrritationActive] = useState(false);
  const [shockCount, setShockCount] = useState(0);
  const [shockActive, setShockActive] = useState(false);
  const [loveCount, setLoveCount] = useState(0);
  const [loveActive, setLoveActive] = useState(false);
  const [blackHeartCount, setBlackHeartCount] = useState(0);
  const [blackHeartActive, setBlackHeartActive] = useState(false);

  if (counter > 10) {
    countArr = splitEmojis(counter);
  }
  useEffect(() => {
    if (counter < 10) {
      setLikeCount(counter);
    }
  }, [counter]);
  useEffect(() => {
    if (countArr.length > 0) {
      setLikeCount(countArr[0]);
      setDisLikeCount(countArr[1]);
      setHelloCount(countArr[2]);
      setSmileCount(countArr[3]);
      setSadCount(countArr[4]);
      setLaughCount(countArr[5]);
      setIrritationCount(countArr[6]);
      setShockCount(countArr[7]);
      setLoveCount(countArr[8]);
      setBlackHeartCount(countArr[9]);
    }
  }, [countArr]);

  const handleLikeClick = () => {
    setLikeCount(likeCount + 1);
    setLikeActive(true);
  };
  const handleActiveLikeClick = () => {
    setLikeCount(likeCount - 1);
    setLikeActive(false);
  };
  const handleDisLikeClick = () => {
    setDisLikeCount(disLikeCount + 1);
    setDisLikeActive(true);
  };
  const handleActiveDisLikeClick = () => {
    setDisLikeCount(disLikeCount - 1);
    setDisLikeActive(false);
  };
  const handleHelloClick = () => {
    setHelloCount(helloCount + 1);
    setHelloActive(true);
  };
  const handleActiveHelloClick = () => {
    setHelloCount(helloCount - 1);
    setHelloActive(false);
  };
  const handleSmileClick = () => {
    setSmileCount(smileCount + 1);
    setSmileActive(true);
  };
  const handleActiveSmileClick = () => {
    setSmileCount(smileCount - 1);
    setSmileActive(false);
  };
  const handleSadClick = () => {
    setSadCount(sadCount + 1);
    setSadActive(true);
  };
  const handleActiveSadClick = () => {
    setSadCount(sadCount - 1);
    setSadActive(false);
  };
  const handleLaughClick = () => {
    setLaughCount(laughCount + 1);
    setLaughActive(true);
  };
  const handleActiveLaughClick = () => {
    setLaughCount(laughCount - 1);
    setLaughActive(false);
  };
  const handleIrritationClick = () => {
    setIrritationCount(irritationCount + 1);
    setIrritationActive(true);
  };
  const handleActiveIrritationClick = () => {
    setIrritationCount(irritationCount - 1);
    setIrritationActive(false);
  };
  const handleShockClick = () => {
    setShockCount(shockCount + 1);
    setShockActive(true);
  };
  const handleActiveShockClick = () => {
    setShockCount(shockCount - 1);
    setShockActive(false);
  };
  const handleLoveClick = () => {
    setLoveCount(loveCount + 1);
    setLoveActive(true);
  };
  const handleActiveLoveClick = () => {
    setLoveCount(loveCount - 1);
    setLoveActive(false);
  };
  const handleBlackHeartClick = () => {
    setBlackHeartCount(blackHeartCount + 1);
    setBlackHeartActive(true);
  };
  const handleActiveBlackHeartClick = () => {
    setBlackHeartCount(blackHeartCount - 1);
    setBlackHeartActive(false);
  };

  return (
    <div className={styles.emojis}>
      <div
        className={
          likeCount > 0
            ? likeActive
              ? `${styles.emojis__like} ${styles.emojis__like_selected}`
              : `${styles.emojis__like} ${styles.emojis__like_active}`
            : styles.emojis__like
        }
        onClick={likeActive ? handleActiveLikeClick : handleLikeClick}
      >
        <img src={like} alt='Лайк' />
        {likeCount > 0 ? <p className={styles.emojis__counter}>{likeCount}</p> : null}
      </div>

      <div
        className={
          disLikeCount > 0
            ? disLikeActive
              ? `${styles.emojis__like} ${styles.emojis__like_selected}`
              : `${styles.emojis__like} ${styles.emojis__like_active}`
            : styles.emojis__like
        }
        onClick={disLikeActive ? handleActiveDisLikeClick : handleDisLikeClick}
      >
        <img src={dislike} alt='Дизлайк' />
        {disLikeCount > 0 ? <p className={styles.emojis__counter}>{disLikeCount}</p> : null}
      </div>
      <div
        className={
          helloCount > 0
            ? helloActive
              ? `${styles.emojis__like} ${styles.emojis__like_selected}`
              : `${styles.emojis__like} ${styles.emojis__like_active}`
            : styles.emojis__like
        }
        onClick={helloActive ? handleActiveHelloClick : handleHelloClick}
      >
        <img src={hello} alt='Привет' />
        {helloCount > 0 ? <p className={styles.emojis__counter}>{helloCount}</p> : null}
      </div>
      <div
        className={
          smileCount > 0
            ? smileActive
              ? `${styles.emojis__like} ${styles.emojis__like_selected}`
              : `${styles.emojis__like} ${styles.emojis__like_active}`
            : styles.emojis__like
        }
        onClick={smileActive ? handleActiveSmileClick : handleSmileClick}
      >
        <img src={smile} alt='Улыбка' />
        {smileCount > 0 ? <p className={styles.emojis__counter}>{smileCount}</p> : null}
      </div>
      <div
        className={
          sadCount > 0
            ? sadActive
              ? `${styles.emojis__like} ${styles.emojis__like_selected}`
              : `${styles.emojis__like} ${styles.emojis__like_active}`
            : styles.emojis__like
        }
        onClick={sadActive ? handleActiveSadClick : handleSadClick}
      >
        <img src={sad} alt='Грусть' />
        {sadCount > 0 ? <p className={styles.emojis__counter}>{sadCount}</p> : null}
      </div>
      <div
        className={
          laughCount > 0
            ? laughActive
              ? `${styles.emojis__like} ${styles.emojis__like_selected}`
              : `${styles.emojis__like} ${styles.emojis__like_active}`
            : styles.emojis__like
        }
        onClick={laughActive ? handleActiveLaughClick : handleLaughClick}
      >
        <img src={laugh} alt='Смех' />
        {laughCount > 0 ? <p className={styles.emojis__counter}>{laughCount}</p> : null}
      </div>
      <div
        className={
          irritationCount > 0
            ? irritationActive
              ? `${styles.emojis__like} ${styles.emojis__like_selected}`
              : `${styles.emojis__like} ${styles.emojis__like_active}`
            : styles.emojis__like
        }
        onClick={irritationActive ? handleActiveIrritationClick : handleIrritationClick}
      >
        <img src={irritation} alt='Раздражение' />
        {irritationCount > 0 ? <p className={styles.emojis__counter}>{irritationCount}</p> : null}
      </div>
      <div
        className={
          shockCount > 0
            ? shockActive
              ? `${styles.emojis__like} ${styles.emojis__like_selected}`
              : `${styles.emojis__like} ${styles.emojis__like_active}`
            : styles.emojis__like
        }
        onClick={shockActive ? handleActiveShockClick : handleShockClick}
      >
        <img src={shock} alt='Удивление' />
        {shockCount > 0 ? <p className={styles.emojis__counter}>{shockCount}</p> : null}
      </div>
      <div
        className={
          loveCount > 0
            ? loveActive
              ? `${styles.emojis__like} ${styles.emojis__like_selected}`
              : `${styles.emojis__like} ${styles.emojis__like_active}`
            : styles.emojis__like
        }
        onClick={loveActive ? handleActiveLoveClick : handleLoveClick}
      >
        <img src={love} alt='Любовь' />
        {loveCount > 0 ? <p className={styles.emojis__counter}>{loveCount}</p> : null}
      </div>
      <div
        className={
          blackHeartCount > 0
            ? blackHeartActive
              ? `${styles.emojis__like} ${styles.emojis__like_selected}`
              : `${styles.emojis__like} ${styles.emojis__like_active}`
            : styles.emojis__like
        }
        onClick={blackHeartActive ? handleActiveBlackHeartClick : handleBlackHeartClick}
      >
        <img src={blackHeart} alt='Чёрное сердце' />
        {blackHeartCount > 0 ? <p className={styles.emojis__counter}>{blackHeartCount}</p> : null}
      </div>
    </div>
  );
};
