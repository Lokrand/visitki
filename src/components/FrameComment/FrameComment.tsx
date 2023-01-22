import React, { FC } from "react";

import styles from "./FrameComment.module.scss";

import { CrossRed } from "../../icons/CrossRed/CrossRed";

interface ICommentFrame {
  birthday: string;
  commentDate: string;
  from: string;
  to: string;
  target: any;
  text: string;
}

export const CommentFrame: FC<ICommentFrame> = ({ birthday, commentDate, from, to, target, text }) => {
  return (
    <>
      <div className={styles.frames}>
        <p className={`${styles.frame}`}>{birthday}</p>
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
