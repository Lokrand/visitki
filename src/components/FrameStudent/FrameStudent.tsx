import React, { FC } from "react";

import { useNavigate } from "react-router";

import styles from "./FrameStudent.module.scss";

import { TUser } from "../../utils/types";

type StudentFrame = {
  student: TUser;
};

export const StudentFrame: FC<StudentFrame> = ({ student }) => {
  const navigate = useNavigate();
  console.log(navigate);
  const handleNameClick = () => {
    navigate(`detail/${student._id}`);
  };
  return (
    <div className={styles.frames}>
      <input value={student.cohort} className={`${styles.cohort} ${styles.frame}`} />

      <input value={student.email} className={`${styles.email} ${styles.frame}`} />
      {student.name ? <p>{student.name}</p> : <input value='' className={`${styles.student} ${styles.frame}`} />}
    </div>
  );
};
