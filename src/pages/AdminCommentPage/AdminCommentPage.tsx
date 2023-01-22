import React, { Dispatch, FC, FormEventHandler, MouseEventHandler, SetStateAction, useState } from "react";

import styles from "./admincommentpage.module.scss";

import Input from "../../components/Input/Input";

import { Cross } from "../../icons/Cross/Cross";

const CommentFrame = () => {
  return (
    <>
      <div className={styles.frames}>
        <p className={`${styles.frame}`}>1853</p>
        <p className={`${styles.frame}`}>20.12.2022</p>
        <p className={`${styles.frame}`}>Дмитрий Степанов</p>
        <p className={`${styles.frame}`}>Виктория Листвина</p>
        <p className={`${styles.frame}`}>из блока Увлечения</p>
        <p className={`${styles.frame}`}>
          Классные у тебя увлечения, я тоже играю в настолки, любимая игра — Эволюция. Люблю еще слушать музыку, ходить
          в кино, общаться с друзьями. Ну и учиться в Практикуме.{" "}
        </p>
        <Cross />
      </div>
    </>
  );
};

export const AdminCommentPage: FC = () => {
  const [form, setValue] = useState({ filter: "" });
  const [focus, setFocus] = useState(false);
  const [hover, setHover] = useState(false);
  const [displayStyle, setDisplayStyle] = React.useState({ display: "none" });
  const handleInputChange: FormEventHandler<HTMLInputElement> | undefined = (e) => {
    const target = e.target as HTMLInputElement;
    setValue({ filter: target.value });
    target.value.length ? setDisplayStyle({ display: "block" }) : setDisplayStyle({ display: "none" });
  };

  const handleInputFocus = () => {
    setFocus(true);
  };

  const handleInputBlur = () => {
    setFocus(false);
  };

  const handleButtonClick = () => {
    setValue({ filter: "" });
    setDisplayStyle({ display: "none" });
  };

  const handleInputHover: MouseEventHandler<HTMLInputElement> = (e) => {
    if (e.type === "mouseleave" && !focus) {
      setHover(false);
    } else setHover(true);
  };
  return (
    <>
      <div className={styles.container}>
        <label className={styles.label}>Фильтровать</label>
        <input
          type='text'
          name='filter'
          value={form.filter}
          className={`${styles.input} ${focus ? styles.input_status_active : styles.input_status_default}
                ${hover ? styles.input_status_active : styles.input_status_default}`}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onMouseEnter={handleInputHover}
          onMouseLeave={handleInputHover}
          onChange={handleInputChange}
          placeholder='По имени или фамилии или почте или номеру когорты (введите любой из этих параметров)'
        />
        <span className={styles.button} style={displayStyle} onClick={handleButtonClick}>
          <Cross />
        </span>
      </div>
      <div className={styles.main}>
        <p className={styles.column}>Когорта</p>
        <p className={styles.column}>Дата</p>
        <p className={styles.column}>Отправитель</p>
        <p className={styles.column}>Получатель</p>
        <p className={styles.column}>Откуда комментарий</p>
        <p className={styles.column}>Текст комментария</p>
      </div>
      <CommentFrame />
      <CommentFrame />
      <CommentFrame />
      <CommentFrame />
    </>
  );
};
