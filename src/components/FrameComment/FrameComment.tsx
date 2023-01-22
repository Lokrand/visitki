import React, { FC } from "react";

import { useNavigate } from "react-router";

import styles from "./FrameComment.module.scss";

import { useFetch } from "../../hook/useFetch";
import { CrossRed } from "../../icons/CrossRed/CrossRed";
import { getAllUsers } from "../../utils/api";

interface ICommentFrame {
  id: string;
  commentDate: string;
  from: string;
  to: string;
  target: any;
  text: string;
}

export const CommentFrame: FC<ICommentFrame> = ({ id, commentDate, from, to, target, text }) => {
  const { url } = getAllUsers();
  const { data, error, isloading } = useFetch(url);
  const navigate = useNavigate();
  let user;
  let cohort = "";
  if (data) {
    user = data.items.filter((el: any) => el._id === id);
    cohort = user[0].cohort;
  }

  const handleRedirectOnCohortPage = () => {
    navigate(`cohort/${cohort}`);
  };
  return (
    <>
      <div className={styles.frames}>
        <p className={`${styles.frame}`} onClick={handleRedirectOnCohortPage}>
          {cohort}
        </p>
        <p className={`${styles.frame}`}>{commentDate}</p>
        <p className={`${styles.frame}`}>{from}</p>
        <p className={`${styles.frame}`}>{to}</p>
        <p className={`${styles.frame}`}>{target}</p>
        <p className={`${styles.frame}`}>{text}</p>
        <CrossRed />
      </div>
    </>
  );
};
