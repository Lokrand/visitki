import React, { FC } from "react";

import { EmojisList } from "./EmojisList/EmojisList";

import styles from "./ModalComments.module.scss";

import { useFetch } from "../../hook/useFetch";
import { getAllComments } from "../../utils/api";
import { TComment } from "../../utils/types";
import { TextareaNewComment } from "../UI/TextareaNewComment/TextareaNewComment";

interface IModalComments {
  active: boolean;
  id: string;
  modalFor: string;
}

export const ModalComments: FC<IModalComments> = ({ active, id, modalFor }) => {
  const { url } = getAllComments();
  const { data } = useFetch(url);

  let comments: TComment[] = [];
  let renderComment: string[] = [];

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
          renderComment.map((el, index) => {
            return (
              <div key={index} className={styles.modalComments__comment}>
                <p>{el}</p>
              </div>
            );
          })}
      </div>
      <div className={styles.modalComments__reactionBlock}>
        <TextareaNewComment modalFor={modalFor} id={id} />
        <EmojisList id={id} modalFor={modalFor} />
      </div>
    </div>
  );
};
