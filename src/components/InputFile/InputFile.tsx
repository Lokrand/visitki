import React, { Dispatch, FormEventHandler, MouseEventHandler, SetStateAction } from "react";
import { FC, useState, useRef, useCallback } from "react";

import styles from "./InputFile.module.scss";

import { Attach } from "../../icons/Attach/Attach";
import { TForm } from "../../utils/types";

interface IInputFile {
  label: string;
  inputName: string;
  requirements: string;
  id: string;
  htmlFor: string;
  setValue: any;
  form: any;
}

const InputFile: FC<IInputFile> = ({ label, inputName, requirements, id, htmlFor, setValue, form }) => {
  const [hover, setHover] = useState(false);
  const handleInputHover: MouseEventHandler<HTMLInputElement> = (e) => {
    if (e.type === "mouseenter") {
      setHover(true);
    } else setHover(false);
  };

  const [fileName, setFileName] = useState("");

  const handleImageChange = (e: any) => {
    //const target = e.target as HTMLInputElement
    const [file] = e.target.files;
    setFileName(file.name);
    setValue({ ...form, [e.target.name]: URL.createObjectURL(file) });
  };

  return (
    <>
      <p className={styles.input__label}>{label}</p>
      <div
        className={`${styles.input} 
                ${hover ? styles.input_status_active : styles.input_status_default}`}
        onMouseEnter={handleInputHover}
        onMouseLeave={handleInputHover}
      >
        <input
          id={id}
          type='file'
          accept='image/*'
          className={`${styles.input_hidden}`}
          name={inputName}
          onChange={handleImageChange}
        />
        <span>{fileName}</span>
        <label htmlFor={htmlFor}>
          <span className={styles.input__button}>
            <Attach />
          </span>
        </label>
      </div>
      <p className={styles.input__requirements}>{requirements}</p>
    </>
  );
};

export default InputFile;
