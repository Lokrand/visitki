import React, { FC } from "react";

import styles from "./Chat.module.scss";

import { ChatIcon } from "../../../icons/Chat/ChatIcon";

interface IChat {
  forImage: boolean;
  counter: number;
  onClick: VoidFunction;
}

export const Chat: FC<IChat> = ({ forImage, counter, onClick }) => {
  return (
    <div className={forImage ? styles.chat : `${styles.chat} ${styles.chat_hobbies}`} onClick={onClick}>
      <ChatIcon />
      {counter > 0 ? (
        <div className={counter > 99 ? `${styles.chat__counter} ${styles.chat__counter_long}` : styles.chat__counter}>
          <p>{counter > 99 ? "99+" : counter}</p>
        </div>
      ) : null}
    </div>
  );
};
