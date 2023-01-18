import React, { ChangeEvent, FC, useState } from "react";

import { EmojisList } from "./EmojisList/EmojisList";

import styles from "./ModalComments.module.scss";
interface IModalComments {
  active: boolean;
}

export const ModalComments: FC<IModalComments> = ({ active }) => {
  const [commentValue, setCommentValue] = useState("");

  const handleChangeComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentValue(e.target.value);
  };

  return (
    <div className={active ? styles.modalComments : `${styles.modalComments} ${styles.modalComments_inactive}`}>
      <div className={styles.modalComments__reactionBlock}>
        <textarea
          value={commentValue}
          placeholder='Обратная связь'
          onChange={handleChangeComment}
          className={styles.modalComments__textarea}
        />
        <EmojisList counter={20} />
      </div>
    </div>
  );
};
