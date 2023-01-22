import React, { ChangeEvent, FC, useState } from "react";

import styles from "./TextareaNewComment.module.scss";

import { useMutation } from "../../../hook/useFetch";
import { PROFILES_URL } from "../../../utils/constants";

interface ITextareaNewComment {
  modalFor: string;
  id: string;
}

export const TextareaNewComment: FC<ITextareaNewComment> = ({ modalFor, id }) => {
  const [commentValue, setCommentValue] = useState("");
  const { handleRequest } = useMutation();

  const handleChangeComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentValue(e.target.value);
  };

  const addNewComment = () => {
    handleRequest(`${PROFILES_URL}/${id}/reactions`, "POST", { target: modalFor, text: commentValue });
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
