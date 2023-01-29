import React, { ChangeEventHandler, MouseEventHandler } from "react";
import { FC, useState } from "react";

import styles from "./InpuTextArea.module.scss";

interface IInputProps {
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  label?: string;
  placeholder: string;
  maxLength: number;
}

const InputTextArea: FC<IInputProps> = ({ value, onChange, label, placeholder, maxLength }) => {
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
      <label className={styles.input__label}>{label}</label>
      <textarea
        maxLength={maxLength}
        placeholder={placeholder}
        // name={inputName}
        value={value}
        className={`${styles.input} ${focus ? styles.input_status_active : styles.input_status_default}
              ${hover ? styles.input_status_active : styles.input_status_default}`}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onMouseEnter={handleInputHover}
        onMouseLeave={handleInputHover}
        onChange={onChange}
      />
    </div>
  );
};

export default InputTextArea;
