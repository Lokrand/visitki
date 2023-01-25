import React, { ChangeEventHandler, MouseEventHandler, useState, FC } from "react";

import styles from "./Input.module.scss";

import { Cross } from "../../icons/Cross/Cross";

interface IInputProps {
  label: string;
  inputName: string;
  placeholder?: string;
  setValue: any;
  form: any;
}

const Input: FC<IInputProps> = ({ label, inputName, setValue, form, placeholder }) => {
  const [focus, setFocus] = useState(false);
  const [hover, setHover] = useState(false);
  const [displayStyle, setDisplayStyle] = useState({ display: "none" });
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const target = e.target;
    setValue({ ...form, profile: { ...form.profile, [inputName]: target.value } });
    target.value.length ? setDisplayStyle({ display: "block" }) : setDisplayStyle({ display: "none" });
  };

  const handleInputFocus = () => {
    setFocus(true);
  };

  const handleInputBlur = () => {
    setFocus(false);
  };

  const handleButtonClick = () => {
    setValue({ ...form, profile: { ...form.profile, [inputName]: "" } });
    setDisplayStyle({ display: "none" });
  };

  const handleInputHover: MouseEventHandler<HTMLInputElement> = (e) => {
    if (e.type === "mouseleave" && !focus) {
      setHover(false);
    } else setHover(true);
  };
  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <input
        type='text'
        name={inputName}
        value={form.profile[inputName]}
        className={`${styles.input} ${focus ? styles.input_status_active : styles.input_status_default}
                ${hover ? styles.input_status_active : styles.input_status_default}`}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onMouseEnter={handleInputHover}
        onMouseLeave={handleInputHover}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
      <span className={styles.button} style={displayStyle} onClick={handleButtonClick}>
        <Cross />
      </span>
    </div>
  );
};

export default Input;
