import React, { FC } from "react";

import styles from "./FrameStudent.module.scss";

import { TUser } from "../../utils/types";

type StudentFrame = {
  student: TUser;
};

export const StudentFrame: FC<StudentFrame> = ({ student }) => {
  return (
    <div className={styles.frames}>
      <p className={`${styles.cohort} ${styles.frame}`}>{student.cohort}</p>
      <p className={`${styles.email} ${styles.frame}`}>{student.email}</p>
      <p className={`${styles.student} ${styles.frame}`}>{student.name}</p>
    </div>
  );
};
