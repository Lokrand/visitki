import React, { ChangeEvent, FC, useState, useEffect } from "react";

import { EmojisList } from "./EmojisList/EmojisList";

import styles from "./ModalComments.module.scss";

import { useFetch } from "../../hook/useFetch";
import { addUserReactions, getAllComments } from "../../utils/api";

interface IModalComments {
  active: boolean;
  id: string;
  modalFor: string;
}

export const ModalComments: FC<IModalComments> = ({ active, id, modalFor }) => {
  const [commentValue, setCommentValue] = useState("");
  const [startAddNewComment, setStartAddNewComment] = useState(false);
  // const commentss = [
  //   " efqwef efwqefwef 322 23 ef qwef wq 32few f",
  //   "ew fqwef q3 f wewqefwqefqwef wefwqefwqef 23 wefwef23 ew fwqf32f ewf ",
  //   "ew fqwef q3 f wewqefwqefqwef wefwqefwqef 23 wefwef23 ew fwqf32f ewf ",
  // ];

  const { url, method } = getAllComments();
  const { data, error, loading } = useFetch(url, method);
  // console.log("Данные приходящие в модалку", data);
  let comments: any[] = [];
  let renderComment = [];
  if (data) {
    comments = data.items;
    comments = comments.filter((el) => el.to._id === id);
    for (let i = 0; i < comments.length; i++) {
      if (comments[i].target === null && modalFor === "main") {
        renderComment.push(comments[i].text);
      } else if (comments[i].target === "hobby" && modalFor === "hobby") {
        renderComment.push(comments[i].text);
      } else if (comments[i].target === "edu" && modalFor === "edu") {
        renderComment.push(comments[i].text);
      } else if (comments[i].target === "status" && modalFor === "status") {
        renderComment.push(comments[i].text);
      } else if (comments[i].target === "job" && modalFor === "job") {
        renderComment.push(comments[i].text);
      }
    }
  }

  const handleChangeComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentValue(e.target.value);
    setStartAddNewComment(true);
  };

  // useEffect(() => {
  //   function addCommentWithEnter(evt: KeyboardEvent) {
  //     if (evt.key === "Enter") {
  //       addNewComment();
  //     }
  //   }
  //   if (startAddNewComment) {
  //     document.addEventListener("keydown", addCommentWithEnter);
  //     return () => {
  //       document.removeEventListener("keydown", addCommentWithEnter);
  //     };
  //   }
  // }, [startAddNewComment]);

  const addNewComment = () => {
    const { url, method, body } = addUserReactions(id, { target: modalFor, text: commentValue });
    // useFetch(url, method, body);
    setCommentValue("");
  };

  return (
    <div
      className={
        active
          ? modalFor === "main"
            ? styles.modalComments
            : `${styles.modalComments} ${styles.modalComments__detailsPage}`
          : `${styles.modalComments} ${styles.modalComments_inactive}`
      }
    >
      <div className={styles.modalComments__comments}>
        {renderComment &&
          renderComment.map((el) => {
            return (
              <div className={styles.modalComments__comment}>
                <p>{el}</p>
              </div>
            );
          })}
      </div>
      <div className={styles.modalComments__reactionBlock}>
        <textarea
          value={commentValue}
          placeholder='Обратная связь'
          onChange={handleChangeComment}
          onMouseLeave={addNewComment}
          className={styles.modalComments__textarea}
        />
        <EmojisList id={id} modalFor={modalFor} />
      </div>
    </div>
  );
};
