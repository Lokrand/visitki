import React, { ChangeEventHandler, FC, useState } from "react";

import styles from "./TextareaNewComment.module.scss";

import { useMutation } from "../../../hook/useMutation";
import { PROFILES_URL } from "../../../utils/constants";

interface ITextareaNewComment {
  modalFor: string;
  id: string;
}

export const TextareaNewComment: FC<ITextareaNewComment> = ({ modalFor, id }) => {
  const [commentValue, setCommentValue] = useState("");

  const { mutationData } = useMutation();

  const handleChangeComment: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
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
