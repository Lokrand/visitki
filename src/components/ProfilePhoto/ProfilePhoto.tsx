import React, { Dispatch, MouseEventHandler, SetStateAction } from "react";
import { FC, useState, useCallback, useMemo } from "react";

import styles from "./ProfilePhoto.module.scss";

import { Camera } from "../../icons/Camera/Camera";
import { TForm } from "../../utils/types";

interface IProfilePhoto {
  setValue: Dispatch<SetStateAction<TForm>>;
  form: TForm;
  isErrorPhoto: boolean;
  setIsErrorPhoto: Dispatch<SetStateAction<boolean>>;
}
const ProfilePhoto: FC<IProfilePhoto> = ({ setValue, form, isErrorPhoto, setIsErrorPhoto }) => {
  const [hover, setHover] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [img, setImg] = useState<string>();
  const [sizeLimit, setSizelimit] = useState(false);
  const handleInputHover: MouseEventHandler<HTMLLabelElement> = (e) => {
    if (e.type === "mouseenter") {
      setHover(true);
    } else setHover(false);
  };
  const handleImageChange = (e: any) => {
    setIsErrorPhoto(false);
    const [file] = e.target.files;
    setImg(URL.createObjectURL(file));
    if (file.size > 2097152) {
      setSizelimit(true);
    } else setSizelimit(false);
    //setValue({ ...form, profile: { ...form.profile, [e.target.name]: URL.createObjectURL(file) } });
    setValue({ ...form, profile: { ...form.profile, [e.target.name]: "https://loremflickr.com/320/240/cats" } }); //версия с заглушкой
  };

  const handleButtonVisibility = useCallback(() => {
    if (form.profile.photo !== undefined && hover) {
      setIsVisible(true);
    }
    if (form.profile.photo !== undefined && !hover) {
      setIsVisible(false);
    } else setIsVisible(true);
  }, [hover, img]);

  useMemo(() => {
    handleButtonVisibility();
  }, [handleButtonVisibility]);

  return (
    <div className={styles.avatar}>
      <p className={`${!isErrorPhoto ? styles.avatar__label : styles.avatar__label_error}`}>Загрузите фото *</p>
      <p className={styles.avatar__requirements}>(размер не менее 440х440 пикселей)</p>
      {sizeLimit && <p className={styles.avatar__requirements_size}>(Размер файла должен быть менее 2 мб)</p>}
      <input
        type='file'
        name='photo'
        id='photo'
        accept='image/jpeg,image/png'
        className={`${styles.input_hidden}`}
        onChange={handleImageChange}
      />
      <div className={styles.wrapper}>
        <div className={styles.preview}>
          <label
            className={styles.label}
            htmlFor='photo'
            onMouseEnter={handleInputHover}
            onMouseLeave={handleInputHover}
          >
            <img src={form.profile.photo} alt={form.profile.photo} className={styles.label__image}></img>
            <span
              className={`${styles.label__button} 
            ${isVisible ? styles.label__button_status_default : styles.label__button_status_active}`}
            >
              <Camera />
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProfilePhoto;
