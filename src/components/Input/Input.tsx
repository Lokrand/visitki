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
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const target = e.target;
    setValue({ ...form, profile: { ...form.profile, [inputName]: target.value } });
  };

  const handleButtonClick = () => {
    setValue({ ...form, profile: { ...form.profile, [inputName]: "" } });
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
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onMouseEnter={handleInputHover}
        onMouseLeave={handleInputHover}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
      {form.profile[inputName] && (
        <span className={styles.button} onClick={handleButtonClick}>
          <Cross />
        </span>
      )}
    </div>
  );
};

export default Input;
