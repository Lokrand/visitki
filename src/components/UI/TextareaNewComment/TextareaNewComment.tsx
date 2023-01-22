import React, { ChangeEvent, FC, useState } from "react";

import styles from "./TextareaNewComment.module.scss";

import { PROFILES_URL } from "../../../utils/constants";
import { useMutation } from "../../../hook/useMutation";

interface ITextareaNewComment {
  modalFor: string;
  id: string;
}

export const TextareaNewComment: FC<ITextareaNewComment> = ({ modalFor, id }) => {
  const [commentValue, setCommentValue] = useState("");

  const { mutationData } = useMutation();

  const handleChangeComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentValue(e.target.value);
  };

  const addNewComment = () => {
    mutationData(`${PROFILES_URL}/${id}/reactions`, "POST", { target: modalFor, text: commentValue });
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
