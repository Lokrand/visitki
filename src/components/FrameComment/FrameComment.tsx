import React, { FC } from "react";

import styles from "./FrameComment.module.scss";

import { CrossRed } from "../../icons/CrossRed/CrossRed";

import { TComment } from "../../utils/types";

type CommentFrame = {
  comment: TComment;
};

export const CommentFrame: FC<CommentFrame> = ({ comment }) => {
  return (
    <>
      <div className={styles.frames}>
        <p className={`${styles.frame}`}>1</p>
        <p className={`${styles.frame}`}>1</p>
        <p className={`${styles.frame}`}>{comment.from.name}</p>
        <p className={`${styles.frame}`}>{comment.to.name}</p>
        <p className={`${styles.frame}`}>{comment.target}</p>
        <p className={`${styles.frame}`}>{comment.text}</p>
        <CrossRed />
      </div>
    </>
  );
};
