import React, { Dispatch, FC, KeyboardEventHandler, ReactNode, SetStateAction } from "react";

import { useNavigate } from "react-router";

import styles from "./FrameStudent.module.scss";

import { useForm } from "../../hook/useForm";

import { TUser } from "../../utils/types";

type TStudentFrame = {
  student: TUser;
  setItemToHide: Dispatch<SetStateAction<string>>;
  color?: string;
  border?: string;
  icon?: ReactNode;
};

export const StudentFrame: FC<TStudentFrame> = ({ student, setItemToHide, color, icon, border }) => {
  const navigate = useNavigate();
  const handleNameClick = () => {
    navigate(`detail/${student._id}`);
  };
  const { values, handleChange, setValues } = useForm({
    cohort: student.cohort,
    email: student.email,
    name: student.name,
  });
  const submitHandler = () => {
    console.log(values);
  };
  const onEnter: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      submitHandler();
    }
  };

  return (
    <>
      <form className={styles.frames} style={{ borderBottom: border }}>
        <input
          name='cohort'
          value={values.cohort}
          className={`${styles.cohort} ${styles.frame}`}
          onChange={handleChange}
          onKeyDown={onEnter}
          style={{ color: color }}
        />
        <input
          name='email'
          value={values.email}
          className={`${styles.email} ${styles.frame}`}
          onChange={handleChange}
          onKeyDown={onEnter}
          style={{ color: color }}
        />
        {student.name ? (
          <p className={styles.student_text} onClick={handleNameClick}>
            {student.name}
          </p>
        ) : (
          <input
            name='name'
            value={values.name}
            className={`${styles.student} ${styles.frame}`}
            onChange={handleChange}
            onKeyDown={onEnter}
            style={{ color: color }}
          />
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
    </>
  );
};
