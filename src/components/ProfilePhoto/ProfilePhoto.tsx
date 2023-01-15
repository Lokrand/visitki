import React, { ChangeEventHandler, MouseEventHandler } from "react";
import { FC, useState, FormEventHandler, useCallback, useMemo } from "react";

import styles from "./ProfilePhoto.module.scss";

import { Camera } from "../../icons/Camera/Camera";

interface IProfilePhoto {
  setValue?: any;
  form?: any;
}
const ProfilePhoto: FC<IProfilePhoto> = ({ setValue, form }) => {
  const [hover, setHover] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [img, setImg] = useState() as any;

  const handleInputHover: MouseEventHandler<HTMLLabelElement> = (e) => {
    if (e.type === "mouseenter") {
      setHover(true);
    } else setHover(false);
  };

  const handleImageChange = (e: any) => {
    const [file] = e.target.files;
    setImg(URL.createObjectURL(file));
    setValue({ ...form, [e.target.name]: URL.createObjectURL(file) });
  };

  const handleButtonVisibility = useCallback(() => {
    if (img !== undefined && hover) {
      setIsVisible(true);
    }
    if (img !== undefined && !hover) {
      setIsVisible(false);
    } else setIsVisible(true);
  }, [hover, img]);

  useMemo(() => {
    handleButtonVisibility();
  }, [handleButtonVisibility]);

  return (
    <div className={styles.avatar}>
      <p className={styles.avatar__label}>Загрузите фото *</p>
      <p className={styles.avatar__requirements}>(размер не менее 440х440)</p>
      <input
        type='file'
        name='photo'
        id='photo'
        accept='image/*'
        className={`${styles.input_hidden}`}
        onChange={handleImageChange}
        required
      />
      <div className={styles.wrapper}>
        <div className={styles.preview}>
          <label
            className={styles.label}
            htmlFor='photo'
            onMouseEnter={handleInputHover}
            onMouseLeave={handleInputHover}
          >
            <img src={img} alt={""} className={styles.label__image}></img>
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
