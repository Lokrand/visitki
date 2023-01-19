import React, { MouseEventHandler } from "react";
import { FC, useState, FormEventHandler } from "react";

import styles from "./Input.module.scss";

import { Cross } from "../../icons/Cross/Cross";

interface IInputProps {
  label: string;
  inputName: string;
  placeholder?: string;
  // handleChange: (e: {
  //   target: {
  //     name: string;
  //     value: string;
  //   };
  // }) => void;
  // values: string;
  setValue: any;
  form: any;
}

const Input: FC<IInputProps> = ({ label, inputName, setValue, form, placeholder }) => {
  const [focus, setFocus] = useState(false);
  const [hover, setHover] = useState(false);
  const [displayStyle, setDisplayStyle] = React.useState({ display: "none" });
  console.log(form);
  const handleInputChange = (e: any) => {
    setValue({ ...form, [e.target.name]: e.target.value });
    e.target.value.length ? setDisplayStyle({ display: "block" }) : setDisplayStyle({ display: "none" });
  };

  const handleInputFocus = () => {
    setFocus(true);
  };

  const handleInputBlur = () => {
    setFocus(false);
  };

  const handleButtonClick = () => {
    setValue({ ...form, [inputName]: "" });
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
        value={form[inputName]}
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
