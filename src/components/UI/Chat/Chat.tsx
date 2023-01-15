import React, { FC } from "react";

import styles from "./Chat.module.scss";

import { ChatIcon } from "../../../icons/Chat/ChatIcon";
import { Text } from "../Text";

interface IChat {
  forImage: boolean;
  counter: number;
}

export const Chat: FC<IChat> = ({ forImage, counter }) => {
  return (
    <div className={forImage ? styles.chat : `${styles.chat} ${styles.chat_hobbies}`}>
      <ChatIcon />
      {counter > 0 ? (
        <div className={counter > 99 ? `${styles.chat__counter} ${styles.chat__counter_long}` : styles.chat__counter}>
          <p>{counter > 99 ? "99+" : counter}</p>
        </div>
      ) : null}
    </div>
  );
};
