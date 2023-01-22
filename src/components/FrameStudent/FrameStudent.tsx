import React, { FC } from "react";

import styles from "./FrameStudent.module.scss";

import { TUser } from "../../utils/types";

type StudentFrame = {
  student: TUser;
};

export const StudentFrame: FC<StudentFrame> = ({ student }) => {
  return (
    <div className={styles.frames}>
      <input value={student.cohort} className={`${styles.cohort} ${styles.frame}`} />

      <input value={student.email} className={`${styles.email} ${styles.frame}`} />

      <input value={student.name} className={`${styles.student} ${styles.frame}`} />
    </div>
  );
};
