import React, { useState, FC } from "react";

import { TEmojiesId } from "..";

import styles from "../EmojisList.module.scss";

interface IEmoji {
  id: TEmojiesId;
  img: string;
  alt: string;
  counter: number;
  onClick: (id: TEmojiesId, active: boolean) => void;
}

export const Emoji: FC<IEmoji> = ({ id, img, alt, counter, onClick }) => {
  const [active, setActive] = useState(false);
  let emojiStyles: string = styles.emojis__like;
  if (counter > 0) {
    emojiStyles += " " + (active ? styles.emojis__like_selected : styles.emojis__like_active);
  }

  return (
    <div
      className={emojiStyles}
      onClick={() => {
        setActive(!active);
        onClick(id, !active);
      }}
    >
      <img src={img} alt={alt} />
      {counter > 0 && <p className={styles.emojis__counter}>{counter}</p>}
    </div>
  );
};
