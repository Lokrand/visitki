import React, {
  Dispatch,
  FC,
  FormEventHandler,
  MouseEventHandler,
  SetStateAction,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";

import styles from "./InputSelect.module.scss";

import { Arrow } from "../../icons/Arrow/Arrow";
import { TForm } from "../../utils/types";

interface IInputSelectsProps {
  label: string;
  inputName: string;
  options: string[];
  error?: string;
  setValue: Dispatch<SetStateAction<TForm>>;
  form: TForm;
  isErrorCity?: boolean;
  setIsErrorCity?: Dispatch<SetStateAction<boolean>>;
}

const InputSelect: FC<IInputSelectsProps> = ({
  label,
  inputName,
  options,
  setValue,
  form,
  error,
  isErrorCity,
  setIsErrorCity,
}) => {
  const [focus, setFocus] = useState(false);
  const [hover, setHover] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isActive, setActive] = useState(false);
  let height = !isActive ? 0 : options.length >= 5 ? "180px" : `${options.length * 36}px`;
  const re = new RegExp(`^${inputValue}`, "i");

  const ref = useRef<HTMLInputElement>(null);

  const handleInputChange: FormEventHandler<HTMLInputElement> | undefined = (e) => {
    const target = e.target as HTMLInputElement;
    setInputValue(target?.value);
    if (target.value === target.textContent) {
      setIsErrorCity?.(false);
    } else setIsErrorCity?.(true);
  };

  const setHeight = useCallback(
    (options: string[]) => {
      const optionsNumber = options.filter((option) => option.match(re));
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
  const setTheme = (option: string) => {
    if (option === "серьезный") {
      setValue({ ...form, profile: { ...form.profile, [inputName]: "default" } });
    }
    if (option === "романтичный") {
      setValue({ ...form, profile: { ...form.profile, [inputName]: "romantic" } });
    }
    if (option === "дерзкий") {
      setValue({ ...form, profile: { ...form.profile, [inputName]: "daring" } });
    }
  };
  return (
    <div className={styles.container}>
      <label className={styles.input__label}>{label}</label>

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
      />
      <span
        className={`${styles.input__button} ${!isActive ? styles.input__button_default : styles.input__button_active}`}
        onClick={handleButtonClick}
      >
        <Arrow />
      </span>
      <span className={`${!isErrorCity ? styles.input__error : styles.input__error_active}`}>{error}</span>
      <div
        className={`${styles.wrapper} ${!isActive ? styles.wrapper_default : styles.wrapper_active}`}
        style={{ height: height }}
      >
        <ul className={styles.list}>
          {options.map((option, index) => {
            if (option.match(re)) {
              return (
                <li
                  className={styles.list__option}
                  key={index}
                  onClick={() => {
                    setTheme(option);
                    setIsErrorCity?.(false);
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
