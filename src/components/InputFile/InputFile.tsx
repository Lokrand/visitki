import React, { Dispatch, MouseEventHandler, SetStateAction } from "react";
import { FC, useState } from "react";

import styles from "./InputFile.module.scss";

import { Attach } from "../../icons/Attach/Attach";
import { TForm } from "../../utils/types";

interface IInputFile {
  label: string;
  inputName: string;
  requirements: string;
  id: string;
  htmlFor: string;
  setValue: Dispatch<SetStateAction<TForm>>;
  form: TForm;
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
    const [file] = e.target.files;
    setFileName(file.name);
    if (file.size > 2097152) {
      setFileName("Размер файла должен быть менее 2 мб");
    }

    setValue({
      ...form,
      info: {
        ...form.info,
        [e.target.name]: { ...form.info[e.target.name], image: "https://loremflickr.com/640/480/cats" },
      },
    });
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
          accept='image/jpeg,image/png'
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
