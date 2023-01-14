import React, { ChangeEventHandler, MouseEventHandler } from "react";
import { FC, useState, FormEventHandler } from "react";

import styles from "./InpuTextArea.module.scss";

interface IInputProps {
  label?: string;
  inputName: string;
  placeholder: string;
  maxLength: number;
  handleChange?: any;
  values?: any;
}

const InputTextArea: FC<IInputProps> = ({ label, inputName, placeholder, maxLength, handleChange, values }) => {
  const [focus, setFocus] = useState(false);
  const [hover, setHover] = useState(false);

  const handleInputFocus = () => {
    setFocus(true);
  };

  const handleInputBlur = () => {
    setFocus(false);
  };

  const handleInputHover: MouseEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.type === "mouseleave" && !focus) {
      setHover(false);
    } else setHover(true);
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <textarea
        maxLength={maxLength}
        placeholder={placeholder}
        name={inputName}
        value={values}
        className={`${styles.input} ${focus ? styles.input_status_active : styles.input_status_default}
                ${hover ? styles.input_status_active : styles.input_status_default}`}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onMouseEnter={handleInputHover}
        onMouseLeave={handleInputHover}
        onChange={handleChange}
      />
    </div>
  );
};

export default InputTextArea;
