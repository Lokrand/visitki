import React, { Dispatch, FC, KeyboardEventHandler, ReactNode, SetStateAction } from "react";

import { useNavigate } from "react-router";

import styles from "./FrameStudent.module.scss";

import { useForm } from "../../hook/useForm";

import { useMutation } from "../../hook/useMutation";
import { USERS_URL } from "../../utils/constants";
import { TUser } from "../../utils/types";
type TStudentFrame = {
  student: TUser;
  setItemToHide: Dispatch<SetStateAction<string>>;
  color?: string;
  border?: string;
  icon?: ReactNode;
};

export const StudentFrame: FC<TStudentFrame> = ({ student, setItemToHide, color, icon, border }) => {
  const { mutationData } = useMutation();
  const navigate = useNavigate();
  const handleNameClick = () => {
    navigate(`detail/${student._id}`);
  };
  const { values, handleChange, setValues } = useForm({
    cohort: student.cohort,
    email: student.email,
  });
  const submitHandler = () => {
    console.log(values);
    return mutationData(USERS_URL, "POST", values);
  };

  const handleSubmit: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      submitHandler();
    }
  };
  return (
    <form className={styles.frames} style={{ borderBottom: border }}>
      <input
        name='cohort'
        value={values.cohort}
        className={`${styles.cohort} ${styles.frame}`}
        onChange={handleChange}
        onKeyDown={handleSubmit}
        style={{ color: color }}
      />
      <input
        name='email'
        value={values.email}
        className={`${styles.email} ${styles.frame}`}
        onChange={handleChange}
        onKeyDown={handleSubmit}
        style={{ color: color }}
      />
      {student.name ? (
        <p className={styles.student_text} onClick={handleNameClick}>
          {student.name}
        </p>
      ) : (
        <p className={`${styles.student} ${styles.frame}`} style={{ color: color }}></p>
      )}
      <span
        className={styles.icon}
        onClick={() => {
          setItemToHide(student._id);
        }}
      >
        {icon}
      </span>
    </form>
  );
};
