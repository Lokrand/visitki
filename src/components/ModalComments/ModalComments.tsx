import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import React, { FC, useState } from "react";

import styles from "./ModalComments.module.scss";

interface IModalComments {
  active: boolean;
}

export const ModalComments: FC<IModalComments> = ({ active }) => {
  const [text, setText] = useState("");

  function handleOnEnter(text: string) {
    console.log("enter", text);
  }
  return (
    <div className={active ? styles.modalComments : `${styles.modalComments} ${styles.modalComments_inactive}`}>
      <input />
      <Picker data={data} onEmojiSelect={handleOnEnter} />
    </div>
  );
};
