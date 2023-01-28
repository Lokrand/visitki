import React, { ChangeEventHandler, Dispatch, MouseEventHandler, SetStateAction } from "react";
import { FC, useState } from "react";

import styles from "./InpuTextArea.module.scss";

import { TForm } from "../../utils/types";

interface IInputProps {
  label?: string;
  inputName: string;
  placeholder: string;
  maxLength: number;
  setValue: Dispatch<SetStateAction<TForm>>;
  form: TForm;
}

const InputTextArea: FC<IInputProps> = ({ label, inputName, placeholder, maxLength, setValue, form }) => {
  const [focus, setFocus] = useState(false);
  const [hover, setHover] = useState(false);
  let text = "";

  if (inputName !== "quote" && form.info[inputName]) {
    const info = form.info[inputName];
    text = info.text;
  }
  if (inputName === "quote" && form.profile[inputName]) {
    text = form.profile[inputName];
  }
  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const target = e.target;
    if (inputName === "quote") {
      setValue({ ...form, profile: { ...form.profile, [target.name]: target.value } });
    } else if (inputName !== "quote") {
      setValue({
        ...form,
        info: { ...form.info, [target.name]: { ...form.info[target.name], text: target.value } },
      });
    }
  };
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
    <>
      {form && (
        <div className={styles.container}>
          <label className={styles.input__label}>{label}</label>
          <textarea
            maxLength={maxLength}
            placeholder={placeholder}
            name={inputName}
            value={text}
            className={`${styles.input} ${focus ? styles.input_status_active : styles.input_status_default}
              ${hover ? styles.input_status_active : styles.input_status_default}`}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onMouseEnter={handleInputHover}
            onMouseLeave={handleInputHover}
            onChange={handleChange}
          />
        </div>
      )}
    </>
  );
};

export default InputTextArea;
