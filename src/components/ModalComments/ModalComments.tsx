import React, { ChangeEvent, FC, useState, useEffect } from "react";

import { EmojisList } from "./EmojisList/EmojisList";

import styles from "./ModalComments.module.scss";
interface IModalComments {
  active: boolean;
}

export const ModalComments: FC<IModalComments> = ({ active }) => {
  const [commentValue, setCommentValue] = useState("");
  const [startAddNewComment, setStartAddNewComment] = useState(false);
  const comments = [
    " efqwef efwqefwef 322 23 ef qwef wq 32few f",
    "ew fqwef q3 f wewqefwqefqwef wefwqefwqef 23 wefwef23 ew fwqf32f ewf ",
  ];

  const handleChangeComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentValue(e.target.value);
    setStartAddNewComment(true);
  };

  const createNewComment = () => {
    comments.push(commentValue);
  };

  useEffect(() => {
    function addCommentWithEnter(evt: KeyboardEvent) {
      if (evt.key === "Enter") {
        createNewComment();
      }
    }
    if (startAddNewComment) {
      document.addEventListener("keydown", addCommentWithEnter);
      return () => {
        document.removeEventListener("keydown", addCommentWithEnter);
      };
    }
  }, [startAddNewComment]);

  return (
    <div className={active ? styles.modalComments : `${styles.modalComments} ${styles.modalComments_inactive}`}>
      {comments &&
        comments.map((el) => {
          return (
            <div className={styles.modalComments__comment}>
              <p>{el}</p>
            </div>
          );
        })}
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
