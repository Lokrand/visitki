import React, { ChangeEvent, FC, useState } from "react";

import styles from "./TextareaNewComment.module.scss";

import { useFetch } from "../../../hook/useFetch";
import { addUserReactions } from "../../../utils/api";

interface ITextareaNewComment {
  modalFor: string;
  id: string;
}

export const TextareaNewComment: FC<ITextareaNewComment> = ({ modalFor, id }) => {
  const [commentValue, setCommentValue] = useState("");

  const { url, method, body } = addUserReactions(id, { target: modalFor, text: commentValue });
  useFetch(url, method, body);

  const handleChangeComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentValue(e.target.value);
  };

  const addNewComment = () => {
    setCommentValue("");
  };

  return (
    <textarea
      value={commentValue}
      placeholder='Обратная связь'
      onChange={handleChangeComment}
      onMouseLeave={addNewComment}
      className={styles.TextareaNewComment}
    />
  );
};
