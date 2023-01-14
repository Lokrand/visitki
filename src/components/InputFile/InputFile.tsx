import React, { MouseEventHandler } from "react";
import { FC, useState, useRef, useCallback } from "react";

import styles from "./InputFile.module.scss";

import { Attach } from "../../icons/Attach/Attach";

interface IInputFile {
  label: string;
  inputName: string;
  requirements: string;
  id: string;
  htmlFor: string;
  setValue?: any;
  form?: any;
}

const InputFile: FC<IInputFile> = ({ label, inputName, requirements, id, htmlFor, setValue, form }) => {
  const [hover, setHover] = useState(false);
  const handleInputHover: MouseEventHandler<HTMLInputElement> = (e) => {
    if (e.type === "mouseenter") {
      setHover(true);
    } else setHover(false);
  };

  const [fileName, setFileName] = useState("") as any;

  const handleImageChange = (e: any) => {
    const [file] = e.target.files;
    setFileName(file.name);
    setValue({ ...form, [e.target.name]: URL.createObjectURL(file) });
  };

  return (
    <>
      <p>{label}</p>
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
          <span className={styles.button}>
            <Attach />
          </span>
        </label>
      </div>
      <p className={styles.requirements}>{requirements}</p>
    </>
  );
};

export default InputFile;
