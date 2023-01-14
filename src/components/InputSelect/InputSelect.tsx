import React, { MouseEventHandler, useMemo, useCallback } from "react";
import { FC, useState, FormEventHandler, useRef } from "react";

import styles from "./InputSelect.module.scss";

import { Arrow } from "../../icons/Arrow/Arrow";

interface IInputSelectsProps {
  label: string;
  inputName: string;
  options: string[];
  required: boolean;
  setValue?: any;
  form?: any;
}

const InputSelect: FC<IInputSelectsProps> = ({ label, inputName, options, setValue, form, required }) => {
  const [focus, setFocus] = useState(false);
  const [hover, setHover] = useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [isActive, setActive] = useState(false);
  let height = !isActive ? 0 : options.length >= 5 ? "180px" : `${options.length * 36}px`;
  const re = new RegExp(`^${inputValue}`, "i");

  const ref = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: any) => {
    const target = e.target;
    setInputValue(target.value);
    setValue({ ...form, [inputName]: target.textContent });
  };

  const setHeight = useCallback(
    (options: string[]) => {
      const optionsNumber = options.filter((option: string) => option.match(re));
      height = !isActive ? 0 : optionsNumber.length >= 5 ? "180px" : `${optionsNumber.length * 36}px`;
      return height;
    },
    [isActive, re],
  );

  useMemo(() => {
    setHeight(options);
  }, [options, setHeight]);

  const handleInputFocus = () => {
    setFocus(true);
    setActive(true);
  };

  const handleInputBlur = () => {
    setFocus(false);
  };

  const handleButtonClick = () => {
    handleToggle();
    setInputValue("");
  };

  const handleInputHover: MouseEventHandler<HTMLInputElement> = (e) => {
    if (e.type === "mouseleave" && !focus) {
      setHover(false);
    } else setHover(true);
  };

  const handleToggle = () => {
    setActive(!isActive);
  };

  const handleOptionOnclick = (option: string) => {
    setInputValue(option);

    setActive(false);
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>

      <input
        ref={ref}
        type='text'
        name={inputName}
        value={inputValue}
        className={`${styles.input} ${focus ? styles.input_status_active : styles.input_status_default}
                ${hover ? styles.input_status_active : styles.input_status_default}`}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onMouseEnter={handleInputHover}
        onMouseLeave={handleInputHover}
        onChange={handleInputChange}
        required={required}
      />
      <span
        className={`${styles.button} ${!isActive ? styles.button_default : styles.button_active}`}
        onClick={handleButtonClick}
      >
        <Arrow />
      </span>
      <div
        className={`${styles.wrapper} ${!isActive ? styles.wrapper_default : styles.wrapper_active}`}
        style={{ height: height }}
      >
        <ul className={styles.list}>
          {options.map((option: string, index: number) => {
            if (option.match(re)) {
              return (
                <li
                  className={styles.option}
                  key={index}
                  onClick={(e) => {
                    handleInputChange(e);
                    handleOptionOnclick(option);
                  }}
                >
                  {option}
                </li>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
};

export default InputSelect;
