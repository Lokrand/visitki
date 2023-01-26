import React, { FC } from "react";

import { useNavigate } from "react-router";

import styles from "./FrameComment.module.scss";

import { useFetch } from "../../hook/useFetch";
import { Delete } from "../../icons/Delete/Delete";
import { getAllUsers } from "../../utils/api";
import { TUser } from "../../utils/types";
interface ICommentFrame {
  id: string;
  userId: string;
  commentDate: string;
  from: string;
  to: string;
  target: string | undefined;
  text: string;
  handleDelete: (id: string) => void;
}

export const CommentFrame: FC<ICommentFrame> = ({ id, userId, commentDate, from, to, target, text, handleDelete }) => {
  const { url } = getAllUsers();
  const { data, error, isloading } = useFetch(url);
  const navigate = useNavigate();
  let user: TUser[];
  let cohort = "";
  if (data) {
    user = data.items.filter((el: TUser) => el._id === userId);
    cohort = user[0].cohort;
  }

  const handleRedirectOnCohortPage = () => {
    navigate(`cohort/${cohort}`);
  };

  return (
    <div className={styles.frames}>
      <p className={`${styles.frame} ${styles.frame_active}`} onClick={handleRedirectOnCohortPage}>
        {cohort}
      </p>
      <p className={`${styles.frame}`}>{commentDate}</p>
      <p className={`${styles.frame}`}>{from}</p>
      <p className={`${styles.frame}`}>{to}</p>
      <p className={`${styles.frame}`}>{target}</p>
      <p className={`${styles.frame}`}>{text}</p>
      <span onClick={() => handleDelete(id)}>
        <Delete />
      </span>
    </div>
  );
};
