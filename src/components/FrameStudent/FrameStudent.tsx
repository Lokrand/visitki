import React, { ChangeEventHandler, FC, useState } from "react";

import { useNavigate } from "react-router";

import styles from "./FrameStudent.module.scss";

import { Delete } from "../../icons/Delete/Delete";
import { TUser } from "../../utils/types";

type StudentFrame = {
  student: TUser;
};

export const StudentFrame: FC<StudentFrame> = ({ student }) => {
  const navigate = useNavigate();
  const [cohortValue, setCohortValue] = useState(student.cohort);
  const [emailValue, setEmailValue] = useState(student.email);
  const [nameValue, setNameValue] = useState("");
  const handleNameClick = () => {
    navigate(`/detail/${student._id}`);
  };
  const handleCohortInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setCohortValue(e.target.value);
  };
  const handleEmailInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmailValue(e.target.value);
  };
  const handleNameInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNameValue(e.target.value);
  };
  return (
    <div className={`${styles.frames} `}>
      <input value={cohortValue} className={`${styles.cohort} ${styles.frame}`} onChange={handleCohortInput} />
      <input value={emailValue} className={`${styles.email} ${styles.frame}`} onChange={handleEmailInput} />
      {student.name ? (
        <p className={styles.student_text} onClick={handleNameClick}>
          {student.name}
        </p>
      ) : (
        <input value={nameValue} className={`${styles.student} ${styles.frame}`} onChange={handleNameInput} />
      )}
      <Delete />
    </div>
  );
};
